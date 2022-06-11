import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: [],
    reducers: {
        createNotification(state, action) {
            state.push({
                message: action.payload.message
            })
        },
        hideNotification(state, action) {
            return state.filter((notification) => notification.id !== action.payload.id)
        }
    }
})

export const showNotification = (message, seconds) =>
    (dispatch) => {
        const id = getId()
        dispatch(createNotification({message, id}))
        const timeout = seconds * 1000
        setTimeout(() => {
            dispatch(hideNotification(id))
        }, timeout)
    }

const getId = () => (100000 * Math.random()).toFixed(0)

export const { createNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer