import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import './App.css'
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import DrinkQueryBuilder from './DrinkQueryBuilder';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                verticalAlign: 'initial'
            }
        },
        context: {
            width: '14ch'
        },
        input: {
            minWidth: '25ch'
        }
    }),
);

const App: React.StatelessComponent<{}> = () => {

    const classes = useStyles();
    return (
        <Container>
            <h1>Welcome to Bar Keep</h1>
            <Box>
                <DrinkQueryBuilder />
            </Box>
        </Container>
    )
};

export default App;