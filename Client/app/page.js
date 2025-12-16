"use client";
import { useEffect, useState } from "react";
import "./dashboard.css";

export default function DashboardPage() {


  const [notifications, setNotifications] = useState([]);
  const [orders, setOrders] = useState([]);
  const [clients, setClients] = useState([]);

   useEffect(() => {
    // Fetch unread notifications
    const fetchNotifications = async () => {
      const res = await fetch("http://localhost:3000/api/notifications");
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.filter(n => !n.isRead)); // only unread
      }
    };

    // Fetch orders (limit to 5 in-progress)
    const fetchOrders = async () => {
      const res = await fetch("http://localhost:3000/api/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data.filter(o => !o.isCompleted).slice(0, 5));
      }
    };

    // Fetch clients (limit to 5)
    const fetchClients = async () => {
      const res = await fetch("http://localhost:3000/api/clients");
      if (res.ok) {
        const data = await res.json();
        setClients(data.slice(0, 5));
      }
    };

     fetchNotifications();
     fetchOrders();
     fetchClients();
   
    }, []);


  // Mark notification as read when clicked
  const handleNotificationClick = async (id) => {
    
    // confirmation alert
    const confirmMarkRead = window.confirm(
      "Are you sure you want to mark this notifiaction as read?"
    );
    if(!confirmMarkRead){
      return;
    }

    await fetch(`http://localhost:3000/api/notifications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isRead: true }),
    });
    setNotifications(notifications.filter(n => n.id !== id));
  };



  return (
    <div className="dashboard-container">

      {/* Header */}
      <h1>Dashboard</h1>

      {/* Notifications */}
      <div className="notifications">
        <h2>Notifications</h2>
        {notifications.length === 0 ? (
          <p className="empty-message">No new notifications</p>
        ) : (
          <ul>
            {notifications.map((note) => (
              <li
                key={note.id}
                onClick={() => handleNotificationClick(note.id)}
                className="notification-item"
              >
                {note.message}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Orders */}
      <div className="orders">
        <h2>In Progress Orders</h2>
        {orders.length === 0 ? (
          <p className="empty-message">No in-progress orders</p>
        ) : (
          <ul>
            {orders.map((order) => (
              <li key={order.id}>
                {order.title} — started {new Date(order.startDate).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Clients */}
      <div className="clients">
        <h2>Clients</h2>
        {clients.length === 0 ? (
          <p className="empty-message">No clients yet</p>
        ) : (
          <div className="client-scroll">
            <ul>
              {clients.map((client) => (
                <li key={client.id}>
                  {client.firstName} {client.lastName} — {client.mobile}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Calendar */}
      <div className="calendar">
        <h2>Calendar</h2>
        <iframe
          src="https://calendar.google.com/calendar/embed?mode=MONTH"
          style={{ border: 0 }}
          width="100%"
          height="300"
          frameBorder="0"
          scrolling="no"
        ></iframe>
      </div>

      {/* Quick Links */}
      <div className="quick-links">
        <a href="/addClient">➕ Add Client</a>
        <a href="/addOrder">➕ Add Order</a>
        <a href="/clients">📋 Client List</a>
      </div>
    </div>
  );
}