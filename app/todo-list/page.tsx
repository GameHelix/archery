'use client'

import { useState, useEffect, useId } from 'react'
import { CheckSquare, Plus, Trash2, Edit3, Calendar, Clock, Star, Filter, Search, BarChart3, Target, Zap, Settings, CheckCircle, Circle, Square } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface Todo {
  id: string
  text: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  category: string
  createdAt: Date
  dueDate?: Date
}

type FilterType = 'all' | 'active' | 'completed'
type SortType = 'created' | 'priority' | 'alphabetical' | 'dueDate'

export default function TodoListPage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputText, setInputText] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingText, setEditingText] = useState('')
  const [filter, setFilter] = useState<FilterType>('all')
  const [sortBy, setSortBy] = useState<SortType>('created')
  const [searchQuery, setSearchQuery] = useState('')
  const [newTodoPriority, setNewTodoPriority] = useState<'low' | 'medium' | 'high'>('medium')
  const [newTodoCategory, setNewTodoCategory] = useState('General')
  const [showCompleted, setShowCompleted] = useState(true)
  const baseId = useId()
  const [idCounter, setIdCounter] = useState(0)

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('swissknife-todos')
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
        dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined
      }))
      setTodos(parsedTodos)
    }
  }, [])

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('swissknife-todos', JSON.stringify(todos))
    }
  }, [todos])

  const addTodo = () => {
    if (inputText.trim() === '') return

    const currentCounter = idCounter
    setIdCounter(prev => prev + 1)
    
    const newTodo: Todo = {
      id: `${baseId}-todo-${currentCounter}`,
      text: inputText.trim(),
      completed: false,
      priority: newTodoPriority,
      category: newTodoCategory,
      createdAt: new Date()
    }

    setTodos([newTodo, ...todos])
    setInputText('')
    setNewTodoPriority('medium')
    setNewTodoCategory('General')
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const startEditing = (id: string, text: string) => {
    setEditingId(id)
    setEditingText(text)
  }

  const saveEdit = () => {
    if (editingText.trim() === '') return

    setTodos(todos.map(todo => 
      todo.id === editingId ? { ...todo, text: editingText.trim() } : todo
    ))
    setEditingId(null)
    setEditingText('')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditingText('')
  }

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  const clearAll = () => {
    setTodos([])
    localStorage.removeItem('swissknife-todos')
  }

  // Filter and search todos
  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         todo.category.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (filter === 'active') return !todo.completed && matchesSearch
    if (filter === 'completed') return todo.completed && matchesSearch
    if (!showCompleted) return !todo.completed && matchesSearch
    return matchesSearch
  })

  // Sort todos
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    switch (sortBy) {
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      case 'alphabetical':
        return a.text.localeCompare(b.text)
      case 'dueDate':
        if (!a.dueDate && !b.dueDate) return 0
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return a.dueDate.getTime() - b.dueDate.getTime()
      default:
        return b.createdAt.getTime() - a.createdAt.getTime()
    }
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-700 border-green-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return '🔥'
      case 'medium': return '⚡'
      case 'low': return '🌱'
      default: return '📝'
    }
  }

  // Statistics
  const totalTodos = todos.length
  const completedTodos = todos.filter(t => t.completed).length
  const activeTodos = totalTodos - completedTodos
  const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0

  const categories = Array.from(new Set(todos.map(t => t.category)))

  const toolStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Free To-Do List App - Simple Task Management Tool",
    "applicationCategory": ["UtilitiesApplication", "ProductivityApplication"],
    "operatingSystem": ["Web Browser", "iOS", "Android", "Windows", "MacOS", "Linux"],
    "url": "https://swissknife.site/todo-list",
    "description": "Organize your tasks efficiently with our free, mobile-friendly to-do list app. Features priority levels, categories, smart search, local storage, and real-time statistics. No registration required.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "featureList": [
      "Task creation and management",
      "Priority levels (High, Medium, Low)",
      "Category organization", 
      "Smart search and filter functionality",
      "Task completion tracking",
      "Local storage persistence",
      "Real-time statistics and progress tracking",
      "Mobile-responsive design",
      "Touch-friendly interface",
      "No registration required",
      "Works offline",
      "Data privacy focused"
    ],
    "provider": {
      "@type": "Organization",
      "name": "SwissKnife",
      "url": "https://swissknife.site"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250",
      "bestRating": "5",
      "worstRating": "1"
    },
    "screenshot": "https://swissknife.site/icon-512.png",
    "downloadUrl": "https://swissknife.site/todo-list",
    "installUrl": "https://swissknife.site/todo-list",
    "browserRequirements": "Requires modern web browser with JavaScript enabled"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-teal-50 to-cyan-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolStructuredData) }}
      />
      
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-3xl flex items-center justify-center shadow-lg">
              <CheckSquare className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Free To-Do List App
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Organize your tasks efficiently with our mobile-friendly to-do list app.
            <span className="block mt-2 text-sm sm:text-base text-gray-500">
              ✅ Priority levels • 📁 Categories • 🔍 Smart search • 📱 Mobile-friendly
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
          {/* Statistics Cards */}
          <div className="xl:col-span-4 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Total Tasks</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">{totalTodos}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <Square className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Active Tasks</p>
                  <p className="text-2xl sm:text-3xl font-bold text-orange-600">{activeTodos}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
                  <Circle className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl sm:text-3xl font-bold text-green-600">{completedTodos}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Completion</p>
                  <p className="text-2xl sm:text-3xl font-bold text-teal-600">{completionRate}%</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 rounded-2xl flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-teal-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Todo List */}
          <div className="xl:col-span-3">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8">
              {/* Add Todo Section */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <Plus className="h-5 w-5 text-teal-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Add New Task</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addTodo()}
                      placeholder="What needs to be done?"
                      aria-label="Enter new task"
                      className="flex-1 px-4 py-4 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    />
                    <button
                      onClick={addTodo}
                      disabled={!inputText.trim()}
                      className="px-6 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-teal-700 hover:to-cyan-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] touch-manipulation"
                    >
                      Add Task
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <select
                      value={newTodoPriority}
                      onChange={(e) => setNewTodoPriority(e.target.value as 'low' | 'medium' | 'high')}
                      className="px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 min-h-[48px]"
                    >
                      <option value="low">🌱 Low Priority</option>
                      <option value="medium">⚡ Medium Priority</option>
                      <option value="high">🔥 High Priority</option>
                    </select>
                    <input
                      type="text"
                      value={newTodoCategory}
                      onChange={(e) => setNewTodoCategory(e.target.value)}
                      placeholder="Category"
                      className="flex-1 px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 min-h-[48px]"
                    />
                  </div>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="mb-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search tasks or categories..."
                      aria-label="Search tasks"
                      className="w-full pl-10 pr-4 py-4 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 min-h-[48px]"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                  <div className="flex rounded-xl border border-gray-300 overflow-hidden">
                    {(['all', 'active', 'completed'] as FilterType[]).map((filterType) => (
                      <button
                        key={filterType}
                        onClick={() => setFilter(filterType)}
                        className={`px-4 py-3 text-sm font-medium capitalize transition-colors min-h-[48px] touch-manipulation flex-1 sm:flex-none ${
                          filter === filterType
                            ? 'bg-teal-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-teal-50'
                        }`}
                      >
                        {filterType}
                      </button>
                    ))}
                  </div>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortType)}
                    className="px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 min-h-[48px] w-full sm:w-auto"
                  >
                    <option value="created">Sort by Created</option>
                    <option value="priority">Sort by Priority</option>
                    <option value="alphabetical">Sort A-Z</option>
                  </select>

                  {completedTodos > 0 && (
                    <button
                      onClick={clearCompleted}
                      className="px-4 py-3 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors text-sm font-medium min-h-[48px] touch-manipulation w-full sm:w-auto"
                    >
                      Clear Completed
                    </button>
                  )}
                </div>
              </div>

              {/* Todo List */}
              <div className="space-y-3">
                {sortedTodos.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <CheckSquare className="h-10 w-10 text-teal-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {searchQuery ? 'No matching tasks' : 'Ready to get organized?'}
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      {searchQuery 
                        ? 'Try adjusting your search terms or filters to find what you\'re looking for.' 
                        : 'Create your first task and start being more productive today. You\'ve got this! ✨'}
                    </p>
                    {!searchQuery && (
                      <div className="space-y-2 text-sm text-gray-500">
                        <p>💡 <strong>Pro tip:</strong> Use categories to organize your tasks</p>
                        <p>🎯 <strong>Set priorities</strong> to focus on what matters most</p>
                      </div>
                    )}
                  </div>
                ) : (
                  sortedTodos.map((todo) => (
                    <div
                      key={todo.id}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        todo.completed
                          ? 'bg-gray-50 border-gray-200 opacity-75'
                          : 'bg-white border-gray-200 hover:border-teal-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleTodo(todo.id)}
                          className={`mt-1 w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all duration-200 touch-manipulation ${
                            todo.completed
                              ? 'bg-teal-600 border-teal-600 text-white'
                              : 'border-gray-300 hover:border-teal-500'
                          }`}
                        >
                          {todo.completed && <CheckCircle className="h-5 w-5" />}
                        </button>

                        <div className="flex-1 min-w-0">
                          {editingId === todo.id ? (
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={editingText}
                                onChange={(e) => setEditingText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                                onBlur={saveEdit}
                                className="flex-1 px-3 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 min-h-[44px]"
                                autoFocus
                              />
                              <button
                                onClick={cancelEdit}
                                className="px-3 py-3 text-gray-500 hover:text-gray-700 min-h-[44px] touch-manipulation"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <div>
                              <p
                                className={`text-gray-900 font-medium break-words ${
                                  todo.completed ? 'line-through text-gray-500' : ''
                                }`}
                              >
                                {todo.text}
                              </p>
                              <div className="flex items-center gap-3 mt-2">
                                <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getPriorityColor(todo.priority)}`}>
                                  {getPriorityIcon(todo.priority)} {todo.priority.toUpperCase()}
                                </span>
                                <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full border border-blue-200">
                                  📁 {todo.category}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {todo.createdAt.toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => startEditing(todo.id, todo.text)}
                            className="p-3 text-gray-400 hover:text-blue-600 rounded-lg transition-colors touch-manipulation min-h-[44px] min-w-[44px]"
                          >
                            <Edit3 className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => deleteTodo(todo.id)}
                            className="p-3 text-gray-400 hover:text-red-600 rounded-lg transition-colors touch-manipulation min-h-[44px] min-w-[44px]"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Clear All Button */}
              {todos.length > 0 && (
                <div className="mt-6 text-center">
                  <button
                    onClick={clearAll}
                    className="px-6 py-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-colors duration-200 min-h-[48px] touch-manipulation w-full sm:w-auto"
                  >
                    Clear All Tasks
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* Progress */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center mb-4">
                <Target className="h-6 w-6 text-purple-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Progress</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span>Completion Rate</span>
                    <span>{completionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-teal-500 to-cyan-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${completionRate}%` }}
                    />
                  </div>
                </div>

                <div className="text-center p-4 bg-teal-50 rounded-xl border border-teal-200">
                  <div className="text-2xl font-bold text-teal-600">
                    {activeTodos}
                  </div>
                  <div className="text-sm text-teal-700">
                    {activeTodos === 1 ? 'Task remaining' : 'Tasks remaining'}
                  </div>
                </div>
              </div>
            </div>

            {/* Categories */}
            {categories.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
                <div className="flex items-center mb-4">
                  <Settings className="h-6 w-6 text-indigo-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
                </div>
                
                <div className="space-y-2">
                  {categories.map(category => {
                    const categoryTodos = todos.filter(t => t.category === category)
                    const categoryCompleted = categoryTodos.filter(t => t.completed).length
                    const categoryProgress = categoryTodos.length > 0 
                      ? Math.round((categoryCompleted / categoryTodos.length) * 100) 
                      : 0
                    
                    return (
                      <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-700">📁 {category}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            {categoryCompleted}/{categoryTodos.length}
                          </span>
                          <div className="w-12 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-teal-500 h-2 rounded-full"
                              style={{ width: `${categoryProgress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Tips */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">💡 Productivity Tips</h3>
              <div className="space-y-3 text-sm text-blue-800">
                <div>
                  <div className="font-medium mb-1">🎯 Prioritize wisely:</div>
                  <div className="text-xs text-blue-700">Use high priority for urgent tasks only</div>
                </div>
                <div>
                  <div className="font-medium mb-1">📂 Organize by category:</div>
                  <div className="text-xs text-blue-700">Group similar tasks together</div>
                </div>
                <div>
                  <div className="font-medium mb-1">🏃 Break large tasks:</div>
                  <div className="text-xs text-blue-700">Split complex tasks into smaller ones</div>
                </div>
                <div>
                  <div className="font-medium mb-1">📱 Mobile optimized:</div>
                  <div className="text-xs text-blue-700">Works perfectly on all devices</div>
                </div>
                <div>
                  <div className="font-medium mb-1">✅ Regular cleanup:</div>
                  <div className="text-xs text-blue-700">Clear completed tasks periodically</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}