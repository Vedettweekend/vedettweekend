# Image Optimization Guide for Vedett Weekend

## 🚨 Critical Images to Optimize

### 1. vedett25.webp (Current: 395KB → Target: 50-80KB)
- **Current size**: 2000x1461px
- **Display size**: Max 400px height
- **Action**: Resize to 800x585px (2x for retina displays)
- **Format**: Keep as WebP (already optimal)
- **Tools**: Use TinyPNG, Squoosh.app, or ImageOptim

### 2. tba.jpg (Current: 769KB → Target: 80-120KB)
- **Current size**: 1094x791px  
- **Display size**: Max 400px height
- **Action**: Resize to 800x578px (2x for retina displays)
- **Format**: Convert to WebP for better compression
- **Tools**: Use Squoosh.app to convert JPG → WebP

### 3. Sponsor Logos (Various sizes → Target: 10-30KB each)
- **Current issues**: Most are oversized for 60px height display
- **Action**: Resize all to 120x60px (2x for retina)
- **Format**: Convert PNG to WebP where possible

## 🛠️ Recommended Tools

### Online Tools (Free):
1. **Squoosh.app** (Google) - Best for WebP conversion
2. **TinyPNG** - Good for PNG/JPG compression
3. **Compressor.io** - Simple interface

### Desktop Apps:
1. **ImageOptim** (Mac) - Drag & drop optimization
2. **FileOptimizer** (Windows) - Batch processing

## 📱 Responsive Image Implementation

After optimization, implement responsive images:

```html
<!-- For vedett25.webp -->
<img src="img/vedett25-800.webp" 
     srcset="img/vedett25-400.webp 400w,
             img/vedett25-800.webp 800w"
     sizes="(max-width: 768px) 90vw, 400px"
     alt="Vedett Weekend Logo"
     loading="eager"
     fetchpriority="high">

<!-- For tba.jpg (convert to WebP) -->
<img src="img/tba-800.webp"
     srcset="img/tba-400.webp 400w,
             img/tba-800.webp 800w" 
     sizes="(max-width: 768px) 90vw, 400px"
     alt="Artist Image"
     loading="lazy">
```

## 🎯 Expected Performance Impact

- **Image size reduction**: 1.7MB → 400KB (75% reduction)
- **PageSpeed score improvement**: 56 → 70-75 (Phase 1)
- **LCP improvement**: 5.7s → 3.5-4.0s
- **FCP improvement**: 3.0s → 2.0-2.5s

## 📋 Action Items

1. **Immediate**: Optimize vedett25.webp and tba.jpg
2. **Next**: Optimize all sponsor logos
3. **Final**: Implement responsive image srcset
4. **Test**: Run PageSpeed Insights again

## 🔗 Useful Links

- [Squoosh.app](https://squoosh.app/) - Image optimization
- [TinyPNG](https://tinypng.com/) - PNG/JPG compression  
- [WebP Converter](https://convertio.co/jpg-webp/) - JPG to WebP
