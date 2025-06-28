import toast from "react-hot-toast";
import { addAcademicData } from "../../../services/educatorService";


const AddAcademicDataForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    addAcademicData({ dummy: true });
    toast.success("Academic data added!");
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Subject</label>
        <input className="border px-3 py-2 rounded w-full" placeholder="Subject" required />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Academic Data</button>
    </form>
  );
};

export default AddAcademicDataForm;