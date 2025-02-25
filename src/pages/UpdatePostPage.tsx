import { useParams, useNavigate } from "react-router-dom";
import { useBlog } from "../context/BlogContext";
import { useState, useEffect } from "react";
import Modal from "../components/Modal"; // Importera Modal-komponenten

const UpdatePostPage = () => {
    const { id } = useParams<{ id: string }>();
    const { posts, fetchPosts } = useBlog();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [postData, setPostData] = useState({
        title: "",
        content: "",
        author: "",
        category: "",
    });

    const [showUpdateModal, setShowUpdateModal] = useState(false); // Modal state


    const post = posts.find((p) => p.id === Number(id));

    useEffect(() => {
        if (post) {
            setPostData({
                title: post.title,
                content: post.content,
                author: post.author,
                category: post.category || "",
            });
        }
    }, [post]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPostData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("access_token");
            if (!token) throw new Error("Ingen JWT-token hittades. Logga in igen.");

            const response = await fetch(`http://localhost:3001/blog/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                throw new Error("Misslyckades med att uppdatera inlägget");
            }

            await fetchPosts(); // Uppdatera listan i kontexten
            setShowUpdateModal(true); // Visa modal vid lyckad uppdatering

            
        } catch (error: any) {
            setError(error.message);
        }
    };

    if (!post) {
        return <p>Inlägget hittades inte.</p>;
    }

    return (
        <div>
            <h1>Uppdatera inlägg</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Titel</label>
                    <input
                        type="text"
                        name="title"
                        value={postData.title}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Innehåll</label>
                    <textarea
                        name="content"
                        value={postData.content}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Författare</label>
                    <input
                        type="text"
                        name="author"
                        value={postData.author}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Kategori</label>
                    <input
                        type="text"
                        name="category"
                        value={postData.category}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" style={{ background: "green", color: "white", padding: "8px 16px", border: "none", cursor: "pointer" }}>
                    Spara
                </button>
            </form>
            <Modal
                isOpen={showUpdateModal}
                onClose={() => setShowUpdateModal(false)} 
                onConfirm={() => navigate(`/post/${id}`)} 
                title="Uppdatering lyckades"
                message="Inlägget har uppdaterats!"
            />

        </div>
    );
};

export default UpdatePostPage;
