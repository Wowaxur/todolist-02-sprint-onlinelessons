import React from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button/";
import CheckBox from "./components/CheckBox";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TestTasksType = {
    [ key: string ]: TaskType[]
}
// [key: string]: []
type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title);
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const changeTaskStatusHandler = (tID:string, checked: boolean) => {
        props.changeTaskStatus(tID,checked, props.id)

    }



    return <div>
        <h3> <EditableSpan value={props.title} onChange={changeTodolistTitle} />

            <IconButton onClick={removeTodolist} style={{color:'blue'}} aria-label="delete">
                <DeleteIcon />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)

                    const onTitleChangeHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    }


                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <CheckBox
                            checked={t.isDone}
                            onChange={(checked)=>{changeTaskStatusHandler(t.id, checked)}}
                        />
                        <EditableSpan
                            value={t.title}
                            onChange={onTitleChangeHandler}
                        />
                        <IconButton onClick={onClickHandler} aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div>
            <Button variant={props.filter === 'all' ? "outlined" : "contained"}
                    onClick={onAllClickHandler}
                    color={'error'}
            >All
            </Button>
            <Button variant={props.filter === 'active' ? "outlined" : "contained"}
                    onClick={onActiveClickHandler}
                    color={'info'}
            >Active
            </Button>
            <Button variant={props.filter === 'completed' ? "outlined" : "contained"}
                    onClick={onCompletedClickHandler}
                    color={'warning'}
                >Completed
            </Button>
        </div>
    </div>
}


