import React, { useState, useEffect } from "react";
import axios from "axios";

import Note from "./Note";

import Header from "./Header";
import Footer from "./Footer";

import CreateArea from "./CreateArea";

function App() {
  const [notes, setState] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api")
      .then((response) => {
        //get user data
        const data = response.data;
        setState(data);

        console.log("Data has been recieved");
      })
      .catch(() => {
        alert("Error retriving data");
      });
  }, []);

  function displayNotes(notes) {

    if (!notes.length) return null;

    return notes.map((note) => (
      <div key={note.id}>
        <Note
          id={note.id}
          title={note.title}
          content={note.content}
          onDelete={deleteNote}
        />
      </div>
    ));
  }
  function addNote(newNote) {
    const payload = newNote;


    console.log("Note added successfully");
    axios({
      url: "http://localhost:8080/api/save",
      method: "POST",
      data: payload,
    })
      .then(
        setState((prevNote) => {
          return [...prevNote, payload];
        })
        
      )
      .catch(() => {
        console.log("Internal server error");
      });
  }
  function deleteNote(id) {
  
    const payload = id;

    axios
      .post("http://localhost:8080/api/delete", { id: payload })
      .then(() =>
        setState((prevNotes) => {
          return prevNotes.filter((noteItem) => {
            return noteItem.id !== id;
          });
        })
      )
      .catch((error) => {
        throw error.response.data;
      });

    setState((prevNotes) => {
      return prevNotes.filter((noteItem) => {
        return noteItem._id !== id;
      });
    });
  }
  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      <div>{displayNotes(notes)}</div>
      <Footer />
    </div>
  );
}
export default App;
