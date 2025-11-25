# Timeline Implementation Quick Reference

**Last Updated:** November 20, 2025

Quick lookup for common timeline modifications.

---

## Event Data Structure (data.js)

### Minimal Event
```javascript
{
  id: 100,                          // Unique number
  timestamp: '2025-11-20',          // YYYY-MM-DD
  text: 'Event Title',              // Short title
  category: 'family',               // See categories below
  type: 'point',                    // 'point' or 'range'
  endDate: null,                    // For range events only
  tags: ['family', 'wrongful-dismissal'],
  description: 'Full description',
  evidence: ['List of evidence'],
  witnesses: ['List of witnesses'],
  legalSignificance: 'Analysis',
  priority: 'medium',               // critical/high/medium/low
}
```

### Categories & Colors
```javascript
family      → Red      (#e74c3c)
ohs         → Orange   (#e67e22)
disability  → Yellow   (#f39c12)
termination → Blue     (#3498db)
competence  → Gray     (#95a5a6)
correspondence-danielle → Green  (#27ae60)
correspondence-carol    → Purple (#9b59b6)
correspondence-michelle → Pink   (#e91e63)
```

### Multiday Event
```javascript
{
  type: 'range',
  endDate: '2025-12-31',  // End date (not null)
  // ... other properties
}
```

### Lateness Tags
```javascript
tags: ['lateness-employee']           // Employee lateness
tags: ['lateness-boss']               // Boss lateness
tags: ['lateness-coworker']           // Coworker lateness
```

---

## Filter System (index.html)

### View Buttons
**HTML Location:** Lines 996-1004

```html
<button class="view-btn" data-view="view-name">Display Name</button>
```

### Adding New View

**1. Add button HTML:**
```html
<button class="view-btn" data-view="new-view">New View</button>
```

**2. Add filter logic to `getFilteredEvents()`:**
```javascript
else if (currentView === 'new-view') {
  events = events.filter(e => e.tags && e.tags.includes('new-view'));
}
```

### Lateness Subfilters

**HTML Location:** Lines 1007-1011 (already exists)

**Button structure:**
```html
<button class="lateness-btn" data-person="person-type">Label</button>
```

**Filter logic:**
```javascript
if (activeLatenessFilters.has('employee') && e.tags.includes('lateness-employee')) return true;
```

---

## Color Coding

### Category Color Definition
**Location:** Lines 1103-1112

```javascript
const categoryColors = {
  'category-name': '#hexcolor'
};
```

### Applying Colors

**Card date:**
```javascript
.style('color', categoryColors[event.category])
```

**Timeline dot:**
```javascript
.attr('fill', categoryColors[event.category])
```

**Connector line:**
```javascript
.attr('stroke', categoryColors[event.category])
```

---

## Rendering Flow

### Main Function
```javascript
renderTimeline(allFilteredEvents)
```

### Key Steps
1. Clear existing SVG/containers
2. Separate point vs range events
3. Calculate viewport (pagination)
4. Render range bars
5. Render timeline axis
6. Run placement algorithm
7. Draw cards and connectors

### Force Re-render
```javascript
allFilteredEvents = getFilteredEvents();
renderTimeline(allFilteredEvents);
updateEventCount();
renderMiniMap();
```

---

## Common Tasks

### Add New Event
1. Open `js/data.js`
2. Add event object to `timelineEvents` array
3. Assign unique `id`
4. Set `category` for color
5. Add appropriate `tags` for filtering
6. Save and reload page

### Add New Tag
1. Add tag string to event's `tags` array
2. Use in filter: `e.tags.includes('tag-name')`
3. Optional: Add CSS class if needed

### Modify Lateness Filters
1. Ensure events have correct tags
2. Modify filter logic in `getFilteredEvents()`
3. Test in Human Rights view

### Create View-Specific Subfilter
```javascript
// Show/hide based on view
if (currentView === 'target-view') {
  subfilterDiv.classList.add('visible');
} else {
  subfilterDiv.classList.remove('visible');
}
```

### Add New Category
1. Add to `categoryColors` object
2. Add to `categoryLabels` object
3. Use in event's `category` property

---

## Testing Commands

### Check Console Logs
```bash
cd /media/jonathanco/Backup/s3s/timeline
./test-console.sh
```

### Visual Check
Open `index.html` in browser, check:
- [ ] All views work
- [ ] Subfilters toggle correctly
- [ ] Cards render properly
- [ ] No L-connectors (straight lines only)
- [ ] Multiday bars span correctly
- [ ] Minimap updates

---

## State Variables

```javascript
currentView              // 'overview', 'family', etc.
activeLatenessFilters    // Set(['employee', 'boss-coworker'])
allFilteredEvents        // Current filtered events array
currentViewportIndex     // Pagination index
```

---

## CSS Classes

### Event Cards
```css
.event-card                    /* Base card style */
.category-family               /* Category-specific style */
.event-card.highlight          /* Hover/click highlight */
```

### Lateness Buttons
```css
.lateness-btn                  /* Base button */
.lateness-btn.active           /* Active state */
.lateness-btn[data-person="employee"]   /* Employee-specific */
```

### View Buttons
```css
.view-btn                      /* Base button */
.view-btn.active               /* Active view */
```

---

## File Paths

```
/media/jonathanco/Backup/s3s/timeline/
├── index.html                 # Main app (3201 lines)
├── js/
│   └── data.js               # Event data (2019 lines)
├── PLACEMENT-ARCHITECTURE.md  # Algorithm docs
└── CODEBASE-EXPLORATION-REPORT.md  # Full analysis
```

---

## Key Functions

| Function | Purpose | Location |
|----------|---------|----------|
| `init()` | Initialize timeline | ~1180 |
| `getFilteredEvents()` | Filter by view/tags | ~1430 |
| `setupViewButtons()` | View button handlers | ~1511 |
| `setupLatenessButtons()` | Lateness handlers | ~1543 |
| `renderTimeline()` | Main render function | ~1605 |
| `placeCardRecursive()` | Card placement | ~2193 |

---

## Debug Tips

### Enable Console Logging
Already enabled - check browser console for:
- Filter operation counts
- Placement algorithm steps
- Card position calculations
- Redistribution attempts

### Common Issues

**Events not appearing:**
- Check tags match filter logic
- Verify event ID is unique
- Confirm date format (YYYY-MM-DD)

**Wrong colors:**
- Check category spelling
- Verify category in `categoryColors`
- Check CSS class names

**Lateness filters not working:**
- Ensure tags are `lateness-employee`, `lateness-boss`, or `lateness-coworker`
- Check Human Rights view is active
- Verify `activeLatenessFilters` Set contains correct values

---

## Quick Wins

### Most Needed Enhancements

1. **Tag more lateness events** - Add `lateness-*` tags to events in data.js
2. **Test subfilter behavior** - Verify correct events appear
3. **Refine curated lists** - Update event ID arrays in filter logic
4. **Add documentation** - Event descriptions, legal significance

### Zero-Code Improvements

1. Review event data for consistency
2. Test all view combinations
3. Verify evidence paths are correct
4. Check witness lists are complete

---

## Pattern Examples

### Curated Event List (Overview View)
```javascript
const overviewEventIds = [
  71, 1, 2, 3, 4, 5,  // List of event IDs
  // ...
];
events = events.filter(e => overviewEventIds.includes(e.id));
```

### Tag-Based Filter
```javascript
events = events.filter(e => e.tags && e.tags.includes('tag-name'));
```

### Conditional Subfilter
```javascript
if (activeLatenessFilters.size === 0) {
  // Show main view events
} else {
  // Show only subfiltered events
}
```

---

## Performance Notes

- Event date parsing done once at init
- Filtered events cached in `allFilteredEvents`
- Viewport pagination limits DOM size
- Placement algorithm ~120 logs for 12 cards

---

## Next Steps Checklist

- [ ] Review all events in data.js
- [ ] Verify lateness tags are complete
- [ ] Test each view and subfilter
- [ ] Check multiday events render correctly
- [ ] Validate color scheme consistency
- [ ] Test theme toggle (light/dark)
- [ ] Verify evidence paths work
- [ ] Check witness lists are accurate
- [ ] Test pagination/minimap
- [ ] Run console test suite

---

**For detailed architecture info, see:** CODEBASE-EXPLORATION-REPORT.md
**For placement algorithm details, see:** PLACEMENT-ARCHITECTURE.md
