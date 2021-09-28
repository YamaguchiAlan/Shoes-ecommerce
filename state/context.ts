import { createContext, Dispatch } from "react"
import { CartActions } from "./actions"
import { CartState, initialCartState } from "./reducer"

export const CartContext = createContext<{
    state: CartState;
    dispatch: Dispatch<CartActions>
}>({
    state: initialCartState,
    dispatch: () => undefined
})