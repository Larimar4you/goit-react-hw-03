import s from './Contact.module.css';
// import { FaPhoneAlt } from 'react-icons/fa';
// import { FaUserAlt } from 'react-icons/fa';

const Contact = ({ id, name, number, onDelete }) => {
  return (
    <div className={s.contact}>
      <div className={s.contactContainer}>
        <div className={s.contactWrapper}>
          {/* <FaPhoneAlt color='black' /> */}
          <p className={s.contactText}>{name}</p>
        </div>
        <div className={s.contactWrapper}>
          {/* <FaUserAlt color='yellow' /> */}
          <p className={s.contactText}> {number}</p>
        </div>
      </div>
      <button className={s.contactBtn} type='button' onClick={() => onDelete(id)}>
        Delete
      </button>
    </div>
  );
};

export default Contact;
