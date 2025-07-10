import React, { useState, useRef, useEffect } from 'react';
import {
  User,
  LogOut,
  Trophy,
  Clock,
  Target,
  Camera,
  X,
  Home,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUserStore } from '@/store/useUserStore';
import { useUserTopicsStore } from '@/store/useUserTopics';
import type { UserProfile } from '@/interface/types';
import { useNavigate } from 'react-router-dom';


const UserProfileDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showPhotoUpload, setShowPhotoUpload] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user, logout } = useUserStore();
  const { topics } = useUserTopicsStore();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: user?.username || "VT",
    email: user?.email || "v@gmail.com",
    avatar: user?.profile.profilePicture || "",
    masteredTopics: topics.filter(t => t.status === 'mastered').map(t => t.name),
    averageScore: user?.stats.averageScore || 0,
    streak: user?.stats.streak || 0,
  });

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserProfile(prev => ({
          ...prev,
          avatar: e.target?.result as string
        }));
        setShowPhotoUpload(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = (): void => {
    fileInputRef.current?.click();
  };

  const removePhoto = (): void => {
    setUserProfile(prev => ({
      ...prev,
      avatar: ""
    }));
    setShowPhotoUpload(false);
  };

  useEffect(() => {
    const loadUserProfile = async () => {
      setUserProfile(
        {
          name: user?.username || "VT",
          email: user?.email || "v@gmail.com",
          avatar: user?.profile.profilePicture || "",
          masteredTopics: topics.filter(t => t.status === 'mastered').map(t => t.name),
          averageScore: Math.round(user?.stats.averageScore!) || 0,
          streak: user?.stats.streak || 0,
        }
      )
    }
    loadUserProfile();
  }, []);

  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button className="flex items-center space-x-3 lg:border lg:border-gray-500 rounded-xl px-4 py-3 transition-all duration-200 lg:shadow-sm hover:shadow-md w-full">
            <div
              className="relative w-12 h-12 rounded-full flex items-center justify-center overflow-hidden group cursor-pointer"
            >

              {userProfile.avatar != "" ? (
                <img
                  src={userProfile.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                  <User className="w-5 h-5 text-white " />
                </div>
              )}
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-900 dark:text-white">{userProfile.name}</div>
              {/* <div className="text-sm text-gray-500 dark:text-white">Level: Expert</div> */}
            </div>
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-80 p-0 bg-white dark:bg-gray-800 border border-gray-200 shadow-xl" align="end">
          <div className="p-6 rounded-t-md dark:from-gray-800 dark:to-gray-700 border-b border-gray-100 bg-gradient-to-r">
            <div className="flex items-center space-x-4">
              <div
                className="relative w-14 h-14 rounded-full overflow-hidden cursor-pointer group"
              >
                {user?.profile.profilePicture != "" ? (
                  <img
                    src={user?.profile.profilePicture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="group w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                    <User className="w-8 h-8 text-white group-hover:hidden" />
                  </div>
                )}
               
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg dark:text-white">{userProfile.name}</h3>
                <p className="text-sm text-gray-600 dark:text-white/50">{userProfile.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center p-3 border-2 border-gray-400 rounded-xl shadow-sm">
                <div className="flex items-center justify-center mb-2">
                  <Trophy className="w-5 h-5 text-yellow-500 mr-1" />
                  <span className="font-bold text-gray-900 dark:text-white text-lg">{userProfile.masteredTopics.length}</span>
                </div>
                <div className="text-xs text-gray-600 dark:text-white font-medium">Mastered</div>
              </div>
              <div className="text-center p-3 border-2 border-gray-400 rounded-xl shadow-sm">
                <div className="flex items-center justify-center mb-2">
                  <Target className="w-5 h-5 text-green-500 mr-1" />
                  <span className="font-bold text-gray-900 dark:text-white text-lg">{userProfile.averageScore}%</span>
                </div>
                <div className="text-xs text-gray-600 dark:text-white font-medium">Avg Score</div>
              </div>
              <div className="text-center p-3 border-2 border-gray-400 rounded-xl shadow-sm">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="w-5 h-5 text-blue-500 mr-1" />
                  <span className="font-bold text-gray-900 dark:text-white text-lg">{userProfile.streak}</span>
                </div>
                <div className="text-xs text-gray-600 dark:text-white font-medium">Day Streak</div>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-2 dark:from-gray-800 dark:to-gray-700">
            <button
              onClick={() => {
                navigate("/home")
              }}
              className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-200 dark:hover:bg-gray-500 rounded-xl transition-all duration-200 group"
            >
              <Home className="dark:text-white w-5 h-5 text-gray-500 group-hover:text-indigo-600 transition-colors" />
              <span className="text-gray-700 dark:text-white font-medium">Home</span>
            </button>
            <button
              onClick={() => {
                navigate("/profile")
              }}
              className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-200 dark:hover:bg-gray-500 rounded-xl transition-all duration-200 group"
            >
              <User className="dark:text-white w-5 h-5 text-gray-500 group-hover:text-indigo-600 transition-colors" />
              <span className="text-gray-700 dark:text-white font-medium">Profile</span>
            </button>
            <button
              onClick={logout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-red-100 dark:hover:bg-red-500 rounded-xl transition-all duration-200 group"
            >
              <LogOut className="dark:text-white w-5 h-5 text-gray-500 group-hover:text-red-600 transition-colors" />
              <span className="dark:text-white text-gray-700 group-hover:text-red-600 font-medium transition-colors">Sign Out</span>
            </button>
          </div>
        </PopoverContent>
      </Popover>

      {/* Photo Upload Modal */}
      <Dialog open={showPhotoUpload} onOpenChange={setShowPhotoUpload}>
        <DialogContent className="max-w-md w-full rounded-2xl p-6">
          <DialogHeader className="mb-4">
            <div className="flex justify-between items-center">
              <DialogTitle className="text-xl font-bold text-gray-900">
                Update Profile Photo
              </DialogTitle>
            </div>
          </DialogHeader>

          <div className="text-center mb-6">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gray-200">
              {user?.profile.profilePicture ? (
                <img
                  src={user?.profile.profilePicture}
                  alt="Current profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={triggerFileInput}
              className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl transition-colors font-medium"
            >
              <Camera className="w-5 h-5" />
              <span>Upload New Photo</span>
            </button>

            {userProfile.avatar && (
              <button
                onClick={removePhoto}
                className="w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl transition-colors font-medium"
              >
                <X className="w-5 h-5" />
                <span>Remove Photo</span>
              </button>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserProfileDropdown;