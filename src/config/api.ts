// Configuração para Server Components (seguro)
const getServerApiUrl = (endpoint: string) => {
  const baseUrl = process.env.API_BASE_URL || "http://localhost:3001";
  return `${baseUrl}${endpoint}`;
};

// Configuração para Client Components (público)
const getClientApiUrl = (endpoint: string) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";
  return `${baseUrl}${endpoint}`;
};

// Configuração automática baseada no contexto
const getApiUrl = (endpoint: keyof typeof API_ENDPOINTS) => {
  const endpointPath = API_ENDPOINTS[endpoint];

  // Se estiver no servidor, usa variável segura
  if (typeof window === "undefined") {
    return getServerApiUrl(endpointPath);
  }

  // Se estiver no cliente, usa variável pública
  return getClientApiUrl(endpointPath);
};

const API_ENDPOINTS = {
  posts: "/posts",
  categories: "/categories",
  users: "/users",
  register: "/users/register",
  login: "/users/login",
} as const;

export { getApiUrl, getClientApiUrl, getServerApiUrl };
// eslint-disable-next-line import/no-anonymous-default-export
export default { getApiUrl, endpoints: API_ENDPOINTS };
