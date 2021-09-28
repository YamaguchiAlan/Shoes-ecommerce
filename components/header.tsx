import {useContext} from 'react'
import Link from 'next/link'
import { AppBar, Toolbar, Typography, IconButton, Badge } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import ShopIcon from '@material-ui/icons/ShoppingCart'
import { makeStyles } from '@material-ui/core'
import { CartContext } from '../state/context'

const useStyles = makeStyles((theme) => ({
    logoContainer: {
        flexGrow: 1,
        display: "flex",
        justifyContent: "flex-start",
    },
    logo: {
        lineHeight: "110%",
        fontWeight: 600
    },
    button: {
        padding: "0 0.5rem"
    }
}))

const Header: React.FC = () => {
    const classes = useStyles()

    const {state} = useContext(CartContext)

    return (
    <AppBar position="static">
        <Toolbar>
            <div className={classes.logoContainer}>
                <Link href="/">
                    <div className="header-logo">
                        <Typography variant="h6" color="secondary" className={classes.logo}>
                        Happy Feet
                        </Typography>
                        <Typography variant="caption">
                        Shoes
                        </Typography>
                    </div>
                </Link>
            </div>
            <IconButton color="inherit" className={classes.button}>
                <SearchIcon/>
            </IconButton>
            <Link href="/cart">
                <IconButton color="inherit" className={classes.button}>
                    <Badge color="secondary" badgeContent={state.products.length}>
                        <ShopIcon/>
                    </Badge>
                </IconButton>
            </Link>
            <IconButton edge="end" color="inherit" className={classes.button}>
                <MenuIcon/>
            </IconButton>
        </Toolbar>
    </AppBar>
    )
}

export default Header;