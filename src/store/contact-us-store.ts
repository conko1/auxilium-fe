import { defineStore } from "pinia";
import { useValidation } from "./use-validation";
import { ref } from "vue";
import {ContactUsService} from "@/services/contact-us-service";
import {ContactUs} from "@/types/contact-us-types";

const contactUsService = new ContactUsService();

export const useContactUsStore = defineStore("contactUs", () => {
    const { loading, error, run } = useValidation();
    const contactUses = ref<ContactUs[]>([]);

    const actions = {
        async fetchAll() {
            await run(async () => {
                contactUses.value = await contactUsService.getAll();
            });
        },

        async createContactUs(draft: ContactUs) {
            await run(async () => {
                const created = await contactUsService.create(draft);
                contactUses.value.push(created);
                return created;
            });
        },

        async patchContactUs(id: number, partial: ContactUs) {
            return await run(async () => {
                const patched = await contactUsService.patch(id, partial);
                const i = contactUses.value.findIndex((c) => c.id === id);
                if (i !== -1) {
                    contactUses.value[i] = patched;
                    return patched;
                }
            });
        },
    };

    return {
        loading,
        contactUses,
        error,

        ...actions,
    };
});
