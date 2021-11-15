export enum ActionType {
    AddToCart,
    RemoveFromCart,
    ResetCart,
    IncreaseQuantity,
    DecreaseQuantity
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

export interface IIncreaseQuantity {
    type: ActionType.IncreaseQuantity,
    productId: string
}

export interface IDecreaseQuantity {
    type: ActionType.DecreaseQuantity,
    productId: string
}

export type CartActions = IAddToCart | IRemoveFromCart | IResetCart | IIncreaseQuantity | IDecreaseQuantity