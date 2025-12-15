// HOME PAGE

export default function Home() {
  return (
    <div className="home-cont" >
        {/* Header */}
        <div className="home-header">

           <h2>DASHBOARD</h2>

        </div>

        {/* Pending Orders */}
        <div  className="home-pending-orders">
          <h3>Pending orders</h3>
        </div>
        
        {/* Client list */}
        <div className="home-client-list">
          <h3>Client List</h3>

        </div>

        {/* Notification */}
        <div className="home-notifications">

              <h3>Notifications</h3>

        </div>
     
    </div>
  );
}
