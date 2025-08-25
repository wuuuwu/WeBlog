'use client'

import React, { useState } from 'react'
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarTrigger } from '@/components/ui/sidebar'
import { TreeFolder } from '@/components/folder/TreeFolder'
import { FileEditor } from '@/components/file/FileEditor'
import { Button } from '@/components/ui/button'
import { Plus, Search, FolderOpen, FileText, Code, BookOpen } from 'lucide-react'
import { TreeNode, File } from '@/types'

interface DashboardProps {
  children?: React.ReactNode
}

export function Dashboard({ children }: DashboardProps) {
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  
  // 将treeData改为状态
  const [treeData, setTreeData] = useState<TreeNode[]>([
    {
      id: 'root',
      name: '我的知识库',
      type: 'folder',
      children: [
        {
          id: 'code-folder',
          name: '代码库',
          type: 'folder',
          children: [
            {
              id: 'file1',
              name: 'React Hooks 示例',
              type: 'file',
              data: {
                id: 'file1',
                name: 'React Hooks 示例',
                type: 'code',
                content: '// React Hooks 示例代码\nimport { useState, useEffect } from \'react\'\n\nfunction Example() {\n  const [count, setCount] = useState(0)\n  \n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n    </div>\n  )\n}',
                folderId: 'code-folder',
                userId: 'user1',
                tags: ['React', 'Hooks'],
                createdAt: new Date(),
                updatedAt: new Date()
              }
            }
          ]
        },
        {
          id: 'knowledge-folder',
          name: '知识点',
          type: 'folder',
          children: [
            {
              id: 'file2',
              name: 'JavaScript 异步编程',
              type: 'file',
              data: {
                id: 'file2',
                name: 'JavaScript 异步编程',
                type: 'knowledge',
                content: '# JavaScript 异步编程\n\n## Promise\nPromise 是异步编程的一种解决方案...\n\n## Async/Await\nAsync/Await 是基于 Promise 的语法糖...',
                folderId: 'knowledge-folder',
                userId: 'user1',
                tags: ['JavaScript', '异步'],
                createdAt: new Date(),
                updatedAt: new Date()
              }
            }
          ]
        },
        {
          id: 'essay-folder',
          name: '随笔',
          type: 'folder',
          children: [
            {
              id: 'file3',
              name: '学习心得',
              type: 'file',
              data: {
                id: 'file3',
                name: '学习心得',
                type: 'note',
                content: '# 学习心得\n\n今天学习了 React 的新特性...',
                folderId: 'essay-folder',
                userId: 'user1',
                tags: ['学习', '心得'],
                createdAt: new Date(),
                updatedAt: new Date()
              }
            }
          ]
        }
      ]
    }
  ])

  const handleNodeSelect = (node: TreeNode) => {
    setSelectedNode(node)
    if (node.type === 'file' && node.data) {
      // 检查是否为File类型（包含File特有的属性）
      if ('type' in node.data && 'content' in node.data && 'folderId' in node.data && 'tags' in node.data) {
        setSelectedFile(node.data as File)
      } else {
        setSelectedFile(null)
      }
    } else {
      setSelectedFile(null)
    }
  }

  // Add a counter to ensure unique IDs
  let idCounter = Date.now()
  
  const generateUniqueId = () => {
    return `item-${++idCounter}-${Math.random().toString(36).substr(2, 9)}`
  }
  
  // 修改handleCreateFolder函数
  const handleCreateFolder = (parentId: string) => {
    const folderName = prompt('请输入文件夹名称：')
    if (!folderName) return
    
    const newFolder: TreeNode = {
      id: generateUniqueId(),
      name: folderName,
      type: 'folder',
      children: []
    }
    
    setTreeData(prevData => {
      // 深拷贝整个数据结构
      const newData = JSON.parse(JSON.stringify(prevData))
      const addToParent = (nodes: TreeNode[]): boolean => {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].id === parentId) {
            // 确保children数组存在
            if (!nodes[i].children) {
              nodes[i].children = []
            }
            // 现在可以安全地使用children
            nodes[i].children!.push(newFolder)
            return true
          }
          // 修复类型错误：使用非空断言操作符
          if (nodes[i].children && addToParent(nodes[i].children!)) {
            return true
          }
        }
        return false
      }
      
      addToParent(newData)
      return newData
    })
  }
  
  // 修改handleCreateFile函数
  const handleCreateFile = (folderId: string) => {
    const fileName = prompt('请输入文件名称：')
    if (!fileName) return
    
    const newFile: TreeNode = {
      id: generateUniqueId(),
      name: fileName,
      type: 'file',
      data: {
        id: generateUniqueId(),
        name: fileName,
        type: 'note',
        content: '# ' + fileName + '\n\n在这里输入内容...',
        folderId: folderId,
        userId: 'user1',
        tags: [],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }
    
    setTreeData(prevData => {
      // 深拷贝整个数据结构
      const newData = JSON.parse(JSON.stringify(prevData))
      const addToParent = (nodes: TreeNode[]): boolean => {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].id === folderId) {
            // 确保children数组存在
            if (!nodes[i].children) {
              nodes[i].children = []
            }
            // 现在可以安全地使用children
            nodes[i].children!.push(newFile)
            return true
          }
          // 修复类型错误：使用非空断言操作符
          if (nodes[i].children && addToParent(nodes[i].children!)) {
            return true
          }
        }
        return false
      }
      
      addToParent(newData)
      return newData
    })
  }
  
  // 修改handleDelete函数
  const handleDelete = (node: TreeNode) => {
    if (!confirm(`确定要删除 "${node.name}" 吗？`)) return
    
    setTreeData(prevData => {
      // 深拷贝整个数据结构
      const newData = JSON.parse(JSON.stringify(prevData))
      const removeFromParent = (nodes: TreeNode[]): boolean => {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].id === node.id) {
            nodes.splice(i, 1)
            return true
          }
          // 修复类型错误：使用非空断言操作符
          if (nodes[i].children && removeFromParent(nodes[i].children!)) {
            return true
          }
        }
        return false
      }
      
      removeFromParent(newData)
      return newData
    })
  }

  const handleSaveFile = async (fileData: Partial<File>) => {
    console.log('Save file:', fileData)
    // 实现保存文件逻辑
  }

  const handleExportFile = (format: 'md' | 'txt' | 'json') => {
    console.log('Export file as:', format)
    // 实现导出文件逻辑
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* 侧边栏 */}
        <Sidebar className="w-80 border-r" collapsible="icon">
          <SidebarHeader className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold">我的知识库</h1>
              <SidebarTrigger className="ml-auto" />
            </div>
            <div className="mt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="搜索文件..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            <div className="space-y-4">
              {/* 快速操作 */}
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleCreateFolder('root')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  新建文件夹
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleCreateFile('root')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  新建文件
                </Button>
              </div>
              
              {/* 分类导航 */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">分类</h3>
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex flex-col items-center gap-1 h-auto py-3"
                    onClick={() => {
                      // 筛选代码文件
                      const codeFolder = treeData[0].children?.find(child => child.id === 'code-folder');
                      if (codeFolder) handleNodeSelect(codeFolder);
                    }}
                  >
                    <Code className="w-5 h-5" />
                    <span className="text-xs">代码</span>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex flex-col items-center gap-1 h-auto py-3"
                    onClick={() => {
                      // 筛选知识点文件
                      const knowledgeFolder = treeData[0].children?.find(child => child.id === 'knowledge-folder');
                      if (knowledgeFolder) handleNodeSelect(knowledgeFolder);
                    }}
                  >
                    <BookOpen className="w-5 h-5" />
                    <span className="text-xs">知识</span>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex flex-col items-center gap-1 h-auto py-3"
                    onClick={() => {
                      // 筛选随笔文件
                      const essayFolder = treeData[0].children?.find(child => child.id === 'essay-folder');
                      if (essayFolder) handleNodeSelect(essayFolder);
                    }}
                  >
                    <FileText className="w-5 h-5" />
                    <span className="text-xs">随笔</span>
                  </Button>
                </div>
              </div>
              
              {/* 文件树 */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">文件树</h3>
                <div className="border rounded-lg p-2 bg-gray-50">
                  {treeData.map((node) => (
                    <TreeFolder
                      key={node.id}
                      node={node}
                      onSelect={handleNodeSelect}
                      onCreateFolder={handleCreateFolder}
                      onCreateFile={handleCreateFile}
                      onDelete={handleDelete}
                      selectedId={selectedNode?.id}
                    />
                  ))}
                </div>
              </div>
            </div>
          </SidebarContent>
        </Sidebar>
        
        {/* 主内容区域 */}
        <div className="flex-1 flex flex-col">
          {children}
          <div className="flex-1 p-6">
            {selectedFile ? (
              <FileEditor
                file={selectedFile}
                onSave={handleSaveFile}
                onExport={handleExportFile}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <FolderOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg mb-2">选择一个文件开始编辑</p>
                  <p className="text-sm">从左侧文件树中选择文件，或创建新文件</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}