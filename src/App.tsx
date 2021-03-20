import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import './App.css'
import Container from '@material-ui/core/Container';
import BarKeep from './BarKeep'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                verticalAlign: 'initial'
            }
        },
        header: {
            textAlign: 'center'
        }
    })
);

const App: React.StatelessComponent<{}> = () => {

    const classes = useStyles();
    return (
        <Container>
            <h1 className={classes.header}>Welcome to Bar Keep</h1>
            <BarKeep />
        </Container>
    )
};

export default App;