"use client";
import React from 'react'

const hero = () => {
    const text = 'Manage your bookmarks with ease!';
    const [displayText, setDisplayText] = React.useState('');

    React.useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            setDisplayText(text.slice(0, currentIndex + 1));
            currentIndex++;
            if (currentIndex === text.length) {
                clearInterval(interval);
            }
        }, 100);

        return () => clearInterval(interval);
    }, []);
  return (
    <div className="mb-20">
        <h1 className="text-5xl font-bold flex justify-center items-start font-serif ">
          {displayText}
          <span className="blinking-cursor max-lg:hidden">|</span>
        </h1>
    </div>
  )
}

export default hero