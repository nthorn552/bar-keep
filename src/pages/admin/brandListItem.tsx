import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Brand from '../../types/Brand';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(1),
            // '& .MuiTextField-root': {
            //     verticalAlign: 'initial'
            // }
        },
        active: {
            backgroundColor: 'lightblue'
        }
    }),
);

type BrandListItemProps = {
    brand: Brand,
    isActive?: boolean,
    clickHandler: (brand: Brand) => void
}



export default (props: BrandListItemProps) => {
    const classes = useStyles();
    return (
        <li onClick={() => props.clickHandler(props.brand)}>{props.brand.name}
        <img src={props.brand.logoUrl} width="100" height="100"></img>
        <img src="https://seeklogo.com/images/S/smirnoff-vodka-logo-5E990FA860-seeklogo.com.png" width="100" height="100"></img>
        https://seeklogo.com/images/S/smirnoff-vodka-logo-5E990FA860-seeklogo.com.png
        </li>
    )
}


