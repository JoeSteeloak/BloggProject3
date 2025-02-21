import { useAuth } from "../context/AuthContext"

const AdminPage = () => {

    const { user } = useAuth();
    return (
        <div>
            <h2>Admin</h2>
            <p>Du är inloggad med mailen: {user?.email}</p>
        </div>
    )
}

export default AdminPage