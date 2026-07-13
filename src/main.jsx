import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  CalendarDays,
  ChevronRight,
  Church,
  Gift,
  MapPin,
  MessageCircle,
  Shirt,
  Users,
} from 'lucide-react';
import './styles.css';

const mapUrl = 'https://maps.app.goo.gl/gtKfmiqHxifdzhKw5';
const whatsappUrl = 'https://api.whatsapp.com/send';

const eventDetails = [
  {
    icon: CalendarDays,
    label: 'Fecha',
    value: '14 de noviembre, 2026',
  },
  {
    icon: Church,
    label: 'Ceremonia',
    value: '12:00 pm · Rectoría Santa Madre Teresa de Calcuta',
  },
  {
    icon: Gift,
    label: 'Recepción',
    value: '3:00 pm · Jardín de eventos Valash',
  },
  {
    icon: Shirt,
    label: 'Código',
    value: 'Coquette · Tonos rosa o pastel',
  },
];

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

function Detail({ detail }) {
  const Icon = detail.icon;

  return (
    <li>
      <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
      <span>
        <strong>{detail.label}</strong>
        {detail.value}
      </span>
    </li>
  );
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

    const params = new URLSearchParams({ text: message });
    window.open(`${whatsappUrl}?${params.toString()}`, '_blank', 'noopener,noreferrer');
  }

  return (
    <form className="rsvp-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Tu nombre"
          required
        />
      </div>

      <div className="field">
        <span className="field-label">Asistencia</span>
        <div className="segmented" role="group" aria-label="Asistencia">
          <button
            type="button"
            className={attending === 'yes' ? 'active' : ''}
            onClick={() => setAttending('yes')}
          >
            Sí asistiré
          </button>
          <button
            type="button"
            className={attending === 'no' ? 'active' : ''}
            onClick={() => setAttending('no')}
          >
            No podré
          </button>
        </div>
      </div>

      <div className="field">
        <label htmlFor="guests">Personas</label>
        <select
          id="guests"
          name="guests"
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
      </div>

      <div className="field field-wide">
        <label htmlFor="note">Mensaje</label>
        <textarea
          id="note"
          name="note"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Opcional"
          rows="3"
        />
      </div>

      <button className="whatsapp-button" type="submit">
        <MessageCircle size={19} strokeWidth={1.8} aria-hidden="true" />
        Enviar por WhatsApp
        <ChevronRight size={18} strokeWidth={1.9} aria-hidden="true" />
      </button>
    </form>
  );
}

function App() {
  return (
    <main className="page">
      <section className="invite-stage" aria-labelledby="invite-title">
        <div className="invite-art">
          <img
            src="/original-invite.png"
            alt="Invitación para celebrar el cumpleaños y bautizo de Alanis"
          />
        </div>

        <aside className="rsvp-panel">
          <p className="script-word">Cumple:</p>
          <h1 id="invite-title">Alanis</h1>
          <p className="lede">
            Con mucha alegría los invitamos a celebrar el cumpleaños y bautizo
            de nuestra pequeña.
          </p>

          <ul className="details-list" aria-label="Detalles del evento">
            {eventDetails.map((detail) => (
              <Detail key={detail.label} detail={detail} />
            ))}
          </ul>

          <a className="map-link" href={mapUrl} target="_blank" rel="noreferrer">
            <MapPin size={18} strokeWidth={1.8} aria-hidden="true" />
            Islas Malvinas 217, Televisora, 21337 Mexicali, B.C.
          </a>

          <div className="rsvp-heading">
            <Users size={20} strokeWidth={1.7} aria-hidden="true" />
            <span>Confirma tu asistencia</span>
          </div>

          <RsvpForm />
        </aside>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
