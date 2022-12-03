import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { auth } from "../config/firebase";

const UserContext = createContext();

export default function UserContextProvider({ children }) {
    const [user, setUser] = useState(false);

    // Check si user está activo
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log(user);
            setUser(user);
        });

        return unsubscribe;
    }, []);

    // Cuando inicia la aplicación siempre el user estará false
    // Pero al terminar el useEffect, el user podrá ser null o un objeto
    if (user === false) return <p>Loading app...</p>;

    return (
        <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
    );
}

export const useUserContext = () => useContext(UserContext);
