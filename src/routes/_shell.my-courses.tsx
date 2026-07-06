import { createFileRoute } from "@tanstack/react-router";
import { CourseCard } from "@/components/portal/CourseCard";
import { courses } from "@/lib/mock-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/_shell/my-courses")({
  component: MyCourses,
});

function MyCourses() {
  const inProgress = courses.filter((c) => c.enrolled && !c.completed);
  const completed = courses.filter((c) => c.completed);

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-[1400px] mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Meus cursos</h1>
        <p className="text-sm text-muted-foreground">Acompanhe o progresso e continue seus estudos.</p>
      </div>
      <Tabs defaultValue="progress">
        <TabsList>
          <TabsTrigger value="progress">Em andamento ({inProgress.length})</TabsTrigger>
          <TabsTrigger value="completed">Concluídos ({completed.length})</TabsTrigger>
          <TabsTrigger value="all">Todos ({inProgress.length + completed.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="progress" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {inProgress.map(c => <CourseCard key={c.id} course={c} variant="progress" />)}
          </div>
        </TabsContent>
        <TabsContent value="completed" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {completed.map(c => <CourseCard key={c.id} course={c} variant="progress" />)}
          </div>
        </TabsContent>
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...inProgress, ...completed].map(c => <CourseCard key={c.id} course={c} variant="progress" />)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
