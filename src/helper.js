const createLinkEl = (url, content, classNames = []) => {
  const linkEl = document.createElement('a')
  linkEl.innerText = content
  linkEl.setAttribute('href', url)
  classNames.length > 0 && linkEl.classList.add(...classNames)
  return linkEl
}

const createContentEl = (element, textContent, classNames) => {
  const newElement = document.createElement(element)
  newElement.innerText = textContent
  classNames.length > 0 && newElement.classList.add(...classNames)
  return newElement
}

const createFigureEl = (imgUrl, captionText, classNames) => {
  const [imgClass, captionClass] = classNames

  const figureEl = document.createElement('figure')
  const imageEl = document.createElement('img')
  const captionEl = document.createElement('figcaption')

  imageEl.setAttribute('src', imgUrl)
  captionEl.innerText = captionText

  figureEl.appendChild(imageEl)
  figureEl.appendChild(captionEl)
  imgClass && imageEl.classList.add(imgClass)
  captionClass && captionEl.classList.add(captionClass)
  return figureEl
}

const createListEl = (listElements, description, titleClassNames = [], listClassNames = [], listItemClassNames = []) => {
  const listParagraphEl = document.createElement('p')
  const listEl = document.createElement('ul')

  listParagraphEl.innerText = description + ':'

  listElements.forEach((element) => {
    const listItem = document.createElement('li')
    listItem.innerText = element
    listItemClassNames.length > 0 && listItem.classList.add(...listItemClassNames)
    listEl.appendChild(listItem)
  })
  titleClassNames.length > 0 && listParagraphEl.classList.add(...titleClassNames)
  listClassNames.length > 0 && listEl.classList.add(...listClassNames)
  return [listParagraphEl, listEl]
}

const insertDataToEl = (data, container) => {
  data.forEach((dataPiece) => container.appendChild(dataPiece))
}

export {createLinkEl, createContentEl, createFigureEl, createListEl, insertDataToEl}
