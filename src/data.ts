import { IProperty } from './entities/property';

export const properties: IProperty[] = [
  {
    id: 1,
    name: 'Property #1',
    imgUrl:
      'https://images.unsplash.com/photo-1632999101501-47bd016f7e46?q=80&h=1000&w=1000',
    bedsCount: 1,
    bathsCount: 1,
    reviewsCount: 51,
    ratingScore: 4,
    price: 100,
    currency: '$',
  },
  {
    id: 2,
    name: 'Property #2',
    imgUrl:
      'https://plus.unsplash.com/premium_photo-1661876449499-26de7959878f?q=80&h=1000&w=1000',
    bedsCount: 3,
    bathsCount: 2,
    reviewsCount: 24,
    ratingScore: 4.7,
    price: 700,
    currency: '$',
  },
  {
    id: 3,
    name: 'Property #3',
    imgUrl:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&h=1000&w=1000',
    bedsCount: 2,
    bathsCount: 1,
    reviewsCount: 36,
    ratingScore: 4,
    price: 300,
    currency: '$',
  },
];
