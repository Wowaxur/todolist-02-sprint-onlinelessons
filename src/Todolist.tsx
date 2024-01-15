import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton/IconButton';
import Button from "@mui/material/Button/Button";
import {Checkbox} from "@mui/material";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    updateTask: (title: string, todolistId: string, taskId: string) => void
    removeTodolist: (id: string) => void
    updateTodoTitle: (title: string, todolistId: string,) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const updateTitleHandler = (title: string) => {
        props.updateTodoTitle(title, props.id)
    }
    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    return <div className={'Todolist'}>
        <h3>
            <EditableSpan oldTitle={props.title} callBack={updateTitleHandler}/>
            {/*<Button variant='contained' onClick={removeTodolist} size="small">x</Button>*/}
            <IconButton onClick={removeTodolist} aria-label="delete" size="small">
                <DeleteIcon fontSize="inherit" />
            </IconButton>
        </h3>
        <AddItemForm callBack={addTask}/>
        <div>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        // @ts-ignore
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    const updateTask = (title: string) => {
                        props.updateTask(title, props.id, t.id)

                    }
                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            color={'primary'}
                            onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan callBack={updateTask} oldTitle={t.title}/>
                        <Button  onClick={onClickHandler}
                        size={'small'}
                        >
                            <DeleteIcon fontSize="small" />
                        </Button>
                    </div>
                })
            }
        </div>
        <div>
            <Button
                    variant={props.filter === 'all'? 'outlined': 'text'}
                    onClick={onAllClickHandler}>All

            </Button>
            <Button
                    variant={props.filter === 'active'? 'outlined': 'text'}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button
                    variant={props.filter === 'completed'? 'outlined': 'text'}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}


