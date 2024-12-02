import React, { useState } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { Card } from '../ui/Card';
import type { APIFeedback } from '../../types/api';

interface APIFeedbackSectionProps {
  feedback: APIFeedback[];
  onSubmitFeedback: (feedback: { rating: number; comment: string }) => void;
}

export function APIFeedbackSection({ feedback, onSubmitFeedback }: APIFeedbackSectionProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0) {
      onSubmitFeedback({ rating, comment });
      setRating(0);
      setComment('');
    }
  };

  const averageRating = feedback.length > 0
    ? feedback.reduce((acc, curr) => acc + curr.rating, 0) / feedback.length
    : 0;

  return (
    <Card className="bg-[#1E1E1E] p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Developer Feedback</h3>
        <div className="flex items-center space-x-2">
          <span className="text-[#E0E0E0] text-sm">Average Rating:</span>
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <span className="ml-1 text-white font-medium">
              {averageRating ? averageRating.toFixed(1) : 'N/A'}
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block text-[#E0E0E0] text-sm font-medium mb-2">
            Rate this API
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                className="focus:outline-none"
              >
                <Star
                  className={`h-6 w-6 ${
                    star <= (hoveredStar || rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-[#424242]'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-[#E0E0E0] text-sm font-medium mb-2">
            Your Feedback
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-3 py-2 bg-[#2A2A2A] border border-[#424242] rounded-lg text-white placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent"
            rows={3}
            placeholder="Share your experience with this API..."
          />
        </div>

        <button
          type="submit"
          disabled={rating === 0}
          className="px-4 py-2 bg-[#FF5722] text-white rounded-lg hover:bg-[#F4511E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Feedback
        </button>
      </form>

      <div className="space-y-4">
        {feedback.map((item, index) => (
          <div
            key={index}
            className="p-4 bg-[#2A2A2A] rounded-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-[#4FC3F7]" />
                <span className="text-white font-medium">{item.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < item.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-[#424242]'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-[#E0E0E0] text-sm">{item.comment}</p>
            <span className="text-[#9E9E9E] text-xs">
              {new Date(item.date).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}