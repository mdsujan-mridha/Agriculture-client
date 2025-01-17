import axios from "axios"
import {
    ALL_ORDER_FAIL,
    ALL_ORDER_REQUEST,
    ALL_ORDER_SUCCESS,
    CLEAR_ERRORS,
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    MY_ORDER_FAIL,
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    UPDATE_ORDER_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS
} from "../constant/orderConstant"


export const createOrder = (order) => async (dispatch) => {

    try {
        dispatch({ type: CREATE_ORDER_REQUEST })

        const config = {
            headers: {
                "Content-type": "application/json",
            },
        }
        const { data } = await axios.post(`https://farming-assistant-backend.vercel.app/api/v1/order/new`, order, config)
        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({ type: CREATE_ORDER_FAIL, payload: error.response.data.message })
    }

}

// my order 
export const myOrders = () => async (dispatch) => {
    try {

        dispatch({ type: MY_ORDER_REQUEST })
        const { data } = await axios.get(`https://farming-assistant-backend.vercel.app/api/v1/orders/me`);
        dispatch({
            type: MY_ORDER_SUCCESS,
            payload: data.orders
        })

    } catch (error) {
        dispatch({
            type: MY_ORDER_FAIL,
            payload: error.response.data.message,
        })
    }
}


export const getOrderDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: ORDER_DETAILS_REQUEST })

        const { data } = await axios.get(`https://farming-assistant-backend.vercel.app/api/v1/order/${id}`)
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message,
        })
    }
}

// get all orders by admin 
export const getAllOrders = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_ORDER_REQUEST })

        const { data } = await axios.get(`https://farming-assistant-backend.vercel.app/api/v1/admin/orders`)
        dispatch({
            type: ALL_ORDER_SUCCESS,
            payload: data.orders
        })

    } catch (error) {
        dispatch({
            type: ALL_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}


// update order by admin 
export const updateOrder = (id, order) => async (dispatch) => {

    try {
        dispatch({ type: UPDATE_ORDER_REQUEST })
        const { data } = await axios.put(`https://farming-assistant-backend.vercel.app/api/v1/admin/order/${id}`, order);
        dispatch({
            type: UPDATE_ORDER_SUCCESS,
            payload: data.success,
        })
    } catch (error) {
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}
// delete order by admin 
export const deleteOrder = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_ORDER_REQUEST })
        const { data } = await axios.delete(`https://farming-assistant-backend.vercel.app/api/v1/admin/order/${id}`)

        dispatch({
            type: DELETE_ORDER_SUCCESS,
            payload: data.success,
        })

    } catch (error) {
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: error.response.data.message,
        })
    }

}
// clear error 
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}