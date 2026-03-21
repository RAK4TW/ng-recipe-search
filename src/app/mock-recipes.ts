import { RecipeModel } from './models';
export const MOCK_RECIPES: RecipeModel[] = [
    {
        id: 1,
        name: 'Spaghetti Carbonara',
        description: 'A classic Italian pasta dish.',
        imgUrl: 'https://placehold.co/600x400/E8117F/white?text=Spaghetti+Carbonara',
        authorEmail: 'mario@italy.com',
        isFavorite: true, 
        ingredients: [
            { name: 'Spaghetti', quantity: 200, unit: 'g' },
            { name: 'Guanciale', quantity: 100, unit: 'g' },
            { name: 'Egg Yolks', quantity: 4, unit: 'each' },
            { name: 'Pecorino Romano Cheese', quantity: 50, unit: 'g' },
            { name: 'Black Pepper', quantity: 1, unit: 'tsp' },
        ],
    },
    {
        id: 2,
        name: 'Caprese Salad',
        description: 'A simple and refreshing Italian salad.',
        imgUrl: 'https://placehold.co/600x400/40C463/white?text=Caprese+Salad',
        authorEmail: 'luigi@italy.com', 
        isFavorite: false, 
        ingredients: [
            { name: 'Tomatoes', quantity: 4, unit: 'each' },
            { name: 'Fresh Mozzarella', quantity: 200, unit: 'g' },
            { name: 'Fresh Basil', quantity: 1, unit: 'bunch' },
            { name: 'Extra Virgin Olive Oil', quantity: 2, unit: 'tbsp' },
        ],
    },
];
