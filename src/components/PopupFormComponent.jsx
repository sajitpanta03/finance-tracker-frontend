import { useState } from 'react'

export default function PopupWindow({ isOpen, onClose, fields, onSubmit }) {
  const [formValues, setFormValues] = useState({})

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormValues({
      ...formValues,
      [field]: value,
    })
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formValues)
    onClose()         
  }

  if (!isOpen) return null 

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="dark:bg-gray-800  bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="dark:text-white text-gray-800 text-xl font-bold mb-4">Popup Window</h2>
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name} className="mb-4">
              <label className="block mb-1">{field.label}</label>
              <input
                type={field.type}
                className="border p-2 w-full dark:text-gray-600 text-gray-800"
                value={formValues[field.name] || ''}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                required={field.required}
              />
            </div>
          ))}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-gray-300 text-black py-2 px-4 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
