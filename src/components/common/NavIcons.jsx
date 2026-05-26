const GRAY = '#9A9490';
const WHITE = '#FFFFFF';

function strokeColor(active) {
  return active ? WHITE : GRAY;
}

export function IconHome({ active = false, size = 20 }) {
  const c = strokeColor(active);
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M12.5 17.5V10.8333C12.5 10.6123 12.4122 10.4004 12.2559 10.2441C12.0996 10.0878 11.8877 10 11.6667 10H8.33333C8.11232 10 7.90036 10.0878 7.74408 10.2441C7.5878 10.4004 7.5 10.6123 7.5 10.8333V17.5"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 8.33333C2.49994 8.09089 2.55278 7.85135 2.65482 7.63143C2.75687 7.41151 2.90566 7.2165 3.09083 7.06L8.92417 2.06C9.22499 1.80576 9.60613 1.66627 10 1.66627C10.3939 1.66627 10.775 1.80576 11.0758 2.06L16.9092 7.06C17.0943 7.2165 17.2431 7.41151 17.3452 7.63143C17.4472 7.85135 17.5001 8.09089 17.5 8.33333V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V8.33333Z"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconReport({ active = false, size = 20 }) {
  const c = strokeColor(active);
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M17.5 10C17.96 10 18.3375 9.62583 18.2917 9.16833C18.0995 7.25514 17.2517 5.46725 15.8919 4.10777C14.5321 2.74829 12.7441 1.90086 10.8308 1.70917C10.3725 1.66333 9.99917 2.04083 9.99917 2.50083V9.1675C9.99917 9.38851 10.087 9.60048 10.2432 9.75676C10.3995 9.91304 10.6115 10.0008 10.8325 10.0008L17.5 10Z"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.675 13.2417C17.1449 14.4954 16.3157 15.6002 15.2599 16.4594C14.2041 17.3187 12.954 17.9062 11.6187 18.1707C10.2834 18.4351 8.90369 18.3685 7.60012 17.9765C6.29656 17.5845 5.10885 16.8792 4.14085 15.9222C3.17284 14.9652 2.45401 13.7856 2.0472 12.4866C1.64038 11.1876 1.55797 9.80874 1.80716 8.47053C2.05636 7.13232 2.62958 5.87552 3.4767 4.81002C4.32383 3.74453 5.41907 2.90276 6.66667 2.35833"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconArchive({ active = false, size = 20 }) {
  const c = strokeColor(active);
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M17.5 2.5H2.5C2.03976 2.5 1.66667 2.8731 1.66667 3.33333V5.83333C1.66667 6.29357 2.03976 6.66667 2.5 6.66667H17.5C17.9602 6.66667 18.3333 6.29357 18.3333 5.83333V3.33333C18.3333 2.8731 17.9602 2.5 17.5 2.5Z"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.33333 6.66667V15.8333C3.33333 16.2754 3.50893 16.6993 3.82149 17.0118C4.13405 17.3244 4.55797 17.5 5 17.5H15C15.442 17.5 15.8659 17.3244 16.1785 17.0118C16.4911 16.6993 16.6667 16.2754 16.6667 15.8333V6.66667"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.33333 10H11.6667"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconMypage({ active = false, size = 24 }) {
  const c = strokeColor(active);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M19 21V19C19 17.9391 18.5786 16.9217 17.8284 16.1716C17.0783 15.4214 16.0609 15 15 15H9C7.93913 15 6.92172 15.4214 6.17157 16.1716C5.42143 16.9217 5 17.9391 5 19V21"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ICON_MAP = {
  home: IconHome,
  report: IconReport,
  archive: IconArchive,
  mypage: IconMypage,
};

export function NavIcon({ name, active }) {
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  const size = name === 'mypage' ? 24 : 20;
  return <Icon active={active} size={size} />;
}
