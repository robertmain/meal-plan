import { MUTATIONS, mutations } from './mutations';
import { State } from './state';

const {
  [MUTATIONS.OPEN_NAVBAR]: open,
  [MUTATIONS.CLOSE_NAVBAR]: close,
} = mutations;

describe('Mutations', () => {
  describe(MUTATIONS.OPEN_NAVBAR, () => {
    it('sets the current state of the navbar to open', () => {
      const state: State = { navbarOpen: false };

      open(state);

      expect(state.navbarOpen).toBe(true);
    });
  });
  describe(MUTATIONS.CLOSE_NAVBAR, () => {
    it('can set the current state of the navbar to closed', () => {
      const state: State = { navbarOpen: true };

      close(state);

      expect(state.navbarOpen).toBe(false);
    });
  });
});
