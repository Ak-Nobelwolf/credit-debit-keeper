
import { Check, X } from "lucide-react";

interface PasswordStrengthMeterProps {
  password: string;
  passwordStrength: number;
  passwordErrors: string[];
}

export const PasswordStrengthMeter = ({ 
  password, 
  passwordStrength, 
  passwordErrors 
}: PasswordStrengthMeterProps) => {
  // Calculate strength color
  const getStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  if (!password) {
    return null;
  }

  return (
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
  );
};
