// src/pages/JournalsPage.js
import React, { useState, useEffect} from 'react';
import '../styles/Journal.css';
import LogoutButton from '../components/LogoutButton';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import axios from 'axios';

const JournalsPage = () => {

//   const initialJournals = [
//   { id: 1, title: 'Gratitude Log', content: 'Today I felt grateful for the sunshine warming my face during my morning walk...' },
//   { id: 2, title: 'Morning Reflections', content: 'Had vivid dreams about being back in college...' },
//   { id: 3, title: 'Workout Notes', content: 'Personal best today - ran 5km in 28 minutes!...' },
//   { id: 4, title: 'Microeconomics Notes', content: 'Reviewed Consumer Theory concepts...' },
//   { id: 5, title: 'Creative Writing', content: 'Started a short story about a librarian who...' },
//   { id: 6, title: 'Weekly Goals', content: '1. Finish project proposal by Wednesday\n2. Call mom...' },
//   { id: 7, title: 'Travel Ideas', content: 'Considering Portugal for next summer...' },
//   { id: 8, title: 'Book Reflections', content: 'Just finished "Atomic Habits". Key takeaway...' }
// ];

  const [journals, setJournals] = useState([]);
  const [selectedJournalId, setSelectedJournalId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/notes/')
      .then(res => setJournals(res.data))
      .catch(err => console.error(err));
  }, []);

  const addNewNote = () => {
    // const newId = journals.length > 0 ? journals[journals.length - 1].id + 1 : 1;
    const newNote = {
      // id: newId,
      title: `New Note`,
      content: 'Start writing your thoughts here...'
    };
    axios.post('http://localhost:8000/api/notes/', newNote)
      .then(res => {
        setJournals(prev => [...prev, res.data]);
        setSelectedJournalId(res.data.id);
      })
      .catch(err => {
      console.error("ERROR", err);
    });
  };

  const deleteNote = (id) => {
    axios.delete(`http://localhost:8000/api/notes/${id}/`)
      .then(() => {
        setJournals(prev => prev.filter(note => note.id !== id));
        setSelectedJournalId(null);
      });
  };

  const downloadAsDocx = (note) => {
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

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, `${note.title.replace(/\s+/g, '_')}.docx`);
    });
  };

  const selectedJournal = journals.find(j => j.id === selectedJournalId);

  const updateJournalContent = (id, newContent) => {
    const updatedNote = journals.find(j => j.id === id);
        if (!updatedNote) return;

        axios.put(`http://localhost:8000/api/notes/${id}/`, {
          ...updatedNote,
          content: newContent
        }).then(res => {
          setJournals(prev => prev.map(j => j.id === id ? res.data : j));
        });
  };

  const updateJournalTitle = (id, newTitle) => {
    const updatedNote = journals.find(j => j.id === id);
        if (!updatedNote) return;

        axios.put(`http://localhost:8000/api/notes/${id}/`, {
          ...updatedNote,
          title: newTitle
        }).then(res => {
          setJournals(prev => prev.map(j => j.id === id ? res.data : j));
        });
  };

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
          <div className="overlay" onClick={() => setSelectedJournalId(null)}></div>
          <div className="floating-box">
            <div className="note-buttons">
              <button
                className="note-btn delete"
                onClick={() => deleteNote(selectedJournal.id)}
              >🗑️</button>
              <button
                className="note-btn download"
                onClick={() => downloadAsDocx(selectedJournal)}
              >📄</button>
            </div>
              <input
                type="text"
                value={selectedJournal.title}
                onChange={(e) => updateJournalTitle(selectedJournal.id, e.target.value)}
                className="note-title-input"
              />
              <textarea
                value={selectedJournal.content}
                onChange={(e) => updateJournalContent(selectedJournal.id, e.target.value)}
                className="note-textarea"
              />
          </div>
        </>
      )}
    </div>
  );
};

export default JournalsPage;
