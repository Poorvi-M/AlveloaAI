import { useState } from "react";
import { submitFeedback } from "../utils/api";

export default function FeedbackModal({ requestId, onClose }) {
  const [form, setForm] = useState({ label: "", role: "radiologist", comment: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true); setError(null);
    try {
      await submitFeedback({
        request_id:    requestId,
        correct_label: form.label,
        reviewer_role: form.role,
        comment:       form.comment || null,
      });
      setSent(true);
    } catch {
      setError("Failed to submit. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[300] bg-bg/94 backdrop-blur-2xl
                    flex items-center justify-center animate-fadeIn">
      <div className="card w-[480px] p-8 rounded-2xl">
        {sent ? (
          <div className="text-center py-6">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="font-serif text-2xl font-bold text-cream mb-2">Thank you</h3>
            <p className="text-sm text-muted mb-6">
              Your correction helps improve future model performance.
            </p>
            <button className="btn-ghost" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <h3 className="font-serif text-2xl font-bold text-cream mb-1">
              Correct This Analysis
            </h3>
            <p className="text-xs text-muted mb-5">Request: {requestId}</p>

            {/* Diagnosis toggle */}
            <div className="mb-4">
              <label className="block text-xs text-muted font-bold uppercase tracking-widest mb-2">
                Correct Diagnosis
              </label>
              <div className="grid grid-cols-2 gap-2">
                {["Normal", "Pneumonia"].map((opt) => (
                  <button key={opt}
                    onClick={() => setForm((p) => ({ ...p, label: opt.toLowerCase() }))}
                    className={`py-3 rounded-xl text-sm font-semibold border-2 transition-all
                      ${form.label === opt.toLowerCase()
                        ? "border-coral bg-coral/10 text-coral"
                        : "border-border bg-transparent text-muted"}`}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Role */}
            <div className="mb-4">
              <label className="block text-xs text-muted font-bold uppercase tracking-widest mb-2">
                Your Role
              </label>
              <select value={form.role}
                onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
                className="input-field">
                <option value="radiologist">Radiologist</option>
                <option value="clinician">Clinician</option>
                <option value="researcher">Researcher</option>
              </select>
            </div>

            {/* Notes */}
            <div className="mb-6">
              <label className="block text-xs text-muted font-bold uppercase tracking-widest mb-2">
                Clinical Notes
              </label>
              <textarea
                placeholder="Any relevant observations…"
                value={form.comment}
                onChange={(e) => setForm((p) => ({ ...p, comment: e.target.value }))}
                className="input-field min-h-[80px]"
              />
            </div>

            {error && (
              <p className="text-coral text-sm mb-3">{error}</p>
            )}

            <div className="flex gap-3">
              <button
                className="btn-coral flex-1 justify-center py-3 text-sm rounded-xl"
                disabled={!form.label || loading}
                onClick={handleSubmit}>
                {loading ? "Submitting…" : "Submit Feedback"}
              </button>
              <button className="btn-ghost" onClick={onClose}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
