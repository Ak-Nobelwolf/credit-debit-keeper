
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

interface AuthFormProps {
  isSignUp: boolean;
  setIsSignUp: (value: boolean) => void;
  setShowResetDialog: (value: boolean) => void;
}

export const AuthForm = ({ isSignUp, setIsSignUp, setShowResetDialog }: AuthFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

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

    if (isSignUp && password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      setIsLoading(false);
      return;
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

  return (
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
          <>
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
          </>
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
  );
};
