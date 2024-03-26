function validateForm() {
    var nameInput = document.getElementById('name');
    var nameError = document.getElementById('nameError');
    var name = nameInput.value.trim();

    var emailInput = document.getElementById('email');
    var emailError = document.getElementById('emailError');
    var email = emailInput.value.trim();

    var passwordInput = document.getElementById('password');
    var passwordError = document.getElementById('passwordError');
    var password = passwordInput.value;

    var passwordConfirmInput = document.getElementById('password_c');
    var passwordConfirmError = document.getElementById('password_cError');
    var passwordConfirm = passwordConfirmInput.value;

    var phoneInput = document.getElementById('phone');
    var phoneError = document.getElementById('phoneError');
    var phone = phoneInput.value.trim();

    var dateInput = document.getElementById('date');
    var dateError = document.getElementById('dateError');
    var dateOfBirth = dateInput.value ? new Date(dateInput.value) : null; // Проверяем на пустое значение
    var currentDate = new Date();
    var minDate = new Date(currentDate.getFullYear() - 111, currentDate.getMonth(), currentDate.getDate());

    var genderInput = document.querySelector('input[name="gender"]:checked');
    var genderError = document.getElementById('genderError');
    var gender = genderInput ? genderInput.value : null;

    var imageInput = document.getElementById('image');
    var imageError = document.getElementById('imageError');
    var image = imageInput.files[0]; // Получаем файл

    var error = false;

    sessionStorage.clear();

    // Скрыть сообщения об ошибках перед проверкой
    nameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    passwordConfirmError.textContent = '';
    phoneError.textContent = '';
    dateError.textContent = '';
    genderError.textContent = '';
    imageError.textContent = '';

    // Проверка на пустоту имени
    if (name === '') {
        nameError.textContent = 'Имя не может быть пустым';
        error = true;
    }

    if (/\d/.test(name)) {
        nameError.textContent = 'Имя не может содержать цифры';
        error = true;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        emailError.textContent = 'Неверный формат электронной почты';
        error = true;
    }

    var currentMonth = currentDate.toLocaleString('en', {
        month: 'long'
    }).toLowerCase();
    var passwordRegex = new RegExp(
        "(?=.{8,})" + 
        "(?!.*(.)\\1{1})" + 
        "(?=.*\\W.*\\W)" + 
        "(?=.*[" + currentMonth + "])" + 
        "(?=.*[a-zA-Zа-яА-Я])" + 
        "(?!.*\\W{3,})" 
    );

    if (!passwordRegex.test(password)) {
        passwordError.textContent =
            'Пароль должен содержать не менее 8 символов, не содержать двух одинаковых символов подряд, содержать как минимум 2 специальных символа, включать название текущего месяца на английском языке и не содержать более 2 подряд идущих специальных символов, должны быть русские и английские буквы';
        error = true;
    }

    if (password !== passwordConfirm) {
        passwordConfirmError.textContent = 'Пароли не совпадают';
        error = true;
    }

    if (phone === '') {
        phoneError.textContent = 'Номер телефона не может быть пустым';
        error = true;
    }

    if (!dateOfBirth || dateOfBirth > currentDate || dateOfBirth < minDate) {
        dateError.textContent = 'Неверная дата рождения';
        error = true;
    }

    if (!gender) {
        genderError.textContent = 'Пожалуйста, выберите свой пол';
        error = true;
    }

    if (!image) {
        imageError.textContent = 'Пожалуйста, выберите изображение';
        error = true;
    } else {
        var imageName = image.name;
        var imageSize = image.size;
        var imageType = image.type;

        if (imageName.length > 15) {
            imageError.textContent = 'Имя изображения не должно превышать 15 символов';
            error = true;
        }

        if (imageType !== 'image/png') {
            imageError.textContent = 'Изображение должно быть в формате PNG';
            error = true;
        }

        if (imageSize < 1024 || imageSize > 1024 * 1024 * 10) {
            imageError.textContent = 'Размер изображения должен быть от 1 КБ до 10 МБ';
            error = true;
        }
    }

    return !error;
}

document.addEventListener('DOMContentLoaded', function () {
    var phoneInput = document.getElementById('phone');
    var phoneMask = new Inputmask("+7 (999) 999-99-99", {
        "placeholder": "_"
    });
    phoneMask.mask(phoneInput);
});