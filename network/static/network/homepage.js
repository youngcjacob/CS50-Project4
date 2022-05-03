document.addEventListener('DOMContentLoaded', function() {
    newPost();

});

// //     
//     create an event listener for when someone clicks following, this will call the followingPosts function
//     create an event listener for when someone clicks post, this will call the newPost function
//     create an event listener for when someone clicks their user name, this will call the profile_page function
//     create an event listener for clicking edit post, which will only happen if the user created the post 
//     create an event listener for liking a post, this should call the likedPosts function


//     load all posts as the default page
//     below that should be all posts from all users with the create new post section at the top
// })

function newPost() {
    document.querySelector('#new-post').style.display = 'block';
    const addDiv = document.createElement('div');
    //addDiv.className = 'insert-post'
    addDiv.innerHTML = 'Big things are going to happen if this works';
    
    addDiv.addEventListener('submit', function() {
        document.querySelector('#new-post').append(addDiv);
    }) 
    return false;
}

    //check if the post is blank first, maybe even grey out the post until the user has entered something into the text box
    // this will render a text box for users to submit posts 
    // The post will be sent to the posts model in the backend 
    // will use a POST API call
    // the posts will capture the user and post content, the number of likes will default to an int of 0 from the model

//function displayPosts();
    //this will call all posts from the backend and render them on the screen
    //need an if statement to determine if displaying all posts or the ones that are from people the user follows
    //will need to employ the pagination method to only display ten at a time
    //will want logic to determine if the post can be edited by the creator or not - include edit button if true
    //want to display the amount of likes on a post, if liked the button turns red (start with regular button then worry about a heart)
        
//function followingPosts();
    //will use all posts but filter to only the posts of people who you are following

//function editPost();
    //this will allow the creator of a post to update the post contents
    //will call the post information from the backend and use a POST if saving the updates

//function profilePage();
    //will use a GET to pull in the amount of users, the people they follow
    //will want all posts that user has created, this might be another GET from the posts model 
    //if viewing another users page, will want to be able to follow or unfollow them 

//function likePost():
    //will post to the likedPosts model and return a new number that will be rendered on the screen

