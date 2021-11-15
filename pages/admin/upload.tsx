import { useState, useRef } from 'react'
import Layout from '../../components/layout'
import { FormControl, TextField, Button, makeStyles,
        FormLabel, RadioGroup, Radio, FormControlLabel, InputAdornment } from '@material-ui/core'
import UploadIcon from '@material-ui/icons/CloudUpload'
import {FormEventHandler, IProduct, IImage} from '../../types'
import * as api from '../../endpoints/endpoints'
import { useMutation } from 'react-query'

const useStyles = makeStyles({
    input: {
        display: "none"
    },
    img: {
        width: "100%",
        height: "170px",
        objectFit: "cover"
    },
    backImg: {
        overflow: "hidden"
    }
})

const UploadItem: React.FC = () => {
    const classes = useStyles()

    const {mutateAsync, isLoading, isError, error} = useMutation<api.ISuccessResponse, api.Error, IProduct>(api.uploadProduct)

    const [product, setProduct] = useState<IProduct | null>(null)
    const imageInputRef = useRef<HTMLInputElement | null>(null)

    const formChange = (event: FormEventHandler) => {
        const { name, value, type} = (event.target as HTMLInputElement)

        if(type === "file"){
            const file = (event.target as HTMLInputElement).files[0];
            if (file.type.split('/')[0] !== 'image') {
                alert("Please Upload An Image")
            } else{
                const myReader: FileReader = new FileReader();

                myReader.onloadend = (e) => {

                    const imageObject: IImage =  {
                        file: myReader.result.toString(),
                        name: file.name,
                        size: file.size,
                        type: file.type.split('/')[1]
                    };

                    (document.getElementById("preview-image") as HTMLImageElement).src = imageObject.file

                    const newValue: IProduct  = {
                        ...product,
                        image: imageObject
                    }
                    setProduct(newValue)
                };
                myReader.readAsDataURL(file);
            }
        } else{
            const newValue: IProduct = {
                ...product,
                [name]: type === 'number' ? parseFloat(value).toFixed(2) : value
            }
            setProduct(newValue)
        }
    }

    const submitForm = async (e: FormEventHandler) => {
        e.preventDefault()

        await mutateAsync(product)
    }

    const clickSubmitButton = (): void => {
        document.getElementById('submit-button').click()
    }

    return (
        <Layout noFooter >
            <FormControl fullWidth>
                <form onChange={formChange} onSubmit={submitForm}>
                    <FormLabel component="label" >Category</FormLabel>
                    <RadioGroup aria-label="category" name="category" value={product?.category}>
                        <FormControlLabel value="men" control={<Radio required/>} label="Men" />
                        <FormControlLabel value="women" control={<Radio required/>} label="Women" />
                        <FormControlLabel value="kid" control={<Radio required/>} label="Kid" />
                    </RadioGroup>

                    <div>
                        <input type="file" accept="image/*" name="image" className={classes.input} ref={imageInputRef} required/>
                        <div className={classes.backImg}>
                            <img src="/img/default-placeholder.png" alt="default" id="preview-image" className={classes.img}/>
                        </div>
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<UploadIcon />}
                            onClick={() => imageInputRef.current.click()}
                        >
                            Upload Image
                        </Button>
                    </div>

                    <TextField
                        label="Name"
                        name="name"
                        placeholder="Product Name"
                        fullWidth
                        variant="filled"
                        required
                    />

                    <TextField
                        label="Description"
                        name="description"
                        placeholder="Short Description"
                        fullWidth
                        variant="filled"
                        required
                    />

                    <TextField
                        label="Price"
                        name="unitAmount"
                        type="number"
                        variant="filled"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          }}
                        value={product?.unitAmount}
                        required
                    />
                    <button type="submit" id="submit-button" className={classes.input}></button>
                </form>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={clickSubmitButton}
                    >
                        Upload
                    </Button>

            </FormControl>
        </Layout>
    )
}

export default UploadItem