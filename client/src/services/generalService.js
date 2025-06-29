import api from "../utils/api";

export const getSessions = async () => {
  try {
    const res = await api.get("/api/user/session");
    return res.data;
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return [];
  }
};