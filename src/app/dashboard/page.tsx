"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { getDisplayName, getUserInitials } from "@/lib/auth";
import { Calendar, FileText, Settings, User } from "lucide-react";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {getUserInitials(user)}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Olá, {getDisplayName(user)}!
                  </h1>
                  <p className="text-gray-600">Bem-vindo ao seu dashboard</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* User Info Card */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center gap-3 mb-4">
                <User className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Suas Informações
                </h2>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Nome:</span> {user?.name}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Email:</span> {user?.email}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Role:</span>{" "}
                  {user?.isAdmin ? "Administrador" : "Usuário"}
                </p>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="w-5 h-5 text-green-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Ações Rápidas
                </h2>
              </div>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Ver Posts
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Configurações
                </Button>
              </div>
            </div>

            {/* Recent Activity Card */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Atividade Recente
                </h2>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">• Login realizado hoje</p>
                <p className="text-sm text-gray-600">• Perfil atualizado</p>
                <p className="text-sm text-gray-600">• Dashboard acessado</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Estatísticas do Sistema
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">1</div>
                <div className="text-sm text-gray-600">Usuário Logado</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-sm text-gray-600">Sistema Online</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">0</div>
                <div className="text-sm text-gray-600">Posts Criados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">Ativo</div>
                <div className="text-sm text-gray-600">Status da Conta</div>
              </div>
            </div>
          </div>

          {/* Demonstração de Proteção de Rotas */}
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              🔒 Página Protegida
            </h3>
            <p className="text-yellow-700 mb-4">
              Esta página só é acessível para usuários autenticados. O sistema
              de autenticação está funcionando corretamente!
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => (window.location.href = "/")}
              >
                Voltar para Home
              </Button>
              <Button variant="destructive" size="sm" onClick={logout}>
                Fazer Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
