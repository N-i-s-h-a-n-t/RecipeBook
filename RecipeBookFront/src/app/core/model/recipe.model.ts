export interface Recipe {
    id?: number | null;
    category?: string | null;
    title?: string | null;
    ingredients?: string | null;
    tags?: string | null;
    imageUrl?: string | null;
    cookingTime?: number | null;
    prepTime?: number | null;
    yield?: number | null;
    steps?: string | null;
    rating?:number | null;
}
