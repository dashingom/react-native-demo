import makeStyles from '@mui/styles/makeStyles';
import * as Colors from '@brightlayer-ui/colors';
import { Theme } from '@mui/material/styles';

export const useStyles = makeStyles((theme: Theme) => ({
    ContainerWrapper: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(10),
        [theme.breakpoints.down('sm')]: {
            padding: 0,
        },
    },
    card: {
        position: 'relative',
        [theme.breakpoints.down('sm')]: {
            paddingTop: theme.spacing(2),
            padding: '0',
            maxWidth: 'none',
            width: '100%',
        },
    },
    cardBody: {
        padding: theme.spacing(3),
        position: 'relative',
        [theme.breakpoints.down('sm')]: {
            padding: '16px 16px 0px 16px',
            marginBottom: theme.spacing(6),
        },
    },
    cardFooter: {
        padding: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2),
            boxShadow:
                '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
        },
    },
    sectionHeader: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    formControl: {
        marginBottom: '36px',
    },
    divider: {
        marginTop: '48px',
    },
    topDivider: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(2),
    },
    muiDialogpaper: {
        '& .MuiPaper-root': {
            width: '450px',
            maxWidth: '450px',
        },
    },
    MuiDialogActionsRoot: {
        padding: '24px',
        borderTop: '1px solid rgba(66, 78, 84, 0.12)',
    },
    discardButton: {
        background: Colors.red[600],
        '&:hover': {
            backgroundColor: Colors.red[400],
        },
    },
}));
