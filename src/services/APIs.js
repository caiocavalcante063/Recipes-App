const BASE_API_FOOD = 'https://www.themealdb.com/api/json/v1/1/';
const BASE_API_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/';
export const BASE_FOOD_INGREDIENTS_IMAGE = 'https://www.themealdb.com/images/ingredients/';
export const BASE_DRINK_INGREDIENTS_IMAGE = 'https://www.thecocktaildb.com/images/ingredients/';

export async function fetchFoodReq(type, firstEndPoint, secondEndPoint) {
  let response = '';
  if (secondEndPoint === 'random') {
    response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  } else {
    response = await
    fetch(`${BASE_API_FOOD}${type}.php?${firstEndPoint}=${secondEndPoint}`);
  }

  const responseJson = await response.json();
  return responseJson;
}

export async function fetchDrinkReq(type, firstEndPoint, secondEndPoint) {
  let response = '';
  if (secondEndPoint === 'random') {
    response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  } else {
    response = await
    fetch(`${BASE_API_DRINK}${type}.php?${firstEndPoint}=${secondEndPoint}`);
  }

  const responseJson = await response.json();
  return responseJson;
}

export async function fetchRandomRecipe(type) {
  let response = '';
  if (type === 'comidas') {
    response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  } else {
    response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  }
  const responseJson = response.json();
  return responseJson;
}

export async function fetchFoodIngImages(ingredient) {
  const image = await fetch(`${BASE_FOOD_INGREDIENTS_IMAGE}${ingredient}.png`);
  return image;
}

export async function fetchDrinksIngImages(ingredient) {
  const image = await fetch(`${BASE_DRINK_INGREDIENTS_IMAGE}${ingredient}.png`);
  const imageUrl = image.url;
  return imageUrl;
}

export const AppData = {
  getFoodData: async () => [
    {
      title: 'Categorias',
      items: await fetchFoodReq('list', 'c', 'list'),
    },
    {
      title: 'Areas',
      items: await fetchFoodReq('list', 'a', 'list'),
    },
    {
      title: 'Ingredientes',
      items: await fetchFoodReq('list', 'i', 'list'),
    },
    {
      title: 'Receitas',
      items: await fetchFoodReq('search', 's', ''),
    },
  ],
  getDrinkLists: async () => [
    {
      title: 'Categorias',
      items: await fetchDrinkReq('list', 'c', 'list'),
    },
    {
      title: 'Glasses',
      items: await fetchDrinkReq('list', 'g', 'list'),
    },
    {
      title: 'Ingredientes',
      items: await fetchDrinkReq('list', 'i', 'list'),
    },
    {
      title: 'Alc??lico',
      items: await fetchDrinkReq('list', 'a', 'list'),
    },
    {
      title: 'Receitas',
      items: await fetchDrinkReq('search', 's', ''),
    },
  ],
};
