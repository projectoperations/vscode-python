// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';

import { Field, Datapoint } from '@nteract/data-explorer/lib/types';
import * as uuid from 'uuid/v4';

export interface ITestData {
    fields: Field[];
    primaryKeys: string[];
    rows: Datapoint[];
    columns: {}[];
    tabularRows: {}[];
    gridColumns: {key: string, name: string}[];
}

export function generateTestData(numberOfRows: number) : ITestData {
    const fields = [
        { name: 'index', type: 'integer'},
        { name: 'foo', type: 'string'},
        { name: 'bar', type: 'integer'}
    ]

    const columns = [
        { title: 'Id', field: 'index' },
        { title: 'Foo', field: 'foo', editor:"input"},
        { title: 'Bar', field: 'bar'}
    ]

    const gridColumns = [
        { key: 'index', name: 'index'},
        { key: 'foo', name: 'Foo'},
        { key: 'bar', name: 'Bar'}
    ]

    const keys = ['index'];

    const rows : Datapoint[] = [];

    // Generate a whole bunch of rows
    for (let i = 0; i < numberOfRows; i += 1) {
        const row = { index: i, foo: uuid(), bar:0 };
        row.bar = row.foo.split('0').length;
        rows.push(row);
    }

    return {
        fields,
        primaryKeys: keys,
        rows,
        columns,
        tabularRows: rows,
        gridColumns
    };
}