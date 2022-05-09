document.addEventListener('DOMContentLoaded', function() {
    
    //document.querySelector('#form-input').onclick = () => newPost();
    // document.getElementById('All-posts').onclick = () => {allPosts()}
    // document.getElementById('Username').onclick = () => {
    //     reset();
    //     profilePage();}   
    // index();
    //getPosts();

});

// function index(){
//     document.querySelector('.all-posts-header').style.display = 'block';
//     fetch('/')}

// function getPosts(pageNumber) {
//     document.querySelectorAll('.all-posts-header').style.display = 'block';
//     fetch(`/get-posts/${pageNumber}`)
//     .then(console.log("This is working"))

    // .then(message => console.log({"message": "working"}))
      //.then(data => { console.log(JSON.parse(data));
      //${pageNumber}

// }



//     const allSections = document.querySelectorAll('.all-posts-header')
//     allSections.forEach(section => {
//         section.style.display = 'block';
//     })
//     document.querySelector('#submit-button').disabled = true;
//     document.getElementById('All-posts').style.fontWeight = "bold";

//     const user_id = JSON.parse(document.getElementById('user_id').textContent);

//     //add API to grab all posts and add them to the home page
//     fetch('/get-posts')
//       .then(response => response.json())
//       .then(data => { console.log(JSON.parse(data));
//         JSON.parse(data).forEach(post => {
//             let user = post.fields.user;
//             if (user == user_id){
//             { 
//                 const addDiv = document.createElement('div');
//                 addDiv.className = `${post.pk}`;
//                 addDiv.innerHTML = `               
//                     <strong>${post.fields.user}</strong><br><br>
                    // <button data-update="post-${post.fields.content}" type="button">Edit</button>
// //                     <div id="content">${post.fields.content}<br></div>
//                     <div style="display: none;" id="update-input-field"> 
//                         <input id="new-entry"><br> 
//                         <input id="submit-new-entry" type='submit'> 
//                         <input id="cancel-new-entry" type='submit' value='Cancel'> 
//                     </div>
// //                     ${post.fields.timestamp}<br>
//                     Comment`;
//                 document.querySelector('#posts').append(addDiv); 
//             }
//         }
//             else {
//                 { 
//                     const addDiv = document.createElement('div');
//                     addDiv.className = `other-users-posts`;
//                     addDiv.innerHTML = `               
//                         <strong>${post.fields.user}</strong><br>
//                         ${post.fields.content}<br>
//                         ${post.fields.timestamp}<br>
//                         Comment`;
//                     document.querySelector('#posts').append(addDiv); 
//                 }
//             }
//         //calls editPost when the edit button is clicked for a specific post
//     document.querySelectorAll('[data-update]').forEach(button => {
//         button.onclick = function() {
//             console.log(button.parentNode.className);
//             editPost(this.dataset.update, button.parentNode.className);             
//         }
//     })
        
//     }) //wrapper of the entire thing 
//       })
//     return false;
// }

// function editPost(update, parent) {
//     document.querySelector(`[data-update="${update}"]`).style.display = 'none';
//     const currentDiv = document.querySelector(`[class='${parent}']`);
//     const subDiv = currentDiv.querySelector(`#update-input-field`);
//     subDiv.style.display = 'block';
    
//     subDiv.querySelector(`#submit-new-entry`).onclick = function() {
//         submitUpdate(currentDiv, subDiv, update, parent); }

//     subDiv.querySelector(`#cancel-new-entry`).onclick = function() {
//         subDiv.querySelector(`#new-entry`).value = "";
//         subDiv.style.display = 'none';
//         document.querySelector(`[data-update="${update}"]`).style.display = 'block';
//     }
//     return false;
// }

// function submitUpdate(currentDiv, subDiv, update, parent) {
//     const originalValue = currentDiv.querySelector(`#content`).value;
//     const updatedValue = subDiv.querySelector(`#new-entry`).value;
//         subDiv.querySelector(`#new-entry`).value = "";
//         subDiv.style.display = 'none';
//         document.querySelector(`[data-update="${update}"]`).style.display = 'block';
//         console.log(updatedValue);
//         currentDiv.querySelector(`#content`).innerHTML = `${updatedValue}`;
//         //send updates to django model
//         fetch('/update', {
//             method: 'POST',
//             body: JSON.stringify({
//                 original: originalValue,
//                 updatedContent: updatedValue,
//                 pk: parent

//             })
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             //allPosts(); - this requirement asks that the page not be reloaded
//             })

//         return false;
// }


// function newPost() {
//     document.querySelector('#submit-button').disabled = false;
//     document.querySelector('#post-form').onsubmit = () => {
//         const postDetails = document.querySelector('#form-input').value
//         document.querySelector('#form-input').value = "";

//         //add post to Posts model
//         fetch('/create', {
//             method: 'POST',
//             body: JSON.stringify({
//                 content: postDetails
//             })
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             allPosts();
//             })
//     }
// }

// function profilePage() {
//     const allSections = document.querySelectorAll('.all-posts-header')
//     allSections.forEach(section => {
//         section.style.display = 'block';
//     })}

// function reset(){

//     //reset all divs
//     document.querySelector('.all-posts-header').style.display = 'none';
//     document.querySelector('.user-details').style.display = 'none';
//     document.querySelector('other-users-posts').style.display = 'none';
//     //document.querySelector('#posts').style.display = 'none';

//     //reset all headers to normal
//     document.getElementById('Username').style.fontWeight = "normal";
//     document.getElementById('All-posts').style.fontWeight = "normal";    
//     document.getElementById('Following').style.fontWeight = "normal";

//     document.querySelector('#submit-button').disabled = true;
//     //return false;

// }