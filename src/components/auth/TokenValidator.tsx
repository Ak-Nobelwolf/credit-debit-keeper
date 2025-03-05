
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";

interface TokenValidatorProps {
  children: React.ReactNode;
  onValidToken: () => void;
}

export const TokenValidator = ({ children, onValidToken }: TokenValidatorProps) => {
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const validateToken = async () => {
      try {
        // First check localStorage
        let recoveryToken = localStorage.getItem("supabaseRecoveryToken");
        console.log("Reset page - Recovery token in localStorage:", !!recoveryToken);
        
        // If token not in localStorage, try to extract from URL
        if (!recoveryToken) {
          // Check URL hash parameters
          if (location.hash && location.hash.includes("access_token=")) {
            const hashParams = new URLSearchParams(location.hash.substring(1));
            const accessToken = hashParams.get("access_token");
            const type = hashParams.get("type");
            
            console.log("Found token in URL hash:", !!accessToken, "type:", type);
            
            if (accessToken) {
              // If it's a recovery token or no type is specified (assume recovery)
              if (type === "recovery" || !type) {
                recoveryToken = accessToken;
                localStorage.setItem("supabaseRecoveryToken", accessToken);
                console.log("Stored recovery token from URL hash");
              }
            }
          }
          
          // Also check URL query parameters as fallback
          if (!recoveryToken && location.search) {
            const queryParams = new URLSearchParams(location.search);
            const accessToken = queryParams.get("access_token");
            const type = queryParams.get("type");
            
            console.log("Checking URL query params:", { type, hasToken: !!accessToken });
            
            if (accessToken && (type === "recovery" || !type)) {
              recoveryToken = accessToken;
              localStorage.setItem("supabaseRecoveryToken", accessToken);
              console.log("Stored recovery token from URL query");
            }
          }
          
          // If still no token, check if we're in a session 
          // This handles cases where the user might be logged in but accessing the reset page directly
          if (!recoveryToken) {
            const { data: sessionData } = await supabase.auth.getSession();
            if (sessionData?.session) {
              console.log("User already has active session");
              // Allow access if they're already logged in
              setIsValid(true);
              onValidToken();
              setIsValidating(false);
              return;
            } else {
              toast.error("Invalid or expired password reset session");
              navigate("/auth");
              return;
            }
          }
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
        toast.error("An error occurred. Please try requesting a new password reset link.");
        navigate("/auth");
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [navigate, onValidToken, location]);

  if (isValidating) {
    return (
      <Card className="p-8 flex flex-col items-center justify-center space-y-4">
        <LoaderCircle className="h-10 w-10 animate-spin text-primary" />
        <p className="text-center text-lg">Validating your reset link...</p>
      </Card>
    );
  }

  return isValid ? children : null;
};
