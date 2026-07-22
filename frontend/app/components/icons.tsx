import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function createIcon(path: React.ReactNode) {
  return function Icon(props: IconProps) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        {...props}
      >
        {path}
      </svg>
    );
  };
}

export const LeafIcon = createIcon(
  <>
    <path d="M5 13c0-5 4-8 11-8 0 7-3 11-8 11-2 0-3-1-3-3Z" />
    <path d="M7 17c3-3 6-6 11-8" />
  </>,
);

export const BarbellIcon = createIcon(
  <>
    <path d="M3 10v4" />
    <path d="M6 9v6" />
    <path d="M18 9v6" />
    <path d="M21 10v4" />
    <path d="M8 12h8" />
  </>,
);

export const BoltIcon = createIcon(
  <>
    <path d="m13 2-7 11h5l-1 9 8-12h-5l0-8Z" />
  </>,
);

export const SproutIcon = createIcon(
  <>
    <path d="M12 20v-9" />
    <path d="M12 13c0-4 2-7 6-8 1 5-1 8-6 8Z" />
    <path d="M12 13c0-4-2-7-6-8-1 5 1 8 6 8Z" />
  </>,
);

export const UserIcon = createIcon(
  <>
    <path d="M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
    <path d="M4 21c1.7-3 4.4-4.5 8-4.5s6.3 1.5 8 4.5" />
  </>,
);

export const BagIcon = createIcon(
  <>
    <path d="M7 8V6a5 5 0 0 1 10 0v2" />
    <path d="M5 8h14l-1 11H6L5 8Z" />
  </>,
);

export const GiftIcon = createIcon(
  <>
    <path d="M20 12v7H4v-7" />
    <path d="M2 7h20v5H2z" />
    <path d="M12 7v12" />
    <path d="M12 7H8.5A2.5 2.5 0 1 1 12 3.5V7Z" />
    <path d="M12 7h3.5A2.5 2.5 0 1 0 12 3.5V7Z" />
  </>,
);

export const MenuGridIcon = createIcon(
  <>
    <rect x="4" y="4" width="6" height="6" rx="1.5" />
    <rect x="14" y="4" width="6" height="6" rx="1.5" />
    <rect x="4" y="14" width="6" height="6" rx="1.5" />
    <rect x="14" y="14" width="6" height="6" rx="1.5" />
  </>,
);

export const HeartIcon = createIcon(
  <>
    <path d="m12 20-1.2-1.1C6 14.5 3 11.8 3 8.5 3 6 5 4 7.5 4A4.8 4.8 0 0 1 12 6.3 4.8 4.8 0 0 1 16.5 4C19 4 21 6 21 8.5c0 3.3-3 6-7.8 10.4L12 20Z" />
  </>,
);

export const MapPinIcon = createIcon(
  <>
    <path d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11Z" />
    <path d="M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
  </>,
);

export const BellIcon = createIcon(
  <>
    <path d="M6 16h12l-1-2.3V10a5 5 0 1 0-10 0v3.7L6 16Z" />
    <path d="M10 19a2 2 0 0 0 4 0" />
  </>,
);

export const CrownIcon = createIcon(
  <>
    <path d="m3 8 4.5 4L12 5l4.5 7L21 8l-2 11H5L3 8Z" />
  </>,
);

export const ArrowRightIcon = createIcon(
  <>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </>,
);

export const StarIcon = createIcon(
  <>
    <path d="m12 3 2.6 5.3 5.9.8-4.3 4.2 1 5.9L12 16.7 6.8 19.2l1-5.9L3.5 9.1l5.9-.8L12 3Z" />
  </>,
);

export const FlameIcon = createIcon(
  <>
    <path d="M12 3s3 3.2 3 6.6c0 1.7-.8 3.1-2 4.2a4.5 4.5 0 0 1-2 7.7A6.5 6.5 0 0 1 7 15.5C7 10.5 12 3 12 3Z" />
  </>,
);
