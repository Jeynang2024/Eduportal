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

// UPDATED: Actually send data to backend API
export const addAcademicData = async (data) => {
  try {
    const res = await api.post("/api/data/academic/data", data);
    return { success: true, ...res.data };
  } catch (error) {
    console.error("Error adding academic data:", error);
    return { success: false, error: error.response?.data?.error || "Failed to add academic data" };
  }
};

export const addBehaviouralData = async (data) => {
  try {
    const res = await api.post("/api/data/behaviour/data", data);
    return { success: true, ...res.data };
  } catch (error) {
    console.error("Error adding behavioural data:", error);
    return { success: false, error: error.response?.data?.error || "Failed to add behavioural data" };
  }
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