// src/components/EventCard.tsx
import React from "react";
import { Users, CalendarDays, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EventCardProps {
  _id?: string;
  title: string;
  date: string;
  location: string;
  description: string;
  currentParticipants: number;
  maxParticipants: number;
}

const EventCard: React.FC<EventCardProps> = ({
  _id,
  title,
  date,
  location,
  description,
  currentParticipants,
  maxParticipants,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (_id) navigate(`/event/${_id}`);
    else console.warn("⚠️ Event ID missing, cannot navigate!");
  };

  return (
    <div
      onClick={handleClick}
      className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all p-6 text-left flex flex-col justify-between cursor-pointer"
    >
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h2>

      <div className="flex items-center text-gray-600 text-sm mb-2 gap-3">
        <span className="flex items-center gap-1">
          <CalendarDays size={16} />
          {new Date(date).toDateString()}
        </span>
        <span className="flex items-center gap-1">
          <MapPin size={16} />
          {location}
        </span>
      </div>

      <p className="text-gray-700 text-sm mb-4 line-clamp-3">{description}</p>

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Users size={18} />
          <span>
            <span className="font-medium">{currentParticipants}</span> /{" "}
            <span className="text-gray-600">{maxParticipants}</span> participants
          </span>
        </div>

        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${
              currentParticipants >= maxParticipants
                ? "bg-red-500"
                : "bg-green-500"
            }`}
            style={{
              width: `${Math.min(
                (currentParticipants / maxParticipants) * 100,
                100
              )}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
