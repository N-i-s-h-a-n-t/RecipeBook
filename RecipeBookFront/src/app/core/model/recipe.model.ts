export interface Recipe {
    id?: number;
    category?: string;
    title?: string;
    ingredients?: string;
    tags?: string;
    imageUrl?: string;
    cookingTime?: number;
    prepTime?: number;
    yield?: number;
    steps?: string;
    rating?:number;
}
