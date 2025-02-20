
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProfileFieldProps {
  label: string;
  id: string;
  value: string;
  isEditing: boolean;
  type?: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
}

export const ProfileField = ({
  label,
  id,
  value,
  isEditing,
  type = "text",
  onChange,
  readonly = false,
}: ProfileFieldProps) => {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      {isEditing && !readonly ? (
        <Input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="mt-1"
        />
      ) : (
        <p className="text-lg mt-1">
          {type === "date" && value
            ? new Date(value).toLocaleDateString()
            : value || "Not set"}
        </p>
      )}
    </div>
  );
};
