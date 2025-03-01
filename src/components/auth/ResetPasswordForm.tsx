
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";
import { validatePassword, isPasswordValid } from "@/utils/passwordUtils";

export const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  // Check password on change
  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
    const [errors, strength] = validatePassword(newPassword);
    setPasswordErrors(errors);
    setPasswordStrength(strength);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    // Validate password strength
    if (!isPasswordValid(password)) {
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

  return (
    <form onSubmit={handleUpdatePassword} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password">New Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
          placeholder="Enter your new password"
          required
        />
        
        <PasswordStrengthMeter 
          password={password}
          passwordStrength={passwordStrength}
          passwordErrors={passwordErrors}
        />
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
  );
};
