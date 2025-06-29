import { useEffect, useState } from "react";
import { getStudentProfile } from "../../services/studentService";
import Cookies from "js-cookie";
import { getUserFromToken } from "../../utils";

const StudentProfile = () => {
  const accessToken = Cookies.get("accessToken");
  const user = getUserFromToken(accessToken);
  const userId = user?.id;
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (userId) {
      getStudentProfile(userId).then(setProfile);
    }
  }, [userId]);

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
        <h2 className="text-2xl font-bold text-[#004d7a] mb-4">
          🎓 Student Profile
        </h2>
        <div className="space-y-4 text-gray-700 text-sm">
          <div>
            <span className="font-semibold text-[#004d7a]">Name:</span>{" "}
            {profile.name}
          </div>
          <div>
            <span className="font-semibold text-[#004d7a]">Grade:</span>{" "}
            {profile.grade}
          </div>
          <div>
            <span className="font-semibold text-[#004d7a]">Date of Birth:</span>{" "}
            {profile.DateOfBirth
              ? new Date(profile.DateOfBirth).toLocaleDateString()
              : "-"}
          </div>
          <div>
            <span className="font-semibold text-[#004d7a]">Caste:</span>{" "}
            {profile.caste}
          </div>
          <div>
            <span className="font-semibold text-[#004d7a]">Religion:</span>{" "}
            {profile.religion}
          </div>
          <div>
            <span className="font-semibold text-[#004d7a]">Mother Tongue:</span>{" "}
            {profile.mothertoungue}
          </div>
          <div>
            <span className="font-semibold text-[#004d7a]">
              Literacy Score:
            </span>{" "}
            {profile.literacyscore}
          </div>
          <div>
            <span className="font-semibold text-[#004d7a]">
              Behavioral Score:
            </span>{" "}
            {profile.behavioralScore}
          </div>
          <div>
            <span className="font-semibold text-[#004d7a]">Blood Group:</span>{" "}
            {profile.bloodgroup || "-"}
          </div>
          <div>
            <span className="font-semibold text-[#004d7a]">Height:</span>{" "}
            {profile.height ? `${profile.height} cm` : "-"}
          </div>
          <div>
            <span className="font-semibold text-[#004d7a]">Weight:</span>{" "}
            {profile.weight ? `${profile.weight} kg` : "-"}
          </div>
          <div>
            <span className="font-semibold text-[#004d7a]">
              Extracurricular Activities:
            </span>{" "}
            {profile.extracurricularActivities &&
            profile.extracurricularActivities.length > 0
              ? profile.extracurricularActivities.join(", ")
              : "-"}
          </div>
          <div className="pt-2">
            <span className="font-semibold text-[#004d7a]">
              Parent Information:
            </span>
            <div className="ml-4">
              <div>
                <span className="font-semibold">Father:</span>{" "}
                {profile.parentsInformation?.fatherName}
              </div>
              <div>
                <span className="font-semibold">Mother:</span>{" "}
                {profile.parentsInformation?.motherName}
              </div>
              <div>
                <span className="font-semibold">Contact:</span>{" "}
                {profile.parentsInformation?.contactNumber}
              </div>
            </div>
          </div>
          <div className="pt-2">
            <span className="font-semibold text-[#004d7a]">Address:</span>
            <div className="ml-4">
              <div>
                <span className="font-semibold">Street:</span>{" "}
                {profile.address?.street}
              </div>
              <div>
                <span className="font-semibold">City:</span>{" "}
                {profile.address?.city}
              </div>
              <div>
                <span className="font-semibold">State:</span>{" "}
                {profile.address?.state}
              </div>
              <div>
                <span className="font-semibold">Zip Code:</span>{" "}
                {profile.address?.zipCode}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
