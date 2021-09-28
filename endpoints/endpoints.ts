import axios, {AxiosInstance, AxiosError} from 'axios'
import {NextApiResponse} from 'next'
import {CategoryQuery, IProduct} from '../types'

export type Error = AxiosError

export interface ISuccessResponse {
    success: boolean,
    message: string
}

interface IApiError {
    error: string
}

export type ApiResponse<T> = NextApiResponse<T | IApiError | Error>

const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api'
})

export const getCatalogByCategory = (category: CategoryQuery): Promise<IProduct[]>  => (
    api.get(`/catalog/${category}`).then(res => res.data)
)

export const uploadProduct = (data: IProduct): Promise<{success: boolean, message: string}> => (
    api.post('/product', data).then(res => res.data)
)

export const getProduct = (id: string): Promise<IProduct> => (
    api.get(`/product/${id}`).then(res => res.data)
)

export const getCartProducts = (products: string[]): Promise<IProduct[]> => (
    Promise.all(products.map(id => (
        api.get(`/product/${id}`).then(res => res.data)
    )))
)