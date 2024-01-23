import {FilterValuesType, TodolistType} from "../App";

export const TodolistsReducer = (state:TodolistType[] , action: FilterReducerType): TodolistType[] =>{
    switch (action.type){
        case 'CHANGE-FILTER': {
          return state.map(el=> el.id === action.payload.todolistId ? {...el, filter: action.payload.value}  : el)
            }
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.payload.id);
        }
        case "CHANGE-TODOLIST-TITLE":{
            return state.map(tl => tl.id === action.payload.id ? {...tl,title:action.payload.title} : tl)

        }
        case "ADD-TODOLIST":{
            let newTodolist: TodolistType = {id: action.payload.id, title: action.payload.title, filter: 'all'};
            return [newTodolist,...state]
        }
        default:
            return state
    }
}

type FilterReducerType = changeFilterACType | removeTodolistACType |changeTodolistTitleACType |addTodolistACType


type changeFilterACType = ReturnType<typeof changeFilterAC>
type removeTodolistACType = ReturnType<typeof removeTodolistAC>
type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type addTodolistACType = ReturnType<typeof addTodolistAC>

export const changeFilterAC = (value: FilterValuesType, todolistId: string) =>{
    return {
        type:"CHANGE-FILTER",
        payload: {
            value,
            todolistId,
        }
    } as const

}
export const addTodolistAC = (newTodolistId: string, title: string) => {
    return{
        type:'ADD-TODOLIST',
        payload:{
            title,
            id: newTodolistId,
        }
    } as const
}

export const removeTodolistAC = (id: string) => {
    return {
        type:'REMOVE-TODOLIST',
        payload:{
            id,
        }
    } as const
}

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id,
            title,
        }
    } as const
}

