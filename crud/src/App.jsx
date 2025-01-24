import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Create from './Create';
import Read from './Read';
import Update from './Update';
import Home from './home';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<Create />} />
                <Route path="/read/:id" element={<Read />} />
                <Route path="/update/:id" element={<Update />} />
                
            </Routes>
        </Router>
    );
}

export default App;
