import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const Private = () => {
    const { user } = useUserContext();

    return user ? <Outlet /> : <Navigate to="/" />;
};

export default Private;
