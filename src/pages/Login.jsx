import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../config/firebase";
import { useUserContext } from "../context/UserContext";

const Login = () => {
    const [email, setEmail] = useState("test@test.com");
    const [password, setPassword] = useState("123123");

    const { user } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate("/dashboard");
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login({ email, password });
            console.log("user logged in");
        } catch (error) {
            console.log(error.code);
            console.log(error.message);
        }
    };

    return (
        <>
            <h1>Login</h1>
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
                <button type="submit">Login</button>
            </form>
        </>
    );
};

export default Login;
