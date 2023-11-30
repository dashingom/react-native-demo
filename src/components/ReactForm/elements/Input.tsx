import React, { useContext } from 'react';
import { TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useStyles } from '../styles';
import { FormContext } from '../FormContext';

type Props = {
    id: string;
    label: string;
    placeholder: string;
    value: string;
};

const Input: React.FC<Props> = ({ id, label, value }) => {
    const { handleChange } = useContext(FormContext);
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <>
            <TextField
                className={classes.formControl}
                id={id}
                required
                label={label}
                fullWidth
                variant={'filled'}
                sx={{ marginBottom: '0 !important' }}
                onChange={(event: any): void => {
                    handleChange(id, event);
                }}
            />
            <Typography variant="body2" className="custom-add-device-field-lengths-style">
                {`${value?.length}/10`}
            </Typography>
        </>
    );
};

export default Input;
