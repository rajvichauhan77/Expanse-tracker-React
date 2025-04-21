import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [transaction, setTransaction] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });
  const [editId, setEditId] = useState(null);
  const [salary, setSalary] = useState(() => {
    const saved = localStorage.getItem('salary');
    return saved ? JSON.parse(saved) : 0;
  });

  // Save to localStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transaction));
  }, [transaction]);

  // Save salary to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('salary', JSON.stringify(salary));
  }, [salary]);

  const addTransaction = (e) => {
    e.preventDefault();
    const amt = Number(amount);

    if (!description || !amount) return;

    if (editId) {
      const updatedTransactions = transaction.map((t) =>
        t.id === editId ? { id: editId, description, amount: amt } : t
      );
      setTransaction(updatedTransactions);
      setEditId(null);
    } else {
      if (amt < 0) {
        setTransaction([...transaction, { id: Date.now(), description, amount: amt }]);
      } else {
        setSalary((prev) => prev + amt);
      }
    }

    setDescription('');
    setAmount('');
  };

  const handleEdit = (t) => {
    setEditId(t.id);
    setDescription(t.description);
    setAmount(t.amount);
  };

  const handleDelete = (id) => {
    const updated = transaction.filter((t) => t.id !== id);
    setTransaction(updated);
  };

  const totalExpenses = transaction.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const balance = salary + totalExpenses;

  return (
    <div className="m-auto p-3">
      <div className="text-blue-800  font-bold text-center text-3xl my-10">Expense Tracker</div>

      {/* Salary Input */}
      <div className="text-center mb-5">
        {/* <input
          type="number"
          placeholder="Enter your total salary"
          className="border-2 border-pink-300 shadow rounded py-2 px-4 mx-2"
          value={salary}
          onChange={(e) => setSalary(Number(e.target.value))}
        /> */}
        <div className="text-lg my-10 font-bold mt-2 border-2 border-pink-300 shadow rounded py-2 px-4 mx-2">
          💰 Total Income: ₹{salary || 0}
        </div>
      </div>

      {/* Expense Table */}
      <table className="w-full bg-pink-100/40 my-5 text-center">
        <thead>
          <tr className="flex w-full justify-between font-bold text-xl">
            <th className="w-full px-2 py-2">Description</th>
            <th className="w-full px-2 py-2">Amount</th>
            <th className="w-full px-2 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {transaction.map((t) => (
            <tr key={t.id} className="flex w-full justify-between">
              <td className="w-full px-2 py-2">{t.description}</td>
              <td className="w-full px-2 py-2">{t.amount}</td>
              <td className="w-full px-2 py-2">
                
                <button
                  onClick={() => handleEdit(t)}
                  className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      {/* Add Transaction Form */}
      <div className="m-auto my-5 border-4 border-blue-300 rounded p-3 text-center max-w-xl">
        <div className="font-bold text-xl my-3">Add your expense or income</div>
        <form onSubmit={addTransaction}>
          <input
            onChange={(e) => setDescription(e.target.value)}
            className="bg-sky-500/10 my-2 appearance-none shadow rounded w-full py-2 px-4 text-gray-700"
            type="text"
            placeholder="Description"
            value={description}
          />
          <input
            onChange={(e) => setAmount(e.target.value)}
            className="bg-sky-500/10 my-5 appearance-none shadow rounded w-full py-2 px-4 text-gray-700"
            type="number"
            placeholder="Amount (use negative for expense)"
            value={amount}
          />
          <button
            type="submit"
            className="my-5 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            {editId ? 'Update' : 'Add'}
          </button>
        </form>
      </div>


      {/* Summary */}
      <div className="text-center text-lg font-bold my-5">
        💲 Total Expenses: ₹{totalExpenses} <br />
        ⭕ Remaining Balance: ₹{balance}
      </div>
    </div>
  );
}

export default App;
