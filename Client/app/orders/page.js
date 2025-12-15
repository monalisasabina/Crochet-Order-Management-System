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
                            <p>Client: {order.client.firstName} {order.client.lastName}</p>
                            <p>Start Date: {formatDate(order.startDate)}</p>
                            <p>End Date: {formatDate(order.endDate)}</p>

                            {/* status toggle */}
                             <OrderStatus 
                                        order={order} 
                                        onStatusChange={updateOrderStatus}
                            />
                        </div>
                    </div>
                ))}
            </div>


        </div>
    )
}