let min = 1,
	points = 0,
	max = 20,
	level = 1;
    winningNum = getRandomNum(min, max),
	guessesLeft = 5;
	
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again even listener
game.addEventListener('mousedown', function (e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});

game.addEventListener('mousedown', function (e){
	if(e.target.className === 'next-level'){
	  //var container = document.getElementById("levelTwo");
	//  container.style.display = 'block';
	  points += (5*level);
	  points += guessesLeft;
	  level += 1;
	  max = (20*level);
	  guessesLeft += 4;
	  minNum.textContent = min;
	  maxNum.textContent = max;
	  guessInput.value = '';
	  guessInput.disabled = false;
	  guessBtn.value = 'Submit';
	  guessBtn.className = '';
	  winningNum = getRandomNum(min, max);
	  document.getElementById("remainGuess").innerHTML = " " + guessesLeft + " GUESS LEFT"
	  document.getElementById("level").innerHTML = "LEVEL " + level 
	  document.getElementById("points").innerHTML = " " + points + "POINTS"
	}
  });

// Listen for guess

guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);
  
  //Validate
  if (isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  //Check if won
  else if (guess === winningNum){
    //Game over - won
	gameOver(true, `${winningNum} is correct, Next level!`);

  }else {
    //Wrong number
    guessesLeft -= 1;
	document.getElementById("remainGuess").innerHTML = " " + guessesLeft + " GUESS LEFT"
    if(guessesLeft === 0){
      //Game over - lost
     gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
    } else {
      //Game continues - answer wrong
      
	  //Change border color
      guessInput.style.borderColor = 'red';

      //Clear input
      guessInput.value = '';

	  //Tell user its the wrong number
	  if(guess <= winningNum)
		  setMessage(`${guess} is less than the correct number, ${guessesLeft} guesses left`, 'red');
	  else
		  setMessage(`${guess} is more than the correct number, ${guessesLeft} guesses left`, 'red');
	 }
  }
});

//Game over
function gameOver(won, msg){
  let color;
  won === true ? color = 'green' : color ='red';

  //disable input
  guessInput.disabled = true;
  //Change border color
  guessInput.style.borderColor = color;
  //set text color
  message.style.color = color;
  //Set message
  setMessage(msg);

  if(won){
  	guessBtn.value = 'Next Level';
	  guessBtn.className += 'next-level';
  }
  else{
	guessBtn.value = 'Play Again';
	guessBtn.className += 'play-again';
  }
}

//Get winning number
function getRandomNum(min, max){
  return Math.floor(Math.random()*(max-min+1) + min);
}

//set message
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}
