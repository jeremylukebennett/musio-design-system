import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, FileText } from "lucide-react";
import { SavedConfig } from "@/lib/tokens";

interface LoadConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  configs: SavedConfig[];
  onLoad: (config: SavedConfig) => Promise<void>;
  onDelete: (configId: string) => void;
}

export function LoadConfigDialog({
  open,
  onOpenChange,
  configs,
  onLoad,
  onDelete,
}: LoadConfigDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Load Configuration</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[400px] pr-4">
          {configs.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No saved configurations yet.</p>
              <p className="text-sm">Use "Save As" to create one.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {configs.map((config) => (
                <div
                  key={config.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors group"
                >
                  <button
                    className="flex-1 text-left"
                    onClick={async () => {
                      await onLoad(config);
                      onOpenChange(false);
                    }}
                  >
                    <p className="font-medium text-sm">{config.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(config.updatedAt), "MMM d, yyyy 'at' h:mm a")}
                    </p>
                  </button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(config.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
