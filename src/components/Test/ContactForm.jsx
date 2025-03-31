import s from './ContactForm.module.css';

const ContactForm = ({ formik }) => {
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <input id='name' name='name' type='text' onChange={formik.handleChange} value={formik.values.name} />
        <input id='phone' name='phone' type='tel' onChange={formik.handleChange} value={formik.values.phone} />
        <button type='submit'>submit</button>
      </form>
      <p>{formik.values.name}</p>
    </div>
  );
};

export default ContactForm;
