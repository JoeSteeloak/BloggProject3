import { createContext, useContext, useEffect, useState } from "react";
import { BlogPost } from "../types/blog.types";

interface BlogContextType {
    posts: BlogPost[];
    fetchPosts: () => Promise<void>;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider = ({ children }: { children: React.ReactNode }) => {
    const [posts, setPosts] = useState<BlogPost[]>([]);

    const fetchPosts = async () => {
        try {
            const response = await fetch("http://localhost:3000/blog");
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error("Error fetching blog posts:", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <BlogContext.Provider value={{ posts, fetchPosts }}>
            {children}
        </BlogContext.Provider>
    );
};

export const useBlog = () => {
    const context = useContext(BlogContext);
    if (!context) {
        throw new Error("useBlog must be used within a BlogProvider");
    }
    return context;
};
