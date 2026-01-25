export interface Screenshot {
  id: number;
  filePath: string;
  captureTime: string;
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

interface GroupedScreenshots {
  [hour: string]: {
    [minuteBucket: string]: Screenshot[];
  };
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
  screenshots: GroupedScreenshots;
}

export interface ScreenshotGroup {
  hour: number;
  minuteBucket: number;
  timeRange: string;
  count: number;
  screenshots: Screenshot[];
}