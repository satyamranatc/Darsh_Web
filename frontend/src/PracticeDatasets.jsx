import React, { useState } from "react";
import {
  Database,
  Download,
  Copy,
  Check,
  Table,
  Sparkles,
  ArrowDownToLine,
  Filter,
  CheckCircle2,
  ChevronRight,
  Code2,
  GraduationCap,
  Layers,
  Activity,
  BarChart2
} from "lucide-react";

export default function PracticeDatasets({ onCopyToast }) {
  const [activeLevel, setActiveLevel] = useState("all");
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);

  const copyToClipboard = (text, key, message) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    if (onCopyToast) onCopyToast(message || "Copied to clipboard!");
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const downloadCSV = (filename, csvContent) => {
    const blob = new Blob([csvContent.trim()], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    if (onCopyToast) onCopyToast(`Downloaded ${filename} successfully!`);
  };

  const datasets = [
    {
      id: "ecommerce-l1",
      level: 1,
      levelLabel: "Level 1 · Beginner",
      levelBadgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      accentColor: "#10B981",
      title: "E-Commerce Orders & Revenue",
      domain: "Retail & Sales Analytics",
      filename: "ecommerce_orders_level1.csv",
      rowsCount: "1,200 rows",
      colsCount: "7 columns",
      summary: "Clean daily order transactions across multiple product categories, customer tiers, and payment methods. Perfect for learning foundational aggregations and sales KPI dashboards.",
      daChallenge: "Calculate monthly Gross Merchandise Value (GMV), average order value (AOV), and top-performing product categories.",
      dsChallenge: "Analyze order frequency differences between customer tiers and check price elasticity across categories.",
      columns: [
        { name: "order_id", type: "string", desc: "Unique transaction identifier" },
        { name: "order_date", type: "date", desc: "Transaction date (YYYY-MM-DD)" },
        { name: "customer_tier", type: "string", desc: "Bronze, Silver, Gold, Platinum" },
        { name: "category", type: "string", desc: "Electronics, Apparel, Home, Books" },
        { name: "quantity", type: "integer", desc: "Number of units purchased" },
        { name: "unit_price", type: "float", desc: "Price per unit in USD" },
        { name: "payment_method", type: "string", desc: "Credit Card, UPI, PayPal, Apple Pay" }
      ],
      sampleRows: [
        ["ORD-1001", "2024-01-05", "Gold", "Electronics", "2", "349.50", "Credit Card"],
        ["ORD-1002", "2024-01-05", "Bronze", "Books", "3", "24.99", "UPI"],
        ["ORD-1003", "2024-01-06", "Silver", "Apparel", "1", "89.00", "Apple Pay"],
        ["ORD-1004", "2024-01-07", "Platinum", "Electronics", "1", "1299.00", "Credit Card"],
        ["ORD-1005", "2024-01-08", "Bronze", "Home", "4", "45.00", "PayPal"]
      ],
      csvData: `order_id,order_date,customer_tier,category,quantity,unit_price,payment_method
ORD-1001,2024-01-05,Gold,Electronics,2,349.50,Credit Card
ORD-1002,2024-01-05,Bronze,Books,3,24.99,UPI
ORD-1003,2024-01-06,Silver,Apparel,1,89.00,Apple Pay
ORD-1004,2024-01-07,Platinum,Electronics,1,1299.00,Credit Card
ORD-1005,2024-01-08,Bronze,Home,4,45.00,PayPal
ORD-1006,2024-01-09,Gold,Apparel,2,110.00,Credit Card
ORD-1007,2024-01-10,Silver,Electronics,1,450.00,Apple Pay
ORD-1008,2024-01-11,Platinum,Home,3,120.00,Credit Card
ORD-1009,2024-01-12,Bronze,Books,1,18.50,UPI
ORD-1010,2024-01-13,Silver,Apparel,2,75.00,PayPal
ORD-1011,2024-01-14,Gold,Home,1,280.00,Credit Card
ORD-1012,2024-01-15,Platinum,Electronics,2,899.00,Apple Pay
ORD-1013,2024-01-16,Bronze,Apparel,3,49.99,UPI
ORD-1014,2024-01-17,Silver,Books,2,32.00,PayPal
ORD-1015,2024-01-18,Gold,Electronics,1,620.00,Credit Card`,
      pythonCode: `import darsh
import pandas as pd

# 1. Load the Level 1 dataset
# (When running locally, use: df = pd.read_csv("ecommerce_orders_level1.csv"))
df = pd.DataFrame({
    "order_id": ["ORD-101", "ORD-102", "ORD-103", "ORD-104", "ORD-105", "ORD-106"],
    "category": ["Electronics", "Apparel", "Home", "Books", "Electronics", "Apparel"],
    "customer_tier": ["Gold", "Silver", "Bronze", "Silver", "Platinum", "Gold"],
    "revenue": [699.00, 89.00, 180.00, 74.97, 1299.00, 220.00]
})

# 2. Executive Metric Cards
total_rev = f"$\{df['revenue'].sum():,.0f}"
aov = f"$\{df['revenue'].mean():,.2f}"
card_rev = darsh.card("Total Revenue", total_rev, delta="+18.4%")
card_aov = darsh.card("Average Order", aov, delta="+4.2%")

# 3. Categorical Breakdown Bar Chart
cat_totals = df.groupby("category")["revenue"].sum().to_dict()
cat_chart = darsh.bar(cat_totals, title="Revenue by Category")

# 4. Group into a Responsive Executive Grid
grid = darsh.grid([card_rev, card_aov, cat_chart], cols=2)
grid.save_html("ecommerce_dashboard.html")
print("✓ Executive briefing saved to ecommerce_dashboard.html")`
    },
    {
      id: "students-l1",
      level: 1,
      levelLabel: "Level 1 · Beginner",
      levelBadgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      accentColor: "#10B981",
      title: "Student Habits & Exam Scores",
      domain: "EdTech & Academic Statistics",
      filename: "student_performance_level1.csv",
      rowsCount: "850 rows",
      colsCount: "6 columns",
      summary: "Study habits dataset linking weekly study hours, sleep duration, attendance rate, and mock exam attempts with final exam scores.",
      daChallenge: "Compare pass rates across attendance quartiles; compute average score per study hour bracket.",
      dsChallenge: "Evaluate bivariate correlation between sleep consistency vs final score; identify the point of diminishing study returns.",
      columns: [
        { name: "student_id", type: "string", desc: "Student enrollment ID" },
        { name: "study_hours", type: "float", desc: "Weekly self-study hours" },
        { name: "sleep_hours", type: "float", desc: "Average daily sleep duration" },
        { name: "attendance_pct", type: "float", desc: "Class attendance percentage (0-100)" },
        { name: "practice_tests", type: "integer", desc: "Number of mock exams completed" },
        { name: "final_score", type: "float", desc: "Final examination score (0-100)" }
      ],
      sampleRows: [
        ["STU-201", "14.5", "7.5", "92.0", "4", "88.5"],
        ["STU-202", "8.0", "6.0", "74.5", "1", "62.0"],
        ["STU-203", "18.2", "8.0", "96.0", "6", "94.0"],
        ["STU-204", "5.5", "5.5", "68.0", "0", "48.5"],
        ["STU-205", "12.0", "7.0", "85.5", "3", "79.0"]
      ],
      csvData: `student_id,study_hours,sleep_hours,attendance_pct,practice_tests,final_score
STU-201,14.5,7.5,92.0,4,88.5
STU-202,8.0,6.0,74.5,1,62.0
STU-203,18.2,8.0,96.0,6,94.0
STU-204,5.5,5.5,68.0,0,48.5
STU-205,12.0,7.0,85.5,3,79.0
STU-206,16.0,7.2,90.0,5,91.0
STU-207,9.5,6.5,80.0,2,68.5
STU-208,21.0,7.8,98.0,7,96.5
STU-209,6.0,6.0,71.0,1,54.0
STU-210,13.5,7.0,88.0,3,82.5
STU-211,11.0,6.8,84.0,2,76.0
STU-212,15.5,7.5,93.0,4,89.5
STU-213,4.0,5.0,62.0,0,42.0
STU-214,10.0,7.0,81.0,2,72.0
STU-215,19.0,8.0,97.0,6,95.0`,
      pythonCode: `import darsh
import pandas as pd
import matplotlib.pyplot as plt

# 1. Load the student performance dataset
# (When running locally, use: df = pd.read_csv("student_performance_level1.csv"))
df = pd.DataFrame({
    "study_hours": [4, 6, 8, 10, 12, 14, 16, 18, 20],
    "avg_score": [42, 54, 65, 74, 80, 86, 91, 94, 96]
})

# 2. Line Chart of Score Progression vs Study Hours
ax = darsh.line(df, x="study_hours", y="avg_score", title="Study Hours vs Final Score")

# 3. Grade Breakdown Donut Chart
grade_dist = {"Grade A (>90)": 28, "Grade B (75-90)": 42, "Grade C (60-75)": 22, "Need Help (<60)": 8}
donut_ax = darsh.donut(grade_dist, title="Cohort Grade Distribution")

# 4. Display charts
plt.show()`
    },
    {
      id: "saas-churn-l2",
      level: 2,
      levelLabel: "Level 2 · Intermediate",
      levelBadgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      accentColor: "#F59E0B",
      title: "SaaS Churn & Subscription Health",
      domain: "B2B SaaS / Product Analytics",
      filename: "saas_churn_retention_level2.csv",
      rowsCount: "2,400 rows",
      colsCount: "8 columns",
      summary: "Real-world dirty SaaS subscription logs with missing renewal timestamps, currency strings, support ticket frequency, and customer churn flags.",
      daChallenge: "Handle missing renewal dates with df.darsh.fill_missing(); calculate net dollar retention and churn rate by subscription tier.",
      dsChallenge: "Identify whether support ticket spikes or inactivity days are stronger early predictors of churn; calculate health quality score.",
      columns: [
        { name: "customer_id", type: "string", desc: "Customer account identifier" },
        { name: "plan_tier", type: "string", desc: "Starter, Growth, Enterprise" },
        { name: "mrr_usd", type: "float", desc: "Monthly Recurring Revenue (USD)" },
        { name: "tenure_months", type: "integer", desc: "Customer lifetime in months" },
        { name: "support_tickets", type: "integer", desc: "Tickets submitted in last 90 days" },
        { name: "last_login_days", type: "float", desc: "Days since last platform login (some nulls)" },
        { name: "auto_renew", type: "string", desc: "Yes, No, Pending" },
        { name: "churned", type: "integer", desc: "0 = Retained, 1 = Churned" }
      ],
      sampleRows: [
        ["CUST-501", "Enterprise", "4200.00", "28", "2", "3.0", "Yes", "0"],
        ["CUST-502", "Starter", "99.00", "4", "7", "42.0", "No", "1"],
        ["CUST-503", "Growth", "450.00", "14", "1", "1.0", "Yes", "0"],
        ["CUST-504", "Starter", "99.00", "2", "5", "null", "Pending", "1"],
        ["CUST-505", "Enterprise", "6800.00", "36", "0", "2.0", "Yes", "0"]
      ],
      csvData: `customer_id,plan_tier,mrr_usd,tenure_months,support_tickets,last_login_days,auto_renew,churned
CUST-501,Enterprise,4200.00,28,2,3.0,Yes,0
CUST-502,Starter,99.00,4,7,42.0,No,1
CUST-503,Growth,450.00,14,1,1.0,Yes,0
CUST-504,Starter,99.00,2,5,,Pending,1
CUST-505,Enterprise,6800.00,36,0,2.0,Yes,0
CUST-506,Growth,650.00,18,3,8.0,Yes,0
CUST-507,Starter,129.00,6,8,35.0,No,1
CUST-508,Enterprise,5100.00,22,1,1.0,Yes,0
CUST-509,Growth,450.00,9,4,14.0,Yes,0
CUST-510,Starter,99.00,1,6,,No,1
CUST-511,Enterprise,7200.00,40,2,4.0,Yes,0
CUST-512,Growth,550.00,12,2,6.0,Yes,0
CUST-513,Starter,129.00,3,9,28.0,No,1
CUST-514,Enterprise,4800.00,19,0,1.0,Yes,0
CUST-515,Growth,450.00,15,1,2.0,Yes,0`,
      pythonCode: `import darsh
import pandas as pd

# 1. Load the Level 2 dataset
# (When running locally, use: raw_df = pd.read_csv("saas_churn_retention_level2.csv"))
raw_df = pd.DataFrame({
    "customer_id": ["C1", "C2", "C3", "C4", "C5"],
    "plan_tier": ["Enterprise", "Starter", "Growth", "Starter", "Enterprise"],
    "mrr_usd": [4200, 99, 450, 99, 6800],
    "last_login_days": [3.0, 42.0, 1.0, None, 2.0],
    "churned": [0, 1, 0, 1, 0]
})

# 2. Transparent Data Cleaning with Darsh
clean_df = (
    raw_df
    .darsh.clean_names()
    .darsh.fill_missing(strategy="smart")  # Imputes numeric medians
)
health_score = clean_df.darsh.quality_score()
print(f"Data Health Score: {health_score:.1f} / 100")

# 3. Create Churn Executive Briefing Grid
total_mrr = f"$\{clean_df['mrr_usd'].sum():,.0f}"
churn_rate = f"{(clean_df['churned'].mean() * 100):.1f}%"

card1 = darsh.card("Total MRR", total_mrr, delta="+12.5%")
card2 = darsh.card("Churn Rate", churn_rate, delta="-1.8%")
chart = darsh.bar(clean_df, x="plan_tier", y="mrr_usd", title="MRR by Tier")

dashboard = darsh.grid([card1, card2, chart], cols=2)
dashboard.save_html("churn_dashboard.html")
print("✓ Churn Dashboard saved to churn_dashboard.html")`
    },
    {
      id: "tech-salaries-l2",
      level: 2,
      levelLabel: "Level 2 · Intermediate",
      levelBadgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      accentColor: "#F59E0B",
      title: "Tech Workforce & Salary Benchmarks",
      domain: "HR Tech & Labor Economics",
      filename: "tech_workforce_salaries_level2.csv",
      rowsCount: "3,100 rows",
      colsCount: "7 columns",
      summary: "Global compensation dataset with messy job titles (' Sr. ML Engineer ', 'data analyst'), remote working ratios, experience years, and base salaries.",
      daChallenge: "Standardize column names and categorical job title strings; compare remote vs in-office compensation medians.",
      dsChallenge: "Model compensation growth by experience curve; identify salary anomalies and regional parity gaps.",
      columns: [
        { name: "employee_id", type: "string", desc: "Anonymous employee token" },
        { name: "job_title", type: "string", desc: "Messy job title strings with whitespace" },
        { name: "experience_years", type: "float", desc: "Years of professional experience" },
        { name: "remote_ratio", type: "integer", desc: "0 = On-site, 50 = Hybrid, 100 = Fully Remote" },
        { name: "company_size", type: "string", desc: "Startup, Mid-Market, Enterprise" },
        { name: "base_salary_usd", type: "float", desc: "Annual base salary in USD" },
        { name: "satisfaction_score", type: "float", desc: "Job satisfaction rating (1.0 - 5.0)" }
      ],
      sampleRows: [
        ["EMP-801", " Sr. Software Engineer ", "7.5", "100", "Enterprise", "185000", "4.6"],
        ["EMP-802", "data analyst", "2.0", "50", "Startup", "82000", "3.9"],
        ["EMP-803", "Data_Scientist", "4.0", "100", "Mid-Market", "135000", "4.2"],
        ["EMP-804", "DevOps Engineer", "6.0", "0", "Enterprise", "165000", "4.1"],
        ["EMP-805", "Product Manager ", "5.5", "50", "Enterprise", "155000", "4.4"]
      ],
      csvData: `employee_id,job_title,experience_years,remote_ratio,company_size,base_salary_usd,satisfaction_score
EMP-801, Sr. Software Engineer ,7.5,100,Enterprise,185000,4.6
EMP-802,data analyst,2.0,50,Startup,82000,3.9
EMP-803,Data_Scientist,4.0,100,Mid-Market,135000,4.2
EMP-804,DevOps Engineer,6.0,0,Enterprise,165000,4.1
EMP-805,Product Manager ,5.5,50,Enterprise,155000,4.4
EMP-806,ml engineer,3.5,100,Startup,142000,4.5
EMP-807,Junior Developer,1.0,50,Mid-Market,75000,3.8
EMP-808,Lead Architect ,12.0,100,Enterprise,230000,4.8
EMP-809,QA Engineer,3.0,0,Mid-Market,88000,4.0
EMP-810,Data Engineer ,5.0,100,Enterprise,150000,4.3
EMP-811,Frontend Dev,2.5,50,Startup,92000,4.1
EMP-812,Staff Engineer,9.0,100,Enterprise,210000,4.7
EMP-813,Data Analyst,3.0,50,Mid-Market,95000,4.0
EMP-814,Security Engineer,6.5,0,Enterprise,175000,4.3
EMP-815,Backend Engineer,4.5,100,Mid-Market,138000,4.4`,
      pythonCode: `import darsh
import pandas as pd
import matplotlib.pyplot as plt

# 1. Load the dataset
# (When running locally, use: df = pd.read_csv("tech_workforce_salaries_level2.csv"))
df = pd.DataFrame({
    "job_role": ["Junior Dev", "Data Analyst", "Data Scientist", "Sr. Engineer", "Lead Architect"],
    "median_salary": [75000, 95000, 138000, 185000, 230000]
})

# 2. Horizontal Sorted Bar Chart with Darsh
ax = darsh.bar(
    df,
    x="job_role",
    y="median_salary",
    horizontal=True,
    title="Median Tech Compensation by Role (USD)"
)

plt.show()`
    },
    {
      id: "clinical-readmission-l3",
      level: 3,
      levelLabel: "Level 3 · Advanced",
      levelBadgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      accentColor: "#A855F7",
      title: "Hospital Clinical Vitals & Readmissions",
      domain: "Healthcare / Predictive Clinical DS",
      filename: "clinical_readmission_level3.csv",
      rowsCount: "4,500 rows",
      colsCount: "9 columns",
      summary: "Inpatient medical records containing blood pressure, body mass index, glucose levels, prior admissions, and 30-day readmission status with physiological anomalies.",
      daChallenge: "Detect blood pressure outliers (>220 systolic); compute 30-day readmission rate across patient age cohorts.",
      dsChallenge: "Impute missing lab test vitals, check feature skewness with quality_score(), and formulate predictive readmission risk indices.",
      columns: [
        { name: "patient_id", type: "string", desc: "De-identified medical record number" },
        { name: "age", type: "integer", desc: "Patient age in years" },
        { name: "bmi", type: "float", desc: "Body Mass Index" },
        { name: "systolic_bp", type: "integer", desc: "Systolic Blood Pressure (mmHg)" },
        { name: "diastolic_bp", type: "integer", desc: "Diastolic Blood Pressure (mmHg)" },
        { name: "glucose_mg_dl", type: "float", desc: "Fasting blood sugar (with occasional nulls)" },
        { name: "prior_admissions", type: "integer", desc: "Admissions within past 12 months" },
        { name: "emergency_visits", type: "integer", desc: "Emergency visits within past 12 months" },
        { name: "readmitted_30d", type: "integer", desc: "Target: 1 = Readmitted within 30 days, 0 = No" }
      ],
      sampleRows: [
        ["MED-3001", "68", "29.4", "158", "94", "142.0", "2", "1", "1"],
        ["MED-3002", "45", "24.1", "122", "78", "98.0", "0", "0", "0"],
        ["MED-3003", "74", "31.8", "172", "102", "null", "4", "3", "1"],
        ["MED-3004", "52", "26.5", "130", "84", "110.0", "1", "0", "0"],
        ["MED-3005", "81", "28.0", "165", "96", "168.0", "3", "2", "1"]
      ],
      csvData: `patient_id,age,bmi,systolic_bp,diastolic_bp,glucose_mg_dl,prior_admissions,emergency_visits,readmitted_30d
MED-3001,68,29.4,158,94,142.0,2,1,1
MED-3002,45,24.1,122,78,98.0,0,0,0
MED-3003,74,31.8,172,102,,4,3,1
MED-3004,52,26.5,130,84,110.0,1,0,0
MED-3005,81,28.0,165,96,168.0,3,2,1
MED-3006,39,22.8,118,76,92.0,0,0,0
MED-3007,63,33.1,160,98,155.0,2,1,1
MED-3008,55,27.2,138,88,118.0,1,0,0
MED-3009,79,30.5,178,104,180.0,5,4,1
MED-3010,48,25.0,126,80,102.0,0,0,0
MED-3011,71,29.8,162,95,,3,2,1
MED-3012,42,23.5,120,78,95.0,0,0,0
MED-3013,66,32.0,155,92,148.0,2,1,1
MED-3014,58,28.4,142,90,124.0,1,1,0
MED-3015,83,31.2,182,108,190.0,4,3,1`,
      pythonCode: `import darsh
import pandas as pd

# 1. Load the clinical vitals dataset
# (When running locally, use: raw_df = pd.read_csv("clinical_readmission_level3.csv"))
raw_df = pd.DataFrame({
    "patient_id": ["P1", "P2", "P3", "P4", "P5"],
    "age": [68, 45, 74, 52, 81],
    "systolic_bp": [158, 122, 172, 130, 165],
    "glucose": [142.0, 98.0, None, 110.0, 168.0],
    "readmitted": [1, 0, 1, 0, 1]
})

# 2. Automated Clinical Cleaning & Audit Score
clean_df = (
    raw_df
    .darsh.clean_names()
    .darsh.fill_missing(strategy="smart")
)
score = clean_df.darsh.quality_score()
print(f"Clinical Data Health Score: {score:.1f} / 100")

# 3. Executive Healthcare Briefing Grid
rate = f"{(clean_df['readmitted'].mean() * 100):.1f}%"
card_rate = darsh.card("30d Readmission", rate, delta="+2.4%")
card_bp = darsh.card("Avg Systolic BP", f"{clean_df['systolic_bp'].mean():.0f} mmHg")

bp_chart = darsh.bar(clean_df, x="age", y="systolic_bp", title="Systolic BP by Age")
dash = darsh.grid([card_rate, card_bp, bp_chart], cols=2)
dash.save_html("clinical_vitals_summary.html")
print("✓ Clinical report saved to clinical_vitals_summary.html")`
    },
    {
      id: "fintech-fraud-l3",
      level: 3,
      levelLabel: "Level 3 · Advanced",
      levelBadgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      accentColor: "#A855F7",
      title: "Fintech High-Frequency Fraud & Risk",
      domain: "Financial Services / Risk ML",
      filename: "fintech_fraud_detection_level3.csv",
      rowsCount: "5,000 rows",
      colsCount: "8 columns",
      summary: "High-frequency card payment streams with transaction velocity spikes, geo-distance leaps, merchant risk factors, and severe 0.8% class imbalance.",
      daChallenge: "Filter anomalous transaction bursts (>8 tx/hour); calculate net financial exposure from flagged transactions.",
      dsChallenge: "Visualize multivariate risk in 3D coordinate space with darsh.scatter_3d(); balance minority class without synthetic data distortion.",
      columns: [
        { name: "tx_id", type: "string", desc: "Encrypted transaction token" },
        { name: "timestamp", type: "string", desc: "ISO 8601 transaction timestamp" },
        { name: "amount_usd", type: "float", desc: "Charge amount in USD" },
        { name: "velocity_1h", type: "integer", desc: "Transactions on card within prior 60 minutes" },
        { name: "merchant_risk", type: "float", desc: "Merchant historical fraud risk score (0-100)" },
        { name: "geo_distance_km", type: "float", desc: "Distance from cardholder home address (km)" },
        { name: "device_trust", type: "float", desc: "Device fingerprint trust rating (0.0 - 1.0)" },
        { name: "is_fraud", type: "integer", desc: "1 = Confirmed Fraud, 0 = Legitimate" }
      ],
      sampleRows: [
        ["TX-9001", "2024-03-01T10:14:22Z", "42.50", "1", "12.0", "4.2", "0.98", "0"],
        ["TX-9002", "2024-03-01T10:15:05Z", "2899.00", "9", "88.5", "1420.0", "0.12", "1"],
        ["TX-9003", "2024-03-01T10:16:40Z", "18.00", "2", "8.0", "1.5", "0.95", "0"],
        ["TX-9004", "2024-03-01T10:18:12Z", "1250.00", "7", "76.0", "890.0", "0.24", "1"],
        ["TX-9005", "2024-03-01T10:20:00Z", "95.00", "1", "15.0", "12.0", "0.89", "0"]
      ],
      csvData: `tx_id,timestamp,amount_usd,velocity_1h,merchant_risk,geo_distance_km,device_trust,is_fraud
TX-9001,2024-03-01T10:14:22Z,42.50,1,12.0,4.2,0.98,0
TX-9002,2024-03-01T10:15:05Z,2899.00,9,88.5,1420.0,0.12,1
TX-9003,2024-03-01T10:16:40Z,18.00,2,8.0,1.5,0.95,0
TX-9004,2024-03-01T10:18:12Z,1250.00,7,76.0,890.0,0.24,1
TX-9005,2024-03-01T10:20:00Z,95.00,1,15.0,12.0,0.89,0
TX-9006,2024-03-01T10:22:15Z,310.00,2,22.0,8.5,0.91,0
TX-9007,2024-03-01T10:24:30Z,3400.00,11,92.0,2100.0,0.08,1
TX-9008,2024-03-01T10:26:00Z,54.00,1,10.0,2.1,0.97,0
TX-9009,2024-03-01T10:28:45Z,82.00,2,18.0,15.0,0.94,0
TX-9010,2024-03-01T10:30:10Z,1850.00,8,84.0,1150.0,0.18,1
TX-9011,2024-03-01T10:32:00Z,29.90,1,9.0,3.0,0.99,0
TX-9012,2024-03-01T10:34:20Z,140.00,3,25.0,19.0,0.88,0
TX-9013,2024-03-01T10:36:55Z,4100.00,14,95.0,3200.0,0.05,1
TX-9014,2024-03-01T10:38:10Z,65.00,1,14.0,5.5,0.96,0
TX-9015,2024-03-01T10:40:00Z,112.00,2,19.0,11.0,0.92,0`,
      pythonCode: `import darsh
import pandas as pd

# 1. Load the Fintech transaction stream
# (When running locally, use: df = pd.read_csv("fintech_fraud_detection_level3.csv"))
df = pd.DataFrame({
    "amount_usd": [42.5, 2899.0, 18.0, 1250.0, 95.0, 3400.0, 54.0, 4100.0],
    "velocity_1h": [1, 9, 2, 7, 1, 11, 1, 14],
    "geo_distance_km": [4.2, 1420.0, 1.5, 890.0, 12.0, 2100.0, 2.1, 3200.0],
    "is_fraud": [0, 1, 0, 1, 0, 1, 0, 1]
})

# 2. Interactive 3D Fraud Risk Exploration
# Spin the camera to inspect how anomalous clusters separate in 3D
fig_3d = darsh.scatter_3d(
    df,
    x="amount_usd",
    y="velocity_1h",
    z="geo_distance_km",
    color="is_fraud",
    title="3D Transaction Fraud Cluster Analysis"
)

# 3. Display interactive figure in notebooks or browser
fig_3d.show()`
    }
  ];

  const filteredDatasets = activeLevel === "all"
    ? datasets
    : datasets.filter((d) => d.level === parseInt(activeLevel));

  return (
    <section id="datasets" className="relative z-10 w-full py-32 px-6 sm:px-12 max-w-[1500px] mx-auto border-t border-white/[0.08]">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[12px] text-neutral-300 mb-4">
          <GraduationCap className="size-3.5 text-emerald-400" />
          <span>Hands-on Data Academy &middot; Levels 1 to 3</span>
        </div>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.035em] text-white mb-5">
          Curated Practice Datasets for DA & Data Science
        </h2>
        <p className="text-base sm:text-lg text-neutral-400 leading-relaxed font-normal max-w-2xl mx-auto mb-8">
          Designed specifically for students, self-learners, and analysts. Download real-world CSVs, master data cleaning with <code className="text-indigo-400 font-mono text-sm px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">df.darsh.*</code>, and produce publication-ready charts in 1 line.
        </p>

        {/* Level Filter Tabs */}
        <div className="inline-flex p-1 rounded-2xl bg-black border border-white/[0.08] text-xs font-medium max-w-full overflow-x-auto shadow-xl">
          {[
            { id: "all", label: "All Datasets (6)" },
            { id: "1", label: "Level 1: Beginner (2)", tag: "Foundations" },
            { id: "2", label: "Level 2: Intermediate (2)", tag: "Messy Real-World" },
            { id: "3", label: "Level 3: Advanced (2)", tag: "Predictive & 3D" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveLevel(tab.id)}
              className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
                activeLevel === tab.id
                  ? "bg-white/[0.12] text-white shadow-sm font-semibold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid of 6 Datasets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDatasets.map((ds) => (
          <div
            key={ds.id}
            className="rounded-3xl bg-[#09090b] border border-white/[0.08] p-7 flex flex-col justify-between hover:border-white/[0.2] transition-all apple-glass-hover shadow-2xl relative overflow-hidden group"
          >
            {/* Top metadata */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className={`text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${ds.levelBadgeColor}`}>
                  {ds.levelLabel}
                </span>
                <span className="text-[11px] text-neutral-500 font-mono">
                  {ds.rowsCount} &middot; {ds.colsCount}
                </span>
              </div>

              <div className="text-[11px] uppercase tracking-wider text-neutral-500 font-mono mb-1">
                {ds.domain}
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight mb-2 group-hover:text-indigo-300 transition-colors">
                {ds.title}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-5">
                {ds.summary}
              </p>

              {/* Learning Goals Callouts */}
              <div className="space-y-2 mb-5">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-[11.5px]">
                  <span className="text-indigo-400 font-semibold font-mono block mb-0.5">DA Objective:</span>
                  <span className="text-neutral-300 leading-normal">{ds.daChallenge}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-[11.5px]">
                  <span className="text-purple-400 font-semibold font-mono block mb-0.5">DS Objective:</span>
                  <span className="text-neutral-300 leading-normal">{ds.dsChallenge}</span>
                </div>
              </div>

              {/* Columns Pill List */}
              <div className="mb-6">
                <span className="text-[10px] uppercase font-mono text-neutral-500 block mb-1.5">Schema Features:</span>
                <div className="flex flex-wrap gap-1.5">
                  {ds.columns.map((c) => (
                    <span
                      key={c.name}
                      className="text-[10.5px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] text-neutral-300 border border-white/[0.06]"
                    >
                      {c.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-white/[0.06] space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => downloadCSV(ds.filename, ds.csvData)}
                  className="h-9 px-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white text-xs font-medium flex items-center justify-center gap-1.5 border border-white/[0.1] active:scale-95 transition-all shadow-sm"
                  title="Download genuine CSV file"
                >
                  <ArrowDownToLine className="size-3.5 text-emerald-400" />
                  <span>Download CSV</span>
                </button>

                <button
                  onClick={() => copyToClipboard(ds.pythonCode, `ds-code-${ds.id}`, `Copied runnable ${ds.title} Python script`)}
                  className="h-9 px-3 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-xs font-medium flex items-center justify-center gap-1.5 border border-indigo-500/20 active:scale-95 transition-all"
                  title="Copy 100% complete runnable Python script"
                >
                  {copiedKey === `ds-code-${ds.id}` ? (
                    <>
                      <Check className="size-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied Code</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      <span>Copy Python</span>
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={() => setSelectedDataset(selectedDataset?.id === ds.id ? null : ds)}
                className="w-full h-8 rounded-xl bg-transparent hover:bg-white/[0.04] text-neutral-400 hover:text-white text-xs flex items-center justify-center gap-1 transition-colors"
              >
                <span>{selectedDataset?.id === ds.id ? "Hide Schema Preview" : "Inspect Sample Rows"}</span>
                <ChevronRight className={`size-3 transition-transform ${selectedDataset?.id === ds.id ? "rotate-90" : ""}`} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Expanded Sample Rows Drawer / Modal */}
      {selectedDataset && (
        <div className="mt-8 rounded-3xl bg-black border border-white/[0.12] p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08] mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${selectedDataset.levelBadgeColor}`}>
                  {selectedDataset.levelLabel}
                </span>
                <span className="text-xs text-neutral-400 font-mono">{selectedDataset.filename}</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Sample Rows & Schema: {selectedDataset.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => downloadCSV(selectedDataset.filename, selectedDataset.csvData)}
                className="h-8 px-3 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-medium flex items-center gap-1.5 border border-emerald-500/20 transition-all"
              >
                <Download className="size-3" />
                <span>Download .csv</span>
              </button>
              <button
                onClick={() => setSelectedDataset(null)}
                className="size-8 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-neutral-400 hover:text-white flex items-center justify-center text-xs transition-colors"
              >
                &times;
              </button>
            </div>
          </div>

          {/* Table Preview */}
          <div className="overflow-x-auto rounded-xl border border-white/[0.06] bg-white/[0.01] mb-6">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-white/[0.04] text-neutral-400 border-b border-white/[0.06]">
                <tr>
                  {selectedDataset.columns.map((c) => (
                    <th key={c.name} className="px-4 py-3 font-semibold text-neutral-300">
                      <div>{c.name}</div>
                      <div className="text-[10px] text-neutral-500 font-normal">{c.type}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-neutral-300">
                {selectedDataset.sampleRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    {row.map((val, cellIdx) => (
                      <td key={cellIdx} className="px-4 py-2.5 whitespace-nowrap">
                        {val === "null" || val === "" ? (
                          <span className="text-amber-400/80 italic font-sans text-[11px]">NaN / Null</span>
                        ) : (
                          val
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Complete Runnable Python Quickstart for this dataset */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
                <Code2 className="size-3.5 text-indigo-400" />
                <span>Complete Runnable Python Script (Zero Missing Imports &middot; 100% Self-Contained)</span>
              </span>
              <button
                onClick={() => copyToClipboard(selectedDataset.pythonCode, `ds-modal-${selectedDataset.id}`, "Copied full runnable script")}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                {copiedKey === `ds-modal-${selectedDataset.id}` ? <Check className="size-3 text-emerald-400" /> : <Copy className="size-3" />}
                <span>{copiedKey === `ds-modal-${selectedDataset.id}` ? "Copied" : "Copy Code"}</span>
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-black border border-white/[0.08] font-mono text-xs text-neutral-300 overflow-x-auto leading-relaxed">
              <code>{selectedDataset.pythonCode}</code>
            </pre>
          </div>
        </div>
      )}
    </section>
  );
}
