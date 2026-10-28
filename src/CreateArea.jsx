import { useState } from 'react'

function CreateArea(props) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  function handleAdd(event) {
    event.preventDefault()

    if (title.trim() === "" || content.trim() === "") {
      return
    }
    const newNote = {
      id: Date.now(),
      title: title,
      content: content
    }

    props.onAdd(newNote)

    setTitle("")
    setContent("")
  }

  return (
    <form className="create-area" onSubmit={handleAdd}>
      <input
        placeholder="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <textarea
        placeholder="Take a note..."
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />

      <button onClick={handleAdd}>Add</button>
    </form>
  )
}

export default CreateArea