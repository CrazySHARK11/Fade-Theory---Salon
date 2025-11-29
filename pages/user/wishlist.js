import LayoutPublic from "../../components/LayoutPublic";
import { Toaster } from "react-hot-toast";
import { SlClock } from "react-icons/sl";
import { SlClose } from "react-icons/sl";
import Link from "next/link";
import axiosInstance from "../../utils/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { showToast } from "../../utils/showToast";
import { useSelector } from "react-redux";

export default function Wishlist() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">You are not logged in.</p>
      </div>
    );
  }
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const res = await axiosInstance.get("/user/wishlist");
      return res.data.data; // array of liked services
    },
  });

  const removeFromWishlist = useMutation({
    mutationFn: async (serviceId) => {
      const { data } = await axiosInstance.post(`user/${serviceId}/unlike`);
      return { ...data, serviceId };
    },
    onSuccess: (data, variables, context) => {
      showToast("success", "Removed from wishlist");

      queryClient.setQueryData(["wishlist"], (oldWishlist) => {
        if (!oldWishlist) return [];
        return oldWishlist.filter((item) => item._id !== variables);
      });
    },
    onError: (err) => {
      showToast("error", err.response?.data?.message);
    },
  });

  const handleUnlike = (serviceId) => {
    removeFromWishlist.mutate(serviceId);
  };

  return (
    <LayoutPublic>
      <section className="bg-red-200" style={{ paddingTop: "98px" }}>
        <div
          className="wrapper max-w-7xl mx-auto flex items-center justify-center"
          style={{ height: "300px" }}
        >
          <h1 className="text-3xl font-semibold">Wishlist Page</h1>
        </div>
      </section>
      <Toaster />

      <main className="wrapper max-w-7xl mt-10 mx-auto min-h-[400px] mb-10">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        ) : (
          <div className="flex flex-wrap w-full gap-5 justify-center">
            {data?.length === 0 ? (
              <div className="w-full h-[300px] flex gap-5 flex-col justify-center items-center">
                Services Liked by you will appear here.
                <Link href="/services" className="px-10 py-4 rounded-full text-white bg-gray-950">Go to Service</Link>
              </div>
            ) : (
              data?.map((service) => (
                <div
                  key={service._id}
                  className="bg-white w-full max-w-[390px] rounded-xl shadow-lg overflow-hidden relative group"
                >
                  {/* Remove button */}
                  <div
                    onClick={() => handleUnlike(service._id)}
                    className="absolute right-5 top-5 z-20 bg-white p-3 rounded-full cursor-pointer transform translate-x-24 group-hover:translate-x-0 transition-transform duration-500 ease-out"
                  >
                    <SlClose className="text-2xl hover:text-red-500 transition-all duration-300" />
                  </div>

                  {/* Image */}
                  <div className=" h-72 relative">
                    <img
                      src={service.imageUrl?.[0] || "/images/default.jpg"}
                      alt={service.title}
                      className="w-[500px] h-72 object-cover rounded-xl"
                    />

                    <span className="absolute bottom-5 left-5 p-2 bg-white rounded">
                      <div className="flex items-center gap-2">
                        <p className="text-yellow-500 text-sm">
                          ★{" "}
                          <span className="text-gray-800">
                            {service.averageRating?.toFixed(1) || "0.0"}
                          </span>
                        </p>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500 text-[11px]">
                          {service.reviews?.length || 0}
                        </span>
                      </div>
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-1">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {service.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm flex items-center gap-3 text-gray-700 bg-gray-100 px-3 py-1 rounded-md">
                        <SlClock /> Duration: {service.durationMinutes} mins
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-black">
                        ₹{service.price}
                      </span>

                      <Link
                        href={`/services/${service._id}`}
                        className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </LayoutPublic>
  );
}
