'use client'

import './order.css'
import { useEffect, useState } from 'react'
import Image from 'next/image'

import OrderStatus from './orderStatus'

export default function Orders(){

    // states
    const [filter, setFilter] = useState("all")
    const [orders, setOrders] = useState([])


    // Fetch Orders from the API
    useEffect(() => {
        async function fetchOrders(){
            try {
                const response = await fetch("http://localhost:3000/api/orders",{cache: 'no-store'})

                console.log("Response from orders API:", response)   

                if(!response.ok){
                    throw new Error("Failed to fetch orders")
                }

                const orders = await response.json() 
                setOrders(orders)   
                console.log("Fetched orders:", orders)
            } catch (error) {
                console.error("Error fetching orders:", error)
            }
        }
        fetchOrders()
     }, [])

    // function to update order status locally
    // Function updates the remembered list of orders
    const updateOrderStatus  = (orderId, newStatus) =>{
        setOrders(preOrders => 
            preOrders.map(order=>
                order.id === orderId
                    ? {...order, isCompleted: newStatus}
                    :order
            )
        )
    }

  // function to delete order
    const handleDelete = async (orderId, orderTitle) => {
        // Show confirmation dialog
        const confirmed = window.confirm(
            `Are you sure you want to delete the order "${orderTitle}"? This action cannot be undone.`
        )
        
        if (!confirmed) return

        try {
            const response = await fetch(`http://localhost:3000/api/orders/${orderId}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error("Failed to delete order")
            }

            // Remove order from local state
            setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId))
            
            console.log("Order deleted successfully:", orderId)
        } catch (error) {
            console.error("Error deleting order:", error)
            alert("Failed to delete order. Please try again.")
        }
    };


    // filter orders based on completion status
    const filteredOrders = orders.filter(order => {
        if (filter === "all") return true;  
        if (filter === "completed") return order.isCompleted;
        if (filter === "in-progress") return !order.isCompleted;
        return true; // for "all" filter
    })

    // Date Format
    const formatDate = (input) => {
        if (!input) return '_';
        const date = new Date(input);
        return Number.isNaN(date.getTime())
           ?'Invalid date'
           :date.toLocaleDateString('en-KE', {
            year: 'numeric',
            month:'short',
            day:'numeric',
           });
    }


    return(
        <div className='order-cont'>
 
            {/* Header */}
            <div className='order-header'>
                <h1>Orders Page</h1>
            </div>

            {/* For debugging */}
            {/* {orders.map(order => {
                console.log('startDate:', order.startDate, typeof order.startDate);
                return(
                    <div key={order.id}>
                        {String(order.startDate)}
                    </div>
                )
              })
            } */}

            {/* Filter Completed Orders */}
            <div className='order-filter'>
                <button
                      className={filter == "all" ? 'active' : ''}
                        onClick={() => setFilter("all")}
                >
                    All Orders ({orders.length})

                </button>

                <button
                      className={filter == "in-progress" ? 'active' : ''}
                        onClick={() => setFilter("in-progress")}
                >
                    In Progress ({orders.filter(order => !order.isCompleted).length})

                </button>

                <button
                      className={filter == "completed" ? 'active' : ''}
                        onClick={() => setFilter("completed")}
                >
                    Completed ({orders.filter(order => order.isCompleted).length})

                </button>

            </div>

            {/* Order Cards */}
            <div className='order-cards'>
                {filteredOrders.map(order => (
                    <div key={order.id} className='order-card'>
                        
                        {/* Image */}
                        <Image 
                            src={order.imageUrl} 
                            alt={order.title}
                            width={200}
                            height={200}
                        />

                        {/* Order Details */}
                        <div className='order-details'>
                            <h2>{order.title}</h2>
                            <p> <strong>Client:</strong> {order.client.firstName} {order.client.lastName}</p>
                            <p><strong>Start Date:</strong> {formatDate(order.startDate)}</p>
                            <p><strong>End Date:</strong> {formatDate(order.endDate)}</p>

                            {/* status toggle */}
                             <OrderStatus 
                                        order={order} 
                                        onStatusChange={updateOrderStatus}
                            />


                            {/* Delete Button */}
                            <button 
                              className='delete-btn'
                               onClick={() => handleDelete(order.id, order.title)}
                               aria-label="Delete order"
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 6h18"></path>
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                        </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};