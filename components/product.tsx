import {useContext} from 'react'
import {Card, CardActions, CardMedia, CardContent, Typography, Button} from '@material-ui/core'
import {IProduct} from '../types'
import {makeStyles} from '@material-ui/styles'
import { CartContext } from '../state/context'
import { addToCart } from '../state/reducer'

const useStyles = makeStyles({
    image: {
        height: 200
    },
    button: {
        width: "100%"
    }
})

interface Props {
    product: IProduct
}

const Product: React.FC<Props> = ({product}) => {
    const classes = useStyles()

    const { dispatch} = useContext(CartContext)

    return (
        <Card >
            <CardMedia
                image={`http://localhost:3000/api/product/image/${product.image}`}
                className={classes.image}
            />
            <CardContent>
                <Typography variant="h5" component="p">
                    {product.name}
                </Typography>
                <Typography variant="h6" color="textSecondary" component="span">
                    ${(product.unitAmount  / 100).toFixed(2)}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="large" color="secondary" variant="contained" className={classes.button}
                    onClick={() => dispatch(addToCart(product._id))}
                >
                    ADD TO CART
                </Button>
            </CardActions>
        </Card>
    )
}

export default Product