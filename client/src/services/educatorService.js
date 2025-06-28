export const getEducatorDashboard = () => {
  console.log('Fetching Educator Dashboard data');
  return { dashboard: 'mock data' };
};

export const getEducatorProfile = () => {
  console.log('Fetching Educator Profile data');
  return { profile: 'mock data' };
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
