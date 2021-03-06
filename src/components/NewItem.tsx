import React, { useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { DrinkQueryItem } from './DrinkQueryBuilder';
import Product from '../types/Product';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            alignItems: 'center',
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                alignItems: 'initial'
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

type NewItemProps = {
    addItem: (item: DrinkQueryItem) => void,
    options: Product[]
}


export default (props: NewItemProps) => {
    const classes = useStyles();
    const [value, setValue] = useState("");
    const [priority, setPriority] = useState("REQUIRED");
    return (
        <div className={classes.root}>
            <TextField select className={classes.context} variant="standard" value={priority} onChange={(event) => {
                console.log("CHANGE", event.target, event.target.value);
                setPriority(event.target.value);
            }}>
                <MenuItem value="REQUIRED">
                    Must have
                            </MenuItem>
                <MenuItem value="OPTIONAL">
                    Can have
                            </MenuItem>
            </TextField>
            <Autocomplete
                id="combo-box-demo"
                options={props.options}
                getOptionLabel={(option: Product) => option.name}
                openOnFocus={false}
                inputValue={value}
                style={{ width: 300 }}
                renderInput={(params: any) => <TextField {...params} label="Combo box" variant="outlined" />}
                onInputChange={(_event, value, reason) => reason == "reset" ? setValue("") : setValue(value)}
                onChange={(_event, item: Product) => {
                    if (item) {
                        props.addItem({ priority, item });
                        setValue("");
                        setPriority("REQUIRED");
                    }
                }}
            />
        </div>
    )
}