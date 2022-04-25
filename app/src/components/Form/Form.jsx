import { useState } from "react";
import styles from './Form.module.scss';
import Form from 'react-bootstrap/Form'
import Select from 'react-select'


export default function UserForm({addContact}) {

  const [contactInfo, setContactInfo] = useState({
    id: "",
    firstName: "",
    lastName: "",
    age: "",
    select: ""
  });

  const handleChange = (event) => {
    console.log('event', event)
    const itemField = event.target ? {[event.target.name]: event.target.value} : {select: event.name};
    console.log('itemField', itemField)
    setContactInfo({ ...contactInfo, ...itemField });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    addContact(contactInfo);
    setContactInfo({ id: "", firstName: "", lastName: "", age: "",  select: ""});
  };

  const data = [
    {value:  "Riga", label: "Riga", name: "Riga"},
    {value: 'Daugavpils', label: 'Daugavpils', name: 'Daugavpils'},
    {value: 'Jūrmala', label: 'Jūrmala',  name: 'Jūrmala'},
    {value: 'Ventspils', label: 'Ventspils', name: 'Ventspils'},
  ];

  return (
    <div className="container">
      <form className={styles.form} onSubmit={handleSubmit}> 
      <div>
          <input
            type="number"
            name="id"
            placeholder="ID"
            value={contactInfo.id}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="Name"
            value={contactInfo.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="lastName"
            placeholder="Surname"
            value={contactInfo.lastName}
            onChange={handleChange}

          />
        </div>
        <div>
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={contactInfo.age}
            onChange={handleChange}

          />
        </div>
        <div>
           <Select name="select" className={styles.select} value={contactInfo.select.name} onChange={handleChange} options={data} />
        </div>

        <div>
          <button disabled={!contactInfo.id || !contactInfo.firstName || !contactInfo.lastName ||!contactInfo.age || !contactInfo.select}>Add</button>
        </div>
      </form>
    </div>
  );
}