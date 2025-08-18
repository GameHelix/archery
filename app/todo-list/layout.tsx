import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free To-Do List App - Simple Task Management | SwissKnife',
  description: 'Organize your tasks efficiently with our free, simple to-do list app. Features priority levels, categories, smart search, local storage, and real-time statistics. No registration required.',
  keywords: [
    'todo list',
    'task management',
    'to do list',
    'task organizer',
    'productivity tool',
    'task tracker',
    'todo app',
    'task planner',
    'checklist',
    'task list',
    'priority tasks',
    'task categories',
    'task search',
    'simple todo',
    'free todo list',
    'online todo list',
    'task management tool',
    'productivity app',
    'organize tasks',
    'task completion',
    'mobile todo list',
    'responsive task manager',
    'browser todo app',
    'offline todo list',
    'task statistics',
    'todo with categories',
    'priority task manager',
    'smart todo list'
  ],
  openGraph: {
    title: 'Free To-Do List App - Simple Task Management | SwissKnife',
    description: 'Organize your tasks efficiently with our free, mobile-friendly to-do list app. Features priority levels, categories, smart search, and real-time statistics.',
    url: 'https://swissknife.site/todo-list',
    type: 'website',
    siteName: 'SwissKnife',
    images: [
      {
        url: 'https://swissknife.site/icon-512.png',
        width: 512,
        height: 512,
        alt: 'SwissKnife Free To-Do List App - Task Management Tool'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free To-Do List App - Simple Task Management',
    description: 'Organize your tasks with priorities, categories, smart search, and real-time statistics. Mobile-friendly and free to use.',
    images: ['https://swissknife.site/icon-512.png'],
  },
  alternates: {
    canonical: '/todo-list',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function TodoListLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}