export const CATEGORIES = [
  {
    id: 'electronics',
    name: '전자기기',
    icon: '📱',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'fashion',
    name: '패션/의류',
    icon: '👕',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 'beauty',
    name: '뷰티',
    icon: '💄',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'home',
    name: '홈/리빙',
    icon: '🏠',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'sports',
    name: '스포츠/레저',
    icon: '⚽',
    color: 'from-orange-500 to-amber-500',
  },
  {
    id: 'food',
    name: '식품',
    icon: '🍜',
    color: 'from-red-500 to-orange-500',
  },
  {
    id: 'kids',
    name: '키즈/베이비',
    icon: '🧸',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 'pet',
    name: '반려동물',
    icon: '🐾',
    color: 'from-teal-500 to-cyan-500',
  },
] as const

export type CategoryId = typeof CATEGORIES[number]['id']
