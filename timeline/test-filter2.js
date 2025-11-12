// Test the filtering logic
const timelineEvents = require('./js/data.js');

console.log('Total events:', timelineEvents.length);
console.log();

// Test each filter
const filters = ['critical', 'ohs', 'wrongful-dismissal', 'smoking-gun', 'disability', 'family'];

filters.forEach(filterName => {
  let filtered;

  if (filterName === 'critical') {
    filtered = timelineEvents.filter(e => e.tags && e.tags.includes('critical'));
  } else if (filterName === 'ohs') {
    filtered = timelineEvents.filter(e => e.tags && e.tags.includes('ohs'));
  } else if (filterName === 'wrongful-dismissal') {
    filtered = timelineEvents.filter(e => e.tags && e.tags.includes('wrongful-dismissal'));
  } else if (filterName === 'smoking-gun') {
    filtered = timelineEvents.filter(e => e.tags && e.tags.includes('smoking-gun'));
  } else if (filterName === 'disability') {
    filtered = timelineEvents.filter(e => e.tags && e.tags.includes('disability'));
  } else if (filterName === 'family') {
    filtered = timelineEvents.filter(e => e.tags && e.tags.includes('family'));
  }

  console.log(`Filter: ${filterName.toUpperCase()}`);
  console.log(`  Count: ${filtered.length} events`);

  if (filtered.length > 0) {
    console.log(`  Sample events:`);
    filtered.slice(0, 3).forEach(e => {
      console.log(`    - ${e.timestamp}: ${e.text.substring(0, 60)}...`);
      console.log(`      Tags: [${e.tags ? e.tags.join(', ') : 'none'}]`);
    });
  } else {
    console.log('  ⚠️ NO EVENTS FOUND!');
  }
  console.log();
});

// Check for events without tags
const noTags = timelineEvents.filter(e => !e.tags || e.tags.length === 0);
console.log(`Events without tags: ${noTags.length}`);
if (noTags.length > 0) {
  noTags.forEach(e => {
    console.log(`  - ${e.timestamp}: ${e.text}`);
  });
}

// Test 'all' view
console.log('\n===ALL EVENTS VIEW===');
console.log(`Total: ${timelineEvents.length} events`);
