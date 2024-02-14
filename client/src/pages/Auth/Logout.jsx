import { useAuth } from "@/contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    logout();
    navigate("/");
  }, [logout, navigate]);

  return null;
}
