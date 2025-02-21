import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/admin",
                element: <AdminPage />
            },
            {
                path: "/Login",
                element: <LoginPage />
            }
        ]
    }
])