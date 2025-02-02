import { useState, useEffect } from 'react'
import useApi from '@/hooks/useApi'
import UserSidebarComponent from '@/components/UserSidebarComponent.jsx'

export default function ViewIncomePage() {
  const [incomes, setIncomes] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5) // Set items per page for pagination
  const { fetchData } = useApi(import.meta.env.VITE_API_URL)

  const retrieveData = async () => {
    try {
      const response = await fetchData('/api/v1/incomes')
      setIncomes(response.data.data)
    } catch (error) {
      console.error('Error fetching incomes:', error)
    }
  }

  useEffect(() => {
    retrieveData()
  }, [])

  // Search handler
  const filteredIncomes = incomes.filter(
    (income) =>
      income.income_source.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      income.amount.toString().includes(searchTerm)
  )

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentIncomes = filteredIncomes.slice(
    indexOfFirstItem,
    indexOfLastItem
  )

  const totalPages = Math.ceil(filteredIncomes.length / itemsPerPage)

  return (
    <div className="flex min-h-screen bg-gray-100">
      <UserSidebarComponent />

      <div className="flex-1 p-8 bg-gray-50">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
          Incomes
        </h1>

        <div className="mb-4 flex justify-center">
          <input
            type="text"
            placeholder="Search by amount or source name..."
            className="w-full max-w-lg p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          {currentIncomes.length > 0 ? (
            <ul className="space-y-4">
              {currentIncomes.map((income) => (
                <li
                  key={income.id}
                  className="flex justify-between bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  <span className="font-medium text-gray-700">
                    Amount: ${income.amount}
                  </span>
                  <span className="font-medium text-gray-700">
                    Source: {income.income_source.name}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-600">No incomes found.</p>
          )}
        </div>

        <div className="mt-6 flex justify-center items-center space-x-2">
          <button
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 text-white'
            }`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 text-white'
            }`}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
