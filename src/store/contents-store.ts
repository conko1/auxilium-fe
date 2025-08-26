import { defineStore } from "pinia";
import { useValidation } from "./use-validation";
import { ref } from "vue";
import {CategoryService} from "@/services/category-service";
import {Category, Content} from "@/types/content-types";
import {ContentService} from "@/services/content-service";

const categoryService = new CategoryService();
const contentService = new ContentService();

export const useContentsStore = defineStore("contents", () => {
    const { loading, error, run } = useValidation();
    const contents = ref<Content[]>([]);
    const categories = ref<Category[]>([])

    const logged = ref(false);

    const actions = {
        async fetchAll() {
            await run(async () => {
                contents.value = await contentService.getAll();
                categories.value = await categoryService.getAll();
            });
        },

        async createContent(draft: Content) {
            return run(async () => {
                const created = await contentService.create(draft);
                contents.value.push(created);
                return created;
            });
        },

        async createCategory(draft: Category) {
            return run(async () => {
                const created = await categoryService.create(draft);
                categories.value.push(created);
                return created;
            });
        },

        async patchContent(id: number, partial: Content) {
            return run(async () => {
                const content = await contentService.patch(id, partial);
                const i = contents.value.findIndex((c) => c.id === id);
                if (i !== -1) {
                    contents.value[i] = content;
                    return content;
                }
            });
        },

        async patchCategory(id: number, partial: Category) {
            return run(async () => {
                const category = await categoryService.patch(id, partial);
                const i = categories.value.findIndex((c) => c.id === id);
                if (i !== -1) {
                    categories.value[i] = category;
                    return category;
                }
            });
        },

        async removeContent(id: number) {
            await run(async () => {
                const i = contents.value.findIndex((c) => c.id === id);
                if (i !== -1) {
                    await contentService.remove(id);
                    contents.value.splice(i, 1);
                }
            });
        },

        async removeCategory(id: number) {
            await run(async () => {
                const i = categories.value.findIndex((c) => c.id === id);
                if (i !== -1) {
                    await categoryService.remove(id);
                    categories.value.splice(i, 1);
                }
            });
        },
    };

    return {
        logged,
        categories,
        contents,
        loading,
        error,

        ...actions,
    };
});
