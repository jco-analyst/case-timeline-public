# Timeline Filter Implementation - Command Reference

## Quick Start Commands

### 1. Backup Current Data
```bash
cd /media/jonathanco/Backup/s3s/timeline
cp js/data.js js/data.js.backup-$(date +%Y%m%d-%H%M)
```

### 2. Verify Current State
```bash
node -e "
const events = require('./js/data.js');
const tags = {};
events.forEach(e => e.tags.forEach(t => tags[t] = (tags[t] || 0) + 1));
Object.entries(tags).sort((a,b) => b[1] - a[1]).forEach(([t,c]) =>
  console.log(\`\${t}: \${c} events\`)
);
console.log(\`\\nTotal events: \${events.length}\`);
"
```

**Expected output:**
```
wrongful-dismissal: 69 events
family: 22 events
smoking-gun: 20 events
critical: 17 events
correspondence: 11 events
...
Total events: 70
```

### 3. Test After Implementation
```bash
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

console.log('=== FILTER EVENT COUNTS ===\\n');
filters.forEach(f => {
  const count = events.filter(e => e.tags.includes(f)).length;
  console.log(\`\${f}: \${count} events\`);
});

console.log(\`\\nTotal events: \${events.length}\`);

// Check for events without any filter
const untagged = events.filter(e =>
  !filters.some(f => e.tags.includes(f))
);
if (untagged.length > 0) {
  console.log(\`\\nWARNING: \${untagged.length} events without filter tags:\`);
  untagged.forEach(e => console.log(\`  - [\${e.timestamp}] \${e.text}\`));
}
"
```

**Expected output after implementation:**
```
=== FILTER EVENT COUNTS ===

overview: 15-20 events
family-status-discrimination: 25-30 events
disability-discrimination: 12-15 events
just-cause-failure: 20-25 events
bad-faith-conduct: 15-20 events
post-termination-misconduct: 12 events
ohs-retaliation: 8-10 events

Total events: 70
```

---

## Detailed Implementation Commands

### Phase 1: Analyze Event Distribution

#### Get all events by current filter
```bash
node -e "
const events = require('./js/data.js');

console.log('=== EVENTS BY FILTER ===\\n');

// Family events
const family = events.filter(e => e.tags.includes('family'));
console.log(\`FAMILY (\${family.length} events):\`);
family.forEach(e => console.log(\`  [\${e.timestamp}] \${e.text}\`));

console.log(\`\\nDISABILITY (\${events.filter(e => e.tags.includes('disability')).length} events):\`);
events.filter(e => e.tags.includes('disability')).forEach(e =>
  console.log(\`  [\${e.timestamp}] \${e.text}\`)
);

console.log(\`\\nCORRESPONDENCE (\${events.filter(e => e.tags.includes('correspondence')).length} events):\`);
events.filter(e => e.tags.includes('correspondence')).forEach(e =>
  console.log(\`  [\${e.timestamp}] \${e.text}\`)
);

console.log(\`\\nBAD-FAITH (\${events.filter(e => e.tags.includes('bad-faith')).length} events):\`);
events.filter(e => e.tags.includes('bad-faith')).forEach(e =>
  console.log(\`  [\${e.timestamp}] \${e.text}\`)
);

console.log(\`\\nOHS (\${events.filter(e => e.tags.includes('ohs')).length} events):\`);
events.filter(e => e.tags.includes('ohs')).forEach(e =>
  console.log(\`  [\${e.timestamp}] \${e.text}\`)
);
"
```

#### Find events by ID
```bash
node -e "
const events = require('./js/data.js');
const ids = [71, 6, 76, 22, 28]; // Example IDs
console.log('Events by ID:\\n');
ids.forEach(id => {
  const e = events.find(ev => ev.id === id);
  if (e) console.log(\`ID \${id}: [\${e.timestamp}] \${e.text}\\n  Tags: \${e.tags.join(', ')}\`);
});
"
```

#### Find smoking gun events
```bash
node -e "
const events = require('./js/data.js');
const smokingGuns = events.filter(e => e.tags.includes('smoking-gun'));
console.log(\`=== SMOKING GUN EVENTS (\${smokingGuns.length}) ===\\n\`);
smokingGuns.forEach(e => {
  console.log(\`[\${e.timestamp}] \${e.text}\`);
  console.log(\`  Current tags: \${e.tags.join(', ')}\`);
  console.log(\`  Category: \${e.category}\\n\`);
});
"
```

---

### Phase 2: Find Events for Specific Filters

#### Family Status Discrimination candidates
```bash
node -e "
const events = require('./js/data.js');
const family = events.filter(e =>
  e.tags.includes('family') &&
  e.tags.includes('wrongful-dismissal') &&
  e.category === 'family'
);
console.log(\`Family Status Discrimination candidates: \${family.length}\\n\`);
family.forEach(e => console.log(\`  ID \${e.id}: [\${e.timestamp}] \${e.text}\`));
"
```

#### Disability Discrimination candidates
```bash
node -e "
const events = require('./js/data.js');
const disability = events.filter(e =>
  e.tags.includes('disability') ||
  (e.tags.includes('lateness-employee') &&
   (e.description.includes('sleep') || e.description.includes('ADHD')))
);
console.log(\`Disability Discrimination candidates: \${disability.length}\\n\`);
disability.forEach(e => console.log(\`  ID \${e.id}: [\${e.timestamp}] \${e.text}\`));
"
```

#### Post-Termination Misconduct candidates
```bash
node -e "
const events = require('./js/data.js');
const postTerm = events.filter(e =>
  e.tags.includes('correspondence') ||
  (e.timestamp >= '2025-10-22' && e.category.includes('correspondence'))
);
console.log(\`Post-Termination Misconduct candidates: \${postTerm.length}\\n\`);
postTerm.forEach(e => console.log(\`  ID \${e.id}: [\${e.timestamp}] \${e.text}\`));
"
```

#### Boss Lateness events (differential treatment)
```bash
node -e "
const events = require('./js/data.js');
const bossLate = events.filter(e => e.tags.includes('lateness-boss'));
console.log(\`Boss Lateness events: \${bossLate.length}\\n\`);
bossLate.forEach(e => console.log(\`  ID \${e.id}: [\${e.timestamp}] \${e.text}\`));
"
```

---

### Phase 3: Validation Commands

#### Check for duplicate events
```bash
node -e "
const events = require('./js/data.js');
const ids = events.map(e => e.id);
const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
if (duplicates.length > 0) {
  console.log('DUPLICATE IDs FOUND:', duplicates);
} else {
  console.log('✓ No duplicate IDs');
}
"
```

#### Verify all events have at least one filter tag
```bash
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

const untagged = events.filter(e =>
  !filters.some(f => e.tags.includes(f))
);

if (untagged.length > 0) {
  console.log(\`WARNING: \${untagged.length} events without filter tags:\\n\`);
  untagged.forEach(e => console.log(\`  ID \${e.id}: [\${e.timestamp}] \${e.text}\`));
} else {
  console.log('✓ All events have at least one filter tag');
}
"
```

#### Check for events still on wrongful-dismissal
```bash
node -e "
const events = require('./js/data.js');
const stillWD = events.filter(e => e.tags.includes('wrongful-dismissal'));
if (stillWD.length > 0) {
  console.log(\`Events still tagged 'wrongful-dismissal': \${stillWD.length}\\n\`);
  stillWD.forEach(e => console.log(\`  ID \${e.id}: [\${e.timestamp}] \${e.text}\`));
  console.log(\`\\nExpected: 0 (all should be renamed to just-cause-failure)\`);
} else {
  console.log('✓ No events remain on wrongful-dismissal (successfully migrated)');
}
"
```

#### Verify target event counts
```bash
node -e "
const events = require('./js/data.js');
const targets = {
  'overview': { min: 15, max: 20 },
  'family-status-discrimination': { min: 25, max: 30 },
  'disability-discrimination': { min: 12, max: 15 },
  'just-cause-failure': { min: 20, max: 25 },
  'bad-faith-conduct': { min: 15, max: 20 },
  'post-termination-misconduct': { min: 12, max: 12 },
  'ohs-retaliation': { min: 8, max: 10 }
};

console.log('=== FILTER COUNT VALIDATION ===\\n');
let allValid = true;
Object.entries(targets).forEach(([filter, range]) => {
  const count = events.filter(e => e.tags.includes(filter)).length;
  const valid = count >= range.min && count <= range.max;
  const status = valid ? '✓' : '✗';
  console.log(\`\${status} \${filter}: \${count} events (expected \${range.min}-\${range.max})\`);
  if (!valid) allValid = false;
});

console.log(\`\\n\${allValid ? '✓ ALL COUNTS VALID' : '✗ SOME COUNTS OUT OF RANGE'}\`);
"
```

---

### Phase 4: Generate Event Lists by Filter

#### Export events for each filter to text files
```bash
cd /media/jonathanco/Backup/s3s/timeline

node -e "
const fs = require('fs');
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

filters.forEach(filter => {
  const filterEvents = events.filter(e => e.tags.includes(filter));
  let output = \`\${filter.toUpperCase()} FILTER\\n\`;
  output += \`Event Count: \${filterEvents.length}\\n\`;
  output += '='.repeat(50) + '\\n\\n';

  filterEvents.forEach(e => {
    output += \`[\${e.timestamp}] \${e.text}\\n\`;
    output += \`  ID: \${e.id}\\n\`;
    output += \`  Tags: \${e.tags.join(', ')}\\n\`;
    output += \`  Category: \${e.category}\\n\`;
    if (e.priority) output += \`  Priority: \${e.priority}\\n\`;
    output += '\\n';
  });

  fs.writeFileSync(\`filter-\${filter}.txt\`, output);
  console.log(\`Created filter-\${filter}.txt (\${filterEvents.length} events)\`);
});
"
```

---

### Phase 5: Compare Before/After

#### Show reduction in wrongful-dismissal
```bash
node -e "
console.log('=== WRONGFUL-DISMISSAL REDUCTION ===\\n');
console.log('BEFORE: 69 events on wrongful-dismissal');
console.log('  (98.6% of all events - MASSIVE OVERLAP)\\n');
console.log('AFTER: 0 events on wrongful-dismissal');
console.log('  (renamed to just-cause-failure: 20-25 events)\\n');
console.log('EVENTS MOVED:');
console.log('  → family-status-discrimination: 21 events');
console.log('  → disability-discrimination: 5 events');
console.log('  → bad-faith-conduct: 5 events');
console.log('  → post-termination-misconduct: 11 events');
console.log('  → ohs-retaliation: 4 events');
console.log('\\nTOTAL REDUCTION: 45-50 events removed from wrongful-dismissal');
"
```

---

### Phase 6: Git Commands

#### Commit changes
```bash
cd /media/jonathanco/Backup/s3s/timeline

# Stage changes
git add js/data.js

# Commit with descriptive message
git commit -m "Restructure timeline filters: 7 specialized filters

- Remove 45-50 events from wrongful-dismissal (69→20-25)
- Add family-status-discrimination filter (25-30 events)
- Add disability-discrimination filter (12-15 events)
- Add bad-faith-conduct filter (15-20 events)
- Add post-termination-misconduct filter (12 events)
- Add ohs-retaliation filter (8-10 events)
- Rename wrongful-dismissal → just-cause-failure
- Eliminate smoking-gun standalone filter
- Add overview filter (15-20 major milestones)

Aligns with legal strategy: Family + Disability (primary non-taxable
claims), Just Cause (foundation), Bad Faith (Wallace damages),
Post-Termination (aggravating), OHS (pattern evidence).

Settlement range: \$50k-\$75k (likely \$55k-\$70k)"
```

#### Create feature branch (optional)
```bash
git checkout -b filter-restructure
# Make changes
git add js/data.js
git commit -m "Filter restructure: see commit message"
git checkout master
git merge filter-restructure
```

---

### Phase 7: Documentation Commands

#### Generate filter documentation
```bash
node -e "
const events = require('./js/data.js');
const filters = {
  'overview': 'Major case milestones and narrative',
  'family-status-discrimination': 'Accommodation withdrawal, parental leave retaliation, 7 smoking guns',
  'disability-discrimination': 'ADHD + sleep apnea known, zero accommodations',
  'just-cause-failure': 'Progressive discipline breakdown, differential treatment',
  'bad-faith-conduct': 'Intimidation, manipulation, evidence spoliation',
  'post-termination-misconduct': 'ROE delays, document tampering, wrong bank account',
  'ohs-retaliation': 'Safety advocacy, unreported injury, witness elimination'
};

console.log('# Timeline Filter Documentation\\n');
Object.entries(filters).forEach(([filter, desc]) => {
  const count = events.filter(e => e.tags.includes(filter)).length;
  console.log(\`## \${filter.replace(/-/g, ' ').toUpperCase()}\`);
  console.log(\`**Event Count:** \${count}\`);
  console.log(\`**Purpose:** \${desc}\\n\`);
});
" > FILTER-DOCUMENTATION.md
```

---

## Troubleshooting Commands

### Find missing events
```bash
node -e "
const events = require('./js/data.js');
const expectedIds = [1,2,3,4,5,6,9,10,11,12,13,14,15,16,17,18,21,22,23,25,26,27,28,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,59,60,61,62,63,64,65,66,67,70,71,72,73,74,75,76,77,78,79,80]; // All expected IDs
const actualIds = events.map(e => e.id);
const missing = expectedIds.filter(id => !actualIds.includes(id));
if (missing.length > 0) {
  console.log('MISSING EVENT IDs:', missing);
} else {
  console.log('✓ All expected events present');
}
"
```

### Find events with old tags
```bash
node -e "
const events = require('./js/data.js');
const oldTags = ['wrongful-dismissal', 'smoking-gun', 'correspondence'];
oldTags.forEach(tag => {
  const found = events.filter(e => e.tags.includes(tag));
  if (found.length > 0) {
    console.log(\`Events still using '\${tag}': \${found.length}\`);
    found.forEach(e => console.log(\`  ID \${e.id}: [\${e.timestamp}] \${e.text}\`));
  } else {
    console.log(\`✓ No events using '\${tag}'\`);
  }
});
"
```

### Validate JSON syntax
```bash
node -c js/data.js && echo "✓ data.js syntax valid" || echo "✗ Syntax error in data.js"
```

---

## Quick Reference

### All validation in one command
```bash
cd /media/jonathanco/Backup/s3s/timeline && node -e "
const events = require('./js/data.js');
const filters = ['overview','family-status-discrimination','disability-discrimination','just-cause-failure','bad-faith-conduct','post-termination-misconduct','ohs-retaliation'];

console.log('=== VALIDATION SUMMARY ===\\n');
console.log(\`Total events: \${events.length}\`);
console.log('\\nFilter counts:');
filters.forEach(f => console.log(\`  \${f}: \${events.filter(e => e.tags.includes(f)).length}\`));

const untagged = events.filter(e => !filters.some(f => e.tags.includes(f)));
console.log(\`\\nUntagged events: \${untagged.length}\`);

const wd = events.filter(e => e.tags.includes('wrongful-dismissal'));
console.log(\`Still on wrongful-dismissal: \${wd.length} (should be 0)\`);

const ids = events.map(e => e.id);
const dups = ids.filter((id, i) => ids.indexOf(id) !== i);
console.log(\`Duplicate IDs: \${dups.length ? dups.join(',') : 'none'}\`);

console.log('\\n' + (untagged.length === 0 && wd.length === 0 && dups.length === 0 ? '✓ ALL VALIDATIONS PASSED' : '✗ ISSUES FOUND'));
"
```

---

**END OF IMPLEMENTATION COMMANDS**

**Last Updated:** November 21, 2025
**Related Documents:**
- TIMELINE-FILTER-ALLOCATION-PLAN.md (comprehensive plan)
- FILTER-ALLOCATION-SUMMARY.md (executive summary)
- FILTER-REALLOCATION-VISUAL.md (visual guide)
