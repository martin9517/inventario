import { HttpParams } from "@angular/common/http";
import { APIParams, QueryParams } from "../models/rest.model";

export abstract class Utils {
    static isNotEmpty(arr: Array<any>): boolean {
        return arr && arr.length > 0;
    }

    static buildParams(queryParams?: QueryParams): HttpParams {
        // TODO: see how to build filter params. search & search_by do not support arrays.
        let options = new HttpParams();
        if (queryParams) {
            const search = queryParams.search;
            if (search) {
                options = options.set(APIParams.SEARCH, search);
            }
            const searchBy = queryParams.searchBy;
            if (searchBy) {
                options = options.set(APIParams.SEARCH_BY, searchBy);
            }
            const orderBy = queryParams.orderBy;
            if (orderBy) {
                options = options.set(APIParams.ORDER_TYPE,
                    orderBy.order ? orderBy.order.toUpperCase() : 'ASC');
                options = options.set(APIParams.ORDER_BY, orderBy.field);
            }
            const limit = queryParams.limit;
            if (limit) {
                options = options.set(APIParams.LIMIT, String(limit));
            }
            const skip = queryParams.skip;
            if (skip && !isNaN(skip)) {
                options = options.set(APIParams.SKIP, String(skip));
            }
            const except = queryParams.except;
            if (except) {
                options = options.set(APIParams.EXCEPT, String(except));
            }
            const filters = queryParams.filters;
            if (filters && this.isNotEmpty(filters)) {
                for (const filter of filters) {
                    options = options.set(filter.field, filter.value);
                }
            }
        }

        return options;
    }
}