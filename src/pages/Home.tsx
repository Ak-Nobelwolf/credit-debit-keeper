import { motion } from "framer-motion";
import { Code, Server, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/components/AuthProvider";

const Home = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const navigate = useNavigate();
  const { session } = useAuth();

  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    if (session) {
      navigate('/dashboard');
    }
  }, [session, navigate]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    }
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter");
      return false;
    }
    if (!/[a-z]/.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter");
      return false;
    }
    if (!/[0-9]/.test(password)) {
      setPasswordError("Password must contain at least one number");
      return false;
    }
    if (!/[!@#$%^&*]/.test(password)) {
      setPasswordError("Password must contain at least one special character (!@#$%^&*)");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setEmailError("");
    setPasswordError("");

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      setIsLoading(false);
      return;
    }

    if (isSignUp) {
      if (password !== confirmPassword) {
        setPasswordError("Passwords do not match");
        setIsLoading(false);
        return;
      }
    }

    try {
      if (isSignUp) {
        const { data: existingUser } = await supabase.auth.signInWithPassword({
          email,
          password: "dummy-password-for-check",
        });

        if (existingUser.user) {
          toast.error("An account with this email already exists. Please login instead.");
          setIsLoading(false);
          return;
        }

        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) {
          if (signUpError.message.includes("already registered")) {
            toast.error("An account with this email already exists. Please login instead.");
          } else {
            toast.error(signUpError.message);
          }
        } else {
          toast.success("Sign up successful! Please check your email to verify your account.");
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          if (signInError.message.includes("Invalid login credentials")) {
            toast.error("Invalid email or password");
          } else {
            toast.error(signInError.message);
          }
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsResetting(true);

    if (!validateEmail(resetEmail)) {
      setIsResetting(false);
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Password reset instructions have been sent to your email");
        setShowResetDialog(false);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsResetting(false);
    }
  };

  if (session) return null;

  return (
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
              <Card className="p-6">
                <form onSubmit={handleAuth} className="space-y-4">
                  <h2 className="text-2xl font-bold mb-4">{isSignUp ? "Create Account" : "Welcome Back"}</h2>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        validateEmail(e.target.value);
                      }}
                      required
                      className={emailError ? "border-destructive" : ""}
                    />
                    {emailError && (
                      <p className="text-sm text-destructive mt-1">{emailError}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (isSignUp) {
                          validatePassword(e.target.value);
                        }
                      }}
                      required
                      className={passwordError ? "border-destructive" : ""}
                    />
                    {passwordError && (
                      <p className="text-sm text-destructive mt-1">{passwordError}</p>
                    )}
                  </div>
                  {isSignUp && (
                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className={password !== confirmPassword ? "border-destructive" : ""}
                      />
                      {password !== confirmPassword && confirmPassword && (
                        <p className="text-sm text-destructive mt-1">Passwords do not match</p>
                      )}
                    </div>
                  )}
                  {isSignUp && (
                    <div className="text-sm text-muted-foreground">
                      <p>Password must contain:</p>
                      <ul className="list-disc list-inside space-y-1 mt-1">
                        <li>At least 8 characters</li>
                        <li>One uppercase letter</li>
                        <li>One lowercase letter</li>
                        <li>One number</li>
                        <li>One special character (!@#$%^&*)</li>
                      </ul>
                    </div>
                  )}
                  {!isSignUp && (
                    <Button
                      type="button"
                      variant="link"
                      className="w-full text-sm text-muted-foreground"
                      onClick={() => setShowResetDialog(true)}
                    >
                      Forgot your password?
                    </Button>
                  )}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Loading..." : isSignUp ? "Sign Up" : "Login"}
                  </Button>
                  <Button
                    type="button"
                    variant="link"
                    className="w-full"
                    onClick={() => {
                      setIsSignUp(!isSignUp);
                      setPassword("");
                      setConfirmPassword("");
                      setEmailError("");
                      setPasswordError("");
                    }}
                  >
                    {isSignUp ? "Already have an account? Login" : "Need an account? Sign Up"}
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 lg:py-16 px-3 sm:px-4 lg:px-6 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Code,
                title: "Smart Analytics",
                description: "Powerful insights into your spending patterns and financial habits."
              },
              {
                icon: Shield,
                title: "Secure Platform",
                description: "Bank-grade security to protect your sensitive financial data."
              },
              {
                icon: Server,
                title: "Real-time Tracking",
                description: "Monitor your expenses and income in real-time with instant updates."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <feature.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              Enter your email address and we'll send you instructions to reset your password.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <Label htmlFor="resetEmail">Email</Label>
              <Input
                id="resetEmail"
                type="email"
                value={resetEmail}
                onChange={(e) => {
                  setResetEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
                required
                className={emailError ? "border-destructive" : ""}
              />
              {emailError && (
                <p className="text-sm text-destructive mt-1">{emailError}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isResetting}>
              {isResetting ? "Sending..." : "Send Reset Instructions"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
