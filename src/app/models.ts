export interface Ingredient {
    name: string;
    quantity: number;
    unit: string;
}

export interface RecipeModel {
    id: number;
    name: string;
    description: string;
    authorEmail: string;
    imgUrl: string; 
    ingredients: Ingredient[];
    isFavorite: boolean;
}
