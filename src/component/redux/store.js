import {createStore,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import rootReducer from './rootreducer'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
   };
   

   const pReducer = persistReducer(persistConfig, rootReducer);


const middleware=[logger]

export const store = createStore(pReducer,applyMiddleware(...middleware));
export const persistor = persistStore(store);

//const store=createStore(rootReducer,applyMiddleware(...middleware))

export default store