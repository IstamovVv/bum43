// types/categories.ts
export interface Category {
    name: string
    image: any
}

export interface Subcategory {
    id: string | number
    slug: string
    title: string
    itemCount: number
}

export interface Brand {
    id: string | number
    slug: string
    title: string
    country: string
    countryFlag: string
}

export interface CatalogData {
    categories: Category[]
    brands: Brand[]
}