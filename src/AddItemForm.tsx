import Button from '@mui/material/Button/Button';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton/IconButton";
import {AddBox} from "@mui/icons-material";

type AddItemFormProps ={
    callBack: (title: string) => void

}

const AddItemForm = (props: AddItemFormProps) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.callBack(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }
    return (
        <div >

            <TextField value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   error={!!error}
                       label={'Title'}
                       helperText={error}
            />
            {/*<Button
                variant="contained"
                onClick={addTask}
                size="small"
                style={{maxWidth: '20px', maxHeight: '20px', minWidth: '20px', minHeight: '20px'}}
            >+</Button>*/}
            <IconButton
                color={'primary'}
                onClick={addTask}

            >
                <AddBox/>
            </IconButton>
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
    );
};

export default AddItemForm;