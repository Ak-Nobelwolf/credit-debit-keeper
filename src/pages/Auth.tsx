
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/components/AuthProvider";
import { ArrowLeft } from "lucide-react";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { session } = useAuth();

  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [session, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isForgotPassword) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth?reset=true`,
        });
        if (error) throw error;
        toast.success("Password reset email sent! Please check your inbox.");
        setIsForgotPassword(false);
      } else if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Sign up successful! Please check your email to verify your account.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderForm = () => {
    if (isForgotPassword) {
      return (
        <>
          <div className="mb-4">
            <Button
              variant="ghost"
              className="pl-0 mb-2"
              onClick={() => setIsForgotPassword(false)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to login
            </Button>
            <h1 className="text-2xl font-bold mb-6">Reset Password</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </>
      );
    }

    return (
      <>
        <h1 className="text-2xl font-bold mb-6 animate-fade-in">
          {isSignUp ? "Create Account" : "Login"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="animate-fade-in"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="animate-fade-in"
            />
          </div>
          <Button type="submit" className="w-full animate-fade-in" disabled={isLoading}>
            {isLoading ? "Loading..." : isSignUp ? "Sign Up" : "Login"}
          </Button>
        </form>
        <div className="mt-4 flex flex-col space-y-2">
          <Button
            variant="link"
            className="animate-fade-in"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Already have an account? Login" : "Need an account? Sign Up"}
          </Button>
          {!isSignUp && (
            <Button
              variant="link"
              className="animate-fade-in"
              onClick={() => setIsForgotPassword(true)}
            >
              Forgot password?
            </Button>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 relative overflow-hidden">
      {/* 3D Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 animate-gradient" />
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500/30 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-0 right-20 w-32 h-32 bg-blue-500/30 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-pink-500/30 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-md mx-auto space-y-6">
        <Card className="p-6 backdrop-blur-sm bg-background/95 animate-scale-in">
          {renderForm()}
        </Card>
      </div>
    </div>
  );
};

export default Auth;
