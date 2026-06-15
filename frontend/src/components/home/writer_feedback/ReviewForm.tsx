import React, { useState } from "react";
import { useCreateReviewMutation } from "../../../redux/apis/review.api";

const ratingLabels = ["", "Poor", "Fair", "Good", "Great", "Excellent"];

const StarRating = ({
  rating,
  setRating,
}: {
  rating: number;
  setRating: (n: number) => void;
}) => {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="w-full space-y-2">
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            aria-label={`Rate ${star} star`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className={`text-3xl transition-all duration-200 hover:scale-125 hover:-translate-y-1 focus:outline-none ${
              star <= (hovered || rating)
                ? "text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.7)]"
                : "text-gray-600"
            }`}
          >
            ★
          </button>
        ))}
      </div>

      {(hovered || rating) > 0 && (
        <p className="text-xs font-semibold tracking-wide text-yellow-400">
          {ratingLabels[hovered || rating]}
        </p>
      )}
    </div>
  );
};

const ReviewForm = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const [createReview, { isLoading }] = useCreateReviewMutation();

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!role.trim()) newErrors.role = "Role is required";
    if (!feedback.trim()) newErrors.feedback = "Review is required";
    if (feedback.length > 500) newErrors.feedback = "Max 500 characters";
    if (rating === 0) newErrors.rating = "Please select a rating";

    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await createReview({
        name,
        role,
        feedback,
        rating,
        imgSrc: "",
      }).unwrap();

      setSuccess(true);
      setName("");
      setRole("");
      setFeedback("");
      setRating(0);
      setErrors({});
    } catch {
      setErrors({
        submit: "Failed to submit review. Please try again.",
      });
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 sm:px-0">
      <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0f172a]/90 to-[#111827]/90 p-6 shadow-2xl shadow-blue-500/10 backdrop-blur-md sm:p-8 md:p-10">
        <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative z-10 min-w-0">
          <div className="mb-8 min-w-0">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-400">
              ✍️ Share Your Story
            </div>

            <h3 className="text-2xl font-bold text-white">Share Your Experience</h3>

            <p className="mt-1 text-sm text-gray-400">
              Your feedback helps us improve StorySparkAI for everyone.
            </p>
          </div>

          {success && (
            <div
              aria-live="polite"
              className="mb-6 flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-400 transition-all duration-300"
            >
              <span className="text-lg">🎉</span>
              <span>Thank you! Your review has been submitted for approval.</span>
            </div>
          )}

          {errors.submit && (
            <div
              aria-live="polite"
              className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400"
            >
              <span className="text-lg">⚠️</span>
              <span>{errors.submit}</span>
            </div>
          )}

          <div className="space-y-6 min-w-0">
            <div className="min-w-0">
              <label
                htmlFor="name"
                className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300"
              >
                <span className="text-blue-400">👤</span>
                Name
                <span className="text-red-400">*</span>
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full min-w-0 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 transition-all duration-200 focus:border-blue-500/60 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />

              {errors.name && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                  <span>⚠</span>
                  {errors.name}
                </p>
              )}
            </div>

            <div className="min-w-0">
              <label
                htmlFor="role"
                className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300"
              >
                <span className="text-blue-400">💼</span>
                Role
                <span className="text-red-400">*</span>
              </label>

              <input
                id="role"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Fantasy Writer, Student, Blogger"
                className="w-full min-w-0 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 transition-all duration-200 focus:border-blue-500/60 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />

              {errors.role && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                  <span>⚠</span>
                  {errors.role}
                </p>
              )}
            </div>

            <div className="min-w-0">
              <label
                htmlFor="feedback"
                className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300"
              >
                <span className="text-blue-400">💬</span>
                Review
                <span className="text-red-400">*</span>
              </label>

              <textarea
                id="feedback"
                rows={5}
                maxLength={500}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us about your experience with StorySparkAI..."
                className="w-full min-w-0 resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 transition-all duration-200 focus:border-blue-500/60 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />

              <div className="mt-1 flex w-full min-w-0 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                {errors.feedback ? (
                  <p className="flex min-w-0 items-center gap-1 text-xs text-red-400">
                    <span>⚠</span>
                    <span className="break-words">{errors.feedback}</span>
                  </p>
                ) : (
                  <span />
                )}

                <p
                  className={`text-xs ${
                    feedback.length > 450 ? "text-yellow-400" : "text-gray-500"
                  }`}
                >
                  {feedback.length}/500
                </p>
              </div>
            </div>

            <div className="min-w-0">
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                <span className="text-blue-400">⭐</span>
                Rating
                <span className="text-red-400">*</span>
              </label>

              <StarRating rating={rating} setRating={setRating} />

              <p className="mt-2 text-xs text-gray-500">
                Select a rating based on your overall experience.
              </p>

              {errors.rating && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                  <span>⚠</span>
                  {errors.rating}
                </p>
              )}
            </div>

            <div className="mt-6 flex w-full justify-center">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full max-w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:from-blue-500 hover:to-indigo-500 hover:shadow-xl hover:shadow-blue-500/25 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 sm:w-auto"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Share Review ✨"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
