# PDF Rendering Issue - Timeline Visualization

**Date:** 2025-11-12
**Issue:** PDF files don't display in evidence modal

---

## Problem Description

When you click on PDF evidence files in the timeline (like `ADHD-Medication-Note-Jan-2024.pdf`), the modal opens but the PDF doesn't display - just a broken image or blank area.

---

## Root Cause

### The Technical Issue

The timeline's `showImageModal()` function (line 2596 in `index.html`) always uses an `<img>` tag to display evidence:

```javascript
imageModalContent.innerHTML = `
  <img src="${imgData.file}" alt="${imgData.caption || 'Evidence'}" />
  ${imgData.caption ? `<p class="evidence-caption">${imgData.caption}</p>` : ''}
`;
```

**Problem:** `<img>` tags can only display image files (JPG, PNG, GIF, etc.)
**PDFs require:** `<embed>`, `<iframe>`, or `<object>` tags

### Why It Affects PDFs Only

| File Type | Works? | Reason |
|-----------|--------|--------|
| `.jpg` / `.jpeg` | ✅ YES | Native support in `<img>` tags |
| `.png` | ✅ YES | Native support in `<img>` tags |
| `.pdf` | ❌ NO | Requires special rendering (embed/iframe) |

---

## Affected Files in Timeline

Currently, the following PDF files are referenced but won't display:

1. **ADHD Medication Note**
   - File: `ADHD-Medication-Note-Jan-2024.pdf`
   - Event: ADHD Disclosed (Pre-Employment) - Jan 15, 2024
   - Status: **REMOVED** (now only shows JPG version)

2. **Employment Agreement**
   - File: `Employment-Agreement-Dear-Rollins-Error.pdf`
   - Event: Hired as Electrical Technician - Jan 15, 2024
   - Status: Still referenced (may not display)

3. **Termination Letter**
   - File: `Termination-Letter.pdf`
   - Event: Termination - Oct 22, 2025
   - Status: Still referenced (may not display)

4. **ROE Documents**
   - File: `ROE-2025-Incorrect.pdf`
   - File: `ROE-2025-Corrected.pdf`
   - Events: Various correspondence events
   - Status: Still referenced (may not display)

5. **Baby Medical Records**
   - File: `Baby-Sept-2-2025-Viral-Cough.pdf`
   - Event: Sick Baby - Aug 28, 2025
   - Status: Still referenced (may not display)

6. **Sleep Apnea Diagnosis**
   - File: `Sleep-Apnea-Diagnosis-CPAP-Feb-18-2025.pdf`
   - Event: Sleep Apnea Disclosed - Feb 18, 2025
   - Status: Still referenced (may not display)

---

## Current Workaround Applied

For the **ADHD Disclosed** event, we've removed the PDF references and kept only the JPG version of the drug test (page 1). The important information from the doctor's note PDF was incorporated into the caption.

---

## Solutions (Choose One)

### Option 1: Convert All PDFs to Images (Recommended for Simplicity)
**Pros:**
- No code changes needed
- Consistent user experience
- Fast loading in browser

**Cons:**
- Requires converting 6 PDFs to images
- Loss of text searchability in PDFs

**How to do it:**
1. Convert each PDF to JPG/PNG using a tool
2. Update file references in `data.js`
3. Keep PDFs as backup in separate folder

---

### Option 2: Fix the Timeline Code to Support PDFs
**Pros:**
- PDFs display properly
- Maintains original file format
- Text remains searchable

**Cons:**
- Requires code changes in `index.html`
- Need to test browser compatibility

**Code Changes Needed:**

In `index.html`, modify the `showImageModal()` function (around line 2596):

```javascript
function showImageModal(imgData) {
  const imageModal = document.getElementById('image-modal');
  const imageModalContent = document.getElementById('image-modal-content');
  const imageModalTitle = document.getElementById('image-modal-title');
  const sidePanel = document.getElementById('side-panel');

  // Set title
  imageModalTitle.textContent = imgData.caption || 'Evidence Image';

  // Check if file is PDF
  const isPDF = imgData.file.toLowerCase().endsWith('.pdf');

  if (isPDF) {
    // Render PDF with embed tag
    imageModalContent.innerHTML = `
      <embed
        src="${imgData.file}"
        type="application/pdf"
        width="100%"
        height="800px"
        style="border: none;"
      />
      ${imgData.caption ? `<p class="evidence-caption">${imgData.caption}</p>` : ''}
      <p style="font-size: 12px; color: #666;">
        <a href="${imgData.file}" target="_blank">Open PDF in new tab</a>
      </p>
    `;
  } else {
    // Render image normally
    imageModalContent.innerHTML = `
      <img src="${imgData.file}" alt="${imgData.caption || 'Evidence'}" />
      ${imgData.caption ? `<p class="evidence-caption">${imgData.caption}</p>` : ''}
    `;
  }

  // Shift main panel to the left and show image modal
  sidePanel.classList.add('shifted');
  imageModal.classList.add('open');
}
```

---

### Option 3: Provide Download Links for PDFs
**Pros:**
- Simple code change
- Users can download and view in their PDF reader
- No rendering issues

**Cons:**
- Requires downloading file (extra step)
- Not as seamless as inline viewing

**Code Changes Needed:**

Modify how PDFs are displayed - show a download button instead of trying to render:

```javascript
if (isPDF) {
  imageModalContent.innerHTML = `
    <div style="text-align: center; padding: 40px;">
      <h3>PDF Document</h3>
      <p>${imgData.caption}</p>
      <a href="${imgData.file}" download class="pdf-download-btn">
        📄 Download PDF
      </a>
    </div>
  `;
}
```

---

## Recommendation

**For your timeline, I recommend Option 1 (Convert PDFs to Images)**

**Reasons:**
1. **Lawyer-friendly:** Images load instantly, no PDF reader issues
2. **Consistent UX:** All evidence displays the same way
3. **No code changes:** Less risk of breaking existing functionality
4. **Mobile-friendly:** Images work better on phones/tablets than PDFs

**Affected files to convert:**
- `Employment-Agreement-Dear-Rollins-Error.pdf` → JPG/PNG
- `Termination-Letter.pdf` → JPG/PNG
- `ROE-2025-Incorrect.pdf` → JPG/PNG
- `ROE-2025-Corrected.pdf` → JPG/PNG
- `Baby-Sept-2-2025-Viral-Cough.pdf` → JPG/PNG
- `Sleep-Apnea-Diagnosis-CPAP-Feb-18-2025.pdf` → JPG/PNG

---

## What I've Already Fixed

✅ **ADHD Disclosed Event** - Removed references to:
- `2024-01-15_doc_adhd-urine-test-2.jpg` (page 2 - removed per your request)
- `ADHD-Medication-Note-Jan-2024.pdf` (not displaying, info moved to caption)

Now shows only:
- `2024-01-15_doc_adhd-urine-test-1.jpg` (page 1 only, with enhanced caption)

---

## Next Steps

**Choose one:**

1. **Do nothing** - Accept that PDFs won't display (click them = blank/broken)
2. **Convert PDFs to images** - I can help update the references after you convert
3. **Fix the code** - I can implement Option 2 code changes now

Let me know which approach you prefer!

---

Last Updated: 2025-11-12
Status: ADHD event fixed, other PDFs still may not display
