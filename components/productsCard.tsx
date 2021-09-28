import Link from 'next/link'
import { makeStyles } from '@material-ui/styles'
import { CardContent, Card, CardMedia, Typography } from '@material-ui/core'
import {IProduct} from '../types'

const useStyles = makeStyles({
    root: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(175px, 1fr))",
        gap: "10px 5px"
    },
    media: {
      height: "170px"
    }
  });

interface Props {
    products: IProduct[]
}

const ProductsCard: React.FC<Props> = ({products}) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            {products &&
                products.map((props: IProduct, i: number) =>
                    <Card key={i} >
                        <Link href={`/product/${props._id}`}>
                            <CardMedia
                                className={classes.media}
                                image={props.image.file}
                            />
                        </Link>

                        <CardContent>
                            <Link href={`/product/${props._id}`}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {props.name}
                                </Typography>
                            </Link>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {`$${props.price}`}
                            </Typography>
                        </CardContent>
                    </Card>
                )
            }

        </div>
    )
}

export default ProductsCard