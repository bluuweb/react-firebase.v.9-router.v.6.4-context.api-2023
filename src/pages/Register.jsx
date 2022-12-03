import { useState } from "react";
import { register } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";

const Register = () => {
    const [email, setEmail] = useState("test@test.com");
    const [password, setPassword] = useState("123123");

    const { user } = useUserContext();

    // alternativa con hook
    useRedirectActiveUser(user, "/dashboard");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await register({ email, password });
            console.log("user registered");
        } catch (error) {
            console.log(error.code);
            console.log(error.message);
        }
    };

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
        </>
    );
};

export default Register;
