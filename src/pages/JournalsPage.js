// src/pages/JournalsPage.js
import React, { useState } from 'react';
import '../styles/Journal.css';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';

const JournalsPage = () => {

  const initialJournals = [
  { id: 1, title: 'Gratitude Log', content: 'Today I felt grateful for the sunshine warming my face during my morning walk...' },
  { id: 2, title: 'Morning Reflections', content: 'Had vivid dreams about being back in college...' },
  { id: 3, title: 'Workout Notes', content: 'Personal best today - ran 5km in 28 minutes!...' },
  { id: 4, title: 'Microeconomics Notes', content: 'Reviewed Consumer Theory concepts...' },
  { id: 5, title: 'Creative Writing', content: 'Started a short story about a librarian who...' },
  { id: 6, title: 'Weekly Goals', content: '1. Finish project proposal by Wednesday\n2. Call mom...' },
  { id: 7, title: 'Travel Ideas', content: 'Considering Portugal for next summer...' },
  { id: 8, title: 'Book Reflections', content: 'Just finished "Atomic Habits". Key takeaway...' }
];

  const [journals, setJournals] = useState(initialJournals);
  const [selectedJournalId, setSelectedJournalId] = useState(null);

  const addNewNote = () => {
    const newId = journals.length > 0 ? journals[journals.length - 1].id + 1 : 1;
    const newNote = {
      id: newId,
      title: `New Note ${newId}`,
      content: 'Start writing your thoughts here...'
    };
    setJournals(prev => [...prev, newNote]);
    setSelectedJournalId(newId);
  };

  const deleteNote = (id) => {
    setJournals(journals.filter(j => j.id !== id));
    setSelectedJournalId(null);
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
    setJournals(prev =>
      prev.map(journal =>
        journal.id === id ? { ...journal, content: newContent } : journal
      )
    );
  };

  const updateJournalTitle = (id, newTitle) => {
    setJournals(prev =>
      prev.map(journal =>
        journal.id === id ? { ...journal, title: newTitle } : journal
      )
    );
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
