import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// 客户端实例
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 服务端实例
export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey)

// 数据库表名
export const TABLES = {
  CATEGORIES: 'categories',
  FOLDERS: 'folders',
  FILES: 'files',
  FILE_METADATA: 'file_metadata'
} as const

// 初始化数据库表
export async function initializeDatabase() {
  const { error } = await supabaseServer.rpc('exec_sql', {
    sql: `
      -- 创建分类表
      CREATE TABLE IF NOT EXISTS categories (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        color TEXT,
        icon TEXT,
        parent_id UUID REFERENCES categories(id),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      
      -- 创建文件夹表
      CREATE TABLE IF NOT EXISTS folders (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        parent_id UUID REFERENCES folders(id),
        category_id UUID NOT NULL REFERENCES categories(id),
        user_id TEXT NOT NULL,
        path TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      
      -- 创建文件表
      CREATE TABLE IF NOT EXISTS files (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name TEXT NOT NULL,
        type TEXT NOT NULL CHECK (type IN ('code', 'knowledge', 'note')),
        content TEXT,
        folder_id UUID NOT NULL REFERENCES folders(id),
        user_id TEXT NOT NULL,
        tags TEXT[] DEFAULT '{}',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      
      -- 创建文件元数据表
      CREATE TABLE IF NOT EXISTS file_metadata (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        file_id UUID NOT NULL REFERENCES files(id),
        size BIGINT,
        mime_type TEXT,
        url TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      
      -- 创建索引
      CREATE INDEX IF NOT EXISTS idx_folders_category_id ON folders(category_id);
      CREATE INDEX IF NOT EXISTS idx_folders_user_id ON folders(user_id);
      CREATE INDEX IF NOT EXISTS idx_files_folder_id ON files(folder_id);
      CREATE INDEX IF NOT EXISTS idx_files_user_id ON files(user_id);
      CREATE INDEX IF NOT EXISTS idx_file_metadata_file_id ON file_metadata(file_id);
    `
  })
  
  if (error) {
    console.error('Database initialization error:', error)
    throw error
  }
}