import {CrudService} from "@/services/generic-crud-service";
import {Category} from "@/types/content-types";


export class CategoryService extends CrudService<Category> {
    constructor() {
        const _baseUrl = "categories";
        super(_baseUrl);
    }
}