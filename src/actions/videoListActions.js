import videoListTypes from '../constants/constants';

export const fetchVideoList = () => dispach => {
  const sVideoList = localStorage.getItem('videoList');
  const videoList = sVideoList ? JSON.parse(sVideoList) : [];
  return dispach({
    type: videoListTypes.FETCH_VIDEO_LIST,
    payLoad: videoList
  });
}

export const saveVideoToList = newVideo => dispach => {
  const videoList = getVideoListFromStorage();
  videoList.unshift(newVideo);
  localStorage.setItem('videoList', JSON.stringify(videoList));
  return dispach({
    type: videoListTypes.SAVE_VIDEO,
    payLoad: newVideo
  });
}

const getVideoListFromStorage = () => {
  const sVideoList = localStorage.getItem('videoList');
  return sVideoList ? JSON.parse(sVideoList) : [];
}