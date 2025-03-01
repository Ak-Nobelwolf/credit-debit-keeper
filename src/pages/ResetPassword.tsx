
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
    <div className="container max-w-md mx-auto p-4 py-20">
      <TokenValidator onValidToken={() => setHasValidToken(true)}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full shadow-lg">
            <CardHeader className="space-y-1">
              <div className="flex justify-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <KeyRound className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl text-center">Reset Your Password</CardTitle>
              <CardDescription className="text-center">
                Enter your new password below
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResetPasswordForm />
            </CardContent>
            <CardFooter className="justify-center">
              <Button variant="link" onClick={() => navigate("/auth")}>
                Return to login
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </TokenValidator>
    </div>
  );
};

export default ResetPassword;
