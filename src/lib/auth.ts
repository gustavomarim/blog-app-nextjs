import { getApiUrl } from "@/config/api";
import { User } from "@/contexts/AuthContext";

/**
 * Verifica se o usuário está autenticado no servidor
 * Útil para Server Components
 */
export async function getServerSideUser(): Promise<User | null> {
  try {
    // Em um cenário real, você buscaria o token dos cookies do servidor
    // Este é um exemplo simplificado
    const response = await fetch(`${getApiUrl("users")}/profile`, {
      credentials: "include",
    });

    if (response.ok) {
      return await response.json();
    }
    
    return null;
  } catch (error) {
    console.error("Erro ao verificar autenticação no servidor:", error);
    return null;
  }
}

/**
 * Verifica se o usuário tem uma role específica
 */
export function hasRole(user: User | null): boolean {
  return user?.isAdmin === true;
}

/**
 * Verifica se o usuário tem uma das roles especificadas
 */
export function hasAnyRole(user: User | null, roles: string[]): boolean {
  if (!user?.isAdmin) return false;

  return roles.includes(user.isAdmin ? "admin" : "user");
}

/**
 * Redireciona para login com URL de retorno
 */
export function redirectToLogin(returnUrl?: string) {
  const loginUrl = new URL("/login", window.location.origin);

  if (returnUrl) {
    loginUrl.searchParams.set("redirect", returnUrl);
  }

  window.location.href = loginUrl.toString();
}

/**
 * Verifica se uma rota requer autenticação
 */
export function isProtectedRoute(pathname: string): boolean {
  const protectedRoutes = ["/dashboard", "/perfil", "/admin"];

  return protectedRoutes.some((route) => pathname.startsWith(route));
}

/**
 * Verifica se uma rota é apenas para usuários não autenticados
 */
export function isAuthRoute(pathname: string): boolean {
  const authRoutes = ["/login", "/login/register"];

  return authRoutes.some((route) => pathname.startsWith(route));
}

/**
 * Utilitário para formatar nome do usuário
 */
export function getDisplayName(user: User | null): string {
  if (!user) return "Usuário";

  return user.name || user.email.split("@")[0];
}

/**
 * Utilitário para obter iniciais do usuário
 */
export function getUserInitials(user: User | null): string {
  if (!user?.name) return "U";

  return user.name
    .split(" ")
    .map((name) => name.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
