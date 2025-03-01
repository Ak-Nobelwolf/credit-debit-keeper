
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface TokenValidatorProps {
  children: React.ReactNode;
  onValidToken: () => void;
}

export const TokenValidator = ({ children, onValidToken }: TokenValidatorProps) => {
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      try {
        const recoveryToken = localStorage.getItem("supabaseRecoveryToken");
        console.log("Reset page - Recovery token exists:", !!recoveryToken);
        
        if (!recoveryToken) {
          toast.error("Invalid or expired password reset session");
          navigate("/auth");
          return;
        }
        
        // Check if the token is valid by getting the user
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          console.error("Error validating token:", error.message);
          localStorage.removeItem("supabaseRecoveryToken");
          toast.error("Your password reset link has expired. Please request a new one.");
          navigate("/auth");
          return;
        }
        
        console.log("User validated:", data.user?.email);
        setIsValid(true);
        onValidToken();
      } catch (error) {
        console.error("Token validation error:", error);
        navigate("/auth");
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [navigate, onValidToken]);

  if (isValidating) {
    return <div className="flex justify-center p-8">Validating your reset link...</div>;
  }

  return isValid ? children : null;
};
