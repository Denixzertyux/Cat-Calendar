import React, { useState } from 'react';
import Header from './components/Header';
import Calendar from './components/Calendar';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <Header toggleDarkMode={toggleDarkMode} isDarkMode={darkMode} />
      <main className="main-content">
        <Calendar />
      </main>
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Cat Calendar App</p>
      </footer>
    </div>
  );
}

export default App;
