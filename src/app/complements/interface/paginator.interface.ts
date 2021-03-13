export interface FilterWithPagination {
    data: Array<any>;
    total: number;
    totalPages: number;
    next?: string;
    previous?: string;
  }

  export interface PaginationOptionsInterface {
    limits: number;
    pages: number;
    orden: string;
    columns: string;
    filter: {
      status: number
      search: string
      //columns: string
    }
  }