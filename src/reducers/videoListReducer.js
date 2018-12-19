import videoListTypes from '../constants/constants';

let initialState = {
  listVideos: [],
  video: {}
};


const videoListReducer = (state = initialState, action) => {

  switch(action.type){
    case videoListTypes.FETCH_VIDEO_LIST:
      return {
        ...state, 
        listVideos: action.payLoad
      }
    case videoListTypes.SAVE_VIDEO:
      return {
        ...state,
        video: action.payLoad
      }
    default:
      return state;
  }
};

export default videoListReducer;