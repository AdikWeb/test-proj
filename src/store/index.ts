import {defineStore} from 'pinia';
import {Cocktail, CocktailFormatted} from "@/types/Drinks/Drinks.ts";
import {fetchCocktailData} from "@/api/drinks.api.ts";

export const useDrinksStore = defineStore('drinks', {
    state: () => ({
        drinksObjects: {},
        cocktailsCategory: [
            "Margarita",
            "Mojito",
            "A1",
            "Kir"
        ]
    }),
    actions: {
        async fetchCocktails(code: string):Promise<void> {
            try {
                if (code && !this.drinksObjects[code]) {
                    const cocktails = await fetchCocktailData(code)
                    this.setDrinksObjects(code, cocktails?.drinks || {})
                }
            } catch (e) {
                console.error(e)
            }
        },

        setDrinksObjects(code: string, obj: Cocktail[]): void {
            this.drinksObjects[code] = obj;
        },
        getDrinksByCode(code: string):Cocktail[] {
            console.log(this.drinksObjects)
            return this.drinksObjects[code]
        },
        getDrinksObjectByID(code: string, id: string): CocktailFormatted|null {
            const data = this.drinksObjects[code].find((item) => item?.idDrink === id);
            if(!data) return null;
            return this.formatCocktail(data);
        },

        formatCocktail(cocktailData: Cocktail): CocktailFormatted {
            const ingredients: { ingredient: string, measure: string | null }[] = [];
            for (const key in cocktailData) {
                if (key.startsWith('strIngredient') && cocktailData[key]) {
                    const index = parseInt(key.substring('strIngredient'.length));
                    const ingredient = cocktailData[key];
                    const measureKey = `strMeasure${index}`;
                    const measure = cocktailData[measureKey] || null;
                    ingredients.push({ingredient, measure});
                }
            }

            const formattedCocktail = <CocktailFormatted>{
                idDrink: cocktailData.idDrink,
                strDrink: cocktailData.strDrink,
                strDrinkAlternate: cocktailData.strDrinkAlternate,
                strTags: cocktailData.strTags,
                strVideo: cocktailData.strVideo,
                strCategory: cocktailData.strCategory,
                strIBA: cocktailData.strIBA,
                strAlcoholic: cocktailData.strAlcoholic,
                strGlass: cocktailData.strGlass,
                strInstructions: cocktailData.strInstructions,
                strInstructionsES: cocktailData.strInstructionsES,
                strInstructionsDE: cocktailData.strInstructionsDE,
                strInstructionsFR: cocktailData.strInstructionsFR,
                strInstructionsIT: cocktailData.strInstructionsIT,
                strInstructionsZH_HANS: cocktailData.strInstructionsZH_HANS,
                strInstructionsZH_HANT: cocktailData.strInstructionsZH_HANT,
                strDrinkThumb: cocktailData.strDrinkThumb,
                ingredients: ingredients,
                strImageSource: cocktailData.strImageSource,
                strImageAttribution: cocktailData.strImageAttribution,
                strCreativeCommonsConfirmed: cocktailData.strCreativeCommonsConfirmed,
                dateModified: cocktailData.dateModified
            };

            return formattedCocktail as CocktailFormatted;
        }
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'drinks',
                storage: localStorage
            }
        ]
    }
})
