export interface UserObject{
    type: string,
    id: number,
    attributes: UserAttributes
}

export interface UserAttributes{
    'first-name': string,
    'last-name': string
}
