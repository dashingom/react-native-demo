import React from 'react';
import Input from './elements/Input';
import Select from './elements/Select';

type Field = {
    type: string;
    id: string;
    label: string;
    value: string;
    options: any;
    rules: any;
};
export type Props = {
    field: Field;
    control: any;
};
const Element: React.FC<Props> = ({ field: { type, id, label, options, rules }, control }) => {
    switch (type) {
        case 'text':
            return <Input name={id} label={label} id={id} control={control} rules={rules} />;
        case 'select':
            return <Select id={id} name={id} label={label} options={options} control={control} rules={rules} />;

        default:
            return null;
    }
};

export default Element;
