import api from "../utils/api";

export const getStudentDashboard = () => {
  console.log('Fetching Student Dashboard data');
  return { dashboard: 'mock data' };
};

export const getStudentProfile = async (userId) => {
  try {
    const res = await api.get(`/api/user/student/${userId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching student profile:", error);
    return null;
  }
};


export const getScholarships = () => {
  console.log('Fetching Scholarships');
  return { scholarships: ['mock1', 'mock2'] };
};
