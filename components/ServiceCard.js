import Link from "next/link";
import { SlClock } from "react-icons/sl";
import { RiHeart3Line, RiHeart3Fill } from "react-icons/ri";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import { showToast } from "../utils/showToast";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function BarberServiceCard({ title, averageRating, reviewsCount, id, images, isPremium, duration, price, description, liked }) {

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const initialLiked = liked?.includes(user?.id)

  const [isliked, setIsLiked] = useState(initialLiked);

  const LikeMutate = useMutation({
    mutationFn: async (serviceId) => {
      const { data } = await axiosInstance.post(`user/${serviceId}/like`);
      return data;
    },
    onSuccess: () => {
      setIsLiked(true);
      showToast("success", "Liked 💓");
    },
    onError: (err) => {
      showToast("error", err.response?.data?.message);
    },
  });

 
  const handleLike = (e) => {
    e.stopPropagation();
     if (!isAuthenticated) {
      return showToast("error", "Login required");
    }
    LikeMutate.mutate(id);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-[390px] relative group">
      <Toaster />

      {/* Labels */}
      {isPremium && (
        <div className="absolute z-20 top-4 left-4 bg-yellow-300 text-black px-3 py-1 rounded-full text-xs font-bold">
          PREMIUM
        </div>
      )}

      <div
        onClick={handleLike}
        className="absolute right-5 top-5 z-20 bg-white p-4 rounded-full cursor-pointer transform translate-x-24 group-hover:translate-x-0 transition-transform duration-500 ease-out"
      >
        {isliked ? (
          <RiHeart3Fill
            className={`text-2xl text-pink-500 transition-all duration-300 
                    ${LikeMutate.isPending ? "scale-125" : "scale-100"}`}
          />
        ) : (
          <RiHeart3Line
            className={`text-2xl text-black transition-all duration-300 
                    ${LikeMutate.isPending ? "scale-125" : "scale-100"}`}
          />
        )}
      </div>

      {/* Image */}
      <div className="w-full h-72 relative">
        <img
          src={images[0]}
          alt="Barber Service"
          className="w-full h-72 object-cover rounded-xl"
        />

        <span className="absolute bottom-5 left-5 p-2 bg-white rounded">
          <div className="flex items-center gap-2">
            <p className="text-yellow-500 text-sm">
              ★ <span className="text-gray-800">{averageRating}</span>
            </p>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500 text-[11px]">{reviewsCount}</span>
          </div>
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-2xl font-semibold text-gray-900 mb-1">{title}</h3>

        {/* Ratings */}

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        {/* Timing */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm flex items-center gap-3 text-gray-700 bg-gray-100 px-3 py-1 rounded-md">
            <SlClock /> Duration: {duration} mins
          </span>
        </div>

        {/* Price + Button */}
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-black">₹{price}</span>

          <Link
            href={`/services/${id}`}
            className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
