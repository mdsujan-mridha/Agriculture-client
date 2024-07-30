import axios from "axios"
import {
    ALL_VIDEO_FAIL,
    ALL_VIDEO_REQUEST,
    ALL_VIDEO_SUCCESS,
    CLEAR_ERROR,
    DELETE_VIDEO_FAIL,
    DELETE_VIDEO_REQUEST,
    DELETE_VIDEO_SUCCESS,
    NEW_VIDEO_FAIL,
    NEW_VIDEO_REQUEST,
    NEW_VIDEO_SUCCESS
} from "../constant/videoConstant"




export const getAllVideo = () => async (dispatch) => {

    try {

        dispatch({
            type: ALL_VIDEO_REQUEST
        })
        const { data } = await axios.get(`https://farming-assistant-backend.vercel.app/api/v1/videos`)
        dispatch({
            type: ALL_VIDEO_SUCCESS,
            payload: data.videos
        })

    } catch (error) {

        dispatch({

            type: ALL_VIDEO_FAIL,
            payload: error?.response?.data?.message

        })

    }

}



export const createVideo = (videoData) => async (dispatch) => {

    try {
        dispatch({ type: NEW_VIDEO_REQUEST })
        //   const config = {
        //     headers:{
        //         "Content-type":"application/json"
        //     }
        //   }
        const data = await axios.post(`https://farming-assistant-backend.vercel.app/api/v1/video/new`, videoData)
        dispatch({
            type: NEW_VIDEO_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: NEW_VIDEO_FAIL,
            payload: error.response?.data.message
        })
    }

}


// delete product by admin 
export const deleteVideo = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_VIDEO_REQUEST
        })
        const { data } = await axios.delete(`https://farming-assistant-backend.vercel.app/api/v1/delete/video/${id}`)
        dispatch({
            type: DELETE_VIDEO_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_VIDEO_FAIL,
            payload: error.response.data.message
        })
    }

}


// clear error 
export const clearErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_ERROR
    })
}
