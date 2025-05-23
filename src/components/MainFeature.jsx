import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import ApperIcon from './ApperIcon'

function MainFeature() {
  const [activeBoard, setActiveBoard] = useState('main')
  const [draggedTask, setDraggedTask] = useState(null)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    assignee: '',
    dueDate: ''
  })

  const [tasks, setTasks] = useState({
    todo: [
      {
        id: 1,
        title: 'Design Homepage Layout',
        description: 'Create wireframes and mockups for the new homepage design',
        priority: 'high',
        assignee: 'Sarah Chen',
        dueDate: '2024-01-15',
        tags: ['design', 'ui/ux']
      },
      {
        id: 2,
        title: 'Setup Database Schema',
        description: 'Design and implement the initial database structure',
        priority: 'medium',
        assignee: 'Alex Kumar',
        dueDate: '2024-01-18',
        tags: ['backend', 'database']
      }
    ],
    inprogress: [
      {
        id: 3,
        title: 'Implement User Authentication',
        description: 'Build login and registration functionality with JWT tokens',
        priority: 'high',
        assignee: 'Mike Johnson',
        dueDate: '2024-01-12',
        tags: ['backend', 'security']
      }
    ],
    review: [
      {
        id: 4,
        title: 'Mobile Responsive Testing',
        description: 'Test the application across different mobile devices',
        priority: 'medium',
        assignee: 'Lisa Park',
        dueDate: '2024-01-10',
        tags: ['testing', 'mobile']
      }
    ],
    done: [
      {
        id: 5,
        title: 'Project Setup',
        description: 'Initialize repository and development environment',
        priority: 'low',
        assignee: 'David Wilson',
        dueDate: '2024-01-05',
        tags: ['setup', 'devops']
      }
    ]
  })

  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-surface-100 dark:bg-surface-800', count: tasks.todo.length },
    { id: 'inprogress', title: 'In Progress', color: 'bg-blue-50 dark:bg-blue-900/20', count: tasks.inprogress.length },
    { id: 'review', title: 'Review', color: 'bg-yellow-50 dark:bg-yellow-900/20', count: tasks.review.length },
    { id: 'done', title: 'Done', color: 'bg-green-50 dark:bg-green-900/20', count: tasks.done.length }
  ]

  const teamMembers = ['Sarah Chen', 'Alex Kumar', 'Mike Johnson', 'Lisa Park', 'David Wilson']

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800'
      case 'low': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800'
      default: return 'bg-surface-100 text-surface-800 border-surface-200 dark:bg-surface-800 dark:text-surface-300 dark:border-surface-700'
    }
  }

  const handleDragStart = (e, task, columnId) => {
    setDraggedTask({ task, sourceColumn: columnId })
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, targetColumn) => {
    e.preventDefault()
    if (!draggedTask) return

    const { task, sourceColumn } = draggedTask

    if (sourceColumn === targetColumn) {
      setDraggedTask(null)
      return
    }

    // Remove task from source column
    setTasks(prev => ({
      ...prev,
      [sourceColumn]: prev[sourceColumn].filter(t => t.id !== task.id),
      [targetColumn]: [...prev[targetColumn], task]
    }))

    toast.success(`Task "${task.title}" moved to ${columns.find(col => col.id === targetColumn)?.title}`)
    setDraggedTask(null)
  }

  const handleTaskClick = (task) => {
    setSelectedTask(task)
    setShowTaskModal(true)
  }

  const handleCreateTask = () => {
    if (!newTask.title.trim()) {
      toast.error('Task title is required')
      return
    }

    if (!newTask.title.trim()) {
      toast.error('Task title is required')
      return
    }

    if (!newTask.assignee) {
      toast.error('Please assign the task to a team member')
      return
    }

    const task = {
      id: Date.now(),
      ...newTask,
      tags: []
    }

    setTasks(prev => ({
      ...prev,
      todo: [...prev.todo, task]
    }))

    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      assignee: '',
      dueDate: ''
    })

    toast.success('Task created successfully!')
    setShowCreateModal(false)
  }

  const handleDeleteTask = (taskId, columnId) => {
    setTasks(prev => ({
      ...prev,
      [columnId]: prev[columnId].filter(t => t.id !== taskId)
    }))
    toast.success('Task deleted successfully!')
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-surface-900 dark:text-white mb-2">
            Project Board
          </h2>
          <p className="text-surface-600 dark:text-surface-400">
            Drag and drop tasks between columns to update their status
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <ApperIcon name="Plus" className="w-5 h-5" />
            <span>Add New Task</span>
          </button>
          
          <select 
            value={activeBoard} 
            onChange={(e) => setActiveBoard(e.target.value)}
            className="px-4 py-2 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
          >
            <option value="main">Main Project</option>
            <option value="website">Website Redesign</option>
            <option value="mobile">Mobile App</option>
          </select>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {columns.map((column) => (
          <motion.div
            key={column.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`${column.color} rounded-2xl border border-surface-200/50 dark:border-surface-700/50 overflow-hidden min-h-96`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            {/* Column Header */}
            <div className="p-4 border-b border-surface-200 dark:border-surface-700">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-surface-900 dark:text-white">{column.title}</h3>
                <span className="bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300 text-xs font-medium px-2 py-1 rounded-full">
                  {column.count}
                </span>
              </div>
            </div>

            {/* Tasks */}
            <div className="p-4 space-y-3 min-h-80">
              <AnimatePresence>
                {tasks[column.id].map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task, column.id)}
                    onClick={() => handleTaskClick(task)}
                    className="bg-white dark:bg-surface-800 rounded-xl p-4 shadow-card hover:shadow-soft transition-all duration-300 cursor-move group border border-surface-200/50 dark:border-surface-600/50"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-surface-900 dark:text-white text-sm leading-tight flex-1 pr-2">
                        {task.title}
                      </h4>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteTask(task.id, column.id)
                        }}
                        className="opacity-0 group-hover:opacity-100 text-surface-400 hover:text-red-500 transition-all duration-200"
                      >
                        <ApperIcon name="X" className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <p className="text-surface-600 dark:text-surface-400 text-xs mb-3 line-clamp-2">
                      {task.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      
                      {task.dueDate && (
                        <span className="text-xs text-surface-500 dark:text-surface-400 flex items-center">
                          <ApperIcon name="Calendar" className="w-3 h-3 mr-1" />
                          {format(new Date(task.dueDate), 'MMM dd')}
                        </span>
                      )}
                    </div>
                    
                    {task.assignee && (
                      <div className="mt-3 pt-3 border-t border-surface-200 dark:border-surface-700">
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-xs font-semibold mr-2">
                            {task.assignee.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-xs text-surface-600 dark:text-surface-400">{task.assignee}</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Create Task Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-surface-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-surface-900 dark:text-white">Create New Task</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 transition-colors"
                >
                  <ApperIcon name="X" className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Task Title *</label>
                  <input
                    type="text"
                    placeholder="Enter task title..."
                    value={newTask.title}
                    onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white placeholder-surface-500 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Description</label>
                  <textarea
                    placeholder="Enter task description..."
                    value={newTask.description}
                    onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white placeholder-surface-500 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Priority</label>
                    <select
                      value={newTask.priority}
                      onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Due Date</label>
                    <input
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Assign To *</label>
                  <select
                    value={newTask.assignee}
                    onChange={(e) => setNewTask(prev => ({ ...prev, assignee: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select team member...</option>
                    {teamMembers.map(member => (
                      <option key={member} value={member}>{member}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-6 py-3 border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 font-medium rounded-xl hover:bg-surface-50 dark:hover:bg-surface-700 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateTask}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Create Task
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Task Detail Modal */}
      <AnimatePresence>
        {showTaskModal && selectedTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowTaskModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-surface-800 rounded-2xl p-6 w-full max-w-2xl max-h-96 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <h3 className="text-xl font-bold text-surface-900 dark:text-white">{selectedTask.title}</h3>
                <button
                  onClick={() => setShowTaskModal(false)}
                  className="text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 transition-colors"
                >
                  <ApperIcon name="X" className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Description</label>
                  <p className="text-surface-600 dark:text-surface-400">{selectedTask.description}</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Priority</label>
                    <span className={`inline-block px-3 py-1 rounded-lg text-sm font-medium ${getPriorityColor(selectedTask.priority)}`}>
                      {selectedTask.priority}
                    </span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Due Date</label>
                    <p className="text-surface-600 dark:text-surface-400">{selectedTask.dueDate}</p>
                  </div>
                </div>
                
                {selectedTask.assignee && (
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Assigned To</label>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-sm font-semibold mr-3">
                        {selectedTask.assignee.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-surface-600 dark:text-surface-400">{selectedTask.assignee}</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature