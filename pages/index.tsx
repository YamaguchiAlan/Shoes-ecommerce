import Image from 'next/image'
import {Typography, makeStyles} from '@material-ui/core'
import {Store} from '@material-ui/icons'

import Layout from '../components/layout'
import ImgSlider from '../components/img-slider';
import MainCollections from '../components/main-collections';
import catalogImg from '../public/img/catalog.jpg'

const useStyles = makeStyles({
  catalog: {
    textAlign: "center",
    fontWeight: 600,
    margin: "2rem 0 0.5rem 0.5rem",
    fontSize: "1.7rem"
  },
  body: {
    padding: "0 0.7rem"
  }
})

const Home: React.FC = () => {
  const classes = useStyles()

  return (
    <Layout>
      <ImgSlider/>

      <div className={classes.body}>
        <MainCollections/>

        <div className="main-catalog">
          <Typography variant="h5" className={classes.catalog}>
            VIEW ALL THE CATALOG <Store/>
          </Typography>
          <div className="catalog-img-back">
            <Image src={catalogImg} alt="catalog"/>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home