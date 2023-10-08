import { useState } from 'react';

export function useDate() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  function formatDate(date) {
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return date.toLocaleDateString('en-IE', options);
  }
  

  const today = new Date();
  const formattedDate = formatDate(today);

  return {
    selectedDate,
    handleDateChange,
    isToday,
    formattedDate,
  };
}
