import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';

export default function AdminLayout({ children }) {

  const { isAuthenticated } = useSelector((state) => state.adminAuth);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">You are not logged in.</p>
      </div>
    );
  }

  return (
    <div className="admin-body flex relative bg-gray-100">
      <Sidebar />
      
      <main className="admin-content min-h-screen self-end w-full p-5">
        {children}    
      </main>

    </div>
  );
}
