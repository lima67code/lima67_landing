interface LogoProps {
  variant?: 'dark' | 'light';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({
  variant = 'dark',
  className = '',
  size = 'md',
}: LogoProps) {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-9',
    lg: 'h-14',
  };

  // dark = texto oscuro (fondos claros) · light = texto crema (fondos oscuros)
  const base = `/logo/logo-lima67-${variant}`;

  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <picture>
        <source srcSet={`${base}.webp`} type="image/webp" />
        <img
          src={`${base}.png`}
          alt="Lima 67 Catering & Eventos"
          width={852}
          height={360}
          className={`${sizeClasses[size]} w-auto`}
        />
      </picture>
    </div>
  );
}
