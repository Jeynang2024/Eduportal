import toast from "react-hot-toast";
import { addBehaviouralData } from "../../../services/educatorService";


const AddBehaviouralDataForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    addBehaviouralData({ dummy: true });
    toast.success("Behavioural data added!");
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Behaviour Note</label>
        <input className="border px-3 py-2 rounded w-full" placeholder="Behaviour Note" required />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Behavioural Data</button>
    </form>
  );
};

export default AddBehaviouralDataForm;