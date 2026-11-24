// Line icons from the design prototype (24 x 24, stroked by the .icon class in globals.css).
const ICONS = {
  arrow: '<path d="M4 12h15m-6-6 6 6-6 6"/>',
  left: '<path d="M20 12H5m6-6-6 6 6 6"/>',
  phone: '<path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a14 14 0 0 1-7-7l2-2-2-5Z"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  pause: '<path d="M9 5v14M15 5v14"/>',
  play: '<path d="m8 4 12 8-12 8V4Z"/>',
  check: '<path d="m5 12 4 4 10-10"/>',
  mic: '<rect x="9" y="2" width="6" height="13" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3m-4 0h8"/>',
  shield: '<path d="M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6l-8-3Z"/><path d="m8 12 3 3 5-6"/>',
  card: '<rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20M6 15h4"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 11h18m-12 4h2m3 0h2"/>',
  loan: '<rect x="4" y="3" width="16" height="18" rx="3"/><path d="M8 7h8m-8 4h8m-8 4h4"/>',
  spark: '<path d="m12 3 2.3 6.7L21 12l-6.7 2.3L12 21l-2.3-6.7L3 12l6.7-2.3L12 3Z"/>',
  layers: '<path d="m12 3 10 5-10 5L2 8l10-5Zm-9 10 9 5 9-5M3 18l9 5 9-5"/>',
  swap: '<path d="M4 7h16m-4-4 4 4-4 4M20 17H4m4-4-4 4 4 4"/>',
  conversation: '<path d="M21 11a8 8 0 0 1-8 8H9l-6 3 1-6a8 8 0 0 1-1-5 8 8 0 0 1 8-8h2a8 8 0 0 1 8 8Z"/><path d="M8 10h8m-8 4h5"/>',
  headset:
    '<path d="M3 13v-1a9 9 0 0 1 18 0v6a3 3 0 0 1-3 3h-3"/><rect x="3" y="11" width="4" height="7" rx="2"/><rect x="17" y="11" width="4" height="7" rx="2"/>',
  receipt: '<path d="M6 2h12v20l-3-2-3 2-3-2-3 2V2Z"/><path d="M9 7h6m-6 4h6m-6 4h3"/>',
  wallet: '<path d="M20 7V5H5a3 3 0 0 0 0 6h16v9H5a3 3 0 0 1-3-3V8"/><path d="M21 12h-5v5h5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  sliders:
    '<path d="M3 6h6m4 0h8M3 12h12m4 0h2M3 18h3m4 0h11"/><circle cx="11" cy="6" r="2"/><circle cx="17" cy="12" r="2"/><circle cx="8" cy="18" r="2"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.5"/>',
  document: '<path d="M6 2h8l5 5v15H6V2Z"/><path d="M14 2v6h5M9 12h7m-7 4h7"/>',
};

export type IconName = keyof typeof ICONS;

export function Icon({ name }: { name: IconName }) {
  // The paths are the fixed strings above, never user input.
  return <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICONS[name] }} />;
}

/** An icon inside its own span: the markup the prototype's `<span data-icon="…">` placeholders turned into. */
export function IconSpan({ name, className }: { name: IconName; className?: string }) {
  return (
    <span className={className}>
      <Icon name={name} />
    </span>
  );
}
