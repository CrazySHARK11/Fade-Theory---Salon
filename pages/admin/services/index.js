import React, { useEffect, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import Link from "next/link";
import { SlPlus, SlClock } from "react-icons/sl";
import axiosInstance from "../../../utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await axiosInstance.get("/admin/get-services");
        setServices(data.services);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const deleteServiceMutation = useMutation({
     
  })

  return (
    <AdminLayout>
      <header className="w-full bg-white p-5 mb-5 flex justify-between shadow rounded-2xl">
        <h2 className="text-xl font-extrabold">Services</h2>
      </header>

      <nav className="w-full flex justify-between">
        <Link
          className="bg-white p-5 shadow rounded-2xl flex gap-10 text-md items-center font-medium"
          href="./services/add-service"
        >
          Create A New Service
          <SlPlus className="text-blue-600 text-lg" />
        </Link>
      </nav>
      {/*  */}
      <main>
        <h3 className="text-4xl my-10 font-bold text-center">
          All the Haircuts
        </h3>
        <div className="flex flex-col gap-5">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
            </div>
          ) : (
            services?.map((e) => {
              return (
                <div className="p-6 rounded-xl shadow bg-white flex justify-between items-center gap-4">
                  <div className="flex gap-3 items-center justify-evenly w-full">
                    <img
                      src={e.imageUrl[0]}
                      className="rounded-xl object-cover"
                      style={{ width: "60px", height: "60px" }}
                      alt="profile picture"
                    />
                    <span className="text-gray-500">|</span>
                    <p className="text-xl font-medium">{e.title}</p>
                    <span className="text-gray-500">|</span>
                    <div className="duration flex gap-2 items-center">
                      <SlClock className="text-red-700" />
                      <span className="text-lg font-semibold">
                        {e.durationMinutes} Mins
                      </span>
                    </div>
                    <span className="text-gray-500">|</span>
                    <p
                      className={`p-2 rounded-full px-4 ${
                        e.isPremium ? "bg-yellow" : "bg-gray"
                      }-300 font-semibold`}
                    >
                      {e.isPremium ? "Premium" : "General"}
                    </p>
                    <span className="text-gray-500">|</span>

                    <div className="action-group flex gap-4">
                      <Link href="" className="text-blue-500">
                        Update
                      </Link>
                      <span className="text-gray-500">|</span>
                      <button className="text-red-500">Delete</button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </AdminLayout>
  );
}
