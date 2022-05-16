document.addEventListener('DOMContentLoaded', function() {
    loadProfilePage();
});

function loadProfilePage() {
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

//this function gets called when the button is clicked in the user.html page
function followUnfollow(status, following, follower){

    if (status.value == 'follow') { //True if logged in user is following the user 
        const btnUnfollow = document.getElementById('btn-unfollow');
        btnUnfollow.style.display = 'block'
        const btnFollow = document.getElementById('btn-follow');
        btnFollow.style.display = 'none'
        fetch('/followUnfollow', {
            method:"POST",
            body: JSON.stringify({
                status: status.value,
                following: following,
                follower: follower
            })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        
    }
    else{
        const btnFollow = document.getElementById('btn-follow');
        btnFollow.style.display = 'block'
        const btnUnfollow = document.getElementById('btn-unfollow');
        btnUnfollow.style.display = 'none'
        fetch('/followUnfollow', {
            method:"DELETE",
            body: JSON.stringify({
                status: status.value,
                following: following,
                follower: follower
            })
        })
        .then(response => response.json())
        .then(data => console.log(data))
    }
    
    return false;
}

function likeUnlike(button, postId){
    var status = button
    if (status == `btn-unliked-Posts object (${postId})`){
        method = "POST"
    }
    else {
        method = "DELETE"
    }
    fetch('/likeUnlike', {
        method: method,
        body: JSON.stringify({
            postId: postId
        })
    })
    .then(response => response.json())
    .then(data => {console.log(data);
        if (data.likes == 1) {
            document.getElementById(`like-count-${postId}`).innerHTML = `${data.likes} Like`;
        }
        else {
            document.getElementById(`like-count-${postId}`).innerHTML = `${data.likes} Likes`;
        }

       if (method == "POST"){       
        document.getElementById(`btn-unliked-Posts object (${postId})`).style = "color:red";
        document.getElementById(`btn-unliked-Posts object (${postId})`).id = `btn-liked-Posts object (${postId})`;
       }
       else {
        document.getElementById(`btn-liked-Posts object (${postId})`).style = "color:black";
        document.getElementById(`btn-liked-Posts object (${postId})`).id = `btn-unliked-Posts object (${postId})`;
       }
    })
    return false;
}

function updatePost(postDetails, postId){
    document.getElementById(`post-update-${postId}`).style.display = 'block';
    document.querySelector(`[data-update="update-${postId}"]`).style.display = 'none';
    console.log("looking good")
}

function cancelUpdate(postDetails, postId){
    document.getElementById(`content-update-${postId}`).value = "";
    document.getElementById(`post-update-${postId}`).style.display = 'none';
    document.querySelector(`[data-update="update-${postId}"]`).style.display = 'block';
    console.log("looking good")
}

function submitPost(postDetails, postId){
    var newContent = document.getElementById(`content-update-${postId}`).value;
    document.getElementById(`${postId}-content`).innerHTML = `${newContent}`;
    document.getElementById(`post-update-${postId}`).style.display = 'none';
    document.querySelector(`[data-update="update-${postId}"]`).style.display = 'block';

    fetch('/update', {
        method: "PUT",
        body: JSON.stringify({
            newContent: newContent,
            postId: postId
        })
    })
    .then(response => response.json())
    .then(data => {console.log(data);
        document.getElementById(`content-update-${postId}`).value = "";
    })
}

