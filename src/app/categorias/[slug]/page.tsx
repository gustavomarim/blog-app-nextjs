import { Button } from "@/components/ui/button";
import { getApiUrl } from "@/config/api";
import {
  BookOpen,
  Calendar,
  ChevronLeft,
  Clock,
  Share2,
  Tag,
  User,
} from "lucide-react";
import Link from "next/link";

type PageParams = {
  params: {
    slug: string;
  };
};

export interface PostResponse {
  category: string;
  content: string;
  date: string;
  description: string;
  title: string;
  _id: string;
}

const CategoryPage = async ({ params }: PageParams) => {
  const { slug } = params;

  try {
    const url = getApiUrl("posts");
    const response = await fetch(`${url}/category/${slug}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as PostResponse[];

    if (!data || typeof data !== "object") {
      throw new Error("Dados do post não encontrados");
    }

    const safeData = {
      category: data[0]?.category || "Sem categoria",
      content: data[0]?.content || "",
      date: data[0]?.date || new Date().toISOString(),
      description: data[0]?.description || "Sem descrição disponível",
      title: data[0]?.title || "Sem título",
      _id: data[0]._id || "",
    };

    const contentLength = safeData.content.length;
    const readingTime = Math.ceil(contentLength / 1000) || 1; // Mínimo 1 minuto
    const contentPreview =
      contentLength > 500
        ? safeData.content.substring(0, 500)
        : safeData.content;

    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-slate-50">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb Navigation */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Voltar para Home
            </Link>
          </div>

          {/* Post Header */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100 p-8 md:p-12">
              {/* Category Badge */}
              <div className="flex items-center gap-2 mb-6">
                <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  {safeData.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                {safeData.title}
              </h1>

              {/* Description */}
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {safeData.description}
              </p>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(safeData.date).toLocaleDateString("pt-BR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>~{readingTime} min de leitura</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Loop Infinito</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Ler Artigo Completo
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-blue-200 hover:bg-blue-50"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhar
                </Button>
              </div>
            </div>
          </div>

          {/* Content Preview */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100 p-8 md:p-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Preview do Conteúdo
                </h2>
              </div>

              {/* Content Preview */}
              <div className="prose prose-lg max-w-none">
                {contentLength > 0 ? (
                  <>
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
                      <p className="text-gray-700 leading-relaxed">
                        {contentPreview}
                        {contentLength > 500 && "..."}
                      </p>
                    </div>

                    {contentLength > 500 && (
                      <div className="text-center">
                        <Button
                          size="lg"
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                        >
                          Continuar Lendo
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Conteúdo não disponível</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Related Posts Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100 p-8 md:p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-lg">
                  <Tag className="w-5 h-5 text-white" />
                </div>
                Mais posts em {safeData.category}
              </h3>

              <div className="text-center py-8">
                <p className="text-gray-600 mb-6">
                  Explore mais conteúdos desta categoria
                </p>
                <Link href={`/categorias/${slug}`}>
                  <Button
                    variant="outline"
                    className="border-blue-200 hover:bg-blue-50"
                  >
                    Ver todos os posts de {safeData.category}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <section className="max-w-4xl mx-auto mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 shadow-xl">
              <h3 className="text-3xl font-bold text-white mb-4">
                Gostou deste conteúdo?
              </h3>
              <p className="text-blue-100 text-lg mb-8">
                Receba mais artigos como este diretamente no seu e-mail.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white/50 text-gray-900"
                />
                <Button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold">
                  Inscrever-se
                </Button>
              </div>
              <p className="text-blue-100 text-sm mt-4">
                Conteúdo de qualidade, sem spam.
              </p>
            </div>
          </section>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Erro ao carregar post:", error);

    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-slate-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Voltar para Home
            </Link>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-red-200 p-8 md:p-12 text-center">
              <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-red-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Post não encontrado
              </h1>
              <p className="text-gray-600 mb-8">
                Não foi possível carregar o post da categoria &quot;{slug}
                &quot;. Pode ser que o post não exista ou tenha ocorrido um erro
                no servidor.
              </p>
              <Link href="/">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Voltar para Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }
};

export default CategoryPage;
