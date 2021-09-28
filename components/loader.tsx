import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    backLoader: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
    },
    loader: {
        border: "10px solid #42a5f7bb",
        borderTop: "10px solid #0d83e4",
        borderRadius: "50%",
        width: "45px",
        height: "45px",
        animation: `$spin 2s linear infinite`
    },
    "@keyframes spin": {
        "0%": {
            transform: "rotate(0deg)"
        },
        "100%": {
            transform: "rotate(360deg)"
        }
    }
})

const Loader: React.FC = () => {
    const classes = useStyles()

    return (
        <div className={classes.backLoader}>
            <div className={classes.loader}></div>
        </div>
    )
}

export default Loader