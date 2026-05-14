import Vector from "./Vector/Vector.jsx";

// figma node: 53171:115664 (FRAME) "WTG_e2open logo WHITE"
export default function WTGE2openLogoWHITE() {
  return (
    <div data-name="WTG_e2open logo WHITE" style={{
      position: "relative",
      width: 3200,
      height: 1100,
      overflow: "hidden",
    }}>
      {Array.from({ length: 26 }).map((_, i) => (
        <Vector key={i} />
      ))} {/* 26× → /Logo/WTG_e2open-logo-WHITE/Vector/Vector.jsx */}
    </div>
  );
}
