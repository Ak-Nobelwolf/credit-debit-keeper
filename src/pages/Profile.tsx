
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ProfileImage } from "@/components/profile/ProfileImage";
import { ProfileField } from "@/components/profile/ProfileField";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    member_since: "",
    avatar_url: "",
  });
  const [session, setSession] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
        return;
      }
      setSession(session);
      fetchProfile(session.user.id);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
        return;
      }
      setSession(session);
      fetchProfile(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;
      if (data) {
        setProfileData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          dob: data.dob || "",
          member_since: new Date(data.member_since).toLocaleDateString(),
          avatar_url: data.avatar_url || "",
        });
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !session) return;

    try {
      const fileExt = file.name.split(".").pop();
      const filePath = `${session.user.id}/${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      setProfileData((prev) => ({ ...prev, avatar_url: publicUrl }));
    } catch (error: any) {
      toast.error("Error uploading image");
    }
  };

  const handleSave = async () => {
    if (!session) return;
    
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          name: profileData.name,
          email: profileData.email,
          phone: profileData.phone,
          dob: profileData.dob,
          avatar_url: profileData.avatar_url,
        })
        .eq("id", session.user.id);

      if (error) throw error;
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleFieldChange = (field: keyof typeof profileData) => (value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-background p-4 sm:p-6 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold">Profile</h1>
          <Button 
            variant={isEditing ? "default" : "outline"}
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>

        <Card className="p-4 sm:p-6 overflow-hidden">
          <div className="space-y-6 sm:space-y-0 sm:flex sm:gap-8">
            <div className="flex-shrink-0">
              <ProfileImage
                avatarUrl={profileData.avatar_url}
                isEditing={isEditing}
                onImageUpload={handleImageUpload}
              />
            </div>

            <div className="flex-grow">
              <div className="grid gap-6 sm:grid-cols-2">
                <ProfileField
                  label="Name"
                  id="name"
                  value={profileData.name}
                  isEditing={isEditing}
                  onChange={handleFieldChange("name")}
                />
                <ProfileField
                  label="Email"
                  id="email"
                  value={profileData.email}
                  type="email"
                  isEditing={isEditing}
                  onChange={handleFieldChange("email")}
                />
                <ProfileField
                  label="Phone Number"
                  id="phone"
                  value={profileData.phone}
                  type="tel"
                  isEditing={isEditing}
                  onChange={handleFieldChange("phone")}
                />
                <ProfileField
                  label="Date of Birth"
                  id="dob"
                  value={profileData.dob}
                  type="date"
                  isEditing={isEditing}
                  onChange={handleFieldChange("dob")}
                />
                <ProfileField
                  label="Member Since"
                  id="member_since"
                  value={profileData.member_since}
                  isEditing={isEditing}
                  readonly
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
