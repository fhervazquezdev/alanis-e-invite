import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CalendarDays, Church, Gift, MapPin, MessageCircle, Shirt } from 'lucide-react';
import '@fontsource/dm-serif-display/400.css';
import '@fontsource/dm-serif-display/400-italic.css';
import '@fontsource/great-vibes/400.css';
import './styles.css';

const mapUrl = 'https://maps.app.goo.gl/gtKfmiqHxifdzhKw5';
const whatsappUrl = 'https://api.whatsapp.com/send';

function buildWhatsAppText({ name, attending, guests, note }) {
  const response =
    attending === 'yes'
      ? `Sí asistiré con ${guests} ${Number(guests) === 1 ? 'persona' : 'personas'}.`
      : 'No podré asistir.';
  const noteLine = note.trim() ? `\nMensaje: ${note.trim()}` : '';

  return [
    'Hola, quiero confirmar mi asistencia al cumpleaños y bautizo de Alanis.',
    `Nombre: ${name.trim()}`,
    `Respuesta: ${response}`,
    noteLine,
  ]
    .filter(Boolean)
    .join('\n');
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

  function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim()) {
      event.currentTarget.querySelector('#name')?.focus();
      return;
    }

    window.open(
      `${whatsappUrl}?${new URLSearchParams({ text: message }).toString()}`,
      '_blank',
      'noopener,noreferrer',
    );
  }

  return (
    <form className="rsvp" onSubmit={handleSubmit}>
      <p className="rsvp-title">Confirma tu asistencia aquí</p>

      <label className="input-wrap" htmlFor="name">
        <span>Nombre</span>
        <input
          id="name"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Tu nombre"
          required
        />
      </label>

      <div className="rsvp-row">
        <div className="toggle" aria-label="Asistencia">
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

        <label className="guest-count" htmlFor="guests">
          <span>Personas</span>
          <select
            id="guests"
            value={guests}
            onChange={(event) => setGuests(event.target.value)}
            disabled={attending === 'no'}
          >
            {[1, 2, 3, 4, 5, 6].map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="input-wrap" htmlFor="note">
        <span>Mensaje</span>
        <textarea
          id="note"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Opcional"
          rows="2"
        />
      </label>

      <button className="whatsapp" type="submit">
        <MessageCircle size={17} strokeWidth={1.8} aria-hidden="true" />
        Enviar por WhatsApp
      </button>
    </form>
  );
}

function App() {
  return (
    <main className="page">
      <section className="invite" aria-labelledby="invite-title">
        <div className="bow" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className="florals florals-top" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="florals florals-bottom" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>

        <p className="intro">
          Con mucha alegría los invitamos a celebrar el cumpleaños y bautizo de
          nuestra pequeña
        </p>

        <header className="name-block">
          <h1 id="invite-title">Alanis</h1>
          <p>Cumple:</p>
        </header>

        <section className="date" aria-label="Fecha del evento">
          <CalendarDays size={18} strokeWidth={1.7} aria-hidden="true" />
          <span>14 de noviembre, 2026</span>
        </section>

        <section className="event-details" aria-label="Detalles del evento">
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
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
