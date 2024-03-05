import React from 'react';

export default function Pizza({ pizza }) {
    return (
        <div>
            <h1>{pizza.name}</h1>
            <img src={pizza.image} className="img-fluid" style={{ height: '200px', width: '200px' }} alt={pizza.name} />
            
            <div className="flex-container"> 
                <div className='w-100'>
                    <p>Variants:</p>
                    <select>
                        {pizza.variants.map(variant => (
                            <option key={variant}>{variant}</option>
                        ))}
                    </select>
                </div>

                <div className='w-100'> 
                    <p>Quantity:</p>
                    <select> //here is the quantity section. You can only order 10 pizzas, per flavour. 
                        {[...Array(10).keys()].map((x, i) => (
                            <option key={i+1} value={i+1}>{i+1}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
