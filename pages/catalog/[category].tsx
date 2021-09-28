import Layout from '../../components/layout'
import ProductsCard from '../../components/productsCard'
import {GetStaticPaths, GetStaticProps} from 'next'
import { QueryClient, useQuery } from 'react-query'
import { dehydrate, DehydratedState } from 'react-query/hydration'
import {ParsedUrlQuery} from 'querystring'
import * as api from '../../endpoints/endpoints'
import {InputChangeEventHandler, CategoryQuery} from '../../types'

import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));

interface Props {
    category: CategoryQuery,
    dehydratedState: DehydratedState
}

interface PathParams extends ParsedUrlQuery {
    category: CategoryQuery
}

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
    return {
        paths: [
            {params: { category: "men" }},
            {params: { category: "women" }},
            {params: { category: "kid" }}
        ],
        fallback: false
    }
}

export const getStaticProps: GetStaticProps<Props, PathParams> = async ({params}) => {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery(['catalog', params.category], () => api.getCatalogByCategory(params.category))

    return{
        props: {
            dehydratedState: dehydrate(queryClient),
            category: params.category
        }
    }
}

const CatalogCategory: React.FC<Props> = ({category}) => {
    const {data, isLoading, isError, error} = useQuery(['catalog', category], () => api.getCatalogByCategory(category))

    const classes = useStyles();
    const [age, setAge] = useState<string | null>(null);

    const handleChange = (event: InputChangeEventHandler): void => {
      setAge(event.target.value);
    };

    if(isLoading){
        return <span>'Loading...'</span>
    }

    if(isError){
        console.log(error)
    }

    return(
        <Layout>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="sort-label">SORT BY</InputLabel>
                <Select
                    labelId="sort-label"
                    id="sort-select"
                    value={age}
                    onChange={handleChange}
                    label="SORT BY"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Price Low To High</MenuItem>
                    <MenuItem value={20}>Price High To Low</MenuItem>
                    <MenuItem value={30}>Product Name A-Z</MenuItem>
                    <MenuItem value={30}>Product Name Z-A</MenuItem>
                </Select>
            </FormControl>
            <ProductsCard products={data}/>
        </Layout>
    )
}

export default CatalogCategory