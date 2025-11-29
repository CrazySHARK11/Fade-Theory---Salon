import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import axiosInstance from "../../../utils/axiosInstance";

export default function Customers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      const { data } = await axiosInstance.get("admin/get-users");
      setUsers(data.users);
      setIsLoading(false); // <-- here it becomes false
    };

    loadUsers();
  }, []);

  return (
    <AdminLayout>
      <header className="w-full bg-white p-5 flex justify-between shadow rounded-2xl">
        <h2 className="text-xl font-extrabold">Customers</h2>
      </header>

      {/* Main Section */}
      <main>
        <h3 className="text-4xl my-10 font-bold text-center">
          All the Customers
        </h3>

        <div className="flex flex-col gap-4">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
            </div>
          ) : (
            users?.map((e) => (
              <div
                key={e._id}
                className="p-6 rounded-xl shadow bg-white flex justify-between items-center gap-4"
              >
                <div className="flex gap-3 items-center">
                  <img
                    src={`/uploads/profile/${e.profilePic}`}
                    className="rounded-full object-cover"
                    style={{ width: "60px", height: "60px" }}
                    alt="profile picture"
                  />
                  <div className="details">
                    <p className="text-xl font-bold">{e.name}</p>
                    <span className="text-sm text-gray-400">{e.email}</span>
                  </div>
                </div>

                <p className="text-lg font-medium text-gray-800">
                  +91 {e.phone}
                </p>
              </div>
            ))
          )}
        </div>
      </main>
    </AdminLayout>
  );
}
