import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from "@mui/material/Button/";
import TextField from '@mui/material/TextField/TextField';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
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
            addItem();
        }
    }
    const StylesButton = {
        maxHeight: '40px',
        maxWidth: '40px',
        minWidth: '40px',
        minHeight: '40px',
        marginLeft: '10px'
    }
    return <div>

        <TextField
            id={'outlined-basic'}
            value={title}
            label={error ? error : "Input"}
            variant="outlined"
            size={'small'}

            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            error={!!error}
        />
        <Button variant={'contained'} style={StylesButton} onClick={addItem}>+</Button>

       {/* {error && <div className="error-message">{error}</div>}*/}
    </div>
}
