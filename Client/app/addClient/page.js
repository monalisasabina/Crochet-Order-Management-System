"use client";
import { useState } from "react";
import './addClient.css';

export default function AddClientPage() {

  //States 
  const [message, setMessage] = useState("");  
  const [preview, setPreview] = useState(null)
 

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
  });
 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const data = await res.json()
      setPreview(data);
      setMessage("Client added successfully!");
      setFormData({ firstName: "", lastName: "", mobile: "" });
    } else {
      setMessage("Error adding client.");
    }
  };

  return (
    <div className="client-container">

    {/*Header  */}
    <h1>Add Client</h1>

    {/* Client form */}
    <form className="client-form" onSubmit={handleSubmit}>

         {/* First Name */}
         <label>First Name</label>
         <input name="firstName" value={formData.firstName} onChange={handleChange} required />

        {/* Last Name */}
        <label>Last Name</label>
        <input name="lastName" value={formData.lastName} onChange={handleChange} required />

         {/* Mobile */}
        <label>Mobile</label>
        <input name="mobile" value={formData.mobile} onChange={handleChange}/>

         {/* Submit button */}
        <button type="submit">Add Client</button>
        </form>

        {/*Status*/}
        {message && <p className="client-message">{message}</p>}
      
        {/* Client Preview */}
        {preview && (
        <div className="client-preview">
            <h2>Client Preview</h2>
            <p><strong>Full Name:</strong> {preview.firstName} {preview.lastName} </p>
            <p><strong>Mobile:</strong> {preview.mobile}</p>
            <p><strong>Client ID:</strong> {preview.id}</p>

        </div>
      )}
    </div>
  );
}