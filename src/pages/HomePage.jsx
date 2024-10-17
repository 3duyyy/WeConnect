import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <p>HomePage</p>
      <Link to="/login">
        <Button variant="contained">Login</Button>
      </Link>
    </div>
  );
}

export default HomePage;
