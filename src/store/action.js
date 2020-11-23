function userAction(user) {
  return {
    type: 'SET_USER',
    data: user
  }
}

function repoAction(repos) {
  return {
    type: 'SET_REPO',
    data: repos
  }
}

export {userAction, repoAction};