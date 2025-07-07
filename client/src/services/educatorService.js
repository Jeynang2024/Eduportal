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

export const getSessions= async ()=>{
   try {
    const res = await api.get("/api/user/session");
    console.log(res);
    return { success: true, ...res.data };
  } catch (error) {
    console.error("Error adding session:", error);
    return { success: false, error: error.response?.data?.error || "Failed to add session" };
  }
}



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

export const getStudents = async () => {
  try {
    const res = await api.get("/api/user/student");
    return res.data;
  } catch (error) {
    console.error("Error registering students:", error);
    throw error;
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


export const addAchivementData = async (data) => {
  try {
    console.log("data",data);
    const res = await api.post("/api/data/achivement/data", data);
    return { success: true, ...res.data };
  } catch (error) {
    console.error("Error adding achievement data:", error);
    return { success: false, error: error.response?.data?.error || "Failed to add achievement data" };
  }
};

export const fetchSessionPerformance = async () => {
  try {
    const response = await api.get('/api/data/session-performance');
        const data = response.data;

console.log("sessions:", data.sessions);
console.log("overallTrends:", data.overallTrends);
console.log("totalSessions:", data.totalSessions);
    

    
   
    return data;
  } catch (error) {
    console.error('Error fetching session performance:', error);
  }
};