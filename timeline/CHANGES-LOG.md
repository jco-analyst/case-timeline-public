# Timeline Changes Log

## 2025-11-13: Card Placement Algorithm Overhaul ✅

**Session:** Major refactor of card placement and collision detection system

---

### Summary of Changes

Complete rewrite of the card placement algorithm, evolving from simple offset=0 placement through gap-finding attempts to final cost-based multi-strategy optimizer.

### Commits (7 total):

1. **81367d4** - Activated dormant gap-finding system
   - Found and activated existing but unused gap-finding code
   - Initial attempt at horizontal card shifts

2. **0eb9644** - Preserved chronological order & limited gaps
   - Fixed processing order (chronological left-to-right)
   - Added MAX_OFFSET constraint
   - Fixed MIN_GAP usage

3. **2503fff** - Fixed gap-finding tolerance bug
   - Corrected `cardsOverlap()` calls to use MIN_GAP parameter
   - Fixed off-by-one boundary condition

4. **9092055** - Flex zone refactor (MAJOR)
   - Removed gap-finding (too complex)
   - Increased flex zone: 10% → 40% (112px)
   - Added chronological constraint to connectors
   - Added container bounds constraint
   - Simplified to offset=0 only placement

5. **fecae1c** - Fixed critical overlap bugs
   - Fixed `cardsOverlap()` formula: `overlap > tolerance` → `overlap > -tolerance`
   - Restored MIN_GAP to 30px for consistency

6. **49a2691** - Cost-based multi-strategy placement (FINAL ALGORITHM)
   - Implemented 3 new functions:
     * `calculatePlacementCost()` - Quadratic cost function
     * `isValidPlacement()` - Comprehensive validation
     * `findOptimalRedistribution()` - Multi-strategy optimizer
   - Strategy 1: Small shifts (0-60px)
   - Strategy 2: Large shifts (60-112px)
   - Picks lowest-cost solution
   - ~22 attempts per tier

7. **6e54e91** - Adjusted packing parameters
   - MIN_GAP: 30px → 10px (tighter packing)
   - Container margin: 20px → 10px (closer to edges)
   - LARGE_SHIFT_MAX: 112px → 200px (more placement options)

---

### Final Algorithm Design

**Placement Priority:**
1. Try offset=0 (straight connector) - cost=0
2. Try small shifts (±10, ±20, ±30... ±60) - low cost
3. Try large shifts (±70, ±80... ±200) - higher cost
4. If no solution → escalate to next tier
5. Repeat for all tiers (above1, above2, below1, below2)

**Cost Function:**
- Minimizes sum of squared deviations from natural positions
- Prefers smaller offsets (straighter connectors)
- Quadratic penalty (large shifts cost exponentially more)

**Validation:**
- No overlaps (MIN_GAP=10px enforced)
- Within container bounds (margin=10px)
- Respects chronological order constraints

---

### Key Parameters

```javascript
CARD_WIDTH = 280px
MIN_GAP = 10px          // Cards can be very close
FLEX_ZONE = 40% (112px) // Connector attachment range
SMALL_SHIFT_MAX = 60px  // Mostly straight connectors
LARGE_SHIFT_MAX = 200px // Before L-shaped needed
Container margin = 10px // Close to timeline edges
```

---

### Technical Improvements

✅ **Eliminated overlaps** - Proper MIN_GAP=10px spacing enforced
✅ **Cost optimization** - Picks best solution from multiple strategies
✅ **Chronological order** - Earlier events always left of later events
✅ **Flex zone integration** - 112px range for graceful connector angles
✅ **Extensible design** - Easy to add more placement strategies
✅ **No dead code** - Removed unused gap-finding functions

---

### Performance

- **Strategy 1:** ~13 attempts (0, ±10, ±20... ±60)
- **Strategy 2:** ~14 attempts (±70, ±80... ±200)
- **Total:** ~27 attempts per tier
- **Validation:** O(n²) per attempt
- **Acceptable for:** n < 20 cards per tier

---

### Future Enhancements (TODO)

- [ ] Batch redistribution (adjust existing + new cards together)
- [ ] L-shaped connectors (offsets beyond 200px)
- [ ] Stricter chronological constraints in optimizer
- [ ] Dynamic parameter adjustment based on density

---

### Files Modified

**Primary:**
- `timeline/index.html` (lines 1185-1882)
  - Added: `calculatePlacementCost()`
  - Added: `isValidPlacement()`
  - Added: `findOptimalRedistribution()`
  - Modified: `tryAddCardToTier()`
  - Fixed: `cardsOverlap()`

**Documentation:**
- `timeline/CHANGES-LOG.md` (this file)

---

### Testing

**Browser Console Messages:**
```
[above1] Card placed using strategy 'new-card-small' at X=180, offset=25
[below1] Card placed using strategy 'new-card-large' at X=1056, offset=85
⚠️ FALLBACK TRIGGERED! No tier could fit card at X=1076
```

**Views to Test:**
- Critical (17 events) - Low density, mostly offset=0
- All Events (71 events) - High density, should see offsets
- Wrongful Dismissal (70 events) - High density testing

---

**Last Updated:** 2025-11-13
**Status:** Algorithm complete and deployed
**Next:** Monitor for fallback triggers, consider batch redistribution if needed

---

## 2025-11-12: Bug fixes and data corrections

**Session:** Bug fixes and data corrections

---

### 1. Removed Paternity Leave Event ✅

**Event Removed:**
- **ID:** 7
- **Date:** 2024-10-20 to 2024-11-25
- **Title:** "5 Weeks Paternity Leave"
- **Reason:** User requested complete removal

**Impact:**
- Total events: 63 → **62**
- Wrongful-dismissal tagged events: 62 → **61**
- Family tagged events: 16 → **15**

---

### 2. Fixed Bereavement Leave Missing Image ✅

**Event:** July 6, 2025 - Bereavement Leave Request (ID: 18)

**Problem:** Image file referenced but doesn't exist:
- Referenced: `images/evidence/family-status/July-06-2025-Bereavement-Leave.jpg`
- Actual status: File not found

**Fix:** Removed evidenceImages array (now empty: `evidenceImages: []`)

**Result:** Event still displays but without broken image link

---

### 3. Fixed PDF Rendering ✅

**Problem:** PDFs didn't display in evidence modal (blank or broken)
- Used `<img>` tags for all files (only works for JPG/PNG)
- PDFs require `<iframe>` or `<embed>` tags

**Fix Applied:** Updated `showImageModal()` function in `index.html`
- Detects `.pdf` file extension
- Renders PDFs with `<iframe>` tag (2025 best practice)
- Renders images with `<img>` tag (unchanged)
- Added "Open in new tab" link for PDFs
- Removed PDF toolbar with `#toolbar=0` parameter

**Result:** All PDFs now display properly

---

**Last Updated:** 2025-11-12
**Status:** All fixes applied - Ready for browser testing
