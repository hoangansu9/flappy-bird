export default (state = {}, { type } = {}) => {
  switch (type) {
    case 'START':
      return { ...state, status: 'playing' };
    case 'GAMEOVER':
      return { ...state, status: 'game_over' };
    default:
      return state;
  }
};
