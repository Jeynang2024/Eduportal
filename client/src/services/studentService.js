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

export const getStudentData=async ()=>{
   try {
    const res = await api.get(`/api/user/student/data`);
    return res.data;
  } catch (error) {
    console.error("Error fetching student profile:", error);
    return null;
  }
}
export const getStudentBehaviouralData=async ()=>{
   try {
    const res = await api.get(`/api/user/student/behavioural/data`);
    return res.data;
  } catch (error) {
    console.error("Error fetching student profile:", error);
    return null;
  }
}
export const getstudentsAchievements=async ()=>{
   try {
    const res = await api.get(`/api/user/student/achievement/data`);
    return res.data;
  } catch (error) {
    console.error("Error fetching student achievement data:", error);
    return null;
  }
}

export const getScholarships = () => {
  console.log('Fetching Scholarships');
  return { scholarships: ['mock1', 'mock2'] };
};

export const getStudentPerformance=async ()=>{
    try {
    const response = await api.get('/api/data/student-performance');
        const data = response.data;

console.log("sessions:", data.sessions);
console.log("overallTrends:", data.overallTrends);
console.log("totalSessions:", data.totalSessions);
    

    
   
    return data;
  } catch (error) {
    console.error('Error fetching session performance:', error);
  }
}