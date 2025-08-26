import {CrudService} from "@/services/generic-crud-service";
import api from "@/services/config/api-config";
import {normalizeError} from "@/services/errors";
import {GalleryFile} from "@/types/gallery-types";


export class GalleryService extends CrudService<GalleryFile> {
    constructor() {
        const _baseUrl = "gallery";
        super(_baseUrl);
    }

    async create(draft: GalleryFile): Promise<GalleryFile> {
        throw new Error("Not implemented, use uploadFile(file: File) instead.");
    }

    async uploadFile(file: File): Promise<GalleryFile> {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const response = await api.post<GalleryFile>(`/${super.getBaseUrl()}/`, formData);
            return response.data
        } catch (e) {
            throw normalizeError(e);
        }
    }
}
