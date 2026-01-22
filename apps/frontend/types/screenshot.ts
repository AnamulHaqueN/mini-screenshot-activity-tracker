// For admin Dashboard
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

export interface GroupedScreenshots {
  [hour: number]: {
    [minuteBucket: number]: Screenshot[];
  };
}

export interface ScreenshotGroupedResponse {
  date: string;
  statistics: {
    totalScreenshots: number;
  };
  screenshots: GroupedScreenshots;
}

export interface ScreenshotResponse {
  meta: PaginationMeta;
  data: Screenshot[];
}