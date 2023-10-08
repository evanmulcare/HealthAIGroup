import React from 'react';
import Calendar from 'react-calendar';
import { useDate } from '../Hooks/useDate';

const Calender = () => {
    const { selectedDate, handleDateChange, isToday } = useDate();
    
  return (
    <div className='w-full rounded-lg shadow-md p-4 border border-gray-300 bg-white'>
            <div className='w-full'>
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                view='month'
                showNeighboringMonth={false}
                tileContent={({ date, view }) => {
                  if (view === 'month' && isToday(date)) {
                    return (
                      <div className='bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto'>
                        {date.getDate()}
                      </div>
                    );
                  }
                }}
              />
            </div>

          </div>
  )
}

export default Calender