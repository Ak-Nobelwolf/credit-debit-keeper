
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { KeyRound } from "lucide-react";
import { TokenValidator } from "@/components/auth/TokenValidator";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

const ResetPassword = () => {
  const [hasValidToken, setHasValidToken] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="container max-w-md mx-auto px-4 py-8 sm:py-20">
      <TokenValidator onValidToken={() => setHasValidToken(true)}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full shadow-lg border-2 border-primary/10">
            <CardHeader className="space-y-3">
              <div className="flex justify-center mb-2">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <KeyRound className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl text-center">Reset Your Password</CardTitle>
              <CardDescription className="text-center">
                Create a strong password to secure your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResetPasswordForm />
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button variant="outline" onClick={() => navigate("/auth")}>
                Return to login
              </Button>
              <Button variant="ghost" onClick={() => navigate("/")}>
                Go to homepage
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </TokenValidator>
    </div>
  );
};

export default ResetPassword;
