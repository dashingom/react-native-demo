import React from 'react';
import { Select as SelectPicker, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Controller } from 'react-hook-form';
import { useStyles } from '../styles';

type FormInputProps = {
    id: string;
    name: string;
    label: string;
    options: any;
    control: any;
    rules: any;
};

const Select = ({ id, name, label, options, control, rules }: FormInputProps): JSX.Element => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <>
            <FormControl variant={'filled'} className={classes.formControl} fullWidth>
                <InputLabel id={name}>{label}</InputLabel>
                <Controller
                    rules={rules}
                    render={({ field: { onChange, value } }): JSX.Element => (
                        <SelectPicker id={id} labelId={name} value={value} name={name} onChange={onChange}>
                            {options.map((device: any) => (
                                <MenuItem key={`key${device.value}`} value={device.value}>
                                    {device.value}
                                </MenuItem>
                            ))}
                        </SelectPicker>
                    )}
                    control={control}
                    name={name}
                />
            </FormControl>
        </>
    );
};

export default Select;
