import { useState } from 'react';
import UpdateProfileModal from './UpdateProfileModal';

const UserProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="flex gap-4 items-center justify-between">
        <div className="flex gap-12">
          <img src="../../public/user.jpg" alt="profile" className="w-40 h-40 mb-3 rounded-full shadow-lg border-4 border-white" />
          <div className="mt-4 flex flex-col gap-2">
            <h1 className="text-2xl font-medium">gabage_01@gmail.com</h1>
            <h1 className="font-medium">if you forgot password, contact :</h1>
            <ul className="space-y-1 text-sm text-secondary">
              <li>admin_bomb@gmail.com</li>
              <li>admin_touch@gmail.com</li>
              <li>admin_tun@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="flex gap-5">
          <button onClick={openModal} className="text-white bg-primary p-4 rounded-2xl border-secondary hover:bg-primary/90">Update Profile</button>
          <button className="text-white bg-primary p-4 rounded-2xl border-secondary hover:bg-primary/90">Reports Status</button>
          <button className="text-primary bg-white p-4 rounded-2xl border-primary border-2 hover:bg-gray-50">Delete Account</button>
        </div>
      </div>
      <UpdateProfileModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default UserProfile;