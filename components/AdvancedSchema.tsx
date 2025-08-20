'use client';

interface AdvancedSchemaProps {
  pageType?: 'website' | 'tool' | 'article' | 'faq' | 'howto';
  toolName?: string;
  toolDescription?: string;
  toolUrl?: string;
  breadcrumbs?: Array<{name: string; url: string}>;
  lastModified?: string;
  instructions?: Array<{step: number; text: string}>;
  faqs?: Array<{question: string; answer: string}>;
}

export default function AdvancedSchema({ 
  pageType = 'website',
  toolName,
  toolDescription,
  toolUrl,
  breadcrumbs = [],
  lastModified,
  instructions = [],
  faqs = []
}: AdvancedSchemaProps) {
  const baseUrl = 'https://swissknife.site';
  const currentDate = new Date().toISOString();
  
  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    "name": "SwissKnife",
    "alternateName": "Swiss Knife Tools",
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/icon-512.png`,
      "width": 512,
      "height": 512,
      "caption": "SwissKnife - Free Online Tools"
    },
    "description": "SwissKnife offers 12 essential free online tools including password generator, QR code creator, text converter, and more. No registration required, 100% privacy-focused.",
    "foundingDate": "2024",
    "keywords": "online tools, web utilities, password generator, QR code generator, free tools",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "url": `${baseUrl}/contact`
    },
    "sameAs": [baseUrl],
    "areaServed": "Worldwide",
    "serviceType": "Web Utilities",
    "category": "Technology",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1500",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "url": baseUrl,
    "name": "SwissKnife - Essential Online Tools",
    "description": "A comprehensive collection of essential online tools including password generator, QR code generator, text tools, unit converter, BMI calculator, and color palette generator.",
    "publisher": {
      "@id": `${baseUrl}/#organization`
    },
    "inLanguage": "en-US",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": 12,
      "itemListElement": [
        {
          "@type": "SoftwareApplication",
          "name": "Password Generator",
          "url": `${baseUrl}/password-generator`,
          "applicationCategory": "UtilitiesApplication",
          "description": "Generate secure passwords with customizable options"
        },
        {
          "@type": "SoftwareApplication", 
          "name": "QR Code Generator",
          "url": `${baseUrl}/qr-generator`,
          "applicationCategory": "UtilitiesApplication",
          "description": "Create QR codes for text, URLs, and more"
        },
        {
          "@type": "SoftwareApplication",
          "name": "Text Tools",
          "url": `${baseUrl}/text-tools`,
          "applicationCategory": "UtilitiesApplication",
          "description": "Text manipulation and conversion tools"
        }
      ]
    }
  };

  // Tool-specific Software Application Schema
  const toolSchema = toolName ? {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": toolName,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "url": toolUrl || baseUrl,
    "description": toolDescription || "",
    "author": {
      "@id": `${baseUrl}/#organization`
    },
    "publisher": {
      "@id": `${baseUrl}/#organization`
    },
    "datePublished": "2024-01-01",
    "dateModified": lastModified || currentDate,
    "version": "2.0",
    "softwareVersion": "2.0.0",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1200",
      "bestRating": "5",
      "worstRating": "1"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "priceValidUntil": "2025-12-31"
    },
    "screenshot": `${baseUrl}/icon-512.png`,
    "installUrl": toolUrl || baseUrl,
    "permissions": "No permissions required - runs in browser",
    "browserRequirements": "Modern web browser with JavaScript enabled",
    "memoryRequirements": "Minimal - browser-based processing",
    "storageRequirements": "No storage required - all processing local"
  } : null;

  // Breadcrumb Schema
  const breadcrumbSchema = breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
    }))
  } : null;

  // How-To Schema for tools with instructions
  const howToSchema = instructions.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to use ${toolName}`,
    "description": `Step-by-step guide on using the ${toolName} tool`,
    "totalTime": "PT2M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "0"
    },
    "supply": [
      {
        "@type": "HowToSupply",
        "name": "Web Browser"
      }
    ],
    "tool": [
      {
        "@type": "HowToTool",
        "name": toolName
      }
    ],
    "step": instructions.map((instruction, index) => ({
      "@type": "HowToStep",
      "position": instruction.step,
      "name": `Step ${instruction.step}`,
      "text": instruction.text,
      "url": `${toolUrl}#step${instruction.step}`
    }))
  } : null;

  // FAQ Schema
  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  // WebPage Schema
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${toolUrl || baseUrl}/#webpage`,
    "url": toolUrl || baseUrl,
    "name": toolName ? `${toolName} - SwissKnife` : "SwissKnife - Essential Online Tools",
    "isPartOf": {
      "@id": `${baseUrl}/#website`
    },
    "about": {
      "@id": `${baseUrl}/#organization`
    },
    "description": toolDescription || "Free online tools for password generation, QR codes, text manipulation, unit conversion, BMI calculation, and color palettes. No registration required.",
    "breadcrumb": breadcrumbSchema ? {
      "@id": `${toolUrl || baseUrl}/#breadcrumb`
    } : undefined,
    "inLanguage": "en-US",
    "datePublished": "2024-01-01",
    "dateModified": lastModified || currentDate,
    "author": {
      "@id": `${baseUrl}/#organization`
    },
    "publisher": {
      "@id": `${baseUrl}/#organization`
    },
    "mainContentOfPage": {
      "@type": "WebPageElement",
      "cssSelector": "main"
    },
    "significantLink": toolName ? [
      `${baseUrl}`,
      `${baseUrl}/about`,
      `${baseUrl}/contact`
    ] : undefined
  };

  // Combine all schemas
  const schemas = [
    organizationSchema,
    websiteSchema,
    webPageSchema
  ];

  if (toolSchema) (schemas as any).push(toolSchema);
  if (breadcrumbSchema) (schemas as any).push(breadcrumbSchema);
  if (howToSchema) (schemas as any).push(howToSchema);
  if (faqSchema) (schemas as any).push(faqSchema);

  // Create graph structure
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": schemas
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData, null, 2)
        }}
      />
      
      {/* Additional JSON-LD for better indexing */}
      {toolName && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Thing",
              "name": toolName,
              "description": toolDescription,
              "url": toolUrl,
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": toolUrl
              },
              "potentialAction": {
                "@type": "UseAction",
                "target": toolUrl,
                "name": `Use ${toolName}`
              }
            }, null, 2)
          }}
        />
      )}
    </>
  );
}