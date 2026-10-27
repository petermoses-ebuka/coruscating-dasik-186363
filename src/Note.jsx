import { useState } from "react"

function Note(props) {
  const [isEditing, setIsEditing] =
useState(false)
  const [editedTitle, setEditedTitle] =
useState(props.title)
  const [editedContent, setEditedContent] =
useState(props.content)
  const [noteLabel, setNoteLabel] = 
  useState(
    props.label || "Personal"
  ) 
  const noteColor = props.color || "#ffffff"


function handleSave(){
  if (editedTitle.trim() === '' ||
editedContent.trim() === '') {
  return 
}

props.onEdit(props.id, editedTitle, editedContent)
  setIsEditing(false)
}

return(
   <div 
   className="note"
   style={{backgroundColor: noteColor}}>

    {isEditing ? (
      <div>
        <input
          value={editedTitle}
          onChange={(event) =>
setEditedTitle(event.target.value)}
          placeholder="Note title"
          />

          <textarea
          value={editedContent}
          onChange={(event) =>
setEditedContent(event.target.value)
}
          placeholder="Note content"
          />

          <button 
onClick={handleSave}>Save</button>

          <button onClick={() =>
setIsEditing(false)}>
          Cancel
          </button>
      </div>
    ) : (
      <div>
        <h2>{props.title}</h2>
        <p>{props.content}</p>

  <div className="label-selector">
      <label htmlFor={`label-${props.id}`}>Label:</label>
      <select
        id={`label-${props.id}`}
        value={props.label || 
    "Personal"}
        onChange={(event) =>
        props.onLabelChange(props.id, 
        event.target.value)
        }
      >
<option value="Personal">Personal</option>
<option value="Work">Work</option>
<option value="Study">Study</option>
<option value="Important">Important</option>
        </select>
</div>

      <div className="color-options">
        <button 
          onClick={() =>
      props.onColorChange(props.id, 
      "#ffffff")}
            tittle="White"
            aria-label="White note"
            >⚪</button>

            <button 
          onClick={() =>
      props.onColorChange(props.id, 
      "#f28b82")}
            tittle="Red"
            aria-label="Red note"
            >🔴</button>

            <button 
          onClick={() =>
      props.onColorChange(props.id, 
      "#fbbc04")}
            tittle="Yellow"
            aria-label="Yellow note"
            >🟡</button>

            <button 
          onClick={() =>
      props.onColorChange(props.id, 
      "#ccff90")}
            tittle="Green"
            aria-label="Green note"
            >🟢</button> 

            <button 
          onClick={() =>
      props.onColorChange(props.id, 
      "#a7ffeb")}
            tittle="Teal"
            aria-label="Teal note"
            >🔵</button>

            <button 
          onClick={() =>
      props.onColorChange(props.id, 
      "#d7aefb")}
            tittle="Purple"
            aria-label="Purple note"
            >💜</button>
      </div>

        <button onClick={() => props.onPin(props.id)}>
        {props.isPinned ? "Unpin" : "Pin"}
        </button>

        <button onClick={() => 
      setIsEditing(true)}>Edit</button>

        <button onClick={() => {
          const confirmed = window.confirm(
            "Are you sure you want to delete this note?"
          )

          if (confirmed) { props.onDelete(props.id)
        }
        }}
        >
        Delete
        </button>
        
      </div>
     )}
    </div>
  )
}

export default Note