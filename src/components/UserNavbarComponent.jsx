import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sun, Moon } from 'lucide-react'

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(() => {
    const storedMode = localStorage.getItem('darkMode')
    return storedMode ? JSON.parse(storedMode) : false
  })

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem('darkMode', JSON.stringify(newMode))
  }

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <nav className='bg-white dark:bg-gray-800 shadow-md'>
      <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
        <Link to='/' className='text-gray-800 dark:text-white text-xl font-bold'>
          Home
        </Link>

        <button
          onClick={toggleDarkMode}
          className='bg-gray-200 dark:bg-gray-600 p-2 rounded-lg flex items-center justify-center'
        >
          {darkMode ? (
            <Sun className='text-yellow-500 w-6 h-6' />
          ) : (
            <Moon className='text-gray-700 w-6 h-6' />
          )}
        </button>
      </div>
    </nav>
  )
}
