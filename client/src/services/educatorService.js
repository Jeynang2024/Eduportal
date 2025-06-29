import api from "../utils/api";

export const getEducatorDashboard = () => {
  console.log('Fetching Educator Dashboard data');
  return { dashboard: 'mock data' };
};
export const getEducatorProfile = async (userId) => {
  try {
    const res = await api.get(`/api/user/educator/${userId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching educator profile:", error);
    return null;
  }
};

export const addSession = async (data) => {
  try {
    const res = await api.post("/api/user/session/data", data);
    return { success: true, ...res.data };
  } catch (error) {
    console.error("Error adding session:", error);
    return { success: false, error: error.response?.data?.error || "Failed to add session" };
  }
};

export const addAcademicData = (data) => {
  console.log('Adding Academic Data:', data);
  return { success: true, type: 'academic' };
};

export const addBehaviouralData = (data) => {
  console.log('Adding Behavioural Data:', data);
  return { success: true, type: 'behavioural' };
};

export const registerStudents = async (students) => {
  try {
    const res = await api.post("/api/user/register/students", students);
    return res.data;
  } catch (error) {
    console.error("Error registering students:", error);
    throw error;
  }
};