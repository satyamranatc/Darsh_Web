/**
 * Dynamic SEO and Metadata Manager for Darsh (https://darshdata.in)
 * Handles client-side view changes, separate page indexing, canonical URLs,
 * OpenGraph, Twitter Cards, and dynamic JSON-LD structured data.
 */

const BASE_URL = "https://darshdata.in";

export const SEO_PAGES = {
  home: {
    title: "Darsh — Clean Data, Calm Charts | Modern Pythonic Charting Engine",
    description: "The modern Pythonic visualization and reactive dashboard engine built on pandas, matplotlib, and plotly. Publication-grade figures in 1 line, zero proprietary silos, auditable data cleaning, and sub-5ms reactive web dashboards.",
    canonical: `${BASE_URL}/`,
    keywords: "darsh, python charting, data visualization python, matplotlib alternative, seaborn alternative, pandas data cleaning, python dashboard, reactive fastapi dashboard, plotly 3d python, nordic calm palette, clean data calm charts, pythonic plotting, pypi darsh",
    ogType: "website",
    ogImage: `${BASE_URL}/og-image.svg`,
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "SoftwareApplication",
          "@id": `${BASE_URL}/#software`,
          "name": "Darsh",
          "operatingSystem": "Linux, macOS, Windows",
          "applicationCategory": "DeveloperApplication",
          "softwareVersion": "2.0.1",
          "description": "Clean data. Calm charts. The modern Pythonic charting and dashboard engine built on pandas, matplotlib, and plotly with zero proprietary silos.",
          "downloadUrl": "https://pypi.org/project/darsh/2.0.1/",
          "installUrl": "https://pypi.org/project/darsh/",
          "programmingLanguage": "Python",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          },
          "author": {
            "@type": "Person",
            "name": "Satyam Rana",
            "url": "https://github.com/satyamranatc"
          },
          "license": "https://opensource.org/licenses/MIT"
        },
        {
          "@type": "WebSite",
          "@id": `${BASE_URL}/#website`,
          "url": BASE_URL,
          "name": "Darsh Data",
          "description": "Official documentation and studio for Darsh Python visualization library.",
          "publisher": {
            "@type": "Organization",
            "name": "Darsh Open Source",
            "url": BASE_URL,
            "logo": {
              "@type": "ImageObject",
              "url": `${BASE_URL}/favicon.svg`
            }
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${BASE_URL}/#api?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          }
        },
        {
          "@type": "FAQPage",
          "@id": `${BASE_URL}/#faq`,
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is Darsh in Python?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Darsh is an opinionated, calm Python charting and dashboard engine built on top of pandas, matplotlib, and plotly. It produces publication-grade graphics from plain Python lists, dictionaries, or DataFrames with zero boilerplate."
              }
            },
            {
              "@type": "Question",
              "name": "Does Darsh trap users behind proprietary chart objects?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. Darsh has a strict Zero Lock-in guarantee: 2D functions return genuine matplotlib.axes.Axes objects, and 3D or interactive calls return native plotly.graph_objects.Figure instances. All standard custom matplotlib formatters, plt.savefig(), and annotations work seamlessly."
              }
            },
            {
              "@type": "Question",
              "name": "How does Darsh handle data cleaning?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Darsh registers an auditable pandas accessor (df.darsh.*). You can chain df.darsh.clean_names(), drop_duplicates(), fill_missing(strategy='smart'), and calculate an objective 0-100 data hygiene rating via df.darsh.quality_score()."
              }
            },
            {
              "@type": "Question",
              "name": "How can I deploy a live dashboard with Darsh?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Calling darsh.dashboard(title, charts, data, kpis) launches a high-speed local FastAPI web server on port 8080 with interactive cross-filters and dynamic SVG stream updates serving under 5ms."
              }
            }
          ]
        }
      ]
    }
  },

  guide: {
    title: "Thinking in Graphs & Data Hygiene Blueprint | Darsh Masterpiece Guide",
    description: "The complete definitive guide to human visual perception (Cleveland & McGill hierarchy), optical geometry, zero baseline rules, the 90/10 color principle, and deterministic pandas data cleaning pipelines.",
    canonical: `${BASE_URL}/#guide`,
    keywords: "data visualization theory, thinking in graphs, cleveland mcgill hierarchy, data hygiene blueprint, pandas data cleaning, optical geometry, zero baseline rule, 90 10 color rule, darsh guide, python chart tutorial, information architecture data",
    ogType: "article",
    ogImage: `${BASE_URL}/og-image.svg`,
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "TechArticle",
          "@id": `${BASE_URL}/#guide-article`,
          "headline": "Thinking in Graphs: How to Visualize Any Data on Any Platform",
          "alternativeHeadline": "The Science of Human Perception and the Data Hygiene Blueprint",
          "description": "Comprehensive guide on optical geometry translation, human perceptual decoding accuracy, chart shape categorization, and deterministic pandas data sanitization.",
          "author": {
            "@type": "Person",
            "name": "Satyam Rana",
            "url": "https://github.com/satyamranatc"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Darsh Data",
            "url": BASE_URL,
            "logo": {
              "@type": "ImageObject",
              "url": `${BASE_URL}/favicon.svg`
            }
          },
          "datePublished": "2026-09-24",
          "dateModified": "2026-09-24",
          "mainEntityOfPage": `${BASE_URL}/#guide`,
          "image": `${BASE_URL}/og-image.svg`,
          "keywords": "data visualization, optical geometry, Cleveland and McGill, pandas cleaning, data hygiene, chart anatomy",
          "articleSection": [
            "1. The Mental Model: What is a Graph?",
            "2. The Visual Hierarchy of Human Perception",
            "3. The 6 Fundamental Data Shapes",
            "4. Anatomy of a Graph: Zero-Debt Graphic Architecture",
            "5. Color Discipline & Cognitive Load",
            "6. From Exploration to Executive Storytelling",
            "7. The Data Hygiene Blueprint & 5 Deadly Sins",
            "8. The Interactive Chart Chooser Matrix"
          ]
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${BASE_URL}/#breadcrumb`,
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Darsh Studio",
              "item": `${BASE_URL}/`
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Masterpiece Guide & Learning Hub",
              "item": `${BASE_URL}/#guide`
            }
          ]
        }
      ]
    }
  }
};

/**
 * Update meta tags and structured data for the active view
 * @param {"home" | "guide"} pageKey 
 */
export function updatePageSEO(pageKey = "home") {
  const page = SEO_PAGES[pageKey] || SEO_PAGES.home;

  // 1. Update Title
  document.title = page.title;

  // 2. Helper to set or create meta tag
  const setMeta = (nameAttr, nameVal, content) => {
    let el = document.querySelector(`meta[${nameAttr}="${nameVal}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(nameAttr, nameVal);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  };

  // 3. Set standard meta tags
  setMeta("name", "description", page.description);
  setMeta("name", "keywords", page.keywords);
  setMeta("name", "robots", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
  setMeta("name", "author", "Satyam Rana");

  // 4. Update Canonical Link
  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement("link");
    canonicalEl.setAttribute("rel", "canonical");
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute("href", page.canonical);

  // 5. OpenGraph Tags
  setMeta("property", "og:title", page.title);
  setMeta("property", "og:description", page.description);
  setMeta("property", "og:url", page.canonical);
  setMeta("property", "og:type", page.ogType);
  setMeta("property", "og:image", page.ogImage);
  setMeta("property", "og:site_name", "Darsh");
  setMeta("property", "og:locale", "en_US");

  // 6. Twitter Card Tags
  setMeta("name", "twitter:card", "summary_large_image");
  setMeta("name", "twitter:title", page.title);
  setMeta("name", "twitter:description", page.description);
  setMeta("name", "twitter:image", page.ogImage);
  setMeta("name", "twitter:url", page.canonical);
  setMeta("name", "twitter:creator", "@satyamranatc");

  // 7. Inject / Update Dynamic JSON-LD Structured Data
  let jsonLdEl = document.getElementById("seo-dynamic-jsonld");
  if (!jsonLdEl) {
    jsonLdEl = document.createElement("script");
    jsonLdEl.setAttribute("type", "application/ld+json");
    jsonLdEl.setAttribute("id", "seo-dynamic-jsonld");
    document.head.appendChild(jsonLdEl);
  }
  jsonLdEl.textContent = JSON.stringify(page.structuredData);
}
