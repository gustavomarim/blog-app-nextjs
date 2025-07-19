import { Mail } from "lucide-react";
import NewsletterForm from "./lewsletter-form";

export default function Newsletter() {
  return (
    <section className="max-w-4xl mx-auto text-center">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 shadow-xl">
        <div className="flex justify-center mb-6">
          <div className="bg-white/20 p-3 rounded-full">
            <Mail className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Fique por dentro das novidades
        </h2>
        <p className="text-blue-100 text-lg mb-8">
          Receba nossas melhores postagens e insights tech diretamente no seu
          e-mail.
        </p>
        <NewsletterForm />
        <p className="text-blue-100 text-sm mt-4">
          Sem spam. Apenas conteúdo de qualidade.
        </p>
      </div>
    </section>
  );
}
