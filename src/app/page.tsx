import Newsletter from "@/components/newsletter";
import { Button } from "@/components/ui/button";
import { getApiUrl } from "@/config/api";
import {
  Calendar,
  ChevronRight,
  Newspaper,
  Star,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

interface Post {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  date: string;
}

export default async function Home() {
  const url = getApiUrl("posts");
  const response = await fetch(url);
  const posts: Post[] = await response.json();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-slate-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center mb-20 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center items-center mb-6">
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-full shadow-lg">
                <Newspaper className="w-10 h-10 text-blue-600" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Bem-vindo ao Loop Infinito
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              No Loop Infinito, você encontra conteúdos sobre o universo tech —
              da programação ao impacto da tecnologia no dia a dia. Tendências,
              tutoriais, análises e reflexões para quem vive conectado ou apenas
              quer entender melhor o mundo digital.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
              >
                Explorar Artigos
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-blue-200 hover:bg-blue-50"
              >
                Sobre o Blog
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 text-center shadow-sm border border-blue-100">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {posts.length}
                </div>
                <div className="text-gray-600">Artigos</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 text-center shadow-sm border border-purple-100">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  5+
                </div>
                <div className="text-gray-600">Categorias</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 text-center shadow-sm border border-green-100">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  1k+
                </div>
                <div className="text-gray-600">Leitores</div>
              </div>
            </div>
          </div>
        </section>

        {/* Posts Section */}
        <section className="max-w-7xl mx-auto mb-20">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Postagens Recentes
              </h2>
            </div>
            <Button
              variant="outline"
              className="hidden sm:flex border-blue-200 hover:bg-blue-50"
            >
              Ver Todos
              <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <Link
                href={`/posts/${post.slug}`}
                key={post._id}
                className="group block animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <article className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-blue-100 p-6 h-full transition-all duration-300 hover:shadow-xl hover:shadow-blue-100/50 hover:border-blue-200 hover:-translate-y-2">
                  <div className="flex flex-col h-full">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                          {post.category.name}
                        </span>
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                        {post.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-blue-100">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(post.date).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                      <span className="text-blue-600 text-sm font-medium group-hover:text-blue-700">
                        Ler mais →
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-full p-6 w-20 h-20 mx-auto mb-6">
                <Newspaper className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Nenhum post encontrado
              </h3>
              <p className="text-gray-600 text-lg">
                Novos conteúdos chegando em breve!
              </p>
            </div>
          )}
        </section>

        <Newsletter />
      </div>
    </main>
  );
}
