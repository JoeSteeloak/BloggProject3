import { createContext, useContext, useEffect, useState } from "react";
import { BlogPost } from "../types/blog.types";

interface BlogContextType {
    posts: BlogPost[];
    fetchPosts: () => Promise<void>;
    deletePost: (id: number) => Promise<void>;
}

const BlogContext = createContext<BlogContextType>({
    posts: [],
    fetchPosts: async () => {},
    deletePost: async () => {},
});


export const BlogProvider = ({ children }: { children: React.ReactNode }) => {
    const [posts, setPosts] = useState<BlogPost[]>([]);

    const fetchPosts = async () => {
        try {
            const response = await fetch("http://localhost:3001/blog");
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error("Error fetching blog posts:", error);
        }
    };

    const deletePost = async (id: number) => {
        try {
            const token = localStorage.getItem("access_token");
            if (!token) throw new Error("Ingen JWT-token hittades. Logga in igen.");
    
            const response = await fetch(`http://localhost:3001/blog/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
    
            const responseData = await response.json(); 
            console.log("DELETE response:", responseData);
    
            if (!response.ok) {
                throw new Error(responseData.message || "Misslyckades med att radera inlägget");
            }
    
            // Uppdatera den lokala listan i kontexten
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    
        } catch (error) {
            console.error("Error deleting blog post:", error);
        }
    };
    
    
    

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <BlogContext.Provider value={{ posts, fetchPosts, deletePost }}>
            {children}
        </BlogContext.Provider>
    );
};

export const useBlog = (): BlogContextType => {
    const context = useContext(BlogContext);
    if (!context) {
        throw new Error("useBlog must be used within a BlogProvider");
    }
    return context;
};
