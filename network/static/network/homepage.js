document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('All-posts').style.fontWeight = "bold";
    //document.querySelector('#form-input').onclick = () => newPost();
    // document.getElementById('All-posts').onclick = () => {allPosts()}
    document.getElementById('Username').onclick = () => {
        profilePage();
    }   


    // document.getElementById('follow-unfollow').onclick = () => {
    //     followUnfollow();
    //  }

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

// function followUnfollow() {
//     //show the button with follow/unfollow depending on the status
//     //when selecting the button it should update the page
//     var folUnfolBtn = document.createElement('button')
//     folUnfolBtn.innerHTML = 'follow'
//     document.getElementById('follow-unfollow').append(folUnfolBtn)
//     return false;


// }

    //     const allSections = document.querySelectorAll('.all-posts-header')
    //     allSections.forEach(section => {
    //         section.style.display = 'block';
    //     })}

    //send views the username
    //return followers, follwing, etc
    //render all on screen
    //add if statement that will only show the edit buttons on the posts if logged in
    //follow/unfollow button
