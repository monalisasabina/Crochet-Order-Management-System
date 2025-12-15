"use client";
import './order.css'

import { useState } from "react"


export default function OrderStatus({order, onStatusChange}){ 

    const [isCompleted, setIsCompleted] = useState(order.isCompleted)

    const handleToggle =  async () => {

        // Debugging logs
        console.log("Toggle clicked");
        console.log("Current status:", isCompleted);
        console.log("Order ID:", order.id);

        // Determine the new status
        const newStatus = !isCompleted;
        console.log("New status to be set:", newStatus);

        onStatusChange(order.id, newStatus)

        // Send the PATCH request to update the order status
        try {
            const response = await fetch(`http://localhost:3000/api/orders/${order.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isCompleted: newStatus }),
            });

            if (!response.ok) {
                const  errorData = await response.json();
                console.error('Error response from server:', errorData);
                throw new Error('Failed to update order status');
            }

            setIsCompleted(newStatus);
         }
            catch (error) {
                console.error('Error updating order status:', error);
             }
    }

        
    return(
       <div className='order-status'>

            <span
                className={`status-label ${isCompleted ? 'completed' : 'in-progress'}`}
                >{isCompleted ? 'Completed' : 'In Progress'}
            </span>

            <label className='toggle'>
                    <input
                        type="checkbox"
                        checked={isCompleted}
                        onChange={handleToggle}
                    />

                    <span className='slider'/>

            </label>

        </div> 
    )
}