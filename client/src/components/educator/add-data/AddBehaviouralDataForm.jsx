import { useState } from "react";
import toast from "react-hot-toast";
import { addBehaviouralData } from "../../../services/educatorService";
import Papa from "papaparse";
import './BehaviouralStyling.css'

const AddBehaviouralDataForm = () => {
  const [tableData, setTableData] = useState([]);
  const [fileName, setFileName] = useState("");
  const [parsedRows, setParsedRows] = useState([]);

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setParsedRows(results.data);
        setTableData([Object.keys(results.data[0]), ...results.data.map(row => Object.values(row))]);
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!parsedRows.length) {
      toast.error("Please upload a CSV file before submitting.");
      return;
    }
    // Transform to backend schema
    const payload = parsedRows.map(row => ({
      username: row.username,
      criteria: Object.keys(row)
        .filter(key => key !== "username")
        .map(Name => ({
          Name,
          score: Number(row[Name])
        }))
    }));

    try {
      await addBehaviouralData(payload);
      toast.success("Behavioural data added!");
    } catch {
      toast.error("Failed to add behavioural data.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white border border-[#002f4d] p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-[#004d7a]">Upload CSV to Generate Table</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="file"
          accept=".csv"
          onChange={handleCSVUpload}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4 file:rounded file:border-0
            file:text-sm file:font-semibold file:bg-[#004d7a]
            file:text-white hover:file:bg-[#00395a]"
        />

        {tableData.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-sm mt-4">
              <thead className="bg-blue-100">
                <tr>
                  {tableData[0].map((cell, idx) => (
                    <th key={idx} className="border px-4 py-2 text-left font-semibold">
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.slice(1).map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="border px-4 py-2 text-left">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBehaviouralDataForm;