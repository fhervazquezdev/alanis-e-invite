import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  CalendarDays,
  Church,
  Clock3,
  Gift,
  MapPin,
  Navigation,
  Shirt,
} from 'lucide-react';
import '@fontsource/dm-serif-display/400.css';
import '@fontsource/dm-serif-display/400-italic.css';
import '@fontsource/great-vibes/400.css';
import './styles.css';

const mapUrl = 'https://maps.app.goo.gl/gtKfmiqHxifdzhKw5';
const itinerary = [
  ['3:00 pm', 'Recepción de invitados'],
  ['3:00 – 5:00 pm', 'Degustación de snacks y postres'],
  ['5:00 pm', 'Servicio de comida'],
  ['6:00 pm', 'Romper la piñata'],
  ['6:30 pm', 'Las Mañanitas y partida del pastel'],
  ['7:30 pm', 'Apertura de regalos (opcional)'],
  ['8:00 pm', 'Fin del evento'],
];

function App() {
  return (
    <main className="page">
      <section className="invite" aria-labelledby="invite-title">
        <div className="content">
          <img className="bow drop-shadow-lg" src="/bow.png" alt="" aria-hidden="true" />

          <p className="intro">
            Con mucha alegría los invitamos a celebrar el cumpleaños y bautizo de
            nuestra pequeña
          </p>

          <header className="hero">
            <h1 id="invite-title block mt-10">Alanis</h1>
            <div className="age">
              <span>Cumple:</span>
              <strong>2</strong>
            </div>
          </header>

          <section className="date" aria-label="Fecha">
            <CalendarDays size={17} strokeWidth={1.7} aria-hidden="true" />
            <span>14 de noviembre, 2026</span>
          </section>

          <section className="details" aria-label="Detalles del evento">
            <article>
              <Church size={17} strokeWidth={1.7} aria-hidden="true" />
              <div>
                <strong>Ceremonia: 12:00 pm</strong>
                <span>Rectoría Santa Madre Teresa de Calcuta</span>
              </div>
            </article>

            <article>
              <Gift size={17} strokeWidth={1.7} aria-hidden="true" />
              <div>
                <strong>Recepción: 3:00 pm</strong>
                <span>Jardín de eventos Valash</span>
              </div>
            </article>

            <a className="directions-link" href={mapUrl} target="_blank" rel="noreferrer">
              <MapPin size={17} strokeWidth={1.7} aria-hidden="true" />
              <div>
                <strong>Toca para abrir ubicación</strong>
                <span>Islas Malvinas 217, Televisora, 21337 Mexicali, B.C.</span>
              </div>
              <Navigation className="directions-icon" size={15} strokeWidth={2} aria-hidden="true" />
            </a>

            <article>
              <Shirt size={17} strokeWidth={1.7} aria-hidden="true" />
              <div>
                <strong>Código de vestimenta</strong>
                <span>Coquette | Tonos rosa o pastel</span>
              </div>
            </article>
          </section>

          <section className="itinerary" aria-labelledby="itinerary-title">
            <div className="itinerary-heading">
              <Clock3 size={18} strokeWidth={1.7} aria-hidden="true" />
              <div>
                <h2 id="itinerary-title">Itinerario</h2>
                <p>Sábado 14 de noviembre · Jardín Valash</p>
              </div>
            </div>

            <div className="itinerary-table" role="table" aria-label="Itinerario del evento">
              <div className="itinerary-row itinerary-labels" role="row">
                <span role="columnheader">Horario</span>
                <span role="columnheader">Actividad</span>
              </div>
              {itinerary.map(([time, activity]) => (
                <div className="itinerary-row" role="row" key={`${time}-${activity}`}>
                  <time role="cell">{time}</time>
                  <span role="cell">{activity}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
