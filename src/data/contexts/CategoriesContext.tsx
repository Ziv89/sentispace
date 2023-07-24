import { IndexableType } from 'dexie';
import { Category } from '../interfaces';
import {
    useState,
    Dispatch,
    SetStateAction,
    createContext,
    ReactNode,
} from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../Database';

export interface ICategoriesContext {
    categories: Category[];
    selectedCategories: IndexableType[];
    setSelectedCategories: Dispatch<SetStateAction<IndexableType[]>>;
}

interface ContextProviderProps {
    children: ReactNode;
}

export const CategoriesContext = createContext<ICategoriesContext>({
    categories: [],
    selectedCategories: [],
    setSelectedCategories: () => {},
});

export default function ContextProvider({ children }: ContextProviderProps) {
    const categories =
        useLiveQuery<Category[]>(() => db.categories.toArray()) ?? [];
    const [selectedCategories, setSelectedCategories] = useState<
        IndexableType[]
    >([]);

    return (
        <CategoriesContext.Provider
            value={{
                categories,
                selectedCategories,
                setSelectedCategories,
            }}
        >
            {children}
        </CategoriesContext.Provider>
    );
}
