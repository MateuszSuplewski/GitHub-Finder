import GitHubSDK from './GitHubSDK'

const token = process.env.REACT_APP_TOKEN
const gh2 = new GitHubSDK(token, 'MateuszSuplewski')

gh2.getUser()
  .then(data => console.log(data))
  .catch(error => error.message)

gh2.getRepositories()
  .then(data => console.log(data))
  .catch(error => error.message)

gh2.getUnauthorizedUser()
  .then(data => console.log(data))
  .catch(error => error.message)

gh2.getUnauthorizedRepositories()
  .then(data => console.log(data))
  .catch(error => error.message)



