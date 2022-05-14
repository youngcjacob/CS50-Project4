document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('All-posts').style.fontWeight = "bold";
    document.getElementById('Following').onclick = () => {
        followingPage();
    }
    document.getElementById('Username').onclick = () => {
        profilePage();
    }   
    // document.getElementById('like-unlike').onclick = () => {
    //     likeUnlike();
    // }

});

function profilePage() {
    document.getElementById('Username').style.fontWeight = "bold";
    var elements = document.querySelectorAll('.user-posts');
   for (const element of elements) {
       element.style.display = 'block ';
    } 
    var elem = document.querySelectorAll('.all-posts');
    for (const e of elem) {
       e.style.display = 'none';
    }     
    return false;
}

function followingPage() {
    document.getElementById('Following').style.fontWeight = "bold";   
    document.getElementById('All-posts').style.fontWeight = "normal";
    return false;
}

function likeUnlike(button, postId, postLikes){
    var status = button
    if (status == `btn-unliked-Posts object (${postId})`){
        method = "POST"
        document.getElementById(`btn-unliked-Posts object (${postId})`).style = "color:red";
        document.getElementById(`like-count-${postId}`).innerHTML = postLikes + 1;
        console.log(status)}
    else {
        method = "DELETE"
        document.getElementById(`like-count-${postId}`).innerHTML = postLikes -1;
        document.getElementById(`btn-liked-Posts object (${postId})`).style = "color:black";
        console.log(status)
    }
    fetch('/likeUnlike', {
        method: method,
        body: JSON.stringify({
            postId: postId,
            postLikes: postLikes
            // follower: follower
        })
    })
    .then(response => response.json())
    .then(data => console.log(data) )
    return false;
}





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
