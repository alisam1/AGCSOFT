import React, {useState, useEffect} from 'react';
import FormNew from './components/FormNew/FormNew';
import TableData from './components/TableForm/TableForm';

const data = [];

function App() {

  const columns = [
    { field: 'firstName', fieldName: 'Name' },
    { field: 'lastName', fieldName: 'Surname' },
    { field: 'age', fieldName: 'Age' },
    { field: 'select', fieldName: 'City' },
  ];

  const [listData, updatelistData] = useState(data);
  const [copyTable, setTable] = useState([])

  const addContact = (item) => {
    const items = [...listData, item]
    updatelistData(items)
    console.log(listData)
  };

  const ref = React.createRef();

  const addClick = () => {
    const items = [...copyTable, ref.current]
    return setTable(items)
  };

  const deleteTable = () => {
    return setTable([])
  };

  console.log(copyTable)



  return (
    <>
      <button onClick={addClick}>Copy</button>
      <FormNew addContact={addContact} />
      <TableData ref={ref} columns={columns} contacts={listData} actions />
      <div id='copyTable'>
        <button onClick={deleteTable}>Delete</button>
        {copyTable.map((item,index) => {
          console.log(item.children)
          return <div key={index}>{item}</div>
        })}
      </div>
    </>
  );
}

export default App;