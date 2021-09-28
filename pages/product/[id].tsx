import Layout from '../../components/layout'
import Product from '../../components/product'
import {GetStaticPaths, GetStaticProps} from 'next'
import { useQuery, QueryClient } from 'react-query'
import { dehydrate, DehydratedState } from 'react-query/hydration'
import {ParsedUrlQuery} from 'querystring'
import * as api from '../../endpoints/endpoints'
import {useRouter} from 'next/router'

interface Props {
    id: string,
    dehydratedState: DehydratedState
}

interface PathParams extends ParsedUrlQuery {
    id: string
}

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
    return {paths: [], fallback: true}
}

export const getStaticProps: GetStaticProps<Props, PathParams> = async ({params}) => {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery(['product', params.id],() => api.getProduct(params.id))

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            id: params.id
        }
    }
}

const ProductPage: React.FC<Props> = ({id}) => {
    const {data, isLoading, isError, error} = useQuery(['product', id],() => api.getProduct(id))
    const router = useRouter()

    if(router.isFallback){
        <div>Falback..</div>
    }

    if(isLoading){
        return <div>Loading...</div>
    }

    return (
        <Layout>
            <Product product={data}/>
        </Layout>
    )
}

export default ProductPage