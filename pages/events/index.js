import EventList from "@/components/events/EventList";
import EventSearch from "@/components/events/EventSearch";
import { useState, useEffect } from "react";
import axios from "axios";
// import { getAllEvents } from "@/dummy-data";


export default function AllEventsPage() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get(
          "https://events-aed8d-default-rtdb.firebaseio.com/events.json"
        );
        
        const eventsArray = [];
        for (const key in response.data) {
          eventsArray.push({
            id: key,
            ...response.data[key],
          });
        }

        setEvents(eventsArray);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } 
    }

    fetchEvents();
  }, []);
    return (
        <div style={{textAlign:"center",fontFamily:"cursive"}}>
          <EventSearch/>
          <h1>All Events Page</h1>
          <EventList list={events}/>
        </div>
      
    );
  }