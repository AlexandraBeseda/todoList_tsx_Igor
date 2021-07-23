import React from "react";


type ButtonPropTypes = {
    callback: (todoLIstID: string) => void,
    todoLIstID: string,
    buttonName: string
}

export const Button = (props: ButtonPropTypes) => {
    return (<button onClick={() => {
        props.callback(props.todoLIstID)
    }}>
        {props.buttonName}
    </button>);
}