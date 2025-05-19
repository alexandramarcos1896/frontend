// src/pages/JournalsPage.js
import React, { useState } from 'react';
import '../styles/Journal.css';

const mockJournals = [
  { 
    id: 1, 
    title: 'Gratitude Log', 
    content: 'Today I felt grateful for the sunshine warming my face during my morning walk. Also thankful for my coworker who brought me coffee when I was feeling tired.' 
  },
  { 
    id: 2, 
    title: 'Morning Reflections', 
    content: 'Had vivid dreams about being back in college. Woke up feeling nostalgic. Need to examine why these memories are surfacing now. Maybe because of the upcoming reunion?' 
  },
  { 
    id: 3, 
    title: 'Workout Notes', 
    content: 'Personal best today - ran 5km in 28 minutes! Legs feel sore but accomplished. Remember to stretch more tomorrow. Goal for next week: add interval training.' 
  },
  { 
    id: 4, 
    title: 'Microeconomics Notes', 
    content: 'Reviewed Consumer Theory concepts: indifference curves, budget constraints, and utility maximization. Need to practice more problems with price elasticity calculations.' 
  },
  { 
    id: 5, 
    title: 'Creative Writing', 
    content: 'Started a short story about a librarian who discovers magical realism in the stacks. Opening line: "The books began whispering to Martha on a Tuesday afternoon."' 
  },
  { 
    id: 6, 
    title: 'Weekly Goals', 
    content: '1. Finish project proposal by Wednesday\n2. Call mom\n3. Try that new recipe with chickpeas\n4. Research meditation apps' 
  },
  { 
    id: 7, 
    title: 'Travel Ideas', 
    content: 'Considering Portugal for next summer - Lisbon and Porto. Need to research:\n- Best neighborhoods to stay\n- Portuguese language basics\n- Day trips to Sintra' 
  },
  { 
    id: 8, 
    title: 'Book Reflections', 
    content: 'Just finished "Atomic Habits". Key takeaway: focus on systems rather than goals. Will implement habit stacking by pairing new Spanish lessons with morning coffee.' 
  }
];

const JournalsPage = () => {

  const [selectedJournalId, setSelectedJournalId] = useState(null);

  const handleSelect = (id) => {
    setSelectedJournalId(selectedJournalId === id ? null : id); // deselect if clicked again
  };

  return (
    <div className="journals-container">
      
      <div className="title-box">
      <h1 className="background-title">My Journal</h1>
      </div>

      <nav className="top-bar-icons">
        <div className="icons-left">
          <img className="menu-icon" src="/menu-icon/delete-svgrepo-com.svg" alt="Delete" title="Delete" />
          <img className="menu-icon" src="/menu-icon/notebook-svgrepo-com.svg" alt="Create a new note" title="Create a new note" />
        </div>
        <div className="icons-right">
          <img className="menu-icon" src="/menu-icon/pencil-svgrepo-com.svg" alt="Choose a style to apply to text" title="Choose a style to apply to text" />
          <img className="menu-icon" src="/menu-icon/folder-svgrepo-com.svg" alt="Add files, media and more" title="Add files, media and more" />
        </div>
      </nav>

      <div className="journal-grid">
        {mockJournals.map((entry) => (
          <div
            key={entry.id}
            className={`journal-box ${selectedJournalId === entry.id ? 'selected' : ''}`}
            onClick={() => handleSelect(entry.id)}
          >
            <h2>{entry.title}</h2>
            <p>{entry.content}</p>
          </div>
        ))}
      </div>

      {/* Optional backdrop */}
      {selectedJournalId && <div className="overlay" onClick={() => setSelectedJournalId(null)} />}

      {/* Floating selected box
      {selectedJournalId && (
      <>
      <div className="overlay" onClick={() => setSelectedJournalId(null)} />
      <div className="floating-box">
        <h2>{mockJournals.find(j => j.id === selectedJournalId)?.title}</h2>
        <p>{mockJournals.find(j => j.id === selectedJournalId)?.content}</p>
      </div>
        </>
      )} */}
    </div>
  );
};

export default JournalsPage;