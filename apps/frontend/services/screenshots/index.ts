
import api from "@/http/axios";
import { ApiErrorShape } from "@/types/error";
import { ScreenshotGroupedResponse } from "@/types/screenshot";

export const screenshotService = {

  async upload(screenshot: File) {
    const formData = new FormData();
    formData.append("screenshot", screenshot);

    const response = await api.post<ApiErrorShape>("/api/employee/screenshots", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  },

  async getGroupedScreenshots(
    employeeId: number,
    date: string
  ) {
   console.log(employeeId, date)
    const response = await api.get<ScreenshotGroupedResponse>("/api/admin/screenshots/grouped", {
      params: { employeeId, date },
    });
    return response.data;
  },

  async getByHour(employeeId: number, date: string, hour: number) {
    const response = await api.get("/screenshots/by-hour", {
      params: { employeeId, date, hour },
    });
    return response.data.data;
  },
};