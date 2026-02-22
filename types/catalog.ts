// types/categories.ts
export interface Category {
    name: string
    image: string
    to?: string
    count?: number  // Количество товаров в категории
}

export interface Brand {
    id: number
    title: string
    slug: string
    country: string
    countryFlag?: string  // Опционально, если нет логотипа
    logo?: string         // URL логотипа
    productCount?: number // Количество товаров бренда
    isPopular?: boolean   // Флаг популярности
}
