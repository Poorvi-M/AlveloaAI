const STEPS = [
  "Validating image format…",
  "Normalising pixel intensities…",
  "Running YOLOv8 inference…",
  "Extracting opacity regions…",
  "Grading severity…",
  "Generating Grad-CAM heatmap…",
  "Compiling clinical report…",
];

export default function LoadingOverlay({ step }) {
  const pct = Math.round((step / STEPS.length) * 100);

  return (
    <div className="fixed inset-0 z-[400] bg-bg/96 backdrop-blur-2xl
                    flex flex-col items-center justify-center">
      {/* Spinner rings */}
      <div className="relative w-28 h-28 mb-10">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border-2 border-transparent animate-spinSlow"
            style={{
              inset: i * 14,
              borderTopColor: i === 0 ? "#e8614a" : "transparent",
              borderColor: `rgba(232,97,74,${0.6 - i * 0.18})`,
              animationDuration: `${1.6 + i * 0.8}s`,
            }}
          />
        ))}
        <div className="absolute inset-0 flex items-center justify-center
                        font-serif text-2xl font-bold text-coral">
          {pct}%
        </div>
      </div>

      <h3 className="font-serif text-2xl font-semibold text-cream mb-2">
        Analysing Radiograph
      </h3>
      <p className="text-sm text-muted mb-10 min-h-[20px]">
        {STEPS[Math.min(step, STEPS.length - 1)]}
      </p>

      {/* Step dots */}
      <div className="flex gap-2">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className="h-1 rounded-full transition-all duration-300"
            style={{
              width: i < step ? 24 : 8,
              background: i < step ? "#e8614a" : "#253450",
            }}
          />
        ))}
      </div>
    </div>
  );
}
