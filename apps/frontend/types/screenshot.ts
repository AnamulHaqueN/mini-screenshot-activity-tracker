export interface Screenshot {
  id: number;
  fileUrl: string;
  capturedAt: string;
}

export interface PaginationMeta {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  firstPage: number;
  firstPageUrl: string;
  lastPageUrl: string;
  nextPageUrl: string | null;
  previousPageUrl: string | null;
}

export interface GroupedScreenshotsInfo {
   hour: number,
   minuteBucket: number,
   timeRange: string,
   count: number,
   screenshots: Screenshot[]
}

export interface ScreenshotGroupedResponse {
  employee: {
   id: number;
   name: string;
  };
  date: string;
  statistics: {
   hoursActive: number;
   totalScreenshots: number;
  };
  groupedScreenshotsArray: GroupedScreenshotsInfo[];
}