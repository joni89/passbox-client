export interface DataTableHeader {
	text: string;
	value: string;
	align?: 'left' | 'center' | 'right';
	sortable?: boolean;
	class?: string[] | string;
	width?: string;
}

export interface DataTablePagination {
	descending?: boolean;
	page?: number;
	rowsPerPage?: number; // -1 for All"
	sortBy?: string;
	totalItems?: number;
}

export type CustomFilter<T> = (items: T[]) => T[];

export type CustomSort<T> = (items: T[], field: string, isDescending: boolean) => T[];

export type ValidationRule<T> = (value: T) => true | string;
