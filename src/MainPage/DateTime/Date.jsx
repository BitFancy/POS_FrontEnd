import React, { useState, useEffect } from 'react';

const TimeDate = () => {
  const [currentDayOfWeek, setCurrentDayOfWeek] = useState('');

  useEffect(() => {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDayOfWeek(date.toLocaleString('en-US', options));
  }, []);

  return (
    <div>
      <p>{currentDayOfWeek}</p>
    </div>
  );
};

export default TimeDate;