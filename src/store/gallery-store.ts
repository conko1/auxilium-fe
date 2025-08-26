import { defineStore } from "pinia";
import { useValidation } from "./use-validation";
import { ref } from "vue";
import {GalleryService} from "@/services/gallery-service";
import {GalleryFile} from "@/types/gallery-types";

const galleryService = new GalleryService();

export const useGalleryStore = defineStore("gallery", () => {
    const { loading, error, run } = useValidation();
    const files = ref<GalleryFile[]>([]);

    const logged = ref(false);

    const actions = {
        async fetchAll() {
            await run(async () => {
                files.value = await galleryService.getAll();
            });
        },

        async uploadFile(file: File) {
            return run(async () => {
                const fileUploaded = await galleryService.uploadFile(file);
                files.value.push(fileUploaded);
                return fileUploaded;
            });
        },

        async removeFile(id: number) {
            await run(async () => {
                const i = files.value.findIndex((f) => f.id === id);
                if (i !== -1) {
                    await galleryService.remove(id);
                    files.value.splice(i, 1);
                }
            });
        },
    };

    return {
        logged,
        files,
        loading,
        error,

        ...actions,
    };
});
