import ClientLayout from '@/app/client-layout'
import { Users, Plus, Search, Settings } from 'lucide-react'

export default function CollaborationPage() {
  return (
    <ClientLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-red-600" />
            <h1 className="text-3xl font-bold">项目协作</h1>
          </div>
          <div className="flex gap-2">
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors">
              <Plus className="w-4 h-4" />
              创建项目
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
              <Settings className="w-4 h-4" />
              设置
            </button>
          </div>
        </div>
        
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="搜索项目..." 
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 这里可以添加项目卡片 */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-center text-gray-500 py-12">
              <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>暂无协作项目</p>
              <p className="text-sm mt-2">创建你的第一个协作项目</p>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  )
}