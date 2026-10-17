// Inicjalizacja interaktywnej mapy z widokiem globu 3D
const map = new maplibreGl.Map({
    container: 'map',
    style: 'https://cartocdn.com', // Styl Cyber-Dark
    center: [18.5305, 54.5189], // Współrzędne geograficzne dla Gdyni [długość, szerokość]
    zoom: 11, // Przybliżenie ustawione na miasto
    projection: 'globe' // Włącza widok kuli ziemskiej 3D
});

// Zmiana tytułu w panelu bocznym na Twój własny
document.getElementById('db-title').innerText = 'Moja Sieć Fabryka';

// Dodanie kontrolera obracania i zoomu w prawym górnym rogu
map.addControl(new maplibreGl.NavigationControl(), 'top-right');

// Twoja lista punktów - zaczynamy od Gdyni
const mojeDane = [
    {
        name: "Fabryka Gdynia",
        description: "Główny węzeł sieci i punkt dowodzenia.",
        coordinates: [18.5305, 54.5189] // Gdynia
    }
];

// Gdy mapa się załaduje, renderujemy punkty na globie i w panelu
map.on('load', () => {
    const listContainer = document.getElementById('custom-points-list');
    listContainer.innerHTML = ''; // Czyszczenie komunikatu ładowania

    mojeDane.forEach((point) => {
        // 1. Tworzymy wyskakujące okienko (Popup) po kliknięciu w punkt
        const popup = new maplibreGl.Popup({ offset: 25 })
            .setHTML(`<h3 style="color:#0b0f19; margin:0 0 5px 0;">${point.name}</h3><p style="color:#334155; margin:0; font-size:13px;">${point.description}</p>`);

        // 2. Dodajemy świecący, błękitny marker na mapie 3D
        new maplibreGl.Marker({ color: '#38bdf8' })
            .setLngLat(point.coordinates)
            .setPopup(popup)
            .addTo(map);

        // 3. Dodajemy wpis do bocznego panelu tekstowego
        const item = document.createElement('div');
        item.className = 'data-item';
        item.innerHTML = `<strong>${point.name}</strong><br>${point.description}`;
        listContainer.appendChild(item);
    });
});
