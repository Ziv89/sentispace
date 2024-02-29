import { Rating } from './types/Rating'
import { addDays, subWeeks } from 'date-fns'
import { getRandomIconKey } from '../assets/icons'
import { Activity, Category } from './interfaces'
import { db } from './Database'
import { IndexableType } from 'dexie'

const activityNames = [
  'Biking',
  'Hiking',
  'Reading',
  'Swimming',
  'Cooking',
  'Painting',
  'Running',
  'Writing',
  'Dancing',
  'Fishing',
  'Gardening',
  'Photography',
  'Pottery',
  'Baking',
  'Climbing',
  'Skiing',
  'Surfing',
  'Yoga',
  'Meditating',
  'Singing',
  'Playing guitar',
  'Playing piano',
  'Origami',
  'Chess',
  'Knitting',
  'Video gaming',
  'Bird watching',
  'Star gazing',
  'Jogging',
  'Jumping rope',
  'Kickboxing',
  'Martial arts',
  'Pilates',
  'Rowing',
  'Scuba diving',
  'Skateboarding',
  'Snowboarding',
  'Stand-up comedy',
  'Archery',
  'Astronomy',
  'Badminton',
  'Baseball',
  'Basketball',
  'Beekeeping',
  'Bowling',
  'Boxing',
  'Brewing beer',
  'Calligraphy',
  'Candle making',
  'Canoeing',
  'Card games',
  'Carpentry',
  'Ceramics',
  'Coding',
  'Comic books',
  'Cross-stitch',
  'Crossword puzzles',
  'Curling',
  'Darts',
  'Digital arts',
  'Dog training',
  'Drawing',
  'Embroidery',
  'Fencing',
  'Figure skating',
  'Floral design',
  'Flying drones',
  'Football',
  'Glassblowing',
  'Go Kart Racing',
  'Golfing',
  'Gymnastics',
  'Handwriting analysis',
  'Homebrewing',
  'Horseback riding',
  'Ice hockey',
  'Ice skating',
  'Jewelry making',
  'Jigsaw puzzles',
  'Juggling',
  'Karate',
  'Kayaking',
  'Kite flying',
  'Kitesurfing',
  'Leatherworking',
  'Magic',
  'Mandala Art',
  'Metalworking',
  'Mixology',
  'Model building',
  'Origami',
  'Paintball',
  'Paragliding',
  'Parkour',
  'Photography',
  'Piano playing',
  'Pottery',
  'Quilting',
  'Rafting',
  'Rappelling',
  'Rock climbing',
  'Roller skating',
  'Rugby',
  'Sailing',
  'Scrapbooking',
  'Sculpting',
  'Sewing',
  'Soap making',
  'Soccer',
  'Stained glass',
  'Stand-up paddleboarding',
  'Sudoku',
  'Table tennis',
  'Tai chi',
  'Tennis',
  'Theater',
  'Ultimate Frisbee',
  'Volleyball',
  'Watercolor painting',
  'Weightlifting',
  'Windsurfing',
  'Wine tasting',
  'Woodworking',
  'Writing poetry',
  'Yo-yoing',
  'Zumba',
]

const categoryNames = [
  'Sports',
  'Leisure',
  'Education',
  'Cookery',
  'Outdoors',
  'Arts',
  'Fitness',
  'Literature',
  'Performing Arts',
  'Outdoor Sports',
  'Horticulture',
  'Visual Arts',
  'Craft',
  'Bakery',
  'Adventure Sports',
]

const descriptionPhrases = [
  "Participate in {title} and have a lot of fun. It's a great way to spend time!",
  '{title} is a fantastic activity for both beginners and experts. Give it a try!',
  "Join us for some {title}! It's a great way to relax and enjoy your time.",
  "Try out {title}. It's both enjoyable and a great way to get in some exercise.",
  "Get involved in {title}. It's a fun way to learn new skills.",
  "Take part in {title}. It's a perfect pastime for any day of the week.",
  "Have you ever tried {title}? It's a wonderful way to unwind.",
  "{title} - a fascinating activity that you're sure to enjoy.",
  "Don't miss out on {title}. It's a wonderful experience and a lot of fun.",
  "{title} can be a great hobby. Don't hesitate to join us!",
  'Engage in {title}, a rewarding experience that will create wonderful memories.',
  'Delve into {title}, an intriguing activity that will capture your imagination.',
  'Explore {title}, a sure way to enrich your leisure time.',
  '{title} offers a unique experience, providing both entertainment and learning opportunities.',
  'Immerse yourself in {title} - a perfect blend of fun and challenge.',
  'Step into the exciting world of {title}. An adventure awaits you!',
  'Discover the joy of {title}. A perfect activity for all ages!',
  'Revel in the thrill of {title}, a fantastic way to invigorate your daily routine.',
  "{title} is more than an activity, it's an unforgettable experience.",
  '{title} provides an excellent way to stretch your abilities while having fun.',
  "Find out what makes {title} so special. You won't regret it!",
  'Be a part of the {title} community. Expand your horizons!',
  "Experience the magic of {title}. A hobby that you'll fall in love with.",
  '{title} - a fun-filled journey that will keep you coming back for more.',
  "Unleash your creativity with {title}. It's time for some fun!",
]

function getDescriptionForTitle(title: string): string {
  const randomPhrase =
    descriptionPhrases[Math.floor(Math.random() * descriptionPhrases.length)]

  return randomPhrase.replace('{title}', title)
}

function getRandomRating(): Rating {
  return (Math.floor(Math.random() * 10) / 2) as Rating
}

function getRandomStartDate(): Date {
  const startDate = subWeeks(new Date(), 3)
  const dayOffset = Math.floor(Math.random() * 22)
  return addDays(startDate, dayOffset)
}

function getRandomEndDate(startTime: Date): Date {
  return new Date(startTime.getTime() + Math.random() * 3600000)
}

function getRandomColor(): number {
  return Math.floor(Math.random() * 16) + 1
}

function getRandomCategoryIds(categoryIds: IndexableType[], count: number) {
  return Array.from(
    { length: count },
    () => categoryIds[Math.floor(Math.random() * categoryIds.length)],
  )
}

export async function generateData(): Promise<void> {
  const dbLen = await db.activities.count()

  if (dbLen !== 0) {
    return
  }

  const categories: Partial<Category>[] = categoryNames.map((name) => ({
    name,
    color: getRandomColor(),
  }))

  const categoryIds = await db.categories.bulkAdd(categories as Category[], {
    allKeys: true,
  })

  const activities: Partial<Activity>[] = activityNames.map((title) => {
    const startTime = getRandomStartDate()

    return {
      title,
      description: getDescriptionForTitle(title),
      rating: getRandomRating(),
      startTime,
      endTime: getRandomEndDate(startTime),
      iconKey: getRandomIconKey(),
      categoryIds: getRandomCategoryIds(
        categoryIds,
        Math.floor(Math.random() * 2) + 2,
      ),
    }
  })

  await db.activities.bulkAdd(activities as Activity[])
}
