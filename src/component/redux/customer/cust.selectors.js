import {createSelector} from 'reselect'

const selectCust=state=>state.customer

export const selectCustomer=createSelector(
    [selectCust],
    customer=>customer.customer
)
