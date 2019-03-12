import * as React from 'react';

import 'react-tabulator/css/tabulator.css';

import { React15Tabulator } from 'react-tabulator';

const columns = [
  { title: 'Name', field: 'name', width: 150 },
  { title: 'Age', field: 'age', align: 'left', formatter: 'progress' },
  { title: 'Favourite Color', field: 'color' },
  { title: 'Date Of Birth', field: 'dob' },
  { title: 'Rating', field: 'rating', align: 'center', formatter: 'star' },
  { title: 'Passed?', field: 'passed', align: 'center', formatter: 'tickCross' }
];
const data = [
  { id: 1, name: 'Oli Bob', age: '12', color: 'red', dob: '01/01/1980', rating: 5, passed: true, pets: ['cat', 'dog'] },
  { id: 2, name: 'Mary May', age: '1', color: 'green', dob: '12/05/1989', rating: 4, passed: true, pets: ['cat'] },
  { id: 3, name: 'Christine Lobowski', age: '42', color: 'green', dob: '10/05/1985', rating: 4, passed: false },
  { id: 4, name: 'Brendon Philips', age: '125', color: 'red', dob: '01/08/1980', rating: 4.5, passed: true },
  { id: 5, name: 'Margret Marmajuke', age: '16', color: 'yellow', dob: '07/01/1999', rating: 4, passed: false },
  {
    id: 6,
    name: 'Van Ng',
    age: '37',
    color: 'green',
    dob: '06/10/1982',
    rating: 4,
    passed: true,
    pets: ['dog', 'fish']
  },
  { id: 7, name: 'Duc Ng', age: '37', color: 'yellow', dob: '10/10/1982', rating: 4, passed: true, pets: ['dog'] }
];

// Editable Example:
const colorOptions = { ['']: '&nbsp;', red: 'red', green: 'green', yellow: 'yellow' };
const editableColumns = [
  { title: 'Name', field: 'name', width: 150, editor: 'input', headerFilter: 'input' },
  { title: 'Age', field: 'age', align: 'left', formatter: 'progress', editor: 'progress' },
  {
    title: 'Favourite Color',
    field: 'color',
    editor: 'select',
    editorParams: { allowEmpty: true, showListOnEmpty: true, values: colorOptions },
    headerFilter: 'select',
    headerFilterParams: { values: colorOptions }
  },
  { title: 'Date Of Birth', field: 'dob' },
  {
    title: 'Pets',
    field: 'pets',
  },
  { title: 'Passed?', field: 'passed', align: 'center', formatter: 'tickCross', editor: true }
];

interface IProps {
  data: any[];
}

export class TabulatorExample extends React.Component<IProps> {
  state: any = {
    data: []
  };
  ref: React15Tabulator | undefined;

  rowClick = (e: any, row: any) => {
    console.log('rowClick id: ${row.getData().id}', row, e);
  };

  setData = () => {
    this.setState({ data });
  };
  clearData = () => {
    this.setState({ data: [] });
  };

  render() {
    const options = {
      height: 150,
      movableRows: true
    };
    return (
      <div>
        <React15Tabulator
          ref={(ref: React15Tabulator) => (this.ref = ref)}
          columns={columns}
          data={data}
          rowClick={this.rowClick}
          options={options}
          data-custom-attr="test-custom-attribute"
          className="custom-css-class"
        />

        <h3>
          Asynchronous data: (e.g. fetch) - <button onClick={this.setData}>Set Data</button>{' '}
          <button onClick={this.clearData}>Clear</button>
        </h3>
        <React15Tabulator columns={columns} data={this.state.data} />

        <h3>Editable Table</h3>
        <React15Tabulator
          columns={editableColumns}
          data={data}
          cellEdited={(cell: any) => console.log('cellEdited', cell)}
          dataEdited={(newData: any) => console.log('dataEdited', newData)}
          footerElement={<span>Footer</span>}
        />

        <p>
          <a href="https://github.com/ngduc/react-tabulator" target="_blank">
            Back to: Github Repo: react-tabulator
          </a>
        </p>
        <p>
          <a href="http://tabulator.info/examples/4.0" target="_blank">
            More Tabulator's Examples
          </a>
        </p>
      </div>
    );
  }
}