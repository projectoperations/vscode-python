import * as React from 'react';
import * as AdazzleReactDataGrid from 'react-data-grid';

export class DataGridRowRenderer extends AdazzleReactDataGrid.Row {

    constructor(props: any) {
        super(props)
    }

    public render = () => {
        const parent = super.render();
        if (this.props.idx) {
            const style: React.CSSProperties = {
                color:  this.props.idx % 2 ? 'red' : 'blue'
            };
        return <div id='wrapper' style={style}>{parent}</div>;
        }

        return parent;
    }
}