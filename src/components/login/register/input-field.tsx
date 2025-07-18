import { FormData } from "@/app/login/register/page";
import { AlertCircle, Eye, EyeOff, LucideIcon } from "lucide-react";

const InputField = ({
  name,
  type = "text",
  placeholder,
  icon: Icon,
  error,
  value,
  onChange,
  disabled = false,
  showPasswordToggle = false,
  showPassword = false,
  onTogglePassword,
}: {
  name: keyof FormData;
  type?: string;
  placeholder: string;
  icon: LucideIcon;
  error?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}) => (
  <div className="space-y-2">
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type={showPasswordToggle ? (showPassword ? "text" : "password") : type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          block w-full pl-10 ${showPasswordToggle ? "pr-10" : "pr-3"} py-3 
          bg-white/80 backdrop-blur-sm border rounded-xl 
          focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all duration-300 placeholder-gray-500
          ${
            error
              ? "border-red-300 focus:ring-red-500"
              : "border-gray-200 hover:border-blue-300"
          }
        `}
        disabled={disabled}
      />
      {showPasswordToggle && (
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          ) : (
            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          )}
        </button>
      )}
    </div>
    {error && (
      <div className="flex items-center gap-1 text-red-600 text-sm">
        <AlertCircle className="h-4 w-4" />
        <span>{error}</span>
      </div>
    )}
  </div>
);

export default InputField;
