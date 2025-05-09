import { useRouter } from "next/router";
import EventSummary from "@/components/event-detail/event-summary";
import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import axios from "axios";

export default function DetailedEventPage({ event }) {
  const router = useRouter();

  if(!event){
    return <p>No event found!</p>;
  }

  return (
    <div style={{ textAlign: "center", fontFamily: "cursive" }}>
      <h1>Detailed Event Page</h1>
      <EventSummary title={event.title} />
      <EventLogistics
        d={event.date}
        ad={event.location}
        i={event.image}
        t={event.title}
      />
      <EventContent data={event.description} />
    </div>
  );
}

export async function getStaticProps(context) {
  try {
    const fetched_data = await axios.get(
      "https://events-aed8d-default-rtdb.firebaseio.com/events.json"
    );

    const data = fetched_data.data;
    const event = data[context.params.id];

    return {
      props: {
        event,
      },
      revalidate: 60, 
    };
  } catch {
    return {
      props: {
        event: null,
      },
    };
  }
}
export async function getStaticPaths() {
  try {
    const fetched_data = await axios.get(
      "https://events-aed8d-default-rtdb.firebaseio.com/events.json"
    );


    const paths = [];
    for (const key in data) {
      paths.push({ params: { id: key } });
    }

    return {
      paths,
      fallback: true,
    };
  } catch {
    return {
      paths: [],
      fallback: true, 
    };
  }
}