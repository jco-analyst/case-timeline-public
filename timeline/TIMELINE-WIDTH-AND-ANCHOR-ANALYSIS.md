# Timeline Width and Anchor Card Analysis

## Executive Summary

**Timeline Width:** Currently determined by min/max event dates with 1-day padding. Can be extended by adding time padding to xScale domain.

**Anchor Cards:** Leftmost/rightmost cards positioned RIGIDLY at their natural X position with NO flex zones. Anchors are explicitly excluded from redistribution.

**Flex Zone Behavior:** Only middle cards get flex zones (112px). Anchors have `offset = 0` and `isAnchor = true` flag.

## Complete Algorithm Workflow

```
Step 1: Calculate viewport date range
  → viewportStartDate = min(all event dates) - 1 day
  → viewportEndDate = max(all event dates) + 1 day

Step 2: Create xScale mapping dates to X positions
  → xScale = d3.scaleTime()
      .domain([viewportStartDate, viewportEndDate])
      .range([margin.left, width - margin.right])

Step 3: Calculate natural X position for each event
  → event.x = xScale(event.parsedDate)

Step 4: Identify and anchor end cards
  → leftAnchor = pointEvents[0]
  → rightAnchor = pointEvents[pointEvents.length - 1]
  → Set: leftAnchor.isAnchor = true, rightAnchor.isAnchor = true
  → Set: leftAnchor.finalX = leftAnchor.x (no flex!)
  → Set: rightAnchor.finalX = rightAnchor.x (no flex!)
  → leftAnchor placed on above1, rightAnchor on below1

Step 5: Place middle cards recursively
  → Uses redistribution with flex zones (112px)
  → Anchors act as fixed constraints (excluded from redistribution)

Step 6: Draw connectors
  → Anchors: straight connectors (offset = 0, connectorAttachX = x)
  → Middle cards: flex connectors (can attach off-center)
```

---

## 1. Timeline Width Calculation

### Current Implementation

**Location:** Lines 1585-1623

```javascript
// Calculate viewport date range (lines 1289-1294)
viewportStartDate = d3.min(viewportDates);
viewportEndDate = d3.max(viewportDates);

// Add 1 day padding on each side
viewportStartDate = d3.timeDay.offset(viewportStartDate, -1);
viewportEndDate = d3.timeDay.offset(viewportEndDate, 1);

// Create xScale (lines 1621-1623)
const xScale = d3.scaleTime()
  .domain([minDate, maxDate])  // uses viewportStartDate/viewportEndDate
  .range([margin.left, width - margin.right]);

// Apply xScale to events (line 1630)
viewportEvents.forEach(e => {
  e.x = xScale(e.parsedDate);
});
```

### Key Variables

- **minDate/maxDate:** Set to viewportStartDate/viewportEndDate (includes 1-day padding)
- **margin.left/right:** Dynamic based on container width
  - `minMargin = CARD_WIDTH/2 + 5 = 145px` (ensures half-card fits)
  - `margin.left/right = Math.max(containerWidth * 0.015, minMargin)`
- **xScale domain:** `[viewportStartDate, viewportEndDate]`
- **xScale range:** `[margin.left, width - margin.right]`

### Timeline Boundaries

```
Timeline starts: margin.left (typically 145px)
Timeline ends: width - margin.right (typically containerWidth*0.97 - 145px)
```

---

## 2. Anchor Card Selection

### Current Implementation

**Location:** Lines 2238-2266

```javascript
if (pointEvents.length === 1) {
  // Only one card - anchor it
  const singleCard = pointEvents[0];
  singleCard.assignedTier = 'above1';
  singleCard.finalX = singleCard.x;  // ← RIGID POSITIONING
  singleCard.offset = 0;
  singleCard.usesLConnector = false;
} else {
  // Left anchor (first chronologically)
  const leftAnchor = pointEvents[0];
  leftAnchor.assignedTier = 'above1';
  leftAnchor.finalX = leftAnchor.x;      // ← RIGID POSITIONING
  leftAnchor.offset = 0;
  leftAnchor.usesLConnector = false;
  leftAnchor.isAnchor = true;            // ← MARKED AS ANCHOR

  // Right anchor (last chronologically)
  const rightAnchor = pointEvents[pointEvents.length - 1];
  rightAnchor.assignedTier = 'below1';
  rightAnchor.isAnchor = true;           // ← MARKED AS ANCHOR
  rightAnchor.finalX = rightAnchor.x;    // ← RIGID POSITIONING
  rightAnchor.offset = 0;
  rightAnchor.usesLConnector = false;
}
```

### Anchor Selection Rules

1. **Left anchor:** `pointEvents[0]` (chronologically first)
2. **Right anchor:** `pointEvents[pointEvents.length - 1]` (chronologically last)
3. **Tier assignment:** Left → above1, Right → below1 (hardcoded)
4. **Position:** `finalX = x` (natural position, NO flex zone)
5. **Flag:** `isAnchor = true` (prevents redistribution)

---

## 3. Anchor Card Positioning

### Current Behavior: RIGID (No Flex)

**Key code:**
```javascript
leftAnchor.finalX = leftAnchor.x;   // Natural position (xScale result)
leftAnchor.offset = 0;              // Zero offset
leftAnchor.isAnchor = true;         // Prevents redistribution
```

**Constraints:**
- Anchors are positioned at EXACT natural X: `finalX = xScale(parsedDate)`
- No flex zone applied
- Explicitly excluded from redistribution (line 1859)
- Act as fixed boundaries for middle card redistribution

### Redistribution Exclusion

**Location:** Lines 1856-1860

```javascript
function tryPlaceWithRedistribution(newCard, tier, placedCards) {
  // Get all cards currently on this tier (EXCLUDING ANCHORS)
  const cardsOnTier = placedCards.filter(c =>
    c.assignedTier === tier &&
    !c.isAnchor  // ← Don't redistribute anchor cards
  );
  ...
}
```

**Location:** Lines 1889-1908

```javascript
// Get anchor cards on this tier as fixed constraints
const anchorsOnTier = allPlacedCards.filter(c => c.assignedTier === tier && c.isAnchor);

// If there's a left anchor on this tier, constrain left boundary
const leftAnchor = anchorsOnTier.find(a => a.finalX < cards[0].x);
if (leftAnchor) {
  leftBoundary = leftAnchor.finalX + CARD_WIDTH/2 + MIN_GAP + CARD_WIDTH/2;
}

// If there's a right anchor on this tier, constrain right boundary
const rightAnchor = anchorsOnTier.find(a => a.finalX > cards[cards.length-1].x);
if (rightAnchor) {
  rightBoundary = rightAnchor.finalX - CARD_WIDTH/2 - MIN_GAP - CARD_WIDTH/2;
}
```

**Result:** Anchors create immovable boundaries that constrain redistribution of other cards on the same tier.

---

## 4. Connector Attachment Logic

### Current Implementation

**Location:** Lines 2353-2393, 2516-2570

```javascript
// Calculate flexible attachment point for connector line
const FLEX_ZONE = CARD_WIDTH * 0.4; // 112px for 280px card
let flexZoneLeft = cardCenterX - FLEX_ZONE;
let flexZoneRight = cardCenterX + FLEX_ZONE;

// Constrain flex zone to container bounds
flexZoneLeft = Math.max(flexZoneLeft, containerLeft);
flexZoneRight = Math.min(flexZoneRight, containerRight);

// Constrain flex zone to chronological neighbors
if (pointEventIndex > 0) {
  const prevEvent = pointEvents[pointEventIndex - 1];
  flexZoneLeft = Math.max(flexZoneLeft, prevEvent.x);
}
if (pointEventIndex < pointEvents.length - 1) {
  const nextEvent = pointEvents[pointEventIndex + 1];
  flexZoneRight = Math.min(flexZoneRight, nextEvent.x);
}

// Determine connector attachment X position
let connectorAttachX;
if (x >= flexZoneLeft && x <= flexZoneRight) {
  // Event dot within flex zone - connect directly (straight)
  connectorAttachX = x;
} else if (x < flexZoneLeft) {
  // Event dot left of flex zone - connect at left edge
  connectorAttachX = flexZoneLeft;
} else {
  // Event dot right of flex zone - connect at right edge
  connectorAttachX = flexZoneRight;
}
```

### Connector Drawing

```javascript
// Draw connector line (lines 2516-2570)
if (offset === 0 && connectorAttachX === x) {
  // Straight vertical line (no offset, connector at natural position)
  svg.append('line')
    .attr('x1', x)
    .attr('y1', timelineY)
    .attr('x2', x)
    .attr('y2', cardEdgeY);
} else {
  // L-shaped connector (offset OR horizontal attachment adjustment)

  // Vertical segment: timeline dot to transition point
  svg.append('line')
    .attr('x1', x)
    .attr('y1', timelineY)
    .attr('x2', x)
    .attr('y2', transitionY);

  // Horizontal segment: transition point to attachment X
  svg.append('line')
    .attr('x1', x)
    .attr('y1', transitionY)
    .attr('x2', connectorAttachX)
    .attr('y2', transitionY);

  // Vertical segment: attachment X to card edge
  svg.append('line')
    .attr('x1', connectorAttachX)
    .attr('y1', transitionY)
    .attr('x2', connectorAttachX)
    .attr('y2', cardEdgeY);
}
```

### Anchor Connector Behavior

**For anchors:**
- `offset = 0` (no horizontal shift)
- `finalX = x` (card at natural position)
- `connectorAttachX = x` (connector at natural position)
- Result: Straight vertical connector (no L-shape)

**For middle cards:**
- May have `offset !== 0` (redistributed position)
- `finalX = x + offset` (shifted from natural position)
- `connectorAttachX` calculated based on flex zone
- Result: Can have L-shaped connector if outside flex zone

---

## 5. Constants and Dimensions

```javascript
CARD_WIDTH = 280;           // Card width in pixels
MIN_GAP = 5;                // Minimum spacing between cards
FLEX_ZONE = 280 * 0.4;      // 112px flex zone for card placement
                            // (40% of card width on each side)

minMargin = 145;            // CARD_WIDTH/2 + 5 = 140 + 5
margin.left = Math.max(containerWidth * 0.015, minMargin);
margin.right = Math.max(containerWidth * 0.015, minMargin);

containerWidth = container.node().clientWidth;
width = containerWidth * 0.97;
```

---

## 6. How to Extend Timeline Width

### Option A: Add Time Padding to xScale Domain (RECOMMENDED)

**Current:**
```javascript
viewportStartDate = d3.timeDay.offset(viewportStartDate, -1);  // 1 day before
viewportEndDate = d3.timeDay.offset(viewportEndDate, 1);        // 1 day after
```

**Proposed:**
```javascript
// Add 30 days (or configurable padding) before first event
viewportStartDate = d3.timeDay.offset(viewportStartDate, -30);

// Add 30 days (or configurable padding) after last event
viewportEndDate = d3.timeDay.offset(viewportEndDate, 30);
```

**Effect:**
- Timeline extends further left and right
- More horizontal space between events
- Left/right anchors will be further from timeline edges
- Middle cards have more space for redistribution

### Option B: Extend Pixel Margins

**Current:**
```javascript
margin.left = Math.max(containerWidth * 0.015, 145);
margin.right = Math.max(containerWidth * 0.015, 145);
```

**Proposed:**
```javascript
// Increase margin multiplier or add absolute padding
const TIMELINE_PADDING = 200; // Extra pixel padding
margin.left = Math.max(containerWidth * 0.015, 145) + TIMELINE_PADDING;
margin.right = Math.max(containerWidth * 0.015, 145) + TIMELINE_PADDING;
```

**Effect:**
- Timeline axis itself is shorter (less horizontal space)
- More whitespace at edges
- NOT RECOMMENDED - reduces space for events

### Recommendation

**Use Option A (time padding)** because:
1. Extends timeline proportionally with date range
2. Provides more space for card redistribution
3. Keeps anchor cards away from edges
4. Maintains proper chronological spacing

---

## 7. How to Implement Anchor Flex Zones

### Current Anchor Constraints

```javascript
// Left anchor: RIGID at natural position
leftAnchor.finalX = leftAnchor.x;
leftAnchor.offset = 0;
leftAnchor.isAnchor = true;

// Right anchor: RIGID at natural position
rightAnchor.finalX = rightAnchor.x;
rightAnchor.offset = 0;
rightAnchor.isAnchor = true;
```

### Proposed: Directional Flex Zones

#### Left Anchor Flex Zone

**Constraint:** Can only shift RIGHT (towards center)

```javascript
// Left anchor with rightward flex
const leftAnchor = pointEvents[0];
leftAnchor.assignedTier = 'above1';
leftAnchor.isAnchor = true;

// Allow shift right within FLEX_ZONE (112px)
const minX = leftAnchor.x;  // Can't go left of natural position
const maxX = leftAnchor.x + FLEX_ZONE;  // Can shift right up to 112px

// Try to place at natural position first
leftAnchor.finalX = leftAnchor.x;
leftAnchor.offset = 0;

// If there's a collision or better redistribution, allow shift right
// (This would require modifying the placement algorithm)
```

#### Right Anchor Flex Zone

**Constraint:** Can only shift LEFT (towards center)

```javascript
// Right anchor with leftward flex
const rightAnchor = pointEvents[pointEvents.length - 1];
rightAnchor.assignedTier = 'below1';
rightAnchor.isAnchor = true;

// Allow shift left within FLEX_ZONE (112px)
const minX = rightAnchor.x - FLEX_ZONE;  // Can shift left up to 112px
const maxX = rightAnchor.x;  // Can't go right of natural position

// Try to place at natural position first
rightAnchor.finalX = rightAnchor.x;
rightAnchor.offset = 0;

// If there's a collision or better redistribution, allow shift left
```

### Connector Attachment for Flexible Anchors

**Left Anchor (shifted right):**
```javascript
// If leftAnchor.finalX > leftAnchor.x (shifted right)
const shiftAmount = leftAnchor.finalX - leftAnchor.x;

// Connector attaches LEFT of card center
const connectorAttachX = leftAnchor.finalX - (shiftAmount / 2);
// This creates visual indication that card shifted right from natural position
```

**Right Anchor (shifted left):**
```javascript
// If rightAnchor.finalX < rightAnchor.x (shifted left)
const shiftAmount = rightAnchor.x - rightAnchor.finalX;

// Connector attaches RIGHT of card center
const connectorAttachX = rightAnchor.finalX + (shiftAmount / 2);
// This creates visual indication that card shifted left from natural position
```

### Example Calculation

**Left Anchor Example:**
```
Natural position: x = 300
Shifted position: finalX = 350 (shifted 50px right)
Connector attachment: connectorAttachX = 350 - 25 = 325
Result: Connector attaches 25px left of card center
```

**Right Anchor Example:**
```
Natural position: x = 1500
Shifted position: finalX = 1450 (shifted 50px left)
Connector attachment: connectorAttachX = 1450 + 25 = 1475
Result: Connector attaches 25px right of card center
```

---

## 8. Implementation Approach

### Step 1: Extend Timeline Width

**File:** `/media/jonathanco/Backup/s3s/timeline/index.html`
**Lines:** 1289-1294

```javascript
// BEFORE:
viewportStartDate = d3.timeDay.offset(viewportStartDate, -1);
viewportEndDate = d3.timeDay.offset(viewportEndDate, 1);

// AFTER:
const TIMELINE_PADDING_DAYS = 30; // Configurable
viewportStartDate = d3.timeDay.offset(viewportStartDate, -TIMELINE_PADDING_DAYS);
viewportEndDate = d3.timeDay.offset(viewportEndDate, TIMELINE_PADDING_DAYS);
```

### Step 2: Implement Anchor Flex Zones

**File:** `/media/jonathanco/Backup/s3s/timeline/index.html`
**Lines:** 2250-2266

```javascript
// Left anchor with rightward flex
const leftAnchor = pointEvents[0];
leftAnchor.assignedTier = 'above1';
leftAnchor.isAnchor = true;
leftAnchor.anchorDirection = 'right'; // Can only shift right
leftAnchor.x = xScale(leftAnchor.parsedDate); // Natural position
leftAnchor.flexZoneMin = leftAnchor.x; // Can't go left
leftAnchor.flexZoneMax = leftAnchor.x + FLEX_ZONE; // Can go right up to 112px
leftAnchor.finalX = leftAnchor.x; // Start at natural position
leftAnchor.offset = 0;
leftAnchor.usesLConnector = false;

// Right anchor with leftward flex
const rightAnchor = pointEvents[pointEvents.length - 1];
rightAnchor.assignedTier = 'below1';
rightAnchor.isAnchor = true;
rightAnchor.anchorDirection = 'left'; // Can only shift left
rightAnchor.x = xScale(rightAnchor.parsedDate); // Natural position
rightAnchor.flexZoneMin = rightAnchor.x - FLEX_ZONE; // Can go left up to 112px
rightAnchor.flexZoneMax = rightAnchor.x; // Can't go right
rightAnchor.finalX = rightAnchor.x; // Start at natural position
rightAnchor.offset = 0;
rightAnchor.usesLConnector = false;
```

### Step 3: Modify Redistribution to Include Anchors

**File:** `/media/jonathanco/Backup/s3s/timeline/index.html`
**Lines:** 1856-1860

```javascript
// BEFORE: Exclude all anchors
const cardsOnTier = placedCards.filter(c =>
  c.assignedTier === tier &&
  !c.isAnchor  // Don't redistribute anchor cards
);

// AFTER: Include anchors but constrain to their flex zones
const cardsOnTier = placedCards.filter(c =>
  c.assignedTier === tier
  // Include anchors - they'll be constrained by flexZoneMin/Max
);
```

### Step 4: Update Flex Zone Constraints for Anchors

**File:** `/media/jonathanco/Backup/s3s/timeline/index.html`
**Lines:** 1928-1929 (and similar locations)

```javascript
// BEFORE: Symmetric flex zone
const flexLeft = card.x - FLEX_ZONE;
const flexRight = card.x + FLEX_ZONE;

// AFTER: Directional flex zone for anchors
let flexLeft, flexRight;
if (card.isAnchor) {
  // Use anchor-specific flex zone (asymmetric)
  flexLeft = card.flexZoneMin;
  flexRight = card.flexZoneMax;
} else {
  // Standard symmetric flex zone
  flexLeft = card.x - FLEX_ZONE;
  flexRight = card.x + FLEX_ZONE;
}
```

### Step 5: Update Connector Attachment for Anchors

**File:** `/media/jonathanco/Backup/s3s/timeline/index.html`
**Lines:** 2382-2393

```javascript
// Determine connector attachment X position
let connectorAttachX;

if (event.isAnchor) {
  // Anchor card - attach connector off-center based on shift
  const shiftAmount = event.finalX - event.x;

  if (event.anchorDirection === 'right' && shiftAmount > 0) {
    // Left anchor shifted right - attach left of center
    connectorAttachX = event.finalX - (shiftAmount / 2);
  } else if (event.anchorDirection === 'left' && shiftAmount < 0) {
    // Right anchor shifted left - attach right of center
    connectorAttachX = event.finalX + (-shiftAmount / 2);
  } else {
    // Anchor at natural position - attach at center
    connectorAttachX = event.x;
  }
} else {
  // Standard flex zone logic for middle cards
  if (x >= flexZoneLeft && x <= flexZoneRight) {
    connectorAttachX = x;
  } else if (x < flexZoneLeft) {
    connectorAttachX = flexZoneLeft;
  } else {
    connectorAttachX = flexZoneRight;
  }
}
```

---

## 9. Expected Behavior After Implementation

### Timeline Width Extension

**Before:**
```
Timeline: [first_event - 1 day] ←──────────────→ [last_event + 1 day]
          ↑ Left anchor here                     ↑ Right anchor here
          (very close to edge)                   (very close to edge)
```

**After:**
```
Timeline: [first_event - 30 days] ←──────────────────────────→ [last_event + 30 days]
          ↑                      ↑                            ↑                     ↑
          Edge               Left anchor                  Right anchor          Edge
          (More space from edge)                           (More space from edge)
```

### Anchor Flex Zones

**Left Anchor:**
- Natural position: xScale(first_event_date)
- Can shift right: [naturalX, naturalX + 112px]
- Connector: Attaches left of center when shifted right
- Visual: User sees card slightly right of timeline dot, connector angles from dot to left side of card

**Right Anchor:**
- Natural position: xScale(last_event_date)
- Can shift left: [naturalX - 112px, naturalX]
- Connector: Attaches right of center when shifted left
- Visual: User sees card slightly left of timeline dot, connector angles from dot to right side of card

### Redistribution Benefits

1. **More space:** Timeline extension gives all cards more breathing room
2. **Anchor flexibility:** Anchors can adjust to make room for dense clusters near timeline ends
3. **Better visual balance:** Flexible anchors prevent crowding at timeline boundaries
4. **Maintained chronology:** Anchors still constrained by direction (can't swap positions with neighbors)

---

## 10. Potential Issues and Solutions

### Issue 1: Anchors Shifting Too Far

**Problem:** Left anchor shifts so far right it overlaps with second event

**Solution:** Add maximum shift constraint
```javascript
// Constrain left anchor to not overlap with next event
const nextEvent = pointEvents[1];
const maxShiftRight = (nextEvent.x - leftAnchor.x) / 2; // Stay within midpoint
leftAnchor.flexZoneMax = Math.min(
  leftAnchor.x + FLEX_ZONE,
  leftAnchor.x + maxShiftRight
);
```

### Issue 2: Connector Looks Odd When Anchor Barely Shifts

**Problem:** 5px shift creates barely visible off-center attachment

**Solution:** Threshold for off-center attachment
```javascript
const MIN_SHIFT_FOR_OFFSET = 20; // pixels
const shiftAmount = event.finalX - event.x;

if (Math.abs(shiftAmount) < MIN_SHIFT_FOR_OFFSET) {
  // Shift is tiny - attach at center (straight connector)
  connectorAttachX = event.x;
} else {
  // Significant shift - attach off-center
  connectorAttachX = event.finalX - (shiftAmount / 2);
}
```

### Issue 3: Timeline Too Wide for Dense Date Ranges

**Problem:** 30-day padding on a 2-month range doubles timeline width

**Solution:** Proportional padding
```javascript
// Calculate padding proportional to date range
const dateRangeMs = viewportEndDate - viewportStartDate;
const dateRangeDays = dateRangeMs / (1000 * 60 * 60 * 24);

// Use 10% of range as padding, with min/max bounds
const paddingDays = Math.max(5, Math.min(30, dateRangeDays * 0.1));

viewportStartDate = d3.timeDay.offset(viewportStartDate, -paddingDays);
viewportEndDate = d3.timeDay.offset(viewportEndDate, paddingDays);
```

---

## 11. Testing Strategy

### Test 1: Timeline Width
```javascript
// Verify timeline extends beyond first/last events
console.log('First event date:', pointEvents[0].parsedDate);
console.log('Timeline start:', viewportStartDate);
console.log('Padding:', d3.timeDay.count(viewportStartDate, pointEvents[0].parsedDate), 'days');
```

### Test 2: Anchor Flex Zones
```javascript
// Verify anchors have correct flex zone bounds
console.log('Left anchor natural X:', leftAnchor.x);
console.log('Left anchor flex zone:', leftAnchor.flexZoneMin, '-', leftAnchor.flexZoneMax);
console.log('Can shift right?', leftAnchor.flexZoneMax > leftAnchor.x);
console.log('Can shift left?', leftAnchor.flexZoneMin < leftAnchor.x); // Should be false
```

### Test 3: Connector Attachment
```javascript
// Verify connector attaches off-center when anchor shifts
console.log('Left anchor position:', leftAnchor.finalX);
console.log('Left anchor natural X:', leftAnchor.x);
console.log('Shift amount:', leftAnchor.finalX - leftAnchor.x);
console.log('Connector attach X:', connectorAttachX);
console.log('Expected attach X:', leftAnchor.finalX - (leftAnchor.finalX - leftAnchor.x) / 2);
```

### Test 4: No Anchor Overlap
```javascript
// Verify anchors don't overlap with neighbors
const leftAnchorRight = leftAnchor.finalX + CARD_WIDTH/2;
const secondEventLeft = pointEvents[1].finalX - CARD_WIDTH/2;
console.log('Left anchor right edge:', leftAnchorRight);
console.log('Second event left edge:', secondEventLeft);
console.log('Gap:', secondEventLeft - leftAnchorRight);
console.log('Valid?', secondEventLeft > leftAnchorRight);
```

---

## 12. Summary of Changes Required

### File: `/media/jonathanco/Backup/s3s/timeline/index.html`

**Change 1: Extend timeline width (lines 1289-1294)**
- Add configurable padding (30 days or proportional)

**Change 2: Add anchor flex zones (lines 2250-2266)**
- Define `anchorDirection`, `flexZoneMin`, `flexZoneMax` for anchors

**Change 3: Include anchors in redistribution (line 1859)**
- Remove `!c.isAnchor` filter condition

**Change 4: Apply directional flex zones (lines 1928-1929, similar locations)**
- Use `card.flexZoneMin/Max` for anchors instead of symmetric `x ± FLEX_ZONE`

**Change 5: Update connector attachment (lines 2382-2393)**
- Calculate off-center attachment for shifted anchors

**Change 6: Add shift thresholds (new code)**
- Prevent tiny shifts from creating odd-looking connectors
- Constrain anchors to not overlap neighbors

---

## 13. Code Locations Reference

| Feature | File | Line Numbers |
|---------|------|--------------|
| Constants (CARD_WIDTH, MIN_GAP, FLEX_ZONE) | index.html | 1187-1188, 1751 |
| Viewport date calculation | index.html | 1289-1294 |
| xScale creation | index.html | 1621-1623 |
| Event X position calculation | index.html | 1630 |
| Anchor selection and placement | index.html | 2238-2266 |
| Redistribution exclusion | index.html | 1856-1860 |
| Anchor constraints in redistribution | index.html | 1889-1908 |
| Flex zone calculation | index.html | 1928-1929, 2030-2031, 2053-2054 |
| Connector attachment logic | index.html | 2353-2393 |
| Connector drawing | index.html | 2516-2570 |
| Timeline drawing | index.html | 1644-1649 |

---

## 14. Recommended Implementation Order

1. **First:** Extend timeline width (easiest, immediate visual improvement)
2. **Second:** Add anchor flex zone properties (data structure changes)
3. **Third:** Update redistribution to include anchors (algorithm changes)
4. **Fourth:** Implement directional flex zone constraints
5. **Fifth:** Update connector attachment for shifted anchors
6. **Sixth:** Add safety constraints (overlap prevention, shift thresholds)
7. **Seventh:** Test and refine

---

**Analysis Complete:** This document provides complete understanding of timeline width calculation and anchor positioning, plus detailed implementation plan for requested features.
