import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Users, CalendarDays, MapPin, ArrowLeft } from "lucide-react";
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

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchEvent = async () => {
    try {
      const res = await api.get(`/events/${id}`);
      setEvent(res.data?.data || null);
    } catch (err) {
      console.error("Error fetching event:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  if (loading) return <p className="text-center mt-20">Loading event...</p>;
  if (!event) return <p className="text-center mt-20 text-gray-500">Event not found.</p>;

  return (
    <div className="max-w-3xl mx-auto pt-24 px-6">
      <Link to="/" className="flex items-center text-gray-600 hover:text-black mb-6">
        <ArrowLeft size={18} className="mr-2" /> Back to Events
      </Link>

      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>

        <div className="flex flex-wrap items-center gap-4 text-gray-700 mb-4">
          <span className="flex items-center gap-2">
            <CalendarDays size={18} /> {new Date(event.date).toDateString()}
          </span>
          <span className="flex items-center gap-2">
            <MapPin size={18} /> {event.location}
          </span>
        </div>

        <p className="text-gray-700 leading-relaxed mb-6">{event.description}</p>

        <div className="flex items-center gap-3 text-gray-800">
          <Users size={20} />
          <span className="font-medium">
            {event.currentParticipants} / {event.maxParticipants} participants
          </span>
        </div>

        <div className="w-full bg-gray-200 h-3 rounded-full mt-3 overflow-hidden">
          <div
            className={`h-full ${
              event.currentParticipants >= event.maxParticipants
                ? "bg-red-500"
                : "bg-green-500"
            }`}
            style={{
              width: `${Math.min(
                (event.currentParticipants / event.maxParticipants) * 100,
                100
              )}%`
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
