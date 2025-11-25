// Script to analyze timeline events and create filter allocation plan
const fs = require('fs');

// Load the data
const timelineEvents = require('./js/data.js');

console.log('=== TIMELINE FILTER ALLOCATION ANALYSIS ===\n');
console.log(`Total events: ${timelineEvents.length}\n`);

// Extract all unique tags
const allTags = new Set();
const tagCombinations = {};
const tagCounts = {};

timelineEvents.forEach(event => {
  const tagKey = JSON.stringify(event.tags.sort());
  tagCombinations[tagKey] = (tagCombinations[tagKey] || 0) + 1;

  event.tags.forEach(tag => {
    allTags.add(tag);
    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
  });
});

console.log('=== INDIVIDUAL TAG COUNTS ===');
Object.entries(tagCounts)
  .sort((a, b) => b[1] - a[1])
  .forEach(([tag, count]) => {
    console.log(`${tag}: ${count} events`);
  });

console.log('\n=== TAG COMBINATION COUNTS ===');
Object.entries(tagCombinations)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 20)
  .forEach(([combo, count]) => {
    console.log(`${combo}: ${count} events`);
  });

// Analyze by current filter categories
console.log('\n\n=== EVENTS BY CURRENT FILTER TAGS ===\n');

const filters = {
  'wrongful-dismissal': [],
  'family': [],
  'disability': [],
  'ohs': [],
  'bad-faith': [],
  'smoking-gun': [],
  'correspondence': [],
  'lateness-employee': [],
  'lateness-boss': [],
  'lateness-coworker': [],
  'critical': []
};

timelineEvents.forEach(event => {
  event.tags.forEach(tag => {
    if (filters[tag] !== undefined) {
      filters[tag].push(event);
    }
  });
});

Object.entries(filters).forEach(([filter, events]) => {
  console.log(`\n### ${filter.toUpperCase()} (${events.length} events) ###`);
  events.slice(0, 10).forEach(event => {
    console.log(`  [${event.timestamp}] ${event.text}`);
    console.log(`    Tags: ${event.tags.join(', ')}`);
  });
  if (events.length > 10) {
    console.log(`  ... and ${events.length - 10} more`);
  }
});

// Identify events that need reallocation
console.log('\n\n=== KEY EVENTS FOR REALLOCATION ===\n');

console.log('## Discrimination smoking guns (currently on wrongful-dismissal, should move):');
const discriminationEvents = timelineEvents.filter(e =>
  e.tags.includes('smoking-gun') &&
  (e.tags.includes('family') || e.tags.includes('disability')) &&
  e.tags.includes('wrongful-dismissal')
);
discriminationEvents.forEach(e => {
  console.log(`  [${e.timestamp}] ${e.text}`);
  console.log(`    Current: ${e.tags.join(', ')}`);
});

console.log('\n## Bad faith events (currently on wrongful-dismissal):');
const badFaithEvents = timelineEvents.filter(e =>
  e.tags.includes('bad-faith') &&
  e.tags.includes('wrongful-dismissal')
);
badFaithEvents.forEach(e => {
  console.log(`  [${e.timestamp}] ${e.text}`);
  console.log(`    Current: ${e.tags.join(', ')}`);
});

console.log('\n## Correspondence events:');
const correspondenceEvents = timelineEvents.filter(e =>
  e.tags.includes('correspondence')
);
correspondenceEvents.forEach(e => {
  console.log(`  [${e.timestamp}] ${e.text}`);
  console.log(`    Category: ${e.category}`);
});

console.log('\n## Lateness events breakdown:');
console.log(`  Employee lateness: ${filters['lateness-employee'].length} events`);
console.log(`  Boss lateness: ${filters['lateness-boss'].length} events`);
console.log(`  Coworker lateness: ${filters['lateness-coworker'].length} events`);

// Family status lateness
const familyLateness = timelineEvents.filter(e =>
  e.tags.includes('lateness-employee') &&
  e.tags.includes('family')
);
console.log(`  Family-related employee lateness: ${familyLateness.length} events`);

// Disability lateness
const disabilityLateness = timelineEvents.filter(e =>
  e.tags.includes('lateness-employee') &&
  e.tags.includes('disability')
);
console.log(`  Disability-related employee lateness: ${disabilityLateness.length} events`);

// Analysis of wrongful-dismissal tag
console.log('\n\n=== WRONGFUL-DISMISSAL TAG ANALYSIS ===');
console.log(`Total events with wrongful-dismissal tag: ${filters['wrongful-dismissal'].length}`);

const wdByCategory = {};
filters['wrongful-dismissal'].forEach(e => {
  wdByCategory[e.category] = (wdByCategory[e.category] || 0) + 1;
});

console.log('\nBy category:');
Object.entries(wdByCategory)
  .sort((a, b) => b[1] - a[1])
  .forEach(([cat, count]) => {
    console.log(`  ${cat}: ${count}`);
  });

// Events to potentially remove from wrongful-dismissal
console.log('\n\n=== EVENTS TO POTENTIALLY REMOVE FROM WRONGFUL-DISMISSAL ===');

console.log('\n## Pure family status (move to family-status-discrimination):');
const pureFamily = timelineEvents.filter(e =>
  e.tags.includes('wrongful-dismissal') &&
  e.tags.includes('family') &&
  !e.tags.includes('ohs') &&
  e.category === 'family'
);
console.log(`Count: ${pureFamily.length}`);
pureFamily.forEach(e => console.log(`  [${e.timestamp}] ${e.text}`));

console.log('\n## Pure disability (move to disability-discrimination):');
const pureDisability = timelineEvents.filter(e =>
  e.tags.includes('wrongful-dismissal') &&
  e.tags.includes('disability') &&
  !e.tags.includes('family') &&
  e.category === 'disability'
);
console.log(`Count: ${pureDisability.length}`);
pureDisability.forEach(e => console.log(`  [${e.timestamp}] ${e.text}`));

console.log('\n## Correspondence (move to post-termination-misconduct):');
console.log(`Count: ${correspondenceEvents.length}`);
correspondenceEvents.forEach(e => console.log(`  [${e.timestamp}] ${e.text}`));

console.log('\n## Bad faith (move to bad-faith-conduct):');
console.log(`Count: ${badFaithEvents.length}`);
badFaithEvents.forEach(e => console.log(`  [${e.timestamp}] ${e.text}`));

console.log('\n\nAnalysis complete!');
