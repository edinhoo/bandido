import { Card, CardContent } from "@/components/ui/8bit/card";

export function TileSlot() {
  return (
    <Card className="w-full py-0 border-transparent! ring-muted bg-background snap-center">
      <CardContent className="px-0 ">
        <div className="w-18 h-18 flex items-center justify-center text-secondary">
          <span className="text-4xl">?</span>
        </div>
      </CardContent>
    </Card>
  );
};
