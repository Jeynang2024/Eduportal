import { useState } from 'react';

const EducatorProfile = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    location: 'Hyderabad, Telangana',
    qualification: 'M.Tech in Computer Science',
    contact: '+91-9876543210',
    gmail: 'johndoe@gmail.com',
  });

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
            <span className="font-semibold text-[#004d7a]">Gmail:</span> {profile.gmail}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducatorProfile;
