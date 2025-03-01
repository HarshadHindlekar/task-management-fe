import React, { useState } from 'react';
import useTasks from '../hooks/useTasks';
import UpdateTaskStatus from './UpdateTaskStatus'; // Import the UpdateTaskStatus component
import '../css/TaskList.css'; // Import the CSS file

const TaskList = () => {
    const { tasks, loading, error, fetchTasks } = useTasks();
    const [filters, setFilters] = useState({
        priority: false,
        dueSoon: false,
    });

    const handleFilterChange = (e) => {
        const { name, checked } = e.target;
        setFilters({ ...filters, [name]: checked });
        fetchTasks({ [name]: checked });
    };

    const handleStatusUpdated = (taskId, newStatus) => {
        // Update the task status in the local state
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, status: newStatus } : task
        );
        // Assuming fetchTasks updates the tasks in the context or state
        fetchTasks();
    };

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">Error: {error}</p>;

    return (
        <div className="task-list-container">
            <h1>Task List</h1>
            <div className="filters">
                <label>
                    <input
                        type="checkbox"
                        name="priority"
                        checked={filters.priority}
                        onChange={handleFilterChange}
                    />
                    Show High Priority Only
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="dueSoon"
                        checked={filters.dueSoon}
                        onChange={handleFilterChange}
                    />
                    Show Tasks Due in Next 3 Days
                </label>
            </div>
            <div className="table-container">
                <table className="task-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Update Status</th> {/* New column for status update */}
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(task => (
                            <tr key={task.id}>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{new Date(task.due_date).toLocaleDateString()}</td>
                                <td>{task.status}</td>
                                <td>
                                    <span className={`priority-badge ${task.priority.toLowerCase()}`}>
                                        {task.priority}
                                    </span>
                                </td>
                                <td>
                                    <UpdateTaskStatus
                                        taskId={task.id}
                                        currentStatus={task.status}
                                        onStatusUpdated={handleStatusUpdated}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TaskList;