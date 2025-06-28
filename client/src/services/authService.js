export const login = (data) => {
  console.log('Login API called with:', data);
  return { success: true, userType: 'educator' };
};

export const registerEducator = (data) => {
  console.log('Register Educator API called with:', data);
  return { success: true };
};
