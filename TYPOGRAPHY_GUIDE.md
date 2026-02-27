# 🎨 Typography Guide - PR Sparkz Website

## Font Family
**Montserrat** - A modern, geometric sans-serif typeface perfect for digital marketing websites.

### Loaded Weights
- 400 (Regular) - Body text
- 500 (Medium) - Small text, labels
- 600 (Semibold) - Subheadings, buttons
- 700 (Bold) - Section headings
- 800 (Extrabold) - Hero headlines

---

## 📐 Font Size Hierarchy

### Hero Headlines
```jsx
// Mobile & Desktop responsive
className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold"

// Or use custom utility
className="text-hero-sm md:text-hero font-extrabold"
```
- **Mobile**: 48px (3rem)
- **Desktop**: 72px (4.5rem)
- **Line Height**: 0.95
- **Letter Spacing**: -0.03em
- **Font Weight**: 800

---

### Section Headings
```jsx
className="text-3xl sm:text-4xl md:text-5xl font-bold"

// Or use custom utility
className="text-section-sm md:text-section"
```
- **Mobile**: 32px (2rem)
- **Desktop**: 48px (3rem)
- **Line Height**: 1.1
- **Letter Spacing**: -0.025em
- **Font Weight**: 700

---

### Subheadings
```jsx
className="text-xl sm:text-2xl md:text-3xl font-semibold"

// Or use custom utility
className="text-subhead-sm md:text-subhead"
```
- **Mobile**: 24px (1.5rem)
- **Desktop**: 30px (1.875rem)
- **Line Height**: 1.3
- **Letter Spacing**: -0.02em
- **Font Weight**: 600

---

### Body Text (Large)
```jsx
className="text-lg leading-relaxed"

// Or use custom utility
className="text-body-lg"
```
- **Size**: 18px (1.125rem)
- **Line Height**: 1.7
- **Letter Spacing**: -0.011em
- **Font Weight**: 400

---

### Body Text (Standard)
```jsx
className="text-base leading-relaxed"

// Or use custom utility
className="text-body"
```
- **Size**: 16px (1rem)
- **Line Height**: 1.7
- **Letter Spacing**: -0.011em
- **Font Weight**: 400

---

### Body Text (Small)
```jsx
className="text-sm font-medium"

// Or use custom utility
className="text-body-sm"
```
- **Size**: 14px (0.875rem)
- **Line Height**: 1.6
- **Letter Spacing**: -0.008em
- **Font Weight**: 500

---

### Buttons
```jsx
// Standard Button
className="text-base font-semibold tracking-wide"

// Or use custom utility
className="text-btn"

// Small Button
className="text-sm font-semibold tracking-wide"

// Or use custom utility
className="text-btn-sm"
```
- **Standard**: 16px (1rem)
- **Small**: 14px (0.875rem)
- **Line Height**: 1
- **Letter Spacing**: 0.02em
- **Font Weight**: 600

---

## 🎯 Usage Examples

### Hero Section
```jsx
<section>
  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-extra-tight tracking-tighter">
    Transform Your Brand
  </h1>
  <p className="text-lg sm:text-xl leading-relaxed tracking-normal mt-6">
    Strategic marketing solutions that drive real results
  </p>
  <button className="text-btn px-8 py-4 bg-purple-600 text-white rounded-xl">
    Get Started →
  </button>
</section>
```

### Section Heading
```jsx
<section>
  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
    Our Services
  </h2>
  <p className="text-body-lg mt-4">
    Comprehensive solutions designed to elevate your brand
  </p>
</section>
```

### Card Component
```jsx
<div className="bg-white rounded-xl p-6">
  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
    Social Media Marketing
  </h3>
  <p className="text-body mt-3">
    Strategic campaigns that drive engagement and build authentic connections
  </p>
  <button className="text-btn-sm mt-6 px-6 py-3 bg-purple-600 text-white rounded-lg">
    Learn More
  </button>
</div>
```

---

## ✨ Best Practices

### Letter Spacing
- **Headlines**: Tighter spacing (-0.02em to -0.03em) for bold, impactful look
- **Body Text**: Slightly negative (-0.011em) for better readability
- **Buttons/CTAs**: Slightly positive (0.02em) for emphasis

### Line Height
- **Headlines**: Tight (0.95 - 1.1) for visual impact
- **Body Text**: Relaxed (1.7) for comfortable reading
- **Buttons**: Tight (1) for compact appearance

### Font Weights
- **Hero Headlines**: 800 (Extrabold)
- **Section Headings**: 700 (Bold)
- **Subheadings**: 600 (Semibold)
- **Buttons**: 600 (Semibold)
- **Body Text**: 400 (Regular)
- **Small Text/Labels**: 500 (Medium)

---

## 🚀 Performance Optimization

### What We Did
1. ✅ Loaded only 5 weights (400, 500, 600, 700, 800)
2. ✅ Used `&display=swap` for faster initial render
3. ✅ Removed unnecessary italic variants
4. ✅ Applied font-smoothing for crisp rendering
5. ✅ Optimized letter spacing for web readability

### Font Loading Strategy
```css
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');
```

---

## 📱 Responsive Typography

All font sizes are responsive by default using Tailwind's responsive prefixes:

```jsx
// Mobile-first approach
className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
```

**Breakpoints:**
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

---

## 🎨 Custom Utilities Available

Use these pre-configured utilities for consistent typography:

```jsx
// Headlines
className="text-hero"          // Desktop hero
className="text-hero-sm"       // Mobile hero
className="text-section"       // Desktop section heading
className="text-section-sm"    // Mobile section heading
className="text-subhead"       // Desktop subheading
className="text-subhead-sm"    // Mobile subheading

// Body
className="text-body-lg"       // Large body text
className="text-body"          // Standard body text
className="text-body-sm"       // Small body text

// Buttons
className="text-btn"           // Standard button
className="text-btn-sm"        // Small button

// Letter Spacing
className="tracking-tighter"   // -0.03em
className="tracking-tight"     // -0.02em
className="tracking-normal"    // -0.011em
className="tracking-wide"      // 0.02em
className="tracking-wider"     // 0.05em

// Line Height
className="leading-extra-tight" // 0.95
className="leading-tight"       // 1.1
className="leading-snug"        // 1.3
className="leading-normal"      // 1.5
className="leading-relaxed"     // 1.7
className="leading-loose"       // 2
```

---

## ✅ Production Checklist

- [x] Montserrat imported from Google Fonts
- [x] Only necessary weights loaded (400, 500, 600, 700, 800)
- [x] Configured in Tailwind globally
- [x] Custom font size utilities created
- [x] Optimized letter spacing for readability
- [x] Proper line heights for marketing content
- [x] Font smoothing enabled
- [x] Responsive typography system
- [x] Performance optimized

---

**Made with ❤️ for PR Sparkz**
