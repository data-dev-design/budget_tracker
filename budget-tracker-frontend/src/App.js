import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BudgetEntryForm from './components/BudgetEntryForm';
import TimelineGraph from './components/TimelineGraph';
import Filter from './components/Filter';
import './App.css';

function App() {
    const [entries, setEntries] = useState([]);
    const [filters, setFilters] = useState({ month: '', year: '' });

    const fetchEntries = async () => {
        try {
            const params = new URLSearchParams();
            if (filters.month) params.append('month', filters.month);
            if (filters.year) params.append('year', filters.year);

            const response = await axios.get(`/api/entries/?${params.toString()}`);
            setEntries(response.data);
        } catch (error) {
            console.error('Error fetching entries:', error);
        }
    };

    useEffect(() => {
        fetchEntries();
    }, [filters]);

    const handleEntryAdded = (newEntry) => {
        setEntries((prevEntries) => [...prevEntries, newEntry]);
    };

    const handleDeleteEntry = async (id) => {
        try {
            await axios.delete(`/api/entries/${id}/`);
            setEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== id));
        } catch (error) {
            console.error('Error deleting entry:', error);
        }
    };

    const handleMakeRecurring = async (id) => {
        const months = prompt("Enter the number of months to repeat:");
        if (!months || isNaN(months) || months <= 0) {
            alert("Invalid number of months");
            return;
        }

        try {
            const response = await axios.post(`/api/entries/${id}/make_recurring/`, { months: parseInt(months) });
            setEntries((prevEntries) => [...prevEntries, ...response.data]);
        } catch (error) {
            console.error('Error making entry recurring:', error);
        }
    };

    const handleFilterChange = (name, value) => {
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };

    return (
        <div className="container">
            {/* Filters and Input Form */}
            <div className="form-container">
                <Filter onFilterChange={handleFilterChange} />
                <BudgetEntryForm onEntryAdded={handleEntryAdded} />
            </div>

            {/* Entries List */}
            <div className="entries-list-container">
                <h3>Entries</h3>
                <ul className="entries-list">
                    {entries.map((entry) => (
                        <li key={entry.id}>
                            <span>
                                {entry.date} - {entry.transaction_type === 'IN' ? '+' : '-'}${entry.amount}
                                {entry.description && ` - ${entry.description}`}
                            </span>
                            <button onClick={() => handleDeleteEntry(entry.id)}>Delete</button>
                            <button onClick={() => handleMakeRecurring(entry.id)}>Recurring</button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Timeline Graph */}
            <div className="graph-container">
                <TimelineGraph entries={entries} />
            </div>
        </div>
    );
}

export default App;
