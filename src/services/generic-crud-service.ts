import api from "@/services/config/api-config";
import {normalizeError} from "@/services/errors";

export interface ICrudService<T> {
    getAll(): Promise<T[]>;
    create(data: T): Promise<T>;
    patch(id: number, partial: T): Promise<T>;
    remove(id: number): Promise<void>;
}

export class CrudService<T> implements ICrudService<T> {
    protected readonly _baseUrl: string;

    constructor(baseUrl: string) {
        this._baseUrl = baseUrl;
    }

    getBaseUrl() : string {
        return this._baseUrl;
    }

    async create(draft: T): Promise<T> {
        try {
            const response = await api.post<T>(`/${this._baseUrl}/`, draft);
            return response.data
        } catch (e) {
            throw normalizeError(e);
        }
    }

    async getAll(): Promise<T[]> {
        try {
            const response = await api.get<T[]>(`/${this._baseUrl}/`);
            return response.data
        } catch (e) {
            throw normalizeError(e);
        }
    }

    async patch(id: number, partial: T): Promise<T> {
        try {
            const response = await api.patch<T>(`/${this._baseUrl}/${id}/`, partial);
            return response.data
        } catch (e) {
            throw normalizeError(e);
        }
    }

    async remove(id: number): Promise<void> {
        try {
            await api.delete(`/${this._baseUrl}/${id}/`)
        } catch (e) {
            throw normalizeError(e);
        }
    }
}