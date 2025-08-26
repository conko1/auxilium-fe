export interface Id {
    id?: number,
}

export interface Category extends Id {
    name: string | null
}

export interface Content extends Id {
    title: string | null,
    body: string | null,
    category?: number,
    href?: string,
    link: string | null,
}