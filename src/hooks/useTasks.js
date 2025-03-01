import { useState, useEffect } from 'react';
import axios from 'axios';

const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTasks = async (filters = {}) => {
        try {
            const response = await axios.get('http://localhost:3001/api/tasks', { params: filters });
            setTasks(response.data);
        } catch (err) {
            // setError(err.message);
            console.log(err. message);
            setTasks([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return { tasks, loading, error, fetchTasks };
};

export default useTasks;