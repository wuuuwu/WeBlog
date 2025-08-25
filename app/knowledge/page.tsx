import ClientLayout from '@/app/client-layout'

export default function KnowledgePage() {
  return (
    <ClientLayout>
      <div className="h-full">
        <h1 className="text-3xl font-bold mb-4">知识点</h1>
        <p>这里是存放学习笔记的地方，支持 Markdown 格式。</p>
      </div>
    </ClientLayout>
  )
}
// function CodePage() {
//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-4">代码库</h1>
//       <p>这里是存放代码的地方，支持 Markdown、Python、JavaScript 等文件。</p>
//     </div>
//   )
// }