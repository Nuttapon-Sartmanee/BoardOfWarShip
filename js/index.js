var username = getCookie('username');
var userText

function checkCookie(){
	var username = "";
	if(getCookie("username")==false){
		window.location = "login.html";
	}
}

checkCookie();

window.onload = pageLoad;
function pageLoad(){
    userText = document.getElementById("user")
    setUsername()
}

function getCookie(name){
	var value = "";
	try{
		value = document.cookie.split("; ").find(row => row.startsWith(name)).split('=')[1]
		return value
	}catch(err){
		return false
	} 
}

function setUsername(){
    if(username == null){
        userText.innerHTML = "Guest";
    }else{
        userText.innerHTML = "Welcome back "+username+" !";
    }
}
window.addEventListener( "pageshow", function ( event ) {
	var historyTraversal = event.persisted || 
						   ( typeof window.performance != "undefined" && 
								window.performance.navigation.type === 2 );
	if ( historyTraversal ) {
	  // Handle page restore.
	  window.location.reload();
	}
  });
