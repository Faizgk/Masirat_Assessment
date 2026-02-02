import { useState } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
const REQUEST_TIMEOUT = 8000; // 8 seconds timeout

export const useUserForm = () => {
    const [form, setForm] = useState({ username: "", email: "", dob: "" });
    const [status, setStatus] = useState({ type: "", message: "" });
    const [isPending, setIsPending] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        if (form.username.length < 3) return "Name must be at least 3 characters.";
        const birthYear = new Date(form.dob).getFullYear();
        if (birthYear > new Date().getFullYear() - 13) return "Users must be at least 13 years old.";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validateForm();
        if (validationError) {
            setStatus({ type: "error", message: validationError });
            return;
        }

        setIsPending(true);
        setStatus({ type: "info", message: "Submitting..." });

        // Handle Timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

        try {
            const res = await fetch(`${API_URL}/api/users`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
                signal: controller.signal
            });

            clearTimeout(timeoutId);
            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Server error");

            setStatus({ type: "success", message: "User saved successfully!" });
            setForm({ username: "", email: "", dob: "" });

            //clear success message after 5 seconds
            setTimeout(() => setStatus({ type: "", message: "" }), 5000);
        } catch (err) {
            const msg = err.name === "AbortError" ? "Request timed out. Try again." : err.message;
            setStatus({ type: "error", message: msg });
        } finally {
            setIsPending(false);
        }
    };

    return { form, status, isPending, handleChange, handleSubmit };
};