"use client";

import InputField from "@/components/login/register/input-field";
import { Button } from "@/components/ui/button";
import { getApiUrl } from "@/config/api";
import { CheckCircle, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface FormData {
  email: string;
  password: string;
}

export interface FormErrors {
  email?: string;
  password?: string;
}

const LoginPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    const loginUrl = `${getApiUrl("users")}/login`;

    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) {
        const data = await response.json();
        alert(data.message);
        return;
      }

      alert("Login realizado com sucesso!");

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao fazer login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-slate-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-3 rounded-full shadow-lg">
              <User className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Entrar</h1>
          <p className="text-gray-600">
            Bem-vindo de volta! Por favor, insira suas credenciais.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              name="email"
              type="email"
              placeholder="Seu e-mail"
              icon={Mail}
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              disabled={isLoading}
            />

            <InputField
              name="password"
              placeholder="Senha"
              icon={Lock}
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              disabled={isLoading}
              showPasswordToggle
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
            />

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Entrando...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Entrar
                </div>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600">
              Não tem uma conta?{" "}
              <Link
                href="/login/register"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Ao criar uma conta, você concorda com nossos{" "}
            <Link href="/terms" className="text-blue-600 hover:text-blue-700">
              Termos de Uso
            </Link>{" "}
            e{" "}
            <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
              Política de Privacidade
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
