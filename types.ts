export type InputChangeEventHandler = React.ChangeEvent<HTMLInputElement>
export type FormEventHandler = React.FormEvent<HTMLFormElement>

export interface IProduct {
    productId: string,
    image: IImage | string,
    name: string,
    description: string,
    priceId: string,
    unitAmount: number,
    currency: string,
    category: 'men' | 'women' | 'kid',
    _id?: string
}

export interface IImage{
    name: string,
    type: string,
    file: string,
    size: number
}

export type CategoryQuery = 'men' | 'women' | 'kid'