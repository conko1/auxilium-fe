import { defineStore } from "pinia";
import { useValidation } from "./use-validation";
import { ref } from "vue";
import {FileService} from "@/services/file-service";
import {UploadedFile} from "@/types/file-types";

const fileService = new FileService();

export const useFilesStore = defineStore("files", () => {
    const { loading, error, run } = useValidation();
    const files = ref<UploadedFile[]>([]);

    const logged = ref(false);

    const actions = {
        async fetchAll() {
            await run(async () => {
                files.value = await fileService.getAll();
            });
        },

        async uploadFile(file: File) {
            return run(async () => {
                const fileUploaded = await fileService.uploadFile(file);
                files.value.push(fileUploaded);
                return fileUploaded;
            });
        },

        async renameFile(id: number, partial: FormData) {
            return run(async () => {
                const file = await fileService.renameFile(id, partial);
                const i = files.value.findIndex((f) => f.id === id);
                if (i !== -1) {
                    files.value[i] = file;
                    return file;
                }
            });
        },

        async removeFile(id: number) {
            await run(async () => {
                const i = files.value.findIndex((f) => f.id === id);
                if (i !== -1) {
                    await fileService.remove(id);
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
