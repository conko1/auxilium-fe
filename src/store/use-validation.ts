import { ref } from 'vue'
import { HttpError } from '@/services/errors'

export function useValidation() {
    const loading = ref(false)
    const error = ref<string | null>(null)

    function resetValidation() {
        error.value = null
    }

    function capture(e: unknown): 'http' | 'unknown' {
        if (e instanceof HttpError) {
            console.log(e);
            error.value = e.message
            return 'http'
        }
        console.log(e);
        error.value = (e as any)?.message ?? 'Unknown error'
        return 'unknown'
    }

    async function run<T>(fn: () => Promise<T>): Promise<T | null> {
        loading.value = true
        resetValidation()
        try {
            return await fn()
        } catch (e) {
            capture(e)
            return null;
        } finally {
            loading.value = false
        }
    }

    return { loading, error, resetValidation, capture, run }
}
