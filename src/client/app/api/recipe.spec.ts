import { AxiosRequestConfig, AxiosResponse } from 'axios';
import Api from './Api';
import { RecipeResponse } from './dto/RecipeResponse.dto';
import { getRecipes } from './Recipe';

// eslint-disable-next-line max-len
const stubData = <T> (data: T, override?: Partial<Omit<AxiosResponse, 'data'>>): AxiosResponse<T> => ({
  headers: [],
  status: 200,
  statusText: 'OK',
  config: {},
  data,
  ...override,
});

describe('Recipe API', () => {
  describe('GET', () => {
    let getStub: jest.SpyInstance<Promise<unknown>, [
      string,
      AxiosRequestConfig?
    ]>;
    beforeEach(() => {
      getStub = jest.spyOn(Api, 'get');
    });
    it(`makes a request to ${Api.defaults.baseURL}recipe`, async () => {
      getStub.mockImplementationOnce(() => Promise.resolve(
        stubData<RecipeResponse[]>([])
      ));

      await getRecipes();

      expect(getStub).toHaveBeenCalled();
      expect(getStub).toHaveBeenCalledWith('recipe');
    });
    it('returns the data produced by the API', async () => {
      const stubRecipes = [
        {
          id: '3d79c27b-ee69-472f-a8eb-6460878264f5',
          name: 'My Recipe',
          description: 'The best recipe',
          ingredients: [],
        },
      ];
      getStub.mockImplementationOnce(() => Promise.resolve(
        stubData<RecipeResponse[]>(
          stubRecipes,
          { status: 200 }
        )
      ));

      const {
        data: recipes,
        status,
      } = await getRecipes();

      expect(status).toBe(200);
      expect(recipes).toHaveLength(stubRecipes.length);
    });
    it('bubbles errors from the API', async () => {
      const error = new Error('Internal Server Error');
      getStub.mockImplementationOnce(() => Promise.reject(error));

      expect(getRecipes()).rejects.toThrow(error);
    });
  });
});
