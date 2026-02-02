import React from "react";
import { useUserForm } from "./useUserForm";
import "./App.css";

function App() {
  const { form, status, isPending, handleChange, handleSubmit } = useUserForm();

  return (
    <main className="container">
      <div className="card">
        <h2 className="title">User Registration</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <label htmlFor="username">Full Name</label>
            <input
              id="username"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              disabled={isPending}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              disabled={isPending}
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              id="dob"
              name="dob"
              type="date"
              value={form.dob}
              onChange={handleChange}
              disabled={isPending}
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={isPending}>
            {isPending ? <span className="loader"></span> : "Register"}
          </button>
        </form>

        <div
          className={`status-message ${status.type}`}
          role="alert"
          aria-live="polite"
        >
          {status.message}
        </div>
      </div>
    </main>
  );
}

export default App;