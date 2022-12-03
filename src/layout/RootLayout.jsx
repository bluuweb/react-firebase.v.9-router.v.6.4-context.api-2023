import { Outlet } from "react-router-dom";
import UserContextProvider from "../context/UserContext";

const Root = () => {
    return (
        <UserContextProvider>
            <Outlet />
        </UserContextProvider>
    );
};

export default Root;
