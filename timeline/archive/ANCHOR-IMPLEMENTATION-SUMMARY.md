# Anchor Flex Implementation: Quick Reference

## Key Findings

### Timeline Width
- **Current:** Determined by `min/max(event dates) ± 1 day`
- **Location:** Lines 1289-1294
- **Change:** Increase padding from 1 day to 30 days (or proportional)

### Anchor Cards
- **Selection:** `leftAnchor = pointEvents[0]`, `rightAnchor = pointEvents[last]`
- **Current positioning:** RIGID at natural X position (`finalX = x`)
- **Current flex:** NONE - explicitly excluded from redistribution
- **Flag:** `isAnchor = true` prevents redistribution
- **Location:** Lines 2238-2266

### Connector Attachment
- **Anchors (current):** Always straight vertical (offset = 0, connectorAttachX = x)
- **Middle cards:** Can have L-shaped connectors with off-center attachment
- **Flex zone:** 112px (40% of 280px card width)
- **Location:** Lines 2353-2393, 2516-2570

## Implementation Steps

### 1. Extend Timeline Width
**File:** index.html, Lines 1289-1294

```javascript
// Change from:
viewportStartDate = d3.timeDay.offset(viewportStartDate, -1);
viewportEndDate = d3.timeDay.offset(viewportEndDate, 1);

// To:
const TIMELINE_PADDING_DAYS = 30;
viewportStartDate = d3.timeDay.offset(viewportStartDate, -TIMELINE_PADDING_DAYS);
viewportEndDate = d3.timeDay.offset(viewportEndDate, TIMELINE_PADDING_DAYS);
```

### 2. Add Anchor Flex Properties
**File:** index.html, Lines 2250-2266

```javascript
// Left anchor - can shift RIGHT
leftAnchor.anchorDirection = 'right';
leftAnchor.flexZoneMin = leftAnchor.x;              // Can't go left
leftAnchor.flexZoneMax = leftAnchor.x + FLEX_ZONE;  // Can shift right 112px

// Right anchor - can shift LEFT
rightAnchor.anchorDirection = 'left';
rightAnchor.flexZoneMin = rightAnchor.x - FLEX_ZONE; // Can shift left 112px
rightAnchor.flexZoneMax = rightAnchor.x;              // Can't go right
```

### 3. Include Anchors in Redistribution
**File:** index.html, Line 1859

```javascript
// Change from:
const cardsOnTier = placedCards.filter(c =>
  c.assignedTier === tier &&
  !c.isAnchor  // Don't redistribute anchor cards
);

// To:
const cardsOnTier = placedCards.filter(c =>
  c.assignedTier === tier
  // Include anchors - they'll be constrained by flexZoneMin/Max
);
```

### 4. Apply Directional Flex Zones
**File:** index.html, Lines 1928-1929 (multiple locations)

```javascript
// Change from:
const flexLeft = card.x - FLEX_ZONE;
const flexRight = card.x + FLEX_ZONE;

// To:
let flexLeft, flexRight;
if (card.isAnchor) {
  flexLeft = card.flexZoneMin;   // Use asymmetric bounds
  flexRight = card.flexZoneMax;
} else {
  flexLeft = card.x - FLEX_ZONE;  // Standard symmetric bounds
  flexRight = card.x + FLEX_ZONE;
}
```

### 5. Update Connector Attachment
**File:** index.html, Lines 2382-2393

```javascript
let connectorAttachX;

if (event.isAnchor) {
  const shiftAmount = event.finalX - event.x;
  const MIN_SHIFT_FOR_OFFSET = 20; // Don't show tiny shifts

  if (Math.abs(shiftAmount) < MIN_SHIFT_FOR_OFFSET) {
    // Shift too small - use straight connector
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
} else {
  // Standard flex zone logic for middle cards (unchanged)
  if (x >= flexZoneLeft && x <= flexZoneRight) {
    connectorAttachX = x;
  } else if (x < flexZoneLeft) {
    connectorAttachX = flexZoneLeft;
  } else {
    connectorAttachX = flexZoneRight;
  }
}
```

## Code Locations Reference

| Feature | File | Lines | Action |
|---------|------|-------|--------|
| Timeline padding | index.html | 1289-1294 | Change 1 day → 30 days |
| Anchor selection | index.html | 2238-2266 | Add flex zone properties |
| Redistribution filter | index.html | 1859 | Remove `!c.isAnchor` |
| Flex zone calculation | index.html | 1928-1929, 2030-2031, 2053-2054 | Add conditional logic |
| Connector attachment | index.html | 2382-2393 | Add anchor logic |

## Testing Commands

```bash
# Test timeline in browser console
cd /media/jonathanco/Backup/s3s/timeline
./test-console.sh

# Look for in console output:
# - "Timeline padding: X days" (should be 30)
# - "Left anchor flex zone: [X, X+112]"
# - "Right anchor flex zone: [X-112, X]"
# - "Anchor shift: Xpx" (non-zero if shifted)
# - "Connector attach offset: Xpx" (non-zero if off-center)
```

## Expected Behavior

### Timeline Width
- Before: Events crowd near edges with 1-day padding
- After: 30-day padding creates breathing room at timeline boundaries

### Left Anchor
- Before: Rigid at natural X position
- After: Can shift right [X, X+112px] to make room for dense clusters
- Connector: Attaches left of center when shifted right

### Right Anchor
- Before: Rigid at natural X position
- After: Can shift left [X-112px, X] to make room for dense clusters
- Connector: Attaches right of center when shifted left

### Visual Feedback
- Straight connector: Anchor at natural position or tiny shift
- L-shaped connector with off-center attachment: Anchor significantly shifted
- User sees clear visual indication when anchors adjust from natural position

## Constraints and Safety

### Prevent Overlap
```javascript
// Constrain left anchor to not overlap with next event
const nextEvent = pointEvents[1];
const midpoint = (leftAnchor.x + nextEvent.x) / 2;
leftAnchor.flexZoneMax = Math.min(leftAnchor.x + FLEX_ZONE, midpoint);
```

### Minimum Shift Threshold
```javascript
const MIN_SHIFT_FOR_OFFSET = 20; // pixels
// If shift < 20px, use straight connector (cleaner appearance)
```

### Proportional Padding (Optional)
```javascript
// Instead of fixed 30 days, use 10% of date range
const dateRangeDays = d3.timeDay.count(viewportStartDate, viewportEndDate);
const paddingDays = Math.max(5, Math.min(30, dateRangeDays * 0.1));
// Min 5 days, max 30 days, proportional in between
```

## Validation Checklist

After implementation, verify:

- [ ] Timeline extends beyond first/last events (console: check viewportStartDate/EndDate)
- [ ] Left anchor has asymmetric flex zone [X, X+112]
- [ ] Right anchor has asymmetric flex zone [X-112, X]
- [ ] Anchors included in redistribution (no longer filtered out)
- [ ] Connectors attach off-center when anchors shift > 20px
- [ ] No overlap between anchor and neighboring cards
- [ ] Visual appearance: L-shaped connectors show shift direction
- [ ] Timeline not excessively wide for short date ranges

## Files Created

1. **TIMELINE-WIDTH-AND-ANCHOR-ANALYSIS.md** - Complete technical analysis
2. **ANCHOR-FLEX-VISUAL-GUIDE.md** - Visual diagrams and examples
3. **ANCHOR-IMPLEMENTATION-SUMMARY.md** - This quick reference (you are here)

## Next Steps

1. Read full analysis in TIMELINE-WIDTH-AND-ANCHOR-ANALYSIS.md
2. Review visual examples in ANCHOR-FLEX-VISUAL-GUIDE.md
3. Implement changes in order listed above
4. Test with `./test-console.sh`
5. Verify visual appearance in browser
6. Adjust constants (padding, thresholds) as needed

---

**All analysis complete.** Ready for implementation.
