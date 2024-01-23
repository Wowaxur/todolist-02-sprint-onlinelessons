    import React, {ChangeEvent} from 'react';
    import Checkbox from "@mui/material/Checkbox/Checkbox";

    type CheckboxPropsType = {
        onChange : (checked: boolean) => void
        checked: boolean
    }

    const CheckBox = (p: CheckboxPropsType) => {
        const onChangeHandler = (e:  ChangeEvent<HTMLInputElement>) => {
            // @ts-ignore
            p.onChange(e.currentTarget.checked)
        }
        return (
            <Checkbox
                onChange={onChangeHandler}
                checked={p.checked}
            />


        );
    };

    export default CheckBox;