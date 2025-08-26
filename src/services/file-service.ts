import {CrudService} from "@/services/generic-crud-service";
import {UploadedFile} from "@/types/file-types";
import api from "@/services/config/api-config";
import {normalizeError} from "@/services/errors";


export class FileService extends CrudService<UploadedFile> {
    constructor() {
        const _baseUrl = "files";
        super(_baseUrl);
    }

    async create(draft: UploadedFile): Promise<UploadedFile> {
        throw new Error("Not implemented, use uploadFile(file: File) instead.");
    }

    async uploadFile(file: File): Promise<UploadedFile> {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const response = await api.post<UploadedFile>(`/${super.getBaseUrl()}/`, formData);
            return response.data
        } catch (e) {
            throw normalizeError(e);
        }
    }

    async renameFile(id: number, partial: FormData): Promise<UploadedFile> {
        try {
            const response = await api.patch<UploadedFile>(`/${this._baseUrl}/${id}/`, partial);
            return response.data
        } catch (e) {
            throw normalizeError(e);
        }
    }
}
