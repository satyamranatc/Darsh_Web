import React, { useState } from "react";
import {
  BookOpen,
  ArrowLeft,
  CheckCircle2,
  Lightbulb,
  Layers,
  Eye,
  BarChart3,
  TrendingUp,
  PieChart,
  Box,
  Bookmark,
  ShieldCheck,
  Filter,
  AlertOctagon,
  RefreshCw,
  Sliders
} from "lucide-react";

export default function VisualizationGuide({ onBack }) {
  const [activeTab, setActiveTab] = useState("visualization"); // "visualization" | "cleaning"

  const vizSections = [
    { id: "mental-model", title: "1. The Mental Model: What is a Graph?" },
    { id: "perception", title: "2. The Visual Hierarchy of Human Perception" },
    { id: "shapes", title: "3. The 6 Fundamental Data Shapes" },
    { id: "anatomy", title: "4. Anatomy of a Graph: Zero-Debt Graphic Architecture" },
    { id: "color", title: "5. Color Discipline & Cognitive Load" },
    { id: "storytelling", title: "6. From Exploration to Executive Storytelling" },
    { id: "checklist", title: "7. The Universal Visualization Checklist" }
  ];

  const cleanSections = [
    { id: "gigo", title: "1. The Axiom: Garbage In, Garbage Out" },
    { id: "five-sins", title: "2. The 5 Deadly Sins of Raw Data" },
    { id: "missing-data", title: "3. The Missing Value Matrix (MCAR, MAR, MNAR)" },
    { id: "pipeline", title: "4. The 5-Stage Data Hygiene Pipeline" },
    { id: "quality-score", title: "5. The Objective Data Quality Score (0–100)" },
    { id: "cleaning-checklist", title: "6. The Pre-Visualization Sanitization Checklist" }
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-black text-neutral-300 font-sans antialiased selection:bg-indigo-500/20 selection:text-white">
      {/* Sticky Reader Header with Tab Switcher */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-black/80 border-b border-white/[0.08]">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors shrink-0"
          >
            <ArrowLeft className="size-3.5" />
            <span className="hidden sm:inline">Back to Engine</span>
          </button>

          {/* Segmented Tab Switcher */}
          <div className="inline-flex p-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
            <button
              onClick={() => {
                setActiveTab("visualization");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === "visualization"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <TrendingUp className="size-3.5" />
              <span>Thinking in Graphs</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("cleaning");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === "cleaning"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <ShieldCheck className="size-3.5" />
              <span>Data Cleaning Handbook</span>
            </button>
          </div>

          <div className="text-xs text-neutral-500 font-mono hidden md:block">
            Data Learning Hub
          </div>
        </div>
      </header>

      {/* ======================================================================= */}
      {/* TAB 1: THINKING IN GRAPHS (VISUALIZATION) */}
      {/* ======================================================================= */}
      {activeTab === "visualization" && (
        <article className="max-w-3xl mx-auto px-6 pt-16 pb-32">
          {/* Editorial Title Block */}
          <div className="mb-16 border-b border-white/[0.08] pb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[12px] text-neutral-400 mb-6">
              <BookOpen className="size-3.5 text-indigo-400" />
              <span>Masterpiece Guide &middot; Part I</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-semibold tracking-[-0.035em] text-white leading-[1.08] mb-6">
              Thinking in Graphs: <br />
              <span className="text-neutral-400 font-normal">
                How to Visualize Any Data on Any Platform
              </span>
            </h1>

            <p className="text-lg text-neutral-400 leading-relaxed font-normal mb-8">
              A universal mental model for data representation. Learn how to look at any raw table,
              discern its geometric truth, and choose the single clearest visual encoding without guesswork.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-500 font-mono pt-4 border-t border-white/[0.04]">
              <div>Author: <span className="text-neutral-300">Satyam Rana</span></div>
              <div>Reading Time: <span className="text-neutral-300">14 minutes</span></div>
              <div>Universal: <span className="text-neutral-300">Python &middot; Web &middot; BI &middot; R</span></div>
            </div>
          </div>

          {/* Quick Table of Contents Bar */}
          <div className="p-6 rounded-2xl bg-[#08080a] border border-white/[0.07] mb-16">
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4 flex items-center gap-2">
              <Bookmark className="size-3.5 text-indigo-400" />
              <span>Table of Contents</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {vizSections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className="text-left py-1 text-neutral-400 hover:text-white transition-colors truncate"
                >
                  {s.title}
                </button>
              ))}
            </div>
          </div>

          {/* SECTION 1 */}
          <section id="mental-model" className="mb-20 scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-6">
              1. The Mental Model: What is a Graph?
            </h2>
            <p className="text-base text-neutral-300 leading-relaxed mb-5 font-normal">
              A graph is not decoration. A graph is an <strong>optical translation engine</strong>.
            </p>
            <p className="text-base text-neutral-400 leading-relaxed mb-6 font-normal">
              Human working memory can hold approximately four discrete chunks of symbolic information at once. If you look at a table of 100 rows and 5 columns, your conscious prefrontal cortex must read numbers sequentially, calculate mental differences, memorize positions, and estimate variance. It is slow, error-prone, and exhausting.
            </p>
            <p className="text-base text-neutral-400 leading-relaxed mb-8 font-normal">
              However, your visual cortex processes sensory signals in parallel in less than <strong>200 milliseconds</strong>—before conscious thought even begins. Visualization is the deliberate mapping of abstract numbers into spatial geometry (length, position, angle, and area) so that the supercomputer in your visual cortex does the cognitive math for free.
            </p>

            <div className="p-6 rounded-2xl bg-white/[0.02] border-l-2 border-indigo-400 border-white/[0.06] mb-8">
              <div className="text-sm font-semibold text-white mb-1 flex items-center gap-2">
                <Lightbulb className="size-4 text-indigo-400" />
                <span>The Iron Law of Visualization</span>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Every pixel on your screen must either convey information or reduce cognitive friction. Any element that does neither is <em>decorative debt</em>.
              </p>
            </div>
          </section>

          {/* SECTION 2 */}
          <section id="perception" className="mb-20 scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-6">
              2. The Visual Hierarchy of Human Perception
            </h2>
            <p className="text-base text-neutral-400 leading-relaxed mb-6 font-normal">
              In 1984, researchers William Cleveland and Robert McGill conducted foundational experiments measuring how accurately human eyes decode different visual encodings. Their hierarchy remains the single most important rule in graphic design:
            </p>

            <div className="space-y-3 mb-8">
              {[
                { rank: "1. Position along a common scale", accuracy: "Highest Accuracy (99%)", desc: "Scatter points, dot plots, standard aligned bar charts. The human eye detects 1px differences effortlessly.", color: "text-emerald-400" },
                { rank: "2. Position along unaligned scales", accuracy: "High Accuracy (90%)", desc: "Small multiples, faceted grids. Harder than common scales, but still very fast.", color: "text-emerald-300" },
                { rank: "3. Length / Distance", accuracy: "Very Good (85%)", desc: "Bar lengths starting from zero. Easy to compare linear magnitude.", color: "text-sky-400" },
                { rank: "4. Slope / Angle", accuracy: "Moderate (65%)", desc: "Line slopes, pie chart slice angles. Humans routinely overestimate steep slopes and underestimate shallow angles.", color: "text-amber-400" },
                { rank: "5. Area (2D magnitude)", accuracy: "Poor (40%)", desc: "Bubble sizes, proportional circles. Humans perceive area logarithmically; a circle twice as large looks ~1.5x larger.", color: "text-orange-400" },
                { rank: "6. Volume & 3D Depth", accuracy: "Very Poor (20%)", desc: "3D perspective bars. Perspective skew makes accurate measurement virtually impossible.", color: "text-rose-400" },
                { rank: "7. Color Saturation & Hue", accuracy: "Categorical Only (10%)", desc: "Shades of color. Humans cannot accurately decode numerical values from color steps.", color: "text-neutral-400" }
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#08080a] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-white">{item.rank}</div>
                    <div className="text-xs text-neutral-400 mt-0.5">{item.desc}</div>
                  </div>
                  <span className={`text-xs font-mono font-medium shrink-0 ${item.color}`}>
                    {item.accuracy}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-sm text-neutral-400 italic">
              Rule of thumb: Whenever possible, encode your most critical metric into <strong>Position along a common scale</strong> (Rank 1). Never use Area or Color when Position or Length is available.
            </p>
          </section>

          {/* SECTION 3 */}
          <section id="shapes" className="mb-20 scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-6">
              3. The 6 Fundamental Data Shapes
            </h2>
            <p className="text-base text-neutral-400 leading-relaxed mb-8 font-normal">
              Every business question and scientific hypothesis maps directly to one of six core data relationships:
            </p>

            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#08080a] border border-white/[0.07]">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="size-4 text-indigo-400" />
                  <h3 className="text-lg font-semibold text-white">A. Trend Over Time (Temporal Change)</h3>
                </div>
                <p className="text-sm text-neutral-400 mb-2 leading-relaxed">
                  <strong>Question:</strong> Is metric X accelerating, decaying, cyclical, or stationary over a continuous horizon?
                </p>
                <div className="text-xs text-neutral-300">
                  <strong>Choice:</strong> <code>darsh.line()</code> for continuous series; <code>darsh.area()</code> for volume beneath trajectory. Always place Time on the horizontal X-axis.
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#08080a] border border-white/[0.07]">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="size-4 text-emerald-400" />
                  <h3 className="text-lg font-semibold text-white">B. Categorical Comparison (Discrete Ranking)</h3>
                </div>
                <p className="text-sm text-neutral-400 mb-2 leading-relaxed">
                  <strong>Question:</strong> Which category or segment is largest, and by what multiple?
                </p>
                <div className="text-xs text-neutral-300">
                  <strong>Choice:</strong> <code>darsh.bar()</code>. Use horizontal bars whenever category names exceed 8 characters to avoid awkward 45-degree angled text. Always sort by magnitude.
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#08080a] border border-white/[0.07]">
                <div className="flex items-center gap-2 mb-2">
                  <PieChart className="size-4 text-sky-400" />
                  <h3 className="text-lg font-semibold text-white">C. Part-to-Whole & Proportions</h3>
                </div>
                <p className="text-sm text-neutral-400 mb-2 leading-relaxed">
                  <strong>Question:</strong> How is a total sum divided among constituent shares?
                </p>
                <div className="text-xs text-neutral-300">
                  <strong>Choice:</strong> <code>darsh.donut()</code>. Limit slices to a maximum of 4 or 5. Group long tails into "Other", or use sorted horizontal bars.
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#08080a] border border-white/[0.07]">
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="size-4 text-amber-400" />
                  <h3 className="text-lg font-semibold text-white">D. Distribution & Spread</h3>
                </div>
                <p className="text-sm text-neutral-400 mb-2 leading-relaxed">
                  <strong>Question:</strong> Is the metric normally distributed, heavily skewed, or plagued by outliers?
                </p>
                <div className="text-xs text-neutral-300">
                  <strong>Choice:</strong> <code>darsh.hist(bins=25, kde=True)</code> or <code>darsh.box()</code>. Never rely solely on the mean; inspect variance and skew directly.
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#08080a] border border-white/[0.07]">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="size-4 text-rose-400" />
                  <h3 className="text-lg font-semibold text-white">E. Correlation & Relationship</h3>
                </div>
                <p className="text-sm text-neutral-400 mb-2 leading-relaxed">
                  <strong>Question:</strong> As variable X increases, does variable Y increase, decrease, or remain indifferent?
                </p>
                <div className="text-xs text-neutral-300">
                  <strong>Choice:</strong> <code>darsh.scatter()</code> for pairs; <code>darsh.heatmap()</code> for correlation matrices across many variables.
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#08080a] border border-white/[0.07]">
                <div className="flex items-center gap-2 mb-2">
                  <Box className="size-4 text-purple-400" />
                  <h3 className="text-lg font-semibold text-white">F. Spatial & Multi-Dimensional Geometry (3D)</h3>
                </div>
                <p className="text-sm text-neutral-400 mb-2 leading-relaxed">
                  <strong>Question:</strong> How do three continuous physical or economic metrics interact in coordinate space?
                </p>
                <div className="text-xs text-neutral-300">
                  <strong>Choice:</strong> <code>darsh.scatter_3d()</code> or <code>darsh.surface_3d()</code>. 3D is justified only when interactive camera orbiting is enabled.
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4 */}
          <section id="anatomy" className="mb-20 scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-6">
              4. Anatomy of a Graph: Zero-Debt Graphic Architecture
            </h2>
            <div className="space-y-4 mb-8">
              <div className="p-5 rounded-2xl bg-[#08080a] border border-white/[0.07]">
                <h4 className="text-sm font-semibold text-white mb-1.5">A. The Non-Negotiable Zero Baseline Rule</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Bar charts encode value into <em>length</em>. If your bar chart’s Y-axis starts at 80 instead of 0, a bar of 90 looks twice as long as a bar of 85, falsely magnifying a 5% difference into a 100% illusion. <strong>Bars must always start at zero.</strong> Line charts encode value into <em>position</em>; they may truncate the baseline when examining subtle micro-variance over time, provided the baseline is clearly stated.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#08080a] border border-white/[0.07]">
                <h4 className="text-sm font-semibold text-white mb-1.5">B. Eliminate Legend Ping-Pong with Direct Labeling</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Standard tools put a legend box in the top-right corner. The reader’s eyes must jump from the line, to the legend, match the color, jump back to the line, and repeat. This is called <em>cognitive ping-pong</em>. Instead, place labels directly beside the terminal point of each line.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#08080a] border border-white/[0.07]">
                <h4 className="text-sm font-semibold text-white mb-1.5">C. Subdued Gridlines: Whispering, Never Shouting</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Gridlines exist only to guide the eye across wide spans. They should never be dark black or heavy. Use hairline strokes with subtle opacity (<code>rgba(255,255,255,0.06)</code>). If the gridline competes with the data line for visual dominance, the design has failed.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 5 */}
          <section id="color" className="mb-20 scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-6">
              5. Color Discipline & Cognitive Load
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-5 rounded-xl bg-[#08080a] border border-white/[0.06]">
                <div className="text-xs font-mono font-semibold text-indigo-400 mb-1">Sequential</div>
                <div className="text-sm font-semibold text-white mb-1">Magnitude</div>
                <p className="text-xs text-neutral-400">Single hue varying from light to dark for continuous scales.</p>
              </div>
              <div className="p-5 rounded-xl bg-[#08080a] border border-white/[0.06]">
                <div className="text-xs font-mono font-semibold text-emerald-400 mb-1">Diverging</div>
                <div className="text-sm font-semibold text-white mb-1">Bipolar Deviation</div>
                <p className="text-xs text-neutral-400">Two contrasting hues diverging from a neutral midpoint.</p>
              </div>
              <div className="p-5 rounded-xl bg-[#08080a] border border-white/[0.06]">
                <div className="text-xs font-mono font-semibold text-sky-400 mb-1">Categorical</div>
                <div className="text-sm font-semibold text-white mb-1">Identity</div>
                <p className="text-xs text-neutral-400">Distinct qualitative colors of equal perceptual lightness.</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border-l-2 border-emerald-400 border-white/[0.06] mb-8">
              <div className="text-sm font-semibold text-white mb-1">The 90/10 Accent Rule</div>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Keep 90% of your chart in subdued neutrals (slate, cool gray, muted charcoal). Use <strong>one deliberate accent color</strong> (such as calm indigo or emerald) exclusively on the single data point, line, or cohort you want the audience to remember.
              </p>
            </div>
          </section>

          {/* SECTION 6 */}
          <section id="storytelling" className="mb-20 scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-6">
              6. From Exploration to Executive Storytelling
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-red-500/[0.04] border border-red-500/20">
                <div className="text-xs font-mono text-red-400 uppercase font-semibold mb-1">✕ Passive / Boring</div>
                <div className="text-sm font-medium text-white mb-1">"Monthly Revenue 2024–2025"</div>
                <p className="text-xs text-neutral-400">Forces the viewer to deduce what happened.</p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/20">
                <div className="text-xs font-mono text-emerald-400 uppercase font-semibold mb-1">✓ Active / Authoritative</div>
                <div className="text-sm font-medium text-white mb-1">"Enterprise Expansion Drove 42% ARR Surge in Q3"</div>
                <p className="text-xs text-neutral-400">Declares the conclusion immediately; the chart provides the empirical proof.</p>
              </div>
            </div>
          </section>

          {/* SECTION 7 */}
          <section id="checklist" className="mb-20 scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-6">
              7. The Universal Visualization Checklist
            </h2>
            <div className="space-y-3 mb-12">
              {[
                "Does the chart type match the underlying mathematical shape of the data?",
                "Do all bar charts start strictly at zero on the value axis?",
                "Are categories sorted by magnitude rather than arbitrary alphabetical order?",
                "Is time placed horizontally on the X-axis running left-to-right?",
                "Are gridlines subdued and subtle, letting the data lines dominate?",
                "Have you eliminated redundant legends in favor of direct line labels?",
                "Is color reserved for meaning rather than decorative noise?",
                "Does the chart title state the key insight rather than restating the axis names?",
                "Are numbers formatted with human-readable abbreviations ($4.2M instead of 4201948.21)?",
                "Does the chart scale fluidly across viewports with zero text clipping?"
              ].map((rule, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#08080a] border border-white/[0.06] text-xs sm:text-sm text-neutral-300">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </div>
              ))}
            </div>

            <div className="p-8 rounded-3xl bg-[#08080a] border border-white/[0.08] text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Ready to clean your data first?</h3>
              <p className="text-sm text-neutral-400 max-w-md mx-auto mb-6">
                Explore Part II of the Learning Hub: The Data Cleaning Handbook.
              </p>
              <button
                onClick={() => {
                  setActiveTab("cleaning");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="h-10 px-6 rounded-full bg-white hover:bg-neutral-200 text-black text-xs font-semibold transition-all inline-flex items-center gap-2"
              >
                <span>Read the Data Cleaning Handbook</span>
                <ShieldCheck className="size-4 text-indigo-600" />
              </button>
            </div>
          </section>
        </article>
      )}

      {/* ======================================================================= */}
      {/* TAB 2: DATA CLEANING HANDBOOK */}
      {/* ======================================================================= */}
      {activeTab === "cleaning" && (
        <article className="max-w-3xl mx-auto px-6 pt-16 pb-32">
          {/* Editorial Title Block */}
          <div className="mb-16 border-b border-white/[0.08] pb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[12px] text-neutral-400 mb-6">
              <ShieldCheck className="size-3.5 text-emerald-400" />
              <span>Masterpiece Guide &middot; Part II</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-semibold tracking-[-0.035em] text-white leading-[1.08] mb-6">
              The Data Cleaning <br />
              <span className="text-neutral-400 font-normal">
                Handbook & Hygiene Blueprint
              </span>
            </h1>

            <p className="text-lg text-neutral-400 leading-relaxed font-normal mb-8">
              80% of flawed, broken, or misleading charts are not design mistakes—they are data hygiene failures.
              Learn how to sanitize, profile, and structure raw tables into bulletproof visualization-ready datasets.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-500 font-mono pt-4 border-t border-white/[0.04]">
              <div>Author: <span className="text-neutral-300">Satyam Rana</span></div>
              <div>Reading Time: <span className="text-neutral-300">12 minutes</span></div>
              <div>Standard: <span className="text-neutral-300">Deterministic & Auditable</span></div>
            </div>
          </div>

          {/* Quick Table of Contents Bar */}
          <div className="p-6 rounded-2xl bg-[#08080a] border border-white/[0.07] mb-16">
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4 flex items-center gap-2">
              <Bookmark className="size-3.5 text-emerald-400" />
              <span>Cleaning Guide Sections</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {cleanSections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className="text-left py-1 text-neutral-400 hover:text-white transition-colors truncate"
                >
                  {s.title}
                </button>
              ))}
            </div>
          </div>

          {/* SECTION 1 */}
          <section id="gigo" className="mb-20 scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-6">
              1. The Axiom: Garbage In, Garbage Out
            </h2>
            <p className="text-base text-neutral-300 leading-relaxed mb-5 font-normal">
              No amount of aesthetic design, calm palettes, or 3D camera orbits can save a chart built on polluted data.
            </p>
            <p className="text-base text-neutral-400 leading-relaxed mb-6 font-normal">
              When an executive or analyst notices an anomaly in a chart—such as a single date with zero revenue, a spike to $999,999, or duplicate customer entries—they stop evaluating the insight. <strong>Their brain immediately shifts to auditing the credibility of the entire report.</strong> Once data trust is broken, the presentation is over.
            </p>
            <p className="text-base text-neutral-400 leading-relaxed mb-8 font-normal">
              Data cleaning is not an unglamorous prelude to visualization; it is the foundation of analytical truth. A professional visualization pipeline guarantees that data entering the charting engine is deterministic, auditable, and defensively typed.
            </p>

            <div className="p-6 rounded-2xl bg-white/[0.02] border-l-2 border-emerald-400 border-white/[0.06] mb-8">
              <div className="text-sm font-semibold text-white mb-1 flex items-center gap-2">
                <Lightbulb className="size-4 text-emerald-400" />
                <span>The Golden Rule of Data Hygiene</span>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Never perform destructive, irreversible in-place edits without an audit trace. Data cleaning should always produce a pure, repeatable functional transformation from raw input to clean output.
              </p>
            </div>
          </section>

          {/* SECTION 2 */}
          <section id="five-sins" className="mb-20 scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-6">
              2. The 5 Deadly Sins of Raw Data
            </h2>
            <p className="text-base text-neutral-400 leading-relaxed mb-8 font-normal">
              Nearly every data quality failure originates from five predictable anomalies:
            </p>

            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#08080a] border border-white/[0.07]">
                <div className="flex items-center gap-2 mb-2">
                  <AlertOctagon className="size-4 text-rose-400" />
                  <h3 className="text-base font-semibold text-white">Sin 1: Chaotic Column Names</h3>
                </div>
                <p className="text-xs text-neutral-400 mb-2 leading-relaxed">
                  Headers containing spaces (<code>"Annual Revenue "</code>), mixed case (<code>"Cust_ID"</code> vs <code>"customer_id"</code>), leading symbols, and special characters (<code>"Revenue ($M)"</code>).
                </p>
                <div className="text-xs text-neutral-300">
                  <strong>The Fix:</strong> Strip leading/trailing whitespace, convert to lower <code>snake_case</code>, and remove parentheses. In Darsh: <code>df.darsh.clean_names()</code>.
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#08080a] border border-white/[0.07]">
                <div className="flex items-center gap-2 mb-2">
                  <RefreshCw className="size-4 text-amber-400" />
                  <h3 className="text-base font-semibold text-white">Sin 2: Zombie Duplicate Records</h3>
                </div>
                <p className="text-xs text-neutral-400 mb-2 leading-relaxed">
                  Accidental row replications caused by API retries, network glitches, or sloppy joins. They silently double sales figures and corrupt KPI sum aggregations.
                </p>
                <div className="text-xs text-neutral-300">
                  <strong>The Fix:</strong> Run deduplication before any mathematical aggregation. In Darsh: <code>df.darsh.drop_duplicates()</code>.
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#08080a] border border-white/[0.07]">
                <div className="flex items-center gap-2 mb-2">
                  <Filter className="size-4 text-sky-400" />
                  <h3 className="text-base font-semibold text-white">Sin 3: Silent Missingness (NaN / Null / None)</h3>
                </div>
                <p className="text-xs text-neutral-400 mb-2 leading-relaxed">
                  Blank cells, literal strings like <code>"N/A"</code>, <code>"null"</code>, <code>"None"</code>, or whitespace strings that fool Python into treating them as valid categorical text.
                </p>
                <div className="text-xs text-neutral-300">
                  <strong>The Fix:</strong> Standardize sentinels to true IEEE <code>NaN</code>, then apply auditable imputation strategies. In Darsh: <code>df.darsh.fill_missing(strategy='smart')</code>.
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#08080a] border border-white/[0.07]">
                <div className="flex items-center gap-2 mb-2">
                  <Sliders className="size-4 text-indigo-400" />
                  <h3 className="text-base font-semibold text-white">Sin 4: Dirty Type Traps</h3>
                </div>
                <p className="text-xs text-neutral-400 mb-2 leading-relaxed">
                  Numbers stored as strings because of dollar signs (<code>"$1,250.00"</code>) or commas (<code>"10,000"</code>). When plotted, charting libraries sort them alphabetically (1, 10, 100, 2, 20) rather than numerically!
                </p>
                <div className="text-xs text-neutral-300">
                  <strong>The Fix:</strong> Strip currency symbols and commas, convert to numeric float/int, and coerce ISO dates. In Darsh: <code>df.darsh.infer_types()</code>.
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#08080a] border border-white/[0.07]">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="size-4 text-emerald-400" />
                  <h3 className="text-base font-semibold text-white">Sin 5: Destructive Outliers & Sentinel Values</h3>
                </div>
                <p className="text-xs text-neutral-400 mb-2 leading-relaxed">
                  Test records (<code>test@internal.com</code>), sentinel place-holders (<code>age = 999</code> or <code>price = -1</code>), or data capture spikes that crush your Y-axis scale into an unreadable flat pancake.
                </p>
                <div className="text-xs text-neutral-300">
                  <strong>The Fix:</strong> Audit minimums and maximums; filter out testing artifacts before computing axis limits.
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3 */}
          <section id="missing-data" className="mb-20 scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-6">
              3. The Missing Value Matrix (MCAR, MAR, MNAR)
            </h2>
            <p className="text-base text-neutral-400 leading-relaxed mb-6 font-normal">
              Statistical theory defines three distinct mechanisms of missing data. Understanding which mechanism applies determines whether you should drop or impute:
            </p>

            <div className="space-y-4 mb-8">
              <div className="p-5 rounded-2xl bg-[#08080a] border border-white/[0.07]">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-white">MCAR: Missing Completely at Random</h4>
                  <span className="text-[11px] font-mono text-emerald-400">Safe to Drop / Impute</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  The missingness has zero relationship to any observed or unobserved variable (e.g. a sensor battery died at random). Dropping these rows reduces sample size but does not introduce statistical bias.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#08080a] border border-white/[0.07]">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-white">MAR: Missing at Random</h4>
                  <span className="text-[11px] font-mono text-sky-400">Impute with Group Context</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  The missingness depends on other observed data, but not the missing value itself (e.g. younger users are less likely to report income in a survey, but their income matches other younger users). Impute using cohort medians.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#08080a] border border-white/[0.07]">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-white">MNAR: Missing Not at Random</h4>
                  <span className="text-[11px] font-mono text-rose-400">Missingness is the Signal</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  The missing value itself causes the missingness (e.g. users with very high debt refuse to report debt). Imputing with the overall median will severely underestimate the truth. Treat the missingness as its own explicit category: <code>"Unreported"</code>.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-neutral-300">
              <strong>The Median Rule:</strong> When imputing numerical columns, prefer the <strong>median</strong> over the <strong>mean</strong>. A single outlier of $10,000,000 will violently distort the mean, whereas the median remains stable and robust.
            </div>
          </section>

          {/* SECTION 4 */}
          <section id="pipeline" className="mb-20 scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-6">
              4. The 5-Stage Data Hygiene Pipeline
            </h2>
            <p className="text-base text-neutral-400 leading-relaxed mb-6 font-normal">
              Execute your data transformations in strict sequential phases:
            </p>

            <div className="space-y-4 mb-8">
              {[
                { stage: "Stage 1: Ingestion & Schema Profiling", desc: "Audit row counts, column types, null percentages, and memory footprint. Never transform without an initial snapshot." },
                { stage: "Stage 2: Structural Sanitization", desc: "Clean column names to lower snake_case, trim surrounding whitespace from string columns, and drop duplicate rows." },
                { stage: "Stage 3: Type Enforcement & Temporal Extraction", desc: "Cast numbers to floats/ints. Parse date strings to timestamps and extract year, month, quarter, and day_of_week features for temporal visualization." },
                { stage: "Stage 4: Deterministic Imputation", desc: "Fill numeric nulls with median values; fill categorical nulls with mode or an explicit 'Unknown' sentinel. Never hide what was imputed." },
                { stage: "Stage 5: Normalization & Scaling", desc: "Apply logarithmic transforms (log1p) to power-law distributions (e.g. revenue, traffic) so that small values remain visible on charts." }
              ].map((step, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#08080a] border border-white/[0.06]">
                  <div className="text-sm font-semibold text-white mb-1">{step.stage}</div>
                  <p className="text-xs text-neutral-400 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 5 */}
          <section id="quality-score" className="mb-20 scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-6">
              5. The Objective Data Quality Score (0–100)
            </h2>
            <p className="text-base text-neutral-400 leading-relaxed mb-6 font-normal">
              How do you know when a dataset is clean enough for an executive presentation? Don't rely on gut feel; calculate a mathematical quality score:
            </p>

            <div className="p-6 rounded-2xl bg-[#08080a] border border-white/[0.08] mb-8 font-mono text-xs text-neutral-300 space-y-2">
              <div className="text-indigo-400 font-semibold">// The Quality Score Formula</div>
              <div>Quality Score = 100 - (Null Penalty) - (Duplicate Penalty) - (Type Inconsistency Penalty)</div>
              <div className="text-neutral-500 pt-2 border-t border-white/[0.06]">
                &gt; 95: Production grade. Safe for executive dashboards.<br />
                85 &ndash; 95: Acceptable for internal exploratory analytics.<br />
                &lt; 85: Unsafe. High risk of visual distortion and broken aggregations.
              </div>
            </div>

            <p className="text-sm text-neutral-400 leading-relaxed mb-6">
              In Darsh, this is automated in a single call via <code>df.darsh.quality_score()</code>, accompanied by a transparent breakdown in <code>df.darsh.profile()</code>.
            </p>
          </section>

          {/* SECTION 6 */}
          <section id="cleaning-checklist" className="mb-20 scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-6">
              6. The Pre-Visualization Sanitization Checklist
            </h2>
            <p className="text-base text-neutral-400 leading-relaxed mb-6 font-normal">
              Before passing any dataset into your visualization code, verify each item:
            </p>

            <div className="space-y-3 mb-12">
              {[
                "Are all column names lower snake_case with zero spaces or special characters?",
                "Have duplicate rows been identified, verified, and removed?",
                "Are date columns parsed into genuine datetime objects rather than strings?",
                "Are numerical metrics stored as float/int without dollar signs or commas?",
                "Have missing values been explicitly handled (imputed or grouped into 'Unknown')?",
                "Are categorical columns standardized (e.g. 'US', 'USA', 'United States' consolidated)?",
                "Have extreme outliers or testing records (e.g. test@internal.com) been filtered?",
                "Does the dataset score above 95 on the objective Data Quality Index?"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#08080a] border border-white/[0.06] text-xs sm:text-sm text-neutral-300">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="p-8 rounded-3xl bg-[#08080a] border border-white/[0.08] text-center">
              <h3 className="text-xl font-semibold text-white mb-2">Ready to turn clean data into graphs?</h3>
              <p className="text-sm text-neutral-400 max-w-md mx-auto mb-6">
                Now that your data is pristine, jump into Part I to master visual perception and chart selection.
              </p>
              <button
                onClick={() => {
                  setActiveTab("visualization");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="h-10 px-6 rounded-full bg-white hover:bg-neutral-200 text-black text-xs font-semibold transition-all inline-flex items-center gap-2"
              >
                <span>Read Thinking in Graphs</span>
                <TrendingUp className="size-4 text-indigo-600" />
              </button>
            </div>
          </section>
        </article>
      )}
    </div>
  );
}
