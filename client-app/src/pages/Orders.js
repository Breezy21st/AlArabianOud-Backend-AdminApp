

import React from 'react';
import { useLocation } from 'react-router-dom';

const Orders = () => {
  const location = useLocation();

  // Check for any status message in the URL query string
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get('status');

  return (
    <div>
      {status === 'error' && (
        <p>There was an error processing your payment. Please try again.</p>
      )}
      {/* Render the list of orders */}
    </div>
  );
};

export default Orders;
