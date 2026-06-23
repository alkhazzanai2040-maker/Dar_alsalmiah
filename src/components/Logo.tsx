import React from 'react';

interface LogoProps {
  className?: string;
  isDarkBackground?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = 'w-16 h-16', isDarkBackground = false }) => {
  // Use white/light colors for dark parts on dark backgrounds, black on light backgrounds
  const darkColor = isDarkBackground ? '#ffffff' : '#1a1a1a';
  const redColor = '#ef4444';
  const greenColor = '#00a859';

  return (
    <svg
      className={`${className} transition-all duration-350`}
      viewBox="0 0 1000 700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 1. Outer Triangle */}
      <polygon
        points="500,20 950,650 50,650"
        stroke={darkColor}
        strokeWidth="7"
        strokeLinejoin="round"
        fill="none"
      />

      {/* 2. Main Horizontal Divider Line */}
      <line
        x1="153"
        y1="520"
        x2="847"
        y2="520"
        stroke={darkColor}
        strokeWidth="7"
      />

      {/* 3. Inner Triangle */}
      <polygon
        points="500,100 770,480 230,480"
        stroke={darkColor}
        strokeWidth="6"
        strokeLinejoin="round"
        fill="none"
      />

      {/* 4. Bottom base line of Inner Triangle with a gap for the palm tree */}
      <line
        x1="230"
        y1="480"
        x2="450"
        y2="480"
        stroke={darkColor}
        strokeWidth="6"
      />
      <line
        x1="550"
        y1="480"
        x2="770"
        y2="480"
        stroke={darkColor}
        strokeWidth="6"
      />

      {/* 5. Left Diagonal Stylized Letters (Geometric Block Shapes inside the left gap) */}
      {/* These draw parallel thick black bars mimicking the stylized letters on the left side */}
      <g stroke={darkColor} strokeWidth="22" strokeLinecap="square">
        {/* Top left segment */}
        <line x1="420" y1="140" x2="350" y2="240" />
        {/* Middle left segment */}
        <line x1="330" y1="270" x2="260" y2="370" />
        {/* Bottom left segment */}
        <line x1="240" y1="400" x2="190" y2="470" />
      </g>
      {/* Parallel thinner lines for internal high-fidelity detailing */}
      <g stroke={darkColor} strokeWidth="6" strokeLinecap="round">
        <line x1="440" y1="150" x2="385" y2="230" />
        <line x1="355" y1="270" x2="295" y2="355" />
        <line x1="265" y1="400" x2="220" y2="465" />
      </g>

      {/* 6. Right Diagonal Detailing (Symmetric space parallel lines) */}
      <g stroke={darkColor} strokeWidth="6" strokeLinecap="round">
        <line x1="535" y1="110" x2="755" y2="420" />
        <line x1="565" y1="120" x2="785" y2="430" />
        <line x1="450" y1="280" x2="485" y2="480" />
      </g>

      {/* 7. Central Green Palm Tree */}
      <g>
        {/* Palm Trunk */}
        <path
          d="M495,480 L495,310 M505,480 L505,310"
          stroke={greenColor}
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Stylized chevron bark patterns */}
        <path
          d="M488,450 L500,438 L512,450 
             M488,420 L500,408 L512,420 
             M488,390 L500,378 L512,390 
             M488,360 L500,348 L512,360
             M490,330 L500,318 L510,330"
          stroke={greenColor}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Palm Leaves (Fronds) - 7 distinct branches pointing out */}
        {/* Center top branch */}
        <path
          d="M500,310 Q500,220 500,200 Q512,220 500,310"
          fill={greenColor}
          stroke={greenColor}
          strokeWidth="1.5"
        />
        {/* Left branches */}
        <path
          d="M500,310 Q455,245 420,240 Q465,270 500,310"
          fill={greenColor}
          stroke={greenColor}
          strokeWidth="1.5"
        />
        <path
          d="M500,310 Q435,290 405,305 Q450,310 500,310"
          fill={greenColor}
          stroke={greenColor}
          strokeWidth="1.5"
        />
        <path
          d="M500,310 Q435,345 420,380 Q460,345 500,310"
          fill={greenColor}
          stroke={greenColor}
          strokeWidth="1.5"
        />
        {/* Right branches */}
        <path
          d="M500,310 Q545,245 580,240 Q535,270 500,310"
          fill={greenColor}
          stroke={greenColor}
          strokeWidth="1.5"
        />
        <path
          d="M500,310 Q565,290 595,305 Q550,310 500,310"
          fill={greenColor}
          stroke={greenColor}
          strokeWidth="1.5"
        />
        <path
          d="M500,310 Q565,345 580,380 Q540,345 500,310"
          fill={greenColor}
          stroke={greenColor}
          strokeWidth="1.5"
        />
      </g>

      {/* 8. Two Green Saudi Crowns on Left & Right */}
      {/* Left Crown */}
      <g>
        <path
          d="M365,410 L435,410"
          stroke={greenColor}
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <path
          d="M365,410 Q400,422 435,410"
          stroke={greenColor}
          strokeWidth="4.5"
          fill="none"
        />
        {/* Peaks */}
        <path
          d="M365,410 L370,370 L390,392 L400,350 L410,392 L430,370 L435,410 Z"
          stroke={greenColor}
          strokeWidth="4.5"
          fill="none"
          strokeLinejoin="round"
        />
        {/* Crown Jewels (small circles on peaks) */}
        <circle cx="400" cy="346" r="6" fill={greenColor} />
        <circle cx="370" cy="366" r="5" fill={greenColor} />
        <circle cx="430" cy="366" r="5" fill={greenColor} />
        {/* Arch interior details */}
        <path
          d="M375,410 Q400,375 425,410"
          stroke={greenColor}
          strokeWidth="3"
          fill="none"
        />
      </g>

      {/* Right Crown */}
      <g>
        <path
          d="M565,410 L635,410"
          stroke={greenColor}
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <path
          d="M565,410 Q600,422 635,410"
          stroke={greenColor}
          strokeWidth="4.5"
          fill="none"
        />
        {/* Peaks */}
        <path
          d="M565,410 L570,370 L590,392 L600,350 L610,392 L630,370 L635,410 Z"
          stroke={greenColor}
          strokeWidth="4.5"
          fill="none"
          strokeLinejoin="round"
        />
        {/* Crown Jewels (small circles on peaks) */}
        <circle cx="600" cy="346" r="6" fill={greenColor} />
        <circle cx="570" cy="366" r="5" fill={greenColor} />
        <circle cx="630" cy="366" r="5" fill={greenColor} />
        {/* Arch interior details */}
        <path
          d="M575,410 Q600,375 625,410"
          stroke={greenColor}
          strokeWidth="3"
          fill="none"
        />
      </g>

      {/* 9. Bottom Text & Colored Stripes */}
      {/* English Core Branding Typography in elegant serif */}
      <text
        x="500"
        y="582"
        textAnchor="middle"
        fill={darkColor}
        fontFamily="Georgia, serif, system-ui"
        fontWeight="900"
        fontSize="44"
        letterSpacing="0.5"
      >
        Dar AlSalmiah Co.
      </text>
      <text
        x="500"
        y="628"
        textAnchor="middle"
        fill={darkColor}
        fontFamily="Georgia, serif, system-ui"
        fontWeight="700"
        fontSize="30"
        letterSpacing="1.2"
      >
        For General Contracting
      </text>

      {/* Left Stripes - Black/White, Red, Green slanting parallelograms */}
      <g>
        {/* Top Black/White Bar */}
        <polygon
          points="140,560 280,560 262,580 158,580"
          fill={darkColor}
        />
        {/* Middle Red Bar */}
        <polygon
          points="100,587 280,587 262,607 118,607"
          fill={redColor}
        />
        {/* Bottom Green Bar */}
        <polygon
          points="140,614 280,614 262,634 158,634"
          fill={greenColor}
        />
      </g>

      {/* Right Stripes - Black/White, Red, Green slanting parallelograms */}
      <g>
        {/* Top Black/White Bar */}
        <polygon
          points="720,560 860,560 842,580 738,580"
          fill={darkColor}
        />
        {/* Middle Red Bar */}
        <polygon
          points="720,587 900,587 882,607 738,607"
          fill={redColor}
        />
        {/* Bottom Green Bar */}
        <polygon
          points="720,614 860,614 842,634 738,634"
          fill={greenColor}
        />
      </g>
    </svg>
  );
};
