import React, { useState } from "react";

function App() {
  const [form, setForm] = useState({ username: "", email: "", dob: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed");
      }

      setStatus("User saved!");
      setForm({ username: "", email: "", dob: "" });
    } catch (err) {
      setStatus(`Error: ${err.message}`);
    }
  };

  return (
    <div style={{
      maxWidth: 400,
      margin: "40px auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif"
    }}>
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "30px" }}>
        User Form
      </h2>

      <form onSubmit={handleSubmit} style={{ background: "#f9f9f9", padding: "25px", borderRadius: "8px" }}>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Name:
          </label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              boxSizing: "border-box"
            }}
            required
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Email:
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              boxSizing: "border-box"
            }}
            required
          />
        </div>

        <div style={{ marginBottom: "25px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Date of Birth:
          </label>
          <input
            name="dob"
            type="date"
            value={form.dob}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              boxSizing: "border-box"
            }}
            required
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          Submit
        </button>
      </form>

      {status && (
        <div style={{
          marginTop: "20px",
          padding: "12px",
          textAlign: "center",
          borderRadius: "4px",
          backgroundColor: status.includes("saved") ? "#d4edda" : "#f8d7da",
          color: status.includes("saved") ? "#155724" : "#721c24"
        }}>
          {status}
        </div>
      )}
    </div>
  );
}

export default App;
