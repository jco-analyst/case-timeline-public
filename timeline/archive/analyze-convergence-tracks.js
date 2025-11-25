#!/usr/bin/env node

// Load the data file by reading it and evaluating
const fs = require('fs');

// Read the data.js file
const dataContent = fs.readFileSync('/media/jonathanco/Backup/s3s/timeline/js/data.js', 'utf8');

// Execute it using eval (in this context it's safe since it's our own data file)
eval(dataContent);

console.log('=== CONVERGENCE TRACK ANALYSIS ===\n');

// Total counts
const totalEvents = timelineEvents.length;
const eventsWithTrack = timelineEvents.filter(e => e.convergenceTrack !== undefined);
const eventsWithoutTrack = timelineEvents.filter(e => e.convergenceTrack === undefined);

console.log(`Total events: ${totalEvents}`);
console.log(`Events WITH convergenceTrack: ${eventsWithTrack.length}`);
console.log(`Events WITHOUT convergenceTrack: ${eventsWithoutTrack.length}`);
console.log(`Percentage with track: ${(eventsWithTrack.length / totalEvents * 100).toFixed(1)}%\n`);

// Distribution by track
const trackCounts = {};
eventsWithTrack.forEach(e => {
  trackCounts[e.convergenceTrack] = (trackCounts[e.convergenceTrack] || 0) + 1;
});

console.log('Events by convergenceTrack:');
Object.keys(trackCounts).sort((a, b) => a - b).forEach(track => {
  console.log(`  Track ${track}: ${trackCounts[track]} events`);
});

console.log('\n=== SAMPLE EVENTS WITH TRACK ===');
eventsWithTrack.slice(0, 5).forEach(e => {
  console.log(`- ${e.timestamp}: ${e.text} (track ${e.convergenceTrack})`);
});

console.log('\n=== SAMPLE EVENTS WITHOUT TRACK (first 10) ===');
eventsWithoutTrack.slice(0, 10).forEach(e => {
  console.log(`- ${e.timestamp}: ${e.text}`);
  console.log(`  Tags: ${(e.tags || []).join(', ')}`);
});

if (eventsWithoutTrack.length > 10) {
  console.log(`\n... and ${eventsWithoutTrack.length - 10} more events without convergenceTrack`);
}

// Check for events that might be important but lack convergenceTrack
const importantWithoutTrack = eventsWithoutTrack.filter(e =>
  e.tags && (
    e.tags.includes('smoking-gun') ||
    e.tags.includes('critical') ||
    e.tags.includes('family') ||
    e.tags.includes('disability') ||
    e.tags.includes('ohs')
  )
);

if (importantWithoutTrack.length > 0) {
  console.log(`\n=== IMPORTANT EVENTS WITHOUT TRACK (${importantWithoutTrack.length}) ===`);
  importantWithoutTrack.forEach(e => {
    console.log(`- ${e.timestamp}: ${e.text}`);
    console.log(`  Tags: ${(e.tags || []).join(', ')}`);
  });
}
