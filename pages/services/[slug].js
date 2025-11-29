import LayoutPublic from "../../components/LayoutPublic";
import axiosInstance from "../../utils/axiosInstance";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/effect-cards";
import "swiper/css";

export default function Page({ service }) {
  return (
    <LayoutPublic>
      <main style={{ paddingTop: "97px" }}>
        <div className="wrapper max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-7">
          <div className="flex justify-between w-full mb-10 pt-10">
            <Swiper
              modules={[EffectCards]}
              pagination={{ clickable: true }}
              effect={"cards"}
              grabCursor={true}
              className="mySwiper w-[500px] h-[600px] rounded-3xl shadow-2xl"
            >
              {service.imageUrl.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img}
                    alt="Service Image"
                    className="w-full h-full object-cover rounded-3xl"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="w-[500px] flex flex-col gap-5">
              <h1 className="text-4xl font-bold ">{service.title}</h1>
              <p className="text-2xl flex items-center gap-3 font-semibold text-green-600">
                <span>${service.price}</span> <span className="line-through font-medium text-gray-400 text-[20px]">${service.deletedPrice}</span>
              </p>
              <div className="actions flex items-center gap-5"> 
                <button className="px-6 py-3 rounded-full bg-blue-950 text-white hover:bg-blue-900 transition">Book Now</button>
              </div>
              <p>{service.description}</p>
              
            </div>

          </div>
        </div>
      </main>
    </LayoutPublic>
  );
}

export async function getStaticPaths() {
  return {
    paths: [], // generate nothing at build
    fallback: "blocking", // generate page on first request
  };
}

export async function getStaticProps({ params }) {
  try {
    const id = params.slug;
    const response = await axiosInstance.get(`service/${id}`);

    return {
      props: {
        service: response.data.service,
      },
      revalidate: 60, // re-generate every 60 sec
    };
  } catch (err) {
    return { notFound: true };
  }
}
