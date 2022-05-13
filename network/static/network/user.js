document.addEventListener('DOMContentLoaded', function() {
    
    loadProfilePage();
    //add an event listener for when the follow button is clicked

    // document.getElementById('follow-unfollow').onclick = followUnfollow()

    

});

//function followUnfollow(){
    //This will send a post or delete to the backend depending on if the current status is follow or not
//}

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
