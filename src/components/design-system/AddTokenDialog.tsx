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

interface AddTokenDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (token: { name: string; property: string; value: string }) => void;
}

export function AddTokenDialog({ open, onOpenChange, onSave }: AddTokenDialogProps) {
  const [name, setName] = useState("");
  const [property, setProperty] = useState("");
  const [value, setValue] = useState("");

  const handleSave = () => {
    if (name.trim() && property.trim() && value.trim()) {
      onSave({
        name: name.trim().toUpperCase().replace(/\s+/g, "-"),
        property: property.trim(),
        value: value.trim(),
      });
      setName("");
      setProperty("");
      setValue("");
      onOpenChange(false);
    }
  };

  const handleClose = () => {
    setName("");
    setProperty("");
    setValue("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Add Custom Token</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="token-name" className="text-muted-foreground">
              Token Name
            </Label>
            <Input
              id="token-name"
              placeholder="e.g., HERO-FONT-SIZE"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-musio-gray/50 border-border"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="css-property" className="text-muted-foreground">
              CSS Property
            </Label>
            <Input
              id="css-property"
              placeholder="e.g., font-size"
              value={property}
              onChange={(e) => setProperty(e.target.value)}
              className="bg-musio-gray/50 border-border"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="token-value" className="text-muted-foreground">
              Value (with unit)
            </Label>
            <Input
              id="token-value"
              placeholder="e.g., 60px or 3vw"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="bg-musio-gray/50 border-border"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!name.trim() || !property.trim() || !value.trim()}
          >
            Add Token
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
