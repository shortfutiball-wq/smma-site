/**
 * Logo Lattic en SVG pur — icône étoile orbitale + texte.
 * Fonctionne parfaitement à toutes les tailles, pas de PNG nécessaire.
 */

export function LatticLogo({
  height = 32,
  color = "#0d0d0d",
}: {
  height?: number;
  color?: string;
}) {
  const w = Math.round(height * 4.5);
  return (
    <svg
      viewBox="0 0 225 50"
      width={w}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Lattic"
    >
      {/* ── Icône : 4 boucles orbitales entrelacées ── */}
      <g transform="translate(26, 25)">
        {/* Couche "derrière" — trait blanc épais pour créer l'effet tressé */}
        {[135, 90].map((deg) => (
          <ellipse
            key={`bg-${deg}`}
            rx="13"
            ry="4.4"
            transform={`rotate(${deg})`}
            stroke="white"
            strokeWidth="6.5"
            fill="none"
          />
        ))}
        {/* Couche 1 : ellipses à 0° et 90° */}
        {[0, 90].map((deg) => (
          <ellipse
            key={`l1-${deg}`}
            rx="13"
            ry="4.4"
            transform={`rotate(${deg})`}
            stroke={color}
            strokeWidth="2.6"
            strokeLinecap="round"
            fill="none"
          />
        ))}
        {/* Couche "derrière" pour 45° et 135° */}
        {[45, 135].map((deg) => (
          <ellipse
            key={`bg2-${deg}`}
            rx="13"
            ry="4.4"
            transform={`rotate(${deg})`}
            stroke="white"
            strokeWidth="6.5"
            fill="none"
          />
        ))}
        {/* Couche 2 : ellipses à 45° et 135° — passent "par-dessus" */}
        {[45, 135].map((deg) => (
          <ellipse
            key={`l2-${deg}`}
            rx="13"
            ry="4.4"
            transform={`rotate(${deg})`}
            stroke={color}
            strokeWidth="2.6"
            strokeLinecap="round"
            fill="none"
          />
        ))}
        {/* Re-dessiner les extrémités de 0°/90° pour fermer le tressage */}
        {[0, 90].map((deg) => {
          const r = (deg * Math.PI) / 180;
          const x1 = Math.cos(r) * 13;
          const y1 = Math.sin(r) * 13;
          const x2 = -x1;
          const y2 = -y1;
          return (
            <g key={`tip-${deg}`}>
              <line x1={x1 * 0.62} y1={y1 * 0.62} x2={x1} y2={y1} stroke="white" strokeWidth="6.5" strokeLinecap="round" />
              <line x1={x2 * 0.62} y1={y2 * 0.62} x2={x2} y2={y2} stroke="white" strokeWidth="6.5" strokeLinecap="round" />
              <ellipse
                rx="13"
                ry="4.4"
                transform={`rotate(${deg})`}
                stroke={color}
                strokeWidth="2.6"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={`${13 * 0.76} 999`}
                strokeDashoffset={`${-13 * 0.62}`}
              />
            </g>
          );
        })}
      </g>

      {/* ── Texte : Lattic ── */}
      <text
        x="57"
        y="38"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif"
        fontWeight="900"
        fontSize="33"
        letterSpacing="-1"
        fill={color}
      >
        Lattic
      </text>

      {/* ── Symbole ® ── */}
      <text
        x="211"
        y="17"
        fontFamily="-apple-system, BlinkMacSystemFont, sans-serif"
        fontWeight="400"
        fontSize="11"
        fill={color}
      >
        ®
      </text>
    </svg>
  );
}

/** Icône seule (sans le texte), pour le footer ou les favicons */
export function LatticIcon({
  size = 28,
  color = "#0d0d0d",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      viewBox="-15 -15 30 30"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {[135, 90].map((deg) => (
        <ellipse key={`bg-${deg}`} rx="13" ry="4.4" transform={`rotate(${deg})`} stroke="white" strokeWidth="6.5" fill="none" />
      ))}
      {[0, 90].map((deg) => (
        <ellipse key={`l1-${deg}`} rx="13" ry="4.4" transform={`rotate(${deg})`} stroke={color} strokeWidth="2.6" strokeLinecap="round" fill="none" />
      ))}
      {[45, 135].map((deg) => (
        <ellipse key={`bg2-${deg}`} rx="13" ry="4.4" transform={`rotate(${deg})`} stroke="white" strokeWidth="6.5" fill="none" />
      ))}
      {[45, 135].map((deg) => (
        <ellipse key={`l2-${deg}`} rx="13" ry="4.4" transform={`rotate(${deg})`} stroke={color} strokeWidth="2.6" strokeLinecap="round" fill="none" />
      ))}
    </svg>
  );
}
