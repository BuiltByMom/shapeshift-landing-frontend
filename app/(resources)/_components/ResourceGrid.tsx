/************************************************************************************************
 ** ResourceGrid Component & TResourceGridProps Type:

 ** This file defines the generic `ResourceGrid` component and its `TResourceGridProps` type.
 ** It is designed for displaying a responsive grid of items with standardized loading and
 ** empty state handling.

 ** `TResourceGridProps<T>` Type:
 ** - A generic type defining the props for the `ResourceGrid` component.
 ** - Type Parameter `T`: Represents the type of items the grid will render.
 ** - Fields:
 **   - items: An array of items of type `T`, or `null`/`undefined`.
 **   - renderItem: A function that takes an item of type `T` and its index, returning a
 **     `ReactNode` for that item's display in the grid.
 **   - isLoading: Optional boolean, true if data is loading (defaults to `false`).
 **   - emptyMessage: Optional string for the empty state (defaults to "No items available
 **     yet.").
 **   - className: Optional string for additional CSS classes on the grid container.

 ** `ResourceGrid<T>` Function:
 ** - A reusable component for displaying items in a grid.
 ** - Handles loading states by showing a placeholder.
 ** - Handles empty states by displaying the `emptyMessage`.
 ** - Allows custom rendering of each item via the `renderItem` prop.
 ** - The grid layout is responsive (md:grid-cols-2, lg:grid-cols-3).
 ************************************************************************************************/

import type {ReactElement, ReactNode} from 'react';

/************************************************************************************************
 ** TResourceGridProps Type:

 ** Defines the props for the generic `ResourceGrid` component.

 ** Type Parameters:
 ** - T: The type of items that the grid will render.

 ** Fields:
 ** - items: An array of items of type `T`, or `null`/`undefined` if no items are available.
 ** - renderItem: A function that takes an item of type `T` and its index, and returns a
 **   `ReactNode` representing how that item should be rendered in the grid.
 ** - isLoading: Optional boolean flag indicating if the data for the grid is currently loading.
 **   Defaults to `false`.
 ** - emptyMessage: Optional string message to display when the `items` array is empty or null.
 **   Defaults to "No items available yet.".
 ** - className: Optional string for applying additional CSS classes to the grid container.
 ************************************************************************************************/
type TResourceGridProps<T> = {
	items: T[] | null | undefined;
	renderItem: (item: T, index: number) => ReactNode;
	isLoading?: boolean;
	emptyMessage?: string;
	className?: string;
};

/************************************************************************************************
 ** ResourceGrid Function:

 ** A generic and reusable component for displaying a grid of items. It handles loading states
 ** and empty states, and allows for custom rendering of each item through the `renderItem` prop.

 ** Type Parameters:
 ** - T: The type of the items being rendered in the grid.

 ** Args:
 ** - items (T[] | null | undefined): The array of items to display.
 ** - renderItem ((item: T, index: number) => ReactNode): Function to render each item.
 ** - isLoading (boolean, optional): Whether the grid is in a loading state.
 ** - emptyMessage (string, optional): Message to display when there are no items.
 ** - className (string, optional): Additional CSS classes for the grid container.

 ** Returns:
 ** - ReactNode: The JSX element representing the resource grid, or a loading/empty state.
 ************************************************************************************************/
export function ResourceGrid<T>({
	items,
	renderItem,
	isLoading = false,
	emptyMessage = 'No items available yet.',
	className = ''
}: TResourceGridProps<T>): ReactNode {
	// Handle loading state
	if (isLoading) {
		return (
			<div
				className={'h-[50vh]'}
				aria-busy={true}
				aria-label={'Loading content'}
			/>
		);
	}

	// Handle empty state
	if (!items || items.length === 0) {
		return (
			<div className={'flex w-full justify-center'}>
				<div className={'container flex flex-col items-center justify-center py-16'}>
					<p className={'text-xl text-gray-400'}>{emptyMessage}</p>
				</div>
			</div>
		);
	}

	// Render grid with items
	return (
		<div className={'flex w-full justify-center'}>
			<div className={'container flex flex-col justify-center'}>
				<div className={`mb-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3 ${className}`}>
					{items.map((item, index) => renderItem(item, index) as ReactElement)}
				</div>
			</div>
		</div>
	);
}
