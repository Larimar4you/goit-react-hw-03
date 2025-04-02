import { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import SearchBox from './components/SearchBox/SearchBox';
import { useFormik } from 'formik';
import { nanoid } from 'nanoid';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().min(3, 'Мінімум 3 символи').max(50, 'Максимум 50 символів').required('Обязательное поле'),
  phone: Yup.string().matches(/^\d+$/, 'Только цифры').required('Обязательное поле'),
});

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const itemContacts = window.localStorage.getItem('itemContacts');

    //   return itemContacts ? JSON.parse(itemContacts) : [];
    // });

    if (itemContacts) {
      return JSON.parse(itemContacts);
    }

    return [];
  });

  const [filter, setFilter] = useState('');
  const addContact = newContact => {
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  useEffect(() => {
    window.localStorage.setItem('itemContacts', JSON.stringify(contacts));
  }, [contacts]);

  const formik = useFormik({
    initialValues: { name: '', phone: '', id: nanoid() },
    validationSchema,
    onSubmit: (values, actions) => {
      const newContact = {
        id: nanoid(),
        name: values.name,
        number: values.phone,
      };

      setContacts(prevContacts => [...prevContacts, newContact]);
      actions.resetForm();
    },
  });

  const deleteContact = id => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
  };

  const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <SearchBox value={filter} onChange={e => setFilter(e.target.value)} />
      {filteredContacts.length > 0 ? <ContactList contacts={filteredContacts} onDelete={deleteContact} /> : <p>No contacts</p>}
      <ContactForm formik={formik} />
    </div>
  );
};

export default App;
