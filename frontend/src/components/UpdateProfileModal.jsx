/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const UpdateProfileModal = ({
  isOpen,
  onClose,
  onUpdate,
  currentEmail,
  currentImageUrl,
}) => {
  const [email, setEmail] = useState(currentEmail || "");
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(currentImageUrl);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setEmail(currentEmail || "");
      setImagePreview(currentImageUrl);
      setProfileImage(null);
      setError("");
    }
  }, [isOpen, currentEmail, currentImageUrl]);

  if (!isOpen) return null;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(currentImageUrl);
    }
  };
  const hasChanges = email !== currentEmail || profileImage !== null;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const updateData = {};
      if (email !== currentEmail) {
        if (!email.trim()) {
          throw new Error("Email cannot be empty");
        }
        updateData.email = email;
      }
      if (profileImage) updateData.profileImage = profileImage;

      if (Object.keys(updateData).length === 0) {
        throw new Error("No changes to update");
      }

      await onUpdate(updateData);
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full p-2 border rounded"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="profileImage"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Profile Image
            </label>
            <input
              type="file"
              id="profileImage"
              onChange={handleImageChange}
              className="w-full p-2 border rounded"
              accept="image/*"
            />
          </div>
          {imagePreview && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-1">
                Image Preview:
              </p>
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="max-w-full h-auto rounded-lg"
              />
            </div>
          )}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
              disabled={isLoading || !hasChanges}
            >
              {isLoading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
