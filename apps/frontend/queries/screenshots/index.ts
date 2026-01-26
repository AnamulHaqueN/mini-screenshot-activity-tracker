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

export const useScreenshots = (employeeId: number, date: string) => {
    return useQuery({
        queryKey: ["screenshots", employeeId, date],
        queryFn: () => screenshotService.getGroupedScreenshots(employeeId, date),
        retry: false,
        staleTime: 5000
    })
}