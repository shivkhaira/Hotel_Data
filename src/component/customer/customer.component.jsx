import React, { useState } from 'react'
import {addCust} from '../redux/customer/cust.action'
import {connect} from 'react-redux'
import Button from '../../shared/Button'
import Modal from '../../shared/Modal'
import {selectCustomer} from '../redux/customer/cust.selectors'
import {createStructuredSelector} from 'reselect'
import {useForm} from '../../shared/hooks/form-hook'
import Input from '../../shared/Input'
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../shared/validators'
import Card from '../../shared/Card'

import './customer.style.css'
import { useParams } from 'react-router'

const Customer=({selectCustomer,addCust})=>{
    const res_id=useParams().res_id
    const t_id=useParams().t_id
    const [show,setShow]=useState(false)

  
    const [formState, inputHandler] = useForm(
        {
          name: {
            value: '',
            isValid: false
          },
          contact: {
            value: '',
            isValid: false
          }
        },
        false
      );
    

    const cl=(e)=>{
        e.preventDefault()
        addCust(
            {
                name:formState.inputs.name.value,
                contact:formState.inputs.contact.value
            }
        )
    }

    const showModal=()=>{
        setShow(true)
    }

    const closeModal=()=>{
        setShow(false)
    }

  if (selectCustomer)
  {
    
return(
  
    <Card className="whole">
  <Modal
        show={show}
        onSubmit={cl}
        onCancel={closeModal}
        header="Edit Details"
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={ <React.Fragment>
            <Button type="button" inverse onClick={closeModal}>Cancel</Button>
            <Button danger onClick={closeModal}>Proceed</Button>
          </React.Fragment>}
      >
       
        <Input id="name" element="input" errorText="Valid Name" initialValue={selectCustomer.name} label="Name" onInput={inputHandler} type="text" validators={[VALIDATOR_REQUIRE()]} name="name" required /><br />
        <Input id="contact" onInput={inputHandler} errorText="Valid Number" initialValue={selectCustomer.contact} element="input" label="Contact Number" type="number" validators={[VALIDATOR_MINLENGTH(6)]} name="contact" required /><br />
       
        
      </Modal>
    <h2>Existing Details</h2>
    <hr />
    <h4>Name :{selectCustomer.name}</h4>
    <h4>Contact Number :{selectCustomer.contact}</h4>
    <div className="place-item__actions">
    <Button onClick={showModal} inverse>Edit Details</Button>
    <Button to={`/view/${res_id}/${t_id}/done`}>Continue</Button>
    </div>
    </Card>
  
)
  }

    return(
      <Card className="wholes">
     
        <h2>Enter Your Details</h2>
        <hr />
        <form className="form-control" onSubmit={cl}>
        <Input id="name" element="input" placeholder="Name" label="Name" onInput={inputHandler} type="text" validators={[VALIDATOR_REQUIRE()]} name="name" required /><br />
        <Input id="contact" onInput={inputHandler} placeholder="Contact Number" element="input" label="Contact Number" type="number" validators={[VALIDATOR_MINLENGTH(6)]} name="contact" required /><br />
        <Button type="submit" disabled={!formState.isValid}>Submit</Button>
         </form>
        </Card>
    )
}


const mapStatetoProps=()=>createStructuredSelector({
    selectCustomer:selectCustomer
  })

const maptoDispatchtoProps=dispatch=>({
    addCust:customer=>dispatch(addCust(customer))
  })
  

export default connect(mapStatetoProps,maptoDispatchtoProps)(Customer)