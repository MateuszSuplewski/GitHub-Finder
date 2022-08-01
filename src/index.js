import GitHubSDK from './GitHubSDK'


const token = process.env.REACT_APP_TOKEN

const gh2 = new GitHubSDK(token, 'MateuszSuplewski')
gh2.sendInvitation('practice-js-testing', 'devmentor-pl')
  .then(data => console.log(data))
  .catch(error => error.message)
