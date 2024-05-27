document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const input = document.getElementById("input");
  const output = document.getElementById("output");
  const terminal = document.getElementById("terminal");
  var MAX_LINES = 22;

  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const command = input.value;
      input.value = "";
      handleCommand(command);
    }
  });

  function handleCommand(command) {
    displayCommand(command);
    const response = getCommandResponse(command);
    if (command != "clear") {
      typeResponse(response);
      checkLineLimit();
    }
  }

  function displayCommand(command) {
    const commandOutput = document.createElement("div");
    commandOutput.textContent = "> " + command;
    output.appendChild(commandOutput);
  }

  function typeResponse(response) {
    const responseOutput = document.createElement("div");
    output.appendChild(responseOutput);
    let i = 0;
    function typeChar() {
      if (i < response.length) {
        responseOutput.textContent += response.charAt(i);
        i++;
        setTimeout(typeChar, 25);
      }
    }
    typeChar();
  }

  function getCommandResponse(command) {
    switch (command.toLowerCase()) {
      case "help":
        return "Available commands: help, about, contact, clear, hide";
      case "about":
        return "This is a terminal-like website created as an example.";
      case "contact":
        return "Contact us at example@example.com";
      case "clear":
        clearTerminal();
        return "";
      case "hide":
        hideBanner();
        return "Banner is hidden";      
      default:
        return 'Command not found. Type "help" for a list of commands.';
    }
  }

  function checkLineLimit() {
    const lines = output.children;
    while (lines.length > MAX_LINES) {
      output.removeChild(lines[0]);
    }
  }

  function hideBanner() {
    const banner = document.getElementById("plain-terminal");
    banner.style.display = "none";
    terminal.style.height = "100%";
    MAX_LINES = 48;
  }  

  function clearTerminal() {    
    while (output.firstChild) {
      output.removeChild(output.firstChild);
    }
  }

  body.addEventListener("click", function () {
    input.focus();
  });

  // Focus the input on page load
  input.focus();

  // Add blinking cursor effect
  input.classList.add("blinking-cursor");
});
