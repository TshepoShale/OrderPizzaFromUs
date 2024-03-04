import React from 'react'
import pizzas from '../pizzadata'
export default function Homescreen() {
    return (
        <div>
        <h1>{pizzas.length}</h1>
        </div>
    )
}