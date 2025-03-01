import React, { useState } from 'react';
import axios from 'axios';
import '../css/TaskForm.css'; // Import the CSS file

const TaskForm = ({ onTaskAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/task', {
                title,
                description,
                due_date: dueDate,
                priority,
            });
            onTaskAdded(response.data);
            setTitle('');
            setDescription('');
            setDueDate('');
            setPriority('Medium');
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Error creating task');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <h2>Create New Task</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="form-group">
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Due Date:</label>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Priority:</label>
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
            <button type="submit" className="submit-button">Create Task</button>
        </form>
    );
};

export default TaskForm;