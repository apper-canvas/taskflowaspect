import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 lg:w-32 lg:h-32 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center animate-float">
            <ApperIcon name="Search" className="w-12 h-12 lg:w-16 lg:h-16 text-primary" />
          </div>
          <h1 className="text-6xl lg:text-8xl font-bold text-surface-900 dark:text-white mb-4">404</h1>
          <h2 className="text-xl lg:text-2xl font-semibold text-surface-700 dark:text-surface-300 mb-4">
            Page Not Found
          </h2>
          <p className="text-surface-600 dark:text-surface-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
          >
            <ApperIcon name="Home" className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          
          <div className="pt-4">
            <p className="text-sm text-surface-500 dark:text-surface-400">
              Need help? Contact our support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound