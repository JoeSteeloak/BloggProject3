import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import {User, LoginCredentials, AuthResponse, AuthContextType} from "../types/auth.types"

//skapa context
const AuthContext = createContext <AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ( {children} ) => {

    const [user, setUser] = useState<User | null>(null);

    // logga in användare

    const login = async (credentials: LoginCredentials) => { 

        try {

            const res = await fetch("http://localhost:3001/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            })

            if(!res.ok) throw new Error("Inloggning misslyckades");

            const data = await res.json() as AuthResponse;

            localStorage.setItem("access_token", data.access_token);

            setUser(data.user);


        } catch(error) {
            throw error;
        }

    }

    //logga ut

    const logout = () => {
        localStorage.removeItem("access_token");

        setUser(null);
    }

    // validera token
    const checkToken = async () => {
        const access_token = localStorage.getItem("access_token");

        if(!access_token) {
            return;
        }

        try {
            const res = await fetch("http://localhost:3001/auth/validate", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + access_token
                }
            });

            if(res.ok) {
                const data = await res.json();
                setUser(data.user);
            }

        } catch(error) {
            localStorage.removeItem("access_token");
            setUser(null);
        }

    }

    useEffect(() => {
        checkToken();
    }, [])

    return (
        <AuthContext.Provider value= {{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () : AuthContextType => {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error("useAuth måste användas inom en AuthProvider");
    }

    return context;
}