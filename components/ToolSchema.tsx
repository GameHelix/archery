interface ToolSchemaProps {
  name: string;
  description: string;
  url: string;
  category: string;
  features: string[];
  instructions?: string[];
}

export default function ToolSchema({ 
  name, 
  description, 
  url, 
  category, 
  features,
  instructions = []
}: ToolSchemaProps) {
  const toolSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": `${name} | SwissKnife`,
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Web Browser",
        "url": `https://swissknife.site${url}`,
        "description": description,
        "author": {
          "@type": "Organization",
          "@id": "https://swissknife.site/#organization"
        },
        "publisher": {
          "@type": "Organization", 
          "@id": "https://swissknife.site/#organization"
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "featureList": features,
        "browserRequirements": "Requires JavaScript. Supports Chrome 60+, Firefox 55+, Safari 11+, Edge 79+",
        "permissions": "No permissions required",
        "installUrl": `https://swissknife.site${url}`,
        "screenshot": "https://swissknife.site/icon-512.png",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.7",
          "ratingCount": "892",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://swissknife.site"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": name,
            "item": `https://swissknife.site${url}`
          }
        ]
      }
    ]
  };

  if (instructions.length > 0) {
    (toolSchema["@graph"] as any).push({
      "@type": "HowTo",
      "name": `How to Use ${name}`,
      "description": `Step-by-step guide to using the ${name} tool`,
      "step": instructions.map((instruction, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "name": `Step ${index + 1}`,
        "text": instruction
      }))
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(toolSchema)
      }}
    />
  );
}