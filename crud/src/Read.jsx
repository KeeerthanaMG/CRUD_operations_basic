import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function Read() {
    const { id } = useParams();
    const [student, setStudent] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8081/student/${id}`)
            .then(res => setStudent(res.data))
            .catch(err => console.log(err));
    }, [id]);

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <h2>Student Details</h2>
                <p><strong>ID:</strong> {student.id}</p>
                <p><strong>Name:</strong> {student.Name}</p>
                <p><strong>Email:</strong> {student.email}</p>
                <Link to="/" className="btn btn-primary">Back to Home</Link>
            </div>
        </div>
    );
}

export default Read;
