import ClientLayout from '@/app/client-layout'

export default function CodePage() {
  return (
    <ClientLayout>
      <div className="h-full">
        <h1 className="text-3xl font-bold mb-4">代码库</h1>
        <p>这里是存放代码的地方，支持 Markdown、Python、JavaScript 等文件。</p>
      </div>
    </ClientLayout>
  )
}