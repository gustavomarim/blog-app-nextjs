# 🔐 Guia de Autenticação - Blog App

Este guia explica como usar o sistema de autenticação implementado no seu blog app Next.js.

## 📋 Arquitetura da Solução

### Componentes Principais

1. **AuthContext** (`src/contexts/AuthContext.tsx`)

   - Gerencia o estado global de autenticação
   - Fornece hooks para login, logout, registro
   - Mantém informações do usuário logado

2. **Middleware** (`middleware.ts`)

   - Proteção automática de rotas
   - Redirecionamento para login quando necessário
   - Controle de acesso baseado em autenticação

3. **Componente ProtectedRoute** (`src/components/auth/ProtectedRoute.tsx`)

   - Proteção granular de componentes
   - Verificação de roles e permissões
   - Loading states e fallbacks

4. **Utilitários de Auth** (`src/lib/auth.ts`)
   - Funções auxiliares para verificação de usuário
   - Formatação de dados do usuário
   - Verificação de roles e permissões

## 🚀 Como Usar

### 1. Verificar Estado de Autenticação

```tsx
import { useAuth } from "@/contexts/AuthContext";

function MeuComponente() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isAuthenticated) {
    return <div>Olá, {user.name}!</div>;
  }

  return <div>Você não está logado</div>;
}
```

### 2. Fazer Login

```tsx
import { useAuth } from "@/contexts/AuthContext";

function LoginComponent() {
  const { login } = useAuth();

  const handleLogin = async () => {
    const success = await login("email@example.com", "senha123");
    if (success) {
      // Login bem-sucedido
      router.push("/dashboard");
    } else {
      // Erro no login
      alert("Credenciais inválidas");
    }
  };

  // ...
}
```

### 3. Fazer Logout

```tsx
import { useAuth } from "@/contexts/AuthContext";

function LogoutButton() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    // Usuário foi deslogado
  };

  return <button onClick={handleLogout}>Sair</button>;
}
```

### 4. Proteger Páginas Inteiras

```tsx
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function PaginaProtegida() {
  return (
    <ProtectedRoute>
      <div>
        <h1>Esta página só aparece para usuários logados</h1>
      </div>
    </ProtectedRoute>
  );
}
```

### 5. Proteger com Base em Roles

```tsx
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function PaginaAdmin() {
  return (
    <ProtectedRoute requiredRole="admin">
      <div>
        <h1>Área do Administrador</h1>
      </div>
    </ProtectedRoute>
  );
}

// Ou múltiplas roles
export default function PaginaEspecial() {
  return (
    <ProtectedRoute requiredRoles={["admin", "moderator"]}>
      <div>
        <h1>Área para Admins e Moderadores</h1>
      </div>
    </ProtectedRoute>
  );
}
```

### 6. Conteúdo Condicional

```tsx
import { useAuth } from "@/contexts/AuthContext";
import { hasRole } from "@/lib/auth";

function Header() {
  const { user, isAuthenticated } = useAuth();

  return (
    <header>
      {isAuthenticated ? (
        <div>
          <span>Bem-vindo, {user.name}!</span>
          {hasRole(user, "admin") && <button>Painel Admin</button>}
        </div>
      ) : (
        <div>
          <a href="/login">Entrar</a>
          <a href="/register">Cadastrar</a>
        </div>
      )}
    </header>
  );
}
```

## 🛡️ Proteção Automática de Rotas

O middleware protege automaticamente estas rotas:

- `/dashboard` - Requer autenticação
- `/perfil` - Requer autenticação
- `/admin` - Requer autenticação

E redireciona usuários logados das rotas:

- `/login` - Redireciona para home
- `/login/register` - Redireciona para home

### Configurar Novas Rotas Protegidas

Edite o arquivo `middleware.ts`:

```ts
const protectedRoutes = [
  "/dashboard",
  "/perfil",
  "/admin",
  "/minha-nova-rota", // Adicione aqui
];
```

## 🔧 Funções Utilitárias

### Verificação de Roles

```tsx
import { hasRole, hasAnyRole } from "@/lib/auth";

const user = { role: "admin" };

// Verifica role específica
const isAdmin = hasRole(user, "admin"); // true

// Verifica múltiplas roles
const hasPermission = hasAnyRole(user, ["admin", "moderator"]); // true
```

### Formatação de Usuário

```tsx
import { getDisplayName, getUserInitials } from "@/lib/auth";

const user = { name: "João Silva", email: "joao@example.com" };

const displayName = getDisplayName(user); // "João Silva"
const initials = getUserInitials(user); // "JS"
```

## 📱 Exemplo Prático - Navbar Dinâmica

O Navbar já foi atualizado para demonstrar o uso completo:

- **Estado de Loading**: Mostra skeleton
- **Usuário Logado**: Mostra menu do usuário com opção de logout
- **Usuário Não Logado**: Mostra botões de Login e Cadastro

## 🎯 Páginas de Demonstração

### Dashboard (`/dashboard`)

Página protegida que demonstra:

- Proteção de rota com `ProtectedRoute`
- Exibição de informações do usuário
- Funcionalidade de logout
- Interface responsiva

### Como Testar

1. **Sem Login**: Acesse `/dashboard` - será redirecionado para `/login`
2. **Com Login**: Faça login e acesse `/dashboard` - verá sua página personalizada
3. **Após Logout**: Clique em "Sair" - será redirecionado e perderá acesso

## 🚨 Considerações de Segurança

### No Cliente

- Estado de autenticação é mantido em memória
- Tokens são enviados via cookies com `credentials: "include"`
- Verificação de autenticação acontece no contexto

### No Servidor

- Middleware intercepta requisições
- Verificação de cookies de autenticação
- Redirecionamento automático para login

### Boas Práticas Implementadas

- ✅ Verificação de autenticação em tempo real
- ✅ Loading states apropriados
- ✅ Proteção de rotas no middleware
- ✅ Componentes reutilizáveis para proteção
- ✅ Tratamento de erros de autenticação
- ✅ Interface responsiva e acessível

## 🔄 Fluxo de Autenticação

1. **Usuário acessa página protegida**
2. **Middleware verifica autenticação**
   - Se não autenticado → Redireciona para `/login`
   - Se autenticado → Permite acesso
3. **Context verifica estado do usuário**
4. **Componente renderiza baseado no estado**

## 📝 Próximos Passos

Para expandir o sistema, considere:

1. **Refresh Token**: Implementar renovação automática de tokens
2. **Persistência**: Salvar estado em localStorage/sessionStorage
3. **SSR Auth**: Autenticação em Server Components
4. **OAuth**: Integração com Google, GitHub, etc.
5. **Permissões Granulares**: Sistema de permissões por recurso

---

## 🆘 Problemas Comuns

### Redirecionamento Infinito

- Verifique se o middleware não está protegendo a rota `/login`
- Confirme que o cookie de autenticação está sendo enviado

### Estado Não Atualiza

- Certifique-se que o componente está dentro do `AuthProvider`
- Verifique se está usando `useAuth()` corretamente

### Erro de Hidratação

- Use states de loading apropriados
- Evite renderização condicional baseada em `isAuthenticated` no SSR

Este sistema fornece uma base sólida e escalável para autenticação em aplicações Next.js! 🎉
