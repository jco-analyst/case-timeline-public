# Margin and Anchor Card Positioning Analysis

## Executive Summary

**Root Cause of Horizontal Scroll:** NOT currently occurring at 1920px viewport! Current configuration (95% SVG width, 155px margins) works correctly with 15px card clearance from SVG edges.

**Optimization Opportunity:** Can gain 48px of timeline width (+3.2%) by using **Option 3** below while maintaining safety.

---

## Critical Questions Answered

### 1. minMargin Calculation (line 1605)

**Current Code:**
```javascript
const minMargin = CARD_WIDTH / 2 + 15; // 140 + 15 = 155px (prevents card cutoff)
```

**Why 155px?**
- `CARD_WIDTH / 2` (140px) = minimum distance from SVG edge to anchor card **center** to prevent card cutoff
- `+ 15` = safety buffer to ensure cards don't touch SVG edges
- Result: 15px clearance between card edges and SVG boundaries

**What happens if we reduce it?**

| minMargin Value | Clearance | Safety | Timeline Width Gain |
|----------------|-----------|--------|---------------------|
| 140px (CARD_WIDTH/2) | 0px | ❌ Cards touch edges | +30px (+2.0%) |
| 145px (CARD_WIDTH/2 + 5) | 5px | ⚠️ Minimal | +20px (+1.3%) |
| 150px (CARD_WIDTH/2 + 10) | 10px | ✓ Safe | +10px (+0.7%) |
| **155px (current)** | **15px** | **✓ Safe** | **baseline** |

**Recommendation:** Reduce to **150px** (CARD_WIDTH/2 + 10) for 10px safety clearance while gaining 10px timeline width.

---

### 2. Anchor Card Positioning (lines 2250-2265)

**Where Anchors Are Positioned:**

Left anchor (line 2252):
```javascript
leftAnchor.finalX = leftAnchor.x;  // Natural position from xScale
```

Right anchor (line 2262):
```javascript
rightAnchor.finalX = rightAnchor.x;  // Natural position from xScale
```

**Natural positions come from xScale (line 1622):**
```javascript
const xScale = d3.scaleTime()
  .domain([minDate, maxDate])
  .range([margin.left, width - margin.right]);
```

**Key Finding:** Anchors are placed at their **natural chronological positions** from xScale, NOT rigidly at `margin.left` and `width - margin.right`.

**Anchor card edges calculation:**
- If left anchor natural position = `margin.left` (timeline start):
  - Left edge = `margin.left - CARD_WIDTH/2` = 155 - 140 = **15px**
  - Right edge = `margin.left + CARD_WIDTH/2` = 155 + 140 = 295px

- If right anchor natural position = `width - margin.right` (timeline end):
  - Left edge = `(width - margin.right) - CARD_WIDTH/2` = 1650 - 140 = 1510px
  - Right edge = `(width - margin.right) + CARD_WIDTH/2` = 1650 + 140 = **1790px**
  - SVG width = 1805px, so clearance = 1805 - 1790 = **15px**

**Do anchors get flex zones?**
- No. Lines 2255 and 2261 mark anchors with `isAnchor = true`
- Line 1858 excludes anchors from redistribution: `!c.isAnchor`
- Anchors are rigidly positioned at their natural xScale positions

**Could anchors be positioned closer to edges?**
- Currently, if timeline spans exactly from `minDate` to `maxDate`, anchors will be at `margin.left` and `width - margin.right`
- This gives 15px clearance on each side
- Reducing `minMargin` to 150px would give 10px clearance (still safe)

---

### 3. Timeline Extension: SVG Width vs minMargin

**Current Configuration:**
- Container width: 1900px (viewport 1920px - 20px body padding)
- SVG width: `containerWidth * 0.95` = 1805px
- minMargin: 155px each side
- Timeline width: 1805 - 155 - 155 = **1495px**

**Trade-off Analysis:**

| Config | SVG % | minMargin | SVG Width | Timeline Width | Card Clearance |
|--------|-------|-----------|-----------|----------------|----------------|
| Current | 95% | 155px | 1805px | 1495px | 15px |
| Option 1 | 95% | 140px | 1805px | 1525px (+30px) | 0px ❌ |
| Option 2 | 95% | 150px | 1805px | 1505px (+10px) | 10px ✓ |
| **Option 3** | **97%** | **150px** | **1843px** | **1543px (+48px)** | **10px ✓** |
| Option 4 | 97% | 155px | 1843px | 1533px (+38px) | 15px ✓ |
| Option 5 | 99% | 150px | 1881px | 1581px (+86px) | 10px ⚠️ |

**Recommendation:** **Option 3** - Balance between space efficiency and safety
- SVG width: 97% (up from 95%)
- minMargin: 150px (down from 155px)
- Gains: 48px timeline width (+3.2%)
- Safety: 10px clearance maintained

---

### 4. Card Edge Calculations

**Formula:**
- Card centered at position X
- Left edge = `X - CARD_WIDTH/2` = `X - 140`
- Right edge = `X + CARD_WIDTH/2` = `X + 140`

**Example (Current Config):**

Leftmost card at `margin.left` (155px):
- Left edge = 155 - 140 = **15px**
- Right edge = 155 + 140 = 295px
- ✓ Left edge is 15px from SVG left boundary (x=0)

Rightmost card at `width - margin.right` (1650px):
- Left edge = 1650 - 140 = 1510px
- Right edge = 1650 + 140 = **1790px**
- SVG width = 1805px
- ✓ Right edge is 15px from SVG right boundary (x=1805)

**Is the right edge exceeding SVG width?**
- No. With current config, right edge = 1790px < SVG width (1805px)
- Clearance = 15px

---

### 5. Horizontal Scroll Root Cause

**Current Status at 1920px viewport:**
- Body scrollWidth = 1920px
- Body clientWidth = 1920px
- ✓ **NO HORIZONTAL SCROLL**

**Why it works:**
1. SVG width (1805px) < container width (1900px) ✓
2. Rightmost card edge (1790px) < SVG width (1805px) ✓
3. All elements contained within viewport ✓

**When would horizontal scroll appear?**
- If SVG width > container width (e.g., SVG at 99% = 1881px, container overflow would occur)
- If cards extend beyond SVG width (e.g., minMargin < CARD_WIDTH/2)
- If viewport < ~1900px (then 95% SVG might exceed viewport)

**Which element would cause scroll?**
1. Primary: SVG element itself if too wide for container
2. Secondary: Overflowing cards if they exceed SVG width
3. The container has `overflow-x: hidden` (line 70), so body would scroll, not container

---

### 6. Optimal Configuration

**Recommended Values (Option 3):**

```javascript
// Line 1603: Increase SVG width to 97%
const width = containerWidth * 0.97;  // Changed from 0.95

// Line 1605: Reduce minMargin to 150px
const minMargin = CARD_WIDTH / 2 + 10; // Changed from +15
```

**Benefits:**
- Timeline width: 1543px (up from 1495px) = **+48px (+3.2%)**
- Card clearance: 10px (down from 15px, still safe)
- More horizontal space for cards = fewer redistributions needed
- Less horizontal scroll on smaller viewports

**At 1920px viewport:**
- Container: 1900px
- SVG: 1843px (97%)
- Margins: 150px each side
- Timeline: 1543px
- Left card edge: 150 - 140 = 10px (safe)
- Right card edge: 1843 - 150 + 140 = 1833px (safe, 10px clearance)

**Validation:**
- ✓ Cards don't touch SVG edges (10px clearance)
- ✓ SVG fits in container (1843px < 1900px)
- ✓ No horizontal scroll
- ✓ 48px more timeline space

---

## Workflow: How Margins and Anchors Work

### Phase 1: Dimension Calculation (lines 1600-1611)

```javascript
const containerWidth = container.node().clientWidth;  // 1900px
const width = containerWidth * 0.95;                  // 1805px (SVG width)
const minMargin = CARD_WIDTH / 2 + 15;                // 155px
const margin = {
  left: Math.max(containerWidth * 0.015, minMargin),  // 155px (minMargin wins)
  right: Math.max(containerWidth * 0.015, minMargin)  // 155px
};
```

**Note:** `containerWidth * 0.015` = 28.5px, so `minMargin` (155px) always wins.

### Phase 2: xScale Creation (lines 1620-1622)

```javascript
const xScale = d3.scaleTime()
  .domain([minDate, maxDate])
  .range([margin.left, width - margin.right]);  // [155px, 1650px]
```

This maps dates to X positions within the timeline bounds.

### Phase 3: Event Natural Positions (lines 1628-1636)

```javascript
viewportEvents.forEach(e => {
  e.x = xScale(e.parsedDate);  // Natural chronological position
});
```

Each event gets a natural X position based on its date.

### Phase 4: Anchor Cards (lines 2236-2265)

**Left anchor:**
- Positioned at `leftAnchor.x` (natural position from xScale)
- If leftmost event date = minDate, then `x = margin.left` (155px)
- Tier: `above1`
- Marked with `isAnchor = true` (cannot be redistributed)

**Right anchor:**
- Positioned at `rightAnchor.x` (natural position from xScale)
- If rightmost event date = maxDate, then `x = width - margin.right` (1650px)
- Tier: `below1`
- Marked with `isAnchor = true` (cannot be redistributed)

### Phase 5: Middle Cards (recursive placement)

Uses redistribution algorithm (lines 1854-2007) to fit cards between anchors:
- Respects anchor positions as fixed boundaries
- Tries to place cards within flex zones (±112px from natural position)
- Redistributes cards globally if collisions occur
- Never moves anchor cards

### Phase 6: Rendering (lines 2343-2399)

```javascript
const cardCenterX = event.finalX || (x + offset);  // Use calculated position
const cardLeft = cardCenterX - CARD_WIDTH / 2;
const cardRight = cardCenterX + CARD_WIDTH / 2;
```

Cards are rendered as foreignObject elements with calculated positions.

---

## Code Locations for Relevant Calculations

### Dimension Setup
- **Line 1602:** `containerWidth` calculation
- **Line 1603:** SVG width (95% of container) ← **CHANGE TO 0.97**
- **Line 1605:** `minMargin` calculation ← **CHANGE TO CARD_WIDTH/2 + 10**
- **Lines 1608-1609:** Margin left/right (max of 1.5% or minMargin)

### xScale Configuration
- **Lines 1620-1622:** xScale domain and range setup
- Range: `[margin.left, width - margin.right]`

### Anchor Positioning
- **Lines 2250-2256:** Left anchor setup
- **Lines 2258-2265:** Right anchor setup
- **Line 2255 & 2261:** `isAnchor = true` flag

### Redistribution Boundaries
- **Lines 1800-1801:** Initial boundaries set to timeline margins
- **Lines 1892-1893:** Redistribution boundaries
- **Lines 1896-1906:** Adjust boundaries for anchors on same tier

### Flex Zone Calculation
- **Line 1750:** `FLEX_ZONE = CARD_WIDTH * 0.4` (112px)
- **Lines 2354-2362:** Flex zone for connector attachment
- **Lines 1834-1835:** Flex zone for L-connector determination

### Card Edge Calculations
- **Lines 2349-2350:** Card left/right edges during rendering
- **Lines 2185-2186:** Card edges during redistribution logging
- **Lines 2194-2195:** Card edges after placement

---

## Anchor Flex Zones: The Truth

**Question:** Do anchor cards have flex zones?

**Answer:** No, anchors are rigidly positioned.

**Evidence:**
1. Lines 2252 & 2262: `leftAnchor.finalX = leftAnchor.x` (no offset applied)
2. Lines 2255 & 2261: `isAnchor = true` flag set
3. Line 1858: Redistribution explicitly excludes anchors: `!c.isAnchor`
4. Lines 1896-1906: Anchors act as fixed constraints for redistribution of other cards

**Anchor positioning rules:**
- Left anchor placed at its natural xScale position (often `margin.left`)
- Right anchor placed at its natural xScale position (often `width - margin.right`)
- Always on tiers `above1` and `below1` respectively
- Never redistributed, never moved
- Other cards must fit around them

---

## Recommendations Summary

### 1. Optimal Configuration (Recommended)
```javascript
// Line 1603
const width = containerWidth * 0.97;  // Up from 0.95

// Line 1605
const minMargin = CARD_WIDTH / 2 + 10;  // Down from +15
```

**Benefits:**
- +48px timeline width (+3.2%)
- Maintains 10px safety clearance
- No horizontal scroll at 1920px viewport
- Better card spacing, fewer redistributions

### 2. Conservative Option (If concerns about edge clearance)
```javascript
// Line 1603
const width = containerWidth * 0.97;  // Up from 0.95

// Line 1605 - KEEP CURRENT
const minMargin = CARD_WIDTH / 2 + 15;  // Unchanged
```

**Benefits:**
- +38px timeline width (+2.5%)
- Maintains 15px safety clearance (current)
- No horizontal scroll at 1920px viewport

### 3. Aggressive Option (Maximum space, minimal safety)
```javascript
// Line 1603
const width = containerWidth * 0.99;  // Up from 0.95

// Line 1605
const minMargin = CARD_WIDTH / 2 + 5;  // Down to minimal safety
```

**Benefits:**
- +91px timeline width (+6.1%)
- ⚠️ Only 5px safety clearance
- ⚠️ Risk of horizontal scroll on some viewports

---

## Testing Recommendations

After implementing changes:

1. **Visual inspection:** Check card edges don't touch SVG boundaries
2. **Different viewports:** Test at 1920px, 1440px, 1280px
3. **All views:** Test "All Events" view (most cards)
4. **Redistribution:** Verify cards still redistribute correctly
5. **Console check:** Run `test-margin-analysis.js` to verify no overflow

**Test command:**
```bash
node --experimental-default-type=module test-margin-analysis.js
```

Look for:
- `Body has horizontal scroll: NO ✓`
- `Card clearance from SVG edges: 10px` (or higher)
- `Right card exceeds SVG bounds: NO ✓`

---

## Conclusion

**Current system works correctly** - no horizontal scroll detected at 1920px viewport.

**Optimization available:** Implement **Option 3** (97% SVG width + 150px minMargin) to gain 48px of timeline width while maintaining safe 10px card clearance.

**Key insight:** The +15px in minMargin calculation was conservative. Reducing to +10px is safe and provides meaningful space savings for better card layout.
