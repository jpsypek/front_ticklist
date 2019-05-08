const userForm = document.querySelector('.user-form')
const userError = document.querySelector('#user-error')
const climbHeader = document.querySelector('#climb-header')
const climbsList = document.querySelector('#climbs')
const tickedList = document.querySelector('#ticked-list')
const untickedList = document.querySelector('#unticked-list')
const newClimbBtn = document.querySelector('#add-climb')
const newClimbForm = document.querySelector('#new-climb-form')
const newClimbContainer = document.querySelector('#new-climb-container')
const editClimbContainer = document.querySelector('#edit-climb-container')
const editClimbForm = document.querySelector('#edit-climb-form')
const store = {}

// user sign in, finds user then fetches data from that specific user
userForm.addEventListener('submit', function(event) {
  event.preventDefault()
  const formData = new FormData(event.target)
  const userName = formData.get("username")
  const user = allUsers()
    .then(users => findUser(users, userName))
    .then(user => {
      fetchUser(user.id)
      newClimbBtnEvent(user.id)
    })
})

// get all users data
function allUsers () {
  return fetch('http://localhost:3000/api/v1/users/')
    .then(response => response.json())
    .then(users => users.data)
    .catch(error => console.error(error.message))
}

// returns found user from log in, otherwise displays error message
function findUser (users, userName) {
  const user = users.find(function(user) {
    return user.attributes.name === userName
  })
  if (user) {
    userForm.id = "user-form-submit"
    newClimbBtn.id = ""
    return user
  } else {
    userError.innerHTML = "User does not exist. Please try again."
  }
}

// fetch data from specific user
function fetchUser (id) {
  return fetch(`http://localhost:3000/api/v1/users/${id}`)
    .then(response => response.json())
    .then(user => user.data)
    .then(climb => store.climbs = climb.attributes.climbs)
    .then(() => populateClimbs(store.climbs))
    .catch(error => console.error(error.message))
}

// populates the ticked and unticked tables based on the climbs specific to the user
function populateClimbs(climbs) {
  clearTable()
  climbHeader.id = ""
  orderedClimbs = orderClimbs(climbs)
  orderedClimbs.forEach(function(climb){
    appendTable(climb)
  })
}

function clearTable () {
  while (tickedList.childNodes.length > 0) {
    tickedList.removeChild(tickedList.firstChild)
  }
  while (untickedList.childNodes.length > 0) {
    untickedList.removeChild(untickedList.firstChild)
  }
}

function orderClimbs(climbs) {
  return climbs.sort(function(a,b) {
    return b.stars - a.stars
  })
}
function appendTable(climb) {
  if (climb.sent.toString() == "true") {
    const sentDeleteBtn = document.createElement('button')
    sentDeleteBtn.innerHTML = "Delete"
    const sentEditBtn = document.createElement('button')
    sentEditBtn.innerHTML = "Edit"
    const sentRow = tickedList.insertRow(-1)
    sentRow.innerHTML = `<td>${climb.name}</td>
      <td>${climb.user_rating}</td>
      <td>${climb.guide_rating}</td>
      <td>${climb.climb_type}</td>
      <td>${climb.stars}</td>
      <td>${climb.pitches}</td>
      <td>${climb.comments}</td>
      <td><a href ="${climb.mp_link}" target="_blank">Mountain Project</a></td>
      <td id="edit-${climb.id}"></td>
      <td id="delete-${climb.id}"></td>`
    editCell = document.querySelector(`#edit-${climb.id}`)
    editCell.appendChild(sentEditBtn)
    deleteCell = document.querySelector(`#delete-${climb.id}`)
    deleteCell.appendChild(sentDeleteBtn)
    deleteBtnEvent(sentRow, sentDeleteBtn, climb.id)
    editBtnEvent(sentEditBtn, climb)
  } else {
    const unsentDeleteBtn = document.createElement('button')
    unsentDeleteBtn.innerHTML = "Delete"
    const unsentEditBtn = document.createElement('button')
    unsentEditBtn.innerHTML = "Tick"
    const unsentRow = untickedList.insertRow(-1)
    unsentRow.innerHTML = `<td>${climb.name}</td>
      <td>${climb.guide_rating}</td>
      <td>${climb.climb_type}</td>
      <td>${climb.pitches}</td>
      <td><a href ="${climb.mp_link}" target="_blank">Mountain Project</a></td>
      <td id="edit-${climb.id}"></td>
      <td id="delete-${climb.id}"></td>`
    editCell = document.querySelector(`#edit-${climb.id}`)
    editCell.appendChild(unsentEditBtn)
    deleteCell = document.querySelector(`#delete-${climb.id}`)
    deleteCell.appendChild(unsentDeleteBtn)
    deleteBtnEvent(unsentRow, unsentDeleteBtn, climb.id)
    editBtnEvent(unsentEditBtn, climb)
  }
}


// when add new climb button is clicked, shows the new climb form
function newClimbBtnEvent (id) {
  newClimbBtn.addEventListener('click', function(event){
    event.preventDefault()
    newClimbContainer.id = ""
    editClimbContainer.id = "edit-climb-container"
    newClimbForm.reset()
    newClimbForm.id = ""
  })
  newClimbFormFunc(id)
}

// then new climb form is submitted, appends row to table and calls post method
function newClimbFormFunc (id) {
  newClimbForm.addEventListener('submit', function(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    let body = createBody(formData)
    body.user_id = id
    postNewClimb(body, id)
    newClimbContainer.id = 'new-climb-container'
    store.climbs.push(body)
    populateClimbs(store.climbs)
  })
}

// posts the new climb
function postNewClimb (body, id) {
  return fetch(`http://localhost:3000/api/v1/climbs/`, {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  })
  .then(() => fetchUser(id))
  .catch(error => (console.error(error.message)))
}

// hides the row and deletes the instance
function deleteBtnEvent (row, btn, id) {
  const body = {
    id: id
  }
  btn.addEventListener('click', function () {
    row.className = "row-hide"
    return fetch(`http://localhost:3000/api/v1/climbs/${id}`, {
      method: "DELETE",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    })
    .catch(error => (console.error(error.message)))
  })
}

//triggers event listenter for edit button to show edit form, prepopulates with previous values
function editBtnEvent (btn, climb) {
  btn.addEventListener('click', function(event) {
    editClimbContainer.id = ""
    newClimbContainer.id = "new-climb-container"
    editClimbForm.id.value = climb.id
    editClimbForm.user_id.value = climb.user_id
    editClimbForm.name.value = climb.name
    editClimbForm.user_rating.value = climb.user_rating
    editClimbForm.guide_rating.value = climb.guide_rating
    editClimbForm.pitches.value = climb.pitches
    editClimbForm.comments.value = climb.comments
    editClimbForm.stars.value = climb.stars
    editClimbForm.mp_link.value = climb.mp_link
    editClimbForm.climb_type.value = climb.climb_type
    editClimbForm.edit_climb.value = `Edit '${climb.name}' entry`
  })
}


editClimbForm.addEventListener('submit', function(event) {
  event.preventDefault()
  const formData = new FormData(event.target)
  let body = createBody(formData)
  body.id = parseInt(formData.get("id"))
  user_id = parseInt(formData.get("user_id"))
  updateStore(body, user_id)
  editClimbContainer.id = "edit-climb-container"
})


function updateStore (body, user_id) {
console.log(body)
  const newStoreClimbs = store.climbs.filter(climb => climb.id != body.id)
  store.climbs = newStoreClimbs
  store.climbs.push(body)
  populateClimbs(store.climbs)
  editClimbPut(body, user_id)
}

function editClimbPut(body, user_id) {
  return fetch(`http://localhost:3000/api/v1/climbs/${body.id}`, {
    method: "PATCH",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  })
  .then(() => fetchUser(user_id))
  .catch(error => (console.error(error.message)))
}

function createBody(formData) {
  const body = {
    name: formData.get("name"),
    user_rating: formData.get("user_rating"),
    guide_rating: formData.get("guide_rating"),
    stars: formData.get("stars"),
    comments: formData.get("comments"),
    climb_type: formData.get("climb_type"),
    sent: formData.get("sent"),
    mp_link: formData.get("mp_link"),
    pitches: formData.get("pitches"),
  }
  return body
}
