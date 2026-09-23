import React, { useState, useEffect } from "react";
import VisualizationGuide from "./VisualizationGuide";
import {
  BookOpen,
  Terminal,
  Copy,
  Check,
  Search,
  ChevronRight,
  CheckCircle2,
  Sparkles
} from "lucide-react";

function GithubIcon({ className = "size-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function PyPIIcon({ className = "size-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L1.75 5.92v12.16L12 24l10.25-5.92V5.92L12 0zm-.92 2.33l7.98 4.61-3.32 1.92-7.98-4.61 3.32-1.92zM3.75 7.07l7.33 4.23v8.08l-7.33-4.23V7.07zm9.17 12.31v-8.08l3.32-1.92v4.06l-1.66.96v1.92l3.32-1.92V7.07l2.35 1.36v8.08l-7.33 4.23z" />
    </svg>
  );
}

export default function App() {
  const [view, setView] = useState(() => (window.location.hash === "#guide" ? "guide" : "home"));
  const [copiedKey, setCopiedKey] = useState(null);
  const [activeTab, setActiveTab] = useState("oneliners");
  const [docCategory, setDocCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleHash = () => {
      setView(window.location.hash === "#guide" ? "guide" : "home");
    };
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const navigateTo = (target) => {
    setView(target);
    window.location.hash = target === "guide" ? "#guide" : "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  if (view === "guide") {
    return <VisualizationGuide onBack={() => navigateTo("home")} />;
  }

  const tabs = {
    oneliners: {
      label: "1-Liners",
      tag: "Pure Simplicity",
      title: "Pass raw lists and dicts. Done.",
      desc: "Zero DataFrame boilerplate. Pass pure Python primitives directly, and Darsh normalizes the geometry into a publication-grade figure.",
      code: `import darsh

# 1-liner line chart from a plain Python list
ax = darsh.line([12, 28, 19, 45, 62, 58], title="Weekly Active Users")

# Returns real matplotlib.axes.Axes!`,
      preview: "line"
    },
    senior: {
      label: "Senior Customization",
      tag: "100% Native",
      title: "Never trapped behind a proprietary API.",
      desc: "Every call returns real matplotlib Axes. Chain log scales, benchmark reference lines, and annotations with zero friction.",
      code: `# Standard matplotlib knowledge works 100%
ax = darsh.line([100, 280, 750, 2400, 8500], title="ARR Trajectory", color="#6366F1")

ax.set_yscale("log")
ax.axhline(5000, color="#EF4444", linestyle=":", label="Q4 Benchmark")
ax.annotate("Inflection Point", xy=(2, 750), xytext=(1.2, 2500),
            arrowprops=dict(facecolor="#38BDF8", shrink=0.08))
ax.legend()`,
      preview: "senior"
    },
    interactive: {
      label: "Interactive 2D & 3D",
      tag: "Plotly Powered",
      title: "Effortless interactive inspections.",
      desc: "Pass interactive=True or call 3D functions. Includes self-healing notebook renderers with zero nbformat setup headaches.",
      code: `# Interactive 2D inspection & 3D coordinate space
fig_2d = darsh.line(df, x="date", y="revenue", interactive=True)
fig_3d = darsh.scatter_3d(df, x="revenue", y="profit", z="units_sold")

fig_2d.show()  # Renders inline in notebooks or web browser`,
      preview: "3d"
    },
    grids: {
      label: "Cards & Grids",
      tag: "Fluid Auto-Balance",
      title: "Executive briefing layouts that breathe.",
      desc: "Responsive auto-balanced grids. SVGs scale fluidly via viewBox with zero text clipping or horizontal leaks.",
      code: `# Compose metric cards & responsive multi-chart grids
card_rev = darsh.card("Gross Revenue", "$4.2M", delta="+14.2%")
card_profit = darsh.card("Gross Profit", "$1.8M", delta="+8.6%")
card_csat = darsh.card("CSAT", "4.85/5.0")

c1 = darsh.line(df, x="date", y="revenue", title="Revenue Trend")
c2 = darsh.bar(df, x="channel", y="revenue", title="Channel Revenue")

# Auto-balances 3 cards on row 1, and 2 charts on row 2 (50%/50%)
grid = darsh.grid([card_rev, card_profit, card_csat, c1, c2], cols=3)`,
      preview: "grid"
    },
    cleaning: {
      label: "Data Accessor",
      tag: "Auditable",
      title: "Clean and profile directly on DataFrames.",
      desc: "Deterministic cleaning and quality scoring on pandas via df.darsh.* with zero black-box magic.",
      code: `# Transparent cleaning directly on pandas
clean_df = (
    raw_df
    .darsh.clean_names()
    .darsh.drop_duplicates()
    .darsh.fill_missing(strategy="smart")
    .darsh.infer_types()
)

score = clean_df.darsh.quality_score()  # e.g., 98.4 / 100`,
      preview: "cleaning"
    },
    dashboard: {
      label: "Reactive Dashboard",
      tag: "FastAPI Engine",
      title: "Deploy a live web app in one call.",
      desc: "Spin up a full-featured local dashboard server with instant cross-filters and dynamic SVG stream updates.",
      code: `# 1-line reactive web application
app = darsh.dashboard(
    data=df,
    charts=[c1, c2],
    kpis=[darsh.kpi("Revenue", "revenue", agg="sum", prefix="$")],
    title="Executive Performance"
)
app.run(port=8080)  # High-speed FastAPI + SVG engine`,
      preview: "dashboard"
    }
  };

  const apiDocs = [
    {
      category: "2d",
      name: "darsh.line",
      signature: "darsh.line(data=None, x=None, y=None, title=None, ax=None, color=None, theme='calm', interactive=False)",
      desc: "Publication-grade line trajectory. Accepts plain lists, dicts, arrays, or DataFrames.",
      returns: "matplotlib.axes.Axes (or plotly Figure if interactive=True)",
      example: "darsh.line([12, 28, 19, 45, 62], title='Monthly Trend')"
    },
    {
      category: "2d",
      name: "darsh.bar",
      signature: "darsh.bar(data=None, x=None, y=None, horizontal=False, title=None, ax=None, theme='calm', interactive=False)",
      desc: "Categorical vertical or horizontal bars with calm Nordic palettes and clean labels.",
      returns: "matplotlib.axes.Axes (or plotly Figure if interactive=True)",
      example: "darsh.bar({'Eng': 94, 'Design': 91, 'Product': 88})"
    },
    {
      category: "2d",
      name: "darsh.area",
      signature: "darsh.area(data=None, x=None, y=None, alpha=0.35, title=None, ax=None, theme='calm', interactive=False)",
      desc: "Smooth area trajectory with subtle alpha gradient fills and clean boundary strokes.",
      returns: "matplotlib.axes.Axes",
      example: "darsh.area(df, x='month', y='active_users')"
    },
    {
      category: "2d",
      name: "darsh.scatter",
      signature: "darsh.scatter(data=None, x=None, y=None, size=None, alpha=0.75, title=None, ax=None, theme='calm')",
      desc: "Scatter plots with dynamic sizing, alpha blending, and regression fit options.",
      returns: "matplotlib.axes.Axes",
      example: "darsh.scatter(df, x='ad_spend', y='conversions')"
    },
    {
      category: "2d",
      name: "darsh.donut / darsh.pie",
      signature: "darsh.donut(data=None, values=None, names=None, hole=0.55, title=None, ax=None, theme='calm')",
      desc: "Minimalist donut or pie charts with proportion callouts and subtle slice spacing.",
      returns: "matplotlib.axes.Axes",
      example: "darsh.donut({'SaaS': 60, 'Enterprise': 25, 'Services': 15})"
    },
    {
      category: "2d",
      name: "darsh.hist",
      signature: "darsh.hist(data=None, column=None, bins=20, kde=True, title=None, ax=None, theme='calm')",
      desc: "Distribution histograms with optional kernel density estimation (KDE) curve overlay.",
      returns: "matplotlib.axes.Axes",
      example: "darsh.hist(df, column='session_duration', bins=25, kde=True)"
    },
    {
      category: "2d",
      name: "darsh.box",
      signature: "darsh.box(data=None, x=None, y=None, title=None, ax=None, theme='calm')",
      desc: "Box & whisker distribution plots with clean median lines and outlier dots.",
      returns: "matplotlib.axes.Axes",
      example: "darsh.box(df, x='tier', y='latency_ms')"
    },
    {
      category: "2d",
      name: "darsh.heatmap",
      signature: "darsh.heatmap(data=None, annot=True, cmap=None, title=None, ax=None, theme='calm')",
      desc: "Correlation or matrix heatmaps with numerical annotations and calm colormaps.",
      returns: "matplotlib.axes.Axes",
      example: "darsh.heatmap(df.corr(), title='Correlation Matrix')"
    },
    {
      category: "3d",
      name: "darsh.scatter_3d",
      signature: "darsh.scatter_3d(data=None, x=None, y=None, z=None, color=None, size=None, title=None)",
      desc: "Interactive 3D scatter chart with full 3-axis camera orbit controls.",
      returns: "plotly.graph_objects.Figure",
      example: "darsh.scatter_3d(df, x='revenue', y='profit', z='units_sold')"
    },
    {
      category: "3d",
      name: "darsh.line_3d",
      signature: "darsh.line_3d(data=None, x=None, y=None, z=None, color=None, title=None)",
      desc: "Interactive 3D trajectory path across continuous time series.",
      returns: "plotly.graph_objects.Figure",
      example: "darsh.line_3d(x=x_coords, y=y_coords, z=z_coords)"
    },
    {
      category: "3d",
      name: "darsh.surface_3d",
      signature: "darsh.surface_3d(z_matrix, title=None, colorscale='Viridis')",
      desc: "Interactive 3D surface mesh topology from 2D arrays or height matrices.",
      returns: "plotly.graph_objects.Figure",
      example: "darsh.surface_3d(elevation_matrix, title='Topography')"
    },
    {
      category: "layout",
      name: "darsh.card",
      signature: "darsh.card(title, value, delta=None, subtitle=None, chart=None, good_direction='up', theme='calm')",
      desc: "Executive KPI metric card with trend badges, subtitles, and sparklines.",
      returns: "darsh.layout.Card (rich HTML in Jupyter)",
      example: "darsh.card('Total ARR', '$12.4M', delta='+18.2%')"
    },
    {
      category: "layout",
      name: "darsh.grid",
      signature: "darsh.grid(items, cols=2, title=None, theme='calm', close_figs=True, auto_rows=True)",
      desc: "Fluid multi-chart grid with responsive SVGs and automatic row balancing.",
      returns: "darsh.layout.Grid (rich HTML in Jupyter)",
      example: "darsh.grid([[card1, card2, card3], [chart1, chart2]])"
    },
    {
      category: "accessor",
      name: "df.darsh.clean_names()",
      signature: "df.darsh.clean_names()",
      desc: "Converts column names to snake_case, trims whitespace, and strips special characters.",
      returns: "pandas.DataFrame",
      example: "df = raw_df.darsh.clean_names()"
    },
    {
      category: "accessor",
      name: "df.darsh.fill_missing()",
      signature: "df.darsh.fill_missing(strategy='smart', fill_value=None)",
      desc: "Auditable imputation filling numeric columns with medians and categories with modes.",
      returns: "pandas.DataFrame",
      example: "df = df.darsh.fill_missing(strategy='smart')"
    },
    {
      category: "accessor",
      name: "df.darsh.quality_score()",
      signature: "df.darsh.quality_score()",
      desc: "Calculates an objective 0-100 data hygiene rating based on null ratios and type integrity.",
      returns: "float",
      example: "score = df.darsh.quality_score()"
    },
    {
      category: "accessor",
      name: "df.darsh.profile()",
      signature: "df.darsh.profile()",
      desc: "Computes a transparent audit dictionary detailing column types, null counts, and anomalies.",
      returns: "dict",
      example: "audit_report = df.darsh.profile()"
    },
    {
      category: "dashboard",
      name: "darsh.dashboard",
      signature: "darsh.dashboard(data, charts, kpis=None, title='Darsh Dashboard', theme='calm')",
      desc: "Initializes a high-speed reactive FastAPI dashboard with real-time cross-filters.",
      returns: "darsh.dashboard.DashboardHandle",
      example: "app = darsh.dashboard(df, charts=[c1, c2], kpis=[k1, k2]); app.run(port=8080)"
    }
  ];

  const filteredDocs = apiDocs.filter(doc => {
    const matchesCat = docCategory === "all" || doc.category === docCategory;
    const matchesQuery = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="min-h-screen w-full bg-black text-white antialiased selection:bg-indigo-500/25 selection:text-white relative overflow-x-hidden">
      {/* ========================================================================= */}
      {/* ACETERNITY-INSPIRED BACKGROUND BEAM & MESH MATRIX */}
      {/* ========================================================================= */}
      {/* 1. Subtle Infinite Grid Pattern with Elliptical Radial Mask */}
      <div className="absolute inset-0 -z-20 h-full w-full bg-[linear-gradient(to_right,#ffffff07_1px,transparent_1px),linear-gradient(to_bottom,#ffffff07_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* 2. Radiant Aceternity Spotlight Cone (Top Center) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[750px] bg-[radial-gradient(ellipse_closest-side,rgba(99,102,241,0.18),rgba(56,189,248,0.06),transparent_80%)] blur-[100px] pointer-events-none -z-10" />

      {/* 3. Horizontal Horizon Line Light Leak */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent pointer-events-none -z-10" />

      {/* ========================================================================= */}
      {/* FULL-WIDTH EDGE-TO-EDGE HEADER */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-black/70 border-b border-white/[0.08]">
        <div className="w-full max-w-[1500px] mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2 group">
              <span className="font-semibold text-lg tracking-tight text-white group-hover:text-neutral-300 transition-colors">
                Darsh
              </span>
            </a>
            <span className="text-[11px] font-medium tracking-wide px-2.5 py-0.5 rounded-full bg-white/[0.06] text-neutral-400 border border-white/[0.08]">
              v2.0.1
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-9 text-[13.5px] font-medium text-neutral-400">
            <a href="#playground" className="hover:text-white transition-colors">Playground</a>
            <a href="#philosophy" className="hover:text-white transition-colors">Philosophy</a>
            <a href="#docs" className="hover:text-white transition-colors">Documentation</a>
            <a href="#advantages" className="hover:text-white transition-colors">Architecture</a>
            <button
              onClick={() => navigateTo("guide")}
              className="hover:text-white transition-colors flex items-center gap-1.5 text-indigo-300 font-medium"
            >
              <BookOpen className="size-3.5 text-indigo-400" />
              <span>Learning Hub</span>
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => copyToClipboard("pip install --upgrade darsh", "nav-pip")}
              className="hidden sm:inline-flex items-center gap-2 h-8 px-3.5 rounded-full text-[12px] font-mono bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white border border-white/[0.08] transition-all"
            >
              {copiedKey === "nav-pip" ? (
                <>
                  <Check className="size-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Terminal className="size-3 text-neutral-400" />
                  <span>pip install darsh</span>
                </>
              )}
            </button>

            <a
              href="https://pypi.org/project/darsh/2.0.1/"
              target="_blank"
              rel="noreferrer"
              className="size-8 inline-flex items-center justify-center rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-neutral-400 hover:text-white transition-colors"
              title="PyPI Package"
            >
              <PyPIIcon className="size-4" />
            </a>

            <a
              href="https://github.com/satyamranatc/Darsh"
              target="_blank"
              rel="noreferrer"
              className="size-8 inline-flex items-center justify-center rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-neutral-400 hover:text-white transition-colors"
              title="GitHub"
            >
              <GithubIcon className="size-4" />
            </a>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* ACETERNITY HERO SECTION (FULL WIDTH & CINEMATIC SCALE) */}
      {/* ========================================================================= */}
      <section className="relative z-10 w-full pt-28 pb-32 sm:pt-40 sm:pb-44 px-6 sm:px-12 max-w-[1500px] mx-auto text-center flex flex-col items-center">
        {/* Shimmer Border Moving Pill */}
        <div className="relative inline-flex overflow-hidden rounded-full p-[1px] mb-8 shadow-2xl">
          <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#4F46E5_0%,#38BDF8_50%,#4F46E5_100%)] opacity-70" />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-950 text-[12.5px] font-medium text-neutral-300 backdrop-blur-3xl">
            <Sparkles className="size-3.5 text-indigo-400" />
            <span>Darsh v2.0.1 Released &middot; Now live on PyPI</span>
          </div>
        </div>

        {/* Cinematic Grand Headline */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[-0.04em] text-white mb-6 leading-[1.02] max-w-6xl">
          Clean data. <br />
          <span className="bg-gradient-to-r from-indigo-300 via-sky-200 to-emerald-300 bg-clip-text text-transparent">
            Calm charts.
          </span>
        </h1>

        {/* Breathing Subtitle */}
        <p className="text-lg sm:text-2xl text-neutral-400 max-w-3xl mx-auto mb-14 font-normal leading-relaxed">
          The modern Pythonic charting and dashboard engine. Built on top of pandas, matplotlib, and plotly with
          <span className="text-neutral-200 font-medium"> zero proprietary silos</span> and effortless 1-liners.
        </p>

        {/* Aceternity Interactive Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-lg mb-20">
          <button
            onClick={() => copyToClipboard("pip install --upgrade darsh", "hero-pip")}
            className="w-full sm:w-auto h-12 px-7 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-[14px] flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-white/10 active:scale-[0.98]"
          >
            {copiedKey === "hero-pip" ? (
              <>
                <Check className="size-4 text-emerald-600" />
                <span>Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Terminal className="size-4 text-neutral-600" />
                <span>pip install darsh</span>
              </>
            )}
          </button>

          <button
            onClick={() => navigateTo("guide")}
            className="w-full sm:w-auto h-12 px-7 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white font-medium text-[14px] border border-white/[0.1] flex items-center justify-center gap-2 transition-all group backdrop-blur-md"
          >
            <BookOpen className="size-4 text-indigo-400" />
            <span>Masterpiece Guide</span>
            <ChevronRight className="size-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Wide Full-Width Stats Ticker */}
        <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-white/[0.08] text-center">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
            <div className="text-3xl font-bold text-white tracking-tight">1-Line</div>
            <div className="text-[12px] text-neutral-500 mt-1">Lists, dicts, arrays</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
            <div className="text-3xl font-bold text-indigo-300 tracking-tight">100%</div>
            <div className="text-[12px] text-neutral-500 mt-1">Native Axes & Figures</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
            <div className="text-3xl font-bold text-emerald-300 tracking-tight">0</div>
            <div className="text-[12px] text-neutral-500 mt-1">Proprietary silos</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
            <div className="text-3xl font-bold text-sky-300 tracking-tight">36/36</div>
            <div className="text-[12px] text-neutral-500 mt-1">Pytest unit suite passing</div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FULL-WIDTH INTERACTIVE PLAYGROUND CANVAS */}
      {/* ========================================================================= */}
      <section id="playground" className="relative z-10 w-full py-28 px-6 sm:px-12 max-w-[1500px] mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-white mb-4">
            Designed for clarity
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto">
            Explore how Darsh handles everyday visualization, technical customization, and reactive applications.
          </p>
        </div>

        {/* Segmented Control Pill Bar */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-2">
          <div className="inline-flex p-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl">
            {Object.keys(tabs).map((key) => {
              const tab = tabs[key];
              const active = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-5 py-2 rounded-full text-[13px] font-medium transition-all whitespace-nowrap ${
                    active
                      ? "bg-white text-black shadow-lg font-semibold"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Expansive Canvas Container */}
        <div className="w-full rounded-3xl bg-[#070709] border border-white/[0.08] p-8 sm:p-14 overflow-hidden shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Code Box */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-indigo-400 mb-2">
                  {tabs[activeTab].tag}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                  {tabs[activeTab].title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed font-normal">
                  {tabs[activeTab].desc}
                </p>
              </div>

              <div className="rounded-2xl bg-black border border-white/[0.08] overflow-hidden">
                <div className="px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.06] flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                  <span>python</span>
                  <button
                    onClick={() => copyToClipboard(tabs[activeTab].code, `tab-${activeTab}`)}
                    className="hover:text-white flex items-center gap-1 transition-colors"
                  >
                    {copiedKey === `tab-${activeTab}` ? (
                      <>
                        <Check className="size-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-5 font-mono text-[13px] leading-relaxed text-neutral-300 overflow-x-auto">
                  <pre>
                    <code>{tabs[activeTab].code}</code>
                  </pre>
                </div>
              </div>
            </div>

            {/* Right: Visual Preview */}
            <div className="lg:col-span-6 rounded-2xl bg-black border border-white/[0.08] p-8 min-h-[360px] flex flex-col justify-center relative">
              {tabs[activeTab].preview === "line" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-neutral-400 border-b border-white/[0.06] pb-3">
                    <span className="font-medium text-white">Weekly Active Users</span>
                    <span className="font-mono text-[11px] text-indigo-400">darsh.line()</span>
                  </div>
                  <div className="h-48 w-full flex items-end">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 400 160">
                      <line x1="0" y1="140" x2="400" y2="140" stroke="#1f2937" strokeDasharray="3 3" strokeWidth="0.8" />
                      <line x1="0" y1="90" x2="400" y2="90" stroke="#1f2937" strokeDasharray="3 3" strokeWidth="0.8" />
                      <line x1="0" y1="40" x2="400" y2="40" stroke="#1f2937" strokeDasharray="3 3" strokeWidth="0.8" />
                      <path
                        d="M 20 140 Q 90 90, 160 120 T 300 50 T 380 20"
                        fill="none"
                        stroke="#6366F1"
                        strokeWidth="2.5"
                      />
                      {[
                        { x: 20, y: 140, v: 12 },
                        { x: 95, y: 100, v: 28 },
                        { x: 165, y: 120, v: 19 },
                        { x: 235, y: 70, v: 45 },
                        { x: 305, y: 48, v: 62 },
                        { x: 380, y: 20, v: 58 }
                      ].map((pt, idx) => (
                        <circle key={idx} cx={pt.x} cy={pt.y} r="4" fill="#6366F1" stroke="#000000" strokeWidth="2" />
                      ))}
                    </svg>
                  </div>
                  <div className="flex justify-between text-[11px] font-mono text-neutral-500 pt-1">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                  </div>
                </div>
              )}

              {tabs[activeTab].preview === "senior" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-neutral-400 border-b border-white/[0.06] pb-3">
                    <span className="font-medium text-white">ARR Trajectory (Log Scaled)</span>
                    <span className="font-mono text-[11px] text-emerald-400">Native Axes</span>
                  </div>
                  <div className="h-48 w-full flex items-center justify-center">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 400 160">
                      <line x1="20" y1="60" x2="380" y2="60" stroke="#EF4444" strokeDasharray="3 3" strokeWidth="1" />
                      <text x="375" y="52" fill="#EF4444" fontSize="10" textAnchor="end">Q4 Benchmark ($5,000)</text>
                      <path
                        d="M 20 150 Q 140 130, 220 90 T 360 20"
                        fill="none"
                        stroke="#6366F1"
                        strokeWidth="2.5"
                      />
                      <circle cx="220" cy="90" r="4" fill="#38BDF8" />
                      <rect x="130" y="25" width="95" height="24" rx="6" fill="#111115" stroke="#38BDF8" strokeWidth="0.8" />
                      <text x="177" y="41" fill="#38BDF8" fontSize="10" textAnchor="middle" fontWeight="bold">
                        Inflection Point
                      </text>
                    </svg>
                  </div>
                  <div className="text-[11px] text-neutral-500 font-mono text-center">
                    plt.savefig('arr.png') fully supported with zero wrapper interference
                  </div>
                </div>
              )}

              {tabs[activeTab].preview === "3d" && (
                <div className="space-y-4 text-center">
                  <div className="flex items-center justify-between text-xs text-neutral-400 border-b border-white/[0.06] pb-3">
                    <span className="font-medium text-white">3D Scatter Point Cloud</span>
                    <span className="font-mono text-[11px] text-sky-400">Plotly WebGL</span>
                  </div>
                  <div className="h-48 flex items-center justify-center">
                    <div className="w-52 h-36 border border-neutral-800 rounded-xl transform -rotate-6 skew-y-6 flex items-center justify-center relative bg-white/[0.01]">
                      <div className="absolute top-4 left-6 size-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <div className="absolute top-10 right-8 size-2 rounded-full bg-sky-400" />
                      <div className="absolute bottom-6 left-12 size-3 rounded-full bg-indigo-400" />
                      <div className="text-[10px] font-mono text-neutral-500">
                        Camera Orbit Enabled
                      </div>
                    </div>
                  </div>
                  <div className="text-[11px] text-neutral-500">
                    Self-healing notebook renderers ensure zero nbformat exceptions
                  </div>
                </div>
              )}

              {tabs[activeTab].preview === "grid" && (
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <div className="text-[10px] text-neutral-500 uppercase font-medium">Revenue</div>
                      <div className="text-base font-bold text-white">$4.2M</div>
                      <span className="text-[10px] text-emerald-400 font-medium">+14.2%</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <div className="text-[10px] text-neutral-500 uppercase font-medium">Profit</div>
                      <div className="text-base font-bold text-white">$1.8M</div>
                      <span className="text-[10px] text-emerald-400 font-medium">+8.6%</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <div className="text-[10px] text-neutral-500 uppercase font-medium">CSAT</div>
                      <div className="text-base font-bold text-white">4.85</div>
                      <span className="text-[10px] text-sky-400 font-medium">Leader</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] h-20 flex flex-col justify-between">
                      <span className="text-[10px] text-neutral-400 font-medium">Revenue Trend</span>
                      <div className="h-6 w-full bg-indigo-500/10 border-t border-indigo-400 rounded-sm" />
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] h-20 flex flex-col justify-between">
                      <span className="text-[10px] text-neutral-400 font-medium">Channel Split</span>
                      <div className="h-8 flex items-end gap-1">
                        <div className="w-1/3 h-7 bg-indigo-500 rounded-t-sm" />
                        <div className="w-1/3 h-5 bg-neutral-700 rounded-t-sm" />
                        <div className="w-1/3 h-3 bg-neutral-800 rounded-t-sm" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {tabs[activeTab].preview === "cleaning" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 text-xs">
                    <span className="text-white font-medium">DataFrame Health Score</span>
                    <span className="text-emerald-400 font-mono font-bold">98.4 / 100</span>
                  </div>
                  {[
                    "Snake case column normalization",
                    "Duplicate records eliminated",
                    "Smart median/mode imputation",
                    "Datetime and numerical casting"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/[0.04] text-[11px] text-neutral-300">
                      <CheckCircle2 className="size-3 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {tabs[activeTab].preview === "dashboard" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs border-b border-white/[0.06] pb-2">
                    <span className="text-white font-medium">FastAPI Reactive Server</span>
                    <span className="text-emerald-400 text-[10px] flex items-center gap-1 font-mono">
                      <span className="size-1.5 rounded-full bg-emerald-400" />
                      localhost:8080
                    </span>
                  </div>
                  <div className="h-28 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-center text-xs text-neutral-500 font-mono">
                    Instant cross-filter updates over JSON
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PHILOSOPHY & MANIFESTO */}
      {/* ========================================================================= */}
      <section id="philosophy" className="relative z-10 w-full py-32 px-6 sm:px-12 max-w-[1500px] mx-auto text-center border-t border-white/[0.08]">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-indigo-400 mb-4">
            Core Manifesto
          </span>
          <blockquote className="text-3xl sm:text-6xl font-bold tracking-[-0.035em] text-white leading-tight mb-8">
            &ldquo;Extremely simple on the surface. <br />
            <span className="text-neutral-500 font-normal">Extremely powerful underneath.&rdquo;</span>
          </blockquote>
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed font-normal max-w-2xl mx-auto mb-16">
            The developer should not feel like they are using FastAPI, Pandas, SVG, JavaScript, CSS, or a charting engine.
            All complexity disappears behind an intuitive, elegant Darsh API.
          </p>
        </div>

        {/* 3 Value Cards across Full Width */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-6xl mx-auto">
          <div className="p-8 rounded-3xl bg-[#08080a] border border-white/[0.08]">
            <div className="text-white font-semibold text-lg mb-2">Zero Lock-in</div>
            <p className="text-sm text-neutral-400 leading-relaxed font-normal">
              Never outputs proprietary chart wrappers. Every function yields native matplotlib or plotly objects you already know.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-[#08080a] border border-white/[0.08]">
            <div className="text-white font-semibold text-lg mb-2">Nordic Calm</div>
            <p className="text-sm text-neutral-400 leading-relaxed font-normal">
              Palettes engineered to eliminate visual fatigue. Subdued gridlines, crisp contrast, and refined typography.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-[#08080a] border border-white/[0.08]">
            <div className="text-white font-semibold text-lg mb-2">Product Feel</div>
            <p className="text-sm text-neutral-400 leading-relaxed font-normal">
              Making data analytics feel less like writing script boilerplate and more like composing a modern digital product.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FULL-WIDTH DOCUMENTATION EXPLORER */}
      {/* ========================================================================= */}
            {/* ========================================================================= */}
      {/* FULL-WIDTH HYPER-EASY LAYMAN DOCUMENTATION & VISUAL GUIDE */}
      {/* ========================================================================= */}
      <section id="docs" className="relative z-10 w-full py-32 px-6 sm:px-12 max-w-[1500px] mx-auto border-t border-white/[0.08]">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[12px] text-neutral-300 mb-4">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            <span>Hyper-Easy Guide &middot; For Beginners and Senior Developers</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.035em] text-white mb-4">
            How to use Darsh in plain English
          </h2>

          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed font-normal max-w-2xl mx-auto">
            No confusing data science jargon. Real everyday use cases with styled code,
            clear layman explanations, and visual previews of the exact result.
          </p>
        </div>

        {/* Category Filter Pills (Simple, supportive, non-interactive reading filters) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16 max-w-4xl mx-auto">
          {[
            { id: "all", label: "All Guides (9)" },
            { id: "everyday", label: "Everyday Charts" },
            { id: "executive", label: "Cards & Grids" },
            { id: "interactive", label: "Interactive & 3D" },
            { id: "cleaning", label: "Painless Cleaning" },
            { id: "dashboard", label: "Live Dashboard" }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setDocCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                docCategory === cat.id
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "bg-white/[0.03] text-neutral-400 hover:text-white border border-white/[0.06]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Guides Container */}
        <div className="space-y-12 max-w-6xl mx-auto">
          {/* =================================================================== */}
          {/* 1. LINE CHART */}
          {/* =================================================================== */}
          {(docCategory === "all" || docCategory === "everyday") && (
            <div className="rounded-3xl bg-[#08080a] border border-white/[0.08] p-8 sm:p-10 shadow-2xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 border-b border-white/[0.06] pb-6">
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-xs font-mono font-semibold text-indigo-400 px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                      darsh.line()
                    </span>
                    <span className="text-xs text-neutral-500 font-mono">Returns: matplotlib.axes.Axes</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Tracking numbers that change over time
                  </h3>
                  <p className="text-sm text-neutral-400 mt-1">
                    Use this whenever you have a continuous flow of days, weeks, or numbers. You can pass a simple Python list or a pandas DataFrame.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs px-3 py-1 rounded-full bg-white/[0.04] text-neutral-300 border border-white/[0.08]">
                    Input: Plain List or DataFrame
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Code Window */}
                <div className="lg:col-span-7 rounded-2xl bg-black border border-white/[0.08] overflow-hidden">
                  <div className="px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-500">
                    <span>example.py</span>
                    <button
                      onClick={() => copyToClipboard("import darsh\n\n# 1-liner line chart from a plain list\nax = darsh.line([12, 28, 19, 45, 62, 58], title=\"Weekly Growth\")", "doc-line")}
                      className="hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      {copiedKey === "doc-line" ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                      <span>{copiedKey === "doc-line" ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <div className="p-5 font-mono text-[13px] leading-relaxed">
                    <div><span className="text-purple-400">import</span> <span className="text-white">darsh</span></div>
                    <div className="mt-2 text-neutral-500"># Pass any plain Python list directly — zero boilerplate!</div>
                    <div><span className="text-white">ax</span> = <span className="text-sky-300">darsh.line</span>([<span className="text-amber-300">12</span>, <span className="text-amber-300">28</span>, <span className="text-amber-300">19</span>, <span className="text-amber-300">45</span>, <span className="text-amber-300">62</span>, <span className="text-amber-300">58</span>], <span className="text-neutral-400">title</span>=<span className="text-emerald-300">"Weekly Growth"</span>)</div>
                    <div className="mt-2 text-neutral-500"># Want to save it to disk? Standard matplotlib works 100%:</div>
                    <div><span className="text-white">ax.figure.</span><span className="text-sky-300">savefig</span>(<span className="text-emerald-300">"growth.png"</span>)</div>
                  </div>
                </div>

                {/* Visual Preview */}
                <div className="lg:col-span-5 rounded-2xl bg-black border border-white/[0.08] p-6 text-center">
                  <div className="text-xs font-medium text-white mb-1">Weekly Growth</div>
                  <div className="text-[10px] text-neutral-500 mb-3">Exact visual output from Darsh</div>
                  <div className="h-36 w-full flex items-end">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 320 140">
                      <line x1="10" y1="120" x2="310" y2="120" stroke="#1f2937" strokeDasharray="3 3" strokeWidth="0.8" />
                      <line x1="10" y1="70" x2="310" y2="70" stroke="#1f2937" strokeDasharray="3 3" strokeWidth="0.8" />
                      <line x1="10" y1="20" x2="310" y2="20" stroke="#1f2937" strokeDasharray="3 3" strokeWidth="0.8" />
                      <path d="M 20 120 Q 80 80, 140 100 T 250 40 T 300 20" fill="none" stroke="#4F46E5" strokeWidth="2.5" />
                      {[
                        { x: 20, y: 120, val: "12" },
                        { x: 80, y: 90, val: "28" },
                        { x: 140, y: 100, val: "19" },
                        { x: 200, y: 60, val: "45" },
                        { x: 250, y: 35, val: "62" },
                        { x: 300, y: 20, val: "58" }
                      ].map((p, i) => (
                        <g key={i}>
                          <circle cx={p.x} cy={p.y} r="3.5" fill="#4F46E5" stroke="#000000" strokeWidth="1.5" />
                          <text x={p.x} y={p.y - 8} fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">{p.val}</text>
                        </g>
                      ))}
                    </svg>
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-neutral-500 pt-2 border-t border-white/[0.04]">
                    <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* 2. BAR CHART */}
          {/* =================================================================== */}
          {(docCategory === "all" || docCategory === "everyday") && (
            <div className="rounded-3xl bg-[#08080a] border border-white/[0.08] p-8 sm:p-10 shadow-2xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 border-b border-white/[0.06] pb-6">
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-xs font-mono font-semibold text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      darsh.bar()
                    </span>
                    <span className="text-xs text-neutral-500 font-mono">Returns: matplotlib.axes.Axes</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Comparing categories, departments, or teams
                  </h3>
                  <p className="text-sm text-neutral-400 mt-1">
                    Pass a Python dictionary like <code className="text-neutral-300">{"{\"Design\": 92, \"Eng\": 96}"}</code> and get clean, sorted bars with zero configuration.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs px-3 py-1 rounded-full bg-white/[0.04] text-neutral-300 border border-white/[0.08]">
                    Input: Dict, List, or DataFrame
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Code Window */}
                <div className="lg:col-span-7 rounded-2xl bg-black border border-white/[0.08] overflow-hidden">
                  <div className="px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-500">
                    <span>example.py</span>
                    <button
                      onClick={() => copyToClipboard("import darsh\n\n# 1-liner bar chart directly from a Python dictionary\ndarsh.bar({\"Design\": 92, \"Engineering\": 96, \"Product\": 88}, title=\"Team Scores\")", "doc-bar")}
                      className="hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      {copiedKey === "doc-bar" ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                      <span>{copiedKey === "doc-bar" ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <div className="p-5 font-mono text-[13px] leading-relaxed">
                    <div><span className="text-purple-400">import</span> <span className="text-white">darsh</span></div>
                    <div className="mt-2 text-neutral-500"># Pass a dictionary of category: score</div>
                    <div><span className="text-sky-300">darsh.bar</span>({'{'}</div>
                    <div className="pl-4"><span className="text-emerald-300">"Design"</span>: <span className="text-amber-300">92</span>,</div>
                    <div className="pl-4"><span className="text-emerald-300">"Engineering"</span>: <span className="text-amber-300">96</span>,</div>
                    <div className="pl-4"><span className="text-emerald-300">"Product"</span>: <span className="text-amber-300">88</span></div>
                    <div>{'}'}, <span className="text-neutral-400">title</span>=<span className="text-emerald-300">"Team Performance"</span>)</div>
                    <div className="mt-2 text-neutral-500"># Tip: pass horizontal=True for long labels!</div>
                  </div>
                </div>

                {/* Visual Preview */}
                <div className="lg:col-span-5 rounded-2xl bg-black border border-white/[0.08] p-6 text-center">
                  <div className="text-xs font-medium text-white mb-1">Team Performance</div>
                  <div className="text-[10px] text-neutral-500 mb-3">Exact visual output from Darsh</div>
                  <div className="h-36 w-full flex items-end justify-center gap-6 px-4">
                    <div className="flex flex-col items-center gap-1.5 w-16">
                      <span className="text-[10px] font-mono text-neutral-300">92</span>
                      <div className="w-full h-24 bg-indigo-500/80 rounded-t-sm" />
                      <span className="text-[10px] font-mono text-neutral-400">Design</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 w-16">
                      <span className="text-[10px] font-mono text-neutral-300">96</span>
                      <div className="w-full h-28 bg-indigo-500 rounded-t-sm" />
                      <span className="text-[10px] font-mono text-neutral-400">Eng</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 w-16">
                      <span className="text-[10px] font-mono text-neutral-300">88</span>
                      <div className="w-full h-20 bg-indigo-500/60 rounded-t-sm" />
                      <span className="text-[10px] font-mono text-neutral-400">Product</span>
                    </div>
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono text-center pt-2 border-t border-white/[0.04]">
                    ✓ Bars start strictly at zero — 100% honest scaling
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* 3. DONUT / PIE CHART */}
          {/* =================================================================== */}
          {(docCategory === "all" || docCategory === "everyday") && (
            <div className="rounded-3xl bg-[#08080a] border border-white/[0.08] p-8 sm:p-10 shadow-2xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 border-b border-white/[0.06] pb-6">
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-xs font-mono font-semibold text-sky-400 px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/20">
                      darsh.donut()
                    </span>
                    <span className="text-xs text-neutral-500 font-mono">Returns: matplotlib.axes.Axes</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Showing percentage splits or market share
                  </h3>
                  <p className="text-sm text-neutral-400 mt-1">
                    Pass revenue slices directly. Darsh automatically computes proportions, draws modern hollow centers, and applies calm Nordic palettes.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs px-3 py-1 rounded-full bg-white/[0.04] text-neutral-300 border border-white/[0.08]">
                    Hollow Donut or Classic Pie
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Code Window */}
                <div className="lg:col-span-7 rounded-2xl bg-black border border-white/[0.08] overflow-hidden">
                  <div className="px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-500">
                    <span>example.py</span>
                    <button
                      onClick={() => copyToClipboard("import darsh\n\n# Modern donut chart with calm colors\ndarsh.donut({\"Cloud\": 60, \"Hardware\": 25, \"Consulting\": 15}, title=\"Revenue Mix\")", "doc-donut")}
                      className="hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      {copiedKey === "doc-donut" ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                      <span>{copiedKey === "doc-donut" ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <div className="p-5 font-mono text-[13px] leading-relaxed">
                    <div><span className="text-purple-400">import</span> <span className="text-white">darsh</span></div>
                    <div className="mt-2 text-neutral-500"># Clean percentage proportions from dict</div>
                    <div><span className="text-sky-300">darsh.donut</span>({'{'}</div>
                    <div className="pl-4"><span className="text-emerald-300">"Cloud"</span>: <span className="text-amber-300">60</span>,</div>
                    <div className="pl-4"><span className="text-emerald-300">"Hardware"</span>: <span className="text-amber-300">25</span>,</div>
                    <div className="pl-4"><span className="text-emerald-300">"Services"</span>: <span className="text-amber-300">15</span></div>
                    <div>{'}'}, <span className="text-neutral-400">title</span>=<span className="text-emerald-300">"Revenue Mix"</span>)</div>
                  </div>
                </div>

                {/* Visual Preview */}
                <div className="lg:col-span-5 rounded-2xl bg-black border border-white/[0.08] p-6 text-center">
                  <div className="text-xs font-medium text-white mb-1">Revenue Mix</div>
                  <div className="text-[10px] text-neutral-500 mb-3">Exact visual output from Darsh</div>
                  <div className="h-36 w-full flex items-center justify-center">
                    <svg className="size-32" viewBox="0 0 100 100">
                      {/* Donut slices using strokeDasharray */}
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#4F46E5" strokeWidth="18" strokeDasharray="143 238" strokeDashoffset="0" />
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#10B981" strokeWidth="18" strokeDasharray="60 238" strokeDashoffset="-143" />
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#F59E0B" strokeWidth="18" strokeDasharray="35 238" strokeDashoffset="-203" />
                      <text x="50" y="53" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">100%</text>
                    </svg>
                  </div>
                  <div className="flex justify-center gap-4 text-[10px] font-mono text-neutral-400 pt-2 border-t border-white/[0.04]">
                    <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-indigo-500" /> Cloud (60%)</span>
                    <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-emerald-500" /> HW (25%)</span>
                    <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-amber-500" /> Serv (15%)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* 4. EXECUTIVE CARDS & GRID */}
          {/* =================================================================== */}
          {(docCategory === "all" || docCategory === "executive") && (
            <div className="rounded-3xl bg-[#08080a] border border-white/[0.08] p-8 sm:p-10 shadow-2xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 border-b border-white/[0.06] pb-6">
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-xs font-mono font-semibold text-purple-400 px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                      darsh.card() &middot; darsh.grid()
                    </span>
                    <span className="text-xs text-neutral-500 font-mono">Returns: Rich HTML Layout in Notebooks</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Big numbers & multi-chart responsive dashboards
                  </h3>
                  <p className="text-sm text-neutral-400 mt-1">
                    Display executive KPI cards with +/- badges, and group cards and charts together. The layout auto-balances across columns with zero clipping.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs px-3 py-1 rounded-full bg-white/[0.04] text-neutral-300 border border-white/[0.08]">
                    Fluid Responsive SVG
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Code Window */}
                <div className="lg:col-span-7 rounded-2xl bg-black border border-white/[0.08] overflow-hidden">
                  <div className="px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-500">
                    <span>dashboard.py</span>
                    <button
                      onClick={() => copyToClipboard("card1 = darsh.card(\"Total ARR\", \"$4.2M\", delta=\"+14.2%\")\ncard2 = darsh.card(\"Profit\", \"$1.8M\", delta=\"+8.6%\")\n\nc1 = darsh.line(df, x=\"date\", y=\"revenue\")\nc2 = darsh.bar(df, x=\"channel\", y=\"revenue\")\n\n# Put them together in a responsive grid\ngrid = darsh.grid([card1, card2, c1, c2], cols=2)", "doc-grid")}
                      className="hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      {copiedKey === "doc-grid" ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                      <span>{copiedKey === "doc-grid" ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <div className="p-5 font-mono text-[13px] leading-relaxed">
                    <div className="text-neutral-500"># 1. Create executive metric cards</div>
                    <div><span className="text-white">card1</span> = <span className="text-sky-300">darsh.card</span>(<span className="text-emerald-300">"Total ARR"</span>, <span className="text-emerald-300">"$4.2M"</span>, <span className="text-neutral-400">delta</span>=<span className="text-emerald-300">"+14.2%"</span>)</div>
                    <div><span className="text-white">card2</span> = <span className="text-sky-300">darsh.card</span>(<span className="text-emerald-300">"Net Profit"</span>, <span className="text-emerald-300">"$1.8M"</span>, <span className="text-neutral-400">delta</span>=<span className="text-emerald-300">"+8.6%"</span>)</div>
                    <div className="mt-2 text-neutral-500"># 2. Group cards and charts into one responsive grid</div>
                    <div><span className="text-white">dashboard</span> = <span className="text-sky-300">darsh.grid</span>([<span className="text-white">card1, card2, c1, c2</span>], <span className="text-neutral-400">cols</span>=<span className="text-amber-300">2</span>)</div>
                    <div className="mt-1 text-neutral-500"># In Jupyter: simply type 'dashboard' to see it!</div>
                  </div>
                </div>

                {/* Visual Preview */}
                <div className="lg:col-span-5 rounded-2xl bg-black border border-white/[0.08] p-6 text-center">
                  <div className="text-xs font-medium text-white mb-2">Executive Briefing Grid Output</div>
                  <div className="space-y-2.5">
                    <div className="grid grid-cols-2 gap-2 text-left">
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                        <div className="text-[10px] text-neutral-500 uppercase font-mono">Total ARR</div>
                        <div className="text-base font-bold text-white">$4.2M</div>
                        <span className="text-[10px] text-emerald-400 font-semibold">+14.2%</span>
                      </div>
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                        <div className="text-[10px] text-neutral-500 uppercase font-mono">Net Profit</div>
                        <div className="text-base font-bold text-white">$1.8M</div>
                        <span className="text-[10px] text-emerald-400 font-semibold">+8.6%</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-16 rounded-xl bg-white/[0.02] border border-white/[0.06] p-2 flex flex-col justify-between">
                        <span className="text-[10px] text-neutral-400">Revenue Trend</span>
                        <div className="h-6 w-full bg-indigo-500/20 border-t border-indigo-400 rounded-sm" />
                      </div>
                      <div className="h-16 rounded-xl bg-white/[0.02] border border-white/[0.06] p-2 flex flex-col justify-between">
                        <span className="text-[10px] text-neutral-400">Channel Split</span>
                        <div className="h-6 flex items-end gap-1">
                          <div className="w-1/3 h-5 bg-indigo-500 rounded-t-sm" />
                          <div className="w-1/3 h-4 bg-neutral-600 rounded-t-sm" />
                          <div className="w-1/3 h-2 bg-neutral-700 rounded-t-sm" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono text-center pt-2 border-t border-white/[0.04] mt-2">
                    ✓ 0px horizontal overflow &middot; auto-balanced cards
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* 5. INTERACTIVE 2D & 3D */}
          {/* =================================================================== */}
          {(docCategory === "all" || docCategory === "interactive") && (
            <div className="rounded-3xl bg-[#08080a] border border-white/[0.08] p-8 sm:p-10 shadow-2xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 border-b border-white/[0.06] pb-6">
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-xs font-mono font-semibold text-rose-400 px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20">
                      interactive=True &middot; darsh.scatter_3d()
                    </span>
                    <span className="text-xs text-neutral-500 font-mono">Returns: plotly.graph_objects.Figure</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Hover inspection & 3D camera orbits
                  </h3>
                  <p className="text-sm text-neutral-400 mt-1">
                    Just add <code className="text-neutral-300">interactive=True</code> to any 2D chart, or call <code className="text-neutral-300">scatter_3d()</code> to explore 3 metrics in spatial coordinate depth.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs px-3 py-1 rounded-full bg-white/[0.04] text-neutral-300 border border-white/[0.08]">
                    Self-Healing Plotly
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Code Window */}
                <div className="lg:col-span-7 rounded-2xl bg-black border border-white/[0.08] overflow-hidden">
                  <div className="px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-500">
                    <span>interactive.py</span>
                    <button
                      onClick={() => copyToClipboard("# 2D interactive chart\nfig = darsh.line(df, x=\"date\", y=\"revenue\", interactive=True)\nfig.show()\n\n# 3D spatial scatter\nfig_3d = darsh.scatter_3d(df, x=\"revenue\", y=\"profit\", z=\"units\")\nfig_3d.show()", "doc-inter")}
                      className="hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      {copiedKey === "doc-inter" ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                      <span>{copiedKey === "doc-inter" ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <div className="p-5 font-mono text-[13px] leading-relaxed">
                    <div className="text-neutral-500"># Just add interactive=True!</div>
                    <div><span className="text-white">fig</span> = <span className="text-sky-300">darsh.line</span>(<span className="text-white">df</span>, <span className="text-neutral-400">x</span>=<span className="text-emerald-300">"date"</span>, <span className="text-neutral-400">y</span>=<span className="text-emerald-300">"revenue"</span>, <span className="text-neutral-400">interactive</span>=<span className="text-purple-400">True</span>)</div>
                    <div><span className="text-white">fig.</span><span className="text-sky-300">show</span>()</div>
                    <div className="mt-3 text-neutral-500"># 3D Point Cloud with camera rotation</div>
                    <div><span className="text-white">fig_3d</span> = <span className="text-sky-300">darsh.scatter_3d</span>(<span className="text-white">df</span>, <span className="text-neutral-400">x</span>=<span className="text-emerald-300">"rev"</span>, <span className="text-neutral-400">y</span>=<span className="text-emerald-300">"profit"</span>, <span className="text-neutral-400">z</span>=<span className="text-emerald-300">"units"</span>)</div>
                    <div><span className="text-white">fig_3d.</span><span className="text-sky-300">show</span>()</div>
                  </div>
                </div>

                {/* Visual Preview */}
                <div className="lg:col-span-5 rounded-2xl bg-black border border-white/[0.08] p-6 text-center">
                  <div className="text-xs font-medium text-white mb-1">3D Coordinate Space</div>
                  <div className="text-[10px] text-neutral-500 mb-4">Plotly WebGL render</div>
                  <div className="h-32 flex items-center justify-center">
                    <div className="w-44 h-28 border border-neutral-700/60 rounded-xl transform -rotate-6 skew-y-6 flex items-center justify-center relative bg-white/[0.01]">
                      <div className="absolute top-4 left-6 size-2.5 rounded-full bg-emerald-400" />
                      <div className="absolute top-8 right-8 size-2 rounded-full bg-sky-400" />
                      <div className="absolute bottom-5 left-12 size-3 rounded-full bg-indigo-400" />
                      <span className="text-[10px] font-mono text-neutral-500">Orbit &amp; Zoom</span>
                    </div>
                  </div>
                  <div className="text-[10px] text-neutral-400 pt-2 border-t border-white/[0.04]">
                    Darsh automatically binds nbformat so notebook renders never crash
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* 6. PAINLESS DATA CLEANING */}
          {/* =================================================================== */}
          {(docCategory === "all" || docCategory === "cleaning") && (
            <div className="rounded-3xl bg-[#08080a] border border-white/[0.08] p-8 sm:p-10 shadow-2xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 border-b border-white/[0.06] pb-6">
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-xs font-mono font-semibold text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      df.darsh.*
                    </span>
                    <span className="text-xs text-neutral-500 font-mono">Returns: Clean pandas DataFrame</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Cleaning messy columns and missing values without pain
                  </h3>
                  <p className="text-sm text-neutral-400 mt-1">
                    Directly on your normal pandas DataFrame. No proprietary wrappers. Chain clean names, drop duplicates, and get a 0-100 quality score.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs px-3 py-1 rounded-full bg-white/[0.04] text-neutral-300 border border-white/[0.08]">
                    Standard Pandas
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Code Window */}
                <div className="lg:col-span-7 rounded-2xl bg-black border border-white/[0.08] overflow-hidden">
                  <div className="px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-500">
                    <span>clean_data.py</span>
                    <button
                      onClick={() => copyToClipboard("clean_df = (\n    raw_df\n    .darsh.clean_names()               # 'Annual Rev ($)' -> 'annual_rev'\n    .darsh.drop_duplicates()           # Removes ghost rows\n    .darsh.fill_missing(strategy='smart') # Median/Mode auto-fill\n    .darsh.infer_types()               # Casts dates and numbers\n)\n\nscore = clean_df.darsh.quality_score() # e.g. 98.4", "doc-clean")}
                      className="hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      {copiedKey === "doc-clean" ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                      <span>{copiedKey === "doc-clean" ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <div className="p-5 font-mono text-[13px] leading-relaxed">
                    <div><span className="text-white">clean_df</span> = (</div>
                    <div className="pl-4"><span className="text-white">raw_df</span></div>
                    <div className="pl-4">.<span className="text-sky-300">darsh.clean_names</span>() <span className="text-neutral-500"># 'Total Rev ($)' -&gt; 'total_rev'</span></div>
                    <div className="pl-4">.<span className="text-sky-300">darsh.drop_duplicates</span>()</div>
                    <div className="pl-4">.<span className="text-sky-300">darsh.fill_missing</span>(<span className="text-neutral-400">strategy</span>=<span className="text-emerald-300">"smart"</span>)</div>
                    <div className="pl-4">.<span className="text-sky-300">darsh.infer_types</span>()</div>
                    <div>)</div>
                    <div className="mt-2 text-neutral-500"># Check data health rating:</div>
                    <div><span className="text-white">score</span> = <span className="text-white">clean_df</span>.<span className="text-sky-300">darsh.quality_score</span>() <span className="text-neutral-500"># 98.4 / 100</span></div>
                  </div>
                </div>

                {/* Visual Preview */}
                <div className="lg:col-span-5 rounded-2xl bg-black border border-white/[0.08] p-6 text-left">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 mb-3">
                    <span className="text-xs font-semibold text-white">Data Quality Audit</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">98.4 / 100</span>
                  </div>
                  <div className="space-y-2 text-[11px]">
                    <div className="flex items-center justify-between p-2 rounded bg-white/[0.02]">
                      <span className="text-neutral-400">Column Names</span>
                      <span className="text-emerald-400 font-mono">snake_case ✓</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-white/[0.02]">
                      <span className="text-neutral-400">Missing Values</span>
                      <span className="text-emerald-400 font-mono">0 blanks (imputed)</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-white/[0.02]">
                      <span className="text-neutral-400">Duplicates</span>
                      <span className="text-emerald-400 font-mono">0 zombie rows</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* 7. LIVE WEB DASHBOARD */}
          {/* =================================================================== */}
          {(docCategory === "all" || docCategory === "dashboard") && (
            <div className="rounded-3xl bg-[#08080a] border border-white/[0.08] p-8 sm:p-10 shadow-2xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 border-b border-white/[0.06] pb-6">
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-xs font-mono font-semibold text-amber-400 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                      darsh.dashboard()
                    </span>
                    <span className="text-xs text-neutral-500 font-mono">High-Speed FastAPI + Uvicorn</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Deploy a live interactive web dashboard in 1 call
                  </h3>
                  <p className="text-sm text-neutral-400 mt-1">
                    Pass your charts and KPIs. Darsh launches a local web application on your computer with real-time dropdown filters and instant SVG chart updates.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs px-3 py-1 rounded-full bg-white/[0.04] text-neutral-300 border border-white/[0.08]">
                    No Web Dev Needed
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Code Window */}
                <div className="lg:col-span-7 rounded-2xl bg-black border border-white/[0.08] overflow-hidden">
                  <div className="px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-500">
                    <span>app.py</span>
                    <button
                      onClick={() => copyToClipboard("app = darsh.dashboard(\n    data=df,\n    charts=[c1, c2],\n    kpis=[darsh.kpi(\"Revenue\", \"revenue\", agg=\"sum\", prefix=\"$\")],\n    title=\"Executive Portal\"\n)\napp.run(port=8080)", "doc-dash")}
                      className="hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      {copiedKey === "doc-dash" ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                      <span>{copiedKey === "doc-dash" ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <div className="p-5 font-mono text-[13px] leading-relaxed">
                    <div><span className="text-white">app</span> = <span className="text-sky-300">darsh.dashboard</span>(</div>
                    <div className="pl-4"><span className="text-neutral-400">data</span>=<span className="text-white">df</span>,</div>
                    <div className="pl-4"><span className="text-neutral-400">charts</span>=[<span className="text-white">c1, c2</span>],</div>
                    <div className="pl-4"><span className="text-neutral-400">kpis</span>=[<span className="text-sky-300">darsh.kpi</span>(<span className="text-emerald-300">"Revenue"</span>, <span className="text-emerald-300">"revenue"</span>, <span className="text-neutral-400">agg</span>=<span className="text-emerald-300">"sum"</span>, <span className="text-neutral-400">prefix</span>=<span className="text-emerald-300">"$"</span>)],</div>
                    <div className="pl-4"><span className="text-neutral-400">title</span>=<span className="text-emerald-300">"Executive Portal"</span></div>
                    <div>)</div>
                    <div className="mt-2 text-neutral-500"># Launches local server and opens your browser:</div>
                    <div><span className="text-white">app.</span><span className="text-sky-300">run</span>(<span className="text-neutral-400">port</span>=<span className="text-amber-300">8080</span>)</div>
                  </div>
                </div>

                {/* Visual Preview */}
                <div className="lg:col-span-5 rounded-2xl bg-black border border-white/[0.08] p-6 text-center">
                  <div className="flex items-center justify-between text-xs border-b border-white/[0.06] pb-2 mb-3">
                    <span className="text-white font-medium">Live Dashboard Portal</span>
                    <span className="text-emerald-400 font-mono text-[10px]">localhost:8080</span>
                  </div>
                  <div className="h-28 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center text-xs text-neutral-400 font-mono">
                    Working cross-filter dropdowns &middot; Real-time updates
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>


      {/* ========================================================================= */}
      {/* FULL-WIDTH FOOTER */}
      {/* ========================================================================= */}
      <footer className="relative z-10 w-full border-t border-white/[0.08] py-16 px-6 sm:px-12">
        <div className="w-full max-w-[1500px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">Darsh</span>
            <span>&middot;</span>
            <span>Version 2.0.1</span>
            <span>&middot;</span>
            <span>MIT License</span>
          </div>

          <p className="text-center sm:text-right">
            Crafted with care by <span className="text-neutral-300 font-medium">Satyam Rana</span>
          </p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => navigateTo("guide")}
              className="hover:text-white transition-colors"
            >
              Masterpiece Guide
            </button>
            <a
              href="https://pypi.org/project/darsh/2.0.1/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              PyPI
            </a>
            <a
              href="https://github.com/satyamranatc/Darsh"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
