export interface FilterWithPagination {
    data: Array<any>;
    total: number;
    totalPages: number;
    next?: string;
    previous?: string;
  }

  export interface PaginationOptionsInterface {
    limits: string;
    pages: string;
  }