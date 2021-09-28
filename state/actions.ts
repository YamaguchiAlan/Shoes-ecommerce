export enum ActionType {
    AddToCart,
    RemoveFromCart,
    ResetCart
}

export interface IAddToCart {
    type: ActionType.AddToCart,
    productId: string
}

export interface IRemoveFromCart {
    type: ActionType.RemoveFromCart,
    productId: string
}

export interface IResetCart {
    type: ActionType.ResetCart
}

export type CartActions = IAddToCart | IRemoveFromCart | IResetCart