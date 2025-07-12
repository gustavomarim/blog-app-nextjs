const API_CONFIG = {
  baseURL: process.env.API_BASE_URL || "http://localhost:3001",
  endpoints: {
    posts: "/posts",
    categories: "/categories",
    users: "/users",
  },
} as const;

export const getApiUrl = (endpoint: keyof typeof API_CONFIG.endpoints) => {
  return `${API_CONFIG.baseURL}${API_CONFIG.endpoints[endpoint]}`;
};

export default API_CONFIG;
