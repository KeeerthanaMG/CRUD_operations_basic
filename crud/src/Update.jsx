import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function Update() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: '',
        email: ''
    });

    // Fetch student details
    useEffect(() => {
        axios.get(`http://localhost:8081/student/${id}`)
            .then(res => setValues({
                name: res.data.Name,
                email: res.data.email,
            }))
            .catch(err => console.log(err));
    }, [id]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8081/student/${id}`, values)
            .then(res => {
                alert(res.data.message);
                navigate('/'); // Redirect to Home
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={handleSubmit}>
                    <h2>Edit Student</h2>
                    <div className="mb-2">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={values.name}
                            onChange={(e) => setValues({ ...values, name: e.target.value })}
                        />
                    </div>
                    <div className="mb-2">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={values.email}
                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                        />
                    </div>
                    <button className="btn btn-success">Update</button>
                </form>
            </div>
        </div>
    );
}

export default Update;
