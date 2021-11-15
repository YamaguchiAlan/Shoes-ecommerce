import {CartActions, ActionType, IAddToCart, IRemoveFromCart, IResetCart, IIncreaseQuantity, IDecreaseQuantity} from './actions'

export interface CartItem {
    id: string,
    quantity: number
}

export interface CartState {
    products: CartItem[]
}

export const initialCartState: CartState = {
    products: []
}

export function cartReducer(state: CartState, action:CartActions ) {
    switch (action.type) {
        case ActionType.AddToCart:{
            const index: number = state.products.findIndex(e => e.id === action.productId)

            if(index > -1){
                const newProducts: CartItem[] = [...state.products]
                newProducts[index].quantity++

                return {
                    products: newProducts
                }
            } else{
                const newProduct: CartItem = {
                    id: action.productId,
                    quantity: 1
                }
                return {
                    products: [...state.products, newProduct]
                }
            }
        }
        case ActionType.RemoveFromCart:{
            return {
                products: state.products.filter(e => e.id !== action.productId)
            }
        }
        case ActionType.ResetCart:{
            return initialCartState
        }
        case ActionType.IncreaseQuantity:{
            const index: number = state.products.findIndex(e => e.id === action.productId)

            if(index > -1){
                const newProducts: CartItem[] = [...state.products]
                newProducts[index].quantity++

                return {
                    products: newProducts
                }
            } else{
                return state
            }
        }
        case ActionType.DecreaseQuantity:{
            const index: number = state.products.findIndex(e => e.id === action.productId)

            if(index > -1){
                const newProducts: CartItem[] = [...state.products]
                newProducts[index].quantity--

                return {
                    products: newProducts
                }
            } else{
                return state
            }
        }
        default:
            return state;
    }
}

export const addToCart = (id: string): IAddToCart => ({
    type: ActionType.AddToCart,
    productId: id
})

export const removeFromCart = (id: string): IRemoveFromCart => ({
    type: ActionType.RemoveFromCart,
    productId: id
})

export const resetCart = (): IResetCart => ({
    type: ActionType.ResetCart
})

export const increaseQuantity = (id: string): IIncreaseQuantity => ({
    type: ActionType.IncreaseQuantity,
    productId: id
})

export const decreaseQuantity = (id: string): IDecreaseQuantity => ({
    type: ActionType.DecreaseQuantity,
    productId: id
})