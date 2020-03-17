import * as constants from '../constants';
import Axios from "axios";
import {fromJS} from "immutable";

const changeList = (data) => ({
    type: constants.SEARCH_LIST,
    data: fromJS(data),
    totalPage: Math.ceil(data.length / 10)
});

export const handleInputFocus = () => ({
    type: constants.SEARCH_FOCUS
});

export const handleInputBlur = () => ({
    type: constants.SEARCH_BLUR
});

export const getSearchList = () => {
    return (dispatch) => {
        Axios.get('/api/headerList.json').then((res) => {
            const data = res.data;
            dispatch(changeList(data.data));
        }).catch(() => {
            console.log('error')
        })
    }
};

export const handleMouseEnter = () => ({
    type: constants.MOUSE_ENTER
});

export const handleMouseLeave = () => ({
    type: constants.MOUSE_LEAVE
});

export const handleChangePage = (page) => ({
    type: constants.CHANGE_PAGE,
    page
});