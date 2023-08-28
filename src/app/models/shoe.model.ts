export interface Shoe {
    _id: string
    name: string
    type?: string
    createdAt?: number
    price: number
    image: string
    description: string
}

export interface FilterBy {
    term: string

}