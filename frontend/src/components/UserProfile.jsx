import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UpdateProfileModal from './UpdateProfileModal';
import { useAuth } from '../contexts/AuthContext';
import userApi from '../api/user';

const UserProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      setIsLoading(true);
      setError('');
      try {
        await userApi.deleteAccount();
        await logout();
        navigate('/login');
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred while deleting the account');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleReportsStatus = () => {
    navigate('/report-list');
  };

  return (
    <>
      <div className="flex gap-4 items-center justify-between p-6 bg-white rounded-lg shadow-md">
        <div className="flex gap-12">
          <img src="/user.jpg" alt="profile" className="w-40 h-40 mb-3 rounded-full shadow-lg border-4 border-white" />
          <div className="mt-4 flex flex-col gap-2">
            <h1 className="text-2xl font-medium">{user?.email || 'Loading...'}</h1>
            <h2 className="font-medium">Current Points: {user?.currentPoints || 0}</h2>
            <h2 className="font-medium">Total Points Earned: {user?.totalPointsEarned || 0}</h2>
            <h3 className="font-medium mt-4">If you forgot password, contact:</h3>
            <ul className="space-y-1 text-sm text-secondary">
              <li>admin_bomb@gmail.com</li>
              <li>admin_touch@gmail.com</li>
              <li>admin_tun@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <button onClick={openModal} className="text-white bg-primary p-4 rounded-2xl border-secondary hover:bg-primary/90">
            Update Profile
          </button>
          <button onClick={handleReportsStatus} className="text-white bg-primary p-4 rounded-2xl border-secondary hover:bg-primary/90">
            Reports Status
          </button>
          <button 
            onClick={handleDeleteAccount} 
            className="text-primary bg-white p-4 rounded-2xl border-primary border-2 hover:bg-gray-50"
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete Account'}
          </button>
        </div>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <UpdateProfileModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default UserProfile;