import { search } from "./weather";

describe('search', () => {
    it('should create a success action', () => {
    
      const action = search({ city: 'london'});

      expect(action.type).toEqual('[Weather] Seach For City');      
      expect(action.city).toEqual('london')
    });
});