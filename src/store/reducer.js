function userStats(state = {}, action) {
  switch (action.type) {
    case 'SET_USER':
      return {user: action.data};
    case 'SET_REPO':
      return {...state, repos: action.data};
    default:
      return state;
  }
}

export default userStats;