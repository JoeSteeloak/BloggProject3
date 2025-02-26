import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminPage.css"; // Importera CSS-filen

const AdminPage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [author, setAuthor] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const { user } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        const newPost = { title, content, category, author };

        try {
            const token = localStorage.getItem("access_token");
            if (!token) {
                setError("Ingen JWT-token hittades. Vänligen logga in igen.");
                return;
            }

            const response = await fetch("http://localhost:3000/blog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newPost),
            });

            if (!response.ok) {
                let errorMessage = "Något gick fel vid skapandet av inlägget";
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } catch (jsonError) {
                    console.error("Kunde inte läsa API:ts felmeddelande", jsonError);
                }
                throw new Error(errorMessage);
            }

            setSuccess(true);
            setTitle("");
            setContent("");
            setCategory("");
            setAuthor("");
            navigate("/");

        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="admin-container">
            <div className="admin-box">
                <h2>Skapa nytt blogginlägg</h2>
                <h3>Du är inloggad med mailen: {user?.email}</h3>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">Inlägget skapades!</div>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Titel:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Innehåll:</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Kategori:</label>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Författare:</label>
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Skapa inlägg</button>
                </form>
            </div>
        </div>
    );
};

export default AdminPage;
