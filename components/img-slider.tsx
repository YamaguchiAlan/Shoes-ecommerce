import {useState, useEffect} from 'react'
import { MobileStepper, Button } from '@material-ui/core'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'

const ImgSlider: React.FC = () => {
    const [activeStep, setActiveStep] = useState<number>(0)

    //useEffect(() => {
    //    setInterval(() => {
        //    handleNext()
    //    }, 7000);
    //}, [])

    const handleNext = (): void => {
        setActiveStep((prevState: number) => {
            if(prevState < 4){
                return prevState + 1
            } else{
                return 0
            }
        })
    }

    const handleBack = (): void => {
        setActiveStep((prevValue: number) => {
            if(prevValue === 0){
                return 4
            } else{
                return prevValue - 1
            }
        })
    }

    return(
        <div className="image-slider">

            <img src={`/img/slider-${activeStep + 1}.jpg`} alt="image-slider" id="slider"/>



            <MobileStepper
                steps={5}
                position="static"
                variant="dots"
                activeStep={activeStep}
                nextButton={
                    <Button onClick={handleNext}>
                        <KeyboardArrowRight/>
                    </Button>
                }
                backButton={
                    <Button onClick={handleBack}>
                        <KeyboardArrowLeft/>
                    </Button>
                }
            />
        </div>
    )
}

export default ImgSlider