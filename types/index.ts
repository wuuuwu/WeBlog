export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  role?: string;
}

export interface Session {
  user: User;
  expires: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Folder {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  categoryId: string;
  userId: string;
  path: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface File {
  id: string;
  name: string;
  type: 'code' | 'knowledge' | 'note';
  content: string;
  folderId: string;
  userId: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FileMetadata {
  id: string;
  fileId: string;
  size: number;
  mimeType: string;
  url: string;
  createdAt: Date;
}

export interface TreeNode {
  id: string;
  name: string;
  type: 'folder' | 'file';
  children?: TreeNode[];
  data?: Folder | File;
}