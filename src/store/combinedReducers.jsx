import { combineReducers } from 'redux';
import userReducer from'./users/userSlice';

const rootReducer = combineReducers({
    user: userReducer
})

export default rootReducer