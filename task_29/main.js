// Взаимодействие с формами

const sendButton = document.getElementById("send");

const processForm1 = () => {
    const firstName = document.getElementById("name").value;
    const lastName = document.getElementById("surname").value;
    const  output = "Hello " + firstName + " " + lastName + "!";
    document.getElementById("output").innerHTML = output;
}

sendButton.addEventListener("click", processForm1);