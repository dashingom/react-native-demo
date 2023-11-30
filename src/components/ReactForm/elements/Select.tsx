import React, { useContext } from 'react';
import { Select as SelectPicker, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useStyles } from '../styles';
import { FormContext } from '../FormContext';

type Props = {
    id: string;
    label: string;
    placeholder: string;
    value: string;
    options: any;
};

const Select: React.FC<Props> = ({ id, label, value, options }) => {
    const { handleChange } = useContext(FormContext);
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <>
            <FormControl variant={'filled'} className={classes.formControl} required fullWidth>
                <InputLabel id={id} required={true}>
                    {label}
                </InputLabel>
                <SelectPicker
                    labelId={id}
                    value={value}
                    name="deviceTypeId"
                    onChange={(event: any): void => {
                        handleChange(id, event);
                    }}
                >
                    {options.map((device: any) => (
                        <MenuItem key={`key${device.label}`} value={device.label}>
                            {device.label}
                        </MenuItem>
                    ))}
                </SelectPicker>
            </FormControl>
        </>
    );
};

export default Select;
