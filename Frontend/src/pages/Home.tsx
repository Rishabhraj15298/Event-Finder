import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import AddEvent from "./AddEvent";
import api from "../service/api";

interface Event {
  _id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  maxParticipants: number;
  currentParticipants: number;
}

const Home: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"upcoming" | "past">("upcoming");

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");
      setEvents(res.data?.data || []);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAddEvent = async (newEvent: {
    title: string;
    date: string;
    location: string;
    description: string;
    maxParticipants: number;
  }) => {
    try {
      const res = await api.post("/events", newEvent);
      if (res.status === 201) {
        await fetchEvents();
        setShowModal(false);
      } else {
        console.error("❌ Failed to add event", res.status, res.data);
      }
    } catch (err: any) {
      console.error("Error adding event:", err.response?.data ?? err.message ?? err);
    }
  };



  // 🔍 Filter + Search
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const eventDate = new Date(event.date);
    const now = new Date();
    const matchesFilter =
      filter === "upcoming" ? eventDate >= now : eventDate < now;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col items-center min-h-screen text-center px-4 pt-28">
      {/* Header with Search + Toggle + Add Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-5xl mb-6 gap-4">
        {/* Toggle */}
        <div className="flex bg-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setFilter("upcoming")}
            className={`px-6 py-2 font-medium transition ${
              filter === "upcoming" ? "bg-black text-white" : "text-gray-700"
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setFilter("past")}
            className={`px-6 py-2 font-medium transition ${
              filter === "past" ? "bg-black text-white" : "text-gray-700"
            }`}
          >
            Past Events
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search events..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Add Button */}
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2 bg-black text-white rounded-lg shadow-md hover:bg-gray-800 transition"
        >
          + Add Event
        </button>
      </div>

      {/* Event List */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard
              key={event._id}
              _id={event._id}
              title={event.title}
              date={event.date}
              location={event.location}
              description={event.description}
              currentParticipants={event.currentParticipants}
              maxParticipants={event.maxParticipants}
            />
          ))
        ) : (
          <p className="text-gray-500 text-lg mt-10">No events found.</p>
        )}
      </div>

      {/* Popup Modal */}
      {showModal && (
        <AddEvent onClose={() => setShowModal(false)} onAdd={handleAddEvent} />
      )}
    </div>
  );
};

export default Home;
