import { logOut } from "../config/firebase";

const Dashboard = () => {
    const handleLogout = async () => {
        await logOut();
    };

    return (
        <>
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>LogOut</button>
        </>
    );
};

export default Dashboard;
