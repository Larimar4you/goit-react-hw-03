import Contact from '../Contact/Contact';
import s from './ContactList.module.css';

const ContactList = ({ contacts, onDelete }) => {
  console.log(contacts);
  return (
    <ul className={s.list}>
      {contacts.map(({ id, name, number }) => (
        <Contact key={id} id={id} name={name} number={number} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default ContactList;
