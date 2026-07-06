import { Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart, Clock, Star, Users, PlayCircle } from "lucide-react";
import type { Course } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function CourseCard({ course, variant = "catalog" }: { course: Course; variant?: "catalog" | "progress" }) {
  return (
    <Card className="group w-72 md:w-80 shrink-0 overflow-hidden border transition-all hover:shadow-elevated hover:-translate-y-0.5">
      <Link
        to="/courses/$id"
        params={{ id: course.id }}
        className="block"
      >
        <div className="relative aspect-video overflow-hidden" style={{ background: course.cover }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute top-2 left-2 flex gap-1.5">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur text-foreground text-[10px]">
              {course.category}
            </Badge>
            {course.promoPrice && variant === "catalog" && (
              <Badge className="bg-accent text-accent-foreground text-[10px]">
                -{Math.round(((course.price - course.promoPrice) / course.price) * 100)}%
              </Badge>
            )}
          </div>
          <button
            className="absolute top-2 right-2 grid h-8 w-8 place-items-center rounded-full bg-background/90 backdrop-blur transition-colors hover:bg-background"
            onClick={(e) => { e.preventDefault(); }}
            aria-label="Favoritar"
          >
            <Heart className={cn("h-4 w-4", course.favorite ? "fill-accent text-accent" : "text-foreground/70")} />
          </button>
          <div className="absolute bottom-2 right-2 rounded-md bg-black/50 backdrop-blur px-2 py-0.5 text-[10px] font-medium text-white">
            {course.hours}h · {course.lessons} aulas
          </div>
        </div>

        <div className="p-4 space-y-3">
          <h3 className="font-semibold leading-tight line-clamp-2 min-h-[2.5rem] group-hover:text-primary transition-colors">
            {course.title}
          </h3>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-brand text-brand-foreground text-[9px] font-bold">
              {course.instructorAvatar}
            </span>
            <span className="truncate">{course.instructor}</span>
            <span className="ml-auto flex items-center gap-0.5 text-foreground font-medium">
              <Star className="h-3 w-3 fill-accent text-accent" /> {course.rating}
            </span>
          </div>

          {variant === "progress" && typeof course.progress === "number" ? (
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Progresso</span>
                <span className="font-semibold">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-1.5" />
              <Button size="sm" className="w-full mt-2" variant={course.progress === 100 ? "outline" : "default"}>
                <PlayCircle className="h-4 w-4 mr-1.5" />
                {course.progress === 100 ? "Revisar curso" : "Continuar"}
              </Button>
            </div>
          ) : (
            <div className="flex items-end justify-between pt-1">
              <div className="flex flex-col">
                {course.promoPrice ? (
                  <>
                    <span className="text-[10px] text-muted-foreground line-through">R$ {course.price}</span>
                    <span className="text-base font-bold text-foreground">R$ {course.promoPrice}</span>
                  </>
                ) : (
                  <span className="text-base font-bold text-foreground">R$ {course.price}</span>
                )}
              </div>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Users className="h-3 w-3" /> {(course.students / 1000).toFixed(1)}k
                <Clock className="h-3 w-3 ml-1" /> {course.hours}h
              </div>
            </div>
          )}
        </div>
      </Link>
    </Card>
  );
}
