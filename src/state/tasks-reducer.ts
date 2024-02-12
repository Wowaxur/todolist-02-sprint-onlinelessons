
import {v1} from "uuid";
import {TasksStateType} from "../App";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";




export const TasksReducer = (state: TasksStateType = {}, action: TasksReducerType): TasksStateType => {
    switch (action.type) {

        case "REMOVE-TASK": {
            let todolistTasks = state[action.payload.todolistId];
            state[action.payload.todolistId] = todolistTasks.filter(task => task.id !== action.payload.taskId)
            return {...state};
        }
        case "ADD-TASK": {
            let newTask = {id: v1(), title: action.payload.title, isDone: false};
            let todolistTasks = state[action.payload.todolistId];
            state[action.payload.todolistId] = [newTask,...todolistTasks];
            return {...state}
        }
        case "CHANGE-STATUS": {
            let todolistTasks = state[action.payload.todolistId];
            let task = todolistTasks.find(task => task.id === action.payload.id)
            if (task) {
                task.isDone = action.payload.isDone
                return {...state}
            }
            return state

        }
        case "CHANGE-TASK-TITLE":{
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.id ? {...t, title: action.payload.newTitle} : t)
            }

        }
        case "ADD-TODOLIST-TASKS":{
            return {...state, [action.payload.newTodolistId]: []}
        }
        case "ADD-TODOLIST":{
            return {...state,
            [action.todolistId]: []
            }
        }
        case "REMOVE-TODOLIST": {
           /* delete state[action.id];
            return {...state};*/

            const {[action.id]:[], ...rest} = state
            return rest

            /*let copyState = {...state}
            delete copyState[action.id]
            return copyState*/
        }

       /* let destructExample = {
            1: 1,
            2: 2,
            3: 3
        }
        const {['1']:asdd, ...rest} = destructExample
           rest = {
            2:2,
            3:3
           } */

        default: {
            return state;
        }

    }
}
type TasksReducerType =
    | RemoveTaskACType
    | addTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | addNewTodolistTaskType
    | AddTodolistActionType
    | RemoveTodolistActionType

type addTaskACType = ReturnType<typeof addTaskAC>
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
type addNewTodolistTaskType = ReturnType<typeof addNewTodolistTask>

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            taskId,
            todolistId,
        }
    } as const
}
export const addTaskAC = (title:string, todolistId: string)=>{
    return{
        type: 'ADD-TASK',
        payload: {
            title,
            todolistId,
        }
    } as const
}

export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) =>{
    return{
        type: 'CHANGE-STATUS',
        payload:{
            id,
            isDone,
            todolistId,
        }
    } as const
}


export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload:{
            id,
            newTitle,
            todolistId,
        }
    }as const

}

export const addNewTodolistTask = (newTodolistId: string) => {
    return {
        type: 'ADD-TODOLIST-TASKS',
        payload: {
            newTodolistId,
        }
    } as const
}