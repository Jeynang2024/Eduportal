export const getEducatorDashboard = () => {
  console.log('Fetching Educator Dashboard data');
  return { dashboard: 'mock data' };
};

export const getEducatorProfile = () => {
  console.log('Fetching Educator Profile data');
  return { profile: 'mock data' };
};

export const addEducatorData = (data) => {
  console.log('Adding Educator Data:', data);
  return { success: true };
};
