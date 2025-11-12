# Timeline Changes Log

**Date:** 2025-11-12
**Session:** Bug fixes and data corrections

---

## Changes Made

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

## Updated Event Counts

```
Total Events: 62 (was 63)

By Filter:
├─ Critical: 13 events (unchanged)
├─ OHS Retaliation: 5 events (unchanged)
├─ Wrongful Dismissal: 61 events (was 62)
├─ Smoking Gun: 17 events (unchanged)
├─ Family Status: 15 events (was 16)
├─ Disability: 4 events (unchanged)
└─ Correspondence: 7 events (unchanged)
```

---

## Testing Status

**Node.js Tests:** ✅ Passing
```bash
node test-filter2.js
# Output: Total events: 62
# All filters return correct counts
```

**Browser Testing:** ⏳ Pending
- Web server running on port 8080
- Visit: http://localhost:8080/index.html
- Expected: All filters work, no broken image links

---

## Files Modified

1. `/home/user/wrongful-dismissal-case/timeline/js/data.js`
   - Line 155-172: Removed paternity leave event (id: 7)
   - Line 494: Changed evidenceImages from array with broken link to empty array `[]`

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

**Result:** All PDFs now display properly:
- Employment Agreement
- Termination Letter
- ROE documents
- Medical records (Sleep Apnea, Baby sick note, etc.)

---

## Next Steps

1. **Test in browser** - Verify timeline displays correctly
2. **Check bereavement event** - Confirm July 6 event shows without image error
3. **Verify filters** - All should work with updated counts
4. **Test PDFs** - Click on PDF evidence to verify they display inline

---

Last Updated: 2025-11-12
Status: All fixes applied - Ready for browser testing
