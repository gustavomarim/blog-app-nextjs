"use client";

import InputField from "@/components/login/register/input-field";
import { Button } from "@/components/ui/button";
import { getApiUrl } from "@/config/api";
import { CheckCircle, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const RegisterPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome completo é obrigatório";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Nome deve ter pelo menos 2 caracteres";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirmação de senha é obrigatória";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
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

    const registerUrl = `${getApiUrl("users")}/register`;

    try {
      await fetch(registerUrl, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Conta criada com sucesso!");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      alert("Erro ao criar conta. Tente novamente.");
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Criar Conta</h1>
          <p className="text-gray-600">
            Junte-se ao Loop Infinito e comece sua jornada tech
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              name="name"
              placeholder="Nome completo"
              icon={User}
              value={formData.name}
              onChange={handleInputChange}
              error={errors.name}
              disabled={isLoading}
            />

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

            <InputField
              name="confirmPassword"
              placeholder="Redigite sua senha"
              icon={Lock}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={errors.confirmPassword}
              disabled={isLoading}
              showPasswordToggle
              showPassword={showConfirmPassword}
              onTogglePassword={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            />

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Criando conta...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Criar Conta
                </div>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600">
              Já tem uma conta?{" "}
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Faça login
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

export default RegisterPage;
