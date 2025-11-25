# Timeline Codebase Exploration Report

**Date:** November 20, 2025
**Purpose:** Understand architecture for implementing lateness subfilters and multiday event support

---

## 1. Event Data Structure

### Location
- **File:** `/media/jonathanco/Backup/s3s/timeline/js/data.js`
- **Format:** JavaScript array exported as `timelineEvents`
- **Size:** 2019 lines, containing full timeline dataset

### Event Object Schema

```javascript
{
  id: 76,                              // Unique identifier (integer)
  timestamp: '2024-10-15',             // Start date (YYYY-MM-DD format)
  text: 'Event Title',                 // Short display title
  category: 'family',                  // Category for color coding
  type: 'range',                       // 'point' or 'range'
  endDate: '2025-07-20',              // End date (null for point events)
  tags: ['critical', 'smoking-gun', 'family', 'wrongful-dismissal'],
  description: 'Detailed description...', // Full text description
  evidence: ['List of evidence items'],
  evidenceImages: [                   // Optional evidence images
    {
      type: 'doc',
      file: 'path/to/image.jpg',
      caption: 'Image description'
    }
  ],
  witnesses: ['List of witnesses'],
  legalSignificance: 'Legal analysis...',
  priority: 'critical',               // 'critical', 'high', 'medium', 'low'
  icon: '👨‍👩‍👧'                         // Optional emoji icon
}
```

### Key Properties

**Categories (determine color):**
- `family` - Red (#e74c3c)
- `ohs` - Orange (#e67e22)
- `disability` - Yellow (#f39c12)
- `termination` - Blue (#3498db)
- `competence` - Gray (#95a5a6)
- `correspondence-danielle` - Green (#27ae60)
- `correspondence-carol` - Purple (#9b59b6)
- `correspondence-michelle` - Pink (#e91e63)

**Event Types:**
- `point` - Single-day event (appears as card on timeline)
- `range` - Multi-day event (appears as horizontal bar spanning dates)

**Tags System:**
- Used for filtering views (`family`, `ohs`, `wrongful-dismissal`, etc.)
- Used for lateness subfiltering (`lateness-employee`, `lateness-boss`, `lateness-coworker`)
- Special tags: `critical`, `smoking-gun`, `correspondence`

---

## 2. Filtering and View System

### View Buttons

**Location:** `/media/jonathanco/Backup/s3s/timeline/index.html` (lines 996-1004)

```html
<button class="view-btn active" data-view="overview">Overview</button>
<button class="view-btn" data-view="all">All Events</button>
<button class="view-btn" data-view="family">Human Rights</button>
<button class="view-btn" data-view="disability">Disability</button>
<button class="view-btn" data-view="ohs">OHS Retaliation</button>
<button class="view-btn" data-view="wrongful-dismissal">Wrongful Dismissal</button>
<button class="view-btn" data-view="correspondence">Correspondence</button>
<button class="view-btn" data-view="smoking-gun">Smoking Gun</button>
```

### Lateness Subfilters (ALREADY IMPLEMENTED!)

**Location:** `/media/jonathanco/Backup/s3s/timeline/index.html` (lines 1007-1011)

```html
<div class="lateness-subfilters" id="lateness-subfilters">
  <span class="lateness-label">Lateness:</span>
  <button class="lateness-btn" data-person="employee" title="Employee Lateness">Employee</button>
  <button class="lateness-btn" data-person="boss-coworker" title="Boss/Coworker Lateness">Boss/Coworker</button>
</div>
```

**Current Implementation Status:**
- UI controls exist with proper styling (blue for employee, orange for boss/coworker)
- JavaScript handlers are implemented (`setupLatenessButtons()`)
- Active state management using `Set` (`activeLatenessFilters`)
- Shows/hides based on current view (only visible in Human Rights view)

### Filter Logic

**Function:** `getFilteredEvents()` (lines ~1430-1508)

**How it works:**

1. **Overview View:** Uses hardcoded array of event IDs (curated list)
2. **Human Rights View:**
   - If NO lateness filters active: Shows curated human rights timeline
   - If lateness filters active: Shows ONLY matching lateness events (EXCLUSIVE mode)
3. **Other Views:** Filter by tags (`e.tags.includes('view-name')`)

**Lateness Filtering (lines 1478-1489):**
```javascript
if (activeLatenessFilters.has('employee') && e.tags.includes('lateness-employee')) return true;
if (activeLatenessFilters.has('boss-coworker') &&
    (e.tags.includes('lateness-boss') || e.tags.includes('lateness-coworker'))) return true;
```

### State Management

**Global Variables:**
- `currentView` - Active view name (string)
- `activeLatenessFilters` - Set of active person filters
- `allFilteredEvents` - Cached filtered events array

**Event Flow:**
1. User clicks view button → `setupViewButtons()` handler
2. Update `currentView`, show/hide lateness subfilters
3. Call `getFilteredEvents()` to filter events
4. Call `renderTimeline()` to redraw
5. Update minimap and event count

---

## 3. Color Coding System

### Category Colors

**Definition:** Lines 1103-1112

```javascript
const categoryColors = {
  family: '#e74c3c',                    // Red
  ohs: '#e67e22',                       // Orange
  disability: '#f39c12',                // Yellow
  termination: '#3498db',               // Blue
  competence: '#95a5a6',                // Gray
  'correspondence-danielle': '#27ae60', // Green
  'correspondence-carol': '#9b59b6',    // Purple
  'correspondence-michelle': '#e91e63'  // Pink
};
```

### How Colors Are Applied

**Event Cards (lines 2503-2548):**
1. Card container gets class: `category-${event.category}`
2. Date heading gets inline color: `categoryColors[event.category]`
3. Connector lines use category color on hover

**Timeline Dots (line 2650):**
```javascript
.attr('fill', categoryColors[event.category])
```

**Range Bars:**
Uses separate color palette for visual variety:
```javascript
const rangeBarColors = [
  '#5DADE2',  // Sky Blue
  '#48C9B0',  // Teal/Aqua
  '#E67E22',  // Orange
  '#9B59B6'   // Purple
];
```

### CSS Tag Classes

**Lines 394-395:**
```css
.tag-lateness-employee { background: #6b7280; }
.tag-lateness-boss { background: #4b5563; }
```

---

## 4. Event Rendering Architecture

### Main Rendering Function

**Function:** `renderTimeline(allEvents)` (starts around line 1605)

**Flow:**
1. Clear existing SVG and card containers
2. Separate events into point events and range events
3. Calculate viewport (pagination for large datasets)
4. Render range bars (multiday events)
5. Render timeline axis and dots
6. Run placement algorithm for cards
7. Draw connector lines (straight or L-shaped)

### Point Events (Cards)

**Rendering (lines 2503-2599):**
1. Create `<div>` with class `event-card`
2. Add date, title, description
3. Position based on placement algorithm result
4. Add click handler to show side panel
5. Add hover effects for highlighting

**Placement Algorithm:**
- Constraint-based recursive placement
- Redistribution-aware for zero L-connectors
- 6 tier system (above1/2/3, below1/2/3)
- Details in `/media/jonathanco/Backup/s3s/timeline/PLACEMENT-ARCHITECTURE.md`

### Range Events (Multiday Bars)

**Rendering (lines 2393+):**
1. Calculate start/end X positions on timeline
2. Draw horizontal `<rect>` spanning the date range
3. Position at timeline Y coordinate
4. Use `rangeBarColors` array (cycling through colors)
5. Add hover tooltip showing date range

**Key Code:**
```javascript
const pointEvents = viewportEvents.filter(e => e.type !== 'range');
const rangeEvents = viewportEvents.filter(e => e.type === 'range');
```

---

## 5. Multiday Event Support

### Current Implementation

**Status:** FULLY IMPLEMENTED

**How it works:**
1. Events with `type: 'range'` and `endDate` property are treated as multiday
2. Rendered as horizontal bars on the timeline
3. Appear on all paginated viewports they overlap
4. Separate from point events in rendering pipeline

### Example Multiday Events

**9-Month Accommodation (id: 76):**
```javascript
{
  id: 76,
  timestamp: '2024-10-15',
  text: '9-MONTH ACCOMMODATION: "Being Late is Okay"',
  category: 'family',
  type: 'range',
  endDate: '2025-07-20',
  tags: ['critical', 'smoking-gun', 'family', 'wrongful-dismissal'],
  // ... rest of properties
}
```

**Overtime Marathon (id: 21):**
```javascript
{
  id: 21,
  timestamp: '2025-07-14',
  text: 'OVERTIME MARATHON: 18 Consecutive Days',
  category: 'family',
  type: 'range',
  endDate: '2025-07-31',
  tags: ['critical', 'family', 'ohs', 'wrongful-dismissal'],
  // ... rest of properties
}
```

### Viewport Handling

**Pagination Logic (lines 1142-1147):**
```javascript
let singleDayEvents = [];  // Single-day events (used for pagination)
let multiDayEvents = [];   // Multi-day events (appear on all overlapping pages)
```

Multiday events are checked against viewport date range and included if they overlap:
```javascript
const overlappingMultiDay = multiDayEvents.filter(e => {
  // Check if event overlaps current viewport
});
```

---

## 6. UI Controls and Interactions

### Theme Toggle

**Button:** Lines 991-992
```html
<button id="theme-toggle" class="theme-toggle">
  <span id="theme-icon">☀️</span>
</button>
```

**Functionality:**
- Toggle between light/dark mode
- Persists to localStorage
- Uses CSS variables for theming (`--bg-primary`, `--text-primary`, etc.)

### Minimap

**Container:** Lines 984-986
```html
<div class="mini-map-container" id="mini-map-container">
  <div class="mini-map-timeline" id="mini-map-timeline">
```

**Features:**
- Shows full timeline overview at bottom
- Draggable viewport indicator
- Click to jump to date range
- Updates when view changes

### Side Panel

**Container:** Lines 1029-1038
```html
<div class="side-panel" id="side-panel">
  <div class="panel-header">
    <div class="panel-title" id="panel-title"></div>
    <div class="panel-date-row">
      <div class="panel-date" id="panel-date"></div>
      <div class="panel-category" id="panel-category"></div>
    </div>
  </div>
  <div class="panel-content" id="panel-content"></div>
</div>
```

**Triggered by:** Clicking event card
**Shows:** Full event details, evidence, witnesses, legal significance

---

## 7. Lateness Event Data

### Employee Lateness Events

**Tag:** `lateness-employee`

**Sample Events:**
- id: 10 - Apr 30 lateness
- id: 11 - May 23 lateness (GPS proof)
- id: 12 - May 29 lateness
- id: 13 - June 12 lateness
- id: 30 - Oct 10 lateness (return from parental leave - SMOKING GUN)

**Count:** ~8-10 events tagged

### Boss/Coworker Lateness Events

**Tags:** `lateness-boss`, `lateness-coworker`

**Sample Events:**
- id: 38-43 - Boss missing meetings (May-Aug)
- id: 45 - RJ late on termination day (CRITICAL COMPARATOR)
- id: 67 - Boss lateness pattern (range event)

**Count:** ~10-12 events tagged

### Current Color Scheme

**Employee button:** Blue gradient (#3498db → #2980b9)
**Boss/Coworker button:** Orange gradient (#e67e22 → #d35400)

**Active state:** Bright border, glow effect
**Inactive state:** 50% opacity, 50% grayscale

---

## 8. Existing Patterns to Follow

### Adding New Event Properties

1. Add to data.js event object
2. Access in rendering functions
3. Consider whether it affects filtering
4. Update side panel display if needed

### Adding New Filters

1. Add UI button to controls section
2. Create setup function (like `setupLatenessButtons()`)
3. Add filtering logic to `getFilteredEvents()`
4. Call `renderTimeline()` after state change

### Adding New Tags

1. Add tag string to event's `tags` array
2. Use in filter logic: `e.tags.includes('new-tag')`
3. Consider CSS class if visual styling needed

### View-Specific Subfilters Pattern

1. Create container div (like `lateness-subfilters`)
2. Add `visible` class toggle based on parent view
3. Reset subfilter state when leaving parent view
4. Modify parent view's filter logic to check subfilter state

---

## 9. Key Files Reference

| File | Purpose | Size |
|------|---------|------|
| `/media/jonathanco/Backup/s3s/timeline/js/data.js` | Event data array | 2019 lines |
| `/media/jonathanco/Backup/s3s/timeline/index.html` | Main timeline app | 3201 lines |
| `/media/jonathanco/Backup/s3s/timeline/PLACEMENT-ARCHITECTURE.md` | Algorithm docs | Documentation |

---

## 10. Implementation Notes

### Lateness Subfilter Feature

**Current Status:** ALREADY IMPLEMENTED AND WORKING

**What exists:**
- UI controls with proper styling
- JavaScript event handlers
- Filter logic for employee vs boss/coworker
- Show/hide based on Human Rights view
- Active state management

**What may need enhancement:**
- Additional lateness event tagging in data.js
- Refinement of which events appear in each subfilter
- Consider if exclusive mode (only lateness) is desired behavior

### Multiday Events

**Current Status:** FULLY SUPPORTED

**Implementation complete for:**
- Range bars spanning multiple dates
- Proper viewport pagination handling
- Visual distinction from point events
- Tooltip hover showing date range
- Integration with filtering system

**Examples in use:**
- 9-month accommodation period (Oct 2024 - July 2025)
- Overtime marathon (July 14-31, 2025)
- Parental leave period (Sept 4 - Oct 9, 2025)
- Boss lateness pattern (range event)

---

## 11. Architecture Highlights

### Constraint-Based Placement

**Algorithm Type:** Recursive with dynamic redistribution
**Goal:** Zero L-connectors through intelligent card positioning
**Complexity:** O(n × t × m) where n=cards, t=tiers, m=cards/tier

**Key Features:**
- Density analysis to determine placement direction
- Edge anchoring for stability
- Redistribution of existing cards to make room
- Flex zones (±112px) for natural positioning
- Zigzag tier preference for visual balance

### Virtual Scrolling (Pagination)

**Purpose:** Handle large datasets efficiently
**Method:** Event-based viewport (10-12 events per page)
**Benefits:** Consistent card density, reduced DOM size

**How it works:**
1. Split events into viewport chunks
2. Render only current viewport
3. Minimap shows full timeline
4. Drag/click to navigate

### Performance Optimizations

- Date parsing done once at initialization
- Cached filtered events array
- Incremental rendering (separate point/range)
- Event delegation for hover/click handlers
- CSS transforms for smooth animations

---

## 12. Recommendations for Enhancement

### If Adding More Subfilters

1. Follow lateness subfilter pattern
2. Use data-attributes for button configuration
3. Maintain Set-based state management
4. Clear state when leaving parent view
5. Consider INCLUSIVE vs EXCLUSIVE filter modes

### If Adding Visual Indicators

1. Use CSS variables for theme compatibility
2. Follow existing color palette patterns
3. Consider dark mode appearance
4. Use gradients for depth (see lateness buttons)
5. Add hover/active states for interactivity

### If Modifying Placement Algorithm

1. Read PLACEMENT-ARCHITECTURE.md first
2. Test with "all events" view (most complex)
3. Check console logs for redistribution behavior
4. Verify zero L-connectors maintained
5. Test across multiple views/filters

---

## Summary

The timeline codebase is well-architected with:
- **Complete lateness subfilter support** (already implemented)
- **Full multiday event handling** (range bars working)
- **Flexible filtering system** (tag-based with view logic)
- **Sophisticated placement algorithm** (zero L-connectors)
- **Responsive UI** (theme toggle, minimap, pagination)

**Key insight:** Most requested features are ALREADY IMPLEMENTED. Any work would involve:
1. Data enhancement (adding more lateness tags to events)
2. UI refinement (tweaking subfilter behavior)
3. Testing/validation (ensuring correct events appear)

The codebase follows consistent patterns making it straightforward to extend functionality while maintaining the existing architecture.
