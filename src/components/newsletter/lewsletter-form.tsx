"use client";

import newsletterRegister from "@/actions/newsletter-register";
import { useActionState, useEffect, useRef } from "react";
import { Button } from "../ui/button";

export default function NewsletterForm() {
  const [state, formAction] = useActionState(newsletterRegister, {
    ok: false,
    data: null,
    error: "",
  });

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok && formRef.current) {
      formRef.current.reset();
    }
  }, [state.ok]);

  console.log("🚀 ~ NewsletterForm ~ state:", state);

  return (
    <div className="w-full max-w-md mx-auto">
      <form
        ref={formRef}
        className="flex flex-col sm:flex-row gap-4"
        action={formAction}
      >
        <input
          type="email"
          name="email"
          id="email"
          required
          placeholder="seu@email.com"
          className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white/50 text-gray-900"
        />
        <Button
          type="submit"
          className="bg-white text-blue-600 h-auto cursor-pointer hover:bg-gray-100 font-semibold"
        >
          Inscrever-se
        </Button>
      </form>

      {state.ok && (
        <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg">
          <p className="text-green-700 text-sm font-medium">
            ✅ Sucesso! Você foi inscrito(a) na nossa newsletter.
          </p>
        </div>
      )}

      {!state.ok && state.error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg">
          <p className="text-red-700 text-sm font-medium">
            ❌ Erro: {state.error}
          </p>
        </div>
      )}
    </div>
  );
}
