import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddColorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (color: { name: string; value: string }) => void;
}

export function AddColorDialog({ open, onOpenChange, onSave }: AddColorDialogProps) {
  const [name, setName] = useState("");
  const [value, setValue] = useState("#000000");

  const handleSave = () => {
    if (name.trim() && value.trim()) {
      onSave({
        name: name.trim().toLowerCase().replace(/\s+/g, "-"),
        value: value.trim(),
      });
      setName("");
      setValue("#000000");
      onOpenChange(false);
    }
  };

  const handleClose = () => {
    setName("");
    setValue("#000000");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Add Color Token</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="color-name" className="text-muted-foreground">
              Color Name
            </Label>
            <Input
              id="color-name"
              placeholder="e.g., brand-accent"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-musio-gray/50 border-border"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="color-value" className="text-muted-foreground">
              Color Value
            </Label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-12 h-12 rounded border border-border cursor-pointer bg-transparent"
              />
              <Input
                id="color-value"
                placeholder="#000000"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="flex-1 bg-musio-gray/50 border-border font-mono"
              />
            </div>
          </div>
          
          {/* Preview */}
          <div className="space-y-2">
            <Label className="text-muted-foreground">Preview</Label>
            <div 
              className="w-full h-16 rounded-lg border border-border/50"
              style={{ backgroundColor: value }}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!name.trim() || !value.trim()}
          >
            Add Color
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
