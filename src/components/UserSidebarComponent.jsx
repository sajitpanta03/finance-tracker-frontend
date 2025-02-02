import { useState } from 'react'

export default function UserDashboard() {
  const [hoveredItem, setHoveredItem] = useState(null)

  const sidebarItems = [
    {
      id: 'income',
      icon: '💰',
      label: 'Income',
      subItems: [
        { label: 'Add Income', link: '/add-income' },
        { label: 'View Income', link: '/view-income' },
        { label: 'Analytics of Income', link: '/income-analytics' },
      ],
    },
    {
      id: 'expenses',
      icon: '💸',
      label: 'Expenses',
      subItems: [
        { label: 'Add Expense', link: '/add-expense' },
        { label: 'View Expenses', link: '/view-expenses' },
        { label: 'Analytics of Expenses', link: '/expenses-analytics' },
      ],
    },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-16 bg-white shadow-lg">
        <div className="flex flex-col items-center mt-4">
          {sidebarItems.map((item) => (
            <div
              key={item.id}
              className="relative py-4 cursor-pointer"
              onMouseEnter={() => setHoveredItem(item.id)}
            >
              <span className="text-2xl">{item.icon}</span>

              {hoveredItem === item.id && (
                <div
                  onMouseLeave={() => setHoveredItem(null)}
                  className="absolute left-16 top-0 ml-2 w-48 bg-white shadow-lg rounded-lg p-2"
                >
                  <h3 className="font-semibold text-gray-800">{item.label}</h3>
                  <ul className="mt-2">
                    {item.subItems.map((subItem, index) => (
                      <li
                        key={index}
                        className="py-1 text-gray-700 hover:bg-gray-100 px-2 rounded"
                      >
                        <a href={subItem.link} className="block w-full h-full">
                          {subItem.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
