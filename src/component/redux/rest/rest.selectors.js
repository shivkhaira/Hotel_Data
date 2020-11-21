import {createSelector} from 'reselect'

const selectRest=state=>state.rest

export const selectCRest=createSelector(
    [selectRest],
    (rest)=>rest.rest
)