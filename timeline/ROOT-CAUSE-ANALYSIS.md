# Timeline Root Cause Analysis & Testing Guide

**Date:** 2025-11-12
**Status:** ✅ Fix Applied, Awaiting Browser Testing

---

## Executive Summary

**Problem:** Timeline filters (Critical, OHS, Wrongful Dismissal, Smoking Gun, All Events) showed 0 events and crashed browser

**Root Cause:** Date parsing failure on 4 events with uncertain dates marked with `?`

**Fix Applied:** Strip `?` from timestamps before parsing + add validation fallbacks

**Testing Status:** ✅ Node.js tests pass | ⏳ Browser testing needed

---

## Data Verification (✅ ALL PASSING)

### Event Count Summary
```
Total Events: 63
├─ Critical: 13 events
├─ OHS Retaliation: 5 events
├─ Wrongful Dismissal: 62 events
├─ Smoking Gun: 17 events
├─ Family Status: 16 events
├─ Disability: 4 events
└─ Correspondence: 7 events
```

### Problematic Events (Now Fixed)
Four events had uncertain dates with `?` suffix that caused crashes:

| Line | Timestamp | Event | Tags |
|------|-----------|-------|------|
| 95 | `2024-09-15?` | Write-Up #2: First Timecard Write-Up | wrongful-dismissal |
| 115 | `2024-10-01?` | Confined Space Safety Meeting | critical, ohs, wrongful-dismissal |
| 733 | `2025-07-20?` | Epoxy Paint Tank Injury | smoking-gun, ohs, wrongful-dismissal |
| 1512 | `2025-10-17?` | Differential Treatment | wrongful-dismissal |

---

## The Bug (What Was Happening)

### Error Chain
```
1. Event loads with timestamp: '2024-10-01?'
2. D3.js date parser: d3.timeParse('%Y-%m-%d')('2024-10-01?')
   → Returns: null (can't parse '?')
3. xScale(null) calculates X position
   → Returns: NaN (Not a Number)
4. Card positioning tries: newCardX.toFixed(0)
   → CRASH: "Cannot read properties of undefined (reading 'toFixed')"
```

### Why Some Filters Worked
- ✅ **Family, Disability, Correspondence** = No events with `?` dates
- ❌ **Critical, OHS, Wrongful Dismissal, Smoking Gun, All** = Include events with `?` dates

---

## The Fix (What Was Changed)

### Code Changes in `index.html`

**1. Date Parsing Fix (Lines 1206-1212)**
```javascript
// BEFORE (crashed):
e.parsedDate = parseDate(e.timestamp);

// AFTER (strips '?' first):
const cleanTimestamp = e.timestamp.replace('?', '');
e.parsedDate = parseDate(cleanTimestamp);
```

**2. X-Position Validation (Lines 1837-1842)**
```javascript
// Validate that x position is a valid number
if (!e.x || isNaN(e.x)) {
  console.error('⚠️ Invalid X position for event:', e.timestamp);
  e.x = margin.left + 100; // Fallback position
}
```

### What This Accomplishes
1. **Removes `?`** from timestamps before D3 parsing
2. **Validates positions** to catch any parsing failures
3. **Provides fallback** if validation fails
4. **Logs errors** for debugging

---

## How to Test the Fix

### Step 1: Start Web Server (REQUIRED)
```bash
cd /home/user/wrongful-dismissal-case/timeline
python3 -m http.server 8080
```

**Why?** Modern browsers block local file access (CORS). Web server required.

### Step 2: Open Timeline in Browser
```
Open: http://localhost:8080/index.html
```

**DO NOT use:** `file:///path/to/index.html` (will fail)

### Step 3: Test Each Filter

Click each filter button and verify event counts match:

| Filter | Expected Count | What to Check |
|--------|----------------|---------------|
| **All Events** | 63 events | Timeline has dots/cards |
| **Critical** | 13 events | Should work now (was crashing) |
| **OHS Retaliation** | 5 events | Should work now (was crashing) |
| **Wrongful Dismissal** | 62 events | Should work now (was crashing) |
| **Smoking Gun** | 17 events | Should work now (was crashing) |
| **Family Status** | 16 events | Should still work (was working) |
| **Disability** | 4 events | Should still work (was working) |
| **Correspondence** | 7 events | Should still work (was working) |

### Step 4: Check Browser Console

1. Press **F12** to open Developer Tools
2. Click **Console** tab
3. Look for debug messages starting with 🔍

**Expected Output (Success):**
```
🔍 DEBUG: Initializing timeline...
🔍 DEBUG: timelineEvents exists? true
🔍 DEBUG: Total events loaded: 63
🔍 DEBUG: Current view: critical
🔍 DEBUG: Filtered events: 13
🔍 DEBUG: renderTimeline() called with 13 events
🔍 DEBUG: viewportEvents (after pagination): 10 events
```

**Bad Signs (Report These):**
```
❌ timelineEvents is not defined
❌ Uncaught TypeError: ...
❌ CORS policy blocked...
❌ Filtered events: 0 (when expecting more)
```

### Step 5: Visual Verification

For each working filter, you should see:
- ✅ Timeline horizontal line with colored dots
- ✅ Event cards positioned above/below line
- ✅ Event count displayed in subtitle (e.g., "13 events")
- ✅ Navigation arrows work
- ✅ Mini-map shows events

---

## Quick Diagnostic Tests

### Test 1: Debug Page
Open `http://localhost:8080/debug.html` in browser

**Good Result:**
```
✅ SUCCESS: Loaded 63 events
✅ CRITICAL filter: 13 events
✅ OHS filter: 5 events
✅ WRONGFUL-DISMISSAL filter: 62 events
✅ SMOKING-GUN filter: 17 events
```

**Bad Result:**
```
❌ FAILED: Could not load events
```

### Test 2: Console Commands
Paste this into browser console (F12 → Console):

```javascript
// Check data loaded
console.log('Events:', timelineEvents.length);
console.log('Critical:', timelineEvents.filter(e => e.tags?.includes('critical')).length);
console.log('OHS:', timelineEvents.filter(e => e.tags?.includes('ohs')).length);
```

**Expected Output:**
```
Events: 63
Critical: 13
OHS: 5
```

---

## Common Issues & Solutions

### Issue 1: "timelineEvents is not defined"
**Cause:** Data file not loading

**Solutions:**
1. Use web server (not direct file access)
2. Check browser console Network tab for failed requests
3. Verify `js/data.js` exists and is readable

### Issue 2: "CORS policy blocked"
**Cause:** Trying to open file directly (`file://`)

**Solution:** Use web server (see Step 1)

### Issue 3: Still Shows 0 Events
**Cause:** Browser cache has old code

**Solutions:**
1. Hard refresh: **Ctrl+F5** (Windows/Linux) or **Cmd+Shift+R** (Mac)
2. Clear cache: **Ctrl+Shift+Delete**
3. Try incognito/private window

### Issue 4: Different Event Counts
**Cause:** Old data file cached

**Solutions:**
1. Hard refresh (see above)
2. Check Network tab shows `js/data.js` with status 200
3. Verify file timestamp: `ls -la timeline/js/data.js`

---

## File Inventory

### Core Files
```
timeline/
├── index.html (87,385 bytes) - Main application with fix applied
├── js/data.js (143,356 bytes) - 63 events with tags
├── debug.html (5,139 bytes) - Diagnostic tool
├── test-filter2.js (1,910 bytes) - Node.js test (✅ passing)
└── images/evidence/ - Evidence files (PDFs, images)
```

### Fix Locations
- **Date cleaning:** `index.html` lines 1206-1212
- **X validation:** `index.html` lines 1837-1842
- **Debug logging:** Throughout `init()`, `getFilteredEvents()`, `renderTimeline()`

---

## Expected Behavior After Fix

### Filter Behavior
- **All filters** should display correct event counts
- **No crashes** on any filter selection
- **Smooth transitions** between filters
- **Events positioned** correctly on timeline
- **Cards readable** above/below line

### Date Handling
- Events with `2024-10-01?` display as **Oct 1, 2024**
- Question mark stripped invisibly (users don't see it)
- All 4 uncertain-date events position correctly
- No console errors about date parsing

### Visual Result
```
[Timeline horizontal line with dots]
     ●────●──────●───●──────●────●
[Cards displayed above/below line with correct dates]
```

---

## Testing Checklist

- [ ] Web server running on port 8080
- [ ] Can access `http://localhost:8080/index.html`
- [ ] "All Events" shows 63 events
- [ ] "Critical" shows 13 events (was crashing)
- [ ] "OHS" shows 5 events (was crashing)
- [ ] "Wrongful Dismissal" shows 62 events (was crashing)
- [ ] "Smoking Gun" shows 17 events (was crashing)
- [ ] "Family" still shows 16 events
- [ ] "Disability" still shows 4 events
- [ ] Browser console shows debug messages
- [ ] No red errors in console
- [ ] Timeline dots visible
- [ ] Event cards readable
- [ ] Navigation arrows work
- [ ] Mini-map works

---

## Report Back With

If issues persist, provide:

1. **Browser & Version:** (Chrome 120, Firefox 121, Safari 17, etc.)
2. **Console Output:** Copy all 🔍 DEBUG lines
3. **Error Messages:** Any red errors from console
4. **Event Counts:** What each filter displays
5. **Screenshots:** Helpful for visual issues
6. **Access Method:** Web server or direct file?

---

## Node.js Test Results (Reference)

Already verified in Node.js environment:
```
✅ Total events: 63
✅ Critical: 13 events
✅ OHS: 5 events
✅ Wrongful Dismissal: 62 events
✅ Smoking Gun: 17 events
✅ Disability: 4 events
✅ Family: 16 events
✅ Correspondence: 7 events
```

The data and filtering logic are **100% correct**. Any remaining issues are browser-environment specific.

---

## Next Steps

1. **Test in browser** following steps above
2. **Check console output** for errors
3. **Verify all filters work** (especially Critical, OHS, Wrongful Dismissal, Smoking Gun)
4. **Report results** - either "All working!" or specific errors found

---

**Status:** Fix applied and ready for testing
**Confidence:** High - Root cause identified and patched
**Risk:** Low - Defensive validation added as safeguard

---

Last Updated: 2025-11-12
