import React, { useState } from 'react';
import axios from 'axios';

const UpdateTaskStatus = ({ taskId, currentStatus, onStatusUpdated }) => {
    const [status, setStatus] = useState(currentStatus);
    const [error, setError] = useState('');

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        try {
            await axios.put(`http://localhost:3001/api/tasks/${taskId}/status`, { status: newStatus });
            setStatus(newStatus);
            onStatusUpdated(taskId, newStatus);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Error updating status');
        }
    };

    return (
        <div>
            <select value={status} onChange={handleStatusChange}>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default UpdateTaskStatus;