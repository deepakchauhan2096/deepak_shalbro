// src/components/ExpiryReminder.js
import React, { useState, useEffect } from 'react';

function ExpiryReminder(props) {
  const { expiryDate } = props;
  const [daysRemaining, setDaysRemaining] = useState(null);

  useEffect(() => {
    const today = new Date();
    const expirationDate = new Date(expiryDate);
    const timeDifference = expirationDate - today;

    if (timeDifference > 0) {
      const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24));
      setDaysRemaining(daysRemaining);
    }
  }, [expiryDate]);

  if (daysRemaining !== null) {
    return (
      <div>
        <button className="bg-warning rounded-4 text white btn">Expires in {daysRemaining} days</button>
      </div>
    );
  } else {
    return <button className="bg-danger rounded-2 text-white" title={expiryDate}>Expired <i className="fa fa-warning"></i></button>;
  }
}

export default ExpiryReminder;
