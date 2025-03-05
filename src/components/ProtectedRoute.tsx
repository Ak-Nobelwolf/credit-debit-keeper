
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !session) {
      navigate("/auth");
    }
  }, [session, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-background/95">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <Card className="p-8 backdrop-blur-sm bg-card/70 border border-primary/20">
            <div className="flex flex-col items-center space-y-4">
              <div className="rounded-full h-12 w-12 bg-primary/10 flex items-center justify-center">
                <div className="h-6 w-6 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
              </div>
              <h2 className="text-xl font-semibold text-center">Authenticating</h2>
              <p className="text-muted-foreground text-center">Verifying your credentials...</p>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return session ? <>{children}</> : null;
};
