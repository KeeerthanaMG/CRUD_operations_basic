import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON payloads

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud",
});

// Get all students
app.get('/', (req, res) => {
    const sql = "SELECT * FROM student";
    db.query(sql, (err, result) => {
        if (err) return res.json({ message: "Error inside server" });
        return res.json(result);
    });
});

// Get a single student
app.get('/student/:id', (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM student WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ message: "Error inside server" });
        return res.json(result[0]);
    });
});

// Add a new student
app.post('/student', (req, res) => {
    const sql = "INSERT INTO student (`Name`, `email`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
    ];
    db.query(sql, [values], (err, result) => {
        if (err) return res.json({ success: false, error: err.message });
        return res.json({ success: true, message: "Student inserted successfully" });
    });
});

// Update a student
app.put('/student/:id', (req, res) => {
    const { id } = req.params;
    const sql = "UPDATE student SET `Name` = ?, `email` = ? WHERE id = ?";
    const values = [
        req.body.name,
        req.body.email,
    ];
    db.query(sql, [...values, id], (err, result) => {
        if (err) return res.json({ success: false, error: err.message });
        return res.json({ success: true, message: "Student updated successfully" });
    });
});

// Delete a student
app.delete('/student/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM student WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ success: false, error: err.message });
        return res.json({ success: true, message: "Student deleted successfully" });
    });
});

// Start the server
app.listen(8081, () => {
    console.log("Server is running on port 8081");
});
