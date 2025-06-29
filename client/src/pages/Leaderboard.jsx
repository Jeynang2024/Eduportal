import { useEffect, useState } from "react";
import api from "../utils/api";

const tagColors = [
  "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",
  "bg-yellow-100 text-yellow-700",
  "bg-purple-100 text-purple-700",
  "bg-pink-100 text-pink-700",
  "bg-indigo-100 text-indigo-700",
];

const Leaderboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/user/students").then((res) => {
      setStudents(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e0e7ef] py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-blue-100 p-8">
        <h1 className="text-3xl font-extrabold text-[#004d7a] mb-8 text-center tracking-tight">
          🏆 Student Leaderboard
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-blue-50 text-[#004d7a]">
                <th className="py-3 px-4 text-left font-bold">Rank</th>
                <th className="py-3 px-4 text-left font-bold">Name</th>
                <th className="py-3 px-4 text-left font-bold">Literacy</th>
                <th className="py-3 px-4 text-left font-bold">Behaviour</th>
                <th className="py-3 px-4 text-left font-bold">Hobbies</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-blue-700 font-semibold">
                    Loading...
                  </td>
                </tr>
              ) : (
                students.map((s, idx) => (
                  <tr
                    key={s.name + idx}
                    className={`transition-all hover:bg-blue-50 ${idx < 3 ? "font-bold text-blue-900" : ""}`}
                  >
                    <td className="py-3 px-4">
                      <span className={`inline-block w-8 h-8 rounded-full text-center leading-8 font-extrabold ${idx === 0 ? "bg-yellow-300 text-yellow-900" : idx === 1 ? "bg-gray-300 text-gray-800" : idx === 2 ? "bg-orange-300 text-orange-900" : "bg-blue-100 text-blue-700"}`}>
                        {s.rank}
                      </span>
                    </td>
                    <td className="py-3 px-4">{s.name}</td>
                    <td className="py-3 px-4">{s.literacyscore}</td>
                    <td className="py-3 px-4">{s.behavioralScore}</td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-2">
                        {(s.extracurricularActivities || []).map((hobby, hIdx) => (
                          <span
                            key={hobby + hIdx}
                            className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${tagColors[hIdx % tagColors.length]}`}
                          >
                            {hobby}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;