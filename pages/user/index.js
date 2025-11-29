import React, { useRef, useState } from "react";
import { SlPhone, SlEnvolope, SlLogout } from "react-icons/sl";
import { clearUser, setAvatar } from "../../store/slices/authSlice";
import { persistor } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import LayoutPublic from "../../components/LayoutPublic";
import { useRouter } from "next/router";
import axiosInstance from "../../utils/axiosInstance";
import { SlPencil } from "react-icons/sl";
import { useMutation } from "@tanstack/react-query";
import { showToast } from "../../utils/showToast";
import { Toaster } from "react-hot-toast";

export default function User() {
  const fileInputRef = useRef(null);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const profilePic = user?.profilePic ? `/uploads/profile/${user.profilePic}` : "images/profileimage.jpg"

  const handleLogout = async () => {
    await axiosInstance.post("/auth/logout");
    dispatch(clearUser());
    persistor.purge();
    router.push("/login");
  };

  const changeProfilePictureMutation = useMutation({
    mutationFn: async (profilepic) => {
      const { data } = await axiosInstance.post("/user/upload-profile", profilepic);
      return data;
    },

    onSuccess: (data) => {
      showToast("success", data.message);
      dispatch(setAvatar(data.profilePic));
    },

    onError: (error) => {
      console.log(error)
      showToast("error", error.response.data.message);
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // PREVIEW
    const formData = new FormData();
    formData.append("profile", file);

    changeProfilePictureMutation.mutate(formData);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">You are not logged in.</p>
      </div>
    );
  }

  return (
    <LayoutPublic>
      <Toaster />
      <section className="max-w-7xl mx-auto h-screen" style={{ paddingTop: "150px" }}>
        <div className="side-section flex-col flex items-start">
          <div className="relative">
            <img
              className="w-[200px] border-gray-400 border h-[200px] object-cover rounded-full"
              src={profilePic}
              alt=""
            />
            <button
              onClick={() => fileInputRef.current.click()}
              className="absolute cursor-pointer bg-gray-300 p-3 z-20 text-gray-600 rounded-full"
              style={{ right: "25px", bottom: "5px" }}
            >
              {" "}
              <SlPencil />
            </button>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
            />
          </div>

          <div className="flex flex-col items-start gap-3 mt-5">
            <h2 className="text-3xl font-semibold">{user.name}</h2>
            <p className="flex items-center gap-2">
              <SlEnvolope />
              <span className="text-gray-500">{user.email}</span>
            </p>
            <p className="flex items-center gap-2">
              {" "}
              <SlPhone />{" "}
              <span className="text-gray-500"> +1 {user.phone}</span>
            </p>
            <div className="flex gap-5 items-center mt-5">
              <button className="text-blue-500 cursor-pointer flex items-center gap-3" >Update <SlPencil /></button>
              <span className="text-gray-300">|</span>
              <button className="text-red-500 cursor-pointer flex items-center gap-3" onClick={handleLogout}>Logout <SlLogout /></button>
            </div>
          </div>
        </div>
      </section>
    </LayoutPublic>
  );
}
