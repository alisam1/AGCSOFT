import { useState } from "react";
import styles from './Form.module.scss';

export default function UserForm({addContact}) {

  const [contactInfo, setContactInfo] = useState({
    id: "",
    firstName: "",
    lastName: "",
    age: "",
    select: ""
  });

  const handleChange = (event) => {
    setContactInfo({ ...contactInfo, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addContact(contactInfo);
    setContactInfo({ id: "", firstName: "", lastName: "", age: "",  select: ""});
  };

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
            <select name="select" value={contactInfo.select} onChange={handleChange}>
                <option value='Riga'>Riga</option>
                <option value='Daugavpils'>Daugavpils</option>
                <option value='Jūrmala'>Jūrmala</option>
                <option value='Ventspils'>Ventspils</option>
             </select>
        </div>
        <div>
          <button disabled={!contactInfo.id || !contactInfo.firstName || !contactInfo.lastName ||!contactInfo.age || !contactInfo.select}>Add</button>
        </div>
      </form>
    </div>
  );
}