// components/AuthButton.tsx
'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export function AuthButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          你好，{session.user?.name || session.user?.email}
        </span>
        <Button variant="outline" size="sm" onClick={() => signOut()}>
          登出
        </Button>
      </div>
    )
  }

  return (
    <Button size="sm" onClick={() => signIn('github')}>
      登录
    </Button>
  )
}