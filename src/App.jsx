
import { useState, useEffect } from 'react'
import Header from './header.jsx'
import Note from './Note.jsx'
import CreateArea from './CreateArea.jsx'
import './App.css'

function App() {
  const [notes, setNotes] = 
  useState(() => {
    try {
    const savedNotes = 
    localStorage.getItem(`my-keep-notes`) 

    if (savedNotes !== null) {
      const parseNotes = 
    JSON.parse(savedNotes)

    if (Array.isArray(parseNotes)) {
      return parseNotes
    }
  }
} catch (error) {
  console.error(`could not load saved notes:`, error)
}
    return [
     {
      id: 1,
      title: "Shopping List",
      content: "Buy rice and milk."
    },
    {
      id: 2,
      title: "Study",
      content: "Learn React today."
    },
    {
      id: 3,
      title: "Reminder",
      content: "Call John tomorrow."
    },
    {
      id: 4,
      title: "Weekend Plans",
      content: "Practice React and build my Keep app."
    }
  ]
})

const [searchText, setSearchText] = useState("")
const [selectedLabel, setSelectedLabel] = useState("All")

const [isDarkMode, setIsDarkMode] = useState(() => {
  return
localStorage.getItem(`dark-mode`) === `true`
})


useEffect(() => {

localStorage.setItem(`my-keep-notes`, JSON.stringify(notes))
}, [notes])

useEffect(() => {
localStorage.setItem(`dark-mode`, String(isDarkMode))
}, [isDarkMode])
  

  function handleSearch(event) {
    setSearchText(event.target.value)
  }

  function addNote(newNote) {
    setNotes((previousNotes) => [
      ...previousNotes,
      newNote
    ])
  }

function editNote(id, newTitle, 
newContent) {
  setNotes((previousNotes) =>
    previousNotes.map((note) =>      
      note.id === id
        ? {...note, title:
  newTitle, content: newContent}
    :note
    )  
  )
}

function changeNoteColor(id, color)
{
  setNotes((previousNotes) =>
    previousNotes.map((note) =>
      note.id === id
        ? {...note, color: color}
        : note
    )
  )
}

function changeNoteLabel(id, label)
{
  setNotes((previousNotes) =>
    previousNotes.map((note) =>
      note.id === id
      ? {...note, label: label }
      : note
    )
  )
}

  function deleteNote(id) {
    setNotes((previousNotes) =>
      previousNotes.filter((note) => note.id !== id)
    )
  }

  function togglePin(id) {
    setNotes((previousNotes) => 
      previousNotes.map((note) =>
    note.id === id
  ? { ...note, isPinned: !
  note.isPinned} 
          : note
      )
    )
}

  function handleSearch(event) {
    setSearchText(event.target.value)
  }

  function handleSearchKeyDown(event) {
    if (event.key === `Escape`) {
      setSearchText(``)
    }
  }

  const filteredNotes = notes.filter((note) => {
    const matchesSearch = 
note.title.toLowerCase().includes(searchText.toLowerCase()) ||

  note.content.toLowerCase().includes(searchText.toLowerCase())

  const matchesLabel = selectedLabel === "All" ||

    (note.label || "Personal") === selectedLabel

    return matchesSearch && matchesLabel
  })
  
  .sort((a, b) => 
Number(Boolean(b.isPinned)) - Number(Boolean(a.isPinned))
  )

  return (
    <div className={isDarkMode ? "app dark-mode" : "app"}>
      <Header />

      <h3 className='note-count'>
        My Notes: {notes.length}
      </h3>

      <button 
      className="theme-toggle"
      onClick={() => setIsDarkMode(!
      isDarkMode)}
      >
 
    {isDarkMode ? "Switch to LightMode" : "Switch to DarkMode"}
      </button>

      <input
        className="search-box"
        type="text"
        placeholder="Search notes..."
        value={searchText}
        onChange={handleSearch}

      onKeyDown={handleSearchKeyDown}
      />

      <select 
        className="label-filter"
        value={selectedLabel}
        onChange={(event) =>
      setSelectedLabel(event.target.value)
      }
      >
        <option value="All">All Labels</option>
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
        <option value="Study">Study</option>
        <option value="Important">Important</option>
      </select>

      <CreateArea onAdd={addNote} />

      <div 
      className="notes-container">
        {filteredNotes.map((note) => (

          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            onDelete={deleteNote}
            onEdit={editNote}
            isPinned={note.isPinned}
            onPin={togglePin}
            color={note.color}
            onColorChange={changeNoteColor}
            label={note.label}
            onLabelChange={changeNoteLabel}
          />
        ))}
      </div>
    </div>
  )
}

export default App