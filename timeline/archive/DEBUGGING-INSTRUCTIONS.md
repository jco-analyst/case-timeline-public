# Timeline Debugging Instructions

## Issue
Events not showing up for: Critical, OHS Retaliation, Wrongful Dismissal, Smoking Guns, and All Events filters.

## Root Cause Analysis
I've verified that:
- ✅ The data file (js/data.js) contains all 63 events
- ✅ All tags are correctly assigned (critical: 13, ohs: 5, wrongful-dismissal: 62, smoking-gun: 17)
- ✅ The filtering logic is correct
- ✅ No JavaScript syntax errors

**The issue is likely browser-specific or file loading related.**

## Debugging Steps

### Step 1: Open Debug Page
1. Open `debug.html` in your browser
2. Check what it displays:
   - Should show: "✅ SUCCESS: Loaded 63 events"
   - Should show green checkmarks for all filters
   - If you see red ❌ errors, note which ones

### Step 2: Check Browser Console
1. Open the timeline page (`index.html`)
2. Press F12 to open Developer Tools
3. Click on "Console" tab
4. Look for errors (shown in red)
5. Common issues to check for:
   - `timelineEvents is not defined` - means data.js didn't load
   - CORS errors - means you need to use a web server
   - D3.js errors - might indicate D3 library didn't load

### Step 3: Verify File Access
Check that you're accessing the timeline correctly:

**❌ WRONG (may cause issues):**
```
file:///path/to/timeline/index.html
```

**✅ CORRECT (use a web server):**
```
http://localhost:8080/index.html
```

To start a web server:
```bash
cd /home/user/wrongful-dismissal-case/timeline
python3 -m http.server 8080
# Then open: http://localhost:8080/index.html
```

### Step 4: Check Network Tab
1. Open Developer Tools (F12)
2. Click "Network" tab
3. Refresh the page
4. Look for failed requests (shown in red)
5. Verify these files load successfully:
   - `d3.v7.min.js` (from d3js.org)
   - `js/data.js`
   - All should show status 200 (OK)

### Step 5: Console Debugging
Add this to the browser console to check data:
```javascript
// Check if data loaded
console.log('Events loaded:', typeof timelineEvents !== 'undefined');
console.log('Total events:', timelineEvents ? timelineEvents.length : 0);

// Check filtering
if (timelineEvents) {
  console.log('Critical:', timelineEvents.filter(e => e.tags && e.tags.includes('critical')).length);
  console.log('OHS:', timelineEvents.filter(e => e.tags && e.tags.includes('ohs')).length);
  console.log('Wrongful Dismissal:', timelineEvents.filter(e => e.tags && e.tags.includes('wrongful-dismissal')).length);
  console.log('Smoking Gun:', timelineEvents.filter(e => e.tags && e.tags.includes('smoking-gun')).length);
}
```

### Step 6: Check Event Count Display
On the timeline page, look for the subtitle that says:
```
Jan 2024 - Oct 2025 • XX events
```

- If it shows "0 events" - data isn't loading
- If it shows "63 events" on "All Events" but 0 on others - filtering issue
- If it shows correct count but no dots/cards - rendering issue

## Common Issues & Solutions

### Issue 1: CORS Error
**Error:** "Access to script at 'file:///.../js/data.js' from origin 'null' has been blocked by CORS policy"

**Solution:** Use a web server (see Step 3)

### Issue 2: D3.js Not Loading
**Error:** "d3 is not defined"

**Solution:**
- Check internet connection (D3.js loads from CDN)
- Or download D3.js locally and update script src

### Issue 3: Events Show 0 But Data Loaded
**Symptom:** Console shows correct event counts, but timeline is empty

**Solution:** This is likely a viewport/rendering issue. Check:
1. Browser zoom level (should be 100%)
2. Window size (timeline needs minimum width)
3. CSS might be hiding elements

### Issue 4: Only Some Filters Work
**Symptom:** "Family" and "Disability" work, but others don't

**Solution:**
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+F5)
- Check if old data.js is cached

## What I Found in My Testing

Running the filtering logic directly in Node.js:
```
Total events: 63

Filter: CRITICAL
  Count: 13 events ✅

Filter: OHS
  Count: 5 events ✅

Filter: WRONGFUL-DISMISSAL
  Count: 62 events ✅

Filter: SMOKING-GUN
  Count: 17 events ✅

Filter: ALL
  Count: 63 events ✅
```

**All filters work correctly** - the issue is in the browser environment, not the code logic.

## Next Steps

1. Run through the debugging steps above
2. Report back with:
   - What debug.html shows
   - Any console errors
   - Event count displayed on timeline
   - Which browsers you've tried (Chrome, Firefox, etc.)
   - Whether you're using a web server or opening file directly

## Quick Test Files Created

I've created these files to help debug:
- `debug.html` - Visual diagnostic tool
- `test-filter2.js` - Node.js test (run with: `node test-filter2.js`)

Let me know what you find!
