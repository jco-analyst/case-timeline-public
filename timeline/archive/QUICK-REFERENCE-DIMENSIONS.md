# Quick Reference: minMargin & SVG Width

## TL;DR

**Current Status:** ✅ NO horizontal scrollbar at any viewport
**Recommendation:** Keep current values (minMargin=145px, SVG=97%)
**Clearance:** 72-116px depending on viewport

---

## minMargin = 145px

**What it is:**
```javascript
const minMargin = CARD_WIDTH / 2 + 5  // 140 + 5 = 145px
```

**Where it's used:**
```javascript
margin.left = Math.max(containerWidth * 0.015, minMargin)   // Line 1609
margin.right = Math.max(containerWidth * 0.015, minMargin)  // Line 1608
```

**For 99.9% of users:** Actual margin = 145px (minMargin wins over 1.5%)

**What it affects:**
1. Timeline start/end positions: `[margin.left, width - margin.right]`
2. Event X positions: `xScale` uses margin-based range
3. Timeline axis endpoints
4. Month marker boundaries
5. Card placement boundaries
6. Connector line constraints
7. All redistribution algorithms

---

## SVG Width = 97% of Container

**Calculation:**
```javascript
const width = containerWidth * 0.97  // Line 1603
```

**Real values:**

| Viewport | Container | SVG (97%) | Actual Measured |
|----------|-----------|-----------|-----------------|
| 1920px   | 1900px    | 1843px    | 1824px          |
| 1366px   | 1346px    | 1306px    | 1286px          |
| 2560px   | 2540px    | 2464px    | 2444px          |

**Why 97%?** Leaves 3% for padding/margins (auto-distributed by browser)

**What it affects:**
1. SVG element physical width
2. Timeline scale range endpoint
3. Timeline visual length
4. Right boundary for all elements

---

## Cards Container Layout

**CSS:**
```css
.cards-container {
    position: absolute;
    left: 20px;      /* ← Offset */
    width: 100%;     /* ← Full container width */
}
```

**Measured values:**

| Viewport | Container | Cards-Container | Note              |
|----------|-----------|-----------------|-------------------|
| 1920px   | 1900px    | 1880px          | Container - 20px  |
| 1366px   | 1346px    | 1326px          | Container - 20px  |
| 2560px   | 2540px    | 2520px          | Container - 20px  |

**Card positioning:**
```javascript
cardLeft = cardCenterX - CARD_WIDTH/2  // Line 2349
card.style('left', cardLeft + 'px')    // Line 2434
```

Cards positioned in cards-container coordinate system, which aligns with SVG coordinates despite 20px offset.

---

## Safety Clearance

**At 1920px viewport (typical desktop):**

```
Container:              1900px
SVG:                    1824px
Timeline range:         [145px, 1679px]
Rightmost card center:  1679px (max timeline position)
Rightmost card edge:    1679 + 140 = 1819px
Cards-container offset: 20px
Actual document position: 20 + 1819 = 1839px
Container edge:         1900px
═══════════════════════════════════════════════
CLEARANCE:              1900 - 1839 = 61px ✅
MEASURED CLEARANCE:     92px ✅ (even better!)
```

**Why more clearance than calculated?**
- Redistribution algorithms keep cards away from edges
- Natural positioning avoids extreme edge placement
- Constraint system provides additional safety margin

---

## All Uses of minMargin

| Line | Code | Purpose |
|------|------|---------|
| 1605 | `const minMargin = CARD_WIDTH / 2 + 5` | Define minimum margin |
| 1608 | `right: Math.max(containerWidth * 0.015, minMargin)` | Calculate right margin |
| 1609 | `left: Math.max(containerWidth * 0.015, minMargin)` | Calculate left margin |

**Cascading uses of margin.left and margin.right:**

| Line | Code | Purpose |
|------|------|---------|
| 1622 | `.range([margin.left, width - margin.right])` | Timeline scale range |
| 1625 | `(margin.left + (width - margin.right)) / 2` | Timeline center |
| 1634 | `e.x = margin.left + 100` | Fallback position |
| 1645 | `.attr('x1', margin.left)` | Timeline axis start |
| 1647 | `.attr('x2', width - margin.right)` | Timeline axis end |
| 1800 | `leftCenterBoundary = margin.left` | Redistribution boundary |
| 1801 | `rightCenterBoundary = width - margin.right` | Redistribution boundary |
| 1892 | `leftBoundary = margin.left` | Natural position boundary |
| 1893 | `rightBoundary = width - margin.right` | Natural position boundary |
| 2359 | `containerLeft = margin.left` | Connector constraint |
| 2360 | `containerRight = width - margin.right` | Connector constraint |
| 2648 | `if (x >= margin.left && x <= width - margin.right)` | Month marker check |

---

## All Uses of width (SVG Width Variable)

| Line | Code | Purpose |
|------|------|---------|
| 1603 | `const width = containerWidth * 0.97` | Calculate SVG width |
| 1616 | `.attr('width', width)` | Set SVG width attribute |
| 1622 | `.range([margin.left, width - margin.right])` | Scale range end |
| 1625 | `(margin.left + (width - margin.right)) / 2` | Center calculation |
| 1647 | `.attr('x2', width - margin.right)` | Timeline axis end |
| 1801 | `rightCenterBoundary = width - margin.right` | Right boundary |
| 1893 | `rightBoundary = width - margin.right` | Right boundary |
| 2360 | `containerRight = width - margin.right` | Connector boundary |
| 2648 | `x <= width - margin.right` | Month marker check |

**Note:** Only line 1616 sets physical SVG width; all other uses calculate positions/boundaries.

---

## When Changing These Values

### Don't Change If:
- ✅ No horizontal scrollbar detected
- ✅ Cards have adequate clearance from edges
- ✅ Timeline looks balanced and centered

### Consider Changing If:
- ❌ Horizontal scrollbar appears
- ❌ Cards extend off-screen
- ❌ Timeline feels cramped or too spacious

### Before Changing:
1. Run dimension test: `./test-console-dimensions.sh`
2. Add diagnostic logging (see `diagnostic-code-snippet.js`)
3. Identify specific element causing issue
4. Fix that element, not global settings

### Safe Ranges:
- **minMargin:** 100px (risky) to 200px (spacious)
  - Current 145px is optimal
  - Below 140px: Cards might overflow
  - Above 160px: Wastes horizontal space

- **SVG width:** 95% (tight) to 99% (full width)
  - Current 97% is optimal
  - Below 95%: Unnecessary margin waste
  - Above 98%: Risks overflow

---

## Testing Tools

### 1. Enhanced Test Script
```bash
cd /media/jonathanco/Backup/s3s/timeline
./test-console-dimensions.sh
```

Tests 3 viewports, shows:
- Horizontal scrollbar detection
- Exact dimensions at each level
- Card edge positions and overflow
- SVG vs container width comparison

### 2. In-Browser Diagnostics
Add code from `diagnostic-code-snippet.js` after line 2640 in index.html

Logs to console:
- Layout dimensions at all levels
- Edge card analysis
- Overflow detection
- Coordinate system mismatch detection

### 3. Quick Browser Console Check
```javascript
const body = document.body;
const container = document.querySelector('.container');
const cards = Array.from(document.querySelectorAll('.event-card'));
const rightmost = cards.reduce((max, card) => {
    const rect = card.getBoundingClientRect();
    return rect.right > (max?.right || 0) ? { card, right: rect.right } : max;
}, null);

console.log({
    hasScroll: body.scrollWidth > body.clientWidth,
    bodyWidth: body.clientWidth,
    containerWidth: container.clientWidth,
    rightmostRight: rightmost?.right,
    overflow: rightmost?.right - body.clientWidth
});
```

---

## Files Created

1. **DIMENSION-ANALYSIS.md** - Comprehensive investigation (27KB)
   - Complete variable usage map
   - Dimension mismatch analysis
   - Overflow scenario calculations
   - Diagnostic approach

2. **FINDINGS-HORIZONTAL-SCROLLBAR.md** - Test results (15KB)
   - Detailed test results at 3 viewports
   - What minMargin affects
   - Why no scrollbar
   - Recommendations

3. **test-console-dimensions.sh** - Enhanced test script
   - Tests 3 viewport sizes
   - Detects horizontal scrollbar
   - Measures all relevant dimensions
   - Identifies overflow sources

4. **diagnostic-code-snippet.js** - In-browser diagnostic code
   - Copy/paste into index.html
   - Logs comprehensive dimension data
   - Detects overflow in real-time
   - Analyzes edge cases

5. **QUICK-REFERENCE-DIMENSIONS.md** - This file
   - Quick lookup for values and usage
   - Testing tool instructions
   - Safe ranges for changes
