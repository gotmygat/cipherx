import Image from 'next/image';

interface TechLabsLogoProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function TechLabsLogo({ className, style, onClick }: TechLabsLogoProps) {
  return (
    <div 
      className={`${className} tech-labs-logo-container`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
      }}
      onClick={onClick}
    >
      {/* Marcos decorativos como elementos absolutos */}
      <div 
        className="corner-frame corner-frame-top-left"
        style={{
          position: 'absolute',
          top: '-15%',
          left: '-15%',
          width: '15%',
          height: '15%',
          borderTop: '3px solid #FF7122',
          borderLeft: '3px solid #FF7122',
          opacity: 0,
          transition: 'opacity 0.36s ease',
          pointerEvents: 'none'
        }}
      />
      <div 
        className="corner-frame corner-frame-bottom-right"
        style={{
          position: 'absolute',
          bottom: '-15%',
          right: '-15%',
          width: '15%',
          height: '15%',
          borderBottom: '3px solid #FF7122',
          borderRight: '3px solid #FF7122',
          opacity: 0,
          transition: 'opacity 0.36s ease',
          pointerEvents: 'none'
        }}
      />
      
      {/* Logo SVG como imagen */}
      <Image 
        src="/title_labs.svg"
        alt="CipherX"
        width={89}
        height={47}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain'
        }}
        priority
      />
    </div>
  );
}
