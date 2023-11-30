import React, { useEffect, useState } from 'react';
import { Card, Container, CardContent, Typography, Button, CardActions, Grid, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useStyles } from './styles';
import formData from '@fiji/common/src/constants/formElement.json';
import { useForm } from 'react-hook-form';
import Element from './Element';

export const ReactFormHook: React.FC = () => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [elements, setElements] = useState(null);
    const {
        handleSubmit,
        reset,
        control,
        formState: { isDirty, isValid },
    } = useForm({ mode: 'onChange' });

    useEffect(() => {
        setElements(formData[0]);
    }, []);
    const { fields, pageTitle } = elements ?? {};

    const onSubmit = (data: any): void => console.log(data);

    return (
        <React.Fragment>
            <header>
                <title>{pageTitle}</title>
                <meta name="description" content="Description of AddDevice" />
            </header>

            <Container fixed className={classes.ContainerWrapper}>
                <Card className={classes.card}>
                    <CardContent className={classes.cardBody}>
                        <Typography variant={'h6'} className={classes.sectionHeader}>
                            {`Add Device`}
                        </Typography>
                        <Typography variant={'body2'} className={classes.sectionHeader}>
                            {'Fields marked with an asterisk(*) are required when adding a Device.'}
                        </Typography>

                        {fields
                            ? fields.map((field: any, i: number) => <Element key={i} field={field} control={control} />)
                            : null}
                    </CardContent>
                    <CardActions className={classes.cardFooter}>
                        <Grid container>
                            <Grid item xs={3}>
                                <Button variant={'outlined'} onClick={(): void => reset()}>
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item xs={9}>
                                <Stack spacing={2} direction={'row'} justifyContent={'flex-end'}>
                                    <Button
                                        variant={'contained'}
                                        disabled={!isDirty || !isValid}
                                        onClick={handleSubmit(onSubmit)}
                                    >
                                        Save Device
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Container>
        </React.Fragment>
    );
};
