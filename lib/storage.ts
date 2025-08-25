import { put } from '@vercel/blob'
import { supabase } from './database'

export class StorageService {
  private blobToken = process.env.BLOB_READ_WRITE_TOKEN!

  async uploadFile(file: File, path: string): Promise<string> {
    try {
      // 使用 Vercel Blob 上传文件
      const blob = await put(path, file, {
        access: 'public',
        token: this.blobToken
      })
      
      return blob.url
    } catch (error) {
      console.error('File upload error:', error)
      throw new Error('文件上传失败')
    }
  }

  async deleteFile(url: string): Promise<void> {
    try {
      // Vercel Blob 会自动删除未使用的文件
      // 这里可以添加额外的清理逻辑
      console.log('File deletion requested:', url)
    } catch (error) {
      console.error('File deletion error:', error)
      throw new Error('文件删除失败')
    }
  }

  async getFileUrl(path: string): Promise<string> {
    return `https://${process.env.VERCEL_URL || 'localhost:3000'}/api/files/${path}`
  }
}

export const storageService = new StorageService()