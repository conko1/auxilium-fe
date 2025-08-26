import {CrudService} from "@/services/generic-crud-service";
import {ContactUs} from "@/types/contact-us-types";


export class ContactUsService extends CrudService<ContactUs> {
    constructor() {
        const _baseUrl = "contact-us";
        super(_baseUrl);
    }

    override async remove(id: number): Promise<void> {
        throw new Error("Not allowed.");
    }
}
