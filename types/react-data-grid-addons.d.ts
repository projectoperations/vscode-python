declare module 'react-data-grid-addons' {
    export class Toolbar {
        constructor(...args: any[]);
        componentDidMount(): void;
        componentDidUpdate(): void;
        forceUpdate(callback: any): void;
        render(): any;
        setState(partialState: any, callback: any): void;
        shouldComponentUpdate(nextProps: any): any;
        props: any;
        state: any;
        context: any;
        refs: any;
    }
}