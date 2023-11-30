import React from 'react';
import Input from './elements/Input';
import Select from './elements/Select';

type Field = {
    type: string;
    id: string;
    label: string;
    placeholder: string;
    value: string;
    options: any;
};
export type Props = {
    field: Field;
};
const Element: React.FC<Props> = ({ field: { type, id, label, placeholder, value, options } }) => {
    switch (type) {
        case 'text':
            return <Input id={id} label={label} placeholder={placeholder} value={value} />;
        case 'select':
            return <Select id={id} label={label} placeholder={placeholder} value={value} options={options} />;

        default:
            return null;
    }
};

export default Element;
