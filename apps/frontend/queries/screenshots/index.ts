import { screenshotService } from "@/services/screenshots";
import { ApiError } from "@/types/error";
import { useMutation, useQuery } from "@tanstack/react-query"

export const useUpload = () => {
    return useMutation({
        mutationFn: screenshotService.upload,
        retry: false,
        onSuccess: () => {},
        onError: (error: ApiError) => {
            console.error(error.response?.data?.message || "Failed to upload screenshots")
        }
    })
}

export const useScreenshot = (employeeId: number) => {
    return useQuery({
        queryKey: ["screenshots", employeeId],
        queryFn: () => screenshotService.getScreenshots(employeeId),
        retry: false,
        staleTime: 5000 // for 5 second
    })
}