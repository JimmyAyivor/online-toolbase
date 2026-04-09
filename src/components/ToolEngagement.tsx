"use client";
// src/components/ToolEngagement.tsx
//
// Drop-in reviews + comments widget for any tool page.
// All data goes through Next.js Route Handlers → Postgres (no client-side DB).
//
// Usage:
//   import ToolEngagement from "@/components/ToolEngagement";
//   <ToolEngagement toolSlug="sales-tax-calculator" toolName="Sales Tax Calculator" />

import React, { useState, useEffect, useCallback, useTransition } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Review {
  id: string;
  name: string;
  rating: number;
  body: string;
  helpful: number;
  created_at: string;
}

interface Comment {
  id: string;
  name: string;
  body: string;
  created_at: string;
}

interface RatingSummary {
  average: number;
  total: number;
  distribution: number[];
}

const MAX_NAME = 50;
const MAX_REVIEW = 1000;
const MAX_COMMENT = 500;

// ─── API helpers ──────────────────────────────────────────────────────────────

async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json?.error ?? "Request failed");
  return json as T;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}
const AVATAR_COLOURS = [
  "bg-purple-100 text-purple-700",
  "bg-pink-100 text-pink-700",
  "bg-indigo-100 text-indigo-700",
  "bg-violet-100 text-violet-700",
  "bg-fuchsia-100 text-fuchsia-700",
];
function avatarColour(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) | 0;
  return AVATAR_COLOURS[Math.abs(h) % AVATAR_COLOURS.length];
}

// ─── Star display ─────────────────────────────────────────────────────────────

const STAR_PATH =
  "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

function StarDisplay({
  rating,
  size = "md",
}: {
  rating: number;
  size?: "sm" | "md" | "lg";
}) {
  const sz = { sm: "w-3.5 h-3.5", md: "w-4 h-4", lg: "w-5 h-5" }[size];
  return (
    <span
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`${sz} flex-shrink-0 ${s <= rating ? "text-amber-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d={STAR_PATH} />
        </svg>
      ))}
    </span>
  );
}

function StarInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hover, setHover] = useState(0);
  const labels = ["Terrible", "Poor", "Okay", "Good", "Excellent"];
  return (
    <div className="flex flex-col items-start gap-1">
      <div
        className="flex items-center gap-1"
        role="radiogroup"
        aria-label="Rating"
      >
        {[1, 2, 3, 4, 5].map((s) => (
          <button
            key={s}
            type="button"
            role="radio"
            aria-checked={value === s}
            aria-label={`${s} star${s !== 1 ? "s" : ""} — ${labels[s - 1]}`}
            onClick={() => onChange(s)}
            onMouseEnter={() => setHover(s)}
            onMouseLeave={() => setHover(0)}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded"
          >
            <svg
              className={`w-7 h-7 transition-colors duration-100 ${s <= (hover || value) ? "text-amber-400" : "text-gray-200 hover:text-amber-200"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d={STAR_PATH} />
            </svg>
          </button>
        ))}
      </div>
      {(hover || value) > 0 && (
        <span className="text-xs text-purple-600 font-medium">
          {labels[(hover || value) - 1]}
        </span>
      )}
    </div>
  );
}

// ─── Rating summary ───────────────────────────────────────────────────────────

function RatingSummaryPanel({ summary }: { summary: RatingSummary }) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 p-5 bg-gray-50 rounded-2xl mb-6">
      <div className="flex flex-col items-center shrink-0">
        <span className="text-5xl font-bold text-gray-900 leading-none">
          {summary.average.toFixed(1)}
        </span>
        <StarDisplay rating={Math.round(summary.average)} />
        <span className="text-xs text-gray-400 mt-1">
          {summary.total.toLocaleString()} review
          {summary.total !== 1 ? "s" : ""}
        </span>
      </div>
      <div className="flex-1 w-full space-y-1.5">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = summary.distribution[star - 1];
          const pct = summary.total > 0 ? (count / summary.total) * 100 : 0;
          return (
            <div key={star} className="flex items-center gap-2 text-xs">
              <span className="text-gray-500 w-3 text-right shrink-0">
                {star}
              </span>
              <svg
                className="w-3 h-3 text-amber-400 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d={STAR_PATH} />
              </svg>
              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-gray-400 w-5 text-right shrink-0">
                {count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Cards ────────────────────────────────────────────────────────────────────

function ReviewCard({
  review,
  onHelpful,
  helpfulVoted,
}: {
  review: Review;
  onHelpful: (id: string) => void;
  helpfulVoted: Set<string>;
}) {
  const voted = helpfulVoted.has(review.id);
  return (
    <div className="flex gap-3 py-5 border-b border-gray-100 last:border-0">
      <div
        className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${avatarColour(review.name)}`}
        aria-hidden="true"
      >
        {initials(review.name) || "?"}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mb-1">
          <span className="text-sm font-semibold text-gray-900">
            {review.name}
          </span>
          <StarDisplay rating={review.rating} size="sm" />
          <span className="text-xs text-gray-400">
            {formatDate(review.created_at)}
          </span>
        </div>
        {review.body && (
          <p className="text-sm text-gray-600 leading-relaxed">{review.body}</p>
        )}
        <button
          onClick={() => onHelpful(review.id)}
          disabled={voted}
          className={`mt-2 inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border transition-colors ${voted ? "border-purple-200 bg-purple-50 text-purple-600" : "border-gray-200 text-gray-400 hover:border-purple-200 hover:text-purple-600 hover:bg-purple-50"}`}
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
            />
          </svg>
          Helpful {review.helpful > 0 && `(${review.helpful})`}
        </button>
      </div>
    </div>
  );
}

function CommentCard({ comment }: { comment: Comment }) {
  return (
    <div className="flex gap-3 py-4 border-b border-gray-100 last:border-0">
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${avatarColour(comment.name)}`}
        aria-hidden="true"
      >
        {initials(comment.name) || "?"}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-sm font-semibold text-gray-900">
            {comment.name}
          </span>
          <span className="text-xs text-gray-400">
            {formatDate(comment.created_at)}
          </span>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">{comment.body}</p>
      </div>
    </div>
  );
}

// ─── Shared UI ────────────────────────────────────────────────────────────────

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-3">
        <svg
          className="w-6 h-6 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </div>
      <p className="text-sm text-gray-400">{message}</p>
    </div>
  );
}

function Spinner() {
  return (
    <div className="flex justify-center py-8">
      <div className="w-6 h-6 border-2 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
    </div>
  );
}

function FieldError({ msg }: { msg: string }) {
  return (
    <p
      className="text-sm text-red-500 flex items-center gap-1.5 mt-1"
      role="alert"
    >
      <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      {msg}
    </p>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

type Tab = "reviews" | "write" | "comments";

export default function ToolEngagement({
  toolSlug,
  toolName,
}: {
  toolSlug: string;
  toolName: string;
}) {
  const [activeTab, setActiveTab] = useState<Tab>("reviews");
  const [, startTransition] = useTransition();

  const [summary, setSummary] = useState<RatingSummary>({
    average: 0,
    total: 0,
    distribution: [0, 0, 0, 0, 0],
  });
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsPage, setReviewsPage] = useState(0);
  const [reviewsHasMore, setReviewsHasMore] = useState(false);
  const [helpfulVoted, setHelpfulVoted] = useState<Set<string>>(new Set());

  const [wrName, setWrName] = useState("");
  const [wrRating, setWrRating] = useState(0);
  const [wrBody, setWrBody] = useState("");
  const [wrSubmitting, setWrSubmitting] = useState(false);
  const [wrSuccess, setWrSuccess] = useState(false);
  const [wrError, setWrError] = useState("");

  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsPage, setCommentsPage] = useState(0);
  const [commentsHasMore, setCommentsHasMore] = useState(false);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [cmName, setCmName] = useState("");
  const [cmBody, setCmBody] = useState("");
  const [cmSubmitting, setCmSubmitting] = useState(false);
  const [cmSuccess, setCmSuccess] = useState(false);
  const [cmError, setCmError] = useState("");

  const loadReviews = useCallback(
    async (page = 0) => {
      setReviewsLoading(true);
      try {
        const data = await apiFetch<{
          reviews: Review[];
          hasMore: boolean;
          summary: RatingSummary;
        }>(
          `/api/tool-engagement/reviews?slug=${encodeURIComponent(toolSlug)}&page=${page}`,
        );
        setReviews((prev) =>
          page === 0 ? data.reviews : [...prev, ...data.reviews],
        );
        setReviewsHasMore(data.hasMore);
        setReviewsPage(page);
        if (page === 0) setSummary(data.summary);
      } catch {
        /* non-fatal */
      } finally {
        setReviewsLoading(false);
      }
    },
    [toolSlug],
  );

  const loadComments = useCallback(
    async (page = 0) => {
      setCommentsLoading(true);
      try {
        const data = await apiFetch<{ comments: Comment[]; hasMore: boolean }>(
          `/api/tool-engagement/comments?slug=${encodeURIComponent(toolSlug)}&page=${page}`,
        );
        setComments((prev) =>
          page === 0 ? data.comments : [...prev, ...data.comments],
        );
        setCommentsHasMore(data.hasMore);
        setCommentsPage(page);
        setCommentsLoaded(true);
      } catch {
        /* non-fatal */
      } finally {
        setCommentsLoading(false);
      }
    },
    [toolSlug],
  );

  useEffect(() => {
    loadReviews(0);
  }, [loadReviews]);
  useEffect(() => {
    if (activeTab === "comments" && !commentsLoaded) loadComments(0);
  }, [activeTab, commentsLoaded, loadComments]);

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wrName.trim()) return setWrError("Please enter your name.");
    if (wrRating === 0) return setWrError("Please select a star rating.");
    if (wrBody.trim().length > 0 && wrBody.trim().length < 10)
      return setWrError(
        "Review must be at least 10 characters, or leave it blank.",
      );
    setWrError("");
    setWrSubmitting(true);
    try {
      await apiFetch("/api/tool-engagement/reviews", {
        method: "POST",
        body: JSON.stringify({
          slug: toolSlug,
          name: wrName.trim(),
          rating: wrRating,
          reviewBody: wrBody.trim(),
          _hp: "",
        }),
      });
      setWrSuccess(true);
      setWrName("");
      setWrRating(0);
      setWrBody("");
      startTransition(() => loadReviews(0));
    } catch (err) {
      setWrError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setWrSubmitting(false);
    }
  };

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cmName.trim()) return setCmError("Please enter your name.");
    if (cmBody.trim().length < 3) return setCmError("Comment is too short.");
    setCmError("");
    setCmSubmitting(true);
    try {
      await apiFetch("/api/tool-engagement/comments", {
        method: "POST",
        body: JSON.stringify({
          slug: toolSlug,
          name: cmName.trim(),
          commentBody: cmBody.trim(),
          _hp: "",
        }),
      });
      setCmSuccess(true);
      setCmName("");
      setCmBody("");
      startTransition(() => {
        setCommentsLoaded(false);
        loadComments(0);
      });
    } catch (err) {
      setCmError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setCmSubmitting(false);
    }
  };

  const markHelpful = async (reviewId: string) => {
    if (helpfulVoted.has(reviewId)) return;
    setHelpfulVoted((prev) => new Set(prev).add(reviewId));
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r,
      ),
    );
    try {
      await apiFetch(`/api/tool-engagement/reviews/${reviewId}/helpful`, {
        method: "PATCH",
      });
    } catch {
      setHelpfulVoted((prev) => {
        const n = new Set(prev);
        n.delete(reviewId);
        return n;
      });
      setReviews((prev) =>
        prev.map((r) =>
          r.id === reviewId ? { ...r, helpful: Math.max(0, r.helpful - 1) } : r,
        ),
      );
    }
  };

  const tabs: { id: Tab; label: string; count?: number }[] = [
    {
      id: "reviews",
      label: "Reviews",
      count: summary.total > 0 ? summary.total : undefined,
    },
    { id: "write", label: "Write a Review" },
    { id: "comments", label: "Discussion" },
  ];

  return (
    <section
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      aria-label={`Reviews and discussion for ${toolName}`}
    >
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-gray-900">Community</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Rate, review, and discuss {toolName}
        </p>
      </div>

      <div
        className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl mb-6 w-full sm:w-fit overflow-x-auto"
        role="tablist"
        aria-label="Community tabs"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 whitespace-nowrap ${activeTab === tab.id ? "bg-white text-purple-700 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${activeTab === tab.id ? "bg-purple-100 text-purple-600" : "bg-gray-200 text-gray-500"}`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Reviews */}
      <div
        id="tabpanel-reviews"
        role="tabpanel"
        hidden={activeTab !== "reviews"}
      >
        {summary.total > 0 && <RatingSummaryPanel summary={summary} />}
        {reviewsLoading && reviews.length === 0 ? (
          <Spinner />
        ) : reviews.length === 0 ? (
          <EmptyState message="No reviews yet — be the first to review this tool." />
        ) : (
          <>
            <div>
              {reviews.map((r) => (
                <ReviewCard
                  key={r.id}
                  review={r}
                  onHelpful={markHelpful}
                  helpfulVoted={helpfulVoted}
                />
              ))}
            </div>
            {reviewsHasMore && (
              <button
                onClick={() => loadReviews(reviewsPage + 1)}
                disabled={reviewsLoading}
                className="mt-4 w-full py-2.5 rounded-xl border border-gray-200 text-sm text-gray-500 hover:border-purple-300 hover:text-purple-600 hover:bg-purple-50 transition-colors disabled:opacity-50"
              >
                {reviewsLoading ? "Loading…" : "Load more reviews"}
              </button>
            )}
          </>
        )}
        <button
          onClick={() => setActiveTab("write")}
          className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Write a Review
        </button>
      </div>

      {/* Write a Review */}
      <div id="tabpanel-write" role="tabpanel" hidden={activeTab !== "write"}>
        {wrSuccess ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <svg
                className="w-7 h-7 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Thank you for your review!
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Your feedback helps other users discover the best tools.
            </p>
            <button
              onClick={() => {
                setWrSuccess(false);
                setActiveTab("reviews");
              }}
              className="px-5 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition-colors"
            >
              See all reviews
            </button>
          </div>
        ) : (
          <form onSubmit={submitReview} noValidate className="space-y-5">
            <div>
              <label
                htmlFor="wr-name"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Your name <span className="text-red-400">*</span>
              </label>
              <input
                id="wr-name"
                type="text"
                placeholder="e.g. Jane Smith"
                maxLength={MAX_NAME}
                value={wrName}
                onChange={(e) => setWrName(e.target.value)}
                className="w-full px-4 py-2.5 text-sm border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors"
              />
            </div>
            <div>
              <span className="block text-sm font-medium text-gray-700 mb-1.5">
                Star rating <span className="text-red-400">*</span>
              </span>
              <StarInput value={wrRating} onChange={setWrRating} />
            </div>
            <div>
              <label
                htmlFor="wr-body"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Review{" "}
                <span className="font-normal text-gray-400">(optional)</span>
              </label>
              <textarea
                id="wr-body"
                placeholder={`What did you think of ${toolName}? Any tips for other users?`}
                maxLength={MAX_REVIEW}
                rows={4}
                value={wrBody}
                onChange={(e) => setWrBody(e.target.value)}
                className="w-full px-4 py-2.5 text-sm border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none transition-colors"
              />
              <p className="text-xs text-gray-400 text-right mt-0.5">
                {wrBody.length}/{MAX_REVIEW}
              </p>
            </div>
            {wrError && <FieldError msg={wrError} />}
            <button
              type="submit"
              disabled={wrSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity flex items-center justify-center gap-2"
            >
              {wrSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Submitting…
                </>
              ) : (
                "Submit Review"
              )}
            </button>
          </form>
        )}
      </div>

      {/* Discussion */}
      <div
        id="tabpanel-comments"
        role="tabpanel"
        hidden={activeTab !== "comments"}
      >
        <form onSubmit={submitComment} noValidate className="mb-8">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Join the discussion
          </h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Your name"
              maxLength={MAX_NAME}
              value={cmName}
              onChange={(e) => setCmName(e.target.value)}
              className="w-full px-4 py-2.5 text-sm border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-colors"
            />
            <div>
              <textarea
                placeholder={`Ask a question or share a tip about ${toolName}…`}
                maxLength={MAX_COMMENT}
                rows={3}
                value={cmBody}
                onChange={(e) => setCmBody(e.target.value)}
                className="w-full px-4 py-2.5 text-sm border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none transition-colors"
              />
              <p className="text-xs text-gray-400 text-right mt-0.5">
                {cmBody.length}/{MAX_COMMENT}
              </p>
            </div>
          </div>
          {cmSuccess && (
            <p
              className="text-sm text-green-600 flex items-center gap-1.5 mt-2"
              role="status"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Comment posted!
            </p>
          )}
          {cmError && <FieldError msg={cmError} />}
          <button
            type="submit"
            disabled={cmSubmitting}
            className="mt-3 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity flex items-center gap-2"
          >
            {cmSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Posting…
              </>
            ) : (
              "Post Comment"
            )}
          </button>
        </form>

        {commentsLoading && comments.length === 0 ? (
          <Spinner />
        ) : comments.length === 0 ? (
          <EmptyState message="No comments yet — start the conversation!" />
        ) : (
          <>
            <div className="border-t border-gray-100">
              {comments.map((c) => (
                <CommentCard key={c.id} comment={c} />
              ))}
            </div>
            {commentsHasMore && (
              <button
                onClick={() => loadComments(commentsPage + 1)}
                disabled={commentsLoading}
                className="mt-4 w-full py-2.5 rounded-xl border border-gray-200 text-sm text-gray-500 hover:border-purple-300 hover:text-purple-600 hover:bg-purple-50 transition-colors disabled:opacity-50"
              >
                {commentsLoading ? "Loading…" : "Load more comments"}
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
}
