// Script to add tags to timeline events
const fs = require('fs');

// Read the data file
const dataFile = fs.readFileSync('./js/data.js', 'utf8');

// Function to determine tags for an event
function getTags(event) {
  const tags = [];

  // Critical tag - only priority 'critical'
  if (event.priority === 'critical') {
    tags.push('critical');
  }

  // Smoking gun tag - priority 'nuclear'
  if (event.priority === 'nuclear') {
    tags.push('smoking-gun');
  }

  // Category-based tags
  if (event.category === 'family') {
    tags.push('family');
  }
  if (event.category === 'ohs') {
    tags.push('ohs');
  }
  if (event.category === 'disability') {
    tags.push('disability');
  }

  // Correspondence tag
  if (event.category && event.category.startsWith('correspondence-')) {
    tags.push('correspondence');
  }

  // Lateness tags
  if (event.latenessPersonKey === 'employee') {
    tags.push('lateness-employee');
  }
  if (event.latenessPersonKey === 'boss') {
    tags.push('lateness-boss');
  }
  if (event.latenessPersonKey === 'coworker') {
    tags.push('lateness-coworker');
  }

  // Wrongful dismissal tag - based on current filter logic
  if (event.category === 'termination' ||
      event.category === 'ohs' ||
      event.category === 'family' ||
      event.category === 'disability' ||
      (event.category && event.category.startsWith('correspondence-'))) {
    tags.push('wrongful-dismissal');
  }

  return tags;
}

console.log('Tags assignment logic ready');
console.log('Run this with node to process events');
