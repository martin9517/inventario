/**
 * Server params:
 * offset: Number(req.query['offset']) || 0,
 * limit: Number(req.query['limit']) || API_PAGINATION_LIMIT,
 * orderType: req.query['order_type'] || 'ASC',
 * orderBy: req.query['order_by'] || null,
 * except: Number(req.query['except']) || null,
 * searchBy: req.query['search_by'] || null,
 * search: req.query['search'] || null
 */
export enum APIParams {
    LIMIT = 'limit',
    SKIP = 'skip',
    ORDER_TYPE = 'order_type',
    ORDER_BY = 'order_by',
    EXCEPT = 'except',
    SEARCH_BY = 'search_by',
    SEARCH = 'search'
}

export interface PagedResult<T> {
    values: Array<T>;
    params: QueryParams;
}

export enum QueryType {
    PAGINATION = 1,
    SEARCH = 2
}

export interface QueryParams {
    type?: QueryType;
    orderBy?: OrderBy;
    limit?: number;
    skip?: number;
    filters?: Array<Filter>;
    except?: number | string;
    searchBy?: any;
    search?: any;
    concatData?: boolean;
    // aux values for frontend paginator
    pageIndex?: number;
    totalRows?: number;
}

/**
 * A field filter,
 */
export interface Filter {
    /**
     * The actual name of the filter.
     */
    field: string;
    /**
     * The actual value.
     */
    value: any;
}

export interface FilterData {
    filters?: Array<Filter>;
    word?: string;
    search?: string;
    orderBy?: OrderBy;
    searchBy?: string;
}

export interface OrderBy {
    field: string;
    order: 'asc' | 'desc' | 'ASC' | 'DESC';
}

export interface Count {
    total: number;
}

export interface Pagination {
    page: number;
    total: number;
}

