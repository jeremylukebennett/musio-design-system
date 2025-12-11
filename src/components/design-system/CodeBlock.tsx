import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export function CodeBlock({ code, language = "css", title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg overflow-hidden border border-border bg-musio-black/50">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-musio-gray/50">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </span>
          <span className="text-xs text-muted-foreground">{language}</span>
        </div>
      )}
      <div className="relative">
        <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-musio-white/90 font-mono">{code}</code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 rounded-md bg-musio-gray/80 hover:bg-musio-gray transition-colors"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check className="w-4 h-4 text-musio-mint" />
          ) : (
            <Copy className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      </div>
    </div>
  );
}
