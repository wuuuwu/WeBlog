'use client'

import { usePathname } from 'next/navigation'
import { Dashboard } from '@/components/Dashboard'
import { AuthButton } from '@/components/AuthButton'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  return (
    <div className="flex h-screen w-full">
      {/* 顶部导航栏 - 固定在顶部 */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">我的知识库</h1>
          </div>
          <AuthButton />
        </div>
      </nav>
      
      {/* 根据路由决定是否显示侧边栏 */}
      {isHomePage ? (
        // 主页布局 - 不显示侧边栏
        <div className="pt-16 w-full h-full overflow-auto">
          {children}
        </div>
      ) : (
        // 其他页面布局 - 显示侧边栏
        <div className="pt-16 w-full">
          <Dashboard>
            {children}
          </Dashboard>
        </div>
      )}
    </div>
  )
}