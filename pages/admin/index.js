import React from "react";
import AdminLayout from "../../components/AdminLayout";
import { useSelector } from "react-redux";

export default function Home() {
  const { admin } = useSelector((state) => state.adminAuth);

  return (
    <AdminLayout>
      <header className="w-full bg-white p-5 flex justify-between shadow rounded-2xl">
        <h2 className="text-xl font-extrabold">Welcome, {admin?.name}</h2>
        <p className="text-gray-400">{admin?.email}</p>
      </header>
    </AdminLayout>
  );
}
