(function () {
    var avatarDataUrl = '';

    window.addEventListener('DOMContentLoaded', function () {
        var avatarBtn = document.getElementById('avatarBtn');
        var fileInput = document.getElementById('fileInput');
        var toLoginBtn = document.getElementById('toLoginBtn');
        var submitBtn = document.getElementById('submitActionBtn');

        if (avatarBtn && fileInput) {
            avatarBtn.addEventListener('click', function () {
                fileInput.click();
            });
        }

        if (fileInput) {
            fileInput.addEventListener('change', function (event) {
                var input = event.target;
                if (input && input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        if (avatarBtn && e.target && e.target.result && typeof e.target.result === 'string') {
                            avatarDataUrl = e.target.result;
                            avatarBtn.style.backgroundImage = "url('" + avatarDataUrl + "')";
                            avatarBtn.classList.add('has-image');
                        }
                    };
                    reader.readAsDataURL(input.files[0]);
                }
            });
        }

        if (toLoginBtn) {
            toLoginBtn.addEventListener('click', function () {
                window.location.href = 'HtmlPage4.html';
            });
        }

        if (submitBtn) {
            submitBtn.addEventListener('click', function () {
                var nameField = document.getElementById('nickname');
                var mailField = document.getElementById('userEmail');
                if (nameField && nameField instanceof HTMLInputElement) {
                    localStorage.setItem('urban_username', nameField.value || 'Пользователь');
                }
                if (mailField && mailField instanceof HTMLInputElement) {
                    localStorage.setItem('urban_email', mailField.value || 'example@gmail.com');
                }
                if (avatarDataUrl) {
                    localStorage.setItem('urban_avatar', avatarDataUrl);
                }
                // Универсальный относительный переход в корень сайта для гарантированного обхода 404
                window.location.href = 'https://github.io';
            });
        }
    });
})();
