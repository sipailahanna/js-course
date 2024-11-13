const form = document.getElementById('myForm');

form.querySelectorAll("input, textarea, select").forEach(field => {
    field.addEventListener("blur", () => validateField(field));
    if (field.type === "checkbox") {
        field.addEventListener("change", () => validateField(field));
    }
});

const validationRules = {
    developers: "Поле 'Разработчики' не может быть пустым.",
    siteName: "Поле 'Название сайта' не может быть пустым.",
    siteUrl: "Введите корректный URL (например, http://example.com).",
    siteDescription: "Поле 'Описание сайта' не может быть пустым.",
    largeSiteDescription: "Описание сайта не может превышать 10 символов.",
    launchDate: "Поле 'Дата запуска сайта' не может быть пустым."
};

form.addEventListener("submit", (event) => {
    let isFormValid = true;
    const fields = form.querySelectorAll("input, textarea, select");
    
    fields.forEach(field => {
        if (!validateField(field)) {
            if (isFormValid) {
                field.scrollIntoView({ behavior: "smooth", block: "center" });
                field.focus();
            }
            isFormValid = false;
        }
    });

    if (!isFormValid) {
        event.preventDefault();
    }
});

const validateField = (field) => {
    const errorElement = document.getElementById(`${field.id}Error`);
    let isValid = true;
    
    if (field.type === "text") {
        if (field.value.trim() === "") {
            errorElement.textContent = validationRules[field.id];
            isValid = false;
        } else if (field.id === "siteUrl" && !/^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-]*)*$/.test(field.value.trim())) {
            errorElement.textContent = validationRules.siteUrl;
            isValid = false;
        } else {
            errorElement.textContent = "";
        }
    } else if (field.type === "date") {
        if (field.value === "") {
            errorElement.textContent = validationRules.launchDate;
            isValid = false;
        } else {
            errorElement.textContent = "";
        }
    } else if (field.type === "number") {
        const visitorsCount = parseInt(field.value, 10);
        if (field.value === "") {
            errorElement.textContent = "Поле 'Посетителей в сутки' не может быть пустым.";
            isValid = false;
        } else if (visitorsCount > 10) {
            errorElement.textContent = "Количество посетителей не может быть больше 10.";
            isValid = false;
        } else {
            errorElement.textContent = "";
        }
    } else if (field.type === "email") {
        if (field.value === "") {
            errorElement.textContent = "Email для связи' не может быть пустым.";
            isValid = false;
        } else {
            errorElement.textContent = "";
        }
    } else if (field.id === "category") {
        if (field.value === "") {
            errorElement.textContent = "Поле 'Рубрика каталога' не может быть пустым.";
            isValid = false;
        } else {
            errorElement.textContent = "";
        }
    } else if (field.id === "allowReviews") {
        if (!field.checked) { 
            errorElement.textContent = "Поле 'Разрешить отзывы' должно быть выбрано.";
            isValid = false;
        } else {
            errorElement.textContent = "";
        }
    } else if (field.type === "textarea") {
        if (field.value === "") {
            errorElement.textContent = validationRules.siteDescription;
            isValid = false;
        } else if (field.value.length > 10) {
            errorElement.textContent = validationRules.largeSiteDescription;
            isValid = false;
        } else {
            errorElement.textContent = "";
        }
    }

    return isValid;
};
