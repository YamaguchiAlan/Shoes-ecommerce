import React, {useContext} from "react"
import {getCartProducts, CartResponse} from "../endpoints/endpoints"
import { Typography, Paper, Card, CardMedia, CardContent, Button, IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import {Remove, Add} from '@material-ui/icons'
import Layout from "../components/layout"
import { CartContext } from "../state/context"
import { useQuery } from "react-query"
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../state/reducer"
import getStripe from '../utils/get-stripe'
import axios from 'axios'

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

    const checkout = async (prices: CartResponse[]) => {
        const items = prices.map(e => ({
            price: e.priceId,
            quantity: e.quantity
        }))

        const checkoutSession = await axios.post("/api/checkout", {items: items})

        const stripe = await getStripe()
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id
        })

        if(result.error){
            console.log(result.error.message)
        }
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
                                    image={`http://localhost:3000/api/product/image/${product.image}`}
                                    className={classes.image}
                                />
                                <CardContent className={classes.cardContent}>
                                    <div className={classes.summary}>
                                        <Typography variant="h6" className={classes.name}>
                                            {product.name}
                                        </Typography>
                                        <div className="flex row">
                                            <IconButton
                                                aria-label="subtract"
                                                onClick={() => dispatch(decreaseQuantity(product._id))}
                                                disabled={product.quantity <= 1}
                                            >
                                                <Remove/>
                                            </IconButton>
                                            <Typography variant="body1" className={classes.name}>
                                                {product.quantity}
                                            </Typography>
                                            <IconButton aria-label="add" onClick={() => dispatch(increaseQuantity(product._id))}>
                                                <Add/>
                                            </IconButton>
                                        </div>

                                    </div>
                                    <div className={classes.summary}>
                                        <Button variant="outlined" size="small" onClick={() => dispatch(removeFromCart(product._id))}>
                                            Remove
                                        </Button>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            ${((product.unitAmount  / 100) * product.quantity).toFixed(2) }
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
                            ${(data.map(e => e.unitAmount * e.quantity).reduce((a, b) => a + b, 0) / 100).toFixed(2)}
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
                    <Button variant="contained" color="secondary" className={classes.button} size="large" onClick={() => checkout(data)}>
                        Checkout
                    </Button>
                </div>
            </div>
        </Layout>
    )
}

export default Cart