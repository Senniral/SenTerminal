var input = document.querySelector('.terminal input');
input.focus();// Focus the input element when the page loads
// Add a keydown event listener to the input element
input.addEventListener('keydown', function(event) {
  // Handle command if the user presses the "enter" key
  if (event.keyCode === 13) {
    handleCommand();
  }
});

function handleCommand() {
  var command = input.value;
  // Clear the input element
  input.value = '';
  var output = document.querySelector('.terminal .output');
  output.innerHTML += '$ ' + command + '\n';
  
  // Check for the "echo" command
  if (command.startsWith('echo ')) {
    var message = command.substring(5);
    output.innerHTML += message + '\n';
  } 


else if (command === 'help') {
    output.innerHTML += 'Current help command:\n' + '1. echo yourString \n' + '2. myip \n' + '3. cat \n' + '4. catspecs num num - [ex: catspecs 300 300](length and width) \n' + 'extra: clear (clears the whole page.) \n' ;
  } 


  //ip
  else if (command === 'myip') {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        output.innerHTML += 'Your IP address is: ' + data.ip + '\n';
      });
    }


    //clear
    else if (command === 'clear') {
        output.innerHTML = '';
    }

   else if (command === 'cat') {
        fetch('https://api.thecatapi.com/v1/images/search?format=json')
          .then(response => response.json())
          .then(data => {
            var catUrl = data[0].url;
            output.innerHTML += '<img src="' + catUrl + '" alt="Random cat picture">\n';
          });
      }

      else if (command.startsWith('catspecs ')) {
        // Split the command into the command name and the parameters
        var commandParts = command.split(' ');
        var width = commandParts[1] || '300';
        var height = commandParts[2] || '300';
        // Request a random cat picture from the "random.cat" API
        fetch('https://api.thecatapi.com/v1/images/search?format=json')
          .then(response => response.json())
          .then(data => {
            var catUrl = data[0].url;
            output.innerHTML += '<img src="' + catUrl + '" width="' + width + '" height="' + height + '" alt="Random cat picture">\n';
          });
      } else {
        output.innerHTML += 'Unkown command. \n';
      }     
      
}

