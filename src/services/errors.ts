import axios from 'axios'
export class HttpError extends Error {
    status?: number
    data?: unknown
    constructor(message: string, status?: number, data?: unknown) {
        super(message);
        this.name = 'HttpError'
        this.status = status
        this.data = data
    }
}

export function normalizeError(e: unknown): never {
    if (axios.isAxiosError(e)) {
        const status = e.response?.status
        const data = e.response?.data
        const message =
            (data as any)?.message ?? e.message ?? 'Request failed'
        throw new HttpError(message, status, data);
    }
    throw new Error('Unknown error')
}
