'use client'

import React, { useState, useEffect } from 'react'
import { Save, Download, Share2, Tag, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { File } from '@/types'

interface FileEditorProps {
  file?: File
  onSave: (file: Partial<File>) => void
  onExport?: (format: 'md' | 'txt' | 'json') => void
}

export function FileEditor({ file, onSave, onExport }: FileEditorProps) {
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (file) {
      setContent(file.content)
      setTitle(file.name)
      setTags(file.tags || [])
    }
  }, [file])

  const handleSave = async () => {
    if (!file) return
    
    setIsSaving(true)
    try {
      await onSave({
        ...file,
        name: title,
        content,
        tags
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()])
      }
      setCurrentTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const getFileTypeIcon = () => {
    switch (file?.type) {
      case 'code': return '💻'
      case 'knowledge': return '📚'
      case 'note': return '📝'
      default: return '📄'
    }
  }

  if (!file) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="text-center">
          <div className="text-4xl mb-4">📄</div>
          <p>选择一个文件开始编辑</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* 文件头部 */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3 flex-1">
          <span className="text-xl">{getFileTypeIcon()}</span>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg font-semibold border-none p-0 h-auto focus-visible:ring-0"
            placeholder="文件标题"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            size="sm"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? '保存中...' : '保存'}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onExport?.('md')}>
                <Download className="w-4 h-4 mr-2" />
                导出为 Markdown
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onExport?.('txt')}>
                <Download className="w-4 h-4 mr-2" />
                导出为文本
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onExport?.('json')}>
                <Download className="w-4 h-4 mr-2" />
                导出为 JSON
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="w-4 h-4 mr-2" />
                分享链接
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* 标签区域 */}
      <div className="flex items-center gap-2 p-4 border-b">
        <Tag className="w-4 h-4 text-gray-500" />
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs flex items-center gap-1"
            >
              {tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="text-blue-500 hover:text-blue-700"
              >
                ×
              </button>
            </span>
          ))}
          <Input
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="添加标签..."
            className="h-6 text-xs border-dashed max-w-24"
          />
        </div>
      </div>
      
      {/* 编辑区域 */}
      <div className="flex-1 p-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-full p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          placeholder="开始输入内容..."
          spellCheck="false"
        />
      </div>
    </div>
  )
}