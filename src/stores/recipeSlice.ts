import type { StateCreator } from "zustand"
import { getCategories, getRecipes, getRecipesById } from "../services/RecipesServices"
import type {Categories, Drink, Drinks, Recipe, SearchFilter} from "../types"

export type RecipesSliceType = {
    categories: Categories
    drinks: Drinks
    selectedRecipe: Recipe
    modal: boolean
    fetchCategories: () => Promise<void>
    searchRecipes: (SearchFilters: SearchFilter) => Promise<void>
    selectRecipes: (id:Drink['idDrink']) => Promise<void>
    closeModal: ()=> void
    
}

export const createRecipesSlice:StateCreator<RecipesSliceType> = (set) =>({
    categories:{
        drinks:[]
    },
    drinks:{
        drinks:[]
    },
    selectedRecipe:{} as Recipe,
    modal: false,
    fetchCategories:async() => {
        const categories = await getCategories()
        set({
            categories
        })
    },
    searchRecipes : async (filters)=>{
        const drinks = await getRecipes(filters)
        set({
            drinks
        })
    },
    selectRecipes: async(id)=>{
        const selectedRecipe = await getRecipesById(id)
            set({
                selectedRecipe,
                modal:true
            })
        },
    closeModal:()=>{
        set({
            modal:false,
            selectedRecipe:{} as Recipe
        })
    }
    
})