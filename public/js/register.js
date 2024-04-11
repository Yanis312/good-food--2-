const form = document.querySelector(".login");

const validateForm = (e) => {
  e.preventDefault();

  const inputs = e.currentTarget.elements;
  let valid = true;

  for (let input of inputs) {
    if (input.validity.valid) {
      input.style.borderColor = "inherit";
    } else {
      input.style.borderColor = "red";
      valid = false;
    }
  }

  if (!valid) {
    alert("Please fill out all fields correctly.");
  }

  if (inputs["InputPassword"].value !== inputs["InputConfirmPassword"].value) {
    inputs["InputConfirmPassword"].style.borderColor = "red";
    alert("Passwords do not match.");
    valid = false;
  }

  return valid;
};

const registerUser = async (event) => {
  event.preventDefault();

  const inputs = event.currentTarget.elements;
  if (!form.checkValidity() || !validateForm(event)) {
    form.reportValidity();
    return;
  }

  let data = {
    email: inputs["InputEmail"].value,
    password: inputs["InputPassword"].value,
    firstName: inputs["InputName"].value,
    lastName: inputs["InputLastName"].value,
  };

  try {
    let response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      window.location.replace("/login");
    } else {
      throw new Error("Registration failed");
    }
  } catch (error) {
    alert("Error: " + error.message);
  }
};

form.addEventListener("submit", registerUser);
