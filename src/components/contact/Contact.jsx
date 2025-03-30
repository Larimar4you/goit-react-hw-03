import React from 'react';
import s from './Contact.module.css';

const Contact = ({ id, name, number, onDelete }) => {
  return (
    <li>
      {name}: {number}
      <button onClick={() => onDelete(id)}>Delete</button>
    </li>
  );
};

export default Contact;
