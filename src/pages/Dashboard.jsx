import { Button, Typography } from "@mui/material";
import { logout } from "../config/firebase";

const Dashboard = () => {
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Typography variant="h3" component="h1">
        Dashboard
      </Typography>
      <Button onClick={handleLogout} variant="contained">
        Logout
      </Button>
    </>
  );
};

export default Dashboard;
