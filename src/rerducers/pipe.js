const initialState = {
  x: 300,
  pipes: [],
};

export default (state = initialState, { type } = {}) => {
  switch (type) {
    case 'RUNNING':
      if (!state.pipes.length) {
        return state;
      }
      return { ...state, x: state.x - 10 };
    case 'GENETARE':
      const topHeight = Math.round(Math.random() * 200);
      return { ...state, pipes: [...state.pipes, { topHeight }] };
    case 'GAMEOVER':
      return initialState;
    default:
      return state;
  }
};
