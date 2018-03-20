import axios from 'axios';
import { FETCH_USER } from './types';

// if retun function -> automatically 
// call this function and pass in with dispatch as argument
export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user')
    dispatch( {type: FETCH_USER, payload: res.data });    
};

export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);
    dispatch( {type: FETCH_USER, payload: res.data });    
};




// export const FetchUser = () => {
//     return function(dispatch) {
//         axios
//             .get('/api/current_user')
//             .then(dispatch( {type: FETCH_USER, payload: res }));
//     }
// }