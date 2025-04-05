import s from './App.module.css';
import { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import SearchBox from './components/SearchBox/SearchBox';
import { useFormik } from 'formik';
import { nanoid } from 'nanoid';
import * as Yup from 'yup';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const itemContacts = window.localStorage.getItem('itemContacts');

    if (itemContacts) {
      return JSON.parse(itemContacts);
    }

    return [];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('itemContacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const validationSchema = Yup.object({
    name: Yup.string().min(3, 'Min 3 characters').max(50, 'Max 50 characters').required('Name is required'),
    phone: Yup.string().matches(/^\d+$/, 'Only numbers').required('Number is required'),
  });

  const formik = useFormik({
    initialValues: { name: '', phone: '', id: nanoid() },
    validationSchema,
    onSubmit: (values, actions) => {
      const newContact = {
        id: nanoid(),
        name: values.name,
        number: values.phone,
      };
      addContact(newContact);
      actions.resetForm();
    },
  });

  const searchContacts = contacts.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()));

  const deleteContact = id => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
  };

  const handleFilterChange = value => {
    setFilter(value);
  };

  return (
    <section className={s.container}>
      <h1 className={s.title}>Phonebook</h1>

      <ContactForm formik={formik} />

      <SearchBox filter={filter} handleFilterChange={handleFilterChange} />

      {searchContacts.length > 0 ? <ContactList contacts={searchContacts} onDelete={deleteContact} /> : <p>No contacts</p>}
    </section>
  );
};

export default App;
