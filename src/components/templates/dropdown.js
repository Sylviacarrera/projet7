import { tagContainer } from '../domLinker'
import { state } from '../state'

export const createItem = (data, parent, category, callback) => {
  parent.innerHTML = ''

  data.forEach(item => {
    const article = document.createElement('article')
    article.innerHTML = item

    article.addEventListener('click', () => createTag(item, category, callback))
    parent.appendChild(article)
  })
}

const createTag = (data, category, callback) => {
  // check if tags already exist
  if (!state.tags[category].find(element => element === data)) {
    // add tag to state
    state.tags[category].push(data)

    const article = document.createElement('article')
    const span = document.createElement('span')
    span.innerHTML = data
    article.appendChild(span)
    const img = document.createElement('img')
    img.src = '/assets/x_tag.png'
    img.alt = 'supprimer le tag'
    img.addEventListener('click', () => {
      // delete Tag
      deleteTag(article, data, category)
      // update all display
      callback()
    })

    article.appendChild(img)

    tagContainer.appendChild(article)
    // update all display
    callback()
  }
}

const deleteTag = (tagElement, data, category) => {
  // delete tag from dom
  tagElement.parentNode.removeChild(tagElement)
  // delete tag from state
  state.tags[category] = state.tags[category].filter(item => item !== data)
}
