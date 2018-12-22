import videoListTypes from '../constants/constants';

let initialState = {
  listVideos: [],
  originalVideo: {},
  newVideo: {},
  currentVideo: {},
  videoToEdit: {},
  filteredList: []
};

const videoListReducer = (state = initialState, action) => {

  switch (action.type) {
    case videoListTypes.SET_VIDEO_LIST:
      const newList = Object.keys(state.originalVideo).length !== 0 && state.originalVideo.constructor === Object ? 
        [state.originalVideo].concat(action.payLoad) :
        action.payLoad;
      return {
        ...state, 
        listVideos: newList,
        filteredList: newList,
        videoToEdit: {}
      }
    case videoListTypes.SAVE_VIDEO:
      return {
        ...state,
        newVideo: action.payLoad,
      }
    case videoListTypes.SET_ORIGINAL_VIDEO:
      return {
        ...state,
        listVideos: [action.payLoad].concat(state.listVideos),
        filteredList: [action.payLoad].concat(state.filteredList),
        originalVideo: action.payLoad,
        currentVideo: action.payLoad
      }
    case videoListTypes.PLAY_VIDEO_FROM_LIST:
      return {
        ...state,
        currentVideo: action.payLoad
      }
    case videoListTypes.OPEN_EDIT_VIDEO:
      return {
        ...state,
        videoToEdit: action.payLoad
      }
    case videoListTypes.FILTER_VIDEOS_BY_TAG:
      return {
        ...state,
        filteredList: action.payLoad
      }
    default:
      return state;
  }
};

export default videoListReducer;