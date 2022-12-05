import GitHubSDK from './GitHubSDK'
import './index.css'
import {createLinkEl, createContentEl, createFigureEl, createListEl, insertDataToEl} from './helper'

const form = document.querySelector('form')
const errorEl = document.querySelector('.error-message')
const userContainer = document.querySelector('.user__container')
const repositoryListContainer = document.querySelector('.repositories')

window.addEventListener('DOMContentLoaded', () => init())

const init = () => {
  const token = process.env.REACT_APP_TOKEN
  const ghAuth = new GitHubSDK(token, '')
  ghAuth
    .getUser()
    .then((data) => insertUserData(data))
    .catch((error) => (errorEl.innerText = error.message))

  ghAuth
    .getRepositories()
    .then((data) => insertRepositoriesData(data))
    .catch((error) => (errorEl.innerText = error.message))
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  userContainer.innerHTML = ''
  repositoryListContainer.innerHTML = ''
  errorEl.innerText = ''
  const ghNickname = form.elements['ghNickname'].value

  const ghUnAuth = new GitHubSDK('', ghNickname)

  ghUnAuth
    .getUnauthorizedUser()
    .then((data) => insertUserData(data))
    .catch((error) => (errorEl.innerText = error.message))

  ghUnAuth
    .getUnauthorizedRepositories()
    .then((data) => insertRepositoriesData(data))
    .catch((error) => (errorEl.innerText = error.message))
})

const insertUserData = (data) => {
  const {avatar_url, total_private_repos = '', email = '', followers, following, login, name, public_repos} = data
  const userData = [
    {
      description: 'Name',
      content: name,
    },
    {
      description: 'Followers',
      content: followers,
    },
    {
      description: 'Following',
      content: following,
    },
    {
      description: 'Public repositories',
      content: public_repos,
    },
    {
      description: 'Private repositories',
      content: total_private_repos,
    },
    {
      description: 'Contact',
      content: email,
    },
  ]

  const userAvatar = createFigureEl(avatar_url, login, ['user__avatar', ''])
  userContainer.appendChild(userAvatar)

  const userDataContainer = createContentEl('div', '', ['user-info__container'])

  userData.forEach(({description, content}) => {
    if (content !== '' && content !== null) {
      const textContent = `${description} : ${content}`
      const informationParagraph = createContentEl('p', textContent, ['fullWidth'])
      userDataContainer.appendChild(informationParagraph)
    }
  })

  userContainer.appendChild(userDataContainer)
}

const insertRepositoriesData = (data) => {
  data.forEach((repository) => {
    const {topics, html_url, visibility, name, language, has_pages, owner} = repository
    const {login} = owner

    const repositoryContainer = createContentEl('div', '', ['repository__container'])
    const repositoryName = createContentEl('h4', name, ['repository__name', 'fullWidth'])
    const repositoryLink = createLinkEl(html_url, 'Repository', ['repository__link', 'repository__link--blue', 'halfWidth'])
    const repositoryMainLanguage = createContentEl('p', `Mainly used language: ${language}`, ['fullWidth'])
    const repositoryVisibility = createContentEl('p', `Repository status: ${visibility}`, ['fullWidth'])

    insertDataToEl([repositoryName, repositoryMainLanguage, repositoryVisibility], repositoryContainer)

    if (topics.length > 0) {
      const [repositoryTopicListParagraphEl, repositoryTopicListEl] = createListEl(topics, 'Project topics', ['fullWidth'], ['fullWidth'], [])
      insertDataToEl([repositoryTopicListParagraphEl, repositoryTopicListEl], repositoryContainer)
    }

    insertDataToEl([repositoryLink], repositoryContainer)

    if (has_pages) {
      const livePreviewUrl = `https://${login}.github.io/${name}/`
      const livePreviewLinkEl = createLinkEl(livePreviewUrl, 'Live Preview', ['repository__link', 'repository__link--yellow', 'halfWidth'])
      repositoryContainer.appendChild(livePreviewLinkEl)
    }

    repositoryListContainer.appendChild(repositoryContainer)
  })
}
