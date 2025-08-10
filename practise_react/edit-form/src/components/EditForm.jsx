import React, { useState } from 'react'


const App = () => {
  const [inputValue, setInputValue] = useState('')
  const [items, setItems] = useState([])
  const [editIndex, setEditIndex] = useState(null)

  const handleAddOrUpdate = () => {
    if (inputValue.trim()) {
      if (editIndex !== null) {
        // Update existing item
        const updatedItems = [...items]
        updatedItems[editIndex] = inputValue
        setItems(updatedItems)
        setEditIndex(null)
      } else {
        // Add new item
        setItems([...items, inputValue])
      }
      setInputValue('')
    }
  }

  const handleDelete = (index) => {
    setItems(items.filter((_, i) => i !== index))
    // If deleting the one we're editing, reset input
    if (editIndex === index) {
      setEditIndex(null)
      setInputValue('')
    }
  }

  const handleEditClick = (index) => {
    setEditIndex(index)
    setInputValue(items[index])
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddOrUpdate()
    }
  }

  return (
    <div className="container">
      <input
        type="text"
        className="input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Enter item..."
      />
      {/* <button className="add-btn" onClick={handleAddOrUpdate}>
        {editIndex !== null ? 'Update' : 'Add'}
      </button>

      <ul className="list">
        {items.map((item, index) => (
          <li className="list-item" key={index}>
            <span>{item}</span>
            <button className="edit-btn" onClick={() => handleEditClick(index)}>Edit</button>
            <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul> */}
    </div>
  )
}

export default App