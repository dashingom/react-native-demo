import React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { useTheme } from '@emotion/react';
import { useStyles } from '../styles';

type FormInputProps = {
    id: string;
    name: string;
    label: string;
    control: any;
    rules: any;
};
const Input = ({ id, name, label, control, rules }: FormInputProps): JSX.Element => {
    const theme = useTheme();
    const classes = useStyles(theme);
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange, value }, fieldState: { error } }): JSX.Element => (
                <TextField
                    id={id}
                    className={classes.formControl}
                    helperText={error ? error.message : null}
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    fullWidth
                    label={label}
                    variant="filled"
                />
            )}
        />
    );
};

export default Input;
