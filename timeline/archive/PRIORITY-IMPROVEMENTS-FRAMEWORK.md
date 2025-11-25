# PRIORITY IMPROVEMENTS FRAMEWORK - SYSTEMATIC IMPLEMENTATION GUIDE
**Created:** November 21, 2025
**Purpose:** Complete framework for implementing 4 priority timeline improvements after context clear
**Estimated Total Time:** 80 minutes
**Status:** Ready for systematic execution

---

## OVERVIEW: THE 4 PRIORITY IMPROVEMENTS

| # | Task | Time | Value | Files Modified |
|---|------|------|-------|----------------|
| 1 | Add witnesses to 8 key events | 30 min | HIGH | timeline/js/data.js |
| 2 | Add evidence file references to 12 key events | 20 min | HIGH | timeline/js/data.js |
| 3 | Reduce Overview filter from 46→20 events | 15 min | MEDIUM | timeline/js/data.js |
| 4 | Update CASE-REFERENCE.md with filter navigation | 15 min | MEDIUM | CASE-REFERENCE.md |

**Dependencies:** None - all tasks can be done independently in any order

**Backup Strategy:** Before starting, create backup:
```bash
cp timeline/js/data.js timeline/js/data.js.backup-priority-improvements-$(date +%Y%m%d-%H%M%S)
```

---

## PREREQUISITE INFORMATION NEEDED FROM USER

### BEFORE STARTING, ASK USER THESE QUESTIONS:

**Question 1: Witness Availability**
"I need to confirm witness information for 8 events. For each witness listed below, please confirm:
- Is this person's name correct?
- Are they willing/available to provide a statement if needed?
- Should I note any concerns about their testimony?"

**Witness List to Confirm:**
1. **RJ** (coworker) - Witnessed: Confined space meeting, Epoxy injury (was injured), Morning meeting (Jessica incident), Late same day as employee termination
2. **Ramon** (team lead) - Witnessed: Confined space meeting, Epoxy injury (was injured), Morning meeting (Jessica incident)
3. **Jessica** (coworker) - Witnessed: Confined space meeting, Received differential treatment (no sick note required)
4. **Sam** (wife) - Witnessed: Oct 22 phone died incident (can testify phone screen turned off at night, found dead in morning)
5. **VP** (employer VP) - Witnessed: Hydraulic troubleshooting (employee proven correct in front of VP)
6. **Hydraulic specialists** - Witnessed: Hydraulic troubleshooting (employee proven correct)
7. **Coworkers (general)** - Multiple witnessed boss lateness pattern, RJ late Oct 22

**Question 2: Evidence File Verification**
"I will reference evidence files in the timeline. Please verify the evidence/ folder structure is still:
- evidence/01-CRITICAL-EVIDENCE/
- evidence/02-FAMILY-STATUS-DISCRIMINATION/
- evidence/03-DISABILITY-DISCRIMINATION/
- evidence/11-OFFICIAL-DOCUMENTS/
(etc. - list continues)

Are there any NEW evidence files added since Nov 21 that I should reference?"

**Question 3: CASE-REFERENCE.md Location**
"Where is CASE-REFERENCE.md located? Is it:
- /media/jonathanco/Backup/s3s/CASE-REFERENCE.md
- Or different location?"

---

## TASK 1: ADD WITNESSES TO 8 KEY EVENTS

### Estimated Time: 30 minutes

### Format Template

**FOR EACH EVENT, APPEND THIS TO EXISTING DESCRIPTION:**
```
\n\nWitnesses: [Name 1] ([what they witnessed]), [Name 2] ([what they witnessed])
Available: [Yes/No/Unknown]
Corroboration: [1 sentence explaining significance of corroboration]
```

### Implementation Instructions

**Step 1:** Read timeline/js/data.js to locate each event by date and title

**Step 2:** For each event below, append witness information to description field

**Step 3:** Preserve all existing tags, cross-references, and other properties

---

### EVENT 1: Oct 17, 2025 - Jessica Sick Note Differential Treatment

**Search criteria:**
- Date: 2025-10-17 (approximate, may be unlabeled date)
- Title contains: "Jessica" or "Sick Note" or "Differential Treatment"
- Tags include: `just-cause-failure`

**Current description ends with:** Something about Jessica not required to provide sick note

**APPEND:**
```
\n\nWitnesses: RJ (morning meeting attendee), Ramon (team lead, morning meeting attendee), Employee (witnessed entire exchange)
Available: RJ and Ramon - Yes, Jessica - Unknown (may fear retaliation)
Corroboration: Multiple witnesses present when boss told Jessica "go home if sick" with ZERO mention of sick note requirement. Same week boss demanded sick notes from employee (Oct 14, 16) = clear differential treatment.
```

---

### EVENT 2: Oct 22, 2025 - RJ Late SAME DAY as Employee Termination

**Search criteria:**
- Date: 2025-10-22
- Title contains: "RJ Late" or "RJ and Ramon Late"
- Tags include: `just-cause-failure`, `smoking-gun`

**Current description:** Something about RJ late same day without discipline

**APPEND:**
```
\n\nWitnesses: Multiple coworkers (saw RJ arrive late), Employee (witnessed RJ's arrival time)
Available: RJ - Yes (would likely cooperate, was not disciplined), Coworkers - Unknown
Corroboration: Multiple people witnessed RJ arrive late on the exact day employee was terminated for lateness. RJ received no discipline, no write-up, no termination. Proves differential treatment = just cause failure.
```

---

### EVENT 3: Oct 1, 2024 - Confined Space Safety Meeting - Sent Home

**Search criteria:**
- Date: 2024-10-01 (approximate)
- Title contains: "Confined Space" or "Safety Meeting" or "Sent Home"
- Tags include: `ohs`, `bad-faith-conduct`

**Current description:** Employee sent home for raising safety concerns

**APPEND:**
```
\n\nWitnesses: RJ (safety meeting attendee), Ramon (safety meeting attendee), Jessica (safety meeting attendee), Safety Manager (conducted meeting, sent employee home)
Available: RJ and Ramon - Yes, Jessica - Unknown, Safety Manager - Adverse witness (employer side)
Corroboration: Multiple attendees witnessed employee raise legitimate PPE concerns (full face mask for debris protection) and Safety Manager sending employee home for being "too passionate about safety." Employer later implemented confined space entry program (rescue team, rescue plan) = proves employee's concerns were valid.
```

---

### EVENT 4: July 20, 2025 (approx) - Epoxy Paint Tank Injury - 3 Workers

**Search criteria:**
- Date: 2025-07-20 (approximate)
- Title contains: "Epoxy" or "Tank Injury" or "3 Workers"
- Tags include: `ohs`, `smoking-gun`

**Current description:** 3 workers injured, no WCB report

**APPEND:**
```
\n\nWitnesses: Ramon (injured - burning eyes), RJ (injured - burning eyes), Employee (injured - burning eyes)
Available: Ramon - Yes, RJ - Yes, Employee - Yes (all three injured parties)
Corroboration: All three workers suffered same chemical eye injury (intense burning) from epoxy paint fumes in confined tank. Work completely stopped due to severity. NO WCB report filed despite multiple injuries = unreported workplace incident. July 22 - full face masks arrived within 1-2 days (employer procured EXACT PPE employee requested for over a year) = proves employee's safety advocacy was correct.
```

---

### EVENT 5: Spring/Summer 2024 - Hydraulic Troubleshooting Victory

**Search criteria:**
- Date: 2024-07-01 to 2024-07-07 (range or approximate)
- Title contains: "Hydraulic" or "Troubleshooting"
- Tags include: `ohs`, `critical`

**Current description:** Employee proven correct about hydraulic system in front of VP

**APPEND:**
```
\n\nWitnesses: VP (employer VP - personally came to site), Hydraulic specialists (called in by employer), Boss (admitted employee was correct by later buying suggested fittings), Employee
Available: VP - Adverse witness (employer side), Specialists - Unknown (third party), Boss - Adverse witness
Corroboration: VP personally witnessed employee's technical analysis proving boss wrong. Hydraulic specialists consulted, employee's diagnosis confirmed. Boss later purchased exact fittings employee suggested = objective vindication. Pattern: Employee correct → Boss ignored → Problem persisted → Employee proven right → No acknowledgment.
```

---

### EVENT 6: Oct 22, 2025 - Final Lateness - Phone Died

**Search criteria:**
- Date: 2025-10-22
- Title contains: "Phone Died" or "Final Lateness"
- Tags include: `disability-discrimination`, `just-cause-failure`

**Current description:** Employee's phone died overnight, alarm didn't go off

**APPEND:**
```
\n\nWitnesses: Sam (wife - witnessed phone screen briefly turn on night before, employee turned off screen at her request, phone found dead in morning)
Available: Sam - Yes (spouse, direct witness to phone incident)
Corroboration: Wife can testify: (1) Phone screen briefly turned on during night (light disturbed sleep), (2) Wife asked employee to turn off screen, (3) Employee complied, (4) Phone died completely overnight (unforeseeable), (5) No alarm went off. Proves lateness was one-time technical failure, NOT willful misconduct or pattern behavior. Different from childcare-related lateness pattern.
```

---

### EVENT 7: May 16, 2025 - Boss Missing Meeting (Differential Treatment Pattern)

**Search criteria:**
- Date: 2025-05-16
- Title contains: "Boss Missing" or "Boss Late"
- Tags include: `just-cause-failure`, `lateness-boss`

**Current description:** Boss missing meeting or late

**APPEND:**
```
\n\nWitnesses: Employee (witnessed boss absence/lateness), Coworkers present at meeting (TBD - ask user for names)
Available: Employee - Yes, Coworkers - Unknown
Corroboration: Multiple people expected boss at meeting, boss was absent/late. No explanation provided, no discipline issued, no write-up, no termination. Part of 6-instance pattern (May 16, 28, Jul 10, 22, 27, Aug 9) proving employer tolerates same behavior from supervisor without consequences.
```

**NOTE:** This same witness section should be added to all 6 boss lateness events (May 16, May 28, Jul 10, Jul 22, Jul 27, Aug 9) with dates adjusted.

---

### EVENT 8: Oct 15, 2024 - Write-Up #1: Hydraulic Headphones - OHS RETALIATION

**Search criteria:**
- Date: 2024-10-15
- Title contains: "Write-Up #1" or "Hydraulic Headphones" or "OHS RETALIATION"
- Tags include: `just-cause-failure`, `bad-faith-conduct`, `ohs`

**Current description:** Written warning for headphones during safety meeting after proving boss wrong

**APPEND:**
```
\n\nWitnesses: VP (witnessed technical disagreement during hydraulic project), Boss (party admission - verbally stated "you shouldn't have spoken to VP like that"), Employee
Available: VP - Adverse witness (employer side), Boss - Adverse witness (party admission)
Corroboration: Boss's own verbal statement admits real reason for discipline: "You shouldn't have spoken to the VP like that" (not about headphones). Proves pretextual OHS retaliation - employee proven correct about hydraulic fittings (boss later bought exact fittings suggested), then disciplined with pretextual "headphones" write-up. If first write-up invalid, entire progressive discipline chain collapses.
```

---

### Verification Steps After Adding Witnesses

**Run these checks:**
```bash
# Check JavaScript syntax
node -c timeline/js/data.js

# Search for "Witnesses:" to verify all 8 added
grep -c "Witnesses:" timeline/js/data.js
# Should return: 8 (or more if you add to all 6 boss lateness events = 11 total)

# Verify no duplicate "Witnesses:" sections (would indicate duplication)
grep -n "Witnesses:" timeline/js/data.js
```

---

## TASK 2: ADD EVIDENCE FILE REFERENCES TO 12 KEY EVENTS

### Estimated Time: 20 minutes

### Format Template

**FOR EACH EVENT, APPEND THIS TO EXISTING DESCRIPTION (after witnesses if present):**
```
\n\nEvidence:\n- [Type]: evidence/[folder]/[filename]\n- [Type]: evidence/[folder]/[filename]
```

### Evidence Folder Structure Reference

```
evidence/
├── 01-CRITICAL-EVIDENCE/           # Smoking guns
├── 02-FAMILY-STATUS-DISCRIMINATION/
│   ├── lateness-notifications/     # Text message screenshots
│   ├── gps-location-proof/         # GPS analysis PDFs
│   └── text-messages/              # Other text exchanges
├── 03-DISABILITY-DISCRIMINATION/   # Medical records
├── 04-PARENTAL-LEAVE-RETALIATION/  # ROE errors
├── 06-TERMINATION-INCIDENT/        # Termination letter, texts
├── 07-EMPLOYMENT-DOCUMENTS/        # Contract, policies
├── 09-EMAIL-CORRESPONDENCE/        # Carol Burke, Michelle Sherman emails
├── 11-OFFICIAL-DOCUMENTS/          # GPS analysis, EI confirmation
```

### Implementation Instructions

**Step 1:** For each event below, append evidence references to description

**Step 2:** Use RELATIVE paths from project root: `evidence/folder/file.ext`

**Step 3:** Keep format clean with bullet points

---

### EVENT 1: July 20, 2025 - "Family Doesn't Matter" Statement

**Search criteria:** Date 2025-07-20, title contains "Family Doesn't Matter"

**APPEND:**
```
\n\nEvidence:\n- Text message: evidence/01-CRITICAL-EVIDENCE/July-20-2025-Sunday-Overtime-Threat.jpg\n- GPS proof: evidence/02-FAMILY-STATUS-DISCRIMINATION/gps-location-proof/July-20-2025-6min-Late.jpg (proves working Sunday morning, Day 7 of marathon)
```

---

### EVENT 2: Aug 28, 2025 - Sick Baby Accommodation DENIED

**Search criteria:** Date 2025-08-28, title contains "Sick Baby"

**APPEND:**
```
\n\nEvidence:\n- Text message: evidence/02-FAMILY-STATUS-DISCRIMINATION/text-messages/Aug-28-2025-Sick-Baby-Request.jpg\n- Medical documentation: evidence/02-FAMILY-STATUS-DISCRIMINATION/medical-documentation/Baby-Sept-2-2025-Viral-Cough.pdf (confirms child was sick Aug 28-29)
```

---

### EVENT 3: June 25, 2025 - GPS Proves Arrived EARLY

**Search criteria:** Date 2025-06-25, title contains "Traffic" or "EARLY"

**APPEND:**
```
\n\nEvidence:\n- Text message: evidence/02-FAMILY-STATUS-DISCRIMINATION/lateness-notifications/Jun-25-2025-Traffic.jpg (employee warned about traffic)\n- GPS proof: evidence/11-OFFICIAL-DOCUMENTS/GPS-Analysis.pdf (page showing Jun 25 arrival 10 min EARLY)
```

---

### EVENT 4: Oct 10, 2025 - Return from Parental Leave + Write-Up #4 Same Day

**Search criteria:** Date 2025-10-10, title contains "Write-Up #4" or "Parental Leave"

**APPEND:**
```
\n\nEvidence:\n- Text messages: evidence/02-FAMILY-STATUS-DISCRIMINATION/lateness-notifications/ (Oct 10 morning lateness notification, 8+ hours advance notice)\n- GPS proof: evidence/02-FAMILY-STATUS-DISCRIMINATION/gps-location-proof/Oct-10-2025-8min-Late.jpg\n- Michelle urgent email: evidence/01-CRITICAL-EVIDENCE/Sept-07-2025-Michelle-Urgent-Email.png (Sept 7 "deadline Monday Sept 8" - proves 33-day delay)
```

---

### EVENT 5: Oct 22, 2025 - Final Lateness - Phone Died

**Search criteria:** Date 2025-10-22, title contains "Phone Died"

**APPEND:**
```
\n\nEvidence:\n- Text message: evidence/06-TERMINATION-INCIDENT/Oct-22-2025-Termination-Text.jpg (8:00 AM "my phone died during the middle of the night, on my way now")\n- GPS proof: evidence/02-FAMILY-STATUS-DISCRIMINATION/gps-location-proof/Oct-22-2025-1.5hr-Late.jpg (left 8:24 AM, arrived 8:59 AM)
```

---

### EVENT 6: Oct 22, 2025 - TERMINATION - Ambush Meeting

**Search criteria:** Date 2025-10-22, title contains "TERMINATION" or "Ambush"

**APPEND:**
```
\n\nEvidence:\n- Termination letter: evidence/01-CRITICAL-EVIDENCE/Termination-Letter.pdf (claims just cause with 3 reasons)\n- Employee 75% confident original letter did NOT list reasons (discrepancy investigation needed)
```

---

### EVENT 7: Sept 11, 2025 - CATASTROPHIC ROE ERROR

**Search criteria:** Date 2025-09-11, title contains "ROE ERROR" or "CATASTROPHIC"

**APPEND:**
```
\n\nEvidence:\n- Incorrect ROE: evidence/04-PARENTAL-LEAVE-RETALIATION/ROE-2025-Incorrect.pdf (95%+ error rate - start date, hours, amounts all wrong)\n- Corrected ROE: evidence/04-PARENTAL-LEAVE-RETALIATION/ROE-2025-Corrected.pdf (Sept 19 correction, still has errors)
```

---

### EVENT 8: Nov 4, 2025 - "Dear Rollins:" Contract Error

**Search criteria:** Date 2025-11-04, title contains "Dear Rollins" or contract

**APPEND:**
```
\n\nEvidence:\n- Employment contract: evidence/01-CRITICAL-EVIDENCE/Employment-Agreement-Dear-Rollins-Error.pdf (header: Jonathan Co, salutation: Dear Rollins - different person)\n- Analysis: evidence/Doc from Carol/Carol-Burke-Documents-Legal-Analysis.md (contract validity research)
```

---

### EVENT 9: Nov 5, 2025 - ROE Released - 14-Day Violation

**Search criteria:** Date 2025-11-05, title contains "ROE" and "14-Day" or "Violation"

**APPEND:**
```
\n\nEvidence:\n- Michelle emails: evidence/09-EMAIL-CORRESPONDENCE/employer/Nov-04-2025-Michelle-Sherman-ROE-1.png through 3.png (admits HUMI system error, parental leave mishandling)\n- ROE requirement research: docs/research/ROE-RESEARCH-SUMMARY.md (5-day federal requirement vs 14-day actual)
```

---

### EVENT 10: Jan 15, 2024 - ADHD Disclosed (Pre-Employment)

**Search criteria:** Date 2024-01-15, title contains "ADHD Disclosed"

**APPEND:**
```
\n\nEvidence:\n- Medical documentation: evidence/03-DISABILITY-DISCRIMINATION/ADHD-Medication-Note-Jan-2024.pdf (doctor's note explaining Vyvanse, ADHD diagnosis)
```

---

### EVENT 11: Feb 18, 2025 - Sleep Apnea Diagnosed

**Search criteria:** Date 2025-02-18, title contains "Sleep Apnea"

**APPEND:**
```
\n\nEvidence:\n- Medical documentation: evidence/03-DISABILITY-DISCRIMINATION/Sleep-Apnea-Diagnosis-CPAP-Feb-18-2025.pdf (sleep study, moderate sleep apnea diagnosis, CPAP prescribed)
```

---

### EVENT 12: July 31, 2025 - Late 15 Minutes (Marathon Day 18 - Exhaustion)

**Search criteria:** Date 2025-07-31, title contains "Late" or "Marathon Day 18"

**APPEND:**
```
\n\nEvidence:\n- Text message: evidence/02-FAMILY-STATUS-DISCRIMINATION/lateness-notifications/July-31-2025-Late.jpg ("gonna be about 15 mins late today" - polite, gave estimate)\n- GPS proof: evidence/02-FAMILY-STATUS-DISCRIMINATION/gps-location-proof/July-31-2025-24min-Late.jpg (worst lateness of all 13 incidents)\n- Timecard: evidence/08-TIMECARDS-WORK-HOURS/Timecard-July-2025.png (shows 140.5 hours in 18 consecutive days)
```

---

### Verification Steps After Adding Evidence References

```bash
# Check JavaScript syntax
node -c timeline/js/data.js

# Count evidence references added
grep -c "Evidence:" timeline/js/data.js
# Should return: 12

# Verify paths are properly formatted
grep "Evidence:" timeline/js/data.js -A 5
```

---

## TASK 3: REDUCE OVERVIEW FILTER FROM 46→20 EVENTS

### Estimated Time: 15 minutes

### Goal
Overview currently has 46 events (too comprehensive). Reduce to 20 milestone events showing narrative arc only.

### Strategy
Remove `overview` tag from 26 events, keeping only major milestones.

### The 20 Events to KEEP on Overview

**Search for these events and VERIFY they have `overview` tag (add if missing):**

1. **Jan 10, 2024** - First Interview - Family Priority Disclosed
2. **Jan 15, 2024** - Hired as Electrical Technician
3. **Oct 9, 2024** - Baby Born
4. **Oct 15, 2024** - 9-MONTH ACCOMMODATION: "Being Late is Okay" (RANGE EVENT ending Jul 20, 2025)
5. **Feb 18, 2025** - Sleep Apnea Diagnosed - Second Disability Disclosed
6. **Jun 13, 2025** - Sick Child Care - Employer APPROVED
7. **Jun 25, 2025** - SMOKING GUN: Good Faith Over-Communication (GPS proves arrived EARLY)
8. **Jul 14-31, 2025** - OVERTIME MARATHON: 18 Consecutive Days (RANGE EVENT)
9. **Jul 20, 2025** - SMOKING GUN: Boss's "Family Doesn't Matter" Statement
10. **Jul 28, 2025** - Parental Leave Request
11. **Aug 1, 2025** - Michelle Sherman Discriminatory Statement - Write-Up #3
12. **Aug 28, 2025** - Sick Baby - Accommodation Request DENIED
13. **Sept 4-Oct 9, 2025** - PARENTAL LEAVE PERIOD: 5 Weeks (RANGE EVENT)
14. **Oct 10, 2025** - Return from Parental Leave + Family Lateness
15. **Oct 10, 2025** - Write-Up #4: FIRST DAY BACK FROM PARENTAL LEAVE
16. **Oct 20, 2025** - Schedule Accommodation Denied - Mandatory Overtime
17. **Oct 22, 2025** - RJ Late SAME DAY as Employee Termination
18. **Oct 22, 2025** - TERMINATION - Ambush Meeting
19. **Nov 4, 2025** - Carol Burke: CORRECTED DOCUMENTS - "Dear Rollins:" Error
20. **Nov 5, 2025** - Michelle Sherman: ROE Released - 14-Day Violation

### Implementation Instructions

**Step 1:** Search data.js for `tags.*overview` or similar to find all events currently tagged with overview

**Step 2:** Create list of all overview-tagged events (likely 46 events)

**Step 3:** Compare to "20 events to KEEP" list above

**Step 4:** Remove `overview` tag from events NOT on the keep list

**Example edit:**
```javascript
// BEFORE (event NOT on keep list):
tags: ['overview', 'family', 'lateness-employee']

// AFTER:
tags: ['family', 'lateness-employee']
```

**Step 5:** Verify the 20 keeper events HAVE overview tag (add if missing)

### Verification Steps

```bash
# Search for overview tags
grep -n "'overview'" timeline/js/data.js

# Count overview tags (should be ~20)
grep -c "'overview'" timeline/js/data.js
```

**Manual verification:**
- Open timeline in browser
- Click "Overview" filter button
- Verify event count shows "20 events" (or close to 20)

---

## TASK 4: UPDATE CASE-REFERENCE.MD WITH FILTER NAVIGATION

### Estimated Time: 15 minutes

### Goal
Add "Timeline Navigation" section to CASE-REFERENCE.md explaining the new 7-filter structure.

### Step 1: Locate CASE-REFERENCE.md

**Expected location:** `/media/jonathanco/Backup/s3s/CASE-REFERENCE.md`

**If not found, ask user:** "Where is CASE-REFERENCE.md located?"

### Step 2: Read Current Structure

Read the file to determine:
- Where does it currently reference timeline (if at all)?
- What sections exist?
- Where should new "Timeline Navigation" section go?

**Recommended placement:** After evidence location section, before any "Next Steps" or closing sections

### Step 3: Add Timeline Navigation Section

**Insert this markdown:**

```markdown
---

## TIMELINE VISUALIZATION GUIDE

**Location:** `timeline/index.html` (interactive D3.js visualization)

**Filter Structure (7 specialized filters):**

### Primary Claims (Lead with These)

**1. Family Status Discrimination (21 events) - $25k-$40k non-taxable**
- 7 smoking guns: July 20 "family doesn't matter", Aug 28 sick baby denied, Oct 10 parental leave write-up
- Pattern: Accommodation (9 months) → Withdrawal (July 20) → Termination (12 days post-leave)
- Legal theory: Moore test (Alberta) - employer accommodated 9 months = proves no undue hardship

**2. Disability Discrimination (8 events) - $25k-$50k non-taxable**
- Boss has SAME conditions (ADHD + sleep apnea), zero accommodations for employee
- Smoking guns: Both disabilities disclosed with doctor's notes, timecard catch-22
- Legal theory: Employer knew, failed to accommodate, disciplined for disability symptoms

### Foundation Claims

**3. Just Cause Failure (17 events) - Reasonable notice damages**
- Differential treatment: Boss late 6x, RJ late same day, Jessica no sick note
- Smoking guns: Same-day termination, pretextual discipline, condonation
- Legal theory: McKinley proportionality - just cause threshold not met

**4. Bad Faith Conduct (10 events) - $5k-$20k moral damages**
- Honda v. Keays moral damages for manner of dismissal
- Smoking guns: Wage theft story (intimidation), ambush meeting, evidence spoliation
- Legal theory: Unfair, untruthful, intimidating conduct during employment and dismissal

### Settlement Pressure

**5. Post-Termination Misconduct (13 events) - $10k-$15k punitive**
- ROE violations: 14-day delay vs 5-day federal requirement
- Smoking guns: Catastrophic ROE error (95%+ error rate), "Dear Rollins:" contract error
- Legal theory: 2024 Alberta case awarded $10k punitive for ROE delay alone

**6. OHS Retaliation (7 events) - Pattern evidence + COR leverage**
- NOT standalone claim (3-month gap weakens direct causation)
- USE AS: Pattern evidence for bad faith + COR certification settlement pressure
- Smoking gun: Unreported workplace injury (3 workers) = COR Element 7 violation

**7. Overview (46 events) - Complete narrative arc**
- 5-minute walkthrough for lawyer consultation
- Shows progression: Employment → Accommodation → Withdrawal → Termination → Bad faith

### Quick Navigation for Lawyer Consultation

**Initial Meeting (5 minutes):**
1. Click "Overview" filter - show complete case arc

**Deep Dive (15 minutes):**
2. Click "Family Status Discrimination" - 7 smoking guns, 12-day post-parental-leave timing
3. Click "Disability Discrimination" - boss comparison, zero accommodations

**Supporting Claims (5 minutes):**
4. Click "Just Cause Failure" - differential treatment (RJ late same day as termination)
5. Click "Post-Termination Misconduct" - ROE violations ($10k punitive in 2024 case)

**Visual Indicators:**
- **⭐ Star** = Smoking gun event (strongest evidence)
- **Card colors** = Vary by category (family=red, OHS=orange, disability=yellow)
- **Range events** = Span multiple dates (e.g., 9-month accommodation, parental leave)
- **Cross-references** = Multi-tagged events show how they support multiple legal theories

**Comprehensive Guide:** See `timeline/TIMELINE-FILTER-GUIDE.md` (20 pages) for complete legal theory, settlement strategy, and lawyer consultation script.

---
```

### Step 4: Verify Insertion

**Check that:**
- Markdown formatting is correct
- Section flows logically from previous content
- No duplicate sections created
- File ends properly

---

## EXECUTION CHECKLIST

### Before Starting
- [ ] Create backup: `cp timeline/js/data.js timeline/js/data.js.backup-priority-improvements-$(date +%Y%m%d-%H%M%S)`
- [ ] Ask user 3 prerequisite questions (witnesses, evidence files, CASE-REFERENCE location)
- [ ] Read current CASE-REFERENCE.md structure

### Task 1: Witnesses (30 min)
- [ ] Add witnesses to Event 1: Jessica sick note
- [ ] Add witnesses to Event 2: RJ late Oct 22
- [ ] Add witnesses to Event 3: Confined space meeting
- [ ] Add witnesses to Event 4: Epoxy injury (3 workers)
- [ ] Add witnesses to Event 5: Hydraulic troubleshooting
- [ ] Add witnesses to Event 6: Phone died Oct 22
- [ ] Add witnesses to Event 7: Boss lateness pattern (6 events)
- [ ] Add witnesses to Event 8: Write-Up #1
- [ ] Run verification: `grep -c "Witnesses:" timeline/js/data.js` (should be 8-11)
- [ ] Check syntax: `node -c timeline/js/data.js`

### Task 2: Evidence References (20 min)
- [ ] Add evidence to Event 1: July 20 statement
- [ ] Add evidence to Event 2: Aug 28 sick baby
- [ ] Add evidence to Event 3: Jun 25 GPS early
- [ ] Add evidence to Event 4: Oct 10 parental leave
- [ ] Add evidence to Event 5: Oct 22 phone died
- [ ] Add evidence to Event 6: Oct 22 termination
- [ ] Add evidence to Event 7: Sept 11 ROE error
- [ ] Add evidence to Event 8: Nov 4 contract error
- [ ] Add evidence to Event 9: Nov 5 ROE violation
- [ ] Add evidence to Event 10: ADHD disclosed
- [ ] Add evidence to Event 11: Sleep apnea
- [ ] Add evidence to Event 12: July 31 marathon
- [ ] Run verification: `grep -c "Evidence:" timeline/js/data.js` (should be 12)
- [ ] Check syntax: `node -c timeline/js/data.js`

### Task 3: Overview Reduction (15 min)
- [ ] List all current overview-tagged events
- [ ] Compare to 20 keeper events list
- [ ] Remove overview tag from 26 events NOT on keeper list
- [ ] Verify 20 keeper events HAVE overview tag
- [ ] Check count: `grep -c "'overview'" timeline/js/data.js` (should be ~20)
- [ ] Test in browser: Click Overview, verify ~20 events shown

### Task 4: CASE-REFERENCE Update (15 min)
- [ ] Locate CASE-REFERENCE.md
- [ ] Read current structure
- [ ] Determine insertion point
- [ ] Insert Timeline Navigation section
- [ ] Verify markdown formatting
- [ ] Check no duplicates created

### Final Verification
- [ ] Run console test: `cd timeline && bash test-console.sh`
- [ ] Open timeline in browser, test all 7 filters
- [ ] Verify event counts: Family(21), Disability(8), Just Cause(17), Bad Faith(10), Post-Term(13), OHS(7), Overview(~20)
- [ ] Review sample events to confirm witnesses/evidence added
- [ ] Git commit changes with descriptive message

---

## TROUBLESHOOTING

### If JavaScript Syntax Error After Changes

**Symptom:** `node -c timeline/js/data.js` returns error

**Likely causes:**
1. Unescaped quote in description text (e.g., "can't" should be "can\\'t")
2. Missing comma between properties
3. Unmatched bracket or parenthesis

**Fix:**
- Check the line number in error message
- Look for unescaped quotes in witness/evidence text
- Verify all arrays/objects properly closed
- Restore from backup if needed: `cp timeline/js/data.js.backup-[timestamp] timeline/js/data.js`

### If Event Count Doesn't Match Expected

**Symptom:** Filter shows different number than expected (e.g., Overview shows 25 instead of 20)

**Likely causes:**
1. Missed removing overview tag from some events
2. Accidentally removed overview from keeper events

**Fix:**
- Run: `grep -n "'overview'" timeline/js/data.js` to see all overview-tagged events
- Compare line numbers to 20 keeper events list
- Add or remove tags as needed

### If Cannot Find Event by Date/Title

**Symptom:** Grep or search doesn't find expected event

**Likely causes:**
1. Date format different (2025-10-22 vs "Oct 22, 2025")
2. Title wording slightly different
3. Event ID different than expected

**Fix:**
- Search by partial title: `grep -i "sick baby" timeline/js/data.js`
- Search by approximate date: `grep "2025-08" timeline/js/data.js`
- Search by tags: `grep "family-status-discrimination" timeline/js/data.js`
- Ask user to confirm exact event wording

---

## SUCCESS CRITERIA

### How to Know You're Done

**Task 1 - Witnesses:**
- ✅ 8-11 events have "Witnesses:" section (depending if you add to all 6 boss lateness events)
- ✅ Each witness section includes: Names, what they witnessed, availability, corroboration significance
- ✅ No JavaScript syntax errors

**Task 2 - Evidence:**
- ✅ 12 events have "Evidence:" section
- ✅ File paths are relative from project root: `evidence/folder/file.ext`
- ✅ All referenced files actually exist in evidence folder

**Task 3 - Overview:**
- ✅ Overview filter shows ~20 events (not 46)
- ✅ All major milestones present (employment start, baby born, July 20 turning point, termination, key smoking guns)
- ✅ Narrative arc flows logically: Foundation → Accommodation → Withdrawal → Termination → Bad faith

**Task 4 - CASE-REFERENCE:**
- ✅ Timeline Navigation section added
- ✅ All 7 filters described with event counts and legal theory
- ✅ Markdown formatting correct
- ✅ Flows logically from previous content

**Overall:**
- ✅ Timeline console test passes (zero errors)
- ✅ All 7 filters clickable and show expected event counts
- ✅ Sample events display witnesses and evidence in descriptions
- ✅ Changes committed to git with clear message

---

## GIT COMMIT MESSAGE TEMPLATE

After completing all tasks:

```bash
cd /media/jonathanco/Backup/s3s
git add timeline/js/data.js CASE-REFERENCE.md
git commit -m "Add witnesses and evidence to timeline, reduce Overview filter

- Added witness information to 8 key events (corroboration, availability)
- Added evidence file references to 12 key events (texts, GPS, ROE, medical docs)
- Reduced Overview filter from 46→20 events (milestone narrative only)
- Updated CASE-REFERENCE.md with 7-filter timeline navigation guide

Strengthens credibility for lawyer consultation. All changes verified with
console test (zero errors). Total implementation time: ~80 minutes.

🤖 Generated with [Claude Code](https://claude.com/claude-code)"
```

---

## NOTES FOR FUTURE-ME (After Context Clear)

**You are implementing 4 priority improvements to the timeline visualization.**

**What was already completed (87% of original 23 tasks):**
- ✅ 7 specialized filters created and populated
- ✅ All 70 events properly categorized
- ✅ Smoking gun stars (⭐) added
- ✅ Cross-references added to 9 multi-tagged events
- ✅ 20-page filter guide created (TIMELINE-FILTER-GUIDE.md)
- ✅ Zero JavaScript errors

**What you're adding now (final 4 priority improvements):**
- Witness information (credibility boost)
- Evidence file references (helps lawyer find docs)
- Overview filter reduction (better consultation flow)
- CASE-REFERENCE.md update (documentation completeness)

**Why these 4 tasks:**
User decided these add HIGH value without requiring perfectionism. After these 4 tasks, timeline is 95% complete and fully production-ready for lawyer consultation.

**Timeline status:** Production-ready after these improvements. Settlement range: $55k-$70k (non-taxable primary claims + wrongful dismissal foundation + bad faith/punitive).

**User's lawyer consultation:** Scheduled or imminent - timeline needs to be credible and easy to navigate.

---

**END OF FRAMEWORK GUIDE**
**Ready for systematic execution after context clear**
