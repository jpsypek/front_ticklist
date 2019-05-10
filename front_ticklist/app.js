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
const accordions = document.querySelectorAll('.accordion')
const closeEditForm = document.querySelector('.close-edit-form-btn')
const topPage = document.querySelector('.top')
const closeNewForm = document.querySelector('.close-new-form-btn')
const store = {}

// user sign in, fetches all users to see if user exists. If so, fetch the data of that user
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

// get all users
function allUsers() {
  return fetch('http://localhost:3000/api/v1/users/')
    .then(response => response.json())
    .catch(error => console.error(error.message))
}

// returns found user from log in, otherwise displays error message
function findUser(users, userName) {
  const user = users.find(function(user) {
    return user.name === userName
  })
  if (user) {
    userForm.id = "user-form-submit"
    newClimbBtn.id = ""
    return user
  } else {
    userError.innerHTML = "User does not exist. Please try again."
  }
}

// fetch data from specific user, then populates the climbs tables
function fetchUser(id) {
  return fetch(`http://localhost:3000/api/v1/users/${id}`)
    .then(response => response.json())
    .then(user => user.data)
    .then(climb => store.climbs = climb.attributes.climbs)
    .then(() => populateClimbs(store.climbs))
    // .then(() => fillTabulator(store.climbs))
    .catch(error => console.error(error.message))
}

// populates the ticked and unticked tables based on the climbs specific to the user
function populateClimbs(climbs) {
  clearTable()
  climbHeader.id = ""
  orderedClimbs = orderClimbs(climbs)
  orderedClimbs.forEach(function(climb) {
    appendTable(climb)
  })
}

// clears all data from the table
function clearTable() {
  while (tickedList.childNodes.length > 0) {
    tickedList.removeChild(tickedList.firstChild)
  }
  while (untickedList.childNodes.length > 0) {
    untickedList.removeChild(untickedList.firstChild)
  }
}

// orders the climbs based on the number of stars provided by the user
function orderClimbs(climbs) {
  return climbs.sort(function(a, b) {
    return b.stars - a.stars
  })
}

// appends a row to the appropriate table based whether or not it has been sent
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
function newClimbBtnEvent(id) {
  newClimbBtn.addEventListener('click', function(event) {
    event.preventDefault()
    newClimbContainer.id = ""
    newClimbContainer.scrollIntoView({behavior: "smooth"})
    editClimbContainer.id = "edit-climb-container"
    newClimbForm.reset()
    newClimbForm.id = ""
  })
  newClimbFormFunc(id)
}

// when new climb form is submitted, adds the climb to the store, populates the table, and calls post method
function newClimbFormFunc(id) {
  newClimbForm.addEventListener('submit', function(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    let body = createBody(formData)
    body.user_id = id
    newClimbContainer.id = 'new-climb-container'
    store.climbs.push(body)
    populateClimbs(store.climbs)
    postNewClimb(body, id)
  })
}

// posts the new climb
function postNewClimb(body, id) {
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

// hides the row and deletes the instance from the db
function deleteBtnEvent(row, btn, id) {
  const body = {
    id: id
  }
  btn.addEventListener('click', function() {
    row.className = "row-hide"
    editClimbContainer.id = "edit-climb-container"
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
function editBtnEvent(btn, climb) {
  btn.addEventListener('click', function(event) {
    editClimbContainer.id = ""
    newClimbContainer.id = "new-climb-container"
    editClimbContainer.scrollIntoView({behavior: "smooth"})
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

// listens for edit form to be submitted, triggers an update of the store and patch
editClimbForm.addEventListener('submit', function(event) {
  event.preventDefault()
  const formData = new FormData(event.target)
  let body = createBody(formData)
  body.id = parseInt(formData.get("id"))
  user_id = parseInt(formData.get("user_id"))
  updateStore(body, user_id)
  editClimbContainer.id = "edit-climb-container"
})

// updates the store with the updated information
function updateStore(body, user_id) {
  const newStoreClimbs = store.climbs.filter(climb => climb.id != body.id)
  store.climbs = newStoreClimbs
  store.climbs.push(body)
  populateClimbs(store.climbs)
  editClimbPatch(body, user_id)
}

// updates the db with a patch based on the edited form data
function editClimbPatch(body, user_id) {
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

// creates the body (for either the post or patch) based on
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

// close the edit-climb form
closeEditForm.addEventListener('click', function() {
  editClimbContainer.id = "edit-climb-container"
})

// close the new-climb form
closeNewForm.addEventListener('click', function() {
  newClimbContainer.id = "new-climb-container"
})

// When the "accordion" is clicked, either display or hide the relevant table depending on whether it is currently being shown
accordions.forEach(function(accordion) {
  accordion.addEventListener("click", function() {
    event.target.classList.toggle("active");
    const panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  })
})
