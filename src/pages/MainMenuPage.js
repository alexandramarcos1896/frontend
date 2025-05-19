import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/MainMenu.css';

const MainMenuPage = () => {
  useEffect(() => {
    const svgs = document.querySelectorAll('.bg-svg');
    svgs.forEach((svg, index) => {
      setTimeout(() => {
        svg.classList.add('show');
      }, index * 100);
    });

    setTimeout(() => {
      const card = document.querySelector('.card');
      if (card) card.classList.add('visible');
    }, svgs.length * 100 + 500);
  }, []);

  return (
    <div>
      {/* Background SVGs */}
      {[...Array(12)].map((_, i) => (
        <img
          key={i}
          className={`bg-svg svg${i + 1}`}
          src={`/data/${getSvgFileName(i + 1)}`}
          alt=""
        />
      ))}

      {/* Main Content */}
      <main className="card">
        <h1>Hi, I’m Alexandra Marcos!</h1>
        <p>Welcome to my personal space on the internet.</p>
        <div className="icons">
          <Link to="/journals" className="icon personal">Personal Journey</Link>
          <a href="https://github.com/alexandramarcos1896" className="icon github">GitHub</a>
          <a href="https://twitter.com/CarolinaAle1896" className="icon x">X</a>
          <a href="https://www.instagram.com/alexandra.marcos/reels/" className="icon instagram">Instagram</a>
        </div>
      </main>
    </div>
  );
};

const getSvgFileName = (index) => {
  const filenames = [
    'music-svgrepo-com.svg',
    'anime-away-face-svgrepo-com.svg',
    'valentines-rose-svgrepo-com.svg',
    'inequality-svgrepo-com.svg',
    'books-and-people-svgrepo-com.svg',
    'cherry-svgrepo-com.svg',
    'cherry-tree-svgrepo-com-2.svg',
    'boxing-svgrepo-com.svg',
    'people-who-support-svgrepo-com.svg',
    'shortcake-svgrepo-com.svg',
    'squirrel-svgrepo-com.svg',
    'cherry-tree-svgrepo-com.svg'
  ];
  return filenames[index - 1];
};

export default MainMenuPage;