
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AuthForm from "@/components/auth/AuthForm";
import { ResetPasswordDialog } from "@/components/auth/ResetPasswordDialog";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate("/dashboard");
      }
    };
    
    checkSession();
  }, [navigate]);

  // Check if we're in a recovery flow
  useEffect(() => {
    // Handle hash parameters for recovery flow
    if (location.hash) {
      const hashParams = new URLSearchParams(location.hash.substring(1));
      const type = hashParams.get("type");
      const accessToken = hashParams.get("access_token");
      
      console.log("Auth page - Hash params:", { type, accessToken: !!accessToken });

      if (type === "recovery" && accessToken) {
        // Store the recovery token in localStorage
        localStorage.setItem("supabaseRecoveryToken", accessToken);
        
        // Redirect to the dedicated reset password page
        navigate("/reset-password");
        
        toast.info("Please set your new password");
      }
    }
    
    // Also handle URL query parameters as a fallback
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get("type");
    const accessToken = queryParams.get("access_token");
    
    console.log("Auth page - URL query params:", { type, accessToken: !!accessToken });
    
    if (type === "recovery" && accessToken) {
      // Store the recovery token in localStorage
      localStorage.setItem("supabaseRecoveryToken", accessToken);
      
      // Redirect to the dedicated reset password page
      navigate("/reset-password");
      
      toast.info("Please set your new password");
    }
  }, [location, navigate]);

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto"
      >
        <AuthForm 
          isSignUp={isSignUp} 
          setIsSignUp={setIsSignUp} 
          setShowResetDialog={setShowResetDialog}
        />
        <ResetPasswordDialog 
          open={showResetDialog} 
          onOpenChange={setShowResetDialog} 
        />
      </motion.div>
    </div>
  );
};

export default Auth;
