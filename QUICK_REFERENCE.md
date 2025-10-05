# Quick Reference Card - Responsive & SEO Patterns

## 🎯 Essential Classes

### Typography (Mobile → Desktop)
```tsx
// Hero H1
"text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"

// Section H2
"text-2xl sm:text-3xl lg:text-4xl font-bold"

// Card H3
"text-lg sm:text-xl lg:text-2xl font-bold"

// Body
"text-base sm:text-lg md:text-xl"

// Small
"text-sm sm:text-base"
```

### Spacing
```tsx
// Container
"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12"

// Section margins
"mb-8 sm:mb-10 lg:mb-12"

// Card padding
"p-6 sm:p-8 lg:p-10"

// Gaps
"gap-6 sm:gap-8"

// Vertical spacing
"space-y-6 sm:space-y-8"
```

### Buttons (44px+ touch targets)
```tsx
// Primary Button
"w-full bg-gradient-to-r from-primary-600 to-primary-700
 hover:from-primary-700 hover:to-primary-800
 active:from-primary-800 active:to-primary-900
 text-white font-bold
 py-5 sm:py-6 px-6 sm:px-8
 rounded-xl shadow-lg hover:shadow-2xl
 transition-all duration-300
 transform hover:scale-[1.02] active:scale-[0.98]
 min-h-[56px] touch-manipulation
 flex items-center justify-center
 text-base sm:text-lg md:text-xl"
```

```tsx
// Icon Button
"p-3 sm:p-3.5
 min-h-[44px] min-w-[44px]
 touch-manipulation
 flex items-center justify-center
 rounded-lg
 hover:scale-110 active:scale-95
 transition-all duration-200"
```

### Inputs
```tsx
// Text Input
"w-full px-4 sm:px-6 py-5 sm:py-6
 border-2 border-dark-600 rounded-xl
 bg-dark-800
 text-base sm:text-lg md:text-xl
 text-gray-100 placeholder-gray-500
 focus:outline-none focus:ring-4
 focus:ring-primary-500/20
 focus:border-primary-500"
```

```tsx
// Checkbox/Radio
"w-6 h-6 sm:w-7 sm:h-7
 text-primary-600 bg-dark-800
 border-2 border-dark-600 rounded
 focus:ring-primary-500 focus:ring-2
 cursor-pointer"
```

### Cards
```tsx
"bg-dark-card backdrop-blur-sm
 rounded-2xl shadow-xl
 border border-dark-700
 hover:border-primary-500/50
 hover:shadow-2xl hover:shadow-primary-500/10
 transition-all duration-300
 p-6 sm:p-8 lg:p-10"
```

### Grids
```tsx
// Tool grid (homepage)
"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"

// Two-column (tool pages)
"grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8"
// Main: "lg:col-span-2"
// Sidebar: "lg:col-span-1"

// Feature cards
"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"

// Options
"grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"
```

### Icons
```tsx
// Hero
"w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24"
<Icon className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />

// Section
"w-12 h-12 sm:w-14 sm:h-14"
<Icon className="h-6 w-6 sm:h-7 sm:w-7" />

// Button
<Icon className="h-5 w-5 sm:h-6 sm:w-6" />

// Inline
<Icon className="h-4 w-4 sm:h-5 sm:h-5" />
```

---

## 📝 Hero Section Template

```tsx
<div className="text-center mb-8 sm:mb-10 lg:mb-12">
  {/* Icon */}
  <div className="flex items-center justify-center mb-5 sm:mb-6">
    <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24
                    bg-gradient-to-br from-primary-500 to-primary-600
                    rounded-3xl flex items-center justify-center
                    shadow-2xl shadow-primary-500/20
                    border border-primary-400/30">
      <ToolIcon className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-white" />
    </div>
  </div>

  {/* Title */}
  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                 font-bold text-white mb-4 sm:mb-5 leading-tight">
    Tool Name
  </h1>

  {/* Description */}
  <p className="text-base sm:text-lg md:text-xl
                text-gray-300 max-w-3xl mx-auto
                leading-relaxed px-4">
    Main description of the tool and its purpose.
  </p>

  {/* Features */}
  <p className="mt-3 sm:mt-4 text-sm sm:text-base
                text-gray-400 max-w-2xl mx-auto px-4">
    Feature 1 - Feature 2 - Feature 3
  </p>
</div>
```

---

## 🔍 SEO Schema Template

```tsx
const toolStructuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Tool Name - Subtitle",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Web Browser",
  "url": "https://swissknife.site/tool-slug",
  "description": "150-160 character description with key features and benefits.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "Feature 1",
    "Feature 2",
    "Feature 3",
    "Feature 4",
    "Feature 5"
  ],
  "provider": {
    "@type": "Organization",
    "name": "SwissKnife",
    "url": "https://swissknife.site"
  }
}
```

---

## ✅ Quick Checklist

### Responsive
- [ ] Hero: Icon 16-24px, Title 3xl-6xl
- [ ] Buttons: Min 44px height
- [ ] Text: Base font 16px+
- [ ] Inputs: Larger padding & font
- [ ] Checkboxes: 24-28px
- [ ] Cards: Responsive padding
- [ ] Grids: 1→2→3→4 columns
- [ ] Spacing: Consistent scale

### SEO
- [ ] Title: 50-60 chars
- [ ] Description: 150-160 chars
- [ ] Keywords: 10-15 terms
- [ ] Schema: SoftwareApplication
- [ ] H1: One per page
- [ ] H2-H4: Proper hierarchy
- [ ] ARIA labels on buttons
- [ ] Alt text on images

---

## 🎨 Color System

```tsx
// Primary Actions
"bg-primary-600 hover:bg-primary-700 active:bg-primary-800"

// Success
"bg-green-500 text-green-300 border-green-500/30"

// Warning
"bg-yellow-500 text-yellow-300 border-yellow-500/30"

// Error
"bg-red-500 text-red-300 border-red-500/30"

// Info
"bg-blue-500 text-blue-300 border-blue-500/30"

// Backgrounds
"bg-dark-primary"      // Main background
"bg-dark-secondary"    // Section background
"bg-dark-card"        // Card background
"bg-dark-800"         // Input background
"bg-dark-700"         // Hover background
"bg-dark-600"         // Border color
```

---

## 📱 Breakpoint Reference

```
sm:  640px   - Small tablets, large phones
md:  768px   - Tablets
lg:  1024px  - Small laptops
xl:  1280px  - Desktops
2xl: 1536px  - Large desktops
```

---

## ⚡ Performance Tips

1. Use `touch-manipulation` for buttons
2. Add `flex-shrink-0` to icons
3. Implement `transition-all duration-300`
4. Use `transform` for hover/active
5. Add `shadow-lg hover:shadow-2xl`
6. Include ARIA labels
7. Test on real devices
8. Verify Core Web Vitals

---

**Keep This Handy!** Refer to RESPONSIVE_SEO_IMPROVEMENTS.md for complete patterns.
