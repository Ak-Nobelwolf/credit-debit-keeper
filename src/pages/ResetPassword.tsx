
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { KeyRound, Check, X } from "lucide-react";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [hasToken, setHasToken] = useState(false);
  const navigate = useNavigate();

  // Check if we have a recovery token
  useEffect(() => {
    const checkToken = async () => {
      const recoveryToken = localStorage.getItem("supabaseRecoveryToken");
      console.log("Reset page - Recovery token exists:", !!recoveryToken);
      
      if (!recoveryToken) {
        toast.error("Invalid or expired password reset session");
        navigate("/auth");
        return;
      }
      
      setHasToken(true);
      
      // Check if the token is valid by getting the user
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error validating token:", error.message);
        localStorage.removeItem("supabaseRecoveryToken");
        toast.error("Your password reset link has expired. Please request a new one.");
        navigate("/auth");
      } else {
        console.log("User validated:", data.user?.email);
      }
    };
    
    checkToken();
  }, [navigate]);

  // Validate password
  const validatePassword = (password: string) => {
    const errors: string[] = [];
    let strength = 0;

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters");
    } else {
      strength += 1;
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    } else {
      strength += 1;
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    } else {
      strength += 1;
    }
    
    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number");
    } else {
      strength += 1;
    }
    
    if (!/[^A-Za-z0-9]/.test(password)) {
      errors.push("Password must contain at least one special character");
    } else {
      strength += 1;
    }

    setPasswordStrength(strength);
    setPasswordErrors(errors);
    
    return errors.length === 0;
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    // Validate password strength
    if (!validatePassword(password)) {
      toast.error("Please fix password issues");
      return;
    }
    
    setLoading(true);
    
    try {
      // Update the password using the auth API
      const { error } = await supabase.auth.updateUser({ 
        password: password 
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Clean up the token
      localStorage.removeItem("supabaseRecoveryToken");
      
      toast.success("Password has been updated successfully");
      
      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate("/auth");
      }, 2000);
    } catch (error: any) {
      toast.error(`Failed to update password: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Calculate strength color
  const getStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  if (!hasToken) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="container max-w-md mx-auto p-4 py-20">
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
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                  }}
                  placeholder="Enter your new password"
                  required
                />
                
                {/* Password strength meter */}
                {password && (
                  <div className="space-y-2 mt-2">
                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getStrengthColor()}`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Password strength: {passwordStrength <= 1 ? "Weak" : passwordStrength <= 3 ? "Moderate" : "Strong"}
                    </p>
                    
                    {/* Password requirements */}
                    <div className="space-y-1 mt-2">
                      {["At least 8 characters", 
                        "At least one uppercase letter", 
                        "At least one lowercase letter", 
                        "At least one number", 
                        "At least one special character"].map((requirement, i) => (
                        <div key={i} className="flex items-center gap-2">
                          {passwordErrors.includes(requirement) ? (
                            <X className="h-3.5 w-3.5 text-red-500" />
                          ) : (
                            <Check className="h-3.5 w-3.5 text-green-500" />
                          )}
                          <span className="text-xs text-muted-foreground">{requirement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your new password"
                  required
                />
                {password && confirmPassword && password !== confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                )}
              </div>
              
              <Button
                type="submit"
                className="w-full"
                disabled={loading || password !== confirmPassword || passwordErrors.length > 0}
              >
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="link" onClick={() => navigate("/auth")}>
              Return to login
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
