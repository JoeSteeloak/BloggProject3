import { useParams, useNavigate } from "react-router-dom";
import { useBlog } from "../context/BlogContext";
import { useState } from "react";

const PostPage = () => {
    const { id } = useParams<{ id: string }>();
    const { posts, deletePost } = useBlog();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const post = posts.find((p) => p.id === Number(id));

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
            const response = await fetch(`http://localhost:3001/blog/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Misslyckades med att radera inlägget");
            }

            // Uppdatera UI genom att ta bort inlägget från context
            deletePost(Number(id));

            alert("Inlägget raderades!");
            navigate("/"); // Navigera tillbaka till startsidan efter radering
        } catch (err: any) {
            setError(err.message);
        }
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

            {/* Radera-knapp */}
            <button 
                onClick={handleDelete} 
                style={{ background: "red", color: "white", padding: "8px 16px", border: "none", cursor: "pointer" }}
            >
                Radera inlägg
            </button>
        </div>
    );
};

export default PostPage;
