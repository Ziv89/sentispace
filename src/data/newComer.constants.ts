import { Activity } from './interfaces/Activity'
import { Category } from './interfaces/Category'

export const initialActivities: Partial<Activity>[] = [
  {
    title: 'Welcome to Sentispace! 👋',
    description: 'Get started by exploring the app.',
    rating: 5,
    startTime: new Date(),
    iconKey: 'HandWaving',
    categoryIds: [],
  },
  {
    title: 'Create Activities',
    description: "Tap the '+' button to create a new activity.",
    rating: 5,
    startTime: new Date(),
    iconKey: 'PlusSquare',
    categoryIds: [],
  },
  {
    title: 'Edit, Duplicate or Template',
    description:
      'Click on an activity to edit it, duplicate it or create a template for future use.',
    rating: 5,
    startTime: new Date(),
    iconKey: 'Copy',
    categoryIds: [],
  },
  {
    title: 'Create Categories',
    description: "Organize your activities under the 'Categories' tab.",
    rating: 5,
    startTime: new Date(),
    iconKey: 'SquaresFour',
    categoryIds: [],
  },
  {
    title: 'Navigate Through The Week',
    description:
      'Use the week carousel to change days and view different activities.',
    rating: 5,
    startTime: new Date(),
    iconKey: 'Compass',
    categoryIds: [],
  },
]

export const initialCategories: Partial<Category>[] = [
  { name: 'Social', color: 1 },
  { name: 'Education', color: 2 },
  { name: 'Fitness', color: 3 },
  { name: 'Self Improvement', color: 4 },
]
