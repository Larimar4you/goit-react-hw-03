import s from './ContactForm.module.css';

const ContactForm = ({ formik }) => {
  return (
    <div className={s.contactFormWrapper}>
      <form className={s.contactForm} onSubmit={formik.handleSubmit}>
        <div className={s.contactFormWrapperField}>
          <label htmlFor='name'>Name</label>
          <input id='name' name='name' type='text' onChange={formik.handleChange} value={formik.values.name} />
        </div>

        <div className={s.contactFormWrapperField}>
          <label htmlFor='phone'>Phone</label>
          <input id='phone' name='phone' type='tel' onChange={formik.handleChange} value={formik.values.phone} />
        </div>

        <button className={s.contactFormBtn} type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
