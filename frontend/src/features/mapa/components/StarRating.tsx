import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  className?: string;
}

export default function StarRating({ rating, className }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} size={16} className="text-yellow-400 fill-yellow-400" />
      ))}
      {hasHalfStar && (
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <Star size={16} className="text-yellow-400" />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '50%',
              overflow: 'hidden',
            }}
          >
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} size={16} className="text-gray-300" />
      ))}
    </div>
  );
}
