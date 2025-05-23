import { useState } from 'react'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

function Home() {
  const [activeView, setActiveView] = useState('kanban')

  const stats = [
    { label: 'Active Projects', value: '12', icon: 'FolderOpen', color: 'text-primary' },
    { label: 'Tasks Completed', value: '89', icon: 'CheckCircle', color: 'text-green-500' },
    { label: 'Team Members', value: '24', icon: 'Users', color: 'text-secondary' },
    { label: 'Deadlines This Week', value: '7', icon: 'Clock', color: 'text-accent' }
  ]

  const recentProjects = [
    { name: 'Website Redesign', progress: 75, status: 'active', dueDate: '2024-01-15' },
    { name: 'Mobile App', progress: 45, status: 'active', dueDate: '2024-01-20' },
    { name: 'Marketing Campaign', progress: 90, status: 'review', dueDate: '2024-01-10' },
    { name: 'Database Migration', progress: 30, status: 'planning', dueDate: '2024-01-25' }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'review': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'planning': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      default: return 'bg-surface-100 text-surface-800 dark:bg-surface-800 dark:text-surface-200'
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-8 sm:py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 lg:mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-surface-900 dark:text-white mb-4 lg:mb-6">
              Project Management
              <span className="block text-transparent bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text">
                Made Simple
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-surface-600 dark:text-surface-300 max-w-3xl mx-auto">
              Streamline your workflow, collaborate seamlessly, and deliver projects on time with TaskFlow's intuitive interface.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mb-12 lg:mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/60 dark:bg-surface-800/60 backdrop-blur-sm rounded-2xl p-4 lg:p-6 border border-surface-200/50 dark:border-surface-700/50 hover:shadow-soft transition-all duration-300 group">
                <div className="flex items-center justify-between mb-2">
                  <ApperIcon name={stat.icon} className={`w-6 h-6 lg:w-8 lg:h-8 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-surface-900 dark:text-white mb-1">{stat.value}</div>
                <div className="text-sm lg:text-base text-surface-600 dark:text-surface-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Recent Projects */}
          <div className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-3xl border border-surface-200/50 dark:border-surface-700/50 overflow-hidden mb-12">
            <div className="p-6 lg:p-8 border-b border-surface-200 dark:border-surface-700">
              <h2 className="text-xl lg:text-2xl font-bold text-surface-900 dark:text-white">Recent Projects</h2>
            </div>
            <div className="p-6 lg:p-8">
              <div className="space-y-4">
                {recentProjects.map((project, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 lg:p-6 bg-surface-50 dark:bg-surface-900/50 rounded-xl hover:shadow-card transition-all duration-300 group">
                    <div className="flex-1 mb-3 sm:mb-0">
                      <h3 className="font-semibold text-surface-900 dark:text-white mb-1">{project.name}</h3>
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 bg-surface-200 dark:bg-surface-700 rounded-full h-2 max-w-32">
                          <div 
                            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500 group-hover:shadow-lg"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-surface-600 dark:text-surface-400">{project.progress}%</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                      <span className="text-sm text-surface-500 dark:text-surface-400">{project.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Feature Section */}
      <section className="py-8 lg:py-16 bg-gradient-to-r from-surface-100/50 to-surface-200/50 dark:from-surface-800/50 dark:to-surface-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <MainFeature />
        </div>
      </section>
    </div>
  )
}

export default Home