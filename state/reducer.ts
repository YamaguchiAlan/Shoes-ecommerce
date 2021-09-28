import {CartActions, ActionType, IAddToCart, IRemoveFromCart, IResetCart} from './actions'

export interface CartState {
    products: string[]
}

export const initialCartState: CartState = {
    products: []
}

export function cartReducer(state: CartState, action:CartActions ) {
    switch (action.type) {
        case ActionType.AddToCart:
            return {
                products: [...state.products, action.productId]
            }
        case ActionType.RemoveFromCart:
            return {
                products: state.products.filter(id => id !== action.productId)
            }
        case ActionType.ResetCart:
            return initialCartState

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