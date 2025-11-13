# Timeline Manual Testing Guide
**Quick Reference for Browser Testing**

---

## How to Open the Timeline

### Option 1: Direct Browser Open
```bash
# Open in default browser (Linux)
xdg-open /media/jonathanco/Backup/s3s/timeline/index.html

# Or use a specific browser
firefox /media/jonathanco/Backup/s3s/timeline/index.html
google-chrome /media/jonathanco/Backup/s3s/timeline/index.html
```

### Option 2: File Manager
1. Navigate to: `/media/jonathanco/Backup/s3s/timeline/`
2. Double-click `index.html`
3. Should open in your default browser

### Option 3: Browser Direct
1. Open your web browser
2. Press `Ctrl+O` (Open File)
3. Navigate to timeline folder
4. Select `index.html`

---

## What to Look For

### Initial Load (Expected: 17 events)
- Timeline should display with "Critical Only" filter active
- 17 events visible by default
- Title: "Wrongful Dismissal Timeline - Case Evidence"
- Dark/Light theme toggle button visible

### Filter Button Tests

Click each button and verify event counts:

| Filter | Button Text | Expected Count | What to Check |
|--------|------------|----------------|---------------|
| **Critical** | "Critical Only" | 17 events | Elevator pitch story |
| **Family** | "Family Discrimination" | 21 events | Family status incidents |
| **Disability** | "Disability" | 5 events | ADHD + sleep apnea |
| **OHS** | "OHS Retaliation" | 5 events | Safety advocacy |
| **Wrongful** | "Wrongful Dismissal" | 70 events | Comprehensive view |
| **Bad Faith** | "Bad Faith" | 5 events | Post-termination issues |
| **Correspondence** | "Correspondence" | 11 events | Oct-Nov emails |
| **Smoking Gun** | "Smoking Gun" | 20 events | Most devastating |

### Verify Specific Events Exist

Search for these key events (they should be visible when scrolling):

1. **Event 71** (2024-01-10): "First Interview - Family Priority Disclosed"
2. **Event 73** (2025-08-01): "Michelle Sherman Discriminatory Statement"
3. **Event 76** (2024-10-15): "9-MONTH ACCOMMODATION: Being Late is Okay"
4. **Event 77** (2025-08-02): "Parental Leave Request"
5. **Event 79** (2025-10-22): "EVIDENCE SPOLIATION: Email Access Cut"

### Interactive Features to Test

1. **Click Events** - Click any event to expand details panel
   - Should show: Description, Evidence, Witnesses, Legal Significance
   - Panel should have close button (X)

2. **Theme Toggle** - Click theme toggle button
   - Should switch between light and dark modes
   - Background, text, and event colors should all change

3. **Scroll/Zoom** - Try scrolling through the timeline
   - Events should be chronologically ordered
   - Date labels should show months/years clearly

4. **Month Navigation** (if visible in Critical/All views)
   - Mini-map at bottom should show timeline overview
   - Clicking month labels should jump to that period

---

## Browser DevTools Checks

### Open DevTools
- **Chrome/Firefox:** Press `F12` or `Ctrl+Shift+I`
- **Alternative:** Right-click page → "Inspect Element"

### Console Tab (check for errors)
Look for these console messages when switching filters:

```
🔍 DEBUG: After critical filter: 17 events
🔍 DEBUG: After family filter: 21 events
🔍 DEBUG: After disability filter: 5 events
```

**Red error messages = problem**
**Blue/black messages = normal debug info**

### Common Issues to Check

1. **No events showing:**
   - Check Console for JavaScript errors
   - Verify `js/data.js` file exists in same folder

2. **Filters not working:**
   - Check Console for click handler errors
   - Try refreshing page (Ctrl+R or F5)

3. **Wrong event counts:**
   - Compare Console log numbers to test report
   - May indicate data.js file mismatch

---

## Quick Test Checklist

- [ ] Timeline loads successfully
- [ ] Default view shows 17 "Critical" events
- [ ] All 8 filter buttons are visible and clickable
- [ ] Each filter shows correct event count (see table above)
- [ ] Events display in chronological order (Jan 2024 → Nov 2025)
- [ ] Click event expands detail panel with evidence
- [ ] Theme toggle switches between light/dark modes
- [ ] All 5 key events (71, 73, 76, 77, 79) are present
- [ ] No red error messages in browser Console
- [ ] Timeline is readable and professional-looking

---

## Troubleshooting

### Problem: Timeline doesn't load
**Solution:**
- Ensure `index.html` and `js/data.js` are in same directory structure
- Check browser Console for "404" or "file not found" errors
- Try opening in different browser (Chrome, Firefox, Edge)

### Problem: Events look wrong or overlapping
**Solution:**
- Try zooming browser in/out (Ctrl + Plus/Minus)
- Refresh page (Ctrl+R or F5)
- Resize browser window

### Problem: Filter buttons don't work
**Solution:**
- Check Console for JavaScript errors
- Verify D3.js library loaded (should see in Network tab)
- Try hard refresh (Ctrl+Shift+R)

### Problem: Wrong number of events shown
**Solution:**
- Check Console debug messages for actual count
- Compare to test report expected values
- May need to update tags in js/data.js

---

## Report Issues

If you find any problems during testing, document:

1. **What filter was active** (Critical, Family, etc.)
2. **What you expected** (e.g., "should show 21 events")
3. **What actually happened** (e.g., "only shows 18 events")
4. **Browser and version** (e.g., "Chrome 119", "Firefox 120")
5. **Console errors** (copy any red error messages)

---

## Next Steps After Testing

1. **If all tests pass:** Ready for lawyer consultation
2. **If minor issues:** Note them for future fixes
3. **If major issues:** Check test report for recommended fixes

---

**Last Updated:** November 13, 2025
**Test Report:** See `TIMELINE-TEST-REPORT-Nov13-2025.md` for detailed analysis
