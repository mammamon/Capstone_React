import { isAxiosError } from 'axios'
import { toast } from 'react-toastify'

/**
 *
 * @param error - `any`
 * @param message - `string`
 * @description Show toast message or error
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleError = (error?: any, message?: string) => {
    if (isAxiosError<{ content: string }>(error)) {
        toast.error(message || error.response.data.content, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }
}

    