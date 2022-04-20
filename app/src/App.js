import React, {useState, useRef, Children} from 'react';
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

  const deleteTable = (index) => {
    const items = copyTable
    items.splice(index, 1)
    return setTable(items)
  };

  console.log(copyTable)



  return (
    <>
      <button onClick={addClick}>Copy</button>
      <FormNew addContact={addContact} />
      <TableData ref={ref} columns={columns} contacts={listData} actions />
      <div id='copyTable'>
        {copyTable.map((item,index) => {
          return <div>
                    <button onClick={deleteTable}>Delete</button>
                    <div dangerouslySetInnerHTML={{__html: `${item.outerHTML}`}}></div>
                </div>
        })}
      </div>
    </>
  );
}

export default App;