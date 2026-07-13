import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  CalendarDays,
  Church,
  Gift,
  MapPin,
  MessageCircle,
  Navigation,
  Shirt,
} from 'lucide-react';
import '@fontsource/dm-serif-display/400.css';
import '@fontsource/dm-serif-display/400-italic.css';
import '@fontsource/great-vibes/400.css';
import './styles.css';

const mapUrl = 'https://maps.app.goo.gl/gtKfmiqHxifdzhKw5';
const whatsappUrl = 'https://api.whatsapp.com/send?phone=526861896576';

function buildWhatsAppText({ name, attending, guests, note }) {
  const response =
    attending === 'yes'
      ? `Sí asistiré con ${guests} ${Number(guests) === 1 ? 'persona' : 'personas'}.`
      : 'No podré asistir.';

  const lines = [
    'Hola, quiero confirmar mi asistencia al cumpleaños y bautizo de Alanis.',
    `Nombre: ${name.trim()}`,
    `Respuesta: ${response}`,
  ];

  if (note.trim()) {
    lines.push(`Mensaje: ${note.trim()}`);
  }

  return lines.join('\n');
}

function RsvpForm() {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState('yes');
  const [guests, setGuests] = useState('1');
  const [note, setNote] = useState('');

  const message = useMemo(
    () => buildWhatsAppText({ name, attending, guests, note }),
    [name, attending, guests, note],
  );

  function submitRsvp(event) {
    event.preventDefault();

    if (!name.trim()) {
      event.currentTarget.querySelector('#name')?.focus();
      return;
    }

    const query = new URLSearchParams({ text: message });
    window.open(`${whatsappUrl}&${query.toString()}`, '_blank', 'noopener,noreferrer');
  }

  return (
    <form className="rsvp" onSubmit={submitRsvp}>
      <p>Confirma tu asistencia aquí</p>

      <label htmlFor="name">
        <span>Nombre</span>
        <input
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Tu nombre"
          autoComplete="name"
          required
        />
      </label>

      <div className="attendance-field">
        <span>¿Asistirás al evento?</span>
        <div className="attendance" aria-label="Confirmar asistencia">
          <button
            type="button"
            className={attending === 'yes' ? 'selected' : ''}
            onClick={() => setAttending('yes')}
          >
            Sí, asistiré
          </button>
          <button
            type="button"
            className={attending === 'no' ? 'selected' : ''}
            onClick={() => setAttending('no')}
          >
            No podré asistir
          </button>
        </div>
      </div>

      <div className="rsvp-controls">
        <label htmlFor="guests">
          <span>Número de personas</span>
          <select
            id="guests"
            value={guests}
            onChange={(event) => setGuests(event.target.value)}
            disabled={attending === 'no'}
          >
            {[1, 2, 3, 4, 5, 6].map((guestCount) => (
              <option key={guestCount} value={guestCount}>
                {guestCount}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label htmlFor="note">
        <span>Mensaje opcional</span>
        <textarea
          id="note"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Ej. Vamos con mucho gusto / Muchas felicidades"
          rows="3"
        />
      </label>

      <button className="whatsapp" type="submit">
        <MessageCircle size={17} strokeWidth={1.8} aria-hidden="true" />
        Confirmar
      </button>
    </form>
  );
}

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

          <RsvpForm />
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
