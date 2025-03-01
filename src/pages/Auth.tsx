
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AuthForm from "@/components/auth/AuthForm";
import { ResetPasswordDialog } from "@/components/auth/ResetPasswordDialog";
import { useLocation, useNavigate } from "react-router-dom";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if we're in a recovery flow
  useEffect(() => {
    const params = new URLSearchParams(location.hash.substring(1));
    const type = params.get("type");
    const accessToken = params.get("access_token");
    
    if (type === "recovery" && accessToken) {
      // Redirect to the dedicated reset password page
      navigate("/reset-password" + location.hash);
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
