import EventList from "@/components/events/EventList";
import axios from "axios";
import { useRouter } from "next/router";

export default function FilteredEventsPage({ filteredEvents, isValid, error }) {

  if (error) {
    return <p className="center">Failed to load events. Please try again later.</p>;
  }

  if (!isValid) {
    return <p className="center">Invalid Year or Month</p>;
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return <p className="center">No events found for this check</p>;
  }

  return (
    <div style={{ textAlign: "center", fontFamily: "cursive" }}>
      <h1>Filtered Events Page</h1>
      <EventList list={filteredEvents} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.params;

  const year = Number(slug[0]);
  const month = Number(slug[1]);

  if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
    return {
      props: {
        filteredEvents: [],
        isValid: false,
        error: null,
      },
    };
  }

  try {
    const response = await axios.get(
      "https://events-aed8d-default-rtdb.firebaseio.com/events.json"
    );

    const allEvents = Object.entries(response.data || {}).map(([key, value]) => ({
      id: key,
      ...value,
    }));

    const filteredEvents = allEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });

    return {
      props: {
        filteredEvents,
        isValid: true,
        error: null,
      },
    };
  } catch (error) {
    console.error("Error fetching events:", error.message);
    return {
      props: {
        filteredEvents: [],
        isValid: false,
        error: "Failed to fetch events",
      },
    };
  }
}
