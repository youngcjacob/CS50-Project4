document.addEventListener('DOMContentLoaded', function() {
    
    //document.querySelector('#form-input').onclick = () => newPost();
    // document.getElementById('All-posts').onclick = () => {allPosts()}
    document.getElementById('Username').onclick = () => {
        // reset();
        profilePage();}   
    // index();
    //getPosts();

});

function profilePage() {
   var elements = document.querySelectorAll('.user-posts');
   for (const element of elements) {
       element.style.display = 'block ';
    } 
    document.getElementById('Username').style.fontWeight = "normal";
    var elem = document.querySelectorAll('.all-posts');
    for (const e of elem) {
       e.style.display = 'none';
    }     
}

    //     const allSections = document.querySelectorAll('.all-posts-header')
    //     allSections.forEach(section => {
    //         section.style.display = 'block';
    //     })}

    //send views the username
    //return followers, follwing, etc
    //render all on screen
    //add if statement that will only show the edit buttons on the posts if logged in
    //follow/unfollow button
