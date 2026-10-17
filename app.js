// Inicjalizacja stabilnej mapy cyfrowej
const map = new maplibreGl.Map({
    container: 'map',
    style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json', // Styl Cyber-Dark
    center: [18.5305, 54.5189], // Wyśrodkowanie na Gdynię [długość, szerokość]
    zoom: 10 // Początkowe przybliżenie miasta
});

// Zmiana tytułu w panelu bocznym
document.getElementById('db-title').innerText = 'Moja Sieć Fabryka';

// Dodanie kontrolera obracania i zoomu w prawym górnym rogu
map.addControl(new maplibreGl.NavigationControl(), 'top-right');

// Lista Twoich punktów
const mojeDane = [
    {
        name: "Fabryka Gdynia",
        description: "Główny węzeł sieci i punkt dowodzenia.",
        coordinates: [18.5305, 54.5189]
    }
];

// Aktywacja globusa i punktów dopiero PO pełnym wczytaniu stylu graficznego mapy
map.on('style.load', () => {
    // Oficjalna metoda włączania widoku kuli ziemskiej 3D w MapLibre
    map.setProjection({ type: 'globe' }); 

    const listContainer = document.getElementById('custom-points-list');
    listContainer.innerHTML = ''; // Wyczyszczenie napisu o ładowaniu

    mojeDane.forEach((point) => {
        // 1. Dodanie wyskakującego okienka (Popup)
        const popup = new maplibreGl.Popup({ offset: 25 })
            .setHTML(`<h3 style="color:#0b0f19; margin:0 0 5px 0;">${point.name}</h3><p style="color:#334155; margin:0; font-size:13px;">${point.description}</p>`);

        // 2. Dodanie jasnoniebieskiego markera na mapie
        new maplibreGl.Marker({ color: '#38bdf8' })
            .setLngLat(point.coordinates)
            .setPopup(popup)
            .addTo(map);

        // 3. Wpis do bocznego panelu tekstowego
        const item = document.createElement('div');
        item.className = 'data-item';
        item.innerHTML = `<strong>${point.name}</strong><br>${point.description}`;
        listContainer.appendChild(item);
    });
});
