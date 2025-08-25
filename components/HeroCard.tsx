'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Code, BookOpen, FileText, Lightbulb, Users, Star } from 'lucide-react'

interface HeroCardProps {
  title: string
  description: string
  image: string
  link: string
  icon: React.ReactNode
  features?: string[]
}

export function HeroCard({ title, description, image, link, icon, features = [] }: HeroCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
      {/* 图片背景 */}
      <div className="relative h-64 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* 浮动图标 */}
        <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
          {icon}
        </div>
      </div>
      
      {/* 内容区域 */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
        
        {/* 特性列表 */}
        {features.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {features.map((feature, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700"
                >
                  <Star className="w-3 h-3 mr-1" />
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* 行动按钮 */}
        <Link href={link}>
          <Button className="w-full group-hover:bg-blue-600 transition-colors duration-300">
            <span>进入{title}</span>
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </Link>
      </div>
    </div>
  )
}