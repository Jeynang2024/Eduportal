import { useEffect, useState } from "react";
import { getSessions } from "../services/generalService";
import { Calendar } from "lucide-react";

const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const SessionList = ({ title }) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSessions().then((data) => {
      setSessions(Array.isArray(data) ? data : []);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <span className="text-blue-700 font-semibold">Loading sessions...</span>
      </div>
    );
  }

  if (!sessions.length) {
    return (
      <div className="flex justify-center items-center py-8">
        <span className="text-gray-500">No sessions available.</span>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-6 my-6">
      <h3 className="text-2xl font-bold text-[#004d7a] mb-6 flex items-center gap-2">
        <Calendar className="w-6 h-6 text-blue-700" />
        {title}
      </h3>
      <ul className="grid gap-6 md:grid-cols-2">
        {sessions.map((session, idx) => (
          <li
            key={session._id || idx}
            className="bg-white rounded-lg shadow hover:shadow-xl transition-shadow border border-blue-100 p-5 flex flex-col gap-2"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                {session.date}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-blue-800 text-lg">
                {session.title}
              </span>
            </div>
            <span className="text-gray-600">{session.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SessionList;