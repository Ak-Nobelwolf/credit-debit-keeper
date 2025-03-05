
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ResetPasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ResetPasswordDialog = ({ open, onOpenChange }: ResetPasswordDialogProps) => {
  const [resetEmail, setResetEmail] = useState("");
  const [isResetting, setIsResetting] = useState(false);
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

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsResetting(true);

    if (!validateEmail(resetEmail)) {
      setIsResetting(false);
      return;
    }

    try {
      // Use the absolute URL of the app's root, not the auth page
      // Supabase will append the necessary hash parameters
      const redirectTo = window.location.origin;
      
      console.log("Sending reset email with redirect:", redirectTo);
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo,
      });

      if (error) {
        toast.error("Failed to send reset email: " + error.message);
      } else {
        toast.success("Password reset instructions have been sent to your email");
        onOpenChange(false);
      }
    } catch (error: any) {
      toast.error("An unexpected error occurred: " + error.message);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Reset Password</DialogTitle>
          <DialogDescription className="text-center">
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
              placeholder="Enter your email address"
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
  );
};
