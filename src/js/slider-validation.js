
    const sliders = document.querySelectorAll(".input-container");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const errors = document.querySelectorAll(".error-message");
    const progress = document.querySelector(".input-sliders__progress");
    const email = document.getElementById("user-email");
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const mockServerUrl = "http://www.mocky.io/v2/5dfcef48310000ee0ed2c281";
    
    const errorAge = document.getElementById("error-age");
    const errorLocation = document.getElementById("error-aria");
    const emailError = document.getElementById("error-email");
    const passwordError = document.getElementById("error-password");
    const privacy = document.getElementById("slider-info1");
    const privacy2 = document.querySelector("#slider-info2");
    let currentSlideIndex = 0;
    
    function validateInput(input) {
        if (currentSlideIndex === 1) {
            if (input.value === "enter your age") {
                errorAge.textContent = "Please select your age";
                errorAge.classList.add('show-error');
                return false;
            } else {
                errorAge.textContent = "";
                errorAge.classList.remove('show-error');
            }
        }
    
        if (currentSlideIndex === 2) {
            if (input.value.trim() === "") {
                errorLocation.textContent = "This field is required";
                errorLocation.classList.add('show-error');
                privacy.classList.add('show');
                return false;
            } else if (input.value.replace(/[^0-9]/g, "").length === 0) {
                errorLocation.textContent = "Enter your postal code to find local matches";
                errorLocation.classList.add('show-error');
                privacy.classList.add('show');
                return false;
            } else {
                errorLocation.textContent = "";
                errorLocation.classList.remove('show-error');
                privacy.classList.remove('show');
            }
        }
    
        if (currentSlideIndex === 3) {
            if (input.value.trim() === "") {
                emailError.textContent = "Please enter your email address";
                emailError.classList.add('show-error');
                return false;
            } else if (!emailPattern.test(input.value)) {
                emailError.textContent = "Please enter a valid email address";
                emailError.classList.add('show-error');
                return false;
            } else {
                emailError.textContent = "";
                emailError.classList.remove('show-error');
            }
        }
    
        if (currentSlideIndex === 4) {
            if (input.value.trim() === "") {
                passwordError.textContent = "Please enter a password to secure your account";
                passwordError.classList.add('show-error');
                privacy2.classList.add('show');
                return false;
            } else if (!passwordPattern.test(input.value)) {
                passwordError.textContent = "Password must be at least 8 characters and include one letter, one number, and one special character.";
                passwordError.classList.add('show-error');
                privacy2.classList.add('show');
                return false;
            } else {
                passwordError.textContent = "";
                passwordError.classList.remove('show-error');
                privacy2.classList.remove('show');
            }
        }
        return true;
    }
    
    function sendRequest(formData) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", mockServerUrl, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    // Відправка вдалася
                    console.log("Ваш запит було вдало надіслано.");
                    console.log(xhr.responseText); // Вивід відповіді з мок-сервера
                } else {
                    // Відправка не вдалася
                    console.error("Виникла помилка під час відправки запиту.");
                }
            }
        };

        xhr.send(formData);
    }
    
    function updateProgress() {
        progress.innerHTML = "";
        for (let i = 0; i < sliders.length; i++) {
            const indicator = document.createElement("li");
            indicator.textContent = i === currentSlideIndex ? "●" : "○";
            progress.appendChild(indicator);
        }
    }
    
    function switchSlide(index) {
        for (let i = 0; i < sliders.length; i++) {
            sliders[currentSlideIndex].classList.remove('show-input');
            currentSlideIndex = index;
            sliders[currentSlideIndex].classList.add('show-input');
            updateProgress();
        }
    }
    
    prevBtn.addEventListener("click", () => {
        if (currentSlideIndex > 0) {
            switchSlide(currentSlideIndex - 1);
        }
    });
    
    nextBtn.addEventListener("click", () => {
        const currentSlide = sliders[currentSlideIndex];
        const input = currentSlide.querySelector("input, select");
    
        if (validateInput(input) === true) {
            
            if (currentSlideIndex === sliders.length - 1) {
                nextBtn.classList.add('form-sended');
                const form = document.getElementById("registration-form");
                const formData = new FormData(form);
                // Вивести дані в консоль
                for (const pair of formData.entries()) {
                    console.log(`${pair[0]}: ${pair[1]}`);
                }
                sendRequest(formData);
            } else {
                switchSlide(currentSlideIndex + 1);
            }
        }
    });
    
    
    updateProgress();
 
