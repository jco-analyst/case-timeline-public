# Timeline Filter Allocation - Quick Summary

## Problem
- **Current:** 69 of 70 events tagged with `wrongful-dismissal` = massive overlap, unclear narrative
- **Need:** 7 specialized filters with clear legal theory separation

## Solution Overview

### Remove from wrongful-dismissal → Move to specialized filters:

| Move From | Move To | Event Count | Key Events |
|-----------|---------|-------------|------------|
| wrongful-dismissal | **family-status-discrimination** | 21 | "Family doesn't matter", 9-month accommodation, sick baby denied |
| wrongful-dismissal | **disability-discrimination** | 5 | ADHD/sleep apnea disclosure, timecard catch-22 |
| wrongful-dismissal | **bad-faith-conduct** | 5 | Wage theft story, evidence spoliation, intimidation |
| wrongful-dismissal | **post-termination-misconduct** | 11 | ROE delays, wrong bank account, document tampering |
| wrongful-dismissal | **ohs-retaliation** | 4 | Confined space, epoxy injury, unreported to WCB |
| wrongful-dismissal | **just-cause-failure** (rename) | 20-25 | Differential treatment, boss lateness 6x, pretextual write-ups |

**Total reduction:** 69 events → ~20-25 on just-cause-failure (45-50 events moved)

## New Filter Structure

### 1. Overview (15-20 events)
**Purpose:** Major case milestones, high-level narrative
**Key events:** First interview, baby born, "family doesn't matter", epoxy injury, parental leave, termination

### 2. Family Status Discrimination (25-30 events)
**Legal Theory:** Alberta Human Rights Act Section 7, accommodation withdrawal
**Smoking Guns:** 7 total
- 9-month accommodation "being late is okay"
- July 20 "family doesn't matter" statement
- Michelle Sherman "having children should not be reason"
- Sick baby denied (Aug 28) vs approved (June 13)
- Write-up #4 same day as return from parental leave
- Terminated 12 days after protected leave

### 3. Disability Discrimination (12-15 events)
**Legal Theory:** ADHD + sleep apnea known, zero accommodations
**Key Pattern:** Boss has SAME disabilities (accommodated via promotion), employee fired for same struggles
**Smoking Gun:** Timecard unlock catch-22 (system locks, boss controls remedy, employee CANNOT comply)

### 4. Just Cause Failure (20-25 events)
**Legal Theory:** Progressive discipline breakdown, differential treatment, pretextual
**Key Evidence:**
- Boss late 6x (May-Aug), zero discipline
- RJ late SAME DAY as termination, no discipline
- Jessica sick same week, NO sick note required (employee required)
- Write-up #1 invalid (OHS retaliation) → entire chain collapses
- GPS proof: 10 min EARLY despite "might be late" text

### 5. Bad Faith Conduct (15-20 events)
**Legal Theory:** Wallace damages, intimidation, manipulation, evidence destruction
**Key Events:**
- Wage theft intimidation story
- 10+ termination threats = learned helplessness
- Michelle Sherman belittling after 140-hour month
- Timecard unlock catch-22 (weaponized system)
- Ambush meeting under 2 minutes
- Evidence spoliation: email access cut during active review

### 6. Post-Termination Misconduct (12 events)
**Legal Theory:** Post-termination bad faith extends Wallace damages
**Key Events:**
- ROE delay: 13-14 days (required 5 days) = federal violation = $10k punitive
- Wrong bank account (financial hardship)
- Wrong documents sent Oct 30, corrected Nov 4
- "Dear Rollins:" contract error (potential void contract $10k-$20k)
- Termination letter possibly altered (employee 75% certain different)

### 7. OHS Retaliation (8-10 events)
**Legal Theory:** Alberta OHS Act Section 35, witness elimination
**Key Pattern:**
- Employee advocates PPE → Denied → Workers injured → Employee proven right → Terminated 3 months later
- Epoxy injury: 3 workers hurt, work stopped, unreported to WCB
- Full face masks arrived 1-2 days AFTER injury (exact PPE employee requested for YEAR)
**COR Leverage:** Unreported PSI + COR certification = business catastrophe if OHS complaint filed

## Elimination: Smoking-Gun Filter

**Current:** 20 events tagged `smoking-gun` as separate filter
**New approach:** Integrate smoking guns into their respective claim filters
**Rationale:** Smoking guns belong within legal theories, not standalone

## Expected Outcomes

### Settlement Alignment
**Primary Claims (Non-Taxable):**
1. Family Status Discrimination: $25k-$40k
2. Disability Discrimination: $25k-$50k

**Foundation (Mixed):**
3. Wrongful Dismissal + Bad Faith: $15k-$35k

**Aggravating:**
4. Post-Termination: +$10k-$15k
5. OHS: Pattern evidence

**Total Range:** $50k-$75k (most likely $55k-$70k)

### Narrative Clarity
**Before:** "Employee was wrongfully dismissed" (vague, 69 events)
**After:** 7 clear stories:
1. "Discriminated against for childcare obligations"
2. "Discriminated against for ADHD + sleep apnea"
3. "Progressive discipline was pretextual and inconsistent"
4. "Intimidated, manipulated, evidence destroyed"
5. "ROE delays, document tampering after termination"
6. "Retaliated for safety advocacy, witness elimination"
7. "Overview of major case events"

## Implementation Priority

### High Priority (Do First)
1. **Family Status Discrimination** - Strongest claim, 7 smoking guns
2. **Just Cause Failure** - Remove 45+ events from wrongful-dismissal
3. **Post-Termination Misconduct** - Clear separation (all post-Oct 22)

### Medium Priority
4. **Disability Discrimination** - Smaller but clear claim
5. **Bad Faith Conduct** - Wallace damages, manner of dismissal

### Lower Priority
6. **OHS Retaliation** - Standalone claim weak, strong pattern evidence
7. **Overview** - Add tags to major milestones

## Quick Event Count Check

Run this validation after implementation:

```bash
cd /media/jonathanco/Backup/s3s/timeline
node -e "
const events = require('./js/data.js');
const filters = [
  'overview',
  'family-status-discrimination',
  'disability-discrimination',
  'just-cause-failure',
  'bad-faith-conduct',
  'post-termination-misconduct',
  'ohs-retaliation'
];
filters.forEach(f => {
  const count = events.filter(e => e.tags.includes(f)).length;
  console.log(\`\${f}: \${count} events\`);
});
"
```

**Expected output:**
```
overview: 15-20 events
family-status-discrimination: 25-30 events
disability-discrimination: 12-15 events
just-cause-failure: 20-25 events
bad-faith-conduct: 15-20 events
post-termination-misconduct: 12 events
ohs-retaliation: 8-10 events
```

## Next Steps

1. **Read full plan:** `/media/jonathanco/Backup/s3s/timeline/TIMELINE-FILTER-ALLOCATION-PLAN.md`
2. **Backup data.js:** `cp js/data.js js/data.js.backup-$(date +%Y%m%d)`
3. **Begin implementation:** Follow Section 5 checklist in full plan
4. **Test thoroughly:** Verify event counts and filter rendering
5. **Update documentation:** CLAUDE.md, README.md

---

**Key Principle:** Minimize overlap, maximize legal theory clarity, align with settlement strategy
