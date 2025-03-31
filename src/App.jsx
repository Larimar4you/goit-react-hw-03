import { useState, useEffect } from 'react';
import initialContacts from './components/Contact/Contact.json';
import ContactForm from './components/contactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import { useFormik } from 'formik';
import { nanoid } from 'nanoid';
import * as Yup from 'yup';

const App = () => {
  // const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => {
    const itemContacts = window.localStorage.getItem('itemContacts');

    if (itemContacts) {
      return JSON.parse(itemContacts);
    }

    return [];
  });

  const formik = useFormik({
    initialValues: { name: '', phone: '', id: nanoid() },
    onSubmit: values => {
      alert(JSON.stringify(values));
      values.id = nanoid();
    },
  });

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm formik={formik} />
      {/* <SearchBox /> */}
      {contacts.length > 0 ? <ContactList contacts={contacts} /> : <p>no contucts</p>}
    </div>
  );
  // Сохраняет контакты в localStorage при их изменении, чтобы данные сохранялись между перезагрузками.
  // useEffect(() => {
  //   window.localStorage.setItem('contacts', JSON.stringify(contacts));
  // }, [contacts]);

  // // Добавляет новый контакт, проверяя дубликаты по имени. Генерирует уникальный id с помощью nanoid.
  // const addContact = (values, { resetForm }) => {
  //   const newContact = { id: nanoid(), ...values };
  //   setContacts(prev => [...prev, newContact]);
  //   resetForm();
};

// // Удаляет контакт из списка по его id.
// const removeContactById = id => {
//   setContacts(prev => prev.filter(contact => contact.id !== id));
// };
// const deleteContact = id => {
//   setContacts(prev => prev.filter(contact => contact.id !== id));
// };

// Фильтрует контакты по имени, игнорируя регистр.
// const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));

// return (
//   <div>
//     <h1>Phonebook</h1>
//     <ContactForm onSubmit={addContact} />
//     <SearchBox filter={filter} onChange={setFilter} />
//     <ContactList contacts={filteredContacts} onDelete={deleteContact} />
//   </div>
// );

// Форма для добавления контактов. Использует Formik и Yup для управления вводом и валидации.
// function ContactForm({ onSubmit }) {
//   return (
//     <Formik
//       initialValues={{ name: '', number: '' }}
//       validationSchema={Yup.object({
//         name: Yup.string().min(3).max(50).required('Required'),
//         number: Yup.string().required('Required'),
//       })}
//       onSubmit={onSubmit}
//     >
//       <Form>
//         <label>
//           Name <Field name='name' /> <ErrorMessage name='name' />
//         </label>
//         <label>
//           Number <Field name='number' /> <ErrorMessage name='number' />
//         </label>
//         <button type='submit'>Add Contact</button>
//       </Form>
//     </Formik>
//   );
// }

// создает поле ввода для поиска по контактам
// function SearchBox({ filter, onChange }) {
//   return <input type='text' placeholder='Search contacts' value={filter} onChange={e => onChange(e.target.value)} />;
// }

// // рендерит список контактов
// function ContactItems({ contacts, onDelete }) {
//   return (
//     <ul>
//       {contacts.map(({ id, name, number }) => (
//         <li key={id}>
//           {name}: {number}
//           <button onClick={() => onDelete(id)}>Delete</button>
//         </li>
//       ))}
//     </ul>
//   );
// }
// <ContactItems contacts={filteredContacts} onDelete={removeContactById} />;
export default App;
