import GitHubSDK from './GitHubSDK'
import './index.css'

const token = process.env.REACT_APP_TOKEN
const gh2 = new GitHubSDK(token, 'MateuszSuplewski')

gh2.getUser()
  .then(data => insertUserData(data))
  .catch(error => error.message)

gh2.getRepositories()
  .then(data => insertRepositoriesData(data))
  .catch(error => error.message)

// gh2.getUnauthorizedUser()
//   .then(data => console.log(data))
//   .catch(error => error.message)

// gh2.getUnauthorizedRepositories()
//   .then(data => console.log(data))
//   .catch(error => error.message)

const insertUserData = (data) => {
  const { avatar_url, total_private_repos, email, followers, following, login, name, public_repos } = data
  const userData = [
    {
      description: 'Name',
      content: name
    },
    {
      description: 'Followers',
      content: followers
    },
    {
      description: 'Following',
      content: following
    },
    {
      description: 'Public repositories',
      content: public_repos
    },
    {
      description: 'Private repositories',
      content: total_private_repos
    },
    {
      description: 'Contact',
      content: email
    }
  ]

  const userContainerEl = document.querySelector('.user__container')
  const userInfoContainerEl = document.querySelector('.user-info__container')

  const userAvatarEl = createFigureEl(avatar_url,login,['user__avatar',''])
  userContainerEl.appendChild(userAvatarEl)

  userData.forEach(({description,content}) => {
    if(content){
      const informationParagraph = createParagraphEl(description, content, 'fullWidth')
      userInfoContainerEl.appendChild(informationParagraph)
    }
  })
   
  userContainerEl.appendChild(userInfoContainerEl)
}

const insertRepositoriesData = (data) => {
  const repositoryListContainerEl = document.querySelector('.repositories')
  
  data.forEach(repository => {
    const {topics, html_url,visibility,name,language, has_pages, owner} = repository
    const {login} = owner
  
    const repositoryContainerEl = document.createElement('div')
    const repositoryNameEl = document.createElement('h4')
    const repositoryLinkEl = createLinkEl(html_url,'Repository',['repository__link', 'repository__link--blue','halfWidth'])
    const repositoryMainLanguageEl = document.createElement('p')
    const repositoryVisibilityEl = document.createElement('p')

    repositoryNameEl.innerText = name
    repositoryMainLanguageEl.innerText = language ? `Mainly used language : ${language}` : ''
    repositoryVisibilityEl.innerText = `Repository status : ${visibility}`


    repositoryContainerEl.appendChild(repositoryNameEl)
    repositoryContainerEl.appendChild(repositoryMainLanguageEl)
    repositoryContainerEl.appendChild(repositoryVisibilityEl)
    if(topics.length > 0) insertTopicsListEl(topics,repositoryContainerEl)
    repositoryContainerEl.appendChild(repositoryLinkEl)
    repositoryListContainerEl.appendChild(repositoryContainerEl)

    if(has_pages){
      const livePreviewUrl = `https://${login}.github.io/${name}/`
      const livePreviewLinkEl = createLinkEl(livePreviewUrl,'Live Preview',['repository__link', 'repository__link--yellow','halfWidth'])
      repositoryContainerEl.appendChild(livePreviewLinkEl)
    }


    repositoryContainerEl.classList.add('repository__container')
    repositoryNameEl.classList.add('repository__name', 'fullWidth')
    repositoryMainLanguageEl.classList.add('fullWidth')
    repositoryVisibilityEl.classList.add('fullWidth')
  })
}

const insertTopicsListEl = (topics,container) => {
    const repositoryTopicListParagraphEl = document.createElement('p')
    const repositoryTopicListEl = document.createElement('ul')

    repositoryTopicListParagraphEl.innerText = 'Project topics : '

    topics.forEach(topic => {
      const repositoryTopicEl = document.createElement('li')
      repositoryTopicEl.innerText = topic
      repositoryTopicListEl.appendChild(repositoryTopicEl)
    })

    repositoryTopicListParagraphEl.classList.add('fullWidth')
    repositoryTopicListEl.classList.add('fullWidth')
    container.appendChild(repositoryTopicListParagraphEl)
    container.appendChild(repositoryTopicListEl)

}


const createLinkEl = (url,content,classNames) => {
  const linkEl = document.createElement('a')
  linkEl.innerText = content
  linkEl.setAttribute('href',url)
  linkEl.classList.add(...classNames)
  return linkEl
}


const createParagraphEl = (description,content, className) => {
  const paragraphEl = document.createElement('p')
  paragraphEl.innerText = description + ' : ' + content
  if(className) paragraphEl.classList.add(className) 

  return paragraphEl
}

const createFigureEl = (imgUrl,captionText,classNames) => {
  const [imgClass,captionClass] = classNames

  const figureEl = document.createElement('figure')
  const imageEl = document.createElement('img')
  const captionEl = document.createElement('figcaption')

  imageEl.setAttribute('src',imgUrl)
  captionEl.innerText = captionText

  figureEl.appendChild(imageEl)
  figureEl.appendChild(captionEl)
  if(imgClass) imageEl.classList.add(imgClass)
  if(captionClass) captionEl.classList.add(captionClass)
  return figureEl
}