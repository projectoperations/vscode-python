// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/select/lib/css/blueprint-select.css';
import 'react-table/react-table.css';

import DataExplorer from '@nteract/data-explorer';
import { DataProps } from '@nteract/data-explorer/lib/types';
import * as React from 'react';

import { DataExplorerMessages, IDataExplorerMapping } from '../../client/datascience/data-viewing/types';
import { IMessageHandler, PostOffice } from '../react-common/postOffice';
import { generateTestData } from './testData';

import 'react-tabulator/css/tabulator.css';
import 'react-tabulator/lib/styles.css';

import { React15Tabulator } from 'react-tabulator';

//import { ReactTabulator } from 'react-tabulator';

import * as AdazzleReactDataGrid from 'react-data-grid';
import { Toolbar, Data } from 'react-data-grid-addons';
import { DataGridRowRenderer } from './dataGridRow';

const selectors = Data.Selectors;

const defaultColumnProperties = {
    filterable: true,
    sortable: true    
}

export interface IMainPanelProps {
    skipDefault?: boolean;
}

interface IMainPanelState {
    nteractDataProps:  DataProps;
    tabulatorColumns: {}[];
    tabulatorData: {}[];
    gridColumns: {key:string, name: string}[];
    gridRows: IGridRow[];
    initialGridRows: IGridRow[];
    filters:{};
}

interface IGridRow {
    [name: string] : any;
}

class DataExplorerPostOffice extends PostOffice<IDataExplorerMapping> {};

export class MainPanel extends React.Component<IMainPanelProps, IMainPanelState> implements IMessageHandler {
    private postOffice: DataExplorerPostOffice | undefined;
    private de : DataExplorer | undefined;

    // tslint:disable-next-line:max-func-body-length
    constructor(props: IMainPanelProps, state: IMainPanelState) {
        super(props);

        if (!this.props.skipDefault) {
            const data = generateTestData(500);
            this.state = {
                nteractDataProps: {
                    schema: {
                       fields: data.fields,
                       primaryKey: data.primaryKeys,
                       pandas_version: '0.21.0'
                    },
                    data: [] //data.rows
                },
                tabulatorColumns: data.columns,
                tabulatorData: [], // data.tabulatorRows
                gridColumns: data.gridColumns,
                gridRows: data.tabularRows,
                initialGridRows: data.tabularRows,
                filters: {}
            };
        } else {
            this.state = {
                nteractDataProps: {
                    schema: {
                       fields: [
                       ],
                       primaryKey: [],
                       pandas_version: '1'
                    },
                    data: [
                    ]
                },
                tabulatorColumns: [],
                tabulatorData: [],
                gridColumns: [],
                gridRows: [],
                initialGridRows: [],
                filters: {}
            };
        }
    }

    public render = () => {
        const options = {
            height: 300,
            movableRows: false
          };

        const filteredRows = this.getRows(this.state.gridRows, this.state.filters);
      
        return (
            <div className='main-panel'>
                <DataExplorerPostOffice messageHandlers={[this]} ref={this.updatePostOffice} />
                <div>Hello from Data Explorer</div>
                <DataExplorer data={this.state.nteractDataProps} initialView={"grid"} ref={this.updateDataExplorer}/>
                <div>Hello from Tabulator</div>
                <React15Tabulator columns={this.state.tabulatorColumns} data={this.state.tabulatorData} options={options} />
                <div>Hello from React Data Grid</div>
                <AdazzleReactDataGrid
                    columns={this.state.gridColumns.map(c => { return {...c, ...defaultColumnProperties };})}
                    rowGetter={i => filteredRows[i]} 
                    rowsCount={filteredRows.length}
                    minHeight={300}
                    toolbar={<Toolbar enableFilter={true}/>}
                    rowRenderer={DataGridRowRenderer}
                    onAddFilter={filter => this.handleFilterChange(filter)}
                    onClearFilters={() => this.setState({filters: {}})}
                    onGridSort={(sortColumn: string, sortDirection: string) => this.sortRows(sortColumn, sortDirection)}
                />
            </div>
        );
    }

    // tslint:disable-next-line:no-any
    public handleMessage = (msg: string, payload?: any) => {
        switch (msg) {
            default:
                break;
        }

        return false;
    }

    private updateDataExplorer = (de: DataExplorer) => {
        if (this.de !== de) {
            this.de = de;
        }
    }

    private updatePostOffice = (postOffice: DataExplorerPostOffice) => {
        if (this.postOffice !== postOffice) {
            this.postOffice = postOffice;
            this.sendMessage(DataExplorerMessages.Started);
        }
    }

    private sendMessage<M extends IDataExplorerMapping, T extends keyof M>(type: T, payload?: M[T]) {
        if (this.postOffice) {
            this.postOffice.sendMessage(type, payload);
        }
    }

    // tslint:disable:no-any
    private handleFilterChange = (filter: any) => {
        const newFilters: {[key: string] : any } = { ...this.state.filters };
        if (filter.column.key) {
            if (filter.filterTerm) {
                newFilters[filter.column.key] = filter;
            } else {
                delete newFilters[filter.column.key];
            }
        }
        this.setState({filters: newFilters});
      };
      
      private getRows(rows: any, filters: any) {
        return selectors.getRows({ rows, filters });
      }
      
      private sortRows = (sortColumn: string | number, sortDirection: string) => {
        if (sortDirection === 'NONE') {
            sortColumn = 'index';
            sortDirection = 'ASC';
        }
        const comparer = (a: IGridRow, b: IGridRow) : number =>  {
          if (sortDirection === "ASC") {
            return a[sortColumn] > b[sortColumn] ? 1 : -1;
          } else if (sortDirection === "DESC") {
            return a[sortColumn] < b[sortColumn] ? 1 : -1;
          }
          return -1;
        };
        const sorted = this.state.initialGridRows.sort(comparer);
        this.setState({gridRows: sorted});
      };

}
