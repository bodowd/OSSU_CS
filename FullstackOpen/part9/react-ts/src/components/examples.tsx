import { JsxEmit } from "typescript"

const MyComp1 = () => {
    // automatically infers the return type of this function (a react component) as JSX.Element
    return <div>Typescript has auto inference</div>
}

const MyComp2 = (): JSX.Element => {
    // explicitly defining the return type of a function here
    return <div>Typescript React is easy.</div>
}

interface MyProps {
    label: string;
    price?: number;
}

const MyComp3 = ({label, price}: MyProps): JSX.Element => {
    // explicitly defining the parameter types using interface `MyProps`
    // and return type as JSX.Element in this function
    return <div>Typescript is great.</div>
}

const MyComp4 = ({label, price}: {label: string, price: number}) => {
    // explicitly defining the parameter types using an inline interface
    // and TS automatically infers the return type as JSX.Element
    return <div>There is nothing like TypeScript.</div>
}