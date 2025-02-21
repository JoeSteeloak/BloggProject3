import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const {login, user} = useAuth();
    const navigate = useNavigate();

    // kontrollera användare
    useEffect(() => {
        if(user) {
            navigate("/admin");
        }
    }, [user])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        try {

            await login({email, password});
            navigate("/admin");

        } catch(error) {
            setError("Inloggningen misslyckades. Kontrollera att du angett rätt epost och lösenord.")
        }
    };

    return (
        <>
        <h2>Logga in</h2>
        <form onSubmit={handleSubmit}>
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )} 

            <div>
                <label htmlFor="email">E-postadress</label>
                <input 
                id="email" 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div>
                <label htmlFor="password">Lösenord</label>
                <input 
                id="password" 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <button type="submit">Logga in</button>

        </form>
        </>
        
    )
}

export default LoginPage