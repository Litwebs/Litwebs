import {
  SET_CONTENT,
  SET_PROJECTS,
  SET_BASKET,
  SET_TOTAL,
  SET_ALERTS,
  SET_PROJECT,
} from "../TYPES";
const AlertReducer = (state, action) => {
  switch (action.type) {
    default:
      return { ...state };

    case SET_CONTENT: {
      return {
        ...state,
        Content: action.payload,
      };
    }
    case SET_PROJECTS: {
      return {
        ...state,
        Projects: action.payload,
      };
    }
    case SET_BASKET: {
      return {
        ...state,
        Basket: action.payload,
      };
    }
    case SET_TOTAL: {
      return {
        ...state,
        Total: action.payload,
      };
    }
    case SET_ALERTS: {
      return {
        ...state,
        Alerts: action.payload,
      };
    }
    case SET_PROJECT: {
      return {
        ...state,
        SelectedProject: action.payload,
      };
    }
  }
};
export default AlertReducer;
