import React, { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import AdminLayout from "../../../components/AdminLayout";
import axiosInstance from "../../../utils/axiosInstance";
import { showToast } from "../../../utils/showToast";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

export default function Addservices() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const [filters, setFilters] = useState({
    premium: false,
  });

  const createServiceMutation = useMutation({
    mutationFn: async (formData) => {
      const { data } = await axiosInstance.post("/service/create", formData);
      return data;
    },

    onSuccess: () => {
      showToast("success", "Service Created Successfully");
      setTimeout(()=>{
        router.push("/admin/services");
      }, 1500)
    },

    onError: (err) => {
      setError(err.response.data.message);
    },
  });

  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 7) {
      showToast("error", "Maximum 7 Images");
      setImages([]);
      fileInputRef.current.value = "";
      return;
    }
    
    for (let f of files) {
      if (f.size > 1 * 1024 * 1024) {
        showToast("error", `${f.name} is Larger than 1 MB`);
        fileInputRef.current.value = "";
        setImages([]);
        return;
      }
      
      if (!["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(f.type)) {
        showToast("error", `${f.name} is Larger than 1 MB`);
        fileInputRef.current.value = "";
        return;
      }
    }

    setImages(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (images.length === 0) {
      showToast("error", "At least 1 image is required");
      return;
    }

    if (images.length > 7) {
      showToast("error", "Maximum 7 images allowed");
      return;
    }

    const formData = new FormData();
    formData.append("title", e.target.title.value);
    formData.append("description", e.target.description.value);
    formData.append("price", e.target.price.value);
    formData.append("deletedPrice", e.target.deletedPrice.value);
    formData.append("durationMinutes", e.target.durationMinutes.value);

    formData.append("isPremium", filters.premium);

    images.forEach((file) => {
      formData.append("images", file);
    });

    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ": ", pair[1]);
    // }
    createServiceMutation.mutate(formData);
  };

  return (
    <AdminLayout>
      <Toaster />
      <header className="w-full bg-white p-5 flex justify-between shadow rounded-2xl">
        <h2 className="text-xl font-extrabold">Add Services</h2>
      </header>

      <h1 className="text-4xl text-center py-10 font-semibold">
        Create a Service
      </h1>

      <form
        className="max-w-5xl flex flex-col gap-5 mx-auto"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="images" className="text-gray-500 text-sm">
            Images
          </label>
          <input
            type="file"
            name="images"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            id="images"
            ref={fileInputRef}
            onChange={handleImages}
            multiple
            className="w-full p-3 rounded-md border border-blue-200 focus:border-blue-950 outline-none transition-all"
          />
        </div>
        <div>
          <label htmlFor="title" className="text-gray-500 text-sm">
            Title
          </label>
          <input
            type="text"
            placeholder="Title of Service"
            name="title"
            id="title"
            className="w-full p-3 rounded-md border border-blue-200 focus:border-blue-950 outline-none transition-all"
          />
        </div>
        <div className="flex gap-3">
          <label htmlFor="premium" className="text-gray-500 text-sm">
            Is Premium
          </label>
          <input
            type="checkbox"
            placeholder="Title of Service"
            name="isPremium"
            checked={filters.premium}
            onChange={(e) =>
              setFilters({ ...filters, premium: e.target.checked })
            }
            id="premium"
          />
        </div>
        <div>
          <label htmlFor="requiredtime" className="text-gray-500 text-sm">
            Time
          </label>
          <input
            type="number"
            placeholder="Time In Minutes"
            name="durationMinutes"
            id="requiredtime"
            className="w-full p-3 rounded-md border border-blue-200 focus:border-blue-950 outline-none transition-all"
          />
        </div>
        <div className="flex gap-5 w-full">
          <div className="w-full">
            <label htmlFor="price" className="text-gray-500 text-sm">
              Price
            </label>
            <input
              type="number"
              placeholder="Price"
              name="price"
              id="price"
              className="w-full p-3 rounded-md border border-blue-200 focus:border-blue-950 outline-none transition-all"
            />
          </div>
          <div className="w-full">
            <label htmlFor="deletedPrice" className="text-gray-500 text-sm">
              Deleted Price
            </label>
            <input
              type="number"
              placeholder="Deleted Price"
              name="deletedPrice"
              id="deletedPrice"
              className="w-full p-3 rounded-md border border-blue-200 focus:border-blue-950 outline-none transition-all"
            />
          </div>
        </div>
        <div>
          <label htmlFor="description" className="text-gray-500 text-sm">
            Description
          </label>
          <textarea
            name="description"
            rows={"10"}
            id="description"
            className="w-full p-3 rounded-md border border-blue-200 focus:border-blue-950 outline-none transition-all"
          ></textarea>
        </div>

        <button
          disabled={createServiceMutation.isPending}
          className="cursor-pointer py-4 px-15 rounded-lg text-white bg-gray-900 disabled:bg-gray-500 mx-auto"
        >
          {createServiceMutation.isPending ? "Creating..." : "Create Service"}
        </button>
      </form>
    </AdminLayout>
  );
}
