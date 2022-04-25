import React, { useState, useEffect } from 'react';
import { Form, Table } from "react-bootstrap";
import styles from './Table.module.scss';

const UserList = React.forwardRef(({contacts, actions, columns}, ref) => {

  const [isEditMode, setIsEditMode] = useState(false);
  const [rowIDToEdit, setRowIDToEdit] = useState(undefined);
  const [rowsState, setRowsState] = useState(contacts);
  const [editedRow, setEditedRow] = useState(null);

  useEffect(() => { setRowsState(contacts) }, [contacts])

  const handleEdit = (rowID) => {
    setIsEditMode(true);
    setEditedRow(undefined);
    setRowIDToEdit(rowID);
  }

  const handleRemoveRow = (rowID) => {
    const newData = rowsState.filter(row => {
      return row.id !== rowID ? row : null
    });
    console.log(newData)
    console.log(rowsState)
    
    setRowsState(newData);
  }

  const handleOnChangeField = (e, rowID) => {
    const { name: fieldName, value } = e.target;

    setEditedRow({
      id: rowID,
      [fieldName]: value
    })
  }

  const handleCancelEditing = () => {
    setIsEditMode(false);
    setEditedRow(undefined);
  }

  const handleSaveRowChanges = () => {
    setTimeout(() => {
      setIsEditMode(false);

      const newData = rowsState.map(row => {
        if (row.id === editedRow.id) {
          row = { ...row, ...editedRow}
        }
        return row;
      })

      setRowsState(newData);
      setEditedRow(undefined)
    }, 1000)
  }

  return (
      <table ref={ref}>
      <thead>
      <tr>
        {columns.map((column) => {
          return <th key={column.field}>{ column.fieldName }</th>
        })}
      </tr>
      </thead>
      <tbody>
      {rowsState.map((row) => {
        return <tr key={row.id}>
          <td>
            { isEditMode && rowIDToEdit === row.id
              ? <Form.Control
                type='text'
                defaultValue={editedRow ? editedRow.firstName : row.firstName}
                id={row.id}
                name='firstName'
                onChange={ (e) => handleOnChangeField(e, row.id) }
              />
              : row.firstName
            }
          </td>
          <td>
            { isEditMode && rowIDToEdit === row.id
              ? <Form.Control
                type='text'
                defaultValue={editedRow ? editedRow.lastName : row.lastName}
                id={row.id}
                name='lastName'
                onChange={ (e) => handleOnChangeField(e, row.id) }
              />
              : row.lastName
            }
          </td>
           <td>
            { isEditMode && rowIDToEdit === row.id
              ? <Form.Control
                type='text'
                defaultValue={editedRow ? editedRow.age : row.age}
                id={row.id}
                name='age'
                onChange={ (e) => handleOnChangeField(e, row.id) }
              />
              : row.age
            }
          </td>
          <td>
            { isEditMode && rowIDToEdit === row.id
              ? <Form.Select onChange={e => handleOnChangeField(e, row.id)} name="select" defaultValue={row.select}>
                <option value='Riga'>Riga</option>
                <option value='Daugavpils'>Daugavpils</option>
                <option value='Jūrmala'>Jūrmala</option>
                <option value='Ventspils'>Ventspils</option>
              </Form.Select>
              : row.select
            }
          </td>
          {actions &&
          <td className={styles.buttons}>
            { isEditMode && rowIDToEdit === row.id
              ? <button onClick={ () => handleSaveRowChanges() }  className={styles.button + ' ' + styles.button__agree} disabled={!editedRow}>
                Agree
              </button>
              : <button  onClick={ () => handleEdit(row.id) }  className={styles.button + ' ' + styles.button__edit}>
                Edit
              </button>
            }

            { isEditMode && rowIDToEdit === row.id
              ? <button onClick={() => handleCancelEditing()} className={styles.button + ' ' + styles.button__edit}>
                Edit
              </button>
              : <button onClick={() => handleRemoveRow(row.id)} className={styles.button + ' ' + styles.button__delete}>
                Delete
              </button>
            }
          </td>
          }
        </tr>
      })}
      </tbody>
    </table>
    );
});

  export default UserList;