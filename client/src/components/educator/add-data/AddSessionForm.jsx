import { useState } from "react";
import toast from "react-hot-toast";
import { addSession } from "../../../services/educatorService";
import './AddSessionStyling.css';
import Cookies from "js-cookie";
import { getUserFromToken } from "../../../utils";

const AddSessionForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const accessToken = Cookies.get("accessToken");
    const user = getUserFromToken(accessToken);
    const userId = user?.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !date) {
      toast.error("All fields are required");
      return;
    }
    try {
      const res = await addSession({ title, description, date, userId });
      if (res.success) {
        toast.success("Session added!");
        setTitle("");
        setDescription("");
        setDate("");
      } else {
        toast.error(res.error || "Failed to add session");
      }
    } catch (err) {
      toast.error("Failed to add session");
      console.error(err);
    }
  };

  return (
    <div className="session-form">
      <h2>Add New Session</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          placeholder="Enter session title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description</label>
        <textarea
          placeholder="Enter session description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button type="submit">Add Session</button>
      </form>
    </div>
  );
};

export default AddSessionForm;