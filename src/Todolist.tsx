import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string,
    todoListID: string,
    tasks: Array<TaskType>,
    removeTask: (todoListID: string, taskId: string) => void,
    changeFilter: (todoListID: string, value: FilterValuesType) => void,
    addTask: (todoListID: string, title: string) => void,
    changeTaskStatus: (todoListID: string, taskId: string, isDone: boolean) => void,
    filter: FilterValuesType,
    removeTodoList: (todoListID: string) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (props.title.trim() !== "") {
            props.addTask(props.todoListID, title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter") {
            addTask();
        }
    }

    /*   const onAllClickHandler = () => props.changeFilter(props.todoListID, "all");
       const onActiveClickHandler = () => props.changeFilter(props.todoListID, "active");
       const onCompletedClickHandler = () => props.changeFilter(props.todoListID, "completed");*/


    const Handler = (value: FilterValuesType) => {
        props.changeFilter(props.todoListID, value)
    }


    return <div>
        <h3>{props.title}</h3>
        {/*<button onClick={() => props.removeTodoList(props.todoListID)}>X</button>*/}
        <Button callback={props.removeTodoList}
                todoLIstID={props.todoListID}
                buttonName={"X"}
        />
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todoListID, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todoListID, t.id, e.currentTarget.checked);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            {/* <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>*/}


            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={() => Handler('all')}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={() => Handler('active')}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={() => Handler('completed')}>Completed
            </button>
        </div>
    </div>
}
