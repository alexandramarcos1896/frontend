// src/pages/JournalsPage.js
import React, { useState, useEffect } from 'react';
import '../styles/Journal.css';
// import { getUserIdFromToken } from '../utils/auth';
import LogoutButton from '../components/LogoutButton';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import axios from 'axios';

const JournalsPage = () => {
  const [journals, setJournals] = useState([]);
  const [selectedJournalId, setSelectedJournalId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      axios.get('http://localhost:8000/api/notes/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => setJournals(res.data))
      .catch(err => console.error(err));
    }
    // const token = localStorage.getItem('access_token');
    // const axiosConfig = {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // };

  // axios
  //   .get('http://localhost:8000/api/notes/', {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //   .then((res) => setJournals(res.data))
  //   .catch((err) => console.error(err));
  }, []);

  const addNewNote = () => {
    // const userId = getUserIdFromToken();
    const token = localStorage.getItem('access'); // get JWT
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const newId = journals.length > 0 ? journals[journals.length - 1].id + 1 : 1;
    const newNote = {
      id: newId,
      title: `New Note`,
      content: 'Start writing your thoughts here...',
      // user: userId,
    };

    axios.post('http://localhost:8000/api/notes/', newNote, config)
      .then(res => {
        console.log("New note response:", res.data)
      if (!res.data.id) {
            console.error("No ID returned from backend.");
            return;
      }
      setJournals(prev => [...prev, res.data]);
      setSelectedJournalId(res.data.id);
      })
      .catch(err => {
        console.error("ERROR", err);
      });
  };

  const deleteNote = (id) => {
    if (!id) return;
    // const userId = getUserIdFromToken();
    const token = localStorage.getItem('access');
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .delete(`http://localhost:8000/api/notes/${id}/`, axiosConfig)
      .then(() => {
        setJournals((prev) => prev.filter((note) => note.id !== id));
        setSelectedJournalId(null);
      })
      .catch((err) => console.error(err));
  };

  const downloadAsDocx = (note) => {
    // const userId = getUserIdFromToken();

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: note.title, bold: true, size: 28 }),
              ],
            }),
            new Paragraph(note.content),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `${note.title.replace(/\s+/g, '_')}.docx`);
    });
  };

  const updateJournalContent = (id, newContent) => {
    if (!id) return;
    const token = localStorage.getItem('access');
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const updatedNote = journals.find((j) => j.id === id);
    if (!updatedNote) return;
    axios
      .put(
        `http://localhost:8000/api/notes/${id}/`,
        { ...updatedNote, content: newContent },
        axiosConfig
      )
      .then((res) => {
        setJournals(prev => prev.map(j => (j.id === id ? res.data : j)));
      })
      .catch(err => console.error("Update failed:", err));
  };

  const updateJournalTitle = (id, newTitle) => {
    if (!id) return;
    const updatedNote = journals.find((j) => j.id === id);
    if (!updatedNote) return;

    const token = localStorage.getItem('access');
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .put(
        `http://localhost:8000/api/notes/${id}/`,
        { ...updatedNote, title: newTitle },
        axiosConfig
      )
      .then((res) => {
        setJournals((prev) =>
          prev.map((j) => (j.id === id ? res.data : j))
        );
      })
      .catch(err => console.error('Update title error:', err));
  };

  const selectedJournal = journals.find((j) => j.id === selectedJournalId);
  return (
    <div className="journals-container">
      <div className="title-box">
        <h1 className="background-title">My Journal</h1>
      </div>

      <div className="top-bar-buttons">
        <button className="new-note-button" onClick={addNewNote}>
          <img src="/menu-icon/notebook-svgrepo-com.svg" alt="New Note" />
          <span>New Note</span>
        </button>
        <LogoutButton />
      </div>

      <div className="journal-grid">
        {journals.map((entry) => (
          <div
            key={entry.id}
            className="journal-box"
            onClick={() => setSelectedJournalId(entry.id)}
          >
            <h2>{entry.title}</h2>
            <p>{entry.content}</p>
          </div>
        ))}
      </div>

      {selectedJournal && (
        <>
          <div
            className="overlay"
            onClick={() => setSelectedJournalId(null)}
          ></div>
          <div className="floating-box">
            <div className="note-buttons">
              <button
                className="note-btn delete"
                onClick={() => deleteNote(selectedJournal.id)}
              >
                🗑️
              </button>
              <button
                className="note-btn download"
                onClick={() => downloadAsDocx(selectedJournal)}
              >
                📄
              </button>
            </div>
            <input
              type="text"
              value={selectedJournal.title}
              onChange={(e) =>
                updateJournalTitle(selectedJournal.id, e.target.value)
              }
              className="note-title-input"
            />
            <textarea
              value={selectedJournal.content}
              onChange={(e) =>
                updateJournalContent(selectedJournal.id, e.target.value)
              }
              className="note-textarea"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default JournalsPage;