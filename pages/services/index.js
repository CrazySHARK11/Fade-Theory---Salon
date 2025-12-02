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

export async function getServerSideProps() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/service`);
    const data = await response.json();

    return {
      props: { services: data.services || [] },
    };
  } catch (err) {
    
    console.error("Error fetching services:", {
      message: err.message,
      stack: err.stack,
    });

    return {
      props: { services: [], err },
    };
  }
}
