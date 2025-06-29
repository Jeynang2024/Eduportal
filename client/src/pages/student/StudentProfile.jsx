import React, { useState } from 'react';

const StudentProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    dateOfBirth: '',
    parentsContact: '',
    caste: '',
    community: '',
    language: '',
    location: '',
    literacyScore: 0,
    behavioralScore: 0,
    bio: '',
    bloodGroup: '',
    height: '',
    weight: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ['literacyScore', 'behavioralScore'].includes(name)
        ? parseInt(value) || 0
        : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile saved!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6f0fa] to-white pt-8 px-4 lg:px-40 xl:px-60">
      {/* Section Header */}
      <div className="bg-[#004d7a] text-white py-6 shadow text-center rounded-xl mb-10">
        <h1 className="text-3xl font-bold">👤 Student Profile Form</h1>
        <p className="text-sm mt-2">Fill in your information clearly and accurately</p>
      </div>

      {/* Form Card */}
      <div className="w-full bg-white p-10 rounded-2xl shadow-xl border border-[#c5d9ec]">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: 'Name', name: 'name' },
            { label: 'Grade', name: 'grade' },
            { label: 'Date of Birth', name: 'dateOfBirth', type: 'date' },
            { label: "Parent's Contact", name: 'parentsContact' },
            { label: 'Caste', name: 'caste' },
            { label: 'Community', name: 'community' },
            { label: 'Language', name: 'language' },
            { label: 'Location', name: 'location' },
            { label: 'Literacy Score', name: 'literacyScore', type: 'number' },
            { label: 'Behavioral Score', name: 'behavioralScore', type: 'number' },
            { label: 'Blood Group', name: 'bloodGroup' },
            { label: 'Height (cm)', name: 'height' },
            { label: 'Weight (kg)', name: 'weight' },
          ].map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">{field.label}</label>
              <input
                type={field.type || 'text'}
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                className="rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004d7a] transition"
                placeholder={`Enter ${field.label}`}
              />
            </div>
          ))}

          {/* Bio Field */}
          <div className="col-span-full flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={4}
              placeholder="Write a short bio..."
              className="rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#004d7a] transition"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-full text-right">
            <button
              type="submit"
              className="bg-[#004d7a] text-white font-semibold px-8 py-2 rounded-xl hover:bg-[#00345d] transition shadow-md"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentProfile;
