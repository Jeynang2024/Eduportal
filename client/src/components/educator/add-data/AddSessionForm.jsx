import toast from "react-hot-toast";
import { addSession } from "../../../services/educatorService";

const AddSessionForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    addSession({ dummy: true });
    toast.success("Session added!");
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Session Name</label>
        <input className="border px-3 py-2 rounded w-full" placeholder="Session Name" required />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Session</button>
    </form>
  );
};

export default AddSessionForm;