export async function fetchCocktailData(cocktailName) {
    const baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const url = `${baseUrl}${encodeURIComponent(cocktailName)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Could not fetch the data: ", error);
        return null;
    }
}