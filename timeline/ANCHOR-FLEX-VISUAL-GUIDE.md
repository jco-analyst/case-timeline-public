# Anchor Flex Zones: Visual Guide

## Current Behavior: Rigid Anchors

```
Timeline with 1-day padding:
═══════════════════════════════════════════════════════════════════
│                                                                 │
│  First Event                                        Last Event  │
│  (Left Anchor)                                  (Right Anchor)  │
│      ▼                                                  ▼        │
│   ┌──────┐                                          ┌──────┐    │
│   │ Card │                                          │ Card │    │
│   │  #1  │                                          │ #10  │    │
│   └───┬──┘                                          └───┬──┘    │
│       │ (straight)                           (straight) │       │
│       ●────────────────────────────────────────────────●        │
│       ↑                                                ↑         │
│   Natural X                                       Natural X     │
│   (RIGID)                                         (RIGID)       │
│                                                                 │
═══════════════════════════════════════════════════════════════════
│← 1 day →│                                          │← 1 day →│
```

**Issues:**
- Anchors very close to timeline edges (only 1 day padding)
- No room for anchors to shift if needed
- Redistribution must work around rigid anchor positions
- Dense event clusters near timeline ends are constrained

---

## Proposed Behavior: Flexible Anchors with Extended Timeline

```
Timeline with 30-day padding:
═══════════════════════════════════════════════════════════════════════════════════
│                                                                                 │
│                 First Event                           Last Event                │
│                 (Left Anchor)                      (Right Anchor)               │
│                     ▼                                   ▼                       │
│                  ┌──────┐                           ┌──────┐                   │
│                  │ Card │                           │ Card │                   │
│                  │  #1  │                           │ #10  │                   │
│                  └───┬──┘                           └───┬──┘                   │
│                      │ (can attach                (can attach  │               │
│                      │  off-center left)          off-center right)            │
│                      ●──────────────────────────────────────●                  │
│                      ↑                                       ↑                  │
│                  Natural X                              Natural X              │
│                                                                                 │
│              ◄──FLEX──►                                 ◄──FLEX──►             │
│         (can shift RIGHT)                          (can shift LEFT)            │
│                                                                                 │
═══════════════════════════════════════════════════════════════════════════════════
│←─── 30 days ───→│                                        │←─── 30 days ───→│
```

**Benefits:**
- Anchors have breathing room from edges (30 days padding)
- Left anchor can shift right up to 112px (FLEX_ZONE)
- Right anchor can shift left up to 112px (FLEX_ZONE)
- Redistribution can include anchors as flexible constraints
- Better visual balance with dense event clusters

---

## Left Anchor Flex Zone: Detailed View

### Scenario 1: Anchor at Natural Position (No Shift)

```
                Natural X
                    ↓
             ┌──────────┐
             │  Card #1 │
             │          │
             └─────┬────┘
                   │ ← Straight connector
                   ● ← Timeline dot
                   ↑
             Natural position

Flex Zone:  [X, X+112px]
Position:    X (no shift)
Connector:   Attaches at center (straight vertical line)
```

### Scenario 2: Anchor Shifted Right (Space Needed)

```
         Natural X          Shifted position
             ↓                    ↓
             ●              ┌──────────┐
             │              │  Card #1 │
             │              │          │
             │              └─────┬────┘
             │                    │
             └────────────────────┘
                   ↑
              L-shaped connector
              (attaches left of center)

Flex Zone:    [X, X+112px]
Position:     X + 50px (shifted 50px right)
Connector:    Attaches at X+25px (50px / 2 left of card center)
Visual:       Card visibly right of timeline dot
              Connector shows card shifted from natural position
```

### Scenario 3: Maximum Shift (Dense Cluster)

```
    Natural X                           Shifted position
        ↓                                      ↓
        ●                                ┌──────────┐
        │                                │  Card #1 │
        │                                │          │
        │                                └─────┬────┘
        │                                      │
        └──────────────────────────────────────┘
                   ↑
          Long L-shaped connector
          (attaches well left of center)

Flex Zone:    [X, X+112px]
Position:     X + 112px (maximum shift right)
Connector:    Attaches at X+56px (112px / 2 left of card center)
Visual:       Card significantly right of timeline dot
              Clear visual indication of shift
```

---

## Right Anchor Flex Zone: Detailed View

### Scenario 1: Anchor at Natural Position (No Shift)

```
                             Natural X
                                 ↓
                          ┌──────────┐
                          │ Card #10 │
                          │          │
                          └─────┬────┘
                                │ ← Straight connector
                                ● ← Timeline dot
                                ↑
                          Natural position

Flex Zone:  [X-112px, X]
Position:    X (no shift)
Connector:   Attaches at center (straight vertical line)
```

### Scenario 2: Anchor Shifted Left (Space Needed)

```
        Shifted position          Natural X
               ↓                      ↓
        ┌──────────┐                  ●
        │ Card #10 │                  │
        │          │                  │
        └─────┬────┘                  │
              │                       │
              └───────────────────────┘
                   ↑
              L-shaped connector
              (attaches right of center)

Flex Zone:    [X-112px, X]
Position:     X - 50px (shifted 50px left)
Connector:    Attaches at X-25px (50px / 2 right of card center)
Visual:       Card visibly left of timeline dot
              Connector shows card shifted from natural position
```

### Scenario 3: Maximum Shift (Dense Cluster)

```
    Shifted position                           Natural X
           ↓                                       ↓
    ┌──────────┐                                   ●
    │ Card #10 │                                   │
    │          │                                   │
    └─────┬────┘                                   │
          │                                        │
          └────────────────────────────────────────┘
                   ↑
          Long L-shaped connector
          (attaches well right of center)

Flex Zone:    [X-112px, X]
Position:     X - 112px (maximum shift left)
Connector:    Attaches at X-56px (112px / 2 right of card center)
Visual:       Card significantly left of timeline dot
              Clear visual indication of shift
```

---

## Connector Attachment Calculation

### Left Anchor (Rightward Flex)

```javascript
// Natural position from xScale
const naturalX = xScale(leftAnchor.parsedDate);

// Actual card position (after redistribution)
const finalX = leftAnchor.finalX;

// Shift amount (positive = shifted right)
const shiftAmount = finalX - naturalX;

// Connector attachment (proportional offset left of center)
const connectorAttachX = finalX - (shiftAmount / 2);

// Example:
//   naturalX = 300
//   finalX = 350 (shifted 50px right)
//   shiftAmount = 50
//   connectorAttachX = 350 - 25 = 325
//   Result: Connector attaches 25px left of card center (140-25=115px from left edge)
```

### Right Anchor (Leftward Flex)

```javascript
// Natural position from xScale
const naturalX = xScale(rightAnchor.parsedDate);

// Actual card position (after redistribution)
const finalX = rightAnchor.finalX;

// Shift amount (negative = shifted left)
const shiftAmount = finalX - naturalX;

// Connector attachment (proportional offset right of center)
const connectorAttachX = finalX + (-shiftAmount / 2);

// Example:
//   naturalX = 1500
//   finalX = 1450 (shifted 50px left)
//   shiftAmount = -50
//   connectorAttachX = 1450 + 25 = 1475
//   Result: Connector attaches 25px right of card center (140+25=165px from left edge)
```

---

## Visual Comparison: Before and After

### Before: Dense Cluster Near Left Edge

```
Rigid Left Anchor (Can't Shift)
═══════════════════════════════════════
│                                     │
│  ┌──────┐  ┌──────┐  ┌──────┐      │
│  │  #1  │  │  #2  │  │  #3  │      │
│  └───┬──┘  └───┬──┘  └───┬──┘      │
│      │  ╱───────┼──╲       │        │
│      │ ╱        │   ╲      │        │
│      ●          ●    ●     ●        │
│      ↑          ↑    ↑     ↑        │
│   Anchor    Tight spacing!          │
│   (RIGID)   L-connectors needed     │
│                                     │
═══════════════════════════════════════
│← 1 day →│

Issues:
- Anchor can't shift right to make room
- Cards #2 and #3 forced to use L-connectors
- Crowded appearance near timeline start
```

### After: Dense Cluster with Flexible Anchor

```
Flexible Left Anchor (Shifted Right)
═══════════════════════════════════════════════
│                                             │
│    ┌──────┐  ┌──────┐  ┌──────┐            │
│    │  #1  │  │  #2  │  │  #3  │            │
│    └───┬──┘  └───┬──┘  └───┬──┘            │
│        │         │         │                │
│        │         │         │                │
│    ●───┘         ●         ●                │
│    ↑             ↑         ↑                │
│ Natural      All straight!                  │
│   (anchor shifted right)                    │
│                                             │
═══════════════════════════════════════════════
│←─── 30 days ───→│

Benefits:
- Anchor shifted right to make room
- All cards fit with straight connectors
- Even spacing maintained
- Better visual balance
```

---

## Edge Cases and Constraints

### Case 1: Anchor Can't Shift Far Enough

```
Dense cluster still requires L-connector even with flex:

    ┌──────┐
    │  #1  │ ← Shifted to max (X+112px)
    └───┬──┘
        │╱────┐
        │     │
    ●───┘  ┌──┴───┐
    ↑      │  #2  │ ← Still needs L-connector (too close)
Natural   └──────┘

Solution: Redistribute #2 to different tier
```

### Case 2: Anchor Neighbor Constraint

```
Prevent anchor from overlapping with next event:

    Natural          Max shift (constrained)
        ↓                   ↓
        ●             ┌──────┐   ┌──────┐
        │             │  #1  │   │  #2  │
        │             └───┬──┘   └───┬──┘
        │                 │          │
        └─────────────────┘          ●

Constraint:
  flexZoneMax = min(naturalX + FLEX_ZONE, midpoint to next event)
  midpoint = (naturalX + nextEvent.x) / 2

This prevents anchor from crossing into next event's territory.
```

### Case 3: Tiny Shift Threshold

```
Avoid odd-looking connectors for tiny shifts:

Bad (5px shift):
    ┌──────┐
    │  #1  │ ← Barely shifted
    └───┬──┘
       ╱│    ← Tiny L-connector looks weird
    ●──┘
    ↑
Natural (5px left)

Good (threshold applied):
    ┌──────┐
    │  #1  │ ← 5px shift ignored
    └───┬──┘
        │    ← Straight connector (cleaner)
        ●
        ↑
Natural (treat as no shift)

Implementation:
  if (Math.abs(shiftAmount) < 20px) {
    connectorAttachX = naturalX; // Straight connector
  }
```

---

## Timeline Width Extension Benefits

### Proportional Padding Example

```javascript
// Date range: 60 days (2 months)
const dateRangeDays = 60;

// Padding: 10% of range (6 days)
const paddingDays = dateRangeDays * 0.1;

// Timeline: [first_event - 6 days] to [last_event + 6 days]
viewportStartDate = d3.timeDay.offset(startDate, -6);
viewportEndDate = d3.timeDay.offset(endDate, 6);

Result: Timeline extended by 12 days (20% wider)
        Proportional to date range, not excessive
```

### Fixed Padding Example

```javascript
// Date range: 365 days (1 year)
const paddingDays = 30; // Fixed 30 days

// Timeline: [first_event - 30 days] to [last_event + 30 days]
viewportStartDate = d3.timeDay.offset(startDate, -30);
viewportEndDate = d3.timeDay.offset(endDate, 30);

Result: Timeline extended by 60 days (~16% wider)
        Good breathing room for year-long timeline
```

### Min/Max Constrained Padding

```javascript
// Best of both worlds
const dateRangeDays = d3.timeDay.count(startDate, endDate);
const proportionalPadding = dateRangeDays * 0.1;

// Constrain to 5-30 day range
const paddingDays = Math.max(5, Math.min(30, proportionalPadding));

Examples:
  - 20-day range → 5 days padding (min)
  - 60-day range → 6 days padding (proportional)
  - 180-day range → 18 days padding (proportional)
  - 400-day range → 30 days padding (max)
```

---

## Implementation Checklist

- [ ] Add `TIMELINE_PADDING_DAYS` constant or proportional calculation
- [ ] Update `viewportStartDate` and `viewportEndDate` calculation
- [ ] Add `anchorDirection` property to anchor cards ('left' or 'right')
- [ ] Add `flexZoneMin` and `flexZoneMax` properties to anchor cards
- [ ] Update flex zone calculation to use asymmetric bounds for anchors
- [ ] Remove `!c.isAnchor` filter from redistribution algorithm
- [ ] Update connector attachment logic to handle shifted anchors
- [ ] Add `MIN_SHIFT_FOR_OFFSET` threshold (recommended: 20px)
- [ ] Add neighbor overlap constraints for anchors
- [ ] Test with various date ranges and event densities
- [ ] Verify visual appearance of off-center connectors

---

## Expected User Experience

### Current:
- Timeline feels cramped near edges
- Dense event clusters near timeline ends create visual clutter
- Many L-connectors needed near timeline boundaries
- Anchors appear "stuck" at edges

### After Implementation:
- Timeline feels more spacious with padding
- Anchors can adjust to make room for nearby events
- Fewer L-connectors overall (better readability)
- Visual feedback: off-center connectors show anchor adjustments
- Better visual balance across entire timeline

---

**Visual Guide Complete:** Use this alongside TIMELINE-WIDTH-AND-ANCHOR-ANALYSIS.md for complete understanding.
