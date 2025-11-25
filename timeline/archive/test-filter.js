// Test the filtering logic
const fs = require('fs');
const vm = require('vm');

// Read the data.js file
const dataCode = fs.readFileSync('./js/data.js', 'utf8');

// Execute the code to get timelineEvents
const context = { timelineEvents: null };
vm.createContext(context);
vm.runInContext(dataCode, context);

const timelineEvents = context.timelineEvents;

console.log('Total events:', timelineEvents.length);

// Test each filter
const filters = ['critical', 'ohs', 'wrongful-dismissal', 'smoking-gun', 'all'];

filters.forEach(filterName => {
  let filtered;

  if (filterName === 'all') {
    filtered = timelineEvents;
  } else if (filterName === 'critical') {
    filtered = timelineEvents.filter(e => e.tags && e.tags.includes('critical'));
  } else if (filterName === 'ohs') {
    filtered = timelineEvents.filter(e => e.tags && e.tags.includes('ohs'));
  } else if (filterName === 'wrongful-dismissal') {
    filtered = timelineEvents.filter(e => e.tags && e.tags.includes('wrongful-dismissal'));
  } else if (filterName === 'smoking-gun') {
    filtered = timelineEvents.filter(e => e.tags && e.tags.includes('smoking-gun'));
  }

  console.log(`\n${filterName}: ${filtered.length} events`);

  if (filtered.length > 0 && filtered.length <= 5) {
    filtered.forEach(e => {
      console.log(`  - ${e.timestamp}: ${e.text}`);
      console.log(`    Tags: ${e.tags ? e.tags.join(', ') : 'none'}`);
    });
  } else if (filtered.length > 5) {
    console.log(`  First 3 events:`);
    filtered.slice(0, 3).forEach(e => {
      console.log(`  - ${e.timestamp}: ${e.text}`);
      console.log(`    Tags: ${e.tags ? e.tags.join(', ') : 'none'}`);
    });
  }
});

// Check for events without tags
const noTags = timelineEvents.filter(e => !e.tags || e.tags.length === 0);
console.log(`\n\nEvents without tags: ${noTags.length}`);
if (noTags.length > 0) {
  noTags.forEach(e => {
    console.log(`  - ${e.timestamp}: ${e.text}`);
  });
}
