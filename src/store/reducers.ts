import { combineReducers } from 'redux';
import bubble from './bubble/bubble.slice';
import button from './button/button.slice';
import dashboard from './dashboard/dashboard.slice';
import editButton from './editButton/editButton.slice';
import liveChat from './liveChat/liveChat.slice';
import user from './user/user.slice';
import video from './video/video.slice';

export const reducer = combineReducers({ user, video, bubble, button, editButton, liveChat, dashboard });
