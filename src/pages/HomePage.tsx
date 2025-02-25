import { Link } from "react-router-dom";
import { useBlog } from "../context/BlogContext";

const HomePage = () => {
    const { posts } = useBlog();

    return (
        <div>
            <h1>Blogginlägg</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
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