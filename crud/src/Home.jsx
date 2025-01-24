import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    // Fetch all students
    useEffect(() => {
        axios.get('http://localhost:8081/')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);

    // Delete a student
    const handleDelete = (id) => {
        axios.delete(`http://localhost:8081/student/${id}`)
            .then(res => {
                alert(res.data.message);
                setData(data.filter(student => student.id !== id)); // Update the UI
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-75 bg-white rounded p-4 shadow">
                <h3 className="text-center mb-4">Student List</h3>
                <div className='d-flex justify-content-end'>
                    <Link to="/create" className='btn btn-success'>Create</Link>
                </div>
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((student) => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.Name}</td>
                                <td>{student.email}</td>
                                <td>
                                    <Link to={`/read/${student.id}`} className="btn btn-sm btn-info">Read</Link>
                                    <Link to={`/update/${student.id}`} className="btn btn-sm btn-primary mx-2">Edit</Link>
                                    <button onClick={() => handleDelete(student.id)} className="btn btn-sm btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;
