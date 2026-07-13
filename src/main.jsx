import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  CalendarDays,
  Church,
  Clock,
  Flower2,
  Gift,
  MapPin,
  Sparkles,
  Shirt,
} from 'lucide-react';
import './styles.css';

const mapUrl = 'https://maps.app.goo.gl/gtKfmiqHxifdzhKw5';
const rsvpUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLSelgwmaQs9Fy8CqKVOheJcO61euQ_E_g4jho6D7XqsEBuUDaw/viewform?usp=sharing&ouid=108067655896797382697';

const details = [
  {
    icon: Church,
    label: 'Ceremonia',
    title: '12:00 pm',
    text: 'Rectoría Santa Madre Teresa de Calcuta',
  },
  {
    icon: Gift,
    label: 'Recepción',
    title: '3:00 pm',
    text: 'Jardín de eventos Valash',
  },
  {
    icon: MapPin,
    label: 'Dirección',
    title: 'Islas Malvinas 217',
    text: 'Televisora, 21337 Mexicali, B.C.',
    href: mapUrl,
  },
  {
    icon: Shirt,
    label: 'Código de vestimenta',
    title: 'Coquette',
    text: 'Tonos rosa o pastel',
  },
];

function DetailCard({ item, index }) {
  const Icon = item.icon;
  const content = (
    <>
      <div className="detail-icon" aria-hidden="true">
        <Icon size={20} strokeWidth={1.7} />
      </div>
      <div>
        <p className="eyebrow">{item.label}</p>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
      </div>
    </>
  );

  if (item.href) {
    return (
      <a
        className="detail-card"
        href={item.href}
        target="_blank"
        rel="noreferrer"
        style={{ '--delay': `${index * 100}ms` }}
      >
        {content}
      </a>
    );
  }

  return (
    <article className="detail-card" style={{ '--delay': `${index * 100}ms` }}>
      {content}
    </article>
  );
}

function App() {
  return (
    <main className="invite-shell">
      <section className="invite-card" aria-labelledby="invite-title">
        <div className="soft-glow glow-one" />
        <div className="soft-glow glow-two" />

        <div className="floral-corner floral-top" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="floral-corner floral-bottom" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <header className="hero">
          <p className="script">Cumple:</p>
          <h1 id="invite-title">Alanis</h1>
          <p className="intro">
            Con mucha alegría los invitamos a celebrar el cumpleaños y bautizo
            de nuestra pequeña
          </p>
        </header>

        <section className="date-panel" aria-label="Fecha del evento">
          <div className="date-icon" aria-hidden="true">
            <CalendarDays size={24} strokeWidth={1.6} />
          </div>
          <div>
            <p>14 de noviembre</p>
            <strong>2026</strong>
          </div>
        </section>

        <section className="timeline" aria-label="Detalles del evento">
          {details.map((item, index) => (
            <DetailCard key={item.label} item={item} index={index} />
          ))}
        </section>

        <section className="actions" aria-label="Confirmación y ubicación">
          <a className="primary-action" href={rsvpUrl} target="_blank" rel="noreferrer">
            <Sparkles size={18} strokeWidth={1.8} />
            Confirma tu asistencia aquí
          </a>
          <a className="secondary-action" href={mapUrl} target="_blank" rel="noreferrer">
            <MapPin size={18} strokeWidth={1.8} />
            Ver mapa
          </a>
        </section>

        <footer>
          <Flower2 size={18} strokeWidth={1.5} aria-hidden="true" />
          <span>Te esperamos con mucho cariño</span>
          <Clock size={18} strokeWidth={1.5} aria-hidden="true" />
        </footer>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
