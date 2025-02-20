
import { Camera, User } from "lucide-react";

interface ProfileImageProps {
  avatarUrl: string;
  isEditing: boolean;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfileImage = ({ avatarUrl, isEditing, onImageUpload }: ProfileImageProps) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-muted flex items-center justify-center">
          {avatarUrl ? (
            <img 
              src={avatarUrl} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground" />
          )}
        </div>
        {isEditing && (
          <label 
            htmlFor="profile-image" 
            className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90 transition-colors"
          >
            <Camera className="w-4 h-4" />
            <input
              id="profile-image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onImageUpload}
            />
          </label>
        )}
      </div>
    </div>
  );
};
