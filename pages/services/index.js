import LayoutPublic from "../../components/LayoutPublic";
import BarberServiceCard from "../../components/ServiceCard";
import axiosInstance from "../../utils/axiosInstance";

export default function Services({ services }) {
  return (
    <LayoutPublic>
      <main style={{ paddingTop: "97px" }}>
        <div className="wrapper max-w-7xl mx-auto py-20 flex flex-wrap items-center justify-center gap-7">
          {services?.map((e) => (
            <BarberServiceCard
              key={e._id}
              id={e._id}
              title={e.title}
              liked={e.likes}
              averageRating={e.averageRating}
              reviewsCount={e.reviews.length}
              isPremium={e.isPremium}
              duration={e.durationMinutes}
              images={e.imageUrl}
              price={e.price}
              description={e.description}
            />
          ))}
        </div>
      </main>
    </LayoutPublic>
  );
}

export async function getStaticProps() {
  try {
    const response = await axiosInstance.get("service/");
    const services = response.data.services;

    return {
      props: {
        services, // <-- now it's a plain object
      },
    };
  } catch (err) {
    return {
      props: { services: [] },
    };
  }
}
