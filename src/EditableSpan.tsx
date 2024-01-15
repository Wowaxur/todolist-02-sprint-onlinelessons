import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanProps = {
    oldTitle: string
    callBack: (newTitle: string)=>void
}

export const EditableSpan = (props: EditableSpanProps) => {
    const [edit, setEdit] = useState(false)
    let [newTitle, setNewTitle] = useState(props.oldTitle)


    const editFoo = () => {
        setEdit(!edit)
        if (edit)EditTask()

    }
    const EditTask = () => {
        props.callBack(newTitle)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        setNewTitle(e.currentTarget.value)
    }
    return (
        edit
            ? <TextField value={newTitle} onBlur={editFoo} autoFocus onChange={onChangeHandler}/>
            :<span onDoubleClick={editFoo}>{props.oldTitle}</span>
    );
};
