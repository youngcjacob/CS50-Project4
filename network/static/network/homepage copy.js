document.addEventListener('DOMContentLoaded', function() {
    
    document.querySelector('#form-input').onclick = () => newPost();
    document.getElementById('All-posts').onclick = () => {allPosts()}
    document.getElementById('Username').onclick = () => {reset();
        profilePage();}   

    allPosts();
    
    // to catch a selection of the edit button 

    // document.querySelectorAll('div').forEach(button => {
    //     button.onclick = function() {
    //         updatePost(this.dataset.update);}
    //     })

    
    
    //});
    
    // document.querySelector('update-post').addEventListener('click', () => {
    //     profilePage();
    // })

    //default page is all the user's posts
    
    }) 


//     create an event listener for when someone clicks following, this will call the followingPosts function
//     create an event listener for when someone clicks their user name, this will call the profile_page function
//     create an event listener for clicking edit post, which will only happen if the user created the post 
//     create an event listener for liking a post, this should call the likedPosts function

function updatePost(post) {
    document.querySelector(`#${post}`).style.display = 'none';

    const addDiv = document.createElement('div');
                addDiv.className = `all-posts${post.pk}`;
                addDiv.innerHTML = `               
                    ${post}`;
                document.querySelector(`#${post}`).append(addDiv);

}


function reset(){
    //reset all divs
    document.querySelector('#all-posts-header').style.display = 'none';
    document.querySelector('#user-profile').style.display = 'none';
    document.querySelector('#posts').style.display = 'none';
    //docuemnt.querySelector('all-posts').innerHTML = "";

    //reset all headers to normal
    document.getElementById('Username').style.fontWeight = "normal";
    document.getElementById('All-posts').style.fontWeight = "normal";    
    document.getElementById('Following').style.fontWeight = "normal";

    document.querySelector('#submit-button').disabled = true;
    //return false;

}

function allPosts() {
    reset();
    document.querySelector('#all-posts-header').style.display = 'block';
    document.querySelector('#posts').style.display = 'block';
    document.querySelector('#submit-button').disabled = true;

    document.getElementById('All-posts').style.fontWeight = "bold";

    const user_id = JSON.parse(document.getElementById('user_id').textContent);

    //add API to grab all posts and add them to the home page
    fetch('/get-posts')
      .then(response => response.json())
      .then(data => { console.log(JSON.parse(data));
        JSON.parse(data).forEach(post => {
            let user = post.fields.user;
            if (user == user_id){
            { 
                const addDiv = document.createElement('div');
                addDiv.className = `all-posts${post.pk}`;
                addDiv.innerHTML = `               
                    <strong>${post.fields.user}</strong><br><br>
                    <button data-update="post-${post.fields.content}" type="button">Edit</button><br>
                    ${post.fields.content}<br>
                    ${post.fields.timestamp}<br>
                    Comment`;
                document.querySelector('#posts').append(addDiv); 
            }
        }
            else {
                { 
                    const addDiv = document.createElement('div');
                    addDiv.className = 'all-posts';
                    addDiv.innerHTML = `               
                        <strong>${post.fields.user}</strong><br><br>
                        ${post.fields.content}<br>
                        ${post.fields.timestamp}<br>
                        Comment`;
                    document.querySelector('#posts').append(addDiv); 
                }
            }
        }) //wrapper of the entire thing 
        
        
            
      })
    return false;
}

function profilePage() {
    //Requirements 
        //number of followers
            //count the number of followers for that user
        //number of people they follow
            //count the number of people the logged in user follows
        //all posts for that user
            //get all posts and only display the ones that the user created 
        //ability to follow/unfollow this user if they are not the logged in user

    reset();
    document.querySelector('#user-profile').style.display = 'block';

    document.querySelector('#submit-button').disabled = true;

    document.getElementById('All-posts').style.fontWeight = "normal";

    document.getElementById('Username').style.fontWeight = "bold";

    const user_id = JSON.parse(document.getElementById('user_id').textContent);

    //add API to grab all posts and add them to the home page
    fetch('/get-posts')
      .then(response => response.json())
      .then(data => { console.log(JSON.parse(data));
        JSON.parse(data).forEach(post => {
            let user = post.fields.user;
            if (user == user_id){
            { 
                const addDiv = document.createElement('div');
                addDiv.className = `all-posts${post.pk}`;
                addDiv.innerHTML = `               
                    <strong>${post.fields.user}</strong><br><br>
                    <button data-update="post-${post.fields.content}" type="button">Edit</button><br>
                    ${post.fields.content}<br>
                    ${post.fields.timestamp}<br>
                    Comment`;
                document.querySelector('#posts').append(addDiv); 
            }
        }
    })
    })
}

function newPost() {
    document.querySelector('#submit-button').disabled = false;
    document.querySelector('#post-form').onsubmit = () => {
        const postDetails = document.querySelector('#form-input').value
        document.querySelector('#form-input').value = "";

        //add post to Posts model
        fetch('/create', {
            method: 'POST',
            body: JSON.stringify({
                content: postDetails
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            allPosts();
            })
    }
}



//     load all posts as the default page
//     below that should be all posts from all users with the create new post section at the top
// })



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

    document.addEventListener('DOMContentLoaded', function() {
    
        document.querySelector('#form-input').onclick = () => newPost();
        document.getElementById('All-posts').onclick = () => {allPosts()}
        document.getElementById('Username').onclick = () => {
            reset();
            profilePage();}   
    
        allPosts(1);
    });
    
    function allPosts(pageNumber) {
        const allSections = document.querySelectorAll('.all-posts-header')
        allSections.forEach(section => {
            section.style.display = 'block';
        })
        document.querySelector('#submit-button').disabled = true;
        document.getElementById('All-posts').style.fontWeight = "bold";
    
        const user_id = JSON.parse(document.getElementById('user_id').textContent);
    
        //add API to grab all posts and add them to the home page
        fetch('/get-posts')
          .then(response => response.json())
          .then(data => { console.log(JSON.parse(data));
            JSON.parse(data).forEach(post => {
                let user = post.fields.user;
                if (user == user_id){
                { 
                    const addDiv = document.createElement('div');
                    addDiv.className = `${post.pk}`;
                    addDiv.innerHTML = `               
                        <strong>${post.fields.user}</strong><br><br>
                        <button data-update="post-${post.fields.content}" type="button">Edit</button>
                        <div id="content">${post.fields.content}<br></div>
                        <div style="display: none;" id="update-input-field"> 
                            <input id="new-entry"><br> 
                            <input id="submit-new-entry" type='submit'> 
                            <input id="cancel-new-entry" type='submit' value='Cancel'> 
                        </div>
                        ${post.fields.timestamp}<br>
                        Comment`;
                    document.querySelector('#posts').append(addDiv); 
                }
            }
                else {
                    { 
                        const addDiv = document.createElement('div');
                        addDiv.className = `other-users-posts`;
                        addDiv.innerHTML = `               
                            <strong>${post.fields.user}</strong><br>
                            ${post.fields.content}<br>
                            ${post.fields.timestamp}<br>
                            Comment`;
                        document.querySelector('#posts').append(addDiv); 
                    }
                }
            //calls editPost when the edit button is clicked for a specific post
        document.querySelectorAll('[data-update]').forEach(button => {
            button.onclick = function() {
                console.log(button.parentNode.className);
                editPost(this.dataset.update, button.parentNode.className);             
            }
        })
            
        }) //wrapper of the entire thing 
          })
        return false;
    }
    
    function editPost(update, parent) {
        document.querySelector(`[data-update="${update}"]`).style.display = 'none';
        const currentDiv = document.querySelector(`[class='${parent}']`);
        const subDiv = currentDiv.querySelector(`#update-input-field`);
        subDiv.style.display = 'block';
        
        subDiv.querySelector(`#submit-new-entry`).onclick = function() {
            submitUpdate(currentDiv, subDiv, update, parent); }
    
        subDiv.querySelector(`#cancel-new-entry`).onclick = function() {
            subDiv.querySelector(`#new-entry`).value = "";
            subDiv.style.display = 'none';
            document.querySelector(`[data-update="${update}"]`).style.display = 'block';
        }
        return false;
    }
    
    function submitUpdate(currentDiv, subDiv, update, parent) {
        const originalValue = currentDiv.querySelector(`#content`).value;
        const updatedValue = subDiv.querySelector(`#new-entry`).value;
            subDiv.querySelector(`#new-entry`).value = "";
            subDiv.style.display = 'none';
            document.querySelector(`[data-update="${update}"]`).style.display = 'block';
            console.log(updatedValue);
            currentDiv.querySelector(`#content`).innerHTML = `${updatedValue}`;
            //send updates to django model
            fetch('/update', {
                method: 'POST',
                body: JSON.stringify({
                    original: originalValue,
                    updatedContent: updatedValue,
                    pk: parent
    
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                //allPosts(); - this requirement asks that the page not be reloaded
                })
    
            return false;
    }
    
    
    function newPost() {
        document.querySelector('#submit-button').disabled = false;
        document.querySelector('#post-form').onsubmit = () => {
            const postDetails = document.querySelector('#form-input').value
            document.querySelector('#form-input').value = "";
    
            //add post to Posts model
            fetch('/create', {
                method: 'POST',
                body: JSON.stringify({
                    content: postDetails
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                allPosts();
                })
        }
    }
    
    function profilePage() {
        const allSections = document.querySelectorAll('.all-posts-header')
        allSections.forEach(section => {
            section.style.display = 'block';
        })}
    
    function reset(){
    
        //reset all divs
        document.querySelector('.all-posts-header').style.display = 'none';
        document.querySelector('.user-details').style.display = 'none';
        document.querySelector('other-users-posts').style.display = 'none';
        //document.querySelector('#posts').style.display = 'none';
    
        //reset all headers to normal
        document.getElementById('Username').style.fontWeight = "normal";
        document.getElementById('All-posts').style.fontWeight = "normal";    
        document.getElementById('Following').style.fontWeight = "normal";
    
        document.querySelector('#submit-button').disabled = true;
        //return false;
    
    }