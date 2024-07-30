import {
    ALL_VIDEO_FAIL,
    ALL_VIDEO_REQUEST,
    ALL_VIDEO_SUCCESS,
    CLEAR_ERROR,
    DELETE_VIDEO_FAIL,
    DELETE_VIDEO_REQUEST,
    DELETE_VIDEO_RESET,
    DELETE_VIDEO_SUCCESS,
    NEW_VIDEO_FAIL,
    NEW_VIDEO_REQUEST,
    NEW_VIDEO_RESET,
    NEW_VIDEO_SUCCESS,
} from "../constant/videoConstant";


export const videosReducer = (state = { videos: [] }, action) => {

    switch (action.type) {
        case ALL_VIDEO_REQUEST:

            return {
                loading: true,
                videos: []
            }
        case ALL_VIDEO_SUCCESS:
            return {
                loading: false,
                videos: action.payload,
            }

        case ALL_VIDEO_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }

};


export const updateVideoReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_VIDEO_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_VIDEO_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            }
        case DELETE_VIDEO_FAIL:

            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case DELETE_VIDEO_RESET:
            return {
                ...state,
                isDeleted: false,
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}

export const newVideoReducer = (state = { video: {} }, action) => {
    switch (action.type) {
        case NEW_VIDEO_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_VIDEO_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                videos: action.payload.video
            }
        case NEW_VIDEO_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case NEW_VIDEO_RESET:
            return {
                ...state,
                loading: false
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            }
        default:
            return state

    }

}