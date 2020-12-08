
import React, { useState, useRef, useEffect } from 'react';
import './payments.style.css'
function Product({ product }) {
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const paypalRef = useRef();
  
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
            setPaidFor(true);
            console.log(order);
          },
          onError: err => {
            setError(err);
            console.error(err);
          },
        })
        .render(paypalRef.current);
    }, [product.description, product.price]);
  
    if (paidFor) {
      return (
        <div>
          <h1>Congrats, you just bought {product.name}!</h1>
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
    const product = {
      price:props.price,
      name: props.name,
      description: props.description
    };
  
    return (
      <div className="center">
        <Product product={product} />
      </div>
    );
  }
  
  export default Payment;