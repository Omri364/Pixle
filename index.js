var keys_num = 28;
var guess_num = 1;
var curr_letter = 1;
var word_to_guess = "POKER";
var curr_guess = ""


// add listeners
for (var i=0; i<keys_num; i++) {
    document.getElementsByClassName("key")[i].addEventListener("click", handleKey);
}


// function press() {
//     setTimeout(handleKey, 100);
//     document.getElementsByClassName("Q")[0].classList.add("key-pressed");
// }

// function handleKey() {
    
//     document.getElementsByClassName("Q")[0].classList.remove("key-pressed");
// }

function handleKey() {
    // alert(this.classList);
    //TODO: change to check by class
    this.classList.add("key-pressed");
    if (this.classList.contains("enter")) {
        if (curr_guess.length == 5) {
            checkGuess(curr_guess);
            guess_num++;
            curr_letter = 1;
            curr_guess = "";
            var addr = "./pics/" + word_to_guess + "" + guess_num + ".png";
            document.getElementById("guess-pic").setAttribute("src", addr);
        }
        else {
            alert("Guess should be a 5 letter word");
        }
    }
    else if (this.classList.contains("delete")) {
        curr_letter--;
        curr_guess = curr_guess.slice(0, -1);
        document.getElementById("r"+guess_num+"c"+curr_letter).innerHTML = "";
    }
    else if (curr_guess.length < 5 && curr_guess.length > -1) {
        document.getElementById("r"+guess_num+"c"+curr_letter).innerHTML = this.innerHTML;
        curr_guess += this.innerHTML;
        curr_letter++;
    }
    // setTimeout(function(){this.classList.remove("key-pressed");}, 100);
    this.classList.remove("key-pressed");
}

function checkGuess(curr_guess) {
    // color slots
    for (var i=0; i<5; i++) {
        var found_color = false;
        if (curr_guess[i] == word_to_guess[i]) { // green box
            document.getElementById("r"+guess_num+"c"+(i+1)).classList.add("correct-pos-letter");
            document.getElementsByClassName(curr_guess[i])[0].classList.add("correct-pos-letter");
            found_color = true;
        }
        else {
            for (var j=0; j<5; j++) {
                if (curr_guess[i] == word_to_guess[j]) { // yellow box
                    document.getElementById("r"+guess_num+"c"+(i+1)).classList.add("correct-letter");
                    document.getElementsByClassName(curr_guess[i])[0].classList.add("correct-letter");
                    found_color = true;
                }
            }
        }
        if (!found_color) { // gray box
            // alert(curr_guess[i]);
            document.getElementById("r"+guess_num+"c"+(i+1)).classList.add("wrong-letter");
            document.getElementsByClassName(curr_guess[i])[0].classList.add("wrong-letter"); 
        }
        
        // adjust to each coloring
        // document.getElementsByClassName(curr_guess[i])[0].classList.add("correct-letter");        
    }

    // check win/lose
    if (curr_guess == word_to_guess) {
        alert("You Won!");
    }
    else if (guess_num == 3) {
        alert("You Lost! The word was: " + word_to_guess);
    }
}

