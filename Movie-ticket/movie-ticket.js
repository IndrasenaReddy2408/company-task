function calculateTicket() {
  let age = Number(document.getElementById("age").value);
  let showtime = document.getElementById("showtime").value;

  let ticketPrice = 50;
  if (isNaN(age) || age <= 0) {
    document.getElementById("result").innerHTML =
      "Please enter valid details...";
    return;
  } else if (age <= 12) {
    ticketPrice -= 5;
  } else if (age >= 65 && showtime === "matinee") {
    ticketPrice -= 7;
  } else if (age > 12 && showtime === "evening") {
    ticketPrice += 15;
  }

  document.getElementById("result").innerHTML =
    "Customer Age Is :" + age + "<br>" + "Ticket Prise :" + ticketPrice;
}
