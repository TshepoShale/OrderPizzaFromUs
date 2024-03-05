import React from 'react';
import Pizza from '../components/Pizza';
import pizzas from '../pizzadata';

export default function Homescreen() {
    return (
        <div>
            <div className="row">
                {pizzas.map((pizza, index) => (
                    <div className="col-md-4" key={index}>
                        <Pizza pizza={pizza}/>
                    </div>
                ))}
            </div>
        </div>
    );
}
