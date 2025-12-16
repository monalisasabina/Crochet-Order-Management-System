"use client";
import { useEffect, useState } from "react";
import "./client.css";

export default function ClientListPage() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      const res = await fetch("http://localhost:3000/api/clients");
      if (res.ok) {
        const data = await res.json();
        setClients(data);
      }
    };
    fetchClients();
  }, []);

  return (
    <div className="client-list-container">

        {/*Header  */}
        <h1>Client List</h1>

        {/* Client listing */}
        {clients.length === 0 ? (
          <p className="empty-message">No clients found.</p>
           ) : (
           <div className="client-cards">
            {clients
            .slice()
            .sort((a,b) =>{
                const nameA = a.firstName.toLowerCase()
                const nameB = b.firstName.toLowerCase()
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
            })
            .map((client) => (
               <div key={client.id} className="client-card">
                  <h2>{client.firstName} {client.lastName}</h2>
                  <p><strong>Mobile:</strong> {client.mobile}</p>
                  <p><strong>ID:</strong> {client.id}</p>
                </div>
            ))}
        </div>
      )}
    </div>
  );
}