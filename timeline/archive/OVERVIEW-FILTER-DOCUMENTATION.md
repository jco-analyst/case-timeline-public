# Overview Filter Documentation

## Purpose
The **Overview** filter provides a comprehensive, lawyer-ready view of the wrongful dismissal case, following the **Convergence Timeline** structure from the legal analysis framework.

## Filter Location
- **Position**: First button in the filter list (most prominent)
- **Button Label**: "Overview"
- **Data View**: `data-view="overview"`

## Event Count
**48 events** organized across 5 categories covering all 3 convergence tracks

## Event Breakdown by Category

### TRACK 1: Protected Grounds & Accommodation (7 events)
Foundation events establishing protected characteristics:
- Event 71: First Interview - Family Priority Disclosed
- Event 1: Hired as Electrical Technician
- Event 2: ADHD Disclosed (Pre-Employment)
- Event 6: Baby Born
- Event 76: Accommodation Agreement (flexible schedule)
- Event 9: Sleep Apnea Diagnosed (Feb 2025)
- Event 72: Parental Leave Request

### TRACK 2: Protected Activities & Reprisals (12 events)
Events showing protected activities and employer retaliation:
- Event 3: Hydraulic Troubleshooting Victory (OHS advocacy origin)
- Event 5: Confined Space Safety Meeting - Sent Home
- Event 8: Hydraulic Lines Write-Up - Safety Research Punished
- Event 15: June 13 - Boss Approved Sick Child (later disciplined)
- Event 17: June 25 - Good Faith Over-Communication
- Event 21: July 14-31 - OVERTIME MARATHON (18 consecutive days)
- Event 22: July 21 - Accommodation Revoked (SG #1)
- Event 24: "Last Chance" meeting
- Event 28: Aug 28 - Sick Baby Denial
- Event 73: Michelle Sherman "Everyone has children" (SG #2)
- Event 74: Parental Leave Period (range)
- Event 30: Sept 7 - "Urgent" Email (SG #3)

### TRACK 3: Pretextual Discipline & Bad Faith (12 events)
Events showing manufactured progressive discipline:
- Event 4: Write-Up #2 (First Timecard)
- Event 78: Boss's Field Hand Wage Theft Story
- Event 26: Headphones incident (leads to Write-Up #1)
- Event 64: Write-Up #1 Document (OHS Retaliation)
- Event 27: Write-Up #3 events
- Event 31: Oct 10 - Return from Leave (SG #4)
- Event 65: Write-Up #4 Document
- Event 33: Oct 20 - Accommodation Request Denied
- Event 34: Oct 21 - Employee Backs Down
- Event 66: Timecard Unlock Catch-22 (SG #7)
- Event 35: Oct 22 - Termination (SG #5)
- Event 79: Oct 22 - Email Access Revoked

### SMOKING GUNS & COMPARATORS (11 events)
Differential treatment and damning evidence:
- Event 37: Timecard unlock manipulation
- Event 38-43: Boss lateness/missing meetings (6 events)
- Event 67: Boss Lateness Pattern (range)
- Event 45: RJ Late Same Day as Termination
- Event 59: Jessica Differential Treatment (sick note)
- Event 75: Boss Timecard Struggles

### POST-TERMINATION BAD FAITH (6 events)
Evidence of ongoing bad faith after termination:
- Event 50: Oct 30 - Wrong Documents Sent
- Event 51: Nov 4 - "Dear Rollins:" Contract Error (SG #6)
- Event 52: Nov 4 - Corrected Documents
- Event 60: Michelle Sherman ROE Request
- Event 61: ROE Released (14-day delay)
- Event 70: Wrong Bank Account

## Technical Features

### Enhanced Rendering
The Overview filter uses the same enhanced features as the "All Events" view:
- **Height**: 1400px (taller canvas for better card placement)
- **Tier System**: Uses all 6 tiers (above1-3, below1-3) for optimal event distribution
- **Navigation**: Shows mini-map and arrow navigation for easier browsing
- **Pagination**: Events divided into pages for better performance

### Filter Logic
Located in `index.html` at line ~1358:
```javascript
} else if (currentView === 'overview') {
  const overviewEventIds = [71, 1, 2, 6, ... ];
  events = events.filter(e => overviewEventIds.includes(e.id));
}
```

## Legal Framework Alignment

This filter directly implements the **Convergence Timeline** structure from the legal analysis:

### Three-Track Narrative
1. **Track 1**: Protected Grounds & Accommodation (The Motive)
   - Shows employer knew about family status, ADHD, sleep apnea from day one
   - Documents accommodation agreement and parental leave

2. **Track 2**: Protected Activities & Reprisals (The Triggers)
   - Links each protected activity to immediate employer retaliation
   - Shows pattern: advocacy → punishment

3. **Track 3**: Pretextual Discipline & Bad Faith (The Execution)
   - Demonstrates manufactured progressive discipline
   - Proves termination was premeditated, not performance-based

### Smoking Guns Included
All major smoking guns are represented:
- **SG #1**: Accommodation revoked (Event 22)
- **SG #2**: "Everyone has children" (Event 73)
- **SG #3**: "Urgent" email during parental leave (Event 30)
- **SG #4**: Write-up on return from leave (Event 31/65)
- **SG #5**: Termination (Event 35)
- **SG #6**: "Dear Rollins:" contract error (Event 51)
- **SG #7**: Timecard Unlock Catch-22 (Event 66)

### Settlement Range Support
Events support the $50k-$75k settlement range by showing:
- Multiple human rights violations (family status + disability + parental leave retaliation)
- Bad faith manner of dismissal (aggravated damages)
- Post-termination obstruction (ROE delay, document tampering)
- Differential treatment (perfect comparators)

## Usage

### For Lawyer Consultation
This filter provides everything a lawyer needs to see in ~10 minutes:
- Complete case narrative from hiring through post-termination
- All protected grounds and employer knowledge
- Pattern of retaliation and pretextual discipline
- Strongest evidence (smoking guns and comparators)
- Bad faith conduct supporting enhanced damages

### Recommended Presentation Order
1. Click "Overview" button
2. Review events chronologically using navigation arrows
3. Click individual events for detailed evidence and legal significance
4. Use side panel to view supporting documentation
5. Note causal links between events (highlighted connectors)

## Maintenance

### Adding New Events to Overview
To add an event to the Overview filter:
1. Determine which track it belongs to (1, 2, or 3)
2. Add the event ID to the appropriate section in `overviewEventIds` array
3. Include a comment explaining why it's in the overview
4. Update this documentation

### Removing Events
Only remove events if:
- They become legally irrelevant (e.g., superseded by stronger evidence)
- They duplicate stronger evidence already in the filter
- Legal strategy changes significantly

## Testing

### Verification Checklist
- ✓ Overview button appears first in filter list
- ✓ Filter displays exactly 48 events
- ✓ Events span full timeline (Jan 2024 - Nov 2025)
- ✓ All 3 convergence tracks represented
- ✓ All major smoking guns included
- ✓ Navigation and mini-map functional
- ✓ Tier 3 enabled for proper card placement
- ✓ All events have legal significance documented

### Visual Test
```bash
cd /media/jonathanco/Backup/s3s/timeline
python3 -m http.server 8888
# Navigate to http://localhost:8888
# Click "Overview" button
# Verify: event count shows "48 events"
# Verify: timeline renders without errors
# Verify: all events clickable with side panel details
```

## Version History
- **v1.0** (Nov 20, 2025): Initial implementation
  - 48 events across 5 categories
  - Full convergence timeline coverage
  - Enhanced rendering with Tier 3 and navigation
  - First position in filter list

---

**Last Updated**: November 20, 2025
**Implementation**: `/media/jonathanco/Backup/s3s/timeline/index.html`
**Based on**: Legal Analysis Framework (PART I & II convergence timeline structure)
