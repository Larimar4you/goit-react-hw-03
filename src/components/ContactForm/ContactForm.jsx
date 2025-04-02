import s from './ContactForm.module.css';

const ContactForm = ({ formik }) => {
  return (
    <div className={s.formWrapper}>
      <form className={s.form} onSubmit={formik.handleSubmit}>
        <div className={s.formWrapperField}>
          <label htmlFor='name'>Name</label>
          <input id='name' name='name' type='text' onChange={formik.handleChange} value={formik.values.name} />
        </div>

        <div className={s.formWrapperField}>
          <label htmlFor='phone'>Phone</label>
          <input id='phone' name='phone' type='tel' onChange={formik.handleChange} value={formik.values.phone} />
        </div>

        <button className={s.formBtn} type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
