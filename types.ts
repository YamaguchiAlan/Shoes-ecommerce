export type InputChangeEventHandler = React.ChangeEvent<HTMLInputElement>
export type FormEventHandler = React.FormEvent<HTMLFormElement>

export interface IProduct {
    image: IImage,
    name: string,
    price: number,
    discount?: number,
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