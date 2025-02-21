import { useState } from "react"

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, seterror] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        seterror('');
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