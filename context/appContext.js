import React, {useContext, useReducer} from 'react';
import axios from 'axios'

import reducer from './reducer'

import {
// Interface Constants
TOGGLE_PROJECT_FORM,
TOGGLE_TASK_FORM,
TOGGLE_IS_REGISTERED,
TOGGLE_PROJECT_EDIT,
TOGGLE_TASK_EDIT,

TOGGLE_IS_LOADING,
TOGGLE_IS_MODAL_LOADING,
// Alert Constants
CLEAR_ALERT,
DISPLAY_ALERT,
// User Constants
CREATE_USER_BEGIN,
CREATE_USER_SUCCESS,
CREATE_USER_ERROR,


LOGIN_USER_ERROR,

GET_A_USER_BEGIN,
GET_A_USER_SUCCESS,
GET_A_USER_ERROR,

// Project Constants
CREATE_PROJECT_BEGIN,
CREATE_PROJECT_SUCCESS,
CREATE_PROJECT_ERROR,

GET_ALL_PROJECTS_BEGIN,
GET_ALL_PROJECTS_SUCCESS,
GET_ALL_PROJECTS_ERROR,

GET_ALL_RECENT_PROJECTS_BEGIN,
GET_ALL_RECENT_PROJECTS_SUCCESS,
GET_ALL_RECENT_PROJECTS_ERROR,

GET_ACTIVE_PROJECT_TITLE,

GET_MY_RECENT_PROJECTS_BEGIN,
GET_MY_RECENT_PROJECTS_SUCCESS,
GET_MY_RECENT_PROJECTS_ERROR,

GET_MY_COMPLETED_PROJECTS_BEGIN,
GET_MY_COMPLETED_PROJECTS_SUCCESS,
GET_MY_COMPLETED_PROJECTS_ERROR,

GET_PROJECT_DETAILS_BEGIN,
GET_PROJECT_DETAILS_SUCCESS,
GET_PROJECT_DETAILS_ERROR,

SET_PROJECT_AS_COMPLETED_BEGIN,
SET_PROJECT_AS_COMPLETED_SUCCESS,
SET_PROJECT_AS_COMPLETED_ERROR,

DELETE_PROJECT_BEGIN,
DELETE_PROJECT_SUCCESS,
DELETE_PROJECT_ERROR,

EDIT_PROJECT_BEGIN,
EDIT_PROJECT_SUCCESS,
EDIT_PROJECT_ERROR,

// Task Constants
CREATE_TASK_BEGIN,
CREATE_TASK_SUCCESS,
CREATE_TASK_ERROR,

GET_MY_TODO_TASKS_BEGIN,
GET_MY_TODO_TASKS_SUCCESS,
GET_MY_TODO_TASKS_ERROR,

GET_MY_INPROGRESS_TASKS_BEGIN,
GET_MY_INPROGRESS_TASKS_SUCCESS,
GET_MY_INPROGRESS_TASKS_ERROR,

GET_MY_COMPLETED_TASKS_BEGIN,
GET_MY_COMPLETED_TASKS_SUCCESS,
GET_MY_COMPLETED_TASKS_ERROR,

UPDATE_TASK_STATUS_BEGIN,
UPDATE_TASK_STATUS_SUCCESS,
UPDATE_TASK_STATUS_ERROR,

GET_TASK_DETAILS,

DELETE_TASK_BEGIN,
DELETE_TASK_SUCCESS,
DELETE_TASK_ERROR,

EDIT_TASK_BEGIN,
EDIT_TASK_SUCCESS,
EDIT_TASK_ERROR,


} from './actions'


const initialState = {
  // INTERFACE STATES
  isLoading: false,
  isModalLoading: false,
  isRegistered: true,
  showAlert: false,
  showModalAlert: false,
  isProjectEdit: false,
  isTaskEdit: false,
  alertText: '',
  alertType: '',
  isNewProject: false,
  isNewTask: false,
  handleIsRegistered: () => {},
  handleTask: () => {},
  displayAlert: () => {},
  clearAlert: () => {},
  toggleIsLoading: () => {},
  toggleIsModalLoading: () => {},
  handleProject: () => {},
  handleProjectEdit: () => {},
  handleTaskEdit: () => {},

    // USER STATES
    user: {},
    createUser: () => {},
    loginUserError: () => {},
    getUser: () => {},

  // PROJECT STATES,
  allProjects: [],
  allRecentProjects: [],
  myRecentProjects: [],
  myCompletedProjects: [],
  projectDetails: {},
  activeProjectTitle: '',
  getActiveProjectTitle: () => {},
  createProject: () => {},
  getMyRecentProjects: () => {},
  getMyCompletedProjects: () => {},
  getAllProjects: () => {},
  getAllRecentProjects: () => {},
  getProjectsByUser: () => {},
  setProjectAsCompleted: () => {},
  getCompletedProject: () => {},
  deleteProject: () => {},
  getProjectDetails: () => {},
  editProject: () => {},

  // TASK STATES
  myTodoTasks: [],
  myInprogressTasks: [],
  myCompletedTasks: [],
  taskDetails: {},
  createTask: () => {},
  getMyTodoTasks: () => {},
  getMyInprogressTasks: () => {},
  getMyCompletedTasks: () => {},
  updateTaskStatus: () => {},
  deleteTask: () => {},
  getTaskDetails: () => {},
  editTask: () => {},

}

const AppContext = React.createContext(initialState)

const AppContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Interface Function
  const handleProject = () => {
    dispatch({type: TOGGLE_PROJECT_FORM})
  }

  const handleTask = () => {
    dispatch({type: TOGGLE_TASK_FORM})
  }

  const handleIsRegistered = () => {
    dispatch({type: TOGGLE_IS_REGISTERED})
  }

  const handleProjectEdit = () => {
    dispatch({type: TOGGLE_PROJECT_EDIT})
  }

  const handleTaskEdit = () => {
    dispatch({type: TOGGLE_TASK_EDIT})
  }


  

  const toggleIsLoading = () => {
    dispatch({type: TOGGLE_IS_LOADING})
  }
  const toggleIsModalLoading = () => {
    dispatch({type: TOGGLE_IS_MODAL_LOADING})
  }



    // Alert Functions

    const displayAlert = (message) => {
      dispatch({type: DISPLAY_ALERT, payload: {alertText: message}})
      clearAlert()
    }
    
    const clearAlert = () => {
      setTimeout(() => {dispatch({type: CLEAR_ALERT})
    }, 2000)
    }

    // User functions
    const createUser = async (createUserUrl, newUser) => {
      dispatch({type: CREATE_USER_BEGIN})
   
      try {
        const response = await axios.post(createUserUrl, newUser)
          if(response) {
            const {data} = response
            dispatch({type: CREATE_USER_SUCCESS,
              payload: {user: data.createdUser, alertText: data.message }})
              setTimeout(() => {
                handleIsRegistered();
              }, 3000)
          }
      } catch (error) {
        console.log(error)
        dispatch({type: CREATE_USER_ERROR, payload: {message: error.response.data.message || 'Something went wrong'}})
        } 
            clearAlert()
        }

    const loginUserError = (errorMesage) => {
      dispatch({type: LOGIN_USER_ERROR, payload: {message: errorMesage}})
      clearAlert()
    }


    const getUser =  async() => {
      dispatch({type: GET_A_USER_BEGIN})
      try {
        const response = await axios.get('/api/users/user')
          const {data} = response
          dispatch({type: GET_A_USER_SUCCESS, payload: {user: data.user}})
      } catch (error) {
        dispatch({type: GET_A_USER_ERROR, payload: {message: error.response.data.message}})
        clearAlert()
      }
    }

    // Project Functions
    const createProject = async (newProject) => {
      dispatch({type: CREATE_PROJECT_BEGIN})
      try {
        const response = await axios.post('api/project', newProject)
          const {data} = response
          dispatch({type: CREATE_PROJECT_SUCCESS,
            payload: {alertText: data.message }})
            setTimeout(() => {
              handleProject();
            }, 3000)
      } catch (error) {
        dispatch({type: CREATE_PROJECT_ERROR, payload: {message: error.response.data.message }})
        } 
            clearAlert()
            getMyRecentProjects()
    }

    const getActiveProjectTitle = (projectTitle) => {
      dispatch({type:GET_ACTIVE_PROJECT_TITLE, payload: {projectTitle: projectTitle}})
      handleTask()
    }

    const getAllProjects = async () => {
      dispatch({type: GET_ALL_PROJECTS_BEGIN})
      try {
        const response = await axios.get('api/project')
          const {data} = response
          dispatch({type: GET_ALL_PROJECTS_SUCCESS, payload: {allProjects: data.allProjects}})
      } catch (error) {
        dispatch({type: GET_ALL_PROJECTS_ERROR, payload: {message: error.response.data.message}})
      }
      clearAlert()
    } 

    const getAllRecentProjects = async () => {
      dispatch({type: GET_ALL_RECENT_PROJECTS_BEGIN})
      try {
        const response = await axios.get('api/project/get-projects?status=allrecent')
          const {data} = response
          dispatch({type: GET_ALL_RECENT_PROJECTS_SUCCESS, payload: {allRecentProjects: data.allRecentProjects}})
      } catch (error) {
        dispatch({type: GET_ALL_RECENT_PROJECTS_ERROR, payload: {message: error.response.data.message}})
      }
      clearAlert()
    } 


   const getMyRecentProjects = async() => {
    dispatch({type: GET_MY_RECENT_PROJECTS_BEGIN})
    try {
      const response = await axios.get('api/project/get-projects?status=recent')
        const {data} = response
        dispatch({type: GET_MY_RECENT_PROJECTS_SUCCESS, payload: {myRecentProjects: data.recentProjects}})
    } catch (error) {
      dispatch({type: GET_MY_RECENT_PROJECTS_ERROR, payload: {message: error.response.data.message}})
    }
    clearAlert()
   }

   const getMyCompletedProjects = async() => {
    dispatch({type: GET_MY_COMPLETED_PROJECTS_BEGIN})
    try {
      const response = await axios.get('api/project/get-projects?status=completed')
        const {data} = response
        dispatch({type: GET_MY_COMPLETED_PROJECTS_SUCCESS, payload: {myCompletedProjects: data.completedProjects}})
    } catch (error) {
      dispatch({type: GET_MY_COMPLETED_PROJECTS_ERROR, payload: {message: error.response.data.message}})
    }
    clearAlert()
   }

    const setProjectAsCompleted = async(projectInfo) => {
      dispatch({type: SET_PROJECT_AS_COMPLETED_BEGIN})
      try {
        const response = await axios.patch('api/project',  projectInfo)
          const {data} = response
          dispatch({type: SET_PROJECT_AS_COMPLETED_SUCCESS, payload: { alertText: data.message }})
      } catch (error) {
        dispatch({type: SET_PROJECT_AS_COMPLETED_ERROR, payload: {message: error.response.data.message}})
      }
      clearAlert()
      getMyCompletedProjects()
      getMyRecentProjects()
    };
  
    const deleteProject = async(deleteId) => {
      dispatch({type: DELETE_PROJECT_BEGIN})
      
        try {
           const  response = await axios.delete('api/project', {params: {id: deleteId}})
          const  {data} = response
            dispatch({type: DELETE_PROJECT_SUCCESS, payload: {message: data.message}})
        } catch (error) {
          dispatch({type: DELETE_PROJECT_ERROR, payload: {message: error.response.data.message}})
        }
    
      
      clearAlert()
      getMyRecentProjects()
    }

    const getProjectDetails = async (projectId) => {
      dispatch({type: GET_PROJECT_DETAILS_BEGIN})

      try {
       const response =  await axios.get(`/api/project/${projectId}`)
        const {data} = response
        dispatch({type: GET_PROJECT_DETAILS_SUCCESS, payload: {project: data.project}})
      } catch (error) {
        console.log(error)
        dispatch({type: GET_PROJECT_DETAILS_ERROR, payload: {message: error.response.data.message}})
      }

      clearAlert()
    }

    const editProject = async (projectId, updatedProject) => {
      dispatch({type: EDIT_PROJECT_BEGIN})
      try {
        const response = await axios.put('/api/project/' + projectId, updatedProject)
        const {data} = response
          dispatch({type: EDIT_PROJECT_SUCCESS, payload: {alertText: data.message}})
          setTimeout(() => {
            handleProject();
          }, 3000)
      } catch (error) {
        dispatch({type: EDIT_PROJECT_ERROR, payload: {message: error.response.data.message}})
      }
      clearAlert()
      getProjectDetails(projectId)
    }

    // Task Functions
    const createTask = async (newTask) => {
      const {activeProjectTitle} = state
      dispatch({type: CREATE_TASK_BEGIN})
      try {
        const response = await axios.post('api/task', newTask)
          const {data} = response
          dispatch({type: CREATE_TASK_SUCCESS,
            payload: {alertText: data.message }})
            setTimeout(() => {
              handleTask();
            }, 3000)
      } catch (error) {
        dispatch({type: CREATE_TASK_ERROR, payload: {message: error.response.data.message }})
        } 
            clearAlert()
            getMyTodoTasks()
            if(activeProjectTitle.length > 0) {
              getMyRecentProjects()
            }
    }

    const getMyTodoTasks = async() => {
      dispatch({type: GET_MY_TODO_TASKS_BEGIN})
      try {
        const response = await axios.get('api/task/get-tasks?status=todo')
          const {data} = response
          dispatch({type: GET_MY_TODO_TASKS_SUCCESS, payload: {myTodoTasks: data.myTodoTasks}})
      } catch (error) {
        dispatch({type: GET_MY_TODO_TASKS_ERROR, payload: {message: error.response.data.message}})
      }
      clearAlert()
     }    
     
     const getMyInprogressTasks = async() => {
      dispatch({type: GET_MY_INPROGRESS_TASKS_BEGIN})
      try {
        const response = await axios.get('api/task/get-tasks?status=inprogress')
          const {data} = response
          dispatch({type: GET_MY_INPROGRESS_TASKS_SUCCESS, payload: {myInprogressTasks: data.myInprogressTasks}})
      } catch (error) {
        dispatch({type: GET_MY_INPROGRESS_TASKS_ERROR, payload: {message: error.response.data.message}})
      }
      clearAlert()
     }

     const getMyCompletedTasks = async() => {
      dispatch({type: GET_MY_COMPLETED_TASKS_BEGIN})
      try {
        const response = await axios.get('api/task/get-tasks?status=completed')
          const {data} = response
          console.log(data.myCompletedTasks)
          dispatch({type: GET_MY_COMPLETED_TASKS_SUCCESS, payload: {myCompletedTasks: data.myCompletedTasks}})
      } catch (error) {
        dispatch({type: GET_MY_COMPLETED_TASKS_ERROR, payload: {message: error.response.data.message}})
      }
      clearAlert()
     }

  const updateTaskStatus = async(taskInfo) => {
    console.log(taskInfo)
    dispatch({type: UPDATE_TASK_STATUS_BEGIN})
    try {
       const response =  await axios.patch('api/task', taskInfo)
        const {data} = response 
        dispatch({type: UPDATE_TASK_STATUS_SUCCESS, payload: {alertText: data.message }})
    } catch (error) {
      console.log(error)
      dispatch({type: UPDATE_TASK_STATUS_ERROR, payload: {message: error.response.data.message}})
    }
    clearAlert()

    if(taskInfo.status === 'In Progress') {
      getMyInprogressTasks()
      getMyTodoTasks()
    }
    if(taskInfo.status === 'Completed'){
      getMyCompletedTasks()
      getMyInprogressTasks()
    }
  };

  const getTaskDetails = (taskInfo) => {
    dispatch({type: GET_TASK_DETAILS, payload: {taskDetails: taskInfo}})
  }

  const deleteTask = async(deleteId, taskStatus) => {
    dispatch({type: DELETE_TASK_BEGIN})
    try {
      const response = await axios.delete('api/task', {params: {id: deleteId}})
      if (response.status === 200) {
      const  {data} = response
        dispatch({type: DELETE_TASK_SUCCESS, payload: {message: data.message}})
      } 
    } catch (error) {
      dispatch({type: DELETE_TASK_ERROR, payload: {message: error.response.data.message}})
    }
    clearAlert()
    if(taskStatus === 'todo') {
      getMyTodoTasks()
    }
    if(taskStatus === 'inprogress') {
      getMyInprogressTasks()
    }
    if(taskStatus === 'completed') {
      getMyCompletedTasks()
    }
  }

  const editTask = async (taskId, updatedTask, taskStatus) => {
    dispatch({type: EDIT_TASK_BEGIN})
    try {
      const response = await axios.put('/api/task/' + taskId, updatedTask)
      const {data} = response
        dispatch({type: EDIT_TASK_SUCCESS, payload: {alertText: data.message}})
        setTimeout(() => {
          handleTask();
        }, 3000)
    } catch (error) {
      dispatch({type: EDIT_TASK_ERROR, payload: {message: error.response.data.message}})
    }
    clearAlert()

    if(taskStatus === 'To Do') {
      getMyTodoTasks()
    }
    if(taskStatus === 'In Progresss') {
      getMyInprogressTasks()
    }
    handleTask()
  }

  return (
    <AppContext.Provider value={{...state, handleProject, handleTask, handleIsRegistered, displayAlert, clearAlert, createUser, loginUserError, toggleIsLoading, createProject, getAllProjects, setProjectAsCompleted, deleteProject, getProjectDetails, editProject, getUser, getMyRecentProjects, getMyCompletedProjects, handleProjectEdit, handleTaskEdit, createTask, updateTaskStatus, getMyTodoTasks, getMyInprogressTasks, getMyCompletedTasks, deleteTask, getAllRecentProjects, getActiveProjectTitle, getTaskDetails, editTask, toggleIsModalLoading}}>{children}</AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext (AppContext)
}

export {useAppContext, initialState, AppContextProvider}