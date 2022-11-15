window.onload = gameStart;

var board = [ [9,9,9,9,9,9,9,9,9,9,9,],
              [9,0,0,0,0,0,0,0,0,0,0,],
              [9,0,0,0,0,0,0,0,0,0,0,],
              [9,0,0,0,0,0,0,0,0,0,0,],
              [9,0,0,0,0,0,0,0,0,0,0,],
              [9,0,0,0,0,0,0,0,0,0,0,],
              [9,0,0,0,0,0,0,0,0,0,0,],
              [9,0,0,0,0,0,0,0,0,0,0,],
              [9,0,0,0,0,0,0,0,0,0,0,],
              [9,0,0,0,0,0,0,0,0,0,0,],
              [9,0,0,0,0,0,0,0,0,0,0,] ]; //9คือนอกบอร์ด, 0=น้ำทะเล

var correctShot = 0;
var wrongShot = 0;
var bullet = 15;

function gameStart() {
    var userTable = document.getElementById('boardTable');

    backBtn = document.getElementById("backBtn");
    backBtn.style.display = "none";

    for (let row = 1; row <=10; row++) {
        for (let column = 1; column <= 10;  column++) {
            userTable.rows[row].cells[column].style.backgroundColor="#4BBCCA";
            userTable.rows[row].cells[column].innerHTML = "";
            board[row][column] = 0; 
        }
    }

    SHIP = 3;
    SHIPLENGTH = 4;
    
    for (let i = 0; i < SHIP; i++) {
        var shipRowPosition = Math.floor(Math.random()*7)+1; //random between 1-7
        var shipColumnPosition = Math.floor(Math.random()*7)+1;
        var HoriOrVerti = Math.floor(Math.random()*2); //Between 0-1.
        for (let length = 0; length < SHIPLENGTH; length++) {
            if(HoriOrVerti == 0){
                board[shipRowPosition][shipColumnPosition + length] = 1;
            }else{
                board[shipRowPosition + length][shipColumnPosition] = 1;
            }
        }
    }
}

function showAllShips() {
    userTable = document.getElementById("boardTable");

    for (let row = 1; row <= 10; row++) {
        for (let column = 1; column <= 10; column++) {
            if (board[row][column] != 0){
                userTable.rows[row].cells[column].innerHTML = board[row][column];
            }
        }
    }
    setBtn("end");
    calculateScore();
}

function shotRocket(){
    message = "";
    var userRow = document.getElementById("rowChosen").value;
    var userColumn = document.getElementById("columnChosen").value;
    userTable = document.getElementById("boardTable");
    bullet --;
    if (board[userRow][userColumn] == 1){
        message += "HIT !!! Rocket +1 ";
        userTable.rows[userRow].cells[userColumn].innerHTML = "+1";
        userTable.rows[userRow].cells[userColumn].style.backgroundColor = "lime";
        correctShot++;
        bullet ++;
        message += "Rocket left " + bullet
    }else{
        message += "Miss! ";
        // userTable.rows[userRow].cells[userColumn].innerHTML = -1;
        userTable.rows[userRow].cells[userColumn].style.backgroundColor = "#2193a1";
        wrongShot++;
        message += "Rocket left " + bullet
    }
    document.getElementById("display").innerHTML = message;

    if(bullet <= 0 || correctShot >= SHIP * SHIPLENGTH){
        showAllShips();
    }
}

function setBtn(status)
{
    shotBtn = document.getElementById("shotBtn");
    backBtn = document.getElementById("backBtn");
    GiveupBtn = document.getElementById("GiveupBtn");
    
    if(status == "start"){
        backBtn.style.display = "none";
    }
    else if(status == "end"){
        GiveupBtn.style.display = "none";
        shotBtn.style.display = "none";
        backBtn.style.display = "block";
    }
}

function calculateScore()
{
    score = (correctShot/(SHIP * SHIPLENGTH)) * 100;
    document.getElementById("display").innerHTML = "Your score is " + score;
    saveScore(score);
}

function backToMenu() {
    res.redirect('index.html');
  }

//Send data
function getCookie(name){
	var value = "";
	try{
		value = document.cookie.split("; ").find(row => row.startsWith(name)).split('=')[1]
		return value
	}catch(err){
		return false
	} 
}

async function saveScore(score){
	var username = getCookie('username');
	let response = await fetch("/saveScore",{
		method: "POST",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			user:username,
			score:score})
	});
}