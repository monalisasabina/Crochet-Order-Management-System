"use client";
import './addOrder.css'

import { useState } from "react";

export default function AddOrderPage() {

  //States 
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    endDate: "",
    clientId: "",
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const data = await res.json();
      setPreview(data); // show preview of what was added
      setFormData({ title: "", imageUrl: "", endDate: "", clientId: "" });
    }
  };

  return (
    <div className="container">
      <h1>Add Order</h1>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Image URL</label>
        <input
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          required
        />

        <label>End Date</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
        />

        <label>Client ID</label>
        <input
          name="clientId"
          value={formData.clientId}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Order</button>
      </form>

      {preview && (
        <div className="preview">
          <h2>Order Preview</h2>
          <p><strong>Title:</strong> {preview.title}</p>
          <img src={preview.imageUrl} alt={preview.title} width="200" />
          <p><strong>End Date:</strong> {new Date(preview.endDate).toLocaleDateString()}</p>
          <p><strong>Client ID:</strong> {preview.clientId}</p>
        </div>
      )}
    </div>
  );
}