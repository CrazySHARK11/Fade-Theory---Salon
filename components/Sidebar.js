import Link from "next/link";
import axiosInstance from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { adminLogout } from "../store/slices/adminSlice";
import { useRouter } from "next/router";
import { persistor } from "../store/store"

export default function Sidebar() {

  const dispatch = useDispatch();
  const router = useRouter();
  
  const handleLogout = async () => {
    await axiosInstance.post("/admin/logout");
    dispatch(adminLogout());
    persistor.purge();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen w-[19%] ">
      <aside className="min-h-screen fixed bg-gray-950 text-white">
        <div className="p-7">
          <h2 className="text-xl font-bold mb-[1em]">Admin Dashboard</h2>
          <nav className="flex flex-col items gap-5">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/admin"
                  className="flex items-center p-2 hover:bg-gray-700 rounded"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/services"
                  className="flex items-center p-2 hover:bg-gray-700 rounded"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                    <path
                      fillRule="evenodd"
                      d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/categories"
                  className="flex items-center p-2 hover:bg-gray-700 rounded"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                  </svg>
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/appointments"
                  className="flex items-center p-2 hover:bg-gray-700 rounded"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Appointments
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/customers"
                  className="flex items-center p-2 hover:bg-gray-700 rounded"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                  Customers
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/analytics"
                  className="flex items-center p-2 hover:bg-gray-700 rounded"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                  </svg>
                  Analytics
                </Link>
              </li>
            </ul>

            <div className="mt-auto pt-4 border-t border-gray-700">
              <button onClick={handleLogout} className="w-full cursor-pointer flex items-center p-2 hover:bg-gray-700 rounded text-red-400 hover:text-red-300">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clipRule="evenodd"
                  />
                </svg>
                Logout
              </button>
            </div>
          </nav>
        </div>
      </aside>
    </div>
  );
}
