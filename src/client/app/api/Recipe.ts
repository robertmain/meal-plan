import Api, { ApiResponse } from './Api';
import { RecipeResponse } from './dto/RecipeResponse.dto';

/**
 * Get all Box data from the API
 */
export const getRecipes = async (): ApiResponse<RecipeResponse[]> => Api.get('recipe');
