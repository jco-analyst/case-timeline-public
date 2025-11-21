# Complete Algorithm Flow Map

## Overview: How Timeline Width and Anchor Positioning Work Together

This document maps the complete flow from data loading to final rendering, showing where timeline width and anchor positioning decisions occur.

---

## Phase 1: Data Loading and Date Range Calculation

### Step 1.1: Parse Event Dates
**Location:** Event data initialization

```javascript
events.forEach(e => {
  e.parsedDate = parseDate(e.timestamp);
  if (e.endDate) {
    e.parsedEndDate = parseDate(e.endDate);
  }
});
```

**Output:** Each event has `parsedDate` and optionally `parsedEndDate`

### Step 1.2: Calculate Full Timeline Range
**Location:** Lines 1254-1255

```javascript
// Collect all dates from all events
const allDates = [];
events.forEach(e => {
  allDates.push(e.parsedDate);
  if (e.parsedEndDate) allDates.push(e.parsedEndDate);
});

// Full timeline range (for minimap)
fullTimelineStart = d3.min(allDates);
fullTimelineEnd = d3.max(allDates);
```

**Output:**
- `fullTimelineStart` = earliest date in dataset
- `fullTimelineEnd` = latest date in dataset

### Step 1.3: Calculate Viewport Range
**Location:** Lines 1289-1294

```javascript
// Get dates for events in current viewport
const viewportDates = [];
viewportEvents.forEach(e => {
  viewportDates.push(e.parsedDate);
  if (e.parsedEndDate) viewportDates.push(e.parsedEndDate);
});

// Viewport range (what's currently displayed)
viewportStartDate = d3.min(viewportDates);
viewportEndDate = d3.max(viewportDates);

// ⚠️ CURRENT: 1-day padding
viewportStartDate = d3.timeDay.offset(viewportStartDate, -1);
viewportEndDate = d3.timeDay.offset(viewportEndDate, 1);

// ✅ PROPOSED: 30-day padding (or proportional)
const TIMELINE_PADDING_DAYS = 30;
viewportStartDate = d3.timeDay.offset(viewportStartDate, -TIMELINE_PADDING_DAYS);
viewportEndDate = d3.timeDay.offset(viewportEndDate, TIMELINE_PADDING_DAYS);
```

**Output:**
- `viewportStartDate` = min(viewport events) - padding
- `viewportEndDate` = max(viewport events) + padding
- **This determines timeline width in date units**

---

## Phase 2: Timeline Setup and Spatial Mapping

### Step 2.1: Calculate Container Dimensions
**Location:** Lines 1601-1612

```javascript
const containerWidth = container.node().clientWidth;
const width = containerWidth * 0.97; // 97% of container
const height = currentView === 'all' ? 1400 : 800;

// Margins ensure cards don't overlap container edges
const minMargin = CARD_WIDTH / 2 + 5; // 145px
const margin = {
  top: 80,
  right: Math.max(containerWidth * 0.015, minMargin),
  left: Math.max(containerWidth * 0.015, minMargin),
  bottom: 80
};
```

**Output:**
- Timeline pixel width: `width - margin.left - margin.right`
- Typical: ~1800px (on 1920px wide container)

### Step 2.2: Create xScale (Date → Pixel Mapping)
**Location:** Lines 1621-1623

```javascript
// Map date range to pixel range
const xScale = d3.scaleTime()
  .domain([viewportStartDate, viewportEndDate])  // Date range (from Phase 1)
  .range([margin.left, width - margin.right]);   // Pixel range

// Timeline starts at margin.left (typically 145px)
// Timeline ends at width - margin.right (typically 1775px)
```

**Output:**
- `xScale` function: `date → pixel X position`
- **This converts timeline width from days to pixels**

### Step 2.3: Calculate Natural X Position for Each Event
**Location:** Line 1630

```javascript
viewportEvents.forEach(e => {
  e.x = xScale(e.parsedDate);  // Natural X position
  // This is where the event "wants" to be chronologically
});
```

**Output:** Each event has `e.x` (natural X position in pixels)

**Example:**
```
Timeline: Jan 1 to Mar 1 (60 days with padding)
Pixel range: 145px to 1775px (1630px total)

Event on Jan 15:
  e.x = xScale(Jan 15)
  e.x ≈ 145 + (14/60) × 1630
  e.x ≈ 527px
```

---

## Phase 3: Constraint-Based Placement Algorithm

### Step 3.1: Separate Point and Range Events
**Location:** Lines 1753-1758

```javascript
const pointEvents = viewportEvents.filter(e => e.type !== 'range');
const rangeEvents = viewportEvents.filter(e => e.type === 'range');

// Sort point events by natural X position (chronological)
pointEvents.sort((a, b) => a.x - b.x);
```

**Output:**
- `pointEvents[]` sorted left-to-right by `x`
- Range events processed separately (not anchored)

### Step 3.2: Anchor End Cards
**Location:** Lines 2238-2266

```javascript
if (pointEvents.length === 1) {
  // Single card - anchor it
  const singleCard = pointEvents[0];
  singleCard.assignedTier = 'above1';
  singleCard.finalX = singleCard.x;  // ⚠️ CURRENT: Rigid
  singleCard.offset = 0;
  singleCard.isAnchor = true;

} else {
  // Left anchor (chronologically first)
  const leftAnchor = pointEvents[0];
  leftAnchor.assignedTier = 'above1';
  leftAnchor.finalX = leftAnchor.x;  // ⚠️ CURRENT: Rigid at natural X
  leftAnchor.offset = 0;
  leftAnchor.usesLConnector = false;
  leftAnchor.isAnchor = true;

  // ✅ PROPOSED: Add flex properties
  leftAnchor.anchorDirection = 'right';          // Can shift right only
  leftAnchor.flexZoneMin = leftAnchor.x;         // Can't go left of natural X
  leftAnchor.flexZoneMax = leftAnchor.x + 112;   // Can shift right up to 112px

  // Right anchor (chronologically last)
  const rightAnchor = pointEvents[pointEvents.length - 1];
  rightAnchor.assignedTier = 'below1';
  rightAnchor.finalX = rightAnchor.x;  // ⚠️ CURRENT: Rigid at natural X
  rightAnchor.offset = 0;
  rightAnchor.usesLConnector = false;
  rightAnchor.isAnchor = true;

  // ✅ PROPOSED: Add flex properties
  rightAnchor.anchorDirection = 'left';           // Can shift left only
  rightAnchor.flexZoneMin = rightAnchor.x - 112;  // Can shift left up to 112px
  rightAnchor.flexZoneMax = rightAnchor.x;        // Can't go right of natural X
}
```

**Output:**
- Left anchor: Positioned on `above1` tier
- Right anchor: Positioned on `below1` tier
- **Current:** Both at rigid natural X positions
- **Proposed:** Both with directional flex zones

### Step 3.3: Place Middle Cards Recursively
**Location:** Lines 2268-2276

```javascript
if (pointEvents.length > 2) {
  const anchoredCards = [leftAnchor, rightAnchor];
  const startIdx = 1;                        // Skip left anchor
  const endIdx = pointEvents.length - 1;     // Stop before right anchor

  // Place cards [1] through [n-2] (middle cards)
  placeCardRecursive(startIdx, anchoredCards, endIdx);
}
```

**Flow:** Recursive placement tries to fit middle cards on various tiers, with redistribution if needed.

---

## Phase 4: Redistribution Algorithm (Middle Cards)

### Step 4.1: Try Placement Without Redistribution
**Location:** Lines 1806-1851

```javascript
function tryPlaceWithoutRedistribution(card, tier, placedCards) {
  // Try to place card at natural X position
  // Check for collisions with already-placed cards on this tier

  const flexLeft = card.x - FLEX_ZONE;   // 112px left
  const flexRight = card.x + FLEX_ZONE;  // 112px right

  // Find best position within flex zone that avoids collisions
  // ...

  return { tier, position, offset, withinFlexZone };
}
```

**Output:** Position within flex zone, or null if collision

### Step 4.2: Try Placement With Redistribution
**Location:** Lines 1854-1882

```javascript
function tryPlaceWithRedistribution(newCard, tier, placedCards) {
  // Get all cards on this tier
  const cardsOnTier = placedCards.filter(c =>
    c.assignedTier === tier &&
    !c.isAnchor  // ⚠️ CURRENT: Exclude anchors from redistribution
  );

  // ✅ PROPOSED: Include anchors (they have directional flex zones)
  const cardsOnTier = placedCards.filter(c =>
    c.assignedTier === tier
    // Anchors included - constrained by flexZoneMin/Max
  );

  // All cards to arrange (existing + new)
  const allCards = [...cardsOnTier, newCard].sort((a, b) => a.x - b.x);

  // Find optimal positions for all cards
  const solution = findOptimalPositions(allCards, tier, placedCards);

  return solution;
}
```

**Output:** New positions for all cards on tier, or null if can't fit

### Step 4.3: Find Optimal Positions (Global Redistribution)
**Location:** Lines 1884-2140

```javascript
function findOptimalPositions(cards, tier, allPlacedCards) {
  // Get anchor cards on this tier as constraints
  const anchorsOnTier = allPlacedCards.filter(c =>
    c.assignedTier === tier && c.isAnchor
  );

  // Start with timeline margins as boundaries
  let leftBoundary = margin.left;
  let rightBoundary = width - margin.right;

  // ⚠️ CURRENT: Anchors are rigid constraints
  const leftAnchor = anchorsOnTier.find(a => a.finalX < cards[0].x);
  if (leftAnchor) {
    // Left anchor constrains left boundary
    leftBoundary = leftAnchor.finalX + CARD_WIDTH/2 + MIN_GAP + CARD_WIDTH/2;
  }

  const rightAnchor = anchorsOnTier.find(a => a.finalX > cards[cards.length-1].x);
  if (rightAnchor) {
    // Right anchor constrains right boundary
    rightBoundary = rightAnchor.finalX - CARD_WIDTH/2 - MIN_GAP - CARD_WIDTH/2;
  }

  // ✅ PROPOSED: Anchors are flexible constraints
  // Include anchors in redistribution, but constrain by flexZoneMin/Max

  // Calculate required space
  const n = cards.length;
  const availableSpace = rightBoundary - leftBoundary;
  const requiredSpace = (n - 1) * (CARD_WIDTH + MIN_GAP);

  if (requiredSpace > availableSpace) {
    return null; // Can't fit
  }

  // Distribute cards evenly or left-pack within available space
  // (See PLACEMENT-ARCHITECTURE.md for detailed algorithm)
  // ...

  return { positions, totalOffset };
}
```

**Output:** Optimal positions for all cards on tier, or null

---

## Phase 5: Connector Drawing and Rendering

### Step 5.1: Calculate Connector Attachment Point
**Location:** Lines 2353-2393

```javascript
// For each point event (after placement)
const cardCenterX = event.finalX;  // Where card actually is
const x = event.x;                 // Where event dot is (natural position)

// Calculate flex zone for connector attachment
const FLEX_ZONE = CARD_WIDTH * 0.4; // 112px
let flexZoneLeft = cardCenterX - FLEX_ZONE;
let flexZoneRight = cardCenterX + FLEX_ZONE;

// Constrain to container bounds
flexZoneLeft = Math.max(flexZoneLeft, margin.left);
flexZoneRight = Math.min(flexZoneRight, width - margin.right);

// Constrain to chronological neighbors (prevent crossing)
if (pointEventIndex > 0) {
  const prevEvent = pointEvents[pointEventIndex - 1];
  flexZoneLeft = Math.max(flexZoneLeft, prevEvent.x);
}
if (pointEventIndex < pointEvents.length - 1) {
  const nextEvent = pointEvents[pointEventIndex + 1];
  flexZoneRight = Math.min(flexZoneRight, nextEvent.x);
}

// ⚠️ CURRENT: Determine connector attachment X
let connectorAttachX;
if (x >= flexZoneLeft && x <= flexZoneRight) {
  connectorAttachX = x;  // Dot within flex zone - straight
} else if (x < flexZoneLeft) {
  connectorAttachX = flexZoneLeft;  // Dot left - attach at left edge
} else {
  connectorAttachX = flexZoneRight;  // Dot right - attach at right edge
}

// ✅ PROPOSED: Special handling for anchors
if (event.isAnchor) {
  const shiftAmount = event.finalX - event.x;
  const MIN_SHIFT_FOR_OFFSET = 20;

  if (Math.abs(shiftAmount) < MIN_SHIFT_FOR_OFFSET) {
    // Tiny shift - use straight connector
    connectorAttachX = event.x;
  } else if (event.anchorDirection === 'right' && shiftAmount > 0) {
    // Left anchor shifted right - attach left of center
    connectorAttachX = event.finalX - (shiftAmount / 2);
  } else if (event.anchorDirection === 'left' && shiftAmount < 0) {
    // Right anchor shifted left - attach right of center
    connectorAttachX = event.finalX + (-shiftAmount / 2);
  } else {
    // No effective shift - straight connector
    connectorAttachX = event.x;
  }
}
```

**Output:** `connectorAttachX` = where connector attaches to card

### Step 5.2: Draw Connector Line
**Location:** Lines 2516-2570

```javascript
const cardEdgeY = isAbove ? (timelineY - layerDistance) : (timelineY + layerDistance);

if (offset === 0 && connectorAttachX === x) {
  // Straight vertical connector
  svg.append('line')
    .attr('class', 'connector-line')
    .attr('data-event-id', eventId)
    .attr('x1', x)
    .attr('y1', timelineY)
    .attr('x2', x)
    .attr('y2', cardEdgeY);

} else {
  // L-shaped connector (3 segments)

  // Calculate transition point (staggered for visual clarity)
  const baseMidpoint = timelineY + (isAbove ? -layerDistance/2 : layerDistance/2);
  const staggerAmount = 12;
  const staggerDirection = offset > 0 ? 1 : -1;
  const transitionY = baseMidpoint + (staggerCount * staggerAmount * staggerDirection);

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

**Output:** Connector line(s) drawn from timeline dot to card

### Step 5.3: Draw Timeline Dot
**Location:** Lines 2572-2578

```javascript
// Draw dot on timeline (at natural X position)
svg.append('circle')
  .attr('class', `timeline-dot category-${event.category}`)
  .attr('data-event-id', eventId)
  .attr('cx', x)  // Always at natural X position
  .attr('cy', timelineY)
  .attr('r', 10);
```

**Output:** Dot drawn at natural X position (not at card position)

---

## Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 1: DATE RANGE CALCULATION                                │
├─────────────────────────────────────────────────────────────────┤
│ Parse all event dates                                           │
│   ↓                                                              │
│ fullTimelineStart/End = min/max(all dates)                      │
│   ↓                                                              │
│ viewportStartDate/EndDate = min/max(viewport dates) ± PADDING   │
│   • Current padding: 1 day                                       │
│   • Proposed padding: 30 days (or proportional)                 │
│                                                                 │
│ OUTPUT: Date range for timeline (determines width in days)      │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 2: SPATIAL MAPPING                                        │
├─────────────────────────────────────────────────────────────────┤
│ Calculate container dimensions and margins                      │
│   ↓                                                              │
│ Create xScale: date → pixel X                                   │
│   domain: [viewportStartDate, viewportEndDate]                  │
│   range: [margin.left, width - margin.right]                    │
│   ↓                                                              │
│ Calculate natural X position for each event:                    │
│   event.x = xScale(event.parsedDate)                            │
│                                                                 │
│ OUTPUT: Timeline width in pixels, natural X for all events      │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 3: ANCHOR PLACEMENT                                       │
├─────────────────────────────────────────────────────────────────┤
│ Sort point events by natural X (chronological order)            │
│   ↓                                                              │
│ Left anchor = pointEvents[0]                                    │
│   • Tier: above1                                                │
│   • Current: finalX = x (rigid)                                 │
│   • Proposed: flexZone = [x, x+112px] (rightward flex)          │
│   ↓                                                              │
│ Right anchor = pointEvents[last]                                │
│   • Tier: below1                                                │
│   • Current: finalX = x (rigid)                                 │
│   • Proposed: flexZone = [x-112px, x] (leftward flex)           │
│                                                                 │
│ OUTPUT: Anchors placed, middle cards to be placed               │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 4: MIDDLE CARD PLACEMENT (RECURSIVE)                      │
├─────────────────────────────────────────────────────────────────┤
│ For each middle card:                                           │
│   Try placement without redistribution                          │
│     • Check flex zone [x-112, x+112]                            │
│     • Check collisions with placed cards                        │
│     ↓                                                            │
│   If fails, try placement with redistribution                   │
│     • Get all cards on tier (EXCLUDE anchors currently)         │
│     • Calculate optimal positions for all cards + new card      │
│     • Anchors act as rigid boundaries                           │
│     ↓                                                            │
│   If fails, try next tier                                       │
│     • Repeat for all 6 tiers                                    │
│     ↓                                                            │
│   If all tiers fail, use best available (may need L-connector)  │
│                                                                 │
│ PROPOSED CHANGE:                                                │
│   • Include anchors in redistribution                           │
│   • Constrain anchors by directional flex zones                 │
│   • Anchors can adjust to make room for dense clusters          │
│                                                                 │
│ OUTPUT: All cards have finalX and assignedTier                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 5: RENDERING                                              │
├─────────────────────────────────────────────────────────────────┤
│ For each point event:                                           │
│   Calculate connector attachment point:                         │
│     • Current: Based on flex zone from card center              │
│     • Proposed: Special logic for shifted anchors               │
│     ↓                                                            │
│   Draw connector line:                                          │
│     • Straight if offset=0 and attachment=natural X             │
│     • L-shaped if offset≠0 or attachment≠natural X              │
│     • Anchors: Off-center attachment shows shift                │
│     ↓                                                            │
│   Draw card at finalX position                                  │
│     ↓                                                            │
│   Draw timeline dot at natural X position                       │
│                                                                 │
│ OUTPUT: Complete rendered timeline                              │
└─────────────────────────────────────────────────────────────────┘
```

---

## Key Relationships

### Timeline Width Impact

**Padding affects spatial density:**
```
1-day padding (current):
  Date range: 60 days → 62 days total
  Pixel range: 1630px
  Pixels per day: 26.3px/day

30-day padding (proposed):
  Date range: 60 days → 120 days total
  Pixel range: 1630px
  Pixels per day: 13.6px/day

Result: Same events spread over 2x horizontal space (52% more room)
```

### Anchor Flex Impact

**Current (rigid anchors):**
```
Left anchor at X=200 (rigid)
Middle cards must fit in: [200 + card_spacing, right_anchor - card_spacing]
Dense cluster near X=250: Cards forced to use L-connectors or higher tiers
```

**Proposed (flexible anchors):**
```
Left anchor at X=200 (can shift to 312)
  ↓
Left anchor shifts right to X=280
  ↓
Middle cards now fit in: [280 + card_spacing, right_anchor - card_spacing]
Dense cluster at X=250: Now has more room, fewer L-connectors needed
```

### Connector Appearance

**Straight connector (no shift):**
```
Card centered over dot:
  ┌──────┐
  │ Card │
  └───┬──┘
      │
      ●
```

**L-connector with off-center attachment (anchor shifted):**
```
Left anchor shifted right:
  Natural X      Card position
      ↓               ↓
      ●         ┌──────────┐
      │         │   Card   │
      │         └─────┬────┘
      │               │
      └───────────────┘
           ↑
   Attaches left of center
   (visual feedback of rightward shift)

Right anchor shifted left:
  Card position      Natural X
      ↓                   ↓
┌──────────┐              ●
│   Card   │              │
└─────┬────┘              │
      │                   │
      └───────────────────┘
           ↑
   Attaches right of center
   (visual feedback of leftward shift)
```

---

## Summary: What Controls Timeline Width

1. **Date padding** (lines 1289-1294): Extends date range beyond events
   - Current: ±1 day → minimal extension
   - Proposed: ±30 days → significant extension

2. **xScale domain** (line 1622): Maps extended date range to pixels
   - Wider date range → more horizontal space per day

3. **Container width** (line 1604): Physical pixel width available
   - Fixed by browser window size
   - Timeline uses 97% of container width

4. **Margins** (lines 1606-1612): Pixel padding at edges
   - Ensures cards don't overlap container edges
   - Minimal margin: 145px (half card width + 5px)

**Result:** Timeline width = date range (days) × pixels per day
- Increasing date padding increases pixels per day
- Events spread out horizontally with more breathing room

---

## Summary: What Controls Anchor Positioning

1. **Anchor selection** (lines 2250-2266): First/last chronological events
   - Left anchor = pointEvents[0]
   - Right anchor = pointEvents[last]

2. **Initial position** (current): Rigid at natural X
   - finalX = xScale(parsedDate)
   - No flex zone, no redistribution

3. **Proposed position**: Directional flex zones
   - Left anchor: flexZone = [X, X+112px] (can shift right)
   - Right anchor: flexZone = [X-112px, X] (can shift left)
   - Included in redistribution algorithm

4. **Connector attachment** (lines 2382-2393): Reflects shift
   - Current: Always at natural X (straight)
   - Proposed: Off-center when shifted (visual feedback)

**Result:** Anchors can adjust to balance card distribution
- Dense clusters near edges get more room
- Visual feedback via off-center connectors
- Maintains chronological constraints (can't swap order)

---

**Algorithm flow map complete.** Use alongside other analysis documents for full understanding.
