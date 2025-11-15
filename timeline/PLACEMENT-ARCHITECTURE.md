# Timeline Card Placement Architecture

## Current Implementation: Redistribution-Aware Constraint-Based Placement

**Status:** Working (as of 2025-11-14)
**Zero L-connectors achieved** through dynamic redistribution during placement.

---

## Algorithm Overview

**Type:** Constraint-based recursive placement with dynamic redistribution
**Complexity:** O(n × t × m) where n=cards, t=tiers, m=cards per tier (typically 2-6)
**Performance:** ~120 console logs for 12 cards (wrongful dismissal view)

### Core Concept
When placing card N on a tier, the algorithm considers **redistributing ALL existing cards on that tier** to make room. Cards are repositioned within their flex zones (±112px from natural position) to minimize total offset while maintaining minimum gaps (285px center-to-center). This prevents L-connectors by solving placement as a batch optimization problem rather than greedy single-card placement.

---

## Three-Phase Flow

### Phase 1: Density Analysis & Direction Selection
```javascript
Density = cards_per_pixel over lookahead window (default: 5 cards)

Left density:  count / total_gap (left → right)
Right density: count / total_gap (right → left)

Direction: Start from SPARSE side (lower density)
```

**Why:** Dense regions have more constraints, placing sparse cards first reduces conflicts.

### Phase 2: Edge Anchoring
```javascript
Left anchor:  tier=above1, offset=0, fixed position
Right anchor: tier=below1, offset=0, fixed position
```

**Why:** Anchors prevent edge cards from shifting, provide stable reference for middle cards.

### Phase 3: Recursive Placement with Redistribution
```javascript
For each middle card (index 1 to length-2):
  1. Determine zigzag preference: above/below based on card index parity
  2. Try tiers in preference order: [above1, below1, above2, below2, ...]
  3. For each tier:
     A. TRY REDISTRIBUTION FIRST:
        - Collect all existing cards on tier + new card
        - Sort by natural X position (left to right)
        - Pack optimally: each card stays within flex zone, minimize total offset
        - If solution exists → apply redistributions, place new card, SUCCESS

     B. FALLBACK TO OLD METHOD:
        - Calculate constraints (same-tier neighbors as immutable)
        - Try to place new card without moving existing cards
        - If fits within flex zone → SUCCESS

     C. L-CONNECTOR BACKUP:
        - If neither works, save as L-connector option

  4. If all tiers fail, use best L-connector fallback
```

---

## Constraint Calculation (Critical Component)

### Input
- `card`: Event to place (has `naturalX` position)
- `tier`: Target tier (above1, below1, above2, below2, above3, below3)
- `placedCards`: Array of already-placed cards

### Process

**Step 1: Container boundaries (for card CENTER)**
```javascript
leftCenterBoundary  = margin.left + CARD_WIDTH/2
rightCenterBoundary = width - margin.right - CARD_WIDTH/2
```

**Step 2: Same-tier neighbor constraints**
```javascript
For each card on same tier:
  If card is LEFT of new card:
    leftBoundary = max(leftBoundary,
                      card.finalX + CARD_WIDTH/2 + MIN_GAP + CARD_WIDTH/2)

  If card is RIGHT of new card:
    rightBoundary = min(rightBoundary,
                       card.finalX - CARD_WIDTH/2 - MIN_GAP - CARD_WIDTH/2)
```

**Key:** Calculate center-to-center distance (card edge → gap → new card edge → new card center)

**Step 3: Flex zone boundaries**
```javascript
flexLeft  = card.naturalX - FLEX_ZONE  // 112px radius
flexRight = card.naturalX + FLEX_ZONE
```

**Step 4: Intersection (available space for center)**
```javascript
availableCenterLeft  = max(leftCenterBoundary, flexLeft)
availableCenterRight = min(rightCenterBoundary, flexRight)
availableWidth       = availableCenterRight - availableCenterLeft

canFit = availableWidth > 0  // Just needs 1px for center point
```

### Output
```javascript
{
  left: availableCenterLeft,    // Leftmost position for card center
  right: availableCenterRight,  // Rightmost position for card center
  width: availableWidth,        // Range size
  canFit: boolean,              // Can card fit on this tier?
  tier: tier                    // Tier name
}
```

---

## Constants

```javascript
CARD_WIDTH = 280px
MIN_GAP = 5px              // Minimum space between adjacent cards
FLEX_ZONE = 112px          // 40% of card width (280 * 0.4)
```

**Flex zone behavior:**
- Cards can shift ±112px from natural position
- If shift > 112px required, escalate to next tier
- L-connector used only if ALL tiers fail (rare)

---

## Tier Assignment Logic

### Zigzag Pattern
```
Card index 0 (left anchor):  above1 (fixed)
Card index 1:                below1 (prefers below, tries: below1→above1→below2→above2→...)
Card index 2:                above1 (prefers above, tries: above1→below1→above2→below2→...)
Card index 3:                below1 (prefers below, ...)
Card index 4:                above1 (prefers above, ...)
...
Card index N-1 (right anchor): below1 (fixed)
```

**Purpose:** Visual balance, spreads cards vertically to reduce same-tier conflicts.

### Tier Escalation
When preferred tier fails (constraints violated), tries next tier in order:
```
Prefer above: [above1, below1, above2, below2, above3, below3]
Prefer below: [below1, above1, below2, above2, below3, above3]
```

First tier that satisfies constraints wins. If none fit within FLEX_ZONE, use L-connector fallback.

---

## Key Design Decisions

### 1. Why Constraint-Based (Not Physics Simulation)?
**Pros:**
- Deterministic (same input = same output)
- Fast (no iterative convergence)
- Predictable (easy to debug with logging)
- Respects hard boundaries (container, flex zone, neighbors)

**Cons:**
- Greedy within tier (doesn't redistribute existing cards)
- No lookahead (doesn't check if next card will break our choice)

**Research:** Physics simulation (force-directed) was considered but adds complexity without clear benefit for timeline use case.

### 2. Why Center-Based Constraints?
**Problem:** Original implementation mixed edge positions with center positions.
- Container bounds were edge-based
- Flex zone was center-based
- Result: Cards never fit (available space < card width)

**Solution:** Convert ALL constraints to center positions.
- Container bounds account for card extending ±140px from center
- Neighbor constraints calculate center-to-center distance
- Flex zone naturally center-based
- Result: `canFit = availableWidth > 0` (just needs space for center)

### 3. Why Edge Anchoring?
**Prevents:** Cards shifting off visible area, unpredictable edge behavior.

**Alternative considered:** Bidirectional placement (meet in middle).
- More complex
- Handles middle conflicts better
- Not needed for current card density
- Can add later if needed

---

## Logging & Debugging

### Console Output Structure
```
🎯 Starting constraint-based placement algorithm...
📊 Point events: 7, Range events: 3
📈 Density: left=0.006684, right=0.011585 → Start from left

📍 Anchoring end cards...
  📍 Left anchor: "Event Name" at X=161 on above1
  📍 Right anchor: "Event Name" at X=974 on below1

🎯 Placing [1] "Event Name" (Date) at naturalX=543
  🔄 Zigzag preference: below (card 1)
  ✅ Tier below1: Fits at centerX=543 (offset=0px, L-connector=false)
  ✨ Placed on below1 within flex zone

📊 Placement Summary:
  Tier distribution: {"above1":3,"below1":2,"below2":1,"above2":1}
  L-connectors used: 0
```

### Test Command
```bash
cd timeline && ./test-console.sh
```

Uses Playwright headless browser to capture console, detect errors, verify placement.

---

## Example Execution

**Input:** 7 point events (Oct 01, Oct 09, Oct 25 cluster + sparse cards)

**Step-by-step:**
1. **Density:** Right denser (0.0116) > left (0.0067) → start from left
2. **Anchors:**
   - Left (Jan 10) → above1
   - Right (Jul 28) → below1
3. **Card 1 (Oct 01, X=543):**
   - Prefer below1 (zigzag)
   - below1 constraints: left=151, right=862 (712px available)
   - Fits at X=543, offset=0 ✅
4. **Card 2 (Oct 09, X=554):**
   - Prefer above1 (zigzag)
   - above1 constraints: left=151, right=862 (712px available)
   - Fits at X=554, offset=0 ✅
5. **Card 3 (Oct 25, X=577):**
   - Prefer below1 (zigzag)
   - below1 constraints: FAIL (conflicts with Oct 01)
   - above1 constraints: FAIL (conflicts with Oct 09)
   - below2 constraints: left=151, right=862 (712px available)
   - Fits at X=577, offset=0 ✅ (escalated to tier 2)

**Result:** 0 L-connectors, proper zigzag distribution.

---

## Algorithm Enhancements (2025-11-14)

### ✅ Implemented: Dynamic Redistribution During Placement

**Problem Solved:** Original algorithm treated placed cards as immutable, causing unnecessary L-connectors when cards had flex zone space available.

**Solution:** When placing card N, try redistributing ALL cards on tier (existing + new) to find positions that:
- Keep each card within its flex zone (±112px from natural X)
- Maintain minimum gaps (285px center-to-center)
- Minimize total offset from natural positions

**Results:**
- Critical view (10 events): 0 L-connectors ✅
- Wrongful dismissal view (12 events): 0 L-connectors ✅
- Example: Sept 20 and Oct 15 now fit on same tier through redistribution

### Remaining Limitations
1. **Greedy left-to-right packing:** Redistribution uses greedy approach (place each card as close to natural X as constraints allow). Could use global optimization for absolute minimum total offset.
2. **Single direction:** Always processes left→right or right→left, never bidirectional.
3. **No lookahead beyond current tier:** Doesn't predict if placing on tier A will cause problems for future cards on tier B.

### Future Enhancement Ideas
1. **Global optimization:** Replace greedy packing with linear programming solver for absolute minimum total offset
2. **Clustering detection:** Detect dense clusters (3+ cards within 2×FLEX_ZONE), pre-compute optimal arrangement
3. **Bidirectional placement:** Meet in middle, resolve center conflicts with equal distribution
4. **Cross-tier lookahead:** Before placing on tier, simulate next 3-5 cards to avoid cascading failures

**Current Status:** Algorithm handles typical timeline density excellently. Further optimization has diminishing returns.

---

## File Locations

**Implementation:** `/media/jonathanco/Backup/s3s/timeline/index.html`
**Algorithm:** Lines 2179-2426 (constraint-based recursive placement)
**Test script:** `/media/jonathanco/Backup/s3s/timeline/test-console.sh`

**Key functions:**
- `calculateDensity()` - Lines 2195-2211
- `calculateConstraints()` - Lines 2232-2267
- `tryPlaceOnTier()` - Lines 2269-2295
- `placeCardRecursive()` - Lines 2297-2357
- Anchoring logic - Lines 2359-2422

---

## Commit History (Key Milestones)

- `[CURRENT]` - **Implement redistribution-aware placement algorithm** ✅ ZERO L-CONNECTORS
  - Added `tryPlaceWithRedistribution()`: attempts to redistribute all cards on tier when placing new card
  - Added `findOptimalPositions()`: greedy left-to-right packing within flex zones
  - Modified `placeCardRecursive()`: tries redistribution first, falls back to old method
  - Result: Eliminated all L-connectors in critical (10 events) and wrongful dismissal (12 events) views
- `a0da741` - Fix anchor duplication: stop recursion before right anchor (previous working version)
- `d781d8d` - Fix constraint calculation: use CENTER positions not edge positions
- `8d9c6fb` - Add constraint-based recursive placement algorithm (WIP)
- `5186ed4` - Add enhanced event logging: show titles and dates
- `2fa5743` - Improve cost function to strongly prefer batch redistribution
- `debe59e` - Fix scope error: Use flexZoneRadius parameter
- `04c7704` - Tune batch redistribution for more aggressive card shifting
- `2f76d47` - Fix flex zone card shifting: Implement complete batch redistribution

---

## References

**Research sources:**
- [Comparing Algorithms for Dispersing Overlapping Rectangles](https://mikekling.com/comparing-algorithms-for-dispersing-overlapping-rectangles/)
- Stack Overflow: "Algorithm to space out overlapping rectangles"
- Force-directed graph layouts (considered but not implemented)

**Algorithm classification:** Constraint Satisfaction Problem (CSP) with soft constraints (flex zone) and hard constraints (container bounds, neighbor spacing).

---

**Last updated:** 2025-11-14
**Status:** Production-ready, zero L-connectors, proper tier distribution
