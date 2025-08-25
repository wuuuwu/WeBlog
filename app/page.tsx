import ClientLayout from '@/app/client-layout'
import { HeroCard } from '@/components/HeroCard'
import { Code, BookOpen, FileText, Lightbulb, Users, Star } from 'lucide-react'

export default function Home() {
  const cards = [
    {
      title: "代码库",
      description: "管理和浏览你的代码片段，支持多种编程语言，让代码重用变得简单高效。",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
      link: "/code",
      icon: <Code className="w-8 h-8 text-blue-600" />,
      features: ["多语言支持", "语法高亮", "版本管理"]
    },
    {
      title: "知识点",
      description: "整理和分享你的学习笔记，构建个人知识体系，让知识更有条理。",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
      link: "/knowledge",
      icon: <BookOpen className="w-8 h-8 text-green-600" />,
      features: ["Markdown支持", "标签分类", "全文搜索"]
    },
    {
      title: "随笔",
      description: "记录生活灵感和思考，用文字表达内心世界，让思想自由流淌。",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=400&fit=crop",
      link: "/essay",
      icon: <FileText className="w-8 h-8 text-purple-600" />,
      features: ["富文本编辑", "心情标签", "时间轴"]
    },
    {
      title: "灵感库",
      description: "收集创意和灵感，为创作提供素材，让创意不再流失。",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
      link: "/inspiration",
      icon: <Lightbulb className="w-8 h-8 text-yellow-600" />,
      features: ["图片收集", "链接保存", "快速记录"]
    },
    {
      title: "项目协作",
      description: "与团队成员协作，共享资源和进度，让团队合作更高效。",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop",
      link: "/collaboration",
      icon: <Users className="w-8 h-8 text-red-600" />,
      features: ["团队共享", "任务管理", "实时同步"]
    }
  ]

  return (
    <ClientLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Hero Section - 全屏覆盖 */}
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
          {/* 背景装饰 */}
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          
          <div className="relative z-10 text-center text-white px-6 max-w-6xl mx-auto">
            <h1 className="text-6xl sm:text-8xl font-bold mb-8 tracking-tight animate-fade-in">
              我的知识库
            </h1>
            <p className="text-xl sm:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              集代码管理、知识整理、灵感收集于一体的个人知识管理系统
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <Star className="w-5 h-5" />
                <span className="font-medium">智能分类</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <Star className="w-5 h-5" />
                <span className="font-medium">快速搜索</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                <Star className="w-5 h-5" />
                <span className="font-medium">跨设备同步</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cards Section - 居中布局 */}
        <div className="relative -mt-20 bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                开始你的知识管理之旅
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                选择一个模块开始，构建属于你的个人知识体系
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cards.map((card, index) => (
                <HeroCard
                  key={index}
                  title={card.title}
                  description={card.description}
                  image={card.image}
                  link={card.link}
                  icon={card.icon}
                  features={card.features}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h3 className="text-3xl font-bold mb-6">准备好开始了吗？</h3>
            <p className="text-gray-300 mb-8 text-lg">
              立即选择一个模块，开始构建你的知识体系
            </p>
          </div>
        </div>
      </div>
    </ClientLayout>
  )
}