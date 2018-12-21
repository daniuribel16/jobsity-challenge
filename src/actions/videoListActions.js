import videoListTypes from '../constants/constants';

export const fetchVideoList = () => dispach => {
  const sVideoList = localStorage.getItem('videoList');
  const videoList = sVideoList ? JSON.parse(sVideoList) : [];
  return dispach({
    type: videoListTypes.SET_VIDEO_LIST,
    payLoad: videoList
  });
}

export const saveVideoToList = newVideo => dispach => {
  const videoList = getVideoListFromStorage();
  newVideo.id = new Date().valueOf();
  videoList.unshift(newVideo);
  localStorage.setItem('videoList', JSON.stringify(videoList));
  return dispach({
    type: videoListTypes.SAVE_VIDEO,
    payLoad: newVideo
  });
}

export const setOriginalVideoToList = originalVideo => dispach => {
  return dispach({
    type: videoListTypes.SET_ORIGINAL_VIDEO,
    payLoad: originalVideo
  });
};

export const playVideoFromList = video => dispach => {
  return dispach({
    type: videoListTypes.PLAY_VIDEO_FROM_LIST,
    payLoad: {...video, generated_at: new Date().valueOf() }
  });
};

export const deleteVideoFromList = video => dispach => {
  const videoList = getVideoListFromStorage();
  const newList = videoList.filter(x => x.id !== video.id);
  localStorage.setItem('videoList', JSON.stringify(newList));
  return dispach({
    type: videoListTypes.SET_VIDEO_LIST,
    payLoad: newList
  });
};

export const openEditVideo = video => dispach => {
  return dispach({
    type: videoListTypes.OPEN_EDIT_VIDEO,
    payLoad: video
  });
};

export const editVideoFromList = video => dispach => {
  const videoList = getVideoListFromStorage();
  const newList = videoList.map(x => {
    if (x.id === video.id) {
      x.name = video.name;
      x.start = video.start;
      x.end = video.end;
    }
    return x;
  });
  localStorage.setItem('videoList', JSON.stringify(newList));
  return dispach({
    type: videoListTypes.SET_VIDEO_LIST,
    payLoad: newList
  });
};

const getVideoListFromStorage = () => {
  const sVideoList = localStorage.getItem('videoList');
  return sVideoList ? JSON.parse(sVideoList) : [];
}