import UserProfile from "../components/UserProfile";
import Points from "../components/Points";
import Vouchers from "../components/Vouchers";
import AmountOfBottles from "../components/AmountOfBottles";
import { useAuth } from "../contexts/AuthContext";
import AdminProfile from "../components/AdminProfile";

const Profile = () => {
  const { user } = useAuth();
  return (
    <>
    {user?.role === "ADMIN" ? (
      <section id="profile" className="section-container">
      <div className="ml-16">
        <div className="w-28">
          <h1 className="text-3xl font-semibold mt-5">Admin</h1>
          <div className="border-secondary border mt-3 mb-20"></div>
        </div>
        <AdminProfile />
      </div>
    </section>
    ) : (
      <section id="profile" className="section-container">
      <div className="ml-16">
        <div className="w-44">
          <h1 className="text-3xl font-semibold mt-5">User Profile</h1>
          <div className="border-secondary border mt-3 mb-20"></div>
        </div>
        <UserProfile />
        <div className="mt-20 flex gap-20">
          <AmountOfBottles />
          <Points />
        </div>
        <div className="mt-20">
          <Vouchers />
        </div>
      </div>
    </section>
    )}
    </>
  )
  
};

export default Profile;
