import { useEffect, useState } from "react";
import { getEducatorProfile } from "../../services/educatorService";
import Cookies from "js-cookie";
import { getUserFromToken } from "../../utils"; // Make sure this is the correct path

const EducatorProfile = () => {
  const accessToken = localStorage.getItem("token");

  const user = getUserFromToken(accessToken);
  const userId = user?.id;
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (userId) {
      getEducatorProfile(userId).then(setProfile);
    }
  }, [userId]);
  console.log("Profile:",profile);
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg text-[#004d7a]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-md border border-[#004d7a] p-6">
        <h2 className="text-2xl font-bold text-[#004d7a] mb-4">👩‍🏫 Educator Profile</h2>
        <div className="space-y-4 text-gray-700 text-sm">
          <div>
            <span className="font-semibold text-[#004d7a]">Name:</span> {profile.name}
          </div>
          <div>
            <span className="font-semibold text-[#004d7a]">Location:</span> {profile.location}
          </div>
          <div>
            <span className="font-semibold text-[#004d7a]">Qualification:</span> {profile.qualification}
          </div>
          <div>
            <span className="font-semibold text-[#004d7a]">Contact:</span> {profile.contact}
          </div>
          <div>
            <span className="font-semibold text-[#004d7a]">Email:</span> {profile.email}
          </div>
          {/* <div>
            <span className="font-semibold text-[#004d7a]">Approved:</span> {profile.approved ? "Yes" : "No"}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default EducatorProfile;