import React, { useState, useEffect } from "react";
import { updatePageSEO } from "./lib/seo";
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
  Sliders,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Hash,
  Share2,
  Compass,
  CheckSquare,
  Square
} from "lucide-react";

export default function VisualizationGuide({ onBack }) {
  const [activeTab, setActiveTab] = useState("visualization"); // "visualization" | "cleaning" | "chooser"
  const [copiedKey, setCopiedKey] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [checkedItems, setCheckedItems] = useState({});
  const [selectedChooserShape, setSelectedChooserShape] = useState("trend");

  // Sync Guide SEO Metadata
  useEffect(() => {
    updatePageSEO("guide");
  }, []);

  // Track scroll progress for reading bar
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const copySnippet = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2200);
  };

  const toggleCheck = (idx) => {
    setCheckedItems((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

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

  const chooserShapes = {
    trend: {
      title: "Trend Over Time",
      desc: "Continuous trajectory across chronological sequence (days, quarters, years).",
      func: "darsh.line(data, x='date', y='metric', title='Trajectory')",
      bestFor: "ARR, monthly active users, sensor telemetry, stock volatility",
      avoid: "Categorical names on X-axis, truncated zero baseline without disclosure",
      color: "#6366F1",
      exampleSnippet: `import darsh\nax = darsh.line([12, 28, 19, 45, 62, 58], title="Weekly Growth")`
    },
    comparison: {
      title: "Categorical Comparison",
      desc: "Discrete quantities compared across distinct entities or segments.",
      func: "darsh.bar(data, x='team', y='score', horizontal=False)",
      bestFor: "Department performance, market segments, regional breakdown",
      avoid: "Non-zero baselines, unsorted order, vertical bars with long labels",
      color: "#10B981",
      exampleSnippet: `import darsh\nax = darsh.bar({"Engineering": 96, "Design": 92, "Product": 88}, title="Score")`
    },
    proportions: {
      title: "Part-to-Whole Proportions",
      desc: "Relative constituent shares summing to an exact 100% total.",
      func: "darsh.donut(data, hole=0.55, title='Revenue Mix')",
      bestFor: "3-5 primary segments, budget allocations, device shares",
      avoid: "More than 5 slices, 3D exploded pie charts, negative values",
      color: "#38BDF8",
      exampleSnippet: `import darsh\nax = darsh.donut({"Cloud": 60, "Hardware": 25, "Services": 15})`
    },
    distribution: {
      title: "Distribution & Variance",
      desc: "Probability spread, skewness, clustering, and outlier detection.",
      func: "darsh.hist(data, column='latency', bins=25, kde=True)",
      bestFor: "API latencies, user session lengths, transaction amounts",
      avoid: "Reporting only the mathematical mean without inspecting variance",
      color: "#F59E0B",
      exampleSnippet: `import darsh\nax = darsh.hist(df, column="latency_ms", bins=20, kde=True)`
    },
    correlation: {
      title: "Correlation & Relationship",
      desc: "Testing co-variance and predictive relationships between two variables.",
      func: "darsh.scatter(data, x='ad_spend', y='conversions', alpha=0.75)",
      bestFor: "CAC vs LTV, horsepower vs fuel economy, price vs volume",
      avoid: "Assuming correlation proves causation without domain rigor",
      color: "#EC4899",
      exampleSnippet: `import darsh\nax = darsh.scatter(df, x="ad_spend", y="revenue", title="ROI Space")`
    },
    spatial3d: {
      title: "3D Spatial Coordinate Depth",
      desc: "Interactions across 3 continuous physical or economic axes.",
      func: "darsh.scatter_3d(data, x='rev', y='profit', z='units', title='3D Space')",
      bestFor: "Complex multi-variable optimization, volumetric scans, spatial coords",
      avoid: "Static 2D image exports of 3D charts where perspective causes occlusion",
      color: "#A855F7",
      exampleSnippet: `import darsh\nfig = darsh.scatter_3d(df, x="rev", y="profit", z="units")\nfig.show()`
    }
  };

  return (
    <div className="min-h-screen bg-black text-neutral-300 font-sans antialiased selection:bg-indigo-500/25 selection:text-white relative">
      {/* ======================================================================= */}
      {/* READING PROGRESS BAR */}
      {/* ======================================================================= */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-neutral-900">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ======================================================================= */}
      {/* STICKY EDITORIAL HEADER */}
      {/* ======================================================================= */}
      <header className="sticky top-0 z-40 backdrop-blur-2xl bg-black/80 border-b border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors shrink-0 group"
          >
            <ArrowLeft className="size-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Return to Studio</span>
          </button>

          {/* Apple-grade Segmented Pill Switcher */}
          <div className="inline-flex p-1 rounded-full bg-neutral-900/90 border border-white/[0.1] backdrop-blur-xl shadow-lg">
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
              <span>Data Hygiene Blueprint</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("chooser");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === "chooser"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Compass className="size-3.5" />
              <span className="hidden sm:inline">Chart Chooser</span>
            </button>
          </div>

          <div className="text-xs text-neutral-500 font-mono hidden md:flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            <span>Editorial Handbook</span>
          </div>
        </div>
      </header>

      {/* Guide Main Landmark */}
      <main id="guide-main" className="relative z-10 w-full">

      {/* ======================================================================= */}
      {/* TAB 1: THINKING IN GRAPHS (VISUALIZATION MASTERCLASS) */}
      {/* ======================================================================= */}
      {activeTab === "visualization" && (
        <article className="max-w-4xl mx-auto px-6 pt-16 pb-36">
          {/* Editorial Title Block */}
          <header className="mb-20 border-b border-white/[0.08] pb-14">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 font-mono font-medium">
                <Sparkles className="size-3 text-indigo-400" />
                ISSUE #01 &middot; THE SCIENCE OF PERCEPTION
              </span>
              <span className="text-xs text-neutral-500 font-mono">14 MIN READ</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.04em] text-white leading-[1.04] mb-8">
              Thinking in Graphs: <br />
              <span className="apple-gradient-hero">
                How to Visualize Any Data on Any Platform
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-neutral-400 leading-relaxed font-normal mb-10 max-w-3xl">
              A universal mental model for empirical representation. Learn how to look at any raw table,
              discern its geometric truth, and choose the single clearest visual encoding without guesswork.
            </p>

            {/* Author Byline & Meta */}
            <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-white/[0.06] text-xs text-neutral-400 font-mono">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-gradient-to-tr from-indigo-500 to-sky-400 p-[1px]">
                  <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-white font-bold text-xs">
                    SR
                  </div>
                </div>
                <div>
                  <div className="text-white font-medium">Satyam Rana</div>
                  <div className="text-neutral-500 text-[11px]">Architect of Darsh &middot; Open Source</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06]">
                  Python &middot; Matplotlib &middot; Plotly
                </span>
                <button
                  onClick={() => copySnippet(window.location.href, "share-link")}
                  className="hover:text-white flex items-center gap-1.5 text-neutral-400 transition-colors"
                >
                  {copiedKey === "share-link" ? <Check className="size-3 text-emerald-400" /> : <Share2 className="size-3" />}
                  <span>{copiedKey === "share-link" ? "Link Copied" : "Share"}</span>
                </button>
              </div>
            </div>
          </header>

          {/* Quick Table of Contents Bar */}
          <nav aria-label="Table of contents" className="p-6 sm:p-8 rounded-3xl apple-card mb-20">
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-5 flex items-center gap-2">
              <Bookmark className="size-3.5 text-indigo-400" />
              <span>Chapter Navigation</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {vizSections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className="text-left py-1 text-neutral-400 hover:text-white transition-colors truncate flex items-center gap-2 group"
                >
                  <span className="size-1 rounded-full bg-neutral-600 group-hover:bg-indigo-400 transition-colors" />
                  <span>{s.title}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* SECTION 1 */}
          <section id="mental-model" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-wider mb-2">
              <Hash className="size-3" />
              <span>Chapter 01</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6">
              The Mental Model: What is a Graph?
            </h2>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed mb-6 font-normal">
              A graph is not decoration. A graph is an <strong>optical translation engine</strong>.
            </p>
            <p className="text-base text-neutral-400 leading-relaxed mb-6 font-normal">
              Human working memory can hold approximately four discrete chunks of symbolic information at once. If you look at a table of 100 rows and 5 columns, your conscious prefrontal cortex must read numbers sequentially, calculate mental differences, memorize positions, and estimate variance. It is slow, error-prone, and exhausting.
            </p>
            <p className="text-base text-neutral-400 leading-relaxed mb-10 font-normal">
              However, your visual cortex processes sensory signals in parallel in less than <strong>200 milliseconds</strong>—before conscious thought even begins. Visualization is the deliberate mapping of abstract numbers into spatial geometry (length, position, angle, and area) so that the supercomputer in your visual cortex does the cognitive math for free.
            </p>

            {/* SMALL VISUAL: SEQUENTIAL TABLE VS OPTICAL PARALLEL DECODE */}
            <div className="p-6 sm:p-8 rounded-3xl apple-card border border-white/[0.08] mb-10">
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-6 flex items-center justify-between">
                <span>Empirical Demonstration: Brain Decode Latency</span>
                <span className="text-indigo-400 font-mono text-[11px]">Parallel Visual vs Symbolic</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Left: Symbolic Table */}
                <div className="p-5 rounded-2xl bg-black border border-white/[0.08] space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 pb-2 border-b border-white/[0.06]">
                    <span>Raw Numerical Sequence</span>
                    <span className="text-rose-400">Sequential: ~2,400ms</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 font-mono text-xs text-neutral-400 py-2 text-center">
                    <span className="p-1.5 rounded bg-white/[0.02]">12.4</span>
                    <span className="p-1.5 rounded bg-white/[0.02]">28.1</span>
                    <span className="p-1.5 rounded bg-white/[0.02]">19.0</span>
                    <span className="p-1.5 rounded bg-white/[0.02]">45.6</span>
                    <span className="p-1.5 rounded bg-white/[0.02]">62.2</span>
                    <span className="p-1.5 rounded bg-white/[0.02]">58.4</span>
                  </div>
                  <div className="text-[10px] text-neutral-500 text-center">
                    Viewer must scan every digit to locate the peak and trajectory inflection.
                  </div>
                </div>

                {/* Right: Optical Geometry */}
                <div className="p-5 rounded-2xl bg-black border border-indigo-500/30 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 pb-2 border-b border-white/[0.06]">
                    <span>Darsh Optical Geometry</span>
                    <span className="text-emerald-400 font-semibold">Visual Cortex: &lt;200ms</span>
                  </div>
                  <div className="h-20 w-full flex items-end">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60">
                      <path
                        d="M 10 50 Q 50 35, 80 42 T 140 15 T 180 8"
                        fill="none"
                        stroke="#6366F1"
                        strokeWidth="2.5"
                      />
                      <circle cx="140" cy="15" r="4" fill="#38BDF8" />
                      <circle cx="180" cy="8" r="3" fill="#6366F1" />
                    </svg>
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono text-center">
                    Inflection point and trajectory peak perceived instantaneously without effort.
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border-l-2 border-indigo-400 border-white/[0.06]">
              <div className="text-sm font-semibold text-white mb-1.5 flex items-center gap-2">
                <Lightbulb className="size-4 text-indigo-400" />
                <span>The Iron Law of Visualization</span>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed font-normal">
                Every pixel on your screen must either convey information or reduce cognitive friction. Any element that does neither is <em>decorative debt</em>.
              </p>
            </div>
          </section>

          {/* SECTION 2 */}
          <section id="perception" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-wider mb-2">
              <Hash className="size-3" />
              <span>Chapter 02</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6">
              The Visual Hierarchy of Human Perception
            </h2>
            <p className="text-base text-neutral-400 leading-relaxed mb-8 font-normal">
              In 1984, researchers William Cleveland and Robert McGill conducted foundational psychophysical experiments measuring how accurately human eyes decode different visual encodings. Their hierarchy remains the single most important rule in graphic design:
            </p>

            {/* VISUAL HIERARCHY CARDS WITH MINI DIAGRAMS */}
            <div className="space-y-4 mb-10">
              {[
                {
                  rank: "1. Position along a Common Scale",
                  accuracy: "Highest Accuracy (99%)",
                  badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
                  desc: "Scatter points, dot plots, standard aligned bar charts. The human eye detects 1px differences effortlessly.",
                  diagram: (
                    <div className="h-10 w-36 flex items-center justify-between border-b border-white/20 relative">
                      <span className="size-2 rounded-full bg-emerald-400 absolute left-4" />
                      <span className="size-2 rounded-full bg-emerald-400 absolute left-20" />
                      <span className="text-[9px] font-mono text-neutral-500 absolute bottom-1 right-1">Aligned</span>
                    </div>
                  )
                },
                {
                  rank: "2. Position along Unaligned Scales",
                  accuracy: "High Accuracy (90%)",
                  badgeColor: "text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
                  desc: "Small multiples, faceted grids. Harder than common scales, but still rapid and reliable.",
                  diagram: (
                    <div className="h-10 w-36 flex items-center gap-2">
                      <div className="w-16 h-8 border border-white/10 rounded p-1 flex items-center"><div className="size-1.5 rounded-full bg-sky-400" /></div>
                      <div className="w-16 h-8 border border-white/10 rounded p-1 flex items-center"><div className="size-1.5 rounded-full bg-sky-400" /></div>
                    </div>
                  )
                },
                {
                  rank: "3. Length / Distance from Baseline",
                  accuracy: "Very Good (85%)",
                  badgeColor: "text-sky-400 bg-sky-500/10 border-sky-500/20",
                  desc: "Bar lengths starting strictly from zero. Easy to compare linear magnitude without misinterpretation.",
                  diagram: (
                    <div className="h-10 w-36 flex flex-col justify-center gap-1.5 border-l border-white/20 pl-1">
                      <div className="h-2 w-24 bg-sky-400 rounded-r-sm" />
                      <div className="h-2 w-14 bg-sky-600 rounded-r-sm" />
                    </div>
                  )
                },
                {
                  rank: "4. Slope / Angle",
                  accuracy: "Moderate (65%)",
                  badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
                  desc: "Line slopes, pie chart slice angles. Humans routinely overestimate steep slopes and underestimate shallow angles.",
                  diagram: (
                    <div className="h-10 w-36 flex items-center justify-center">
                      <svg className="size-8" viewBox="0 0 32 32">
                        <line x1="4" y1="28" x2="28" y2="4" stroke="#F59E0B" strokeWidth="2" />
                        <path d="M 4 28 A 12 12 0 0 1 16 16" fill="none" stroke="#F59E0B" strokeWidth="1" strokeDasharray="1 1" />
                      </svg>
                    </div>
                  )
                },
                {
                  rank: "5. Area (2D Magnitude)",
                  accuracy: "Poor (40%)",
                  badgeColor: "text-orange-400 bg-orange-500/10 border-orange-500/20",
                  desc: "Bubble sizes, proportional circles. Humans perceive area logarithmically; a circle with 2x area looks only ~1.4x larger.",
                  diagram: (
                    <div className="h-10 w-36 flex items-center justify-center gap-2">
                      <div className="size-4 rounded-full bg-orange-500/60" />
                      <div className="size-7 rounded-full bg-orange-500" />
                    </div>
                  )
                },
                {
                  rank: "6. Volume & 3D Perspective Depth",
                  accuracy: "Very Poor (20%)",
                  badgeColor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
                  desc: "3D perspective bars. Perspective skew makes accurate measurement virtually impossible without orbit controls.",
                  diagram: (
                    <div className="h-10 w-36 flex items-center justify-center">
                      <div className="w-8 h-6 border border-rose-400/60 transform rotate-12 skew-x-12" />
                    </div>
                  )
                },
                {
                  rank: "7. Color Saturation & Hue",
                  accuracy: "Categorical Only (10%)",
                  badgeColor: "text-neutral-400 bg-white/[0.04] border-white/[0.08]",
                  desc: "Shades of color for quantitative steps. Humans cannot accurately decode numerical values from color steps.",
                  diagram: (
                    <div className="h-10 w-36 flex items-center justify-center gap-1">
                      <span className="size-3 rounded-full bg-neutral-600" />
                      <span className="size-3 rounded-full bg-neutral-500" />
                      <span className="size-3 rounded-full bg-neutral-400" />
                      <span className="size-3 rounded-full bg-neutral-200" />
                    </div>
                  )
                }
              ].map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl apple-card apple-card-hover flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className="text-sm font-semibold text-white">{item.rank}</span>
                      <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                        {item.accuracy}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">{item.desc}</p>
                  </div>
                  <div className="shrink-0 flex items-center justify-end">
                    {item.diagram}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm text-neutral-400 italic">
              <strong>Rule of thumb:</strong> Whenever possible, encode your most critical metric into <strong>Position along a common scale</strong> (Rank 1). Never use Area or Color when Position or Length is available.
            </p>
          </section>

          {/* SECTION 3 */}
          <section id="shapes" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-wider mb-2">
              <Hash className="size-3" />
              <span>Chapter 03</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6">
              The 6 Fundamental Data Shapes
            </h2>
            <p className="text-base text-neutral-400 leading-relaxed mb-10 font-normal">
              Every business question and scientific hypothesis maps directly to one of six core data relationships:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {/* Shape 1 */}
              <div className="p-6 rounded-3xl apple-card apple-card-hover flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
                      <TrendingUp className="size-4" />
                      <span>A. Trend Over Time</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300">
                      darsh.line()
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
                    Tracks continuous velocity, decay, or seasonal cycles over time. Always place chronological time on the horizontal X-axis.
                  </p>
                </div>
                <div className="h-20 w-full bg-black/60 rounded-xl p-2 border border-white/[0.06] flex items-end">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 160 40">
                    <path d="M 10 35 Q 50 10, 90 25 T 150 5" fill="none" stroke="#6366F1" strokeWidth="2" />
                    <circle cx="90" cy="25" r="2.5" fill="#6366F1" />
                    <circle cx="150" cy="5" r="2.5" fill="#38BDF8" />
                  </svg>
                </div>
              </div>

              {/* Shape 2 */}
              <div className="p-6 rounded-3xl apple-card apple-card-hover flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                      <BarChart3 className="size-4" />
                      <span>B. Categorical Comparison</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300">
                      darsh.bar()
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
                    Compares distinct entities. Bars must start strictly at zero. Always sort by magnitude rather than arbitrary alphabetical order.
                  </p>
                </div>
                <div className="h-20 w-full bg-black/60 rounded-xl p-2 border border-white/[0.06] flex items-center justify-center gap-3">
                  <div className="w-8 h-12 bg-emerald-500/80 rounded-t-sm" />
                  <div className="w-8 h-8 bg-emerald-500/60 rounded-t-sm" />
                  <div className="w-8 h-5 bg-emerald-500/40 rounded-t-sm" />
                </div>
              </div>

              {/* Shape 3 */}
              <div className="p-6 rounded-3xl apple-card apple-card-hover flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
                      <PieChart className="size-4" />
                      <span>C. Part-to-Whole Proportions</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-300">
                      darsh.donut()
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
                    Shows proportion breakdown. Modern hollow center keeps visual weight calm. Limit to 3-5 major slices.
                  </p>
                </div>
                <div className="h-20 w-full bg-black/60 rounded-xl p-2 border border-white/[0.06] flex items-center justify-center">
                  <svg className="size-16" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#6366F1" strokeWidth="18" strokeDasharray="150 238" />
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#38BDF8" strokeWidth="18" strokeDasharray="88 238" strokeDashoffset="-150" />
                  </svg>
                </div>
              </div>

              {/* Shape 4 */}
              <div className="p-6 rounded-3xl apple-card apple-card-hover flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                      <Layers className="size-4" />
                      <span>D. Distribution & Variance</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300">
                      darsh.hist() &middot; box()
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
                    Uncovers skew, clusters, and tails. Never rely solely on the arithmetic mean; inspect the shape of variance directly.
                  </p>
                </div>
                <div className="h-20 w-full bg-black/60 rounded-xl p-2 border border-white/[0.06] flex items-end justify-center">
                  <svg className="w-full h-12" viewBox="0 0 140 40">
                    <path d="M 10 38 Q 40 38, 70 8 Q 100 38, 130 38" fill="none" stroke="#F59E0B" strokeWidth="2" />
                  </svg>
                </div>
              </div>

              {/* Shape 5 */}
              <div className="p-6 rounded-3xl apple-card apple-card-hover flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                      <Eye className="size-4" />
                      <span>E. Correlation & Relationship</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300">
                      darsh.scatter()
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
                    Plots two continuous metrics together with alpha transparency to reveal dense cluster alignments or regression trends.
                  </p>
                </div>
                <div className="h-20 w-full bg-black/60 rounded-xl p-2 border border-white/[0.06] flex items-center justify-center">
                  <div className="relative w-32 h-14 border-l border-b border-white/20">
                    <span className="size-1.5 rounded-full bg-rose-400 absolute bottom-1 left-2" />
                    <span className="size-1.5 rounded-full bg-rose-400 absolute bottom-3 left-8" />
                    <span className="size-1.5 rounded-full bg-rose-400 absolute bottom-7 left-14" />
                    <span className="size-1.5 rounded-full bg-rose-400 absolute bottom-10 left-24" />
                  </div>
                </div>
              </div>

              {/* Shape 6 */}
              <div className="p-6 rounded-3xl apple-card apple-card-hover flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
                      <Box className="size-4" />
                      <span>F. 3D Spatial Geometry</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300">
                      darsh.scatter_3d()
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
                    Coordinates interacting in 3 physical or analytical dimensions. Only justified when interactive camera orbit is available.
                  </p>
                </div>
                <div className="h-20 w-full bg-black/60 rounded-xl p-2 border border-white/[0.06] flex items-center justify-center">
                  <div className="w-16 h-10 border border-purple-400/40 rounded transform rotate-6 skew-x-6 flex items-center justify-center">
                    <span className="size-2 rounded-full bg-purple-400 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4 */}
          <section id="anatomy" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-wider mb-2">
              <Hash className="size-3" />
              <span>Chapter 04</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6">
              Anatomy of a Graph: Zero-Debt Graphic Architecture
            </h2>

            {/* SMALL VISUAL COMPARISON: TRUNCATED VS ZERO BASELINE */}
            <div className="p-6 sm:p-8 rounded-3xl apple-card mb-8">
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-5">
                The Non-Negotiable Zero Baseline Rule
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="p-5 rounded-2xl bg-red-500/[0.04] border border-red-500/20">
                  <div className="flex items-center justify-between text-xs text-rose-400 font-medium mb-3">
                    <span>✕ Truncated Y-Axis (Starts at 80)</span>
                    <span className="font-mono text-[10px]">Optical Illusion</span>
                  </div>
                  <div className="h-24 flex items-end justify-center gap-6 border-b border-rose-500/30 pb-1">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[10px] font-mono text-neutral-400">85</span>
                      <div className="w-10 h-6 bg-rose-500/60 rounded-t-sm" />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[10px] font-mono text-neutral-400">90</span>
                      <div className="w-10 h-16 bg-rose-500 rounded-t-sm" />
                    </div>
                  </div>
                  <div className="text-[11px] text-rose-300 mt-3">
                    Bar B appears <strong>2.5x larger</strong> than Bar A, falsely exaggerating a tiny 5.8% variance into a massive optical distortion!
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/20">
                  <div className="flex items-center justify-between text-xs text-emerald-400 font-medium mb-3">
                    <span>✓ Honest Baseline (Starts at 0)</span>
                    <span className="font-mono text-[10px]">Empirical Truth</span>
                  </div>
                  <div className="h-24 flex items-end justify-center gap-6 border-b border-emerald-500/30 pb-1">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[10px] font-mono text-neutral-400">85</span>
                      <div className="w-10 h-20 bg-emerald-500/80 rounded-t-sm" />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[10px] font-mono text-neutral-400">90</span>
                      <div className="w-10 h-22 bg-emerald-500 rounded-t-sm" />
                    </div>
                  </div>
                  <div className="text-[11px] text-emerald-300 mt-3">
                    Correctly shows that both categories are high performers with a healthy 5.8% incremental lift.
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl apple-card space-y-4">
              <h4 className="text-base font-semibold text-white">Eliminating Cognitive Ping-Pong</h4>
              <p className="text-sm text-neutral-400 leading-relaxed font-normal">
                Standard legacy charting libraries place a floating legend box in the top corner. The viewer's eyes must dart from the line to the legend, match the color, jump back to the line, and repeat for every series. This is cognitive ping-pong.
              </p>
              <div className="p-3 rounded-xl bg-black border border-white/[0.08] text-xs font-mono text-indigo-300">
                Darsh rule: Place line labels directly at the end of each trajectory. Zero legend lookups required.
              </div>
            </div>
          </section>

          {/* SECTION 5 */}
          <section id="color" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-wider mb-2">
              <Hash className="size-3" />
              <span>Chapter 05</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6">
              Color Discipline: The 90/10 Accent Rule
            </h2>
            <p className="text-base text-neutral-400 leading-relaxed mb-8 font-normal">
              Junior dashboards resemble carnivals with 8 saturated primary colors competing for attention. Elite data design is 90% calm neutrals and 10% intentional accent:
            </p>

            {/* VISUAL DEMO: 90/10 RULE IN ACTION */}
            <div className="p-6 sm:p-8 rounded-3xl apple-card mb-8">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-6">
                <span>The 90/10 Focal Attention Principle</span>
                <span className="text-indigo-400 font-mono">1 Accent vs 4 Neutrals</span>
              </div>

              <div className="h-32 flex items-end justify-center gap-5 border-b border-white/10 pb-2">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-12 h-14 bg-neutral-800 rounded-t-sm" />
                  <span className="text-[10px] font-mono text-neutral-500">Cohort A</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-12 h-18 bg-neutral-800 rounded-t-sm" />
                  <span className="text-[10px] font-mono text-neutral-500">Cohort B</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-12 h-20 bg-neutral-800 rounded-t-sm" />
                  <span className="text-[10px] font-mono text-neutral-500">Cohort C</span>
                </div>
                <div className="flex flex-col items-center gap-1 relative">
                  <span className="text-[10px] font-bold text-indigo-400 absolute -top-5">+48% ARR</span>
                  <div className="w-12 h-28 bg-indigo-500 rounded-t-sm shadow-[0_0_20px_rgba(99,102,241,0.5)]" />
                  <span className="text-[10px] font-mono text-white font-bold">Q4 Push</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-12 h-16 bg-neutral-800 rounded-t-sm" />
                  <span className="text-[10px] font-mono text-neutral-500">Cohort E</span>
                </div>
              </div>
              <div className="text-xs text-neutral-400 text-center pt-4">
                The audience's eyes are magnetically drawn to the Q4 push within 50ms without reading a single axis label.
              </div>
            </div>
          </section>

          {/* SECTION 6 */}
          <section id="storytelling" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-wider mb-2">
              <Hash className="size-3" />
              <span>Chapter 06</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6">
              From Exploration to Executive Storytelling
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-6 rounded-2xl bg-red-500/[0.04] border border-red-500/20">
                <div className="text-xs font-mono text-red-400 uppercase font-semibold mb-2">✕ Passive / Descriptive</div>
                <div className="text-base font-semibold text-white mb-2">"Monthly Revenue 2024–2025"</div>
                <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                  Forces the executive to hunt through the chart and guess what insight you are trying to communicate.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/20">
                <div className="text-xs font-mono text-emerald-400 uppercase font-semibold mb-2">✓ Active / Declarative</div>
                <div className="text-base font-semibold text-white mb-2">"Enterprise Expansion Drove 42% ARR Surge in Q3"</div>
                <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                  Declares the core finding upfront in the title; the chart provides the empirical evidence.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 7 */}
          <section id="checklist" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-wider mb-2">
              <Hash className="size-3" />
              <span>Chapter 07</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              The Universal Visualization Checklist
            </h2>
            <p className="text-sm text-neutral-400 mb-8">
              Click to check off items interactively as you audit your graphics:
            </p>

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
              ].map((rule, idx) => {
                const isChecked = !!checkedItems[`viz-${idx}`];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleCheck(`viz-${idx}`)}
                    className={`flex items-start gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${
                      isChecked
                        ? "bg-emerald-500/10 border-emerald-500/30 text-white"
                        : "apple-card apple-card-hover text-neutral-300"
                    }`}
                  >
                    {isChecked ? (
                      <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="size-4 text-neutral-500 shrink-0 mt-0.5" />
                    )}
                    <span className="text-xs sm:text-sm font-normal">{rule}</span>
                  </div>
                );
              })}
            </div>

            {/* Jump to Next Guide Card */}
            <div className="p-8 sm:p-10 rounded-3xl apple-card text-center relative overflow-hidden">
              <h3 className="text-2xl font-bold text-white mb-3">Pristine charts require pristine data</h3>
              <p className="text-sm text-neutral-400 max-w-lg mx-auto mb-8 font-normal leading-relaxed">
                Now that you know how to encode visual geometry, explore the companion guide: <strong>The Data Hygiene Blueprint</strong>.
              </p>
              <button
                onClick={() => {
                  setActiveTab("cleaning");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="h-11 px-8 rounded-full bg-white hover:bg-neutral-100 text-black text-xs font-semibold transition-all inline-flex items-center gap-2 apple-pill-btn shadow-lg"
              >
                <span>Proceed to Data Hygiene Blueprint</span>
                <ShieldCheck className="size-4 text-indigo-600" />
              </button>
            </div>
          </section>
        </article>
      )}

      {/* ======================================================================= */}
      {/* TAB 2: DATA CLEANING HANDBOOK & HYGIENE BLUEPRINT */}
      {/* ======================================================================= */}
      {activeTab === "cleaning" && (
        <article className="max-w-4xl mx-auto px-6 pt-16 pb-36">
          {/* Editorial Title Block */}
          <header className="mb-20 border-b border-white/[0.08] pb-14">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 font-mono font-medium">
                <ShieldCheck className="size-3 text-emerald-400" />
                ISSUE #02 &middot; SANITIZATION &amp; HYGIENE
              </span>
              <span className="text-xs text-neutral-500 font-mono">12 MIN READ</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.04em] text-white leading-[1.04] mb-8">
              The Data Hygiene Blueprint: <br />
              <span className="apple-gradient-hero">
                How to Sanitize &amp; Audit Messy Data
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-neutral-400 leading-relaxed font-normal mb-10 max-w-3xl">
              80% of flawed, misleading, or crashing charts are not design failures—they are data hygiene failures.
              Learn how to sanitize, profile, and structure raw tables into bulletproof visualization datasets.
            </p>

            {/* Author Byline & Meta */}
            <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-white/[0.06] text-xs text-neutral-400 font-mono">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-gradient-to-tr from-emerald-500 to-sky-400 p-[1px]">
                  <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-white font-bold text-xs">
                    SR
                  </div>
                </div>
                <div>
                  <div className="text-white font-medium">Satyam Rana</div>
                  <div className="text-neutral-500 text-[11px]">Data Hygiene &middot; Pandas Accessors</div>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06]">
                df.darsh.* &middot; Deterministic Cleaning
              </span>
            </div>
          </header>

          {/* Table of Contents */}
          <nav aria-label="Table of contents" className="p-6 sm:p-8 rounded-3xl apple-card mb-20">
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-5 flex items-center gap-2">
              <Bookmark className="size-3.5 text-emerald-400" />
              <span>Hygiene Blueprint Chapters</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {cleanSections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className="text-left py-1 text-neutral-400 hover:text-white transition-colors truncate flex items-center gap-2 group"
                >
                  <span className="size-1 rounded-full bg-neutral-600 group-hover:bg-emerald-400 transition-colors" />
                  <span>{s.title}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* SECTION 1 */}
          <section id="gigo" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
              <Hash className="size-3" />
              <span>Chapter 01</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6">
              The Axiom: Garbage In, Garbage Out
            </h2>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed mb-6 font-normal">
              No amount of aesthetic design, calm palettes, or 3D camera orbits can save a chart built on polluted data.
            </p>
            <p className="text-base text-neutral-400 leading-relaxed mb-6 font-normal">
              When an executive or analyst notices an anomaly in a chart—such as a single date with zero revenue, a spike to $999,999, or duplicate customer entries—they stop evaluating the insight. <strong>Their brain immediately shifts to auditing the credibility of the entire report.</strong> Once data trust is broken, the presentation is over.
            </p>
            <p className="text-base text-neutral-400 leading-relaxed mb-10 font-normal">
              Data cleaning is not an unglamorous prelude to visualization; it is the foundation of analytical truth. A professional visualization pipeline guarantees that data entering the charting engine is deterministic, auditable, and defensively typed.
            </p>

            <div className="p-6 rounded-2xl bg-white/[0.02] border-l-2 border-emerald-400 border-white/[0.06]">
              <div className="text-sm font-semibold text-white mb-1.5 flex items-center gap-2">
                <Lightbulb className="size-4 text-emerald-400" />
                <span>The Golden Rule of Data Hygiene</span>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed font-normal">
                Never perform destructive, irreversible in-place edits without an audit trace. Data cleaning should always produce a pure, repeatable functional transformation from raw input to clean output.
              </p>
            </div>
          </section>

          {/* SECTION 2 */}
          <section id="five-sins" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
              <Hash className="size-3" />
              <span>Chapter 02</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6">
              The 5 Deadly Sins of Raw Data
            </h2>

            {/* VISUAL SINS CARDS WITH BEFORE / AFTER BADGES */}
            <div className="space-y-5 mb-10">
              {[
                {
                  sin: "Sin 1: Chaotic Column Names",
                  icon: <AlertOctagon className="size-4 text-rose-400" />,
                  desc: "Headers with trailing spaces, mixed cases, parentheses, and currency signs.",
                  before: '"Customer Name "',
                  after: "customer_name",
                  fix: "df.darsh.clean_names() converts everything to pristine snake_case."
                },
                {
                  sin: "Sin 2: Zombie Duplicate Records",
                  icon: <RefreshCw className="size-4 text-amber-400" />,
                  desc: "API retry glitches or sloppy SQL joins that silently double revenue sums and totals.",
                  before: "Row 142 & Row 143 identical",
                  after: "Purged & audited",
                  fix: "df.darsh.drop_duplicates() eliminates redundant rows before aggregations."
                },
                {
                  sin: "Sin 3: Silent Missingness (NaN / Null)",
                  icon: <Filter className="size-4 text-sky-400" />,
                  desc: "Blank strings, literal 'null' strings, and IEEE NaNs that break axis scaling.",
                  before: 'Revenue = NaN / "null"',
                  after: "Smart Median Imputed",
                  fix: "df.darsh.fill_missing(strategy='smart') uses medians for numbers, modes for categories."
                },
                {
                  sin: "Sin 4: Dirty Type Traps",
                  icon: <Sliders className="size-4 text-indigo-400" />,
                  desc: "Numbers stored as text because of dollar signs or commas ('$1,250').",
                  before: '"$1,250.00" (string)',
                  after: "1250.00 (float64)",
                  fix: "df.darsh.infer_types() coerces numerical strings and timestamps automatically."
                },
                {
                  sin: "Sin 5: Destructive Sentinel Outliers",
                  icon: <TrendingUp className="size-4 text-emerald-400" />,
                  desc: "Test records ('test@internal.com') or 999 values that crush Y-axes into pancakes.",
                  before: "Age = 999 (sentinel)",
                  after: "Filtered & logged",
                  fix: "df.darsh.profile() flags distribution extremes before chart rendering."
                }
              ].map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl apple-card apple-card-hover space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5 font-semibold text-white text-base">
                      {item.icon}
                      <span>{item.sin}</span>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed font-normal">{item.desc}</p>
                  <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
                    <span className="px-2.5 py-1 rounded bg-red-500/10 text-red-300 border border-red-500/20">
                      Raw: {item.before}
                    </span>
                    <ArrowRight className="size-3 text-neutral-600" />
                    <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                      Clean: {item.after}
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-500 font-mono pt-1">
                    {item.fix}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3 */}
          <section id="missing-data" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
              <Hash className="size-3" />
              <span>Chapter 03</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6">
              The Missing Value Matrix: MCAR, MAR, MNAR
            </h2>
            <p className="text-base text-neutral-400 leading-relaxed mb-8 font-normal">
              Statistical theory defines three distinct mechanisms of missingness. Knowing which applies determines whether you should drop or impute:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="p-6 rounded-2xl apple-card border-t-2 border-emerald-400 space-y-3">
                <span className="text-xs font-mono text-emerald-400 font-bold">MCAR</span>
                <h4 className="text-sm font-semibold text-white">Completely at Random</h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                  Zero correlation with observed or unobserved data. Safe to drop or impute with simple median.
                </p>
                <div className="text-[10px] text-emerald-300 font-mono">Risk: Zero statistical bias</div>
              </div>

              <div className="p-6 rounded-2xl apple-card border-t-2 border-sky-400 space-y-3">
                <span className="text-xs font-mono text-sky-400 font-bold">MAR</span>
                <h4 className="text-sm font-semibold text-white">Missing at Random</h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                  Missingness depends on observed data (e.g. younger users skip income question). Impute using cohort context.
                </p>
                <div className="text-[10px] text-sky-300 font-mono">Risk: Requires cohort grouping</div>
              </div>

              <div className="p-6 rounded-2xl apple-card border-t-2 border-rose-400 space-y-3">
                <span className="text-xs font-mono text-rose-400 font-bold">MNAR</span>
                <h4 className="text-sm font-semibold text-white">Not at Random</h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                  The missing value itself causes the absence (e.g. extreme debt). Missingness is the signal; treat as "Unknown".
                </p>
                <div className="text-[10px] text-rose-300 font-mono">Risk: Do NOT impute overall median</div>
              </div>
            </div>
          </section>

          {/* SECTION 4 */}
          <section id="pipeline" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
              <Hash className="size-3" />
              <span>Chapter 04</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6">
              The 5-Stage Data Hygiene Pipeline
            </h2>

            {/* PIPELINE WORKFLOW DIAGRAM */}
            <div className="p-6 sm:p-8 rounded-3xl apple-card space-y-6 mb-10">
              {[
                { stage: "Stage 01: Ingestion & Schema Audit", desc: "Snapshot row counts, memory footprint, and null ratios.", status: "audit" },
                { stage: "Stage 02: Structural Sanitization", desc: "Transform column headers to snake_case and purge zombie duplicates.", status: "clean" },
                { stage: "Stage 03: Type Enforcement", desc: "Cast currency strings to float64, parse ISO timestamps.", status: "type" },
                { stage: "Stage 04: Deterministic Imputation", desc: "Fill numeric gaps using robust medians; avoid mean distortion.", status: "impute" },
                { stage: "Stage 05: Quality Score Rating", desc: "Verify hygiene rating exceeds 95 / 100 before graphic generation.", status: "score" }
              ].map((step, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="size-7 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white mb-1">{step.stage}</div>
                    <p className="text-xs text-neutral-400 font-normal">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 5 */}
          <section id="quality-score" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
              <Hash className="size-3" />
              <span>Chapter 05</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6">
              The Objective Data Quality Score (0–100)
            </h2>

            {/* CIRCULAR GAUGE VISUAL */}
            <div className="p-8 rounded-3xl apple-card flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                  Automated Mathematical Rating
                </span>
                <h3 className="text-2xl font-bold text-white">Darsh Data Health Metric</h3>
                <p className="text-xs text-neutral-400 leading-relaxed max-w-md font-normal">
                  Penalizes null ratios, zombie duplicates, and type collisions. Safe for executive presentation only if score &gt; 95.
                </p>
                <div className="p-3 rounded-xl bg-black border border-white/[0.08] font-mono text-xs text-indigo-300">
                  score = df.darsh.quality_score()  # e.g., 98.4 / 100
                </div>
              </div>

              <div className="size-36 rounded-full border-4 border-emerald-400/30 flex flex-col items-center justify-center bg-emerald-500/5 shadow-[0_0_30px_rgba(16,185,129,0.15)] shrink-0">
                <span className="text-3xl font-bold text-emerald-400 font-mono">98.4</span>
                <span className="text-[10px] text-neutral-400 font-mono uppercase">Production Grade</span>
              </div>
            </div>
          </section>

          {/* SECTION 6 */}
          <section id="cleaning-checklist" className="mb-28 scroll-mt-24">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
              <Hash className="size-3" />
              <span>Chapter 06</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Pre-Visualization Sanitization Checklist
            </h2>
            <p className="text-sm text-neutral-400 mb-8 font-normal">
              Click to verify each checkpoint before sending data to matplotlib or plotly:
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
              ].map((rule, idx) => {
                const isChecked = !!checkedItems[`clean-${idx}`];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleCheck(`clean-${idx}`)}
                    className={`flex items-start gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${
                      isChecked
                        ? "bg-emerald-500/10 border-emerald-500/30 text-white"
                        : "apple-card apple-card-hover text-neutral-300"
                    }`}
                  >
                    {isChecked ? (
                      <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="size-4 text-neutral-500 shrink-0 mt-0.5" />
                    )}
                    <span className="text-xs sm:text-sm font-normal">{rule}</span>
                  </div>
                );
              })}
            </div>

            <div className="p-8 sm:p-10 rounded-3xl apple-card text-center">
              <h3 className="text-2xl font-bold text-white mb-3">Data is clean. Ready to pick a chart?</h3>
              <p className="text-sm text-neutral-400 max-w-lg mx-auto mb-8 font-normal leading-relaxed">
                Use the interactive <strong>Chart Chooser Matrix</strong> to instantly map your data question to the ideal Darsh function.
              </p>
              <button
                onClick={() => {
                  setActiveTab("chooser");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="h-11 px-8 rounded-full bg-white hover:bg-neutral-100 text-black text-xs font-semibold transition-all inline-flex items-center gap-2 apple-pill-btn shadow-lg"
              >
                <span>Open Chart Chooser Matrix</span>
                <Compass className="size-4 text-emerald-600" />
              </button>
            </div>
          </section>
        </article>
      )}

      {/* ======================================================================= */}
      {/* TAB 3: CHART CHOOSER MATRIX (INTERACTIVE RAPID DECISION TOOL) */}
      {/* ======================================================================= */}
      {activeTab === "chooser" && (
        <article className="max-w-5xl mx-auto px-6 pt-16 pb-36">
          <header className="mb-16 border-b border-white/[0.08] pb-12 text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs text-sky-300 font-mono font-medium mb-4">
              <Compass className="size-3 text-sky-400" />
              INTERACTIVE DECISION ENGINE
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-[-0.04em] text-white leading-tight mb-4">
              Chart Chooser Matrix
            </h1>
            <p className="text-base sm:text-lg text-neutral-400 font-normal leading-relaxed">
              Select your analytical question or data shape below. Darsh gives you the exact function signature, best practices, and copyable Python 1-liner.
            </p>
          </header>

          {/* Interactive Shape Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-12">
            {Object.keys(chooserShapes).map((key) => {
              const item = chooserShapes[key];
              const isSelected = selectedChooserShape === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedChooserShape(key)}
                  className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                    isSelected
                      ? "bg-white text-black font-semibold shadow-xl scale-105 border-white"
                      : "apple-card apple-card-hover text-neutral-400 hover:text-white"
                  }`}
                >
                  <span className="text-xs capitalize">{item.title}</span>
                </button>
              );
            })}
          </div>

          {/* Detailed Decision Card */}
          {(() => {
            const current = chooserShapes[selectedChooserShape];
            return (
              <div className="p-8 sm:p-12 rounded-3xl apple-card border border-white/[0.1] shadow-2xl relative overflow-hidden">
                <div className="max-w-3xl mx-auto space-y-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
                    <div>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
                        Selected Blueprint
                      </span>
                      <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mt-1">
                        {current.title}
                      </h2>
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.04] text-neutral-300 border border-white/[0.08] self-start sm:self-auto">
                      {current.func.split("(")[0]}
                    </span>
                  </div>

                  <p className="text-base text-neutral-300 leading-relaxed font-normal">
                    {current.desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/20">
                      <div className="text-xs font-semibold text-emerald-400 mb-1.5 flex items-center gap-1.5">
                        <CheckCircle2 className="size-3.5" />
                        <span>Best Applied For</span>
                      </div>
                      <p className="text-xs text-neutral-300 font-normal leading-relaxed">{current.bestFor}</p>
                    </div>

                    <div className="p-5 rounded-2xl bg-rose-500/[0.04] border border-rose-500/20">
                      <div className="text-xs font-semibold text-rose-400 mb-1.5 flex items-center gap-1.5">
                        <AlertOctagon className="size-3.5" />
                        <span>Common Anti-Patterns to Avoid</span>
                      </div>
                      <p className="text-xs text-neutral-300 font-normal leading-relaxed">{current.avoid}</p>
                    </div>
                  </div>

                  {/* Copyable 1-Liner */}
                  <div className="rounded-2xl bg-black border border-white/[0.08] overflow-hidden">
                    <div className="px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-500">
                      <span>Executable 1-Liner</span>
                      <button
                        onClick={() => copySnippet(current.exampleSnippet, `chooser-${selectedChooserShape}`)}
                        className="hover:text-white flex items-center gap-1 text-xs transition-colors font-sans"
                      >
                        {copiedKey === `chooser-${selectedChooserShape}` ? (
                          <>
                            <Check className="size-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="p-5 font-mono text-xs sm:text-sm text-neutral-200 leading-relaxed overflow-x-auto">
                      <pre>
                        <code>{current.exampleSnippet}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </article>
      )}
      </main>
    </div>
  );
}
