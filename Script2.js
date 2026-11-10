// Код для файла Script2.js (Интеграция спутниковых Яндекс Карт)
(function () {
    var yandexMap = null;

    window.addEventListener('DOMContentLoaded', function () {
        var scaleInput = document.getElementById('projScale');
        var startBtn = document.getElementById('startProjectBtn');
        var nightBox = document.getElementById('timeNight');
        var dayBox = document.getElementById('timeDay');
        var mapFrame = document.getElementById('mapFrame');

        // Встроенная функция инициализации Яндекс Карт
        if (typeof ymaps !== 'undefined') {
            ymaps.ready(function () {
                yandexMap = new ymaps.Map('map', {
                    center: [55.751574, 37.573856], // Начальная точка (можно скроллить в любую точку Земли)
                    zoom: 2,
                    type: 'yandex#satellite', // Принудительный режим чистого 3D Спутника
                    controls: ['zoomControl']  // Оставляем только кнопки приближения
                });

                // Динамическое считывание масштаба в пикселях при зуме
                yandexMap.events.add('boundschange', function () {
                    if (yandexMap && scaleInput) {
                        var z = yandexMap.getZoom();
                        var res = Math.round(156543 / Math.pow(2, z));
                        scaleInput.value = res + " px/px";
                    }
                });

                // Ставим базовый масштаб при первой загрузке карты
                if (scaleInput) {
                    scaleInput.value = "39136 px/px";
                }
            });
        }

        // Логика переключения День/Ночь с наложением красивого ночного фильтра
        if (nightBox && dayBox && nightBox instanceof HTMLInputElement && dayBox instanceof HTMLInputElement) {
            nightBox.addEventListener('change', function () {
                dayBox.checked = !nightBox.checked;
                if (mapFrame) {
                    if (nightBox.checked) mapFrame.classList.add('night-mode');
                    else mapFrame.classList.remove('night-mode');
                }
            });
            dayBox.addEventListener('change', function () {
                nightBox.checked = !dayBox.checked;
                if (mapFrame) {
                    if (dayBox.checked) mapFrame.classList.remove('night-mode');
                    else mapFrame.classList.add('night-mode');
                }
            });
        }

        if (startBtn) {
            startBtn.addEventListener('click', function () {
                var nameInput = document.getElementById('projName');
                if (nameInput && nameInput instanceof HTMLInputElement) {
                    localStorage.setItem('urban_current_project_name', nameInput.value || 'Без названия');
                }
                alert("Проект успешно настроен! Переход в симулятор градостроительства.");
                window.location.href = 'HtmlPage6.html';
            });
        }
    });
})();
