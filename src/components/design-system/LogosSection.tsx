import { SectionHeader } from "./SectionHeader";
import { CodeBlock } from "./CodeBlock";
import { Download, Copy, Check } from "lucide-react";
import { useState } from "react";

const logos = [
  {
    name: "Black Text Logo (SVG)",
    filename: "musio_logo_blacks_text.svg",
    path: "/logos/musio_logo_blacks_text.svg",
    downloadUrl: "https://imagedelivery.net/r8lA-oPZomLbqo6uIxzOGA/9ba7c48e-2996-4b32-487e-0f580d7a2c00/backgroundImages",
    usage: "Light backgrounds",
    format: "SVG",
    preferred: true,
  },
  {
    name: "Black Text Logo (PNG)",
    filename: "musio_logo_blacks_text.png",
    path: "/logos/musio_logo_blacks_text.png",
    downloadUrl: "https://imagedelivery.net/r8lA-oPZomLbqo6uIxzOGA/44b68623-be75-4189-00b6-5c72d6101000/public",
    usage: "Light backgrounds",
    format: "PNG",
    preferred: false,
  },
  {
    name: "White Text Logo (SVG)",
    filename: "musio_logo_white_text.svg",
    path: "/logos/musio_logo_white_text.svg",
    downloadUrl: "https://imagedelivery.net/r8lA-oPZomLbqo6uIxzOGA/08420e67-8671-4c97-dcdf-3ce6b9afb100/backgroundImages",
    usage: "Dark backgrounds",
    format: "SVG",
    preferred: true,
  },
  {
    name: "White Text Logo (PNG)",
    filename: "musio_logo_white_text.png",
    path: "/logos/musio_logo_white_text.png",
    downloadUrl: "https://imagedelivery.net/r8lA-oPZomLbqo6uIxzOGA/756f4b4f-201f-4b83-a9ad-a635fc50b300/public",
    usage: "Dark backgrounds",
    format: "PNG",
    preferred: false,
  },
];

const usageGuideCSS = `/* Recommended Usage */

/* For light backgrounds (white, light gray, etc.) */
<img src="/logos/musio_logo_blacks_text.svg" alt="Musio" />

/* For dark backgrounds (black, dark purple, etc.) */
<img src="/logos/musio_logo_white_text.svg" alt="Musio" />

/* General best practices */
- Always prefer SVG format (infinitely scalable, lightweight)
- Use PNG only when SVG support is limited
- Maintain adequate contrast between logo and background
- Do not stretch or distort the logo - maintain aspect ratio
- Provide clear space around the logo (minimum 24px)`;

const handleDownload = (url: string, filename: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const handleCopySVG = async (path: string, setCopied: (value: boolean) => void) => {
  try {
    const response = await fetch(path);
    const svgText = await response.text();
    await navigator.clipboard.writeText(svgText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  } catch (error) {
    console.error('Failed to copy SVG:', error);
  }
};

export function LogosSection() {
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const setCopied = (path: string, value: boolean) => {
    setCopiedStates(prev => ({ ...prev, [path]: value }));
  };
  return (
    <section className="animate-fade-in">
      <SectionHeader
        id="logos"
        title="Logos"
        description="Official Musio logo assets with usage guidelines and download options."
      />

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {/* Usage Guidelines */}
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Usage Guidelines</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Format preference:</strong> Always use SVG format when possible.
                SVG files are vector-based, infinitely scalable without quality loss, and extremely lightweight.
                Only use PNG for platforms that don't support SVG.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Background contrast:</strong> Use the black text logo on light backgrounds
                and the white text logo on dark backgrounds to ensure optimal readability and brand consistency.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Clear space:</strong> Maintain at least 24px of clear space around
                the logo on all sides. Never stretch or distort the logo — always maintain its original aspect ratio.
              </p>
            </div>
          </div>
        </div>

        {/* Logo Variants - Black Text */}
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Black Text Variants</h3>
          <p className="text-sm text-muted-foreground mb-6">For use on light backgrounds</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {logos
              .filter(logo => logo.path.includes('blacks_text'))
              .map((logo) => (
                <div key={logo.path} className="space-y-3">
                  <div className="bg-white rounded-lg border-2 border-border p-8 flex items-center justify-center min-h-[160px] relative group">
                    <img
                      src={logo.path}
                      alt="Musio Logo - Black Text"
                      className="max-w-full h-auto"
                      style={{ maxHeight: '80px' }}
                    />
                    {logo.format === 'SVG' && (
                      <div className="absolute top-2 right-2 group/tooltip">
                        <button
                          onClick={() => handleCopySVG(logo.path, (value) => setCopied(logo.path, value))}
                          className="p-2 rounded-lg bg-musio-slate/90 text-musio-white hover:bg-musio-slate transition-all"
                        >
                          {copiedStates[logo.path] ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                        <div className="absolute -top-1 right-full mr-2 px-3 py-1.5 rounded-lg bg-musio-slate text-musio-white text-xs font-medium whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none">
                          {copiedStates[logo.path] ? 'Copied!' : 'Copy SVG code'}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground flex items-center gap-2">
                        {logo.format}
                        {logo.preferred && (
                          <span className="px-2 py-0.5 rounded bg-primary/15 text-primary text-xs font-semibold">
                            Preferred
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">{logo.usage}</p>
                    </div>
                    <div className="flex items-center justify-center min-h-[48px] min-w-[200px]">
                      <button
                        onClick={() => handleDownload(logo.downloadUrl, logo.filename)}
                        className="flex items-center justify-center gap-2 px-5 py-2.5 min-h-[48px] min-w-[200px] rounded-full text-[0.9vw] font-semibold bg-[#fb2545] text-white border border-white hover:px-[35px] hover:py-[5px] hover:min-h-[45px] hover:min-w-[180px] hover:text-[0.8vw] hover:bg-white hover:text-[#fb2545] hover:border-[#fb2545] transition-all duration-[250ms] ease-out"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Logo Variants - White Text */}
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold mb-4 text-foreground">White Text Variants</h3>
          <p className="text-sm text-muted-foreground mb-6">For use on dark backgrounds</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {logos
              .filter(logo => logo.path.includes('white_text'))
              .map((logo) => (
                <div key={logo.path} className="space-y-3">
                  <div className="bg-musio-black rounded-lg border-2 border-border p-8 flex items-center justify-center min-h-[160px] relative group">
                    <img
                      src={logo.path}
                      alt="Musio Logo - White Text"
                      className="max-w-full h-auto"
                      style={{ maxHeight: '80px' }}
                    />
                    {logo.format === 'SVG' && (
                      <div className="absolute top-2 right-2 group/tooltip">
                        <button
                          onClick={() => handleCopySVG(logo.path, (value) => setCopied(logo.path, value))}
                          className="p-2 rounded-lg bg-musio-white/90 text-musio-black hover:bg-musio-white transition-all"
                        >
                          {copiedStates[logo.path] ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                        <div className="absolute -top-1 right-full mr-2 px-3 py-1.5 rounded-lg bg-musio-slate text-musio-white text-xs font-medium whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none">
                          {copiedStates[logo.path] ? 'Copied!' : 'Copy SVG code'}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground flex items-center gap-2">
                        {logo.format}
                        {logo.preferred && (
                          <span className="px-2 py-0.5 rounded bg-primary/15 text-primary text-xs font-semibold">
                            Preferred
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">{logo.usage}</p>
                    </div>
                    <div className="flex items-center justify-center min-h-[48px] min-w-[200px]">
                      <button
                        onClick={() => handleDownload(logo.downloadUrl, logo.filename)}
                        className="flex items-center justify-center gap-2 px-5 py-2.5 min-h-[48px] min-w-[200px] rounded-full text-[0.9vw] font-semibold bg-[#fb2545] text-white border border-white hover:px-[35px] hover:py-[5px] hover:min-h-[45px] hover:min-w-[180px] hover:text-[0.8vw] hover:bg-white hover:text-[#fb2545] hover:border-[#fb2545] transition-all duration-[250ms] ease-out"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Side-by-Side Comparison */}
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Visual Comparison</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Light Background Example</p>
              <div className="bg-white rounded-lg border-2 border-border p-12 flex items-center justify-center">
                <img
                  src="/logos/musio_logo_blacks_text.svg"
                  alt="Musio Logo on Light Background"
                  className="max-w-full h-auto"
                  style={{ maxHeight: '60px' }}
                />
              </div>
              <p className="text-xs text-muted-foreground">Black text variant on light background ✓</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Dark Background Example</p>
              <div className="bg-musio-black rounded-lg border-2 border-border p-12 flex items-center justify-center">
                <img
                  src="/logos/musio_logo_white_text.svg"
                  alt="Musio Logo on Dark Background"
                  className="max-w-full h-auto"
                  style={{ maxHeight: '60px' }}
                />
              </div>
              <p className="text-xs text-muted-foreground">White text variant on dark background ✓</p>
            </div>
          </div>
        </div>

        {/* Usage Code Examples */}
        <div className="p-6 bg-musio-gray/30">
          <CodeBlock title="Usage Examples" language="html" code={usageGuideCSS} />
        </div>
      </div>
    </section>
  );
}
