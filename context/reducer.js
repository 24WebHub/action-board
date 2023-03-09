

import {
// Interface
TOGGLE_PROJECT_FORM,
TOGGLE_TASK_FORM,
TOGGLE_IS_REGISTERED,
TOGGLE_PROJECT_EDIT,
TOGGLE_TASK_EDIT,

TOGGLE_IS_LOADING,
TOGGLE_IS_MODAL_LOADING,

//Alerts
CLEAR_ALERT,
DISPLAY_ALERT,
// Users
CREATE_USER_BEGIN,
CREATE_USER_SUCCESS,
CREATE_USER_ERROR,


LOGIN_USER_ERROR,

// GET_A_USER_BEGIN,
GET_A_USER_SUCCESS,
// GET_A_USER_ERROR,


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

GET_MY_RECENT_PROJECTS_BEGIN,
GET_MY_RECENT_PROJECTS_SUCCESS,
GET_MY_RECENT_PROJECTS_ERROR,

GET_MY_COMPLETED_PROJECTS_BEGIN,
GET_MY_COMPLETED_PROJECTS_SUCCESS,
GET_MY_COMPLETED_PROJECTS_ERROR,

GET_ACTIVE_PROJECT_TITLE,

SET_PROJECT_AS_COMPLETED_BEGIN,
SET_PROJECT_AS_COMPLETED_SUCCESS,
SET_PROJECT_AS_COMPLETED_ERROR,

DELETE_PROJECT_BEGIN,
DELETE_PROJECT_SUCCESS,
DELETE_PROJECT_ERROR,

GET_PROJECT_DETAILS_BEGIN,
GET_PROJECT_DETAILS_SUCCESS,
GET_PROJECT_DETAILS_ERROR,

EDIT_PROJECT_BEGIN,
EDIT_PROJECT_SUCCESS,
EDIT_PROJECT_ERROR,

// Tasks
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

const reducer = (state = initialState, action) => {
  switch(action.type) {
    // Interface reducer
    case TOGGLE_PROJECT_FORM: 
    return {
      ...state, isNewProject: !state.isNewProject
    }
    case TOGGLE_TASK_FORM: 
    return {
      ...state, isNewTask: !state.isNewTask
    }
    case TOGGLE_IS_REGISTERED: 
    return {
      ...state, isRegistered: !state.isRegistered
    }
    case TOGGLE_PROJECT_EDIT: 
    return {
      ...state, 
      isProjectEdit: !state.isProjectEdit,
    }
    case TOGGLE_TASK_EDIT: 
    return {
      ...state, 
      isTaskEdit: !state.isTaskEdit,
    }

    case TOGGLE_IS_LOADING: 
    return {
      ...state, isLoading: !state.isLoading
    }
    case TOGGLE_IS_MODAL_LOADING: 
    return {
      ...state, isModalLoading: !state.isModalLoading
    }

    
    
      // Alert Reducers
  case DISPLAY_ALERT:
    return {
      ...state,
      showModalAlert: true,
      alertType: 'danger',
      alertText: action.payload.alertText,
    }
    case CLEAR_ALERT: 
      return {
        ...state,
        showModalAlert: false,
        alertType: '',
        alertText: '',
      }
    //User Reducers
   case CREATE_USER_BEGIN: 
    return {
      ...state, isModalLoading: true
    }
  case CREATE_USER_SUCCESS: 
    return {
      ...state, 
      isModalLoading: false, 
      showModalAlert: true, 
      alertType: 'success',
      user: action.payload.user,
      alertText: action.payload.alertText
  }

  case CREATE_USER_ERROR: 
    return {
      ...state, 
      isModalLoading: false, 
      showModalAlert: true, 
      alertType: 'danger',
      alertText: action.payload.message
    } 
  
  case LOGIN_USER_ERROR: 
    return {
      ...state, 
      isModalLoading: false,
      showModalAlert: true, 
      alertType: 'danger',
      alertText: action.payload.message
    } 
  
  
    case GET_A_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user
      }
  

   //Project Reducers
   case CREATE_PROJECT_BEGIN: 
    return {
      ...state, isModalLoading: true
    }
  
  case CREATE_PROJECT_SUCCESS: 
    return {
      ...state, 
      isModalLoading: false, 
      showModalAlert: true, 
      alertType: 'success',
      alertText: action.payload.alertText
  }

  case CREATE_PROJECT_ERROR: 
    return {
      ...state, 
      isModalLoading: false,
      showModalAlert: true,
      alertType: 'danger',
      alertText: action.payload.message
    } 
  
  case GET_ALL_PROJECTS_BEGIN:
    return {
      ...state, isLoading: true
    }

  case GET_ALL_PROJECTS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      allProjects: action.payload.allProjects
    }
  case GET_ALL_PROJECTS_ERROR:
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.message
    }

  case GET_ALL_RECENT_PROJECTS_BEGIN:
    return {
      ...state, isLoading: true
    }

  case GET_ALL_RECENT_PROJECTS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      allRecentProjects: action.payload.allRecentProjects
    }
  case GET_ALL_RECENT_PROJECTS_ERROR:
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.message
    }

    case GET_ACTIVE_PROJECT_TITLE: {
      return {
        ...state, activeProjectTitle: action.payload.projectTitle
      }
    }

    case GET_MY_RECENT_PROJECTS_BEGIN:
      return {
        ...state, isLoading: true
      }
    case GET_MY_RECENT_PROJECTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        myRecentProjects: action.payload.myRecentProjects
      }
    case GET_MY_RECENT_PROJECTS_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.message
      }
    case GET_MY_COMPLETED_PROJECTS_BEGIN:
      return {
        ...state, isLoading: true
      }
    case GET_MY_COMPLETED_PROJECTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        myCompletedProjects: action.payload.myCompletedProjects
      }
    case GET_MY_COMPLETED_PROJECTS_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.message
      }

    case SET_PROJECT_AS_COMPLETED_BEGIN:
      return {
        ...state,
        isLoading: true
      }
    case SET_PROJECT_AS_COMPLETED_SUCCESS: 
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.message,
      myProjects: action.payload.myProjects
    }
    case SET_PROJECT_AS_COMPLETED_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.message
      }
    case DELETE_PROJECT_BEGIN:
      return {
        ...state,
        isLoading: true
      }
    case DELETE_PROJECT_SUCCESS: 
    return {
      ...state,
      isLoading: false,
      // showAlert: true,
      // alertType: 'success',
      deleteSuccess: true,
    }
    case DELETE_PROJECT_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.message
      }
      case GET_PROJECT_DETAILS_BEGIN:
        return {
          ...state, isLoading: true
        }
      case GET_PROJECT_DETAILS_SUCCESS:
        return {
          ...state,
          isLoading: false,
          projectDetails: action.payload.project
          
        }
      case GET_PROJECT_DETAILS_ERROR:
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'danger',
          alertText: action.payload.message
        }
      case EDIT_PROJECT_BEGIN:
        return {
          ...state,
          isModalLoading: true
        }
      case EDIT_PROJECT_SUCCESS: 
      return {
        ...state,
        isModalLoading: false,
        showModalAlert: true,
        alertType: 'success',
        alertText: action.payload.alertText,
      }
      case EDIT_PROJECT_ERROR:
        return {
          ...state,
          isModalLoading: false,
          showModalAlert: true,
          alertType: 'danger',
          alertText: action.payload.message
        }
    //Tasks Reducers
   case CREATE_TASK_BEGIN: 
   return {
     ...state, isModalLoading: true
   }
 case CREATE_TASK_SUCCESS: 
   return {
     ...state, 
     isModalLoading: false, 
     showModalAlert: true, 
     alertType: 'success',
     alertText: action.payload.alertText
 }
 case CREATE_TASK_ERROR: 
   return {
     ...state, 
     isModalLoading: false,
     showModalAlert: true,
     alertType: 'danger',
     alertText: action.payload.message
   }
   case GET_MY_TODO_TASKS_BEGIN:
    return {
      ...state, isLoading: true
    }
  case GET_MY_TODO_TASKS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      myTodoTasks: action.payload.myTodoTasks
    }
  case GET_MY_TODO_TASKS_ERROR:
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.message
    }

   case GET_MY_INPROGRESS_TASKS_BEGIN:
    return {
      ...state, isLoading: true
    }
  case GET_MY_INPROGRESS_TASKS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      myInprogressTasks: action.payload.myInprogressTasks
    }
  case GET_MY_INPROGRESS_TASKS_ERROR:
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.message
    }

   case GET_MY_COMPLETED_TASKS_BEGIN:
    return {
      ...state, isLoading: true
    }
  case GET_MY_COMPLETED_TASKS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      myCompletedTasks: action.payload.myCompletedTasks
    }
  case GET_MY_COMPLETED_TASKS_ERROR:
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.message
    }

    case UPDATE_TASK_STATUS_BEGIN: 
    return {
      ...state, isLoading: true
    }
    case UPDATE_TASK_STATUS_SUCCESS: 
    return {
      ...state, 
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText
    }
    case UPDATE_TASK_STATUS_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.message
      }
      case DELETE_TASK_BEGIN:
        return {
          ...state,
          isLoading: true
        }
      case DELETE_TASK_SUCCESS: 
      return {
        ...state,
        isLoading: false,
        // showAlert: true,
        // alertType: 'success',
        deleteSuccess: true,
      }
      case DELETE_TASK_ERROR:
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'danger',
          alertText: action.payload.message
        }
      
        case GET_TASK_DETAILS: 
          return {
            ...state, taskDetails: action.payload.taskDetails
          }

          case EDIT_TASK_BEGIN:
            return {
              ...state,
              isModalLoading: true
            }
          case EDIT_TASK_SUCCESS: 
          return {
            ...state,
            isModalLoading: false,
            showModalAlert: true,
            alertType: 'success',
            alertText: action.payload.alertText,
          }
          case EDIT_TASK_ERROR:
            return {
              ...state,
              isModalLoading: false,
              showModalAlert: true,
              alertType: 'danger',
              alertText: action.payload.message
            }
    default: 
      return state;
  }
}

export default reducer