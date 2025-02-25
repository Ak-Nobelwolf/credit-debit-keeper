
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm"; // Changed to default import
import { ResetPasswordDialog } from "@/components/auth/ResetPasswordDialog";
import { Features } from "@/components/auth/Features";
import ErrorBoundary from "@/components/ErrorBoundary";

const Home = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const { session } = useAuth();
  const navigate = useNavigate();

  if (session) {
    navigate('/dashboard');
    return null;
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 animate-gradient" />
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
        </div>

        <section className="py-8 sm:py-12 lg:py-16 px-3 sm:px-4 lg:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
              <motion.div 
                className="text-center lg:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Manage Your Finances with Confidence
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8">
                  Take control of your financial future with our comprehensive finance management platform.
                  Track expenses, analyze trends, and make informed decisions.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <AuthForm />
              </motion.div>
            </div>
          </div>
        </section>

        <Features />

        <ResetPasswordDialog
          open={showResetDialog}
          onOpenChange={setShowResetDialog}
        />
      </div>
    </ErrorBoundary>
  );
};

export default Home;
