import { useParams } from "react-router-dom";
import { useBlog } from "../context/BlogContext";

const PostPage = () => {
    const { id } = useParams<{ id: string }>();
    const { posts } = useBlog();
    const post = posts.find((p) => p.id === Number(id));

    if (!post) {
        return <p>Inlägget hittades inte.</p>;
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <p><strong>Författare:</strong> {post.author}</p>
            <p><small>{new Date(post.publishedAt).toLocaleDateString()}</small></p>
        </div>
    );
};

export default PostPage;
