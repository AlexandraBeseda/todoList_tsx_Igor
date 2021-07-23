import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
export type todolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
type GeneralPropTypes = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<GeneralPropTypes>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });


    function removeTask(todoListID: string, id: string) {

        let currentTasks = tasks[todoListID];
        if (currentTasks) {
            currentTasks = currentTasks.filter(t => t.id !== id);
            setTasks({...tasks, [todoListID]: currentTasks});
        }
    }

    function addTask(todoListID: string, title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let todoListTasks = tasks[todoListID];
        tasks[todoListID] = [task, ...todoListTasks]
        setTasks({...tasks});

    }

    function changeStatus(todoListID: string, taskId: string, isDone: boolean) {
        let currentTasks = tasks[todoListID];
        let task = currentTasks.find(fTSK => fTSK.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }


    function changeFilter(todoListID: string, value: FilterValuesType) {
        let currentTodoList = todolists.find(fTDL => fTDL.id === todoListID);
        if (currentTodoList) {
            currentTodoList.filter = value;
            setTodolists([...todolists]);
        }
    }

    function removeTodoList(todoListID: string) {
        let currentTodoList = todolists.filter(t => t.id !== todoListID);
        setTodolists([...currentTodoList]);
    }


    return (
        <div className="App">
            {todolists.map((mTDL) => {
                    let tasksForTodolist = tasks[mTDL.id];

                    if (mTDL.filter === "active") {
                        tasksForTodolist = tasks[mTDL.id].filter(t => !t.isDone);
                    }
                    if (mTDL.filter === "completed") {
                        tasksForTodolist = tasks[mTDL.id].filter(t => t.isDone);
                    }
                    return (<Todolist
                        key={mTDL.id}
                        todoListID={mTDL.id}
                        title={mTDL.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={mTDL.filter}
                        removeTodoList={removeTodoList}
                    />)
                }
            )}

        </div>
    );
}

export default App;
