const API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api";
console.log("🚀 ~ API_URL:", API_URL);

export function NEWSLETTER_REGISTER() {
  return {
    url: `${API_URL}/newsletter/register`,
  };
}
