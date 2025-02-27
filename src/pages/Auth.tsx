
import { useState } from "react";
import { motion } from "framer-motion";
import AuthForm from "@/components/auth/AuthForm";
import { ResetPasswordDialog } from "@/components/auth/ResetPasswordDialog";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);

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
