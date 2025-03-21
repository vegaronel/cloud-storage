import { supabase } from "@/config/supabase";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";

function Logout() {
  const navigate = useNavigate();

  async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error logging out:", error.message);
      alert("Logout failed. Please try again.");
    } else {
      console.log("Logged out successfully");
      navigate("/login");
    }
  }

  return <Button onClick={logout}>Logout</Button>;
}

export default Logout;
