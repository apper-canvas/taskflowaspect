import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  projects: [
    {
      id: 1,
      name: 'Website Redesign',
      description: 'Complete redesign of the company website',
      status: 'in-progress',
      priority: 'high',
      startDate: '2024-01-15',
      endDate: '2024-03-15',
      progress: 65,
      teamMembers: ['John Doe', 'Jane Smith', 'Mike Johnson'],
      tasks: [
        { id: 1, title: 'Design mockups', completed: true, assignee: 'Jane Smith' },
        { id: 2, title: 'Frontend development', completed: false, assignee: 'John Doe' },
        { id: 3, title: 'Backend integration', completed: false, assignee: 'Mike Johnson' }
      ]
    },
    {
      id: 2,
      name: 'Mobile App Development',
      description: 'Native mobile app for iOS and Android',
      status: 'planning',
      priority: 'medium',
      startDate: '2024-02-01',
      endDate: '2024-06-01',
      progress: 15,
      teamMembers: ['Sarah Wilson', 'Tom Brown'],
      tasks: [
        { id: 4, title: 'Requirements gathering', completed: true, assignee: 'Sarah Wilson' },
        { id: 5, title: 'UI/UX design', completed: false, assignee: 'Tom Brown' }
      ]
    }
  ],
  loading: false,
  error: null,
  selectedProject: null
}

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    addProject: (state, action) => {
      const newProject = {
        ...action.payload,
        id: Date.now(),
        tasks: action.payload.tasks || [],
        progress: 0
      }
      state.projects.push(newProject)
    },
    updateProject: (state, action) => {
      const index = state.projects.findIndex(p => p.id === action.payload.id)
      if (index !== -1) {
        state.projects[index] = { ...state.projects[index], ...action.payload }
      }
    },
    deleteProject: (state, action) => {
      state.projects = state.projects.filter(p => p.id !== action.payload)
    },
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload
    },
    addTask: (state, action) => {
      const { projectId, task } = action.payload
      const project = state.projects.find(p => p.id === projectId)
      if (project) {
        project.tasks.push({ ...task, id: Date.now() })
      }
    },
    updateTask: (state, action) => {
      const { projectId, taskId, updates } = action.payload
      const project = state.projects.find(p => p.id === projectId)
      if (project) {
        const task = project.tasks.find(t => t.id === taskId)
        if (task) {
          Object.assign(task, updates)
        }
      }
    },
    deleteTask: (state, action) => {
      const { projectId, taskId } = action.payload
      const project = state.projects.find(p => p.id === projectId)
      if (project) {
        project.tasks = project.tasks.filter(t => t.id !== taskId)
      }
    }
  }
})

export const {
  setLoading,
  setError,
  addProject,
  updateProject,
  deleteProject,
  setSelectedProject,
  addTask,
  updateTask,
  deleteTask
} = projectsSlice.actions

export default projectsSlice.reducer