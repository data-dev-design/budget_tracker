import React, { useState } from 'react';
import axios from 'axios';

function BudgetEntryForm({ onEntryAdded }) {
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [transactionType, setTransactionType] = useState('IN');
    const [description, setDescription] = useState('');
    const [isRecurring, setIsRecurring] = useState(false);
    const [recurringFrequency, setRecurringFrequency] = useState('NONE');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/entries/', {
                amount: parseFloat(amount),
                date: isRecurring ? null : date,
                transaction_type: transactionType,
                description,
                is_recurring: isRecurring,
                recurring_frequency: isRecurring ? recurringFrequency : 'NONE',
            });
            onEntryAdded(response.data);

            // Reset form fields
            setAmount('');
            setDate('');
            setTransactionType('IN');
            setDescription('');
            setIsRecurring(false);
            setRecurringFrequency('NONE');
        } catch (error) {
            console.error('Error adding entry:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                required
            />
            {!isRecurring && (
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required={!isRecurring}
                />
            )}
            <select value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
                <option value="IN">Income</option>
                <option value="OUT">Expense</option>
            </select>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
            />
            <div className="recurring-section">
                <label>
                    <input
                        type="checkbox"
                        checked={isRecurring}
                        onChange={() => setIsRecurring(!isRecurring)}
                    />
                    Recurring Entry
                </label>
                {isRecurring && (
                    <select value={recurringFrequency} onChange={(e) => setRecurringFrequency(e.target.value)}>
                        <option value="DAILY">Daily</option>
                        <option value="WEEKLY">Weekly</option>
                        <option value="MONTHLY">Monthly</option>
                        <option value="YEARLY">Yearly</option>
                    </select>
                )}
            </div>
            <button type="submit">Add Entry</button>
        </form>
    );
}

export default BudgetEntryForm;
