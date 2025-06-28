import toast from "react-hot-toast";
import { addSession } from "../../../services/educatorService";
import './AddSessionStyling.css';

const AddSessionForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    addSession({ dummy: true });
    toast.success("Session added!");
  };
  return (
    <div className="session-form">
      <h2>Add New Session</h2>
      <form>
        <label>Title</label>
        <input type="text" placeholder="Enter session title" />

        <label>Description</label>
        <textarea placeholder="Enter session description"></textarea>

        <label>Date</label>
        <input type="date" />

        <label>Educator ID</label>
        <select>
          <option value="">Select ID</option>
          <option value="EDU001">EDU001</option>
          <option value="EDU002">EDU002</option>
          <option value="EDU003">EDU003</option>
        </select>

        <button type="submit">Add Session</button>
      </form>
    </div>
  );
};

export default AddSessionForm;