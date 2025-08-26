export interface ContactUs {
    id?: number,
    created_at?: Date,
    mailed_back?: boolean
    email?: string
    body?: string | null
    recipient_name?: string
}