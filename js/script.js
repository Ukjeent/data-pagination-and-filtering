  ///////////////
 // SearchBar //
///////////////

// Append a searchbar
const header = document.querySelector('.header');
const SearchBarHtml = `
   <label for="search" class="student-search">
   <span>Search by name</span>
   <input id="search" onkeyup="searchfunction(data)" placeholder="Search by name...">
   <button id ="searchbtn" type="button"><img id="searchBtnImg" src="img/icn-search.svg" alt="Search icon"></button>
   </label>`;
header.insertAdjacentHTML("beforeend", SearchBarHtml);

  //////////////////////////
 // Search functionality //
//////////////////////////

// Checks if a student name or email matches searchinput before adding the student to the studentList.
const studentList = document.querySelector('.student-list');
const searchInput = document.getElementById('search');
let newDataArray = [];

function searchfunction(list){
   const inputValue = searchInput.value.toLowerCase();
   newDataArray = data.filter( list => {
      if (list.name.first.toLowerCase().includes(inputValue) || list.name.last.toLowerCase().includes(inputValue) || list.email.toLowerCase().includes(inputValue)) {
         return true;
      }
   });
      showPage(newDataArray, 1);
      addPagination(newDataArray);
}


 // calls searchfunction when a user clicks on the searchbutton
document.addEventListener('click', (e) => {
   const clickTarget = e.target;
   if (clickTarget.id === 'searchbtn' || clickTarget.id === 'searchBtnImg') {
      searchfunction(data);
   }
});


  //////////////////
 // StudentList //
////////////////

// Creates a list of students and appends the list to the page. 
function showPage(list, page) {
   studentList.innerHTML = '';
   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;
   if (list.length !== 0) { //Checks that list is not empty before creating list items.
      for (let i = 0; i < list.length; i++) {
         if (i >= startIndex && i < endIndex) {
            const html = `
            <li class="student-item cf">
            <div class="student-details">
            <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
            <h3>${list[i].name.first} ${list[i].name.last}</h3>
            <span class="email">${list[i].email}</span>
            </div>
            <div class="joined-details">
            <span class="date">Joined ${list[i].registered.date}</span>
            </div>
         </li>
         `;
         studentList.insertAdjacentHTML("beforeend", html);
      }
      }
   } else { // Appends a "no result" text if the list is empty.
      const html = `
      <li class="student-item cf">
      <div>
      <h3>No results found</h3>
      </div>
      </li>
      `;
      studentList.insertAdjacentHTML("beforeend", html);
   }
}

  /////////////////
 // Pageination //
/////////////////

const linkList = document.querySelector('.link-list');

// Creates list elements / pagebuttons and appends the buttons to the site. 
function addPagination(list) {
   const numOfPages = Math.ceil(list.length / 9);
   linkList.innerHTML = '';
   for (let i = 0; i < numOfPages; i++) {
      linkList.innerHTML += `
      <li>
      <button class="pageBtn" type="button">${i+1}</button>
    </li>`;
   }
   const firstButton = document.querySelector('.pageBtn');
   if (firstButton !== null) { // Prevents error when no searchresult is found 
      firstButton.classList.add('active');
   }
}

// Listens for button clicks, removes active from all buttons and adds the active class to the clicktarget.
// Calls the showPage function to update the page. 
linkList.addEventListener('click', (e) => {
   const clickTarget = e.target;
   const pageBtn = document.querySelectorAll('.link-list .pageBtn');
   let pageNum = 1;
   console.log(clickTarget);
   if (clickTarget.classList.contains('pageBtn')) {
      pageBtn.forEach(element => element.classList.remove('active'));
      clickTarget.classList.add('active');
      pageNum = clickTarget.innerHTML;
      if (searchInput.value === '') {
         showPage(data, pageNum);
      } else {
         showPage(newDataArray, pageNum);
      }
   }
});

  ////////////////////
 // Call functions //
////////////////////

showPage(data, 1);
addPagination(data);