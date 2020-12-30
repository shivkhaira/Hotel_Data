
import React, { useState, useRef, useEffect } from 'react';

import './payments.style.css'
function Product(props) {
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const paypalRef = useRef();
    const {product,makeOrder}=props

  
    useEffect(() => {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: product.description,
                  amount: {
                    currency_code: 'INR',
                    value: product.price,
                  },
                },
              ],
            
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            console.log(order);
            setPaidFor(true);
           
          },
          onError: err => {
            setError(err);
            console.error(err);
          },
        })
        .render(paypalRef.current);
    }, [product.description, product.price]);

    useEffect(()=>{
      if (paidFor)
      {
      makeOrder()
      }
       // eslint-disable-next-line
    },[paidFor])
  
    if (paidFor) {
     
      return (
        <div>
          <h1>Congrats, you just bought {product.name}! </h1>
        </div>
      );
    }
  
    return (
      <div style={{marginTop:"20%"}}>
        {error && <div>Uh oh, an error occurred! {error.message}</div>}
        <h3>
          {product.description} for ${product.price}
        </h3>
        <hr />
        <div ref={paypalRef} />
      </div>
    );
  }
  
  function Payment(props) {
    const [price]=useState(props.price)
    const [name]=useState(props.name)
    const [description]=useState(props.description)
    const product = {
      price:price,
      name: name,
      description: description
    };
    
    return (
      <div className="center">
        <Product makeOrder={props.makeOrder} product={product} />
      </div>
    );
  }
  
  export default Payment;