import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk'
import root from './reducers';

const initialState = {};

const middleware = [thunk];

export const store = createStore(root,initialState,compose(
    applyMiddleware(...middleware)
));