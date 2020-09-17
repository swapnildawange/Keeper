import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import unique_id from "unique-id-key";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    id: "123",
    title: "",
    content: "",
  });
  
  function handleChange(event) {
    const { name, value } = event.target;
    console.log();
   
    setNote((prevNote) => {
      return {
        ...prevNote,
        id: unique_id.RandomNum(10),
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);

    //reset input
    setNote({
      title: "",
      content: "",
    });
    // event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
