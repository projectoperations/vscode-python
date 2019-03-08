// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/select/lib/css/blueprint-select.css';
import 'react-table/react-table.css';

import DataExplorer from '@nteract/data-explorer';
import * as React from 'react';

import { DataExplorerMessages, IDataExplorerMapping } from '../../client/datascience/data-viewing/types';
import { IMessageHandler, PostOffice } from '../react-common/postOffice';

export interface IMainPanelProps {
}

class DataExplorerPostOffice extends PostOffice<IDataExplorerMapping> {};

export class MainPanel extends React.Component<IMainPanelProps> implements IMessageHandler {
    private postOffice: DataExplorerPostOffice | undefined;
    private de : DataExplorer | undefined;

    // tslint:disable-next-line:max-func-body-length
    constructor(props: IMainPanelProps) {
        super(props);
    }

    public render() {

        return (
            <div className='main-panel'>
                <DataExplorerPostOffice messageHandlers={[this]} ref={this.updatePostOffice} />
                <DataExplorer initialView={"grid"} ref={this.updateDataExplorer}/>
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
            this.de.
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

}
