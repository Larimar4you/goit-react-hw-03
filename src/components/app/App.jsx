import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import s from './App.module.css';
import ContactForm from '../contactForm/ContactForm';
import SearchBox from '../searchBox/SearchBox';
import ContactList from '../contactList/ContactList';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(localStorage.getItem('contacts')) || [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });
  const [filter, setFilter] = useState('');

  // Сохраняет контакты в localStorage при их изменении, чтобы данные сохранялись между перезагрузками.
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // Добавляет новый контакт, проверяя дубликаты по имени. Генерирует уникальный id с помощью nanoid.
  const addContact = (values, { resetForm }) => {
    const newContact = { id: nanoid(), ...values };
    setContacts(prev => [...prev, newContact]);
    resetForm();
  };

  // Удаляет контакт из списка по его id.
  const removeContactById = id => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };
  // const deleteContact = id => {
  //   setContacts(prev => prev.filter(contact => contact.id !== id));
  // };

  // Фильтрует контакты по имени, игнорируя регистр.
  const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <SearchBox filter={filter} onChange={setFilter} />
      <ContactList contacts={filteredContacts} onDelete={deleteContact} />
    </div>
  );
}

// Форма для добавления контактов. Использует Formik и Yup для управления вводом и валидации.
function ContactForm({ onSubmit }) {
  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={Yup.object({
        name: Yup.string().min(3).max(50).required('Required'),
        number: Yup.string().required('Required'),
      })}
      onSubmit={onSubmit}
    >
      <Form>
        <label>
          Name <Field name='name' /> <ErrorMessage name='name' />
        </label>
        <label>
          Number <Field name='number' /> <ErrorMessage name='number' />
        </label>
        <button type='submit'>Add Contact</button>
      </Form>
    </Formik>
  );
}

// создает поле ввода для поиска по контактам
function SearchBox({ filter, onChange }) {
  return <input type='text' placeholder='Search contacts' value={filter} onChange={e => onChange(e.target.value)} />;
}

// рендерит список контактов
function ContactList({ contacts, onDelete }) {
  return (
    <ul>
      {contacts.map(({ id, name, number }) => (
        <li key={id}>
          {name}: {number}
          <button onClick={() => onDelete(id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
