import { useParams, useNavigate } from "react-router-dom";
import { useBlog } from "../context/BlogContext";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import "./AdminPage.css";

const UpdatePostPage = () => {
    const { id } = useParams<{ id: string }>();
    const { posts, fetchPosts } = useBlog();
    const { user } = useAuth(); // Kolla om användaren är inloggad
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [postData, setPostData] = useState({
        title: "",
        content: "",
        author: "",
        category: "",
    });
    const [showUpdateModal, setShowUpdateModal] = useState(false);

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

    // Om användaren inte är inloggad, skicka dem till login-sidan
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPostData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
    
        if (!post) {
            setError("Inlägget hittades inte.");
            return;
        }
    
        if (
            postData.title === post.title &&
            postData.content === post.content &&
            postData.author === post.author &&
            postData.category === post.category
        ) {
            setError("Inga ändringar gjorda.");
            return;
        }
    
        try {
            setLoading(true);
            const token = localStorage.getItem("access_token");
            if (!token) throw new Error("Ingen JWT-token hittades. Logga in igen.");
    
            // Kolla vad vi faktiskt skickar till API:et
            const payload = {
                title: postData.title.trim(),
                content: postData.content.trim(),
                author: postData.author.trim(),
                ...(postData.category && { category: postData.category.trim() }) // Skicka endast om det inte är tomt
            };
    
            const response = await fetch(`https://bloggapi-4rn3.onrender.com/blog/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Misslyckades med att uppdatera: ${errorText}`);
            }
    
            await fetchPosts();
            setShowUpdateModal(true);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    

    if (!post) {
        return <p>Inlägget hittades inte.</p>;
    }

    return (
        <div className="admin-container">
            <div className="admin-box">
                <h2>Uppdatera inlägg</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Titel:</label>
                        <input
                            type="text"
                            name="title"
                            value={postData.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Innehåll:</label>
                        <textarea
                            name="content"
                            value={postData.content}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Författare:</label>
                        <input
                            type="text"
                            name="author"
                            value={postData.author}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Kategori:</label>
                        <input
                            type="text"
                            name="category"
                            value={postData.category}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        style={{ background: "green", color: "white", padding: "8px 16px", border: "none", cursor: "pointer" }}
                        disabled={loading}
                    >
                        {loading ? "Sparar..." : "Spara"}
                    </button>
                </form>
            </div>
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
