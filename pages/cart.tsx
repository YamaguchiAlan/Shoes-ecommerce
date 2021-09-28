import React, {useContext} from "react"
import {getCartProducts} from "../endpoints/endpoints"
import { Typography, Paper, Card, CardMedia, CardContent, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import Layout from "../components/layout"
import { CartContext } from "../state/context"
import { useQuery } from "react-query"
import { removeFromCart } from "../state/reducer"

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    card: {
        display: 'flex',
        flexDirection: 'row',
        padding: '0 5px'
    },
    summary: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardContent: {
        width: "100%",
        padding: "10px !important"
    },
    name: {
        marginBottom: "5px"
    },
    image: {
        width: '200px'
    },
    button: {
        width: '100%'
    }
})

const Cart: React.FC = () => {
    const classes = useStyles()
    const {state, dispatch} = useContext(CartContext)

    const {data, isLoading, isError, error} = useQuery(['cart', state.products],() => getCartProducts(state.products))

    if(isLoading){
        return <div>
            Loading...
        </div>
    }

    if(isError){
        return <div>
            Error
        </div>
    }

    return(
        <Layout noFooter>
            <div>
                <Typography variant="h5">
                    Cart({state.products.length})
                </Typography>
                <Paper className={classes.root}>
                    { data[0] &&
                        data.map(product => (
                            <Card className={classes.card}>
                                <CardMedia
                                    image={product.image.file}
                                    className={classes.image}
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography variant="h6" className={classes.name}>
                                        {product.name}
                                    </Typography>
                                    <div className={classes.summary}>
                                        <Button variant="outlined" size="small" onClick={() => dispatch(removeFromCart(product._id))}>
                                            Remove
                                        </Button>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            ${product.price}
                                        </Typography>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    }
                </Paper>
                <div>
                    <Typography variant="h5">
                        ORDER SUMMARY ({data.length} item{data.length > 1 && "s"})
                    </Typography>
                    <hr />
                    <div className={classes.summary}>
                        <Typography variant="subtitle1">
                            SUBTOTAL
                        </Typography>
                        <Typography variant="subtitle1">
                            ${data.map(e => e.price).reduce((a, b) => a + b, 0)}
                        </Typography>
                    </div>
                    <div className={classes.summary}>
                        <Typography variant="subtitle1">
                            SHIPPING
                        </Typography>
                        <Typography variant="subtitle1">
                            FREE
                        </Typography>
                    </div>
                    <hr/>
                    <Button variant="contained" color="secondary" className={classes.button} size="large">
                        Checkout
                    </Button>
                </div>
            </div>
        </Layout>
    )
}

export default Cart