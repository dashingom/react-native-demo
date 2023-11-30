import React, { useEffect, useState } from 'react';
import { Card, Container, CardContent, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useStyles } from './styles';
import formData from '@fiji/common/src/constants/formElement.json';
import Element from './Element';
import { FormContext } from './FormContext';

export const ReactForm: React.FC = () => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [elements, setElements] = useState(null);

    useEffect(() => {
        setElements(formData[0]);
    }, []);
    const { fields, pageTitle } = elements ?? {};

    const handleChange = (id, event): void => {
        const newElements = { ...elements };
        newElements.fields.forEach((field) => {
            const { type, id: fieldId } = field;
            if (id === fieldId) {
                switch (type) {
                    case 'checkbox':
                        field['field_value'] = event.target.checked;
                        break;

                    default:
                        field['field_value'] = event.target.value;
                        break;
                }
            }
            setElements(newElements);
        });
        console.log(elements);
    };

    return (
        <FormContext.Provider value={{ handleChange }}>
            <React.Fragment>
                <header>
                    <title>{pageTitle}</title>
                    <meta name="description" content="Description of AddDevice" />
                </header>

                <Container fixed className={classes.ContainerWrapper}>
                    <Card className={classes.card}>
                        <CardContent className={classes.cardBody}>
                            <Typography variant={'h6'} className={classes.sectionHeader}>
                                {`Add Device to`}
                            </Typography>
                            <Typography variant={'body2'} className={classes.sectionHeader}>
                                {'Fields marked with an asterisk(*) are required when adding a Device.'}
                            </Typography>
                            {fields ? fields.map((field: any, i: number) => <Element key={i} field={field} />) : null}
                        </CardContent>
                    </Card>
                </Container>
            </React.Fragment>
        </FormContext.Provider>
    );
};
