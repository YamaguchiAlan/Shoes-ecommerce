import Layout from '../../components/layout'
import ProductsCard from '../../components/productsCard'

const Catalog: React.FC = () => {
    return(
        <Layout>
            <ProductsCard products={[{
                image: {
                    file:'',
                    name: '',
                    size: 2,
                    type: ''
                },
                name: 'string',
                price: 5,
                discount: 5,
                category: 'men'
    }]}/>
        </Layout>
    )
}

export default Catalog