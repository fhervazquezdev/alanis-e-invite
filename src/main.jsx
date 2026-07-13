import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CalendarDays, Church, Gift, MapPin, MessageCircle, Shirt } from 'lucide-react';
import '@fontsource/dm-serif-display/400.css';
import '@fontsource/dm-serif-display/400-italic.css';
import '@fontsource/great-vibes/400.css';
import './styles.css';

const mapUrl = 'https://maps.app.goo.gl/gtKfmiqHxifdzhKw5';
const whatsappUrl = 'https://api.whatsapp.com/send';

function buildWhatsAppText({ name, attending, guests }) {
  const response =
    attending === 'yes'
      ? `Sí asistiré con ${guests} ${Number(guests) === 1 ? 'persona' : 'personas'}.`
      : 'No podré asistir.';

  return [
    'Hola, quiero confirmar mi asistencia al cumpleaños y bautizo de Alanis.',
    `Nombre: ${name.trim()}`,
    `Respuesta: ${response}`,
  ].join('\n');
}

function RsvpForm() {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState('yes');
  const [guests, setGuests] = useState('1');

  const message = useMemo(
    () => buildWhatsAppText({ name, attending, guests }),
    [name, attending, guests],
  );

  function submitRsvp(event) {
    event.preventDefault();

    if (!name.trim()) {
      event.currentTarget.querySelector('#name')?.focus();
      return;
    }

    const query = new URLSearchParams({ text: message });
    window.open(`${whatsappUrl}?${query.toString()}`, '_blank', 'noopener,noreferrer');
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

      <div className="rsvp-controls">
        <div className="attendance" aria-label="Asistencia">
          <button
            type="button"
            className={attending === 'yes' ? 'selected' : ''}
            onClick={() => setAttending('yes')}
          >
            Sí
          </button>
          <button
            type="button"
            className={attending === 'no' ? 'selected' : ''}
            onClick={() => setAttending('no')}
          >
            No
          </button>
        </div>

        <label htmlFor="guests">
          <span>Personas</span>
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

      <button className="whatsapp" type="submit">
        <MessageCircle size={17} strokeWidth={1.8} aria-hidden="true" />
        Enviar por WhatsApp
      </button>
    </form>
  );
}

function FloralCorner({ position }) {
  return (
    <div className={`floral floral-${position}`} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
      <i />
    </div>
  );
}

function App() {
  return (
    <main className="page">
      <section className="invite" aria-labelledby="invite-title">
        <div className="frame" aria-hidden="true" />
        <img className="bow" src="/bow.png" alt="" aria-hidden="true" />
        <FloralCorner position="top" />
        <FloralCorner position="bottom" />

        <div className="content">
          <p className="intro">
            Con mucha alegría los invitamos a celebrar el cumpleaños y bautizo de
            nuestra pequeña
          </p>

          <header className="hero">
            <h1 id="invite-title">Alanis</h1>
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

            <a href={mapUrl} target="_blank" rel="noreferrer">
              <MapPin size={17} strokeWidth={1.7} aria-hidden="true" />
              <span>Islas Malvinas 217, Televisora, 21337 Mexicali, B.C.</span>
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
