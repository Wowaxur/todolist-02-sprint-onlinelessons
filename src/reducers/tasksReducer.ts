import {TestTasksType} from "../Todolist";
import {v1} from "uuid";




export const TasksReducer = (state: TestTasksType, action: TasksReducerType): TestTasksType => {
    switch (action.type) {
        case "CHANGE-STATUS": {
            let todolistTasks = state[action.payload.todolistId];
            let task = todolistTasks.find(task => task.id === action.payload.id)
            if (task) {
                task.isDone = action.payload.isDone
                return {...state}
            }
            return state

        }
        case "REMOVE-TASK": {
            let todolistTasks = state[action.payload.todolistId];
            state[action.payload.todolistId] = todolistTasks.filter(task => task.id !== action.payload.id)
            return {...state};
        }
        case "ADD-TASK": {
            let newTask = {id: v1(), title: action.payload.title, isDone: false};
            let todolistTasks = state[action.payload.todolistId];
            state[action.payload.todolistId] = [newTask,...todolistTasks];
            return {...state}
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

type addTaskACType = ReturnType<typeof addTaskAC>
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
type addNewTodolistTaskType = ReturnType<typeof addNewTodolistTask>

export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            id,
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