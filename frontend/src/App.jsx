import React, { useState, useEffect, useRef } from "react";
import VisualizationGuide from "./VisualizationGuide";
import { updatePageSEO } from "./lib/seo";
import {
  BookOpen,
  Terminal,
  Copy,
  Check,
  Search,
  ChevronRight,
  Sparkles,
  Sliders,
  Layers,
  Zap,
  ShieldCheck,
  Code2,
  RotateCw,
  Cpu,
  Eye,
  CheckCircle2,
  Command,
  Activity,
  BarChart2,
  Play,
  RefreshCw,
  Filter
} from "lucide-react";

function GithubIcon({ className = "size-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
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
  const [toastMessage, setToastMessage] = useState(null);
  const [activeTab, setActiveTab] = useState("oneliners");
  const [docCategory, setDocCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [apiCategory, setApiCategory] = useState("all");
  const searchInputRef = useRef(null);

  // Sync SEO metadata with active view
  useEffect(() => {
    updatePageSEO(view);
  }, [view]);

  // Micro-interaction Playground States
  const [linePreset, setLinePreset] = useState("growth"); // "growth" | "latency" | "nodes"
  const [lineCurveStyle, setLineCurveStyle] = useState("curved"); // "curved" | "linear"
  const [showAreaFill, setShowAreaFill] = useState(true);
  const [hoveredLinePoint, setHoveredLinePoint] = useState(null);

  const [seniorScale, setSeniorScale] = useState("log"); // "linear" | "log"
  const [benchmarkTarget, setBenchmarkTarget] = useState(5000); // 5000 | 7500 | 10000

  const [spatialAngle, setSpatialAngle] = useState("isometric"); // "isometric" | "front" | "top" | "orbit"
  const [hovered3dPoint, setHovered3dPoint] = useState(null);

  const [gridCols, setGridCols] = useState(3); // 2 | 3
  const [activeKpiCard, setActiveKpiCard] = useState("rev");

  const [cleaningView, setCleaningView] = useState("cleaned"); // "raw" | "cleaned"

  const [dashboardChannel, setDashboardChannel] = useState("all"); // "all" | "online" | "retail"
  const [dashboardMetric, setDashboardMetric] = useState("rev"); // "rev" | "orders" | "cvr"

  // Bento Interactive states
  const [bentoCodeType, setBentoCodeType] = useState("matplotlib"); // "matplotlib" | "plotly"
  const [pingRunning, setPingRunning] = useState(false);
  const [pingResult, setPingResult] = useState(3.4);

  useEffect(() => {
    const handleHash = () => {
      setView(window.location.hash === "#guide" ? "guide" : "home");
    };
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // Keyboard shortcut listener: ⌘K or Ctrl+K opens API search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const apiSection = document.getElementById("api");
        if (apiSection) {
          apiSection.scrollIntoView({ behavior: "smooth" });
        }
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navigateTo = (target) => {
    setView(target);
    window.location.hash = target === "guide" ? "#guide" : "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyToClipboard = (text, key, message = "Copied to clipboard") => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setToastMessage(message);
    setTimeout(() => setCopiedKey(null), 2500);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleTestPing = () => {
    setPingRunning(true);
    setTimeout(() => {
      const randomLatency = (2.6 + Math.random() * 1.6).toFixed(1);
      setPingResult(randomLatency);
      setPingRunning(false);
      setToastMessage(`FastAPI response benchmarked at ${randomLatency}ms`);
      setTimeout(() => setToastMessage(null), 2500);
    }, 450);
  };

  // Line Chart Datasets for Playground Tab 1
  const lineDatasets = {
    growth: {
      name: "Weekly Active Growth",
      unit: "k users",
      color: "#6366F1",
      code: `import darsh\n\n# 1-liner line chart from a plain Python list\nax = darsh.line([12, 28, 19, 45, 62, 58], title="Weekly Growth")\n\n# Returns genuine matplotlib.axes.Axes!`,
      points: [
        { x: 35, y: 135, v: 12, label: "Mon", note: "Baseline volume" },
        { x: 105, y: 95, v: 28, label: "Tue", note: "+133% jump" },
        { x: 175, y: 115, v: 19, label: "Wed", note: "Midweek dip" },
        { x: 245, y: 65, v: 45, label: "Thu", note: "Product launch" },
        { x: 315, y: 38, v: 62, label: "Fri", note: "All-time peak" },
        { x: 380, y: 22, v: 58, label: "Sat", note: "High retention" }
      ],
      curvedPath: "M 35 135 Q 105 95, 175 115 T 315 38 T 380 22",
      linearPath: "M 35 135 L 105 95 L 175 115 L 245 65 L 315 38 L 380 22",
      curvedArea: "M 35 135 Q 105 95, 175 115 T 315 38 T 380 22 L 380 155 L 35 155 Z",
      linearArea: "M 35 135 L 105 95 L 175 115 L 245 65 L 315 38 L 380 22 L 380 155 L 35 155 Z"
    },
    latency: {
      name: "P99 Inference Latency",
      unit: "ms",
      color: "#10B981",
      code: `import darsh\n\n# Benchmark latency progression\nax = darsh.line([142, 118, 95, 64, 42, 38], title="P99 Latency (ms)", color="#10B981")\n\n# Returns genuine matplotlib.axes.Axes!`,
      points: [
        { x: 35, y: 30, v: 142, label: "v1.0", note: "Legacy backend" },
        { x: 105, y: 55, v: 118, label: "v1.1", note: "Batching added" },
        { x: 175, y: 80, v: 95, label: "v1.2", note: "Cache warmup" },
        { x: 245, y: 110, v: 64, label: "v1.3", note: "Vectorized Darsh" },
        { x: 315, y: 130, v: 42, label: "v2.0", note: "Kernel fusion" },
        { x: 380, y: 136, v: 38, label: "v2.1", note: "Sub-40ms P99" }
      ],
      curvedPath: "M 35 30 Q 105 55, 175 80 T 315 130 T 380 136",
      linearPath: "M 35 30 L 105 55 L 175 80 L 245 110 L 315 130 L 380 136",
      curvedArea: "M 35 30 Q 105 55, 175 80 T 315 130 T 380 136 L 380 155 L 35 155 Z",
      linearArea: "M 35 30 L 105 55 L 175 80 L 245 110 L 315 130 L 380 136 L 380 155 L 35 155 Z"
    },
    nodes: {
      name: "Auto-Scale Clusters",
      unit: "nodes",
      code: `import darsh\n\n# Track cluster cluster scaling throughout the day\nax = darsh.line([4, 8, 16, 24, 48, 64], title="Active Nodes", color="#38BDF8")\n\n# Returns genuine matplotlib.axes.Axes!`,
      points: [
        { x: 35, y: 142, v: 4, label: "00:00", note: "Idle baseline" },
        { x: 105, y: 132, v: 8, label: "04:00", note: "Early queue" },
        { x: 175, y: 112, v: 16, label: "08:00", note: "Morning rush" },
        { x: 245, y: 88, v: 24, label: "12:00", note: "Midday peak" },
        { x: 315, y: 52, v: 48, label: "16:00", note: "Retraining run" },
        { x: 380, y: 26, v: 64, label: "20:00", note: "Max allocation" }
      ],
      curvedPath: "M 35 142 Q 105 132, 175 112 T 315 52 T 380 26",
      linearPath: "M 35 142 L 105 132 L 175 112 L 245 88 L 315 52 L 380 26",
      curvedArea: "M 35 142 Q 105 132, 175 112 T 315 52 T 380 26 L 380 155 L 35 155 Z",
      linearArea: "M 35 142 L 105 132 L 175 112 L 245 88 L 315 52 L 380 26 L 380 155 L 35 155 Z"
    }
  };

  const currentDataset = lineDatasets[linePreset];

  // Self-contained, fully runnable code snippets for "How to use Darsh in plain English"
  const plainEnglishSnippets = {
    line: `import darsh
import matplotlib.pyplot as plt

# 1. Sample data: Weekly active metric
weekly_data = [12, 28, 19, 45, 62, 58]

# 2. Render publication-grade line chart in 1 call
ax = darsh.line(weekly_data, title="Weekly Growth")

# 3. Display chart (or save: ax.figure.savefig("growth.png"))
plt.show()`,

    bar: `import darsh
import matplotlib.pyplot as plt

# 1. Sample data: Team performance metrics
team_scores = {
    "Design": 92,
    "Engineering": 96,
    "Product": 88
}

# 2. Render sorted bar chart (pass horizontal=True for horizontal layout)
ax = darsh.bar(team_scores, title="Team Performance")

# 3. Display chart
plt.show()`,

    donut: `import darsh
import matplotlib.pyplot as plt

# 1. Sample data: Revenue breakdown proportions
revenue_mix = {
    "Cloud": 60,
    "Hardware": 25,
    "Services": 15
}

# 2. Render modern hollow donut chart
ax = darsh.donut(revenue_mix, title="Revenue Mix")

# 3. Display chart
plt.show()`,

    grid: `import darsh
import pandas as pd

# 1. Sample business metrics DataFrame
df = pd.DataFrame({
    "date": ["Mon", "Tue", "Wed", "Thu", "Fri"],
    "channel": ["Direct", "Search", "Social", "Referral", "Email"],
    "revenue": [12000, 18500, 14200, 22000, 28000]
})

# 2. Create executive metric cards
card1 = darsh.card("Total ARR", "$4.2M", delta="+14.2%")
card2 = darsh.card("Net Profit", "$1.8M", delta="+8.6%")

# 3. Create subcharts
c1 = darsh.line(df, x="date", y="revenue", title="Revenue Trend")
c2 = darsh.bar(df, x="channel", y="revenue", title="Channel Split")

# 4. Group into a responsive auto-balanced grid
dashboard = darsh.grid([card1, card2, c1, c2], cols=2)

# 5. Export to standalone HTML file (or inspect in Jupyter notebooks)
dashboard.save_html("dashboard.html")
print("Dashboard exported successfully to dashboard.html")`,

    inter: `import darsh
import pandas as pd

# 1. Sample metrics DataFrame
df = pd.DataFrame({
    "date": ["2024-Q1", "2024-Q2", "2024-Q3", "2024-Q4"],
    "revenue": [120, 185, 210, 290],
    "profit": [35, 55, 62, 95],
    "units": [450, 710, 830, 1150]
})

# 2. Interactive 2D chart with hover inspection
fig_2d = darsh.line(df, x="date", y="revenue", interactive=True)
fig_2d.show()

# 3. Interactive 3D spatial scatter with camera rotation
fig_3d = darsh.scatter_3d(df, x="revenue", y="profit", z="units", title="3D Performance Space")
fig_3d.show()`,

    clean: `import darsh
import pandas as pd

# 1. Messy real-world sample DataFrame
raw_df = pd.DataFrame({
    "Customer Name ": ["Alice", "Bob", "Alice", "Charlie"],
    "Annual Rev ($)": [120000, None, 120000, 85000],
    "Join Date": ["2023-01-15", "2023-03-20", "2023-01-15", "2023-06-10"]
})

# 2. Clean, deduplicate, and impute in one chain
clean_df = (
    raw_df
    .darsh.clean_names()                   # Normalizes column headers to snake_case
    .darsh.drop_duplicates()               # Eliminates duplicate records
    .darsh.fill_missing(strategy="smart")  # Imputes numeric medians & categorical modes
    .darsh.infer_types()                   # Casts dates and numerical types automatically
)

# 3. Calculate objective data health score (0-100)
score = clean_df.darsh.quality_score()
print(f"Data Health Score: {score:.1f} / 100")
print(clean_df)`,

    dash: `import darsh
import pandas as pd

# 1. Sample business data
df = pd.DataFrame({
    "month": ["Jan", "Feb", "Mar", "Apr", "May"],
    "channel": ["Online", "Retail", "Online", "Retail", "Online"],
    "revenue": [42000, 31000, 58000, 49000, 63000]
})

# 2. Create charts to embed in dashboard
c1 = darsh.line(df, x="month", y="revenue", title="Revenue Growth")
c2 = darsh.bar(df, x="channel", y="revenue", title="Channel Breakdown")

# 3. Initialize reactive dashboard portal
app = darsh.dashboard(
    title="Executive Portal",
    charts=[c1, c2],
    data=df,
    kpis=[
        darsh.kpi("Total Revenue", "$243K", delta="+18.4%"),
        darsh.kpi("Active Channels", "2", delta="Stable")
    ]
)

# 4. Launch local high-speed web server (opens browser at localhost:8080)
app.run(port=8080)`
  };

  if (view === "guide") {
    return <VisualizationGuide onBack={() => navigateTo("home")} />;
  }

  const tabs = {
    oneliners: {
      label: "1-Liners",
      tag: "Pure Simplicity",
      title: "Pass raw lists and dicts. Done.",
      desc: "Zero DataFrame boilerplate. Pass pure Python primitives directly, and Darsh normalizes geometry into an Apple-grade, calm figure.",
      code: currentDataset.code,
      preview: "line"
    },
    senior: {
      label: "Senior Customization",
      tag: "100% Native",
      title: "Never trapped behind a proprietary API.",
      desc: "Every call returns real matplotlib Axes. Chain log scales, benchmark reference lines, and annotations with zero wrapper interference.",
      code: `import darsh
import matplotlib.pyplot as plt

# 1. Publication-grade base chart
ax = darsh.line([100, 280, 750, 2400, 8500], title="ARR Trajectory", color="#6366F1")

# 2. Standard matplotlib methods work 100% natively
ax.set_yscale("${seniorScale}")
ax.axhline(${benchmarkTarget}, color="#EF4444", linestyle=":", label="Benchmark ($${benchmarkTarget.toLocaleString()})")
ax.annotate("Inflection Point", xy=(2, 750), xytext=(1.2, 2500),
            arrowprops=dict(facecolor="#38BDF8", shrink=0.08))
ax.legend()

# 3. Display figure
plt.show()`,
      preview: "senior"
    },
    interactive: {
      label: "Interactive 2D & 3D",
      tag: "Plotly Powered",
      title: "Effortless interactive inspections.",
      desc: "Pass interactive=True or call 3D functions. Includes self-healing notebook renderers with zero nbformat setup headaches.",
      code: `import darsh
import pandas as pd

# 1. Sample data
df = pd.DataFrame({
    "date": ["2024-Q1", "2024-Q2", "2024-Q3", "2024-Q4"],
    "revenue": [120, 185, 210, 290],
    "profit": [35, 55, 62, 95],
    "units_sold": [450, 710, 830, 1150]
})

# 2. Interactive 2D inspection & 3D coordinate space
fig_2d = darsh.line(df, x="date", y="revenue", interactive=True)
fig_3d = darsh.scatter_3d(df, x="revenue", y="profit", z="units_sold")

# 3. Display inline in notebooks or browser
fig_2d.show()
fig_3d.show()`,
      preview: "3d"
    },
    grids: {
      label: "Cards & Grids",
      tag: "Fluid Auto-Balance",
      title: "Executive briefing layouts that breathe.",
      desc: "Responsive auto-balanced grids. SVGs scale fluidly via viewBox with zero text clipping or horizontal leaks.",
      code: `import darsh
import pandas as pd

# 1. Sample metrics DataFrame
df = pd.DataFrame({
    "date": ["Mon", "Tue", "Wed", "Thu", "Fri"],
    "channel": ["Direct", "Search", "Social", "Referral", "Email"],
    "revenue": [12000, 18500, 14200, 22000, 28000]
})

# 2. Compose metric cards
card_rev = darsh.card("Gross Revenue", "$4.2M", delta="+14.2%")
card_profit = darsh.card("Gross Profit", "$1.8M", delta="+8.6%")
card_csat = darsh.card("CSAT", "4.85/5.0")

# 3. Create subcharts
c1 = darsh.line(df, x="date", y="revenue", title="Revenue Trend")
c2 = darsh.bar(df, x="channel", y="revenue", title="Channel Revenue")

# 4. Auto-balance into a responsive grid (${gridCols} cols)
grid = darsh.grid([card_rev, card_profit, card_csat, c1, c2], cols=${gridCols})

# 5. Export to standalone HTML (or in Jupyter: simply type 'grid')
grid.save_html("dashboard.html")
print("✓ Dashboard successfully saved to dashboard.html")`,
      preview: "grid"
    },
    cleaning: {
      label: "Data Accessor",
      tag: "Auditable",
      title: "Clean and profile directly on DataFrames.",
      desc: "Deterministic cleaning and quality scoring on pandas via df.darsh.* with zero black-box magic.",
      code: `import darsh
import pandas as pd

# 1. Raw sample DataFrame with messy headers & missing values
raw_df = pd.DataFrame({
    "Customer Name ": ["Alice", "Bob", "Alice", "Charlie"],
    "Annual Rev ($)": [120000, None, 120000, 85000],
    "Join Date": ["2023-01-15", "2023-03-20", "2023-01-15", "2023-06-10"]
})

# 2. Transparent cleaning directly on pandas
clean_df = (
    raw_df
    .darsh.clean_names()
    .darsh.drop_duplicates()
    .darsh.fill_missing(strategy="smart")
    .darsh.infer_types()
)

# 3. Calculate data quality health score (0-100)
score = clean_df.darsh.quality_score()
print(f"Data Health Score: {score:.1f} / 100")
print(clean_df)`,
      preview: "cleaning"
    },
    dashboard: {
      label: "Reactive Dashboard",
      tag: "FastAPI Engine",
      title: "Deploy a live web app in one call.",
      desc: "Spin up a full-featured local dashboard server with instant cross-filters and dynamic SVG stream updates.",
      code: `import darsh
import pandas as pd

# 1. Sample business data
df = pd.DataFrame({
    "month": ["Jan", "Feb", "Mar", "Apr", "May"],
    "channel": ["Online", "Retail", "Online", "Retail", "Online"],
    "revenue": [42000, 31000, 58000, 49000, 63000]
})

# 2. Subcharts
c1 = darsh.line(df, x="month", y="revenue", title="Monthly Revenue")
c2 = darsh.bar(df, x="channel", y="revenue", title="Channel Revenue")

# 3. 1-line reactive web application
app = darsh.dashboard(
    title="Executive Performance",
    charts=[c1, c2],
    data=df,
    kpis=[darsh.kpi("Revenue", "revenue", agg="sum", prefix="$")]
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
      signature: "darsh.dashboard(title, charts, data, kpis=None, filters=None, theme='light')",
      desc: "Initializes a high-speed reactive FastAPI dashboard with real-time cross-filters.",
      returns: "darsh.dashboard.DashboardHandle",
      example: "app = darsh.dashboard(title='Portal', charts=[c1, c2], data=df); app.run(port=8080)"
    }
  ];

  const filteredApiDocs = apiDocs.filter((doc) => {
    const matchesCat = apiCategory === "all" || doc.category === apiCategory;
    const matchesQuery =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.signature.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="min-h-screen w-full bg-black text-white antialiased selection:bg-indigo-500/30 selection:text-white relative overflow-x-hidden font-sans">
      {/* ========================================================================= */}
      {/* APPLE DYNAMIC ISLAND NOTIFICATION TOAST */}
      {/* ========================================================================= */}
      {toastMessage && (
        <aside aria-label="Status notifications" className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-2.5 rounded-full bg-black/90 text-white text-xs font-medium border border-white/20 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_20px_rgba(99,102,241,0.2)] animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-none">
          <div className="relative flex items-center justify-center">
            <div className="size-2 rounded-full bg-emerald-400 animate-ping absolute" />
            <div className="size-2 rounded-full bg-emerald-400" />
          </div>
          <span className="font-semibold text-white tracking-tight">{toastMessage}</span>
          <span className="text-[10px] text-neutral-400 pl-1 border-l border-white/10 font-mono hidden sm:inline">
            Ready to paste
          </span>
        </aside>
      )}

      {/* ========================================================================= */}
      {/* APPLE STUDIO LIGHTING & SPECULAR BEAMS */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 -z-20 h-full w-full bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Radiant Spotlight Cone */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1300px] h-[750px] bg-[radial-gradient(ellipse_closest-side,rgba(99,102,241,0.18),rgba(56,189,248,0.06),transparent_75%)] blur-[130px] pointer-events-none -z-10" />

      {/* Specular Horizontal Light Horizon */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-px bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent pointer-events-none -z-10" />

      {/* ========================================================================= */}
      {/* APPLE-INSPIRED FROSTED GLASS HEADER */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-2xl bg-black/75 border-b border-white/[0.08] transition-all">
        <div className="w-full max-w-[1500px] mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="size-7 rounded-lg bg-gradient-to-tr from-indigo-500 via-sky-400 to-emerald-400 p-[1px] shadow-[0_0_14px_rgba(99,102,241,0.35)] group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-black rounded-[7px] flex items-center justify-center">
                  <span className="text-white text-xs font-bold font-mono">D</span>
                </div>
              </div>
              <span className="font-semibold text-lg tracking-tight text-white group-hover:text-neutral-200 transition-colors">
                Darsh
              </span>
            </a>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/[0.05] text-neutral-400 border border-white/[0.08] flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              v2.0.1
            </span>
          </div>

          <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-8 text-[13.5px] font-medium text-neutral-400">
            <a href="#playground" className="hover:text-white transition-colors">Playground</a>
            <a href="#philosophy" className="hover:text-white transition-colors">Philosophy</a>
            <a href="#advantages" className="hover:text-white transition-colors">Architecture</a>
            <a href="#docs" className="hover:text-white transition-colors">Plain English</a>
            <a href="#api" className="hover:text-white transition-colors">API Explorer</a>
            <button
              onClick={() => navigateTo("guide")}
              className="hover:text-white transition-colors flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 font-medium border border-indigo-500/20"
            >
              <BookOpen className="size-3.5 text-indigo-400" />
              <span>Learning Hub</span>
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => copyToClipboard("pip install --upgrade darsh", "nav-pip", "Copied: pip install --upgrade darsh")}
              className="hidden sm:inline-flex items-center gap-2 h-8 px-3.5 rounded-full text-[12px] font-mono bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white border border-white/[0.08] apple-glass-hover active:scale-95 transition-all shadow-sm"
            >
              {copiedKey === "nav-pip" ? (
                <>
                  <Check className="size-3 text-emerald-400" />
                  <span className="text-emerald-400 font-sans font-medium">Copied</span>
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
              className="size-8 inline-flex items-center justify-center rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-neutral-400 hover:text-white transition-all hover:scale-105"
              title="PyPI Package"
            >
              <PyPIIcon className="size-4" />
            </a>

            <a
              href="https://github.com/satyamranatc/Darsh"
              target="_blank"
              rel="noreferrer"
              className="size-8 inline-flex items-center justify-center rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-neutral-400 hover:text-white transition-all hover:scale-105"
              title="GitHub"
            >
              <GithubIcon className="size-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Landmark */}
      <main id="main-content" className="relative z-10 w-full">
        {/* ========================================================================= */}
        {/* APPLE-INSPIRED HERO SECTION */}
        {/* ========================================================================= */}
        <section className="relative z-10 w-full pt-28 pb-28 sm:pt-40 sm:pb-36 px-6 sm:px-12 max-w-[1500px] mx-auto text-center flex flex-col items-center">
        {/* Apple Dynamic Pill Badge */}
        <div className="relative inline-flex overflow-hidden rounded-full p-[1px] mb-8 shadow-2xl group cursor-pointer hover:scale-[1.02] transition-transform">
          <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#4F46E5_0%,#38BDF8_50%,#4F46E5_100%)] opacity-60" />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-950/90 text-[12.5px] font-medium text-neutral-300 backdrop-blur-3xl border border-white/10">
            <Sparkles className="size-3.5 text-indigo-400 animate-pulse" />
            <span>Darsh v2.0.1 Released &middot; Now live on PyPI</span>
            <ChevronRight className="size-3 text-neutral-500 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Apple Keynote Style Monumental Headline */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-[-0.045em] text-white mb-6 leading-[1.0] max-w-6xl">
          Clean data. <br />
          <span className="apple-gradient-hero">
            Calm charts.
          </span>
        </h1>

        {/* High-Elegance Breathing Subtitle */}
        <p className="text-lg sm:text-2xl text-neutral-400 max-w-3xl mx-auto mb-14 font-normal leading-relaxed tracking-tight">
          The modern Pythonic charting and dashboard engine. Built on top of pandas, matplotlib, and plotly with
          <span className="text-neutral-200 font-medium"> zero proprietary silos</span> and effortless 1-liners.
        </p>

        {/* Action Button Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-lg mb-20">
          <button
            onClick={() => copyToClipboard("pip install --upgrade darsh", "hero-pip", "Copied to clipboard: pip install darsh")}
            className="w-full sm:w-auto h-12 px-8 rounded-full bg-white hover:bg-neutral-100 text-black font-semibold text-[14px] flex items-center justify-center gap-2.5 transition-all shadow-[0_4px_24px_rgba(255,255,255,0.18)] apple-pill-btn"
          >
            {copiedKey === "hero-pip" ? (
              <>
                <Check className="size-4 text-emerald-600" />
                <span>Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Terminal className="size-4 text-neutral-700" />
                <span>pip install darsh</span>
              </>
            )}
          </button>

          <button
            onClick={() => navigateTo("guide")}
            className="w-full sm:w-auto h-12 px-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white font-medium text-[14px] border border-white/[0.12] flex items-center justify-center gap-2.5 transition-all group backdrop-blur-xl apple-pill-btn"
          >
            <BookOpen className="size-4 text-indigo-400" />
            <span>Masterpiece Guide</span>
            <ChevronRight className="size-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Apple-grade Specular Metrics Ticker */}
        <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-white/[0.08] text-center">
          <div className="p-6 rounded-2xl apple-card apple-card-hover relative overflow-hidden group">
            <div className="text-3xl font-bold text-white tracking-tight group-hover:scale-105 transition-transform">1-Line</div>
            <div className="text-[12px] text-neutral-400 mt-1 font-medium">Lists, dicts, arrays</div>
          </div>
          <div className="p-6 rounded-2xl apple-card apple-card-hover relative overflow-hidden group">
            <div className="text-3xl font-bold text-indigo-300 tracking-tight group-hover:scale-105 transition-transform">100%</div>
            <div className="text-[12px] text-neutral-400 mt-1 font-medium">Native Axes & Figures</div>
          </div>
          <div className="p-6 rounded-2xl apple-card apple-card-hover relative overflow-hidden group">
            <div className="text-3xl font-bold text-emerald-300 tracking-tight group-hover:scale-105 transition-transform">0</div>
            <div className="text-[12px] text-neutral-400 mt-1 font-medium">Proprietary silos</div>
          </div>
          <div className="p-6 rounded-2xl apple-card apple-card-hover relative overflow-hidden group">
            <div className="text-3xl font-bold text-sky-300 tracking-tight group-hover:scale-105 transition-transform">36/36</div>
            <div className="text-[12px] text-neutral-400 mt-1 font-medium">Pytest unit suite passing</div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* INTERACTIVE PLAYGROUND CANVAS (WITH MAC CONTROLS & LIVE HOVER) */}
      {/* ========================================================================= */}
      <section id="playground" className="relative z-10 w-full py-28 px-6 sm:px-12 max-w-[1500px] mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-neutral-400 mb-3">
            <Sliders className="size-3 text-indigo-400" />
            <span>Interactive Studio Canvas</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.035em] text-white mb-4">
            Designed for clarity
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto">
            Experience how Darsh turns complex data engineering into frictionless 1-liners and native figures.
          </p>
        </div>

        {/* Apple Segmented Control Island */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-2">
          <div className="inline-flex p-1.5 rounded-full bg-neutral-900/90 border border-white/[0.1] backdrop-blur-2xl shadow-2xl">
            {Object.keys(tabs).map((key) => {
              const tab = tabs[key];
              const active = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-5 py-2 rounded-full text-[13px] font-medium transition-all whitespace-nowrap ${
                    active
                      ? "bg-white text-black shadow-lg font-semibold scale-100"
                      : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mac Studio Window */}
        <div className="w-full rounded-3xl apple-card border border-white/[0.1] p-6 sm:p-12 overflow-hidden shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Mac Code Box */}
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

              {/* Mac Window Container */}
              <div className="rounded-2xl bg-black border border-white/[0.1] overflow-hidden shadow-xl">
                <div className="px-4 py-3 bg-white/[0.03] border-b border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-neutral-500">
                  <div className="flex items-center gap-2">
                    {/* Traffic Lights */}
                    <div className="flex items-center gap-1.5 mr-2">
                      <span className="size-2.5 rounded-full bg-[#FF5F56]/80 hover:bg-[#FF5F56] transition-colors" />
                      <span className="size-2.5 rounded-full bg-[#FFBD2E]/80 hover:bg-[#FFBD2E] transition-colors" />
                      <span className="size-2.5 rounded-full bg-[#27C93F]/80 hover:bg-[#27C93F] transition-colors" />
                    </div>
                    <span>darsh_demo.py</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(tabs[activeTab].code, `tab-${activeTab}`, "Copied snippet code")}
                    className="hover:text-white flex items-center gap-1.5 transition-colors font-sans text-xs px-2.5 py-1 rounded-md hover:bg-white/[0.06]"
                  >
                    {copiedKey === `tab-${activeTab}` ? (
                      <>
                        <Check className="size-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3 text-neutral-400" />
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

            {/* Right: Live Interactive Micro-Preview */}
            <div className="lg:col-span-6 rounded-2xl bg-black/90 border border-white/[0.08] p-7 min-h-[400px] flex flex-col justify-center relative shadow-inner">
              {/* TAB 1: LINE CHART WITH REAL-TIME HOVER INSPECTION & PRESETS */}
              {tabs[activeTab].preview === "line" && (
                <div className="space-y-4">
                  {/* Preset Selector & Controls */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
                    <div className="flex items-center gap-1.5 bg-white/[0.04] p-1 rounded-full border border-white/[0.08]">
                      {[
                        { id: "growth", label: "Weekly Growth" },
                        { id: "latency", label: "P99 Latency" },
                        { id: "nodes", label: "Cluster Nodes" }
                      ].map((p) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            setLinePreset(p.id);
                            setHoveredLinePoint(null);
                          }}
                          className={`px-3 py-1 rounded-full text-[11px] font-mono transition-colors ${
                            linePreset === p.id
                              ? "bg-white text-black font-semibold"
                              : "text-neutral-400 hover:text-white"
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setLineCurveStyle(lineCurveStyle === "curved" ? "linear" : "curved")}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-neutral-400 hover:text-white"
                        title="Toggle curve geometry"
                      >
                        {lineCurveStyle === "curved" ? "Bezier" : "Linear"}
                      </button>
                      <button
                        onClick={() => setShowAreaFill(!showAreaFill)}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full border transition-colors ${
                          showAreaFill
                            ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-300"
                            : "bg-white/[0.04] border-white/[0.08] text-neutral-400 hover:text-white"
                        }`}
                      >
                        Area Fill
                      </button>
                    </div>
                  </div>

                  {/* Active Tooltip Badge */}
                  <div className="h-7 flex items-center justify-center">
                    {hoveredLinePoint ? (
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-white/20 text-[11px] font-mono text-neutral-200 shadow-lg animate-in fade-in zoom-in-95">
                        <span className="font-bold text-white">{hoveredLinePoint.label}:</span>
                        <span className="text-emerald-400 font-semibold">{hoveredLinePoint.v} {currentDataset.unit}</span>
                        <span className="text-neutral-400">({hoveredLinePoint.note})</span>
                      </div>
                    ) : (
                      <span className="text-[11px] font-mono text-neutral-500">
                        Hover across any point on the trajectory below
                      </span>
                    )}
                  </div>

                  {/* Interactive SVG */}
                  <div className="h-44 w-full flex items-end">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 400 160">
                      <line x1="10" y1="145" x2="390" y2="145" stroke="#1f2937" strokeDasharray="3 3" strokeWidth="0.8" />
                      <line x1="10" y1="95" x2="390" y2="95" stroke="#1f2937" strokeDasharray="3 3" strokeWidth="0.8" />
                      <line x1="10" y1="45" x2="390" y2="45" stroke="#1f2937" strokeDasharray="3 3" strokeWidth="0.8" />

                      {/* Area Fill */}
                      {showAreaFill && (
                        <path
                          d={lineCurveStyle === "curved" ? currentDataset.curvedArea : currentDataset.linearArea}
                          fill={currentDataset.color}
                          opacity="0.12"
                          className="transition-all duration-300"
                        />
                      )}
                      
                      {/* Active vertical crosshair */}
                      {hoveredLinePoint && (
                        <line
                          x1={hoveredLinePoint.x}
                          y1="10"
                          x2={hoveredLinePoint.x}
                          y2="155"
                          stroke={currentDataset.color}
                          strokeDasharray="2 2"
                          strokeWidth="1.2"
                          opacity="0.8"
                        />
                      )}

                      {/* Stroke Line */}
                      <path
                        d={lineCurveStyle === "curved" ? currentDataset.curvedPath : currentDataset.linearPath}
                        fill="none"
                        stroke={currentDataset.color}
                        strokeWidth="2.5"
                        className="transition-all duration-300"
                      />

                      {currentDataset.points.map((pt, idx) => {
                        const isHovered = hoveredLinePoint?.label === pt.label;
                        return (
                          <g
                            key={idx}
                            onMouseEnter={() => setHoveredLinePoint(pt)}
                            onMouseLeave={() => setHoveredLinePoint(null)}
                            className="cursor-pointer"
                          >
                            {/* Hover Halo Ring */}
                            {isHovered && (
                              <circle
                                cx={pt.x}
                                cy={pt.y}
                                r="10"
                                fill={currentDataset.color}
                                opacity="0.35"
                                className="animate-ping"
                              />
                            )}
                            <circle
                              cx={pt.x}
                              cy={pt.y}
                              r={isHovered ? "6" : "4"}
                              fill={isHovered ? "#FFFFFF" : currentDataset.color}
                              stroke="#000000"
                              strokeWidth="2"
                              className="transition-all duration-150"
                            />
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  <div className="flex justify-between text-[11px] font-mono text-neutral-500 pt-1 border-t border-white/[0.04]">
                    {currentDataset.points.map((p, i) => (
                      <span
                        key={i}
                        className={hoveredLinePoint?.label === p.label ? "text-white font-bold" : ""}
                      >
                        {p.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: SENIOR CUSTOMIZATION WITH INTERACTIVE BENCHMARK & LOG TOGGLE */}
              {tabs[activeTab].preview === "senior" && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-3 text-xs">
                    <span className="font-medium text-white">ARR Trajectory</span>

                    <div className="flex items-center gap-3">
                      {/* Benchmark Target Selector */}
                      <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-full border border-white/[0.08]">
                        <span className="text-[10px] text-neutral-500 px-1 font-mono">Target:</span>
                        {[5000, 7500, 10000].map((val) => (
                          <button
                            key={val}
                            onClick={() => setBenchmarkTarget(val)}
                            className={`px-2 py-0.5 rounded-full text-[10px] font-mono transition-colors ${
                              benchmarkTarget === val
                                ? "bg-red-500 text-white font-semibold"
                                : "text-neutral-400 hover:text-white"
                            }`}
                          >
                            ${(val / 1000).toFixed(1)}k
                          </button>
                        ))}
                      </div>

                      {/* Scale toggle */}
                      <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-full border border-white/[0.08]">
                        <button
                          onClick={() => setSeniorScale("linear")}
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono transition-colors ${
                            seniorScale === "linear" ? "bg-white text-black font-semibold" : "text-neutral-400 hover:text-white"
                          }`}
                        >
                          Linear
                        </button>
                        <button
                          onClick={() => setSeniorScale("log")}
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono transition-colors ${
                            seniorScale === "log" ? "bg-indigo-500 text-white font-semibold" : "text-neutral-400 hover:text-white"
                          }`}
                        >
                          Log
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="h-44 w-full flex items-center justify-center">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 400 160">
                      {/* Dynamic Benchmark Line */}
                      {(() => {
                        const targetY = benchmarkTarget === 5000 ? 65 : benchmarkTarget === 7500 ? 42 : 22;
                        return (
                          <g className="transition-all duration-300">
                            <line x1="20" y1={targetY} x2="380" y2={targetY} stroke="#EF4444" strokeDasharray="3 3" strokeWidth="1" />
                            <text x="375" y={targetY - 6} fill="#EF4444" fontSize="10" textAnchor="end" fontFamily="monospace">
                              Benchmark (${benchmarkTarget.toLocaleString()})
                            </text>
                          </g>
                        );
                      })()}
                      
                      {seniorScale === "log" ? (
                        <path
                          d="M 20 150 Q 140 130, 220 90 T 360 20"
                          fill="none"
                          stroke="#6366F1"
                          strokeWidth="2.5"
                          className="transition-all duration-300"
                        />
                      ) : (
                        <path
                          d="M 20 150 Q 220 145, 300 110 T 360 20"
                          fill="none"
                          stroke="#6366F1"
                          strokeWidth="2.5"
                          className="transition-all duration-300"
                        />
                      )}

                      <circle cx="220" cy="90" r="4" fill="#38BDF8" />
                      <rect x="130" y="25" width="95" height="24" rx="6" fill="#111115" stroke="#38BDF8" strokeWidth="0.8" />
                      <text x="177" y="41" fill="#38BDF8" fontSize="10" textAnchor="middle" fontWeight="bold">
                        Inflection Point
                      </text>
                    </svg>
                  </div>
                  <div className="text-[11px] text-neutral-400 font-mono text-center">
                    plt.savefig('arr.png') works 100% natively without wrapper interference
                  </div>
                </div>
              )}

              {/* TAB 3: 3D SPATIAL SCATTER WITH INTERACTIVE CAMERAS */}
              {tabs[activeTab].preview === "3d" && (
                <div className="space-y-4 text-center">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-3 text-xs">
                    <span className="font-medium text-white">3D Spatial Coordinate Space</span>
                    <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-full border border-white/[0.08]">
                      {[
                        { id: "isometric", label: "Isometric" },
                        { id: "front", label: "Front" },
                        { id: "top", label: "Top-Down" },
                        { id: "orbit", label: "Orbit Spin" }
                      ].map((ang) => (
                        <button
                          key={ang.id}
                          onClick={() => setSpatialAngle(ang.id)}
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono transition-colors ${
                            spatialAngle === ang.id
                              ? "bg-white text-black font-semibold"
                              : "text-neutral-400 hover:text-white"
                          }`}
                        >
                          {ang.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="h-44 flex items-center justify-center overflow-hidden">
                    <div
                      className={`w-64 h-36 border border-neutral-800 rounded-2xl flex items-center justify-center relative bg-white/[0.02] shadow-2xl transition-all duration-700 ${
                        spatialAngle === "isometric"
                          ? "-rotate-6 skew-y-6 scale-95"
                          : spatialAngle === "front"
                          ? "rotate-0 skew-y-0 scale-100"
                          : spatialAngle === "top"
                          ? "rotate-12 scale-90 -skew-x-12"
                          : "rotate-6 -skew-y-6 animate-pulse"
                      }`}
                    >
                      {/* Interactive 3D Points */}
                      <div
                        onMouseEnter={() => setHovered3dPoint({ name: "Node A", rev: "$120k", profit: "$35k", units: 450 })}
                        onMouseLeave={() => setHovered3dPoint(null)}
                        className="absolute top-4 left-8 size-3 rounded-full bg-emerald-400 cursor-pointer hover:scale-150 transition-transform shadow-[0_0_10px_#10B981]"
                      />
                      <div
                        onMouseEnter={() => setHovered3dPoint({ name: "Node B", rev: "$185k", profit: "$55k", units: 710 })}
                        onMouseLeave={() => setHovered3dPoint(null)}
                        className="absolute top-12 right-12 size-3.5 rounded-full bg-sky-400 cursor-pointer hover:scale-150 transition-transform shadow-[0_0_10px_#38BDF8]"
                      />
                      <div
                        onMouseEnter={() => setHovered3dPoint({ name: "Node C", rev: "$210k", profit: "$62k", units: 830 })}
                        onMouseLeave={() => setHovered3dPoint(null)}
                        className="absolute bottom-6 left-16 size-4 rounded-full bg-indigo-500 cursor-pointer hover:scale-150 transition-transform shadow-[0_0_12px_#6366F1]"
                      />
                      <div
                        onMouseEnter={() => setHovered3dPoint({ name: "Node D", rev: "$290k", profit: "$95k", units: 1150 })}
                        onMouseLeave={() => setHovered3dPoint(null)}
                        className="absolute bottom-10 right-20 size-2.5 rounded-full bg-amber-400 cursor-pointer hover:scale-150 transition-transform shadow-[0_0_10px_#F59E0B]"
                      />

                      {hovered3dPoint ? (
                        <div className="bg-black/90 border border-white/20 px-3 py-1.5 rounded-lg text-[10px] font-mono text-white shadow-xl animate-in fade-in">
                          <span className="text-indigo-400 font-bold">{hovered3dPoint.name}:</span> Rev {hovered3dPoint.rev} &middot; Profit {hovered3dPoint.profit} &middot; {hovered3dPoint.units} units
                        </div>
                      ) : (
                        <div className="text-[10px] font-mono text-neutral-500">
                          X: Revenue &middot; Y: Profit &middot; Z: Units
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-[11px] text-neutral-500">
                    Self-healing notebook renderers ensure zero nbformat exceptions
                  </div>
                </div>
              )}

              {/* TAB 4: FLUID BALANCED GRID WITH INTERACTIVE COLS */}
              {tabs[activeTab].preview === "grid" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 text-xs">
                    <span className="text-white font-medium">Auto-Balanced Grid Engine</span>
                    <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-full border border-white/[0.08]">
                      <button
                        onClick={() => setGridCols(2)}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono transition-colors ${
                          gridCols === 2 ? "bg-white text-black font-semibold" : "text-neutral-400 hover:text-white"
                        }`}
                      >
                        2 Cols
                      </button>
                      <button
                        onClick={() => setGridCols(3)}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono transition-colors ${
                          gridCols === 3 ? "bg-white text-black font-semibold" : "text-neutral-400 hover:text-white"
                        }`}
                      >
                        3 Cols
                      </button>
                    </div>
                  </div>

                  <div className={`grid gap-2 ${gridCols === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
                    <div
                      onClick={() => setActiveKpiCard("rev")}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        activeKpiCard === "rev"
                          ? "bg-indigo-500/15 border-indigo-500/40 shadow-sm"
                          : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]"
                      }`}
                    >
                      <div className="text-[10px] text-neutral-500 uppercase font-medium">Revenue</div>
                      <div className="text-base font-bold text-white">$4.2M</div>
                      <span className="text-[10px] text-emerald-400 font-medium">+14.2%</span>
                    </div>

                    <div
                      onClick={() => setActiveKpiCard("profit")}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        activeKpiCard === "profit"
                          ? "bg-indigo-500/15 border-indigo-500/40 shadow-sm"
                          : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]"
                      }`}
                    >
                      <div className="text-[10px] text-neutral-500 uppercase font-medium">Profit</div>
                      <div className="text-base font-bold text-white">$1.8M</div>
                      <span className="text-[10px] text-emerald-400 font-medium">+8.6%</span>
                    </div>

                    {gridCols === 3 && (
                      <div
                        onClick={() => setActiveKpiCard("csat")}
                        className={`p-3 rounded-xl border transition-all cursor-pointer ${
                          activeKpiCard === "csat"
                            ? "bg-indigo-500/15 border-indigo-500/40 shadow-sm"
                            : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]"
                        }`}
                      >
                        <div className="text-[10px] text-neutral-500 uppercase font-medium">CSAT</div>
                        <div className="text-base font-bold text-white">4.85</div>
                        <span className="text-[10px] text-sky-400 font-medium">Leader</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] h-20 flex flex-col justify-between">
                      <span className="text-[10px] text-neutral-400 font-medium">Weekly Trajectory</span>
                      <div className="h-6 w-full bg-indigo-500/20 border-t border-indigo-400 rounded-sm" />
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

              {/* TAB 5: DATA CLEANING AUDIT WITH RAW VS CLEANED TOGGLE */}
              {tabs[activeTab].preview === "cleaning" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 text-xs">
                    <span className="text-white font-medium">DataFrame Health Audit</span>
                    <div className="flex items-center gap-1 bg-white/[0.04] p-1 rounded-full border border-white/[0.08]">
                      <button
                        onClick={() => setCleaningView("raw")}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono transition-colors ${
                          cleaningView === "raw" ? "bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30" : "text-neutral-400 hover:text-white"
                        }`}
                      >
                        Raw Dirty Data
                      </button>
                      <button
                        onClick={() => setCleaningView("cleaned")}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono transition-colors ${
                          cleaningView === "cleaned" ? "bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30" : "text-neutral-400 hover:text-white"
                        }`}
                      >
                        Cleaned (df.darsh.*)
                      </button>
                    </div>
                  </div>

                  {cleaningView === "raw" ? (
                    <div className="space-y-2 text-[11px] animate-in fade-in">
                      <div className="flex items-center justify-between p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200">
                        <span>Column Headers: "Customer Name ", "Annual Rev ($)"</span>
                        <span className="font-mono text-rose-400 font-bold">Trailing space &amp; symbols</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-200">
                        <span>Row 2: Missing Annual Revenue</span>
                        <span className="font-mono text-rose-400 font-bold">NaN (Null record)</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200">
                        <span>Row 3: Duplicate Record (Alice, $120k)</span>
                        <span className="font-mono text-amber-400 font-bold">Duplicate row</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-900 border border-white/[0.06] text-neutral-400">
                        <span>Raw Quality Rating:</span>
                        <span className="font-mono text-amber-400 font-bold">54.2 / 100</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 text-[11px] animate-in fade-in">
                      <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200">
                        <span>snake_case: customer_name, annual_rev, join_date</span>
                        <span className="font-mono text-emerald-400 font-bold">Normalized ✓</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200">
                        <span>Missing values smart median imputation</span>
                        <span className="font-mono text-emerald-400 font-bold">0 nulls remaining ✓</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200">
                        <span>Duplicate rows purged with drop_duplicates()</span>
                        <span className="font-mono text-emerald-400 font-bold">0 duplicates ✓</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-900 border border-white/[0.06] text-neutral-200">
                        <span>Darsh Health Hygiene Score:</span>
                        <span className="font-mono text-emerald-400 font-bold text-sm">98.4 / 100</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 6: REACTIVE FASTAPI DASHBOARD */}
              {tabs[activeTab].preview === "dashboard" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs border-b border-white/[0.06] pb-2">
                    <span className="text-white font-medium">FastAPI Reactive Server</span>
                    <span className="text-emerald-400 text-[10px] flex items-center gap-1 font-mono">
                      <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      localhost:8080 &middot; 3ms latency
                    </span>
                  </div>

                  {/* Channel Filter interactive toggle */}
                  <div className="flex gap-2">
                    {["all", "online", "retail"].map((ch) => (
                      <button
                        key={ch}
                        onClick={() => setDashboardChannel(ch)}
                        className={`px-3 py-1 rounded-full text-[11px] font-mono capitalize transition-all ${
                          dashboardChannel === ch
                            ? "bg-white text-black font-semibold shadow-sm"
                            : "bg-white/[0.04] text-neutral-400 hover:text-white border border-white/[0.06]"
                        }`}
                      >
                        {ch === "all" ? "All Channels" : ch}
                      </button>
                    ))}
                  </div>

                  <div className="h-28 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col items-center justify-center text-xs text-neutral-400 font-mono gap-1.5">
                    <span className="text-white font-bold text-base">
                      {dashboardChannel === "all" && "$243,000 Total Gross"}
                      {dashboardChannel === "online" && "$163,000 Online Stream"}
                      {dashboardChannel === "retail" && "$80,000 Retail Storefront"}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-emerald-400 font-semibold">
                        Instant JSON cross-filter in 2.8ms
                      </span>
                      <span className="text-[10px] text-neutral-500">
                        ({dashboardChannel === "all" ? "5 records" : dashboardChannel === "online" ? "3 records" : "2 records"})
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PHILOSOPHY & CORE MANIFESTO (APPLE KEYNOTE MANIFESTO) */}
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
            The developer should not feel like they are wrestling FastAPI, Pandas, SVG, JavaScript, CSS, or a charting engine.
            All complexity disappears behind an intuitive, elegant Darsh API.
          </p>
        </div>

        {/* 3 Specular Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-6xl mx-auto">
          <div className="p-8 rounded-3xl apple-card apple-card-hover relative overflow-hidden">
            <div className="text-white font-semibold text-lg mb-2">Zero Lock-in</div>
            <p className="text-sm text-neutral-400 leading-relaxed font-normal">
              Never outputs proprietary chart wrappers. Every function yields native matplotlib or plotly objects you already know and trust.
            </p>
          </div>
          <div className="p-8 rounded-3xl apple-card apple-card-hover relative overflow-hidden">
            <div className="text-white font-semibold text-lg mb-2">Nordic Calm</div>
            <p className="text-sm text-neutral-400 leading-relaxed font-normal">
              Palettes engineered to eliminate visual fatigue. Subdued gridlines, crisp contrast, and refined typography designed for cognitive ease.
            </p>
          </div>
          <div className="p-8 rounded-3xl apple-card apple-card-hover relative overflow-hidden">
            <div className="text-white font-semibold text-lg mb-2">Product Feel</div>
            <p className="text-sm text-neutral-400 leading-relaxed font-normal">
              Making data analytics feel less like writing script boilerplate and more like composing a modern, responsive digital product.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* APPLE BENTO GRID: ARCHITECTURE & ENGINEERING ADVANTAGES (#advantages) */}
      {/* ========================================================================= */}
      <section id="advantages" className="relative z-10 w-full py-32 px-6 sm:px-12 max-w-[1500px] mx-auto border-t border-white/[0.08]">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[12px] text-neutral-300 mb-4">
            <Cpu className="size-3.5 text-sky-400" />
            <span>Architecture &amp; Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.035em] text-white mb-4">
            Engineered for zero friction
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed font-normal max-w-2xl mx-auto">
            Deep dive into the architecture that lets Darsh deliver effortless 1-liners without compromising power or interoperability.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Bento Card 1 (Large 2-col) */}
          <div className="md:col-span-2 p-8 sm:p-10 rounded-3xl bg-[#08080a] border border-white/[0.08] relative overflow-hidden apple-glass-hover flex flex-col justify-between">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
            <div>
              <div className="size-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-5">
                <Layers className="size-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
                Zero Lock-In: 100% Native Interoperability
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed max-w-xl mb-6">
                Unlike closed dashboard frameworks, Darsh returns standard <code className="text-neutral-200">matplotlib.axes.Axes</code> and <code className="text-neutral-200">plotly.graph_objects.Figure</code> instances. Use all existing plugins, custom tick formatters, annotations, and <code className="text-neutral-200">plt.savefig()</code> without wrapper translation hurdles.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-black border border-white/[0.06] font-mono text-xs text-neutral-400 flex items-center justify-between">
              <span>assert isinstance(ax, matplotlib.axes.Axes)</span>
              <span className="text-emerald-400 font-semibold">True ✓</span>
            </div>
          </div>

          {/* Bento Card 2 */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#08080a] border border-white/[0.08] relative overflow-hidden apple-glass-hover flex flex-col justify-between">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />
            <div>
              <div className="size-10 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-5">
                <Eye className="size-5" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                Nordic Calm Palette
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Color palettes mathematically tuned for WCAG AAA contrast ratio, eliminating eye fatigue during extensive analytical review.
              </p>
            </div>
            <div className="flex gap-2 pt-6">
              {["#6366F1", "#38BDF8", "#10B981", "#F59E0B", "#EC4899"].map((hex) => (
                <div
                  key={hex}
                  onClick={() => copyToClipboard(hex, `hex-${hex}`, `Copied ${hex}`)}
                  className="size-7 rounded-full cursor-pointer hover:scale-110 transition-transform border border-white/20"
                  style={{ backgroundColor: hex }}
                  title={`Click to copy ${hex}`}
                />
              ))}
            </div>
          </div>

          {/* Bento Card 3 */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#08080a] border border-white/[0.08] relative overflow-hidden apple-glass-hover flex flex-col justify-between">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
            <div>
              <div className="size-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5">
                <Zap className="size-5" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                FastAPI Reactive Engine
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Local dashboard servers compile to high-speed async endpoints, serving interactive SVG updates under 5ms.
              </p>
            </div>
            <div className="pt-4 text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-400" />
              <span>Sub-5ms WebSocket stream latency</span>
            </div>
          </div>

          {/* Bento Card 4 (Large 2-col) */}
          <div className="md:col-span-2 p-8 sm:p-10 rounded-3xl bg-[#08080a] border border-white/[0.08] relative overflow-hidden apple-glass-hover flex flex-col justify-between">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
            <div>
              <div className="size-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-5">
                <ShieldCheck className="size-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
                Auditable DataFrame Accessors (<code className="text-indigo-300">df.darsh.*</code>)
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed max-w-xl mb-6">
                Clean and profile without breaking pandas workflows. Chain snake_case naming, mode/median imputation, and compute reproducible 0-100 hygiene ratings with full transparency.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-black border border-white/[0.06]">
                <div className="text-neutral-500 text-[10px]">VECTORIZED</div>
                <div className="text-white font-bold">1M+ rows/s</div>
              </div>
              <div className="p-3 rounded-xl bg-black border border-white/[0.06]">
                <div className="text-neutral-500 text-[10px]">DETERMINISTIC</div>
                <div className="text-emerald-400 font-bold">100% Auditable</div>
              </div>
              <div className="p-3 rounded-xl bg-black border border-white/[0.06]">
                <div className="text-neutral-500 text-[10px]">UNIT SUITE</div>
                <div className="text-sky-300 font-bold">36/36 Passing</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* "HOW TO USE DARSH IN PLAIN ENGLISH" (FULL RUNNABLE SCRIPTS WITH SAMPLE DATA) */}
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
            clear layman explanations, and visual previews. Every code block is fully runnable with sample data and necessary imports included.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16 max-w-4xl mx-auto">
          {[
            { id: "all", label: "All Guides (7)" },
            { id: "everyday", label: "Everyday Charts" },
            { id: "executive", label: "Cards & Grids" },
            { id: "interactive", label: "Interactive & 3D" },
            { id: "cleaning", label: "Painless Cleaning" },
            { id: "dashboard", label: "Live Dashboard" }
          ].map((cat) => (
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
          {/* 1. LINE CHART */}
          {(docCategory === "all" || docCategory === "everyday") && (
            <div className="rounded-3xl bg-[#08080a] border border-white/[0.08] p-8 sm:p-10 shadow-2xl relative overflow-hidden apple-glass-hover">
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
                <div className="lg:col-span-7 rounded-2xl bg-black border border-white/[0.08] overflow-hidden">
                  <div className="px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-500">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 mr-1">
                        <span className="size-2 rounded-full bg-[#FF5F56]/80" />
                        <span className="size-2 rounded-full bg-[#FFBD2E]/80" />
                        <span className="size-2 rounded-full bg-[#27C93F]/80" />
                      </div>
                      <span>line_chart.py</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-sans">
                        Full runnable file
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(plainEnglishSnippets.line, "doc-line", "Copied runnable line chart script")}
                      className="hover:text-white flex items-center gap-1.5 transition-colors font-sans text-xs"
                    >
                      {copiedKey === "doc-line" ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                      <span>{copiedKey === "doc-line" ? "Copied Full Code" : "Copy Full Code"}</span>
                    </button>
                  </div>
                  <div className="p-5 font-mono text-[13px] leading-relaxed">
                    <div><span className="text-purple-400">import</span> <span className="text-white">darsh</span></div>
                    <div><span className="text-purple-400">import</span> <span className="text-white">matplotlib.pyplot</span> <span className="text-purple-400">as</span> <span className="text-white">plt</span></div>
                    <div className="mt-2 text-neutral-500"># 1. Sample data: Weekly active metric</div>
                    <div><span className="text-white">weekly_data</span> = [<span className="text-amber-300">12</span>, <span className="text-amber-300">28</span>, <span className="text-amber-300">19</span>, <span className="text-amber-300">45</span>, <span className="text-amber-300">62</span>, <span className="text-amber-300">58</span>]</div>
                    <div className="mt-2 text-neutral-500"># 2. Render publication-grade line chart in 1 call</div>
                    <div><span className="text-white">ax</span> = <span className="text-sky-300">darsh.line</span>(<span className="text-white">weekly_data</span>, <span className="text-neutral-400">title</span>=<span className="text-emerald-300">"Weekly Growth"</span>)</div>
                    <div className="mt-2 text-neutral-500"># 3. Display chart (or save: ax.figure.savefig("growth.png"))</div>
                    <div><span className="text-white">plt.</span><span className="text-sky-300">show</span>()</div>
                  </div>
                </div>

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

          {/* 2. BAR CHART */}
          {(docCategory === "all" || docCategory === "everyday") && (
            <div className="rounded-3xl bg-[#08080a] border border-white/[0.08] p-8 sm:p-10 shadow-2xl relative overflow-hidden apple-glass-hover">
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
                <div className="lg:col-span-7 rounded-2xl bg-black border border-white/[0.08] overflow-hidden">
                  <div className="px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-500">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 mr-1">
                        <span className="size-2 rounded-full bg-[#FF5F56]/80" />
                        <span className="size-2 rounded-full bg-[#FFBD2E]/80" />
                        <span className="size-2 rounded-full bg-[#27C93F]/80" />
                      </div>
                      <span>bar_chart.py</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-sans">
                        Full runnable file
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(plainEnglishSnippets.bar, "doc-bar", "Copied runnable bar chart script")}
                      className="hover:text-white flex items-center gap-1.5 transition-colors font-sans text-xs"
                    >
                      {copiedKey === "doc-bar" ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                      <span>{copiedKey === "doc-bar" ? "Copied Full Code" : "Copy Full Code"}</span>
                    </button>
                  </div>
                  <div className="p-5 font-mono text-[13px] leading-relaxed">
                    <div><span className="text-purple-400">import</span> <span className="text-white">darsh</span></div>
                    <div><span className="text-purple-400">import</span> <span className="text-white">matplotlib.pyplot</span> <span className="text-purple-400">as</span> <span className="text-white">plt</span></div>
                    <div className="mt-2 text-neutral-500"># 1. Sample data: Team performance metrics</div>
                    <div><span className="text-white">team_scores</span> = {'{'}</div>
                    <div className="pl-4"><span className="text-emerald-300">"Design"</span>: <span className="text-amber-300">92</span>,</div>
                    <div className="pl-4"><span className="text-emerald-300">"Engineering"</span>: <span className="text-amber-300">96</span>,</div>
                    <div className="pl-4"><span className="text-emerald-300">"Product"</span>: <span className="text-amber-300">88</span></div>
                    <div>{'}'}</div>
                    <div className="mt-2 text-neutral-500"># 2. Render sorted bar chart (pass horizontal=True for horizontal layout)</div>
                    <div><span className="text-white">ax</span> = <span className="text-sky-300">darsh.bar</span>(<span className="text-white">team_scores</span>, <span className="text-neutral-400">title</span>=<span className="text-emerald-300">"Team Performance"</span>)</div>
                    <div className="mt-2 text-neutral-500"># 3. Display chart</div>
                    <div><span className="text-white">plt.</span><span className="text-sky-300">show</span>()</div>
                  </div>
                </div>

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

          {/* 3. DONUT / PIE CHART */}
          {(docCategory === "all" || docCategory === "everyday") && (
            <div className="rounded-3xl bg-[#08080a] border border-white/[0.08] p-8 sm:p-10 shadow-2xl relative overflow-hidden apple-glass-hover">
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
                <div className="lg:col-span-7 rounded-2xl bg-black border border-white/[0.08] overflow-hidden">
                  <div className="px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-500">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 mr-1">
                        <span className="size-2 rounded-full bg-[#FF5F56]/80" />
                        <span className="size-2 rounded-full bg-[#FFBD2E]/80" />
                        <span className="size-2 rounded-full bg-[#27C93F]/80" />
                      </div>
                      <span>donut_chart.py</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-sans">
                        Full runnable file
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(plainEnglishSnippets.donut, "doc-donut", "Copied runnable donut chart script")}
                      className="hover:text-white flex items-center gap-1.5 transition-colors font-sans text-xs"
                    >
                      {copiedKey === "doc-donut" ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                      <span>{copiedKey === "doc-donut" ? "Copied Full Code" : "Copy Full Code"}</span>
                    </button>
                  </div>
                  <div className="p-5 font-mono text-[13px] leading-relaxed">
                    <div><span className="text-purple-400">import</span> <span className="text-white">darsh</span></div>
                    <div><span className="text-purple-400">import</span> <span className="text-white">matplotlib.pyplot</span> <span className="text-purple-400">as</span> <span className="text-white">plt</span></div>
                    <div className="mt-2 text-neutral-500"># 1. Sample data: Revenue breakdown proportions</div>
                    <div><span className="text-white">revenue_mix</span> = {'{'}</div>
                    <div className="pl-4"><span className="text-emerald-300">"Cloud"</span>: <span className="text-amber-300">60</span>,</div>
                    <div className="pl-4"><span className="text-emerald-300">"Hardware"</span>: <span className="text-amber-300">25</span>,</div>
                    <div className="pl-4"><span className="text-emerald-300">"Services"</span>: <span className="text-amber-300">15</span></div>
                    <div>{'}'}</div>
                    <div className="mt-2 text-neutral-500"># 2. Render modern hollow donut chart</div>
                    <div><span className="text-white">ax</span> = <span className="text-sky-300">darsh.donut</span>(<span className="text-white">revenue_mix</span>, <span className="text-neutral-400">title</span>=<span className="text-emerald-300">"Revenue Mix"</span>)</div>
                    <div className="mt-2 text-neutral-500"># 3. Display chart</div>
                    <div><span className="text-white">plt.</span><span className="text-sky-300">show</span>()</div>
                  </div>
                </div>

                <div className="lg:col-span-5 rounded-2xl bg-black border border-white/[0.08] p-6 text-center">
                  <div className="text-xs font-medium text-white mb-1">Revenue Mix</div>
                  <div className="text-[10px] text-neutral-500 mb-3">Exact visual output from Darsh</div>
                  <div className="h-36 w-full flex items-center justify-center">
                    <svg className="size-32" viewBox="0 0 100 100">
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

          {/* 4. EXECUTIVE CARDS & GRID */}
          {(docCategory === "all" || docCategory === "executive") && (
            <div className="rounded-3xl bg-[#08080a] border border-white/[0.08] p-8 sm:p-10 shadow-2xl relative overflow-hidden apple-glass-hover">
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
                <div className="lg:col-span-7 rounded-2xl bg-black border border-white/[0.08] overflow-hidden">
                  <div className="px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-500">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 mr-1">
                        <span className="size-2 rounded-full bg-[#FF5F56]/80" />
                        <span className="size-2 rounded-full bg-[#FFBD2E]/80" />
                        <span className="size-2 rounded-full bg-[#27C93F]/80" />
                      </div>
                      <span>dashboard_grid.py</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-sans">
                        Full runnable file
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(plainEnglishSnippets.grid, "doc-grid", "Copied runnable grid dashboard script")}
                      className="hover:text-white flex items-center gap-1.5 transition-colors font-sans text-xs"
                    >
                      {copiedKey === "doc-grid" ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                      <span>{copiedKey === "doc-grid" ? "Copied Full Code" : "Copy Full Code"}</span>
                    </button>
                  </div>
                  <div className="p-5 font-mono text-[13px] leading-relaxed">
                    <div><span className="text-purple-400">import</span> <span className="text-white">darsh</span></div>
                    <div><span className="text-purple-400">import</span> <span className="text-white">pandas</span> <span className="text-purple-400">as</span> <span className="text-white">pd</span></div>
                    <div className="mt-2 text-neutral-500"># 1. Sample business metrics DataFrame</div>
                    <div><span className="text-white">df</span> = <span className="text-white">pd.</span><span className="text-sky-300">DataFrame</span>({'{'}</div>
                    <div className="pl-4"><span className="text-emerald-300">"date"</span>: [<span className="text-emerald-300">"Mon"</span>, <span className="text-emerald-300">"Tue"</span>, <span className="text-emerald-300">"Wed"</span>, <span className="text-emerald-300">"Thu"</span>, <span className="text-emerald-300">"Fri"</span>],</div>
                    <div className="pl-4"><span className="text-emerald-300">"channel"</span>: [<span className="text-emerald-300">"Direct"</span>, <span className="text-emerald-300">"Search"</span>, <span className="text-emerald-300">"Social"</span>, <span className="text-emerald-300">"Referral"</span>, <span className="text-emerald-300">"Email"</span>],</div>
                    <div className="pl-4"><span className="text-emerald-300">"revenue"</span>: [<span className="text-amber-300">12000</span>, <span className="text-amber-300">18500</span>, <span className="text-amber-300">14200</span>, <span className="text-amber-300">22000</span>, <span className="text-amber-300">28000</span>]</div>
                    <div>{'}'})</div>
                    <div className="mt-2 text-neutral-500"># 2. Create executive metric cards</div>
                    <div><span className="text-white">card1</span> = <span className="text-sky-300">darsh.card</span>(<span className="text-emerald-300">"Total ARR"</span>, <span className="text-emerald-300">"$4.2M"</span>, <span className="text-neutral-400">delta</span>=<span className="text-emerald-300">"+14.2%"</span>)</div>
                    <div><span className="text-white">card2</span> = <span className="text-sky-300">darsh.card</span>(<span className="text-emerald-300">"Net Profit"</span>, <span className="text-emerald-300">"$1.8M"</span>, <span className="text-neutral-400">delta</span>=<span className="text-emerald-300">"+8.6%"</span>)</div>
                    <div className="mt-2 text-neutral-500"># 3. Create subcharts</div>
                    <div><span className="text-white">c1</span> = <span className="text-sky-300">darsh.line</span>(<span className="text-white">df</span>, <span className="text-neutral-400">x</span>=<span className="text-emerald-300">"date"</span>, <span className="text-neutral-400">y</span>=<span className="text-emerald-300">"revenue"</span>, <span className="text-neutral-400">title</span>=<span className="text-emerald-300">"Revenue Trend"</span>)</div>
                    <div><span className="text-white">c2</span> = <span className="text-sky-300">darsh.bar</span>(<span className="text-white">df</span>, <span className="text-neutral-400">x</span>=<span className="text-emerald-300">"channel"</span>, <span className="text-neutral-400">y</span>=<span className="text-emerald-300">"revenue"</span>, <span className="text-neutral-400">title</span>=<span className="text-emerald-300">"Channel Split"</span>)</div>
                    <div className="mt-2 text-neutral-500"># 4. Group into responsive auto-balanced grid</div>
                    <div><span className="text-white">dashboard</span> = <span className="text-sky-300">darsh.grid</span>([<span className="text-white">card1, card2, c1, c2</span>], <span className="text-neutral-400">cols</span>=<span className="text-amber-300">2</span>)</div>
                    <div className="mt-2 text-neutral-500"># 5. Export to HTML (or view in Jupyter)</div>
                    <div><span className="text-white">dashboard.</span><span className="text-sky-300">save_html</span>(<span className="text-emerald-300">"dashboard.html"</span>)</div>
                  </div>
                </div>

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

          {/* 5. INTERACTIVE 2D & 3D */}
          {(docCategory === "all" || docCategory === "interactive") && (
            <div className="rounded-3xl bg-[#08080a] border border-white/[0.08] p-8 sm:p-10 shadow-2xl relative overflow-hidden apple-glass-hover">
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
                <div className="lg:col-span-7 rounded-2xl bg-black border border-white/[0.08] overflow-hidden">
                  <div className="px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-500">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 mr-1">
                        <span className="size-2 rounded-full bg-[#FF5F56]/80" />
                        <span className="size-2 rounded-full bg-[#FFBD2E]/80" />
                        <span className="size-2 rounded-full bg-[#27C93F]/80" />
                      </div>
                      <span>interactive_3d.py</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-sans">
                        Full runnable file
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(plainEnglishSnippets.inter, "doc-inter", "Copied runnable 3D scatter script")}
                      className="hover:text-white flex items-center gap-1.5 transition-colors font-sans text-xs"
                    >
                      {copiedKey === "doc-inter" ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                      <span>{copiedKey === "doc-inter" ? "Copied Full Code" : "Copy Full Code"}</span>
                    </button>
                  </div>
                  <div className="p-5 font-mono text-[13px] leading-relaxed">
                    <div><span className="text-purple-400">import</span> <span className="text-white">darsh</span></div>
                    <div><span className="text-purple-400">import</span> <span className="text-white">pandas</span> <span className="text-purple-400">as</span> <span className="text-white">pd</span></div>
                    <div className="mt-2 text-neutral-500"># 1. Sample metrics DataFrame</div>
                    <div><span className="text-white">df</span> = <span className="text-white">pd.</span><span className="text-sky-300">DataFrame</span>({'{'}</div>
                    <div className="pl-4"><span className="text-emerald-300">"date"</span>: [<span className="text-emerald-300">"2024-Q1"</span>, <span className="text-emerald-300">"2024-Q2"</span>, <span className="text-emerald-300">"2024-Q3"</span>, <span className="text-emerald-300">"2024-Q4"</span>],</div>
                    <div className="pl-4"><span className="text-emerald-300">"revenue"</span>: [<span className="text-amber-300">120</span>, <span className="text-amber-300">185</span>, <span className="text-amber-300">210</span>, <span className="text-amber-300">290</span>],</div>
                    <div className="pl-4"><span className="text-emerald-300">"profit"</span>: [<span className="text-amber-300">35</span>, <span className="text-amber-300">55</span>, <span className="text-amber-300">62</span>, <span className="text-amber-300">95</span>],</div>
                    <div className="pl-4"><span className="text-emerald-300">"units"</span>: [<span className="text-amber-300">450</span>, <span className="text-amber-300">710</span>, <span className="text-amber-300">830</span>, <span className="text-amber-300">1150</span>]</div>
                    <div>{'}'})</div>
                    <div className="mt-2 text-neutral-500"># 2. Interactive 2D chart with hover inspection</div>
                    <div><span className="text-white">fig_2d</span> = <span className="text-sky-300">darsh.line</span>(<span className="text-white">df</span>, <span className="text-neutral-400">x</span>=<span className="text-emerald-300">"date"</span>, <span className="text-neutral-400">y</span>=<span className="text-emerald-300">"revenue"</span>, <span className="text-neutral-400">interactive</span>=<span className="text-purple-400">True</span>)</div>
                    <div><span className="text-white">fig_2d.</span><span className="text-sky-300">show</span>()</div>
                    <div className="mt-2 text-neutral-500"># 3. Interactive 3D spatial scatter with camera rotation</div>
                    <div><span className="text-white">fig_3d</span> = <span className="text-sky-300">darsh.scatter_3d</span>(<span className="text-white">df</span>, <span className="text-neutral-400">x</span>=<span className="text-emerald-300">"revenue"</span>, <span className="text-neutral-400">y</span>=<span className="text-emerald-300">"profit"</span>, <span className="text-neutral-400">z</span>=<span className="text-emerald-300">"units"</span>, <span className="text-neutral-400">title</span>=<span className="text-emerald-300">"3D Performance Space"</span>)</div>
                    <div><span className="text-white">fig_3d.</span><span className="text-sky-300">show</span>()</div>
                  </div>
                </div>

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

          {/* 6. PAINLESS DATA CLEANING */}
          {(docCategory === "all" || docCategory === "cleaning") && (
            <div className="rounded-3xl bg-[#08080a] border border-white/[0.08] p-8 sm:p-10 shadow-2xl relative overflow-hidden apple-glass-hover">
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
                <div className="lg:col-span-7 rounded-2xl bg-black border border-white/[0.08] overflow-hidden">
                  <div className="px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-500">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 mr-1">
                        <span className="size-2 rounded-full bg-[#FF5F56]/80" />
                        <span className="size-2 rounded-full bg-[#FFBD2E]/80" />
                        <span className="size-2 rounded-full bg-[#27C93F]/80" />
                      </div>
                      <span>clean_data.py</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-sans">
                        Full runnable file
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(plainEnglishSnippets.clean, "doc-clean", "Copied runnable data cleaning script")}
                      className="hover:text-white flex items-center gap-1.5 transition-colors font-sans text-xs"
                    >
                      {copiedKey === "doc-clean" ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                      <span>{copiedKey === "doc-clean" ? "Copied Full Code" : "Copy Full Code"}</span>
                    </button>
                  </div>
                  <div className="p-5 font-mono text-[13px] leading-relaxed">
                    <div><span className="text-purple-400">import</span> <span className="text-white">darsh</span></div>
                    <div><span className="text-purple-400">import</span> <span className="text-white">pandas</span> <span className="text-purple-400">as</span> <span className="text-white">pd</span></div>
                    <div className="mt-2 text-neutral-500"># 1. Messy real-world sample DataFrame</div>
                    <div><span className="text-white">raw_df</span> = <span className="text-white">pd.</span><span className="text-sky-300">DataFrame</span>({'{'}</div>
                    <div className="pl-4"><span className="text-emerald-300">"Customer Name "</span>: [<span className="text-emerald-300">"Alice"</span>, <span className="text-emerald-300">"Bob"</span>, <span className="text-emerald-300">"Alice"</span>, <span className="text-emerald-300">"Charlie"</span>],</div>
                    <div className="pl-4"><span className="text-emerald-300">"Annual Rev ($)"</span>: [<span className="text-amber-300">120000</span>, <span className="text-purple-400">None</span>, <span className="text-amber-300">120000</span>, <span className="text-amber-300">85000</span>],</div>
                    <div className="pl-4"><span className="text-emerald-300">"Join Date"</span>: [<span className="text-emerald-300">"2023-01-15"</span>, <span className="text-emerald-300">"2023-03-20"</span>, <span className="text-emerald-300">"2023-01-15"</span>, <span className="text-emerald-300">"2023-06-10"</span>]</div>
                    <div>{'}'})</div>
                    <div className="mt-2 text-neutral-500"># 2. Clean, deduplicate, and impute in one chain</div>
                    <div><span className="text-white">clean_df</span> = (</div>
                    <div className="pl-4"><span className="text-white">raw_df</span></div>
                    <div className="pl-4">.<span className="text-sky-300">darsh.clean_names</span>() <span className="text-neutral-500"># 'Annual Rev ($)' -&gt; 'annual_rev'</span></div>
                    <div className="pl-4">.<span className="text-sky-300">darsh.drop_duplicates</span>() <span className="text-neutral-500"># Removes duplicate rows</span></div>
                    <div className="pl-4">.<span className="text-sky-300">darsh.fill_missing</span>(<span className="text-neutral-400">strategy</span>=<span className="text-emerald-300">"smart"</span>) <span className="text-neutral-500"># Imputes nulls</span></div>
                    <div className="pl-4">.<span className="text-sky-300">darsh.infer_types</span>() <span className="text-neutral-500"># Auto cast types</span></div>
                    <div>)</div>
                    <div className="mt-2 text-neutral-500"># 3. Check data health score (0-100)</div>
                    <div><span className="text-white">score</span> = <span className="text-white">clean_df</span>.<span className="text-sky-300">darsh.quality_score</span>() <span className="text-neutral-500"># ~95.6 / 100</span></div>
                    <div><span className="text-sky-300">print</span>(<span className="text-emerald-300">f"Data Health Score: &#123;score:.1f&#125; / 100"</span>)</div>
                    <div><span className="text-sky-300">print</span>(<span className="text-white">clean_df</span>)</div>
                  </div>
                </div>

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

          {/* 7. LIVE WEB DASHBOARD */}
          {(docCategory === "all" || docCategory === "dashboard") && (
            <div className="rounded-3xl bg-[#08080a] border border-white/[0.08] p-8 sm:p-10 shadow-2xl relative overflow-hidden apple-glass-hover">
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
                <div className="lg:col-span-7 rounded-2xl bg-black border border-white/[0.08] overflow-hidden">
                  <div className="px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-500">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 mr-1">
                        <span className="size-2 rounded-full bg-[#FF5F56]/80" />
                        <span className="size-2 rounded-full bg-[#FFBD2E]/80" />
                        <span className="size-2 rounded-full bg-[#27C93F]/80" />
                      </div>
                      <span>live_dashboard.py</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-sans">
                        Full runnable file
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(plainEnglishSnippets.dash, "doc-dash", "Copied runnable dashboard portal script")}
                      className="hover:text-white flex items-center gap-1.5 transition-colors font-sans text-xs"
                    >
                      {copiedKey === "doc-dash" ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                      <span>{copiedKey === "doc-dash" ? "Copied Full Code" : "Copy Full Code"}</span>
                    </button>
                  </div>
                  <div className="p-5 font-mono text-[13px] leading-relaxed">
                    <div><span className="text-purple-400">import</span> <span className="text-white">darsh</span></div>
                    <div><span className="text-purple-400">import</span> <span className="text-white">pandas</span> <span className="text-purple-400">as</span> <span className="text-white">pd</span></div>
                    <div className="mt-2 text-neutral-500"># 1. Sample business metrics DataFrame</div>
                    <div><span className="text-white">df</span> = <span className="text-white">pd.</span><span className="text-sky-300">DataFrame</span>({'{'}</div>
                    <div className="pl-4"><span className="text-emerald-300">"month"</span>: [<span className="text-emerald-300">"Jan"</span>, <span className="text-emerald-300">"Feb"</span>, <span className="text-emerald-300">"Mar"</span>, <span className="text-emerald-300">"Apr"</span>, <span className="text-emerald-300">"May"</span>],</div>
                    <div className="pl-4"><span className="text-emerald-300">"channel"</span>: [<span className="text-emerald-300">"Online"</span>, <span className="text-emerald-300">"Retail"</span>, <span className="text-emerald-300">"Online"</span>, <span className="text-emerald-300">"Retail"</span>, <span className="text-emerald-300">"Online"</span>],</div>
                    <div className="pl-4"><span className="text-emerald-300">"revenue"</span>: [<span className="text-amber-300">42000</span>, <span className="text-amber-300">31000</span>, <span className="text-amber-300">58000</span>, <span className="text-amber-300">49000</span>, <span className="text-amber-300">63000</span>]</div>
                    <div>{'}'})</div>
                    <div className="mt-2 text-neutral-500"># 2. Charts for the dashboard</div>
                    <div><span className="text-white">c1</span> = <span className="text-sky-300">darsh.line</span>(<span className="text-white">df</span>, <span className="text-neutral-400">x</span>=<span className="text-emerald-300">"month"</span>, <span className="text-neutral-400">y</span>=<span className="text-emerald-300">"revenue"</span>, <span className="text-neutral-400">title</span>=<span className="text-emerald-300">"Revenue Growth"</span>)</div>
                    <div><span className="text-white">c2</span> = <span className="text-sky-300">darsh.bar</span>(<span className="text-white">df</span>, <span className="text-neutral-400">x</span>=<span className="text-emerald-300">"channel"</span>, <span className="text-neutral-400">y</span>=<span className="text-emerald-300">"revenue"</span>, <span className="text-neutral-400">title</span>=<span className="text-emerald-300">"Channel Breakdown"</span>)</div>
                    <div className="mt-2 text-neutral-500"># 3. Create live reactive dashboard portal</div>
                    <div><span className="text-white">app</span> = <span className="text-sky-300">darsh.dashboard</span>(</div>
                    <div className="pl-4"><span className="text-neutral-400">title</span>=<span className="text-emerald-300">"Executive Portal"</span>,</div>
                    <div className="pl-4"><span className="text-neutral-400">charts</span>=[<span className="text-white">c1, c2</span>],</div>
                    <div className="pl-4"><span className="text-neutral-400">data</span>=<span className="text-white">df</span>,</div>
                    <div className="pl-4"><span className="text-neutral-400">kpis</span>=[<span className="text-sky-300">darsh.kpi</span>(<span className="text-emerald-300">"Total Revenue"</span>, <span className="text-emerald-300">"$243K"</span>, <span className="text-neutral-400">delta</span>=<span className="text-emerald-300">"+18.4%"</span>)]</div>
                    <div>)</div>
                    <div className="mt-2 text-neutral-500"># 4. Launches local server at localhost:8080</div>
                    <div><span className="text-white">app.</span><span className="text-sky-300">run</span>(<span className="text-neutral-400">port</span>=<span className="text-amber-300">8080</span>)</div>
                  </div>
                </div>

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
      {/* SEARCHABLE API REFERENCE EXPLORER (#api) */}
      {/* ========================================================================= */}
      <section id="api" className="relative z-10 w-full py-32 px-6 sm:px-12 max-w-[1500px] mx-auto border-t border-white/[0.08]">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[12px] text-neutral-300 mb-4">
            <Code2 className="size-3.5 text-indigo-400" />
            <span>Interactive Reference</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.035em] text-white mb-4">
            API Explorer
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed font-normal max-w-2xl mx-auto mb-8">
            Complete technical signatures and one-click examples covering all 18 functions in the Darsh core engine.
          </p>

          {/* Apple-style Search Bar */}
          <div className="relative max-w-xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search methods, signatures, parameters... (e.g. line, 3d, clean, card)"
              className="w-full h-12 pl-11 pr-12 rounded-full bg-white/[0.04] border border-white/[0.1] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-400/50 focus:bg-white/[0.06] transition-all"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
              >
                Clear
              </button>
            ) : (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[11px] font-mono text-neutral-500 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]">
                <Command className="size-3" />
                <span>K</span>
              </div>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {[
              { id: "all", label: "All Methods (18)" },
              { id: "2d", label: "2D Visuals" },
              { id: "3d", label: "3D Surfaces" },
              { id: "layout", label: "Cards & Grids" },
              { id: "accessor", label: "Data Accessor" },
              { id: "dashboard", label: "Dashboard" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setApiCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  apiCategory === cat.id
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "bg-white/[0.03] text-neutral-400 hover:text-white border border-white/[0.06]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* API Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
          {filteredApiDocs.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#08080a] border border-white/[0.08] relative overflow-hidden apple-glass-hover flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-indigo-300 px-2.5 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20">
                    {item.name}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-500 capitalize">
                    {item.category}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-black border border-white/[0.06] font-mono text-[11px] text-neutral-300 mb-3 overflow-x-auto">
                  {item.signature}
                </div>
                <p className="text-xs text-neutral-400 mb-2 leading-relaxed">
                  {item.desc}
                </p>
                <div className="text-[11px] text-neutral-500 font-mono mb-4">
                  Returns: <span className="text-neutral-300">{item.returns}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between">
                <span className="text-[11px] font-mono text-neutral-500 truncate max-w-[280px]">
                  {item.example}
                </span>
                <button
                  onClick={() => copyToClipboard(item.example, `api-${idx}`, `Copied ${item.name} example`)}
                  className="hover:text-white flex items-center gap-1 text-xs font-mono text-neutral-400 hover:bg-white/[0.04] px-2 py-1 rounded transition-colors shrink-0"
                >
                  {copiedKey === `api-${idx}` ? (
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
            </div>
          ))}
        </div>
      </section>

      </main>

      {/* ========================================================================= */}
      {/* APPLE-INSPIRED FOOTER */}
      {/* ========================================================================= */}
      <footer className="relative z-10 w-full border-t border-white/[0.08] py-16 px-6 sm:px-12 bg-black">
        <div className="w-full max-w-[1500px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">Darsh</span>
            <span>&middot;</span>
            <span className="flex items-center gap-1.5 text-neutral-400">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              v2.0.1 Stable
            </span>
            <span>&middot;</span>
            <span>MIT License</span>
          </div>

          <p className="text-center sm:text-right text-neutral-400">
            Crafted with precision by <span className="text-neutral-200 font-medium">Satyam Rana</span>
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
