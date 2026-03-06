import { Link } from "react-router-dom";
import { Star, Clock, Users, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Course } from "@/data/courses";

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const discount = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);

  return (
    <Link
      to={`/course/${course.slug}`}
      className="group block bg-card border border-border rounded-xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {course.isTrending && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-primary text-primary-foreground border-0 text-xs font-medium gap-1 shadow-sm">
              <TrendingUp className="h-3 w-3" /> Trending
            </Badge>
          </div>
        )}
        {discount > 0 && (
          <div className="absolute top-3 right-3">
            <Badge variant="destructive" className="text-xs font-medium border-0 shadow-sm">
              {discount}% OFF
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2.5">
          <Badge variant="secondary" className="text-xs font-normal border-0 bg-accent text-accent-foreground">
            {course.vendor}
          </Badge>
          <Badge variant="outline" className="text-xs font-normal">
            {course.level}
          </Badge>
        </div>

        <h3 className="font-display font-semibold text-sm leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2 text-card-foreground">
          {course.title}
        </h3>

        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" /> {course.students.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" /> {course.rating}
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-border pt-3">
          <div className="flex items-baseline gap-2">
            <span className="font-display font-bold text-lg text-primary">${course.price}</span>
            {course.originalPrice > course.price && (
              <span className="text-sm text-muted-foreground line-through">${course.originalPrice}</span>
            )}
          </div>
          <span className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
