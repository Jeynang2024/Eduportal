import api from "../utils/api";

export const login = async (data) => {
  try {
    const res = await api.post("/api/user/login", {
      username: data.username,
      password: data.password
    });
    console.log("Login response:", res);
    return { success: true, ...res.data };
  } catch (err) {
    if (err.response && err.response.data && err.response.data.error) {
      return { success: false, error: err.response.data.error };
    }
    return { success: false, error: "Login failed" };
  }
};

export const registerEducator = async (data) => {
  try {
    // Map frontend fields to backend expected fields
    const payload = {
      username: data.username,
      name: data.name,
      password: data.password,
      role: "educator",
      email: data.email, 
      location: data.location,
      qualification: data.qualification,
      contact: data.contact
    };
    const res = await api.post("/api/user/register/educator", payload);
    return { success: true, ...res.data };
  } catch (err) {
    if (err.response && err.response.data && err.response.data.error) {
      return { success: false, error: err.response.data.error };
    }
    return { success: false, error: "Registration failed" };
  }
};
