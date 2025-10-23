import { useEffect, useState } from 'react';

const useDate = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 60 * 1000); // update every minute

    return () => clearInterval(timer);
  }, []);

  // e.g. "Monday, May 26, 2025"
  const fullDate = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // e.g. "4:50 PM"
  const time = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  // e.g. "26/05/2025"
  const shortDate = `${String(now.getDate()).padStart(2, '0')}/${String(
    now.getMonth() + 1
  ).padStart(2, '0')}/${now.getFullYear()}`;

  return {
    fullDate,
    shortDate, // <= Add this
    time,
  };
};

export default useDate;
