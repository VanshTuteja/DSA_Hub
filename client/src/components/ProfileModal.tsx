import { useUserStore } from "@/store/useUserStore";
import { Camera, Save, User, X, Trash2, Upload, ImagePlus, Loader2, LoaderCircle } from "lucide-react";
import { useMemo, useRef, useState } from "react";

type ProfileModalProps = {
  show: boolean;
  onClose: () => void;
  editData: any;
  setEditData: any;
  handleProfileUpdate: () => void;
  handleProfilePictureUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  user: any;
};

const ProfileModal: React.FC<ProfileModalProps> = ({
  show,
  onClose,
  editData,
  setEditData,
  handleProfileUpdate,
  handleProfilePictureUpload,
  user
}) => {
  if (!show) return null;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const {loading} = useUserStore();
  // Helper function to safely compare values
  const isEqual = (val1: any, val2: any) => {
    if (val1 === val2) return true;
    if (val1 === null || val1 === undefined) return val2 === null || val2 === undefined || val2 === '';
    if (val2 === null || val2 === undefined) return val1 === null || val1 === undefined || val1 === '';
    return String(val1) === String(val2);
  };

  // Check if there are any changes compared to original user data
  const hasChanges = useMemo(() => {
    if (!user || !editData) return false;

    return (
      !isEqual(editData.firstName, user.profile.firstName) ||
      !isEqual(editData.lastName, user.profile.lastName) ||
      !isEqual(editData.bio, user.profile.bio) ||
      !isEqual(editData.country, user.profile.country) ||
      !isEqual(editData.contact, user.profile.contact) ||
      !isEqual(editData.profilePicture, user.profile.profilePicture)
    );
  }, [editData, user]);

  const handleRemoveProfilePicture = () => {
    setEditData((prev: typeof editData) => ({
      ...prev,
      profilePicture: null
    }));
  };

  const handleClose = () => {
    // Reset editData to original user data when closing
    if (user) {
      setEditData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        username: user.username || '',
        email: user.email || '',
        bio: user.bio || '',
        country: user.country || '',
        contact: user.contact || '',
        profilePicture: user.profilePicture || null
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200/30 dark:border-gray-700/30 rounded-3xl max-w-3xl w-full max-h-[95vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-6 border-b border-gray-200/20 dark:border-gray-700/20 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Edit Profile
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Update your personal information
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 group"
          >
            <X className="w-6 h-6 text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(95vh-140px)]">
          <div className="p-8 space-y-8 pb-36">
            {/* Profile Picture Section */}
            <div className="text-center">
              <div className="relative inline-block group">
                {/* Main profile picture container - clickable for upload */}
                <label className="block cursor-pointer">
                  <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-blue-500/30 shadow-xl hover:ring-blue-500/50 transition-all duration-200">
                    {editData.profilePicture ? (
                      <img
                        src={editData.profilePicture}
                        alt="Profile"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center hover:from-blue-600 hover:to-purple-700 transition-all duration-200">
                        <User className="w-16 h-16 text-white" />
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureUpload}
                    className="hidden"
                  />
                </label>

                {/* Camera icon overlay */}
                {/* <div className="absolute bottom-2 right-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg pointer-events-none">
                  <Camera className="w-5 h-5 text-white" />
                </div> */}

                {/* Remove Button - clickable */}
                {editData.profilePicture && (
                  <button
                    onClick={handleRemoveProfilePicture}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110 z-10"
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Click anywhere on the photo to upload a new image
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={editData.firstName || ''}
                    onChange={(e) => setEditData((prev: typeof editData) => ({
                      ...prev,
                      firstName: e.target.value
                    }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
                    placeholder="Enter your first name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={editData.lastName || ''}
                    onChange={(e) => setEditData((prev: typeof editData) => ({
                      ...prev,
                      lastName: e.target.value
                    }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              {/* Non-editable Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Username
                  </label>
                  <input
                    type="text"
                    value={editData.username || ''}
                    disabled
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editData.email || ''}
                    disabled
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Bio Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Bio
                </label>
                <textarea
                  value={editData.bio || ''}
                  onChange={(e) => setEditData((prev: typeof editData) => ({
                    ...prev,
                    bio: e.target.value
                  }))}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>

              {/* Location and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editData.country || ''}
                    onChange={(e) => setEditData((prev: typeof editData) => ({
                      ...prev,
                      country: e.target.value
                    }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
                    placeholder="Enter your location"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={editData.contact || ''}
                    onChange={(e) => setEditData((prev: typeof editData) => ({
                      ...prev,
                      contact: e.target.value
                    }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-6 border-t border-gray-200/20 dark:border-gray-700/20 flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleClose}
            className="px-8 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Cancel
          </button>
          {loading ? (
    <button
            type="button"
            disabled= {true}
            className={`px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform transition-all duration-200 flex items-center space-x-2 ${hasChanges
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
          >
             <Loader2 className="w-5 h-5 animate-spin" />
            <span>Saving...</span>
          </button>
  ):(
          <button
            type="button"
            onClick={handleProfileUpdate}
            disabled={!hasChanges}
            className={`px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform transition-all duration-200 flex items-center space-x-2 ${hasChanges
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
          >
            <Save className="w-5 h-5" />
            <span>Save Changes</span>
          </button>
        )}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;