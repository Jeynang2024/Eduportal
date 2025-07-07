import React, { useState } from "react";
import AddSessionForm from "../../components/educator/add-data/AddSessionForm";
import AddAcademicDataForm from "../../components/educator/add-data/AddAcademicDataForm";
import AddBehaviouralDataForm from "../../components/educator/add-data/AddBehaviouralDataForm";
import AddAchivementDataForm from "../../components/educator/add-data/AddAchivements";
const tabList = [
  { key: "session", label: "Add Session" },
  { key: "academic", label: "Add Academic Data" },
  { key: "behavioural", label: "Add Behavioural Data" },
  { key: "achivement", label: "Add Achivement Data" },

];


const AddData = () => {
  const [tab, setTab] = useState("session");
  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <div className="flex gap-2 mb-6">
        {tabList.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-t font-semibold border-b-2 transition-all ${tab === t.key ? "bg-blue-600 text-white border-blue-600" : "bg-blue-50 text-blue-700 border-transparent hover:bg-blue-100"}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div>
        {tab === "session" && <AddSessionForm />}
        {tab === "academic" && <AddAcademicDataForm />}
        {tab === "behavioural" && <AddBehaviouralDataForm />}
        {tab === "achivement" && <AddAchivementDataForm />}

      </div>
    </div>
  );
};

export default AddData;
