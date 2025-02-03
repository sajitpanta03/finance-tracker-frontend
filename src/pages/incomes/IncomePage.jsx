import { useState, useEffect } from 'react'
import useApi from '@/hooks/useApi'
import UserSidebarComponent from '@/components/UserSidebarComponent.jsx'
import UserNavbarComponent from '@/components/UserNavbarComponent'
import PopupWindow from '@/components/PopupFormComponent'

export default function IncomePage() {
  const [incomes, setIncomes] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const { fetchData } = useApi(import.meta.env.VITE_API_URL)
  const [error, setError] = useState(null)

  // Popup form
  const [isPopupOpen, setPopupOpen] = useState(false)

  const fields = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'age', label: 'Age', type: 'number', required: false },
  ]

  // Function to handle submission from the popup
  const handleFormSubmit = (formData) => {
    console.log('Form Submitted with Data:', formData)
    // Perform further actions (e.g., send data to the server)
  }

  const retrieveData = async () => {
    try {
      const response = await fetchData('/api/v1/incomes')
      setIncomes(response.data.data)
    } catch (error) {
      console.error('Error fetching incomes:', error)
      setError('Failed to fetch income data.')
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
    <>
      <UserNavbarComponent />
      <div className="dark:bg-gray-700 min-h-screen flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="hidden lg:block">
          <UserSidebarComponent />
        </div>

        <div className="flex-1 p-4 lg:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
            <h1 className="text-xl lg:text-2xl font-bold dark:text-white text-gray-800">
              Income Management
            </h1>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setPopupOpen(true)}
                className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add New Income
              </button>
              <PopupWindow
                isOpen={isPopupOpen}
                onClose={() => setPopupOpen(false)}
                fields={fields}
                onSubmit={handleFormSubmit}
              />
              <input
                type="text"
                placeholder="Search by amount or source..."
                className="w-full sm:w-64 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
              role="alert"
            >
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}

          {/* Data Table */}
          <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Received
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentIncomes.length > 0 ? (
                  currentIncomes.map((income) => (
                    <tr
                      key={income.id}
                      className="hover:bg-gray-50 transition duration-200"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {income.income_source.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        ${income.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {income.description}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(income.date_received).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="flex gap-2">
                          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Edit
                          </button>
                          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No incomes found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
            <span className="text-sm text-gray-700 mb-4 sm:mb-0">
              Showing {indexOfFirstItem + 1} to{' '}
              {Math.min(indexOfLastItem, filteredIncomes.length)} of{' '}
              {filteredIncomes.length} entries
            </span>
            <div className="flex space-x-2">
              <button
                className={`px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg ${
                  currentPage === 1
                    ? 'cursor-not-allowed opacity-50'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg ${
                  currentPage === totalPages
                    ? 'cursor-not-allowed opacity-50'
                    : 'hover:bg-gray-50'
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
      </div>
    </>
  )
}
