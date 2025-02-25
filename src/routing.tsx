import { createBrowserRouter } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PostPage from "./pages/PostPage";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { BlogProvider } from "./context/BlogContext";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <BlogProvider><HomePage /></BlogProvider>
            },
            {
                path: "/post/:id", // Lägg till route för enskilda blogginlägg
                element: <BlogProvider><PostPage /></BlogProvider>
            },
            {
                path: "/admin",
                element: (
                    <ProtectedRoute>
                        <AdminPage />
                    </ProtectedRoute>
                )
            },
            {
                path: "/login",
                element: <LoginPage />
            }
        ]
    }
])

export default router;