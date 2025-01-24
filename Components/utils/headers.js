const getHeaders = (token = null) => ({
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }), 
  });
  
  export default getHeaders;
  