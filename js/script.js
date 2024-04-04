"use strict";

const form = document.querySelector(".form-container");
const overlay = document.querySelector(".overlay");
const btnCloseForm = document.querySelector(".close-form");
const btnsOpenForm = document.querySelectorAll(".btn-page");
const btnSubmitForm = document.querySelector(".btn-form");

const countrySelect = document.getElementById("country");
const phonePrefixInput = document.getElementById("phone-prefix");

const openForm = function () {
  form.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeForm = function () {
  form.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenForm.length; i++)
  btnsOpenForm[i].addEventListener("click", openForm);

btnCloseForm.addEventListener("click", closeForm);
overlay.addEventListener("click", closeForm);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !form.classList.contains("hidden")) {
    closeForm();
  }
});

const validateForm = function () {
  const firstName = document.getElementById("first-name").value.trim();
  const lastName = document.getElementById("last-name").value.trim();
  const email = document.getElementById("email").value.trim();

  if (firstName === "" || lastName === "" || email === "") {
    alert("Please fill out all required fields.");
    return false;
  }

  return true;
};

// GETTING THE DATA FOR COUNTRIES AND PHONE PREFIXES

fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    populateCountryOptions(data);

    countrySelect.addEventListener("change", updatePrefix);

    window.countryData = data;
  })
  .catch((error) => {
    console.error("Error fetching country data:", error);
  });

function populateCountryOptions(data) {
  data.forEach((country) => {
    const option = document.createElement("option");
    option.value = country.idd.root;
    option.textContent = country.name.common;
    countrySelect.appendChild(option);
  });
}

function updatePrefix() {
  const selectedCountryCode = countrySelect.value;

  const selectedCountry = window.countryData.find(
    (country) => country.idd.root === selectedCountryCode
  );

  phonePrefixInput.value = selectedCountry ? selectedCountry.idd.root : "";
}

form.addEventListener("submit", function (event) {
  if (!validateForm()) {
    event.preventDefault();
  }
});
