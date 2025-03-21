import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const [session, setSession] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(!!session); // Convert session to boolean
    };

    checkSession();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (session === null) {
    return <div>Loading...</div>; // Show a loading state while checking session
  }

  return session ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
