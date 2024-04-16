import React, { useState, useEffect } from 'react';
import Customer from '../interfaces/Customer';

const CustomerDetails: React.FC<{ customer: Customer }> = ({ customer }) => {
  const [photoIndexes, setPhotoIndexes] = useState<number[]>(Array.from({ length: 9 }, (_, i) => i));

  useEffect(() => {
    const interval = setInterval(() => {
      setPhotoIndexes(prevIndexes => prevIndexes.map(index => (index + 1) % customer.photos.length));
    }, 10000);

    return () => clearInterval(interval);
  }, [customer.photos.length]);

  return (
    <div className="customer-details">
      <h1>Customer Details</h1>
      <h2>{customer.name}</h2>
      <p>{customer.title}</p>
      <p>{customer.address}</p>
      <div className="photo-grid">
        {photoIndexes.map((index, i) => (
          // eslint-disable-next-line
          <img
            key={i}
            src={customer.photos[index]}
            alt={`Photo ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomerDetails;
