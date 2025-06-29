import React from "react";

const scholarships = [
  {
    title: "🎓 NMMS (National Means-cum-Merit)",
    desc: `For Class 8 students from economically weaker sections. Provides ₹12,000/year (₹1,000/month) from Class 9 to 12.
Eligibility: Parental income ≤ ₹3.5 lakh/year, minimum 55% in Class 7 (50% for SC/ST).
Selection: State-level MAT + SAT exam in Class 8.
Apply via: National Scholarship Portal.`,
  },
  {
    title: "📘 Pre-Matric Scholarship",
    desc: `For Classes 1–10 (minority/SC/ST/OBC). ₹500–₹1,000/month plus book allowances.
Eligibility: Income ≤ ₹1 lakh/year, minimum 50% marks. Only 2 students per family eligible under minority scheme.`,
  },
  {
    title: "📚 Post-Matric Scholarship",
    desc: `Supports Class 11 to PG-level students (SC/ST/OBC/Minority).
Covers tuition fees, hostel, exam fees, and maintenance allowance.
Income limit: ₹2.5 lakh/year (SC/ST), ₹1.5 lakh/year (OBC).`,
  },
  {
    title: "🏅 Central Sector Scheme (CSSS)",
    desc: `For top 20% scorers in Class 12 who enroll in UG/PG courses.
Amount: ₹12,000/year for UG, ₹20,000/year for PG.
Income cap: ₹4.5 lakh/year. Apply via: National Scholarship Portal.`,
  },
  {
    title: "🦽 Disability Scholarships",
    desc: `For students with ≥40% disability, Class 9 and above.
₹500–₹3,000/month plus ₹2,000–₹4,000/year for aids/books.
Income ≤ ₹2.5 lakh/year. Apply via: DEPwD or NSP.`,
  },
  {
    title: "🌍 State Scholarships",
    desc: `Each state has its own schemes: Telangana Epass, Bihar PMS, Maharashtra DBT, etc.
Eligibility and benefits vary by state, caste, and income. Apply via your state’s portal.`,
  },
];

const Scholarships = () => {
  return (
    <div className="bg-gradient-to-b from-white to-blue-50 px-10 py-8 min-h-screen flex flex-col items-center">

      {/* Main Title */}
      <h2 className="text-3xl font-bold text-[#004d7a] mb-2 text-center">
        Government Scholarships You Should Know
      </h2>

      {/* Subtitle */}
      <p className="text-[15px] text-gray-600 text-center max-w-xl mb-4">
        Explore national and state-level scholarships designed to support students from all backgrounds.
      </p>


      {/* Scholarship Cards */}
      <div className="grid grid-cols-2 gap-6 max-w-screen-lg text-[15px] text-gray-800">
        {scholarships.map((s, index) => (
          <div
            key={index}
            className="bg-white/90 rounded-md p-4 shadow transition hover:shadow-md hover:bg-white"
          >
            <h3 className="font-semibold mb-1 text-[#004d7a]">{s.title}</h3>
            <p className="text-gray-700 whitespace-pre-line">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Eligibility & Documents - Styled as Boxes */}
      <div className="mt-8 grid grid-cols-2 gap-6 max-w-screen-md text-[15px] text-gray-700">
        {/* Eligibility Box */}
        <div className="bg-white/90 rounded-md p-4 shadow-md">
          <h3 className="text-lg font-semibold text-[#004d7a] mb-2">📌 Eligibility</h3>
          <ul className="list-disc ml-5 space-y-1">
            <li>Class 8–12 students or higher (some UG/PG eligible)</li>
            <li>Minimum 50–70% marks in previous exam</li>
            <li>Parental income between ₹1L – ₹4.5L (varies by scheme)</li>
            <li>Regular school/college attendance</li>
          </ul>
        </div>

        {/* Documents Box */}
        <div className="bg-white/90 rounded-md p-4 shadow-md">
          <h3 className="text-lg font-semibold text-[#004d7a] mb-2">✅ Required Documents</h3>
          <ul className="list-disc ml-5 space-y-1">
            <li>Aadhaar card & Passport photo</li>
            <li>Income & Caste certificate (if applicable)</li>
            <li>Last academic marksheet</li>
            <li>Bank account details (student/guardian)</li>
            <li>School or college ID card</li>
          </ul>
        </div>
      </div>

      {/* Footer Note */}
      <p className="text-sm mt-6 text-center text-gray-500">
        Apply via the{" "}
        <a
          href="https://scholarships.gov.in/"
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          National Scholarship Portal
        </a>{" "}
        or your state’s official portal.
      </p>
    </div>
  );
};

export default Scholarships;