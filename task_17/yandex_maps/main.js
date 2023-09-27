document.addEventListener('DOMContentLoaded', function() {
    function init() {
        // Подключаем поисковые подсказки к полю ввода.
        var suggestView = new ymaps.SuggestView('suggest'),
            map,
            placemark;

        // При клике по кнопке запускаем верификацию введёных данных.
        document.getElementById('button').addEventListener('click', function (e) {
            geocode();
        });

        function geocode() {
            // Забираем запрос из поля ввода.
            var request = document.getElementById('suggest').value;
            // Геокодируем введённые данные.
            ymaps.geocode(request).then(function (res) {
                var obj = res.geoObjects.get(0),
                    error, hint;

                if (obj) {
                    switch (obj.properties.get('metaDataProperty.GeocoderMetaData.precision')) {
                        case 'exact':
                            break;
                        case 'number':
                        case 'near':
                        case 'range':
                            error = 'Неточный адрес, требуется уточнение';
                            hint = 'Уточните номер дома';
                            break;
                        case 'street':
                            error = 'Неполный адрес, требуется уточнение';
                            hint = 'Уточните номер дома';
                            break;
                        case 'other':
                        default:
                            error = 'Неточный адрес, требуется уточнение';
                            hint = 'Уточните адрес';
                    }
                } else {
                    error = 'Адрес не найден';
                    hint = 'Уточните адрес';
                }

                if (error) {
                    showError(error);
                    showMessage(hint);
                } else {
                    showResult(obj);
                }
            }, function (e) {
                console.log(e)
            });
        }

        function showResult(obj) {
            document.getElementById('suggest').classList.remove('input_error');
            document.getElementById('notice').style.display = 'none';

            var mapContainer = document.getElementById('map'),
                bounds = obj.properties.get('boundedBy'),
                mapState = ymaps.util.bounds.getCenterAndZoom(
                    bounds,
                    [mapContainer.offsetWidth, mapContainer.offsetHeight]
                ),
                address = [obj.getCountry(), obj.getAddressLine()].join(', '),
                shortAddress = [obj.getThoroughfare(), obj.getPremiseNumber(), obj.getPremise()].join(' ');

            mapState.controls = [];
            createMap(mapState, shortAddress);
            showMessage(address);
        }

        function showError(message) {
            document.getElementById('notice').textContent = message;
            document.getElementById('suggest').classList.add('input_error');
            document.getElementById('notice').style.display = 'block';

            if (map) {
                map.destroy();
                map = null;
            }
        }

        function createMap(state, caption) {
            if (!map) {
                map = new ymaps.Map('map', state);
                placemark = new ymaps.Placemark(
                    map.getCenter(), {
                        iconCaption: caption,
                        balloonContent: caption
                    }, {
                        preset: 'islands#redDotIconWithCaption'
                    });
                map.geoObjects.add(placemark);
            } else {
                map.setCenter(state.center, state.zoom);
                placemark.geometry.setCoordinates(state.center);
                placemark.properties.set({iconCaption: caption, balloonContent: caption});
            }
        }

        function showMessage(message) {
            document.getElementById('messageHeader').textContent = 'Данные получены:';
            document.getElementById('message').textContent = message;
        }
    }

    ymaps.ready(init);
});
