import { Colors } from "@/app/design/sections/Colors";
import { Components } from "@/app/design/sections/Components";
import { ContrastCheck } from "@/app/design/sections/ConstrastCheck";
import { Library } from "@/app/design/sections/Library";
import { TypeScale } from "@/app/design/sections/TypeScale";

export function DesignShowcase() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="sticky top-0 z-50 bg-background border-b border-foreground flex items-center justify-between px-4 py-4 sm:px-8">
        <div>
          <div className="font-display font-black text-[20px] leading-none tracking-tight text-foreground">
            RaceAtlas
          </div>
          <div className="font-mono text-[9px] tracking-[3px] text-muted-foreground mt-0.5">
            DESIGN SYSTEM · DEV ONLY
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 sm:px-8">
        <Colors />
        <ContrastCheck />
        <TypeScale />
        <Components />
        <Library />
      </div>
    </div>
  );
}
