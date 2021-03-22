export interface Page<PaginationObject> {
    content: PaginationObject[];
    meta: {
        itemCount: number;
        totalItems: number;
        itemsPerPage: number;
        totalPages: number;
        currentPage: number;
    };
}
//# sourceMappingURL=page.interface.d.ts.map