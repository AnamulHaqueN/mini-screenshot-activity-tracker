import { screenshotService } from "@/services/screenshots";
import { ApiError } from "@/types/error";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useUpload = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: screenshotService.upload,
        retry: false,
        onSuccess: () => {
            qc.invalidateQueries({queryKey: ["screenshots"]});
        },
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