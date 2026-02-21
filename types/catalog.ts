// types/catalog.ts
export interface Category {
    id: string | number
    slug: string
    title: string
    description: string
    itemCount: number
    priceFrom?: string
    icon: string
    gradient: string
    subcategories?: Subcategory[]
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