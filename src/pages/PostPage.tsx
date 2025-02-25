import { useParams, useNavigate } from "react-router-dom";
import { useBlog } from "../context/BlogContext";
import { useState } from "react";
import Modal from "../components/Modal"; // Importera Modal-komponenten


const PostPage = () => {
    const { id } = useParams<{ id: string }>();
    const { posts, deletePost } = useBlog();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const post = posts.find((p) => p.id === Number(id));

    const [showDeleteModal, setShowDeleteModal] = useState(false); // Modal state
    const [postToDelete, setPostToDelete] = useState<number | null>(null); // Post som ska tas bort

    const openDeleteModal = () => {
        setPostToDelete(Number(id));
        setShowDeleteModal(true); // Visa modal när man klickar på radera-knappen
    };

    if (!post) {
        return <p>Inlägget hittades inte.</p>;
    }

    const handleDelete = async () => {
        setError(""); // Rensa eventuella tidigare fel
        const token = localStorage.getItem("access_token");

        if (!token) {
            setError("Ingen JWT-token hittades. Vänligen logga in igen.");
            return;
        }

        try {
            await deletePost(Number(id));
            navigate("/"); // Navigera tillbaka till startsidan efter radering
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleUpdate = () => {
        // Navigera till uppdateringssidan med postens ID
        navigate(`/update/${id}`);
    };


    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <p><strong>Författare:</strong> {post.author}</p>
            <p><small>{new Date(post.publishedAt).toLocaleDateString()}</small></p>
            <p><strong>Kategori:</strong> {post.category}</p>
            {/* Visar felmeddelande om något går fel */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Uppdatera-knapp */}
            <button
                onClick={handleUpdate}
                style={{ background: "orange", color: "white", padding: "8px 16px", border: "none", cursor: "pointer" }}
            >
                Uppdatera inlägg
            </button>

            {/* Radera-knapp */}
            <button
                onClick={openDeleteModal}
                style={{ background: "red", color: "white", padding: "8px 16px", border: "none", cursor: "pointer" }}
            >
                Radera inlägg
            </button>
            <Modal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)} // Stäng modal vid stängning
                onConfirm={handleDelete} // Bekräfta radering
                title="Bekräfta Radering"
                message="Vill du verkligen radera detta inlägg?"
            />

        </div>
    );
};

export default PostPage;
