import { ArrowLeft, User, Mail, Lock, EyeOff, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/hooks/auth";

function EditProfile() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const goToHome = () => {
    navigate(-1);
  };

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [passwordOld, setPasswordOld] = useState("");
  const [passwordNew, setPasswordNew] = useState("");

  async function handleUpdate(e) {
    e.preventDefault();
    const user = {
      name,
      email,
      old_password: passwordOld,
      password: passwordNew,
    };
    await updateProfile({ user });
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={goToHome}
            >
              <ArrowLeft className="w-5 h-5  text-white" />
            </Button>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Edit Profile
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>
        </div>

        <form className="space-y-6">
          <Card className="border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Profile Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-success-opacity border-2 border-success-foreground flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg  transition-colors"
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div>
                  <p className="font-medium">{name}</p>
                  <p className="text-sm text-muted-foreground">{email}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Name <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 h-11 bg-transparent border-border"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11 bg-transparent border-border"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="currentPassword"
                  className="text-sm font-medium"
                >
                  Current Password <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="currentPassword"
                    type="password"
                    placeholder="Enter current password to save changes"
                    onChange={(e) => setPasswordOld(e.target.value)}
                    className="pl-10 pr-10 h-11 bg-transparent border-border"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <EyeOff className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Change Password</CardTitle>
              <CardDescription>
                Leave blank to keep your current password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-sm font-medium">
                  New Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Enter new password"
                    onChange={(e) => setPasswordNew(e.target.value)}
                    className="pl-10 pr-10 h-11 bg-transparent border-border"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <EyeOff className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              type="submit"
              className="flex-1 h-11 bg-primary hover:bg-success-hover text-primary-foreground font-medium"
              onClick={handleUpdate}
            >
              Save Changes
            </Button>
            <div className="flex-1 sm:flex-initial">
              <Button
                type="button"
                variant="outline"
                className="w-full h-11 border-border hover:bg-secondary bg-transparent text-white"
                onClick={goToHome}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
