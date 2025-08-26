import {CrudService} from "@/services/generic-crud-service";
import {Content} from "@/types/content-types";


export class ContentService extends CrudService<Content> {
    constructor() {
        const _baseUrl = "contents";
        super(_baseUrl);
    }
}
