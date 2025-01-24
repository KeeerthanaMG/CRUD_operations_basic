import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Create() {
    const [values, setValues] = useState({
        name: '',
        email: ''
    });

    const [notification, setNotification] = useState(null); // State for notification

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload

        if (!values.name || !values.email) {
            setNotification({ type: "error", message: "Name and Email are required!" });
            return;
        }

        axios.post('http://localhost:8081/student', values)
            .then((res) => {
                if (res.data.success) {
                    setNotification({ type: "success", message: res.data.message });
                    setValues({ name: '', email: '' }); // Clear form fields
                } else {
                    setNotification({ type: "error", message: "Error: " + res.data.error });
                }
            })
            .catch((err) => {
                setNotification({ type: "error", message: "Failed to submit data. Try again." });
            });
    };

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={handleSubmit}>
                    <h2>Add Student</h2>

                    {/* Notification Message */}
                    {notification && (
                        <div
                            className={`alert ${
                                notification.type === "success" ? "alert-success" : "alert-danger"
                            }`}
                            role="alert"
                        >
                            {notification.message}
                        </div>
                    )}

                    {/* Name Input */}
                    <div className="mb-2">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter Name"
                            className="form-control"
                            value={values.name}
                            onChange={(e) =>
                                setValues({ ...values, name: e.target.value })
                            }
                            required
                        />
                    </div>

                    {/* Email Input */}
                    <div className="mb-2">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter Email"
                            className="form-control"
                            value={values.email}
                            onChange={(e) =>
                                setValues({ ...values, email: e.target.value })
                            }
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-success">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Create;
