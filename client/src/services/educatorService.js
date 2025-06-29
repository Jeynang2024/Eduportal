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

export const addSession = (data) => {
  console.log('Adding Session:', data);
  return { success: true, type: 'session' };
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