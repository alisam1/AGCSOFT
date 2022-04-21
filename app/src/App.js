import React, {useState} from 'react';
import FormNew from './components/FormNew/FormNew';
import TableData from './components/TableForm/TableForm';
import styles from './App.module.scss';

const data = [];

function App() {

  const columns = [
    { field: 'firstName', fieldName: 'Name' },
    { field: 'lastName', fieldName: 'Surname' },
    { field: 'age', fieldName: 'Age' },
    { field: 'select', fieldName: 'City' },
    { field: 'choise', fieldName: '' },
  ];

  const [listData, updatelistData] = useState(data);
  const [copyTable, setTable] = useState([])

  const addContact = (item) => {
    const items = [...listData, item]
    updatelistData(items)
  };

  const ref = React.createRef();

  const addClick = () => {
    const items = [...copyTable, ref.current]
    return setTable(items)
  };

  const deleteTable = (index) => {
    const items = [...copyTable];
    items.splice(index, 1)
    return setTable(items)
  };

  return (
    <>
      <FormNew addContact={addContact} />
      <div className={styles.container}>
        <div className={styles.copy__buttons}>
          <button className={styles.copy__add} onClick={addClick}>Copy table</button>
        </div>
        <TableData ref={ref} columns={columns} contacts={listData} actions />
        <div className='copy' id='copyTable'>
          {copyTable.map((item,index) => {
            return <div key={index * Math.random()}>
                      <div className={styles.copy__buttons}>
                        <button className={styles.copy__add} onClick={addClick}>Copy table</button>
                        <button className={styles.copy__delete} onClick={deleteTable}></button>
                      </div>
                      <div key={index} dangerouslySetInnerHTML={{__html: `${item.outerHTML}`}}></div>
                  </div>
          })}
        </div>
      </div>
    </>
  );
}

export default App;