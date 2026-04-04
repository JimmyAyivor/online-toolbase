"use client";

import { useEffect, useState } from "react";

export default function ToolReviews({ toolSlug }: { toolSlug: string }) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    const res = await fetch(`/api/reviews?tool_slug=${toolSlug}`);
    const data = await res.json();
    setReviews(data || []);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const submit = async () => {
    setLoading(true);

    const res = await fetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify({
        tool_slug: toolSlug,
        rating,
        comment,
      }),
    });

    if (res.ok) {
      setComment("");
      fetchReviews();
    } else {
      alert("You already reviewed this tool");
    }

    setLoading(false);
  };

  const avg =
    reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1);

  return (
    <div className='max-w-4xl mx-auto px-4 mt-10'>
      <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6'>
        <h3 className='text-xl font-bold mb-2'>
          ⭐ {avg.toFixed(1)} ({reviews.length} reviews)
        </h3>

        {/* Submit */}
        <div className='flex flex-col gap-3 mb-6'>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className='border p-2 rounded'
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} Stars
              </option>
            ))}
          </select>

          <textarea
            placeholder='Write a review...'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className='border p-2 rounded'
          />

          <button
            onClick={submit}
            disabled={loading}
            className='bg-indigo-600 text-white py-2 rounded'
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </div>

        {/* List */}
        <div className='space-y-4'>
          {reviews.map((r) => (
            <div key={r.id} className='border rounded p-3'>
              <div className='text-yellow-500'>{"⭐".repeat(r.rating)}</div>
              <p className='text-sm text-gray-700 mt-1'>{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
