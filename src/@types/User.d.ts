export interface UserObject{
    type: string,
    id: string,
    attributes: UserAttributes
}

export interface UserAttributes{
    'first-name': string,
    'last-name': string
}

export interface UserItem{
    id: string
    details: string
}
