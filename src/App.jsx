import { useState } from 'react'
import './App.css'

function App() {


  const [count, setCount] = useState(0)
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState()
  const [transaction, setTransaction] = useState([])
  const [editId, setEditId] = useState(null)
  const [salary, setSalary] = useState(0)


  const addTransaction =(e) => {
    e.preventDefault();
    if(editId){
        const newTransection = transaction.map((t) => (
          t.id === editId ? {id : editId, description, amount } : t
        ))
        setTransaction(newTransection)
        setEditId(null)
    }
    else{
      setTransaction([...transaction, {id: Date.now(), description, amount }])
     
    }
    setDescription('')
    setAmount(0)
  }

  const handleEdit = (t) => {
      setEditId(t.id)
      setDescription(t.description)
      setAmount(t.amount)
  }

  const handleDelete = (id) => {
      setTransaction(transaction.filter(t => t.id !== id))

  }


  const totalExpenses = transaction.reduce(
    (acc, curr) => acc + Number(curr.amount),
     0);



  return (
    <>
      <div className='  m-auto p-3'>

          <div className='m-auto text-blue-800 font-bold text-center text-3xl  my-5'>Expanse Tracker</div>


    {/* total expanse */}
          <div className='text-center my-15'>
              <input 
                type="number"
                placeholder="Enter your total salary"
                className="border-3 border-pink-300 border-opacity-25 shadow rounded py-2 px-4 mx-2"
                value={salary}
                onChange={e => setSalary(e.target.value)}
              />
              <div className='text-lg font-bold mt-2'>
                💰 Total Salary: ₹{salary || 0}
              </div>
            </div>
    {/* total expanse */}



            <table className='w-full bg-pink-100/40 my-15 flex flex-col items-between text-center'>
              
              <thead>
                <tr className='flex w-full justify-between'>
                <th className=' text-xl font-bold w-full px-2 py-2'>Description</th>
                <th className=' text-xl font-bold w-full px-2 py-2'>Amount</th>
                <th className=' text-xl font-bold w-full px-2 py-2'>Action</th>
                </tr>
                
              </thead>
              <tbody>
              {transaction.map((t) => (
                <tr key={t.id} className='flex w-full justify-between'>
                  <td className='w-full px-2 py-2'>{t.description}</td>
                  <td className='w-full px-2 py-2'>{t.amount}</td>
                  <td className='w-full px-2 py-2'>

                  <button type="button" onClick={e => handleEdit(t)} className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Edit </button>

                  <button type="button" onClick={e => handleDelete(t.id)} className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Delete</button>

                  </td>
                </tr>
              ))}

              </tbody>

            </table>

            <div  className='m-auto my-5 border rounded border-4 border-blue-300 border-opacity-25 ...  w-xl p-3 text-center'>

                <div className='m-auto font-bold text-center text-xl my-3'>
                    Add your expanse
                </div>

                <form onSubmit={addTransaction} className="w-sm   m-auto p-3 ">
                  
                <div className="m-auto w-l">

                  <input onChange={e => setDescription(e.target.value)} className="bg-sky-500/10 my-5 appearance-none shadow  rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"  type="text"  placeholder='Description' value={description}/>


                  <input onChange={e => setAmount(e.target.value)} className="bg-sky-500/10 shadow appearance-none   rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"  type="number"  placeholder='Amount' value={amount}/>

                  <button type="submit" className="my-5 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Add Expanse</button>

                </div>

               </form>
            </div>


                <div className="text-center text-lg font-bold my-5">
                  🧾 Total Expenses: ₹{totalExpenses} <br />
                  🟢 Remaining Balance: ₹{salary - totalExpenses}
                </div>


      </div>
    </>
  )
}

export default App
