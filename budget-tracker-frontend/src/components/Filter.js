import React from 'react';

function Filter({ onFilterChange }) {
    const handleFilterChange = (e) => {
        onFilterChange(e.target.name, e.target.value);
    };

    return (
        <div className="filter-container">
            <select name="month" onChange={handleFilterChange}>
                <option value="">All Months</option>
                {[...Array(12)].map((_, i) => (
                    <option key={i} value={i + 1}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
                ))}
            </select>
            <input
                type="number"
                name="year"
                placeholder="Year"
                onChange={handleFilterChange}
            />
        </div>
    );
}

export default Filter;
