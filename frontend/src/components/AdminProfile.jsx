import { useAuth } from '../contexts/AuthContext';



const AdminProfile = () => {
    const { user } = useAuth();
  return (
    <div className="flex gap-4 items-center justify-between p-6 bg-white rounded-lg shadow-md">
    <div className="flex gap-12">
      <img src="/vite.svg" alt="profile" className="w-40 h-40 mb-3 rounded-full shadow-lg border-4 border-white" />
      <div className="mt-4 flex flex-col gap-2">
        <h1 className="text-2xl font-medium">{user?.email}</h1>
        <p className='text-lg text-secondary'>{user?.role} : {user?.userId}</p>
        <p className='text-lg text-secondary'>name : admin_eiei</p>
        <p className='text-lg text-secondary'>tel : 021-21213241</p>
      </div>
    </div>
  </div>
  )
}

export default AdminProfile