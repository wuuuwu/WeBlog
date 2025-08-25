'use client'

import React, { useState } from 'react'
import { ChevronRight, ChevronDown, Folder, FolderOpen, File, Plus, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { TreeNode } from '@/types'

interface TreeFolderProps {
  node: TreeNode
  level?: number
  onSelect?: (node: TreeNode) => void
  onCreateFolder?: (parentId: string) => void
  onCreateFile?: (folderId: string) => void
  onDelete?: (node: TreeNode) => void
  selectedId?: string
}

export function TreeFolder({
  node,
  level = 0,
  onSelect,
  onCreateFolder,
  onCreateFile,
  onDelete,
  selectedId
}: TreeFolderProps) {
  const [isExpanded, setIsExpanded] = useState(level < 2)
  const [isSelected, setIsSelected] = useState(selectedId === node.id)

  const hasChildren = node.children && node.children.length > 0
  const isFolder = node.type === 'folder'

  const handleToggle = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded)
    }
  }

  const handleClick = () => {
    setIsSelected(true)
    onSelect?.(node)
  }

  const handleCreateFolder = (e: React.MouseEvent) => {
    e.stopPropagation()
    onCreateFolder?.(node.id)
  }

  const handleCreateFile = (e: React.MouseEvent) => {
    e.stopPropagation()
    onCreateFile?.(node.id)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete?.(node)
  }

  return (
    <div className="select-none group">
      <div
        className={`flex items-center gap-1 py-1 px-2 rounded cursor-pointer hover:bg-gray-100 transition-colors ${
          isSelected ? 'bg-blue-50 text-blue-600' : ''
        }`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={handleClick}
      >
        <div
          className="flex items-center justify-center w-4 h-4 cursor-pointer hover:bg-gray-200 rounded"
          onClick={handleToggle}
        >
          {hasChildren && (
            isExpanded ? (
              <ChevronDown className="w-3 h-3" />
            ) : (
              <ChevronRight className="w-3 h-3" />
            )
          )}
        </div>
        
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {isFolder ? (
            isExpanded ? (
              <FolderOpen className="w-4 h-4 text-blue-500" />
            ) : (
              <Folder className="w-4 h-4 text-blue-500" />
            )
          ) : (
            <File className="w-4 h-4 text-gray-500" />
          )}
          
          <span className="text-sm truncate">{node.name}</span>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {isFolder && (
              <>
                <DropdownMenuItem onClick={handleCreateFolder}>
                  <Plus className="w-3 h-3 mr-2" />
                  新建文件夹
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleCreateFile}>
                  <Plus className="w-3 h-3 mr-2" />
                  新建文件
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuItem onClick={handleDelete} className="text-red-600">
              删除
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {isExpanded && hasChildren && (
        <div>
          {node.children?.map((child) => (
            <TreeFolder
              key={child.id}
              node={child}
              level={level + 1}
              onSelect={onSelect}
              onCreateFolder={onCreateFolder}
              onCreateFile={onCreateFile}
              onDelete={onDelete}
              selectedId={selectedId}
            />
          ))}
        </div>
      )}
    </div>
  )
}