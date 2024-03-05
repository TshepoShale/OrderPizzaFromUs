import React, { useState } from 'react';

export default function Pizza({ pizza }) {
    const [quantity, setQuantity] = useState(1);
    const [variant, setVariant] = useState('Small'); // Default value is set to 'Small'.

    return (
        <div style={{ margin: '50px' }} className='shadow-lg p-3 mb-5 bg-white rounded'>
            <h1>{pizza.name}</h1>
            <img src={pizza.image} className="img-fluid" style={{ height: '200px', width: '200px' }} alt={pizza.name} />

            <div className="flex-container">
                <div className='w-100 m-1'>
                    <p>Variants:</p>
                    <select className='form-control' value={variant} onChange={(e) => setVariant(e.target.value)}>
                        {pizza.variants.map((variant, index) => (
                            <option key={index}>{variant}</option>
                        ))}
                    </select>
                </div>

                <div className='w-100 m-1'>
                    <p>Quantity:</p>
                    <select className='form-control' value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                        {[...Array(10).keys()].map((x, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex-container">
                <div className='w-50 m-1'> {/* Adjust the width as needed */}
                    <h1>Price: {pizza.prices[variant] * quantity}</h1> {/* Calculation of total. */}
                </div>

                <div className='m-1'>
                    <button className="btn">ADD TO CART</button>
                </div>
            </div>
        </div>
    );
}
