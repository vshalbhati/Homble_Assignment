import React from 'react';
import { Alert } from 'react-bootstrap';

const ErrorMessage = ({ message }) => {
  return (
    <Alert variant="danger" className="mt-4">
      {message}
    </Alert>
  );
};

export default ErrorMessage;