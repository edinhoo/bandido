import { Card, CardContent } from "@/components/ui/8bit/card"
import { ScrollArea, ScrollBar } from "@/components/ui/8bit/scroll-area"

export function BoardGame({ width = 60, height = 60 }: { width?: number; height?: number }) {
  return (
    <Card className="h-full w-full py-0 bg-background">
      <CardContent className="h-full p-0">
        <ScrollArea className="h-full w-full">
          <div
            className="grid w-max px-5.5 pt-4 pb-7.5 gap-x-5 gap-y-2"
            style={{
              gridTemplateColumns: `repeat(${width}, 1fr)`,
              gridTemplateRows: `repeat(${height}, 1fr)`,
            }}
          >
            {Array.from({ length: width * height }, (_, i) => (
              <Card key={i} className="w-full py-0 border-transparent! ring-muted bg-background">
                <CardContent className="px-0 ">
                  <div className="w-18 h-18 flex items-center justify-center text-secondary">{i + 1}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
