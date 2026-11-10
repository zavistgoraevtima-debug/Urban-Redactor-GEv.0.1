(function () {
    var currentTargetUrl = '';
    var avatarDataUrl = '';

    window.addEventListener('DOMContentLoaded', function () {
        // --- ПРОШИВКА ЛОГИКИ ДЛЯ ГЛАВНОЙ СТРАНИЦЫ (INDEX.HTML) ---
        var c = document.getElementById('pC');
        var a = document.getElementById('uA');
        var l = document.getElementById('lL');
        if (c && a) {
            var sn = localStorage.getItem('urban_username');
            var sm = localStorage.getItem('urban_email');
            var si = localStorage.getItem('urban_avatar');
            if (sn) {
                if (l) l.style.display = 'none';
                var mm = 'Почта:***@gmail.com';
                if (sm && sm.includes('@')) mm = 'Почта:***@' + sm.split('@');
                var tb = document.createElement('div');
                tb.className = 'pt';
                tb.innerHTML = '<span class="un">' + sn + '</span><span class="um">' + mm + '</span>';
                c.insertBefore(tb, a);
                if (si) {
                    a.style.backgroundImage = "url('" + si + "')";
                    a.classList.add('hi');
                }
            }
        }

        var btnNewProject = document.getElementById('btnNewProject');
        var btnSupport = document.getElementById('btnSupport');
        var btnShare = document.getElementById('btnShare');
        var btnExitModal = document.getElementById('btnExitModal');
        var btnRetryModal = document.getElementById('btnRetryModal');
        var themeCheckbox = document.getElementById('theme-checkbox');

        if (btnNewProject) {
            btnNewProject.addEventListener('click', function () {
                if (localStorage.getItem('urban_username')) {
                    window.location.href = 'HtmlPage5.html';
                } else {
                    triggerLinkCheck('HtmlPage3.html');
                }
            });
        }
        if (btnSupport) {
            btnSupport.addEventListener('click', function () {
                triggerLinkCheck('https://discord.gg');
            });
        }
        if (btnShare) {
            btnShare.addEventListener('click', function () {
                triggerLinkCheck('HtmlPageShare.html');
            });
        }
        if (btnExitModal) {
            btnExitModal.addEventListener('click', function () {
                var modal = document.getElementById('eM');
                if (modal) modal.style.display = 'none';
            });
        }
        if (btnRetryModal) {
            btnRetryModal.addEventListener('click', function () {
                runLinkValidation(false);
            });
        }
        if (themeCheckbox) {
            themeCheckbox.addEventListener('change', function () {
                var html = document.documentElement;
                if (themeCheckbox instanceof HTMLInputElement) {
                    html.setAttribute('data-theme', themeCheckbox.checked ? 'light' : 'dark');
                }
            });
        }

        // --- ПРОШИВКА ЛОГИКИ ДЛЯ СТРАНИЦЫ РЕГИСТРАЦИИ (HTMLPAGE3.HTML) ---
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
                if (input && input instanceof HTMLInputElement && input.files && input.files) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        if (avatarBtn && e.target && e.target.result && typeof e.target.result === 'string') {
                            avatarDataUrl = e.target.result;
                            avatarBtn.style.backgroundImage = "url('" + avatarDataUrl + "')";
                            avatarBtn.classList.add('has-image');
                        }
                    };
                    reader.readAsDataURL(input.files);
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
                window.location.href = 'https://github.io';
            });
        }
    });

    function playSystemErrorSound() {
        try {
            var ctx = new AudioContext(); var o = ctx.createOscillator(); var g = ctx.createGain();
            o.type = 'sawtooth'; o.frequency.setValueAtTime(150, ctx.currentTime);
            g.gain.setValueAtTime(0.15, ctx.currentTime); o.connect(g); g.connect(ctx.destination);
            o.start(); o.stop(ctx.currentTime + 0.25);
        } catch (e) { }
    }

    function triggerLinkCheck(url) {
        currentTargetUrl = url;
        var modal = document.getElementById('eM');
        if (modal) modal.style.display = 'flex';
        runLinkValidation(true);
    }

    async function runLinkValidation(playSound) {
        if (playSound) playSystemErrorSound();
        var t = document.getElementById('tL'); if (!t) return;
        t.innerHTML = '<div>C:\\UrbanRedactor\\System> run diagnostics.exe</div><div>[PROCESS] Сканирование пакетов...</div>';
        await new Promise(function (r) { setTimeout(r, 400); });
        if (currentTargetUrl && currentTargetUrl.trim()) t.innerHTML += '<div class="lo">&gt; Структура: [OK] Реестр найден.</div>';
        else { t.innerHTML += '<div class="le">&gt; Структура: [КРИТ] Адрес пуст.</div>'; return; }
        await new Promise(function (r) { setTimeout(r, 300); });
        try {
            await fetch('https://googleapis.com', { mode: 'no-cors', cache: 'no-cache' });
            t.innerHTML += '<div class="lo">&gt; Порт: [OK] Шлюз открыт.</div>';
            await new Promise(function (r) { setTimeout(r, 200); });
            t.innerHTML += currentTargetUrl.includes('.html') ? '<div class="le">&gt; Хост: [ОШИБКА 404] Файл отсутствует.</div>' : '<div class="lo">&gt; Хост: [OK] Сервер стабилен.</div>';
        } catch (e) { t.innerHTML += '<div class="le">&gt; Порт: [ОШИБКА] Шлюз заблокирован.</div>'; }
    }
})();
