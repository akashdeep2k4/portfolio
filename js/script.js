const header = document.querySelector(".header");
const navbar = document.querySelector(".navbar");
const menu = document.querySelector(".menu");
const menuLink = document.querySelectorAll(".menu-link");
const toggleMenu = document.querySelector(".toggle-menu");
const toggleTheme = document.querySelector(".toggle-theme");

const toggleElement = function (element) {
    element.classList.toggle("active");
};

toggleMenu.addEventListener("click", function () {
    toggleElement(menu);
    toggleElement(toggleMenu);
    toggleElement(document.body);
});

menuLink.forEach((link) => {
    link.addEventListener("click", () => {
        if (header.clientWidth < 1024) {
            toggleMenu.click();
        }
    });
});

const title = document.querySelectorAll(".title");

window.addEventListener("scroll", function () {
    if (window.scrollY >= 16) {
        header.classList.add("active");
    } else {
        header.classList.remove("active");
    }
});

if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.body.classList.add("dark-theme");
    toggleTheme.innerHTML = `<i class='bx bxs-moon'></i>`;
} else {
    document.body.classList.add("light-theme");
    toggleTheme.innerHTML = `<i class='bx bxs-sun'></i>`;
}

toggleTheme.addEventListener("click", function () {
    if (document.body.classList.contains("dark-theme")) {
        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");
        toggleTheme.innerHTML = `<i class='bx bxs-sun'></i>`;
    } else {
        document.body.classList.add("dark-theme");
        document.body.classList.remove("light-theme");
        toggleTheme.innerHTML = `<i class='bx bxs-moon'></i>`;
    }
});

// window.onload = function () {
//     document.getElementById("form").reset();
// };

const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    result.innerHTML = "Please wait...";

    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: json,
    })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = "Form submitted successfully";
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch((error) => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function () {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});
