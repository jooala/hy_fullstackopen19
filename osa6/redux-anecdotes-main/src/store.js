import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

const Store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        notifications: notificationReducer
    }
})

export default Store