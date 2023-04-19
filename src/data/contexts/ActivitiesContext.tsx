import { IndexableType } from 'dexie';
import { Activity, Category } from '../interfaces';
import {
	useState,
	Dispatch,
	SetStateAction,
	createContext,
	ReactNode,
} from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../Database';

export interface IActivitiesContext {
	activities: Activity[];
	categories: Category[];
	selectedCategories: IndexableType[];
	setSelectedCategories: Dispatch<SetStateAction<IndexableType[]>>;
}

interface ContextProviderProps {
	children: ReactNode;
}

export const ActivitiesContext = createContext<IActivitiesContext>({
	activities: [],
	categories: [],
	selectedCategories: [],
	setSelectedCategories: () => {},
});

export default function ContextProvider({ children }: ContextProviderProps) {
	const activities =
		useLiveQuery<Activity[]>(() => db.activities.toArray()) ?? [];
	const categories =
		useLiveQuery<Category[]>(() => db.categories.toArray()) ?? [];
	const [selectedCategories, setSelectedCategories] = useState<IndexableType[]>(
		[]
	);

	return (
		<ActivitiesContext.Provider
			value={{
				activities,
				categories,
				selectedCategories,
				setSelectedCategories,
			}}
		>
			{children}
		</ActivitiesContext.Provider>
	);
}
