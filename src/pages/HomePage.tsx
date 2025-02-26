import { Link } from "react-router-dom";
import { useBlog } from "../context/BlogContext";
import "./HomePage.css";

const HomePage = () => {
    const { posts } = useBlog();

    return (
        <div className="home-container">
            <h1>Blogginlägg</h1>
            <ul className="post-list">
                {posts.map((post) => (
                    <li key={post.id} className="post-item">
                        <Link to={`/post/${post.id}`}>
                            <h2>{post.title}</h2>
                            <p>{post.content.substring(0, 100)}...</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
