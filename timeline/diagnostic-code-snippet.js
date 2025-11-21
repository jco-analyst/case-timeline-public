// DIMENSION DIAGNOSTICS - Add this code block in index.html after line 2640 (after all cards positioned)
// This will log comprehensive dimension information to browser console

console.group('🔍 DIMENSION DIAGNOSTICS');

const containerElement = container.node();
const svgElement = svg.node();
const cardsContainerElement = cardsContainer.node();

console.log('📐 Layout Dimensions:');
console.log({
    viewport: {
        width: window.innerWidth,
        height: window.innerHeight
    },
    container: {
        clientWidth: containerElement.clientWidth,
        scrollWidth: containerElement.scrollWidth,
        hasHorizontalScroll: containerElement.scrollWidth > containerElement.clientWidth,
        overflow: (containerElement.scrollWidth - containerElement.clientWidth) + 'px'
    },
    svg: {
        widthVariable: width,
        widthAttribute: svgElement.getAttribute('width'),
        clientWidth: svgElement.clientWidth,
        percentOfContainer: ((width / containerElement.clientWidth) * 100).toFixed(2) + '%',
        margin: {
            left: margin.left,
            right: margin.right,
            calculation: `Math.max(${(containerElement.clientWidth * 0.015).toFixed(1)}, ${minMargin})`
        },
        timelineRange: {
            start: margin.left,
            end: width - margin.right,
            usableWidth: (width - margin.right) - margin.left
        }
    },
    cardsContainer: {
        width: cardsContainerElement.style.width,
        clientWidth: cardsContainerElement.clientWidth,
        offsetLeft: cardsContainerElement.offsetLeft,
        note: 'Cards are positioned relative to this container'
    }
});

// Find edge cards
const allCards = Array.from(document.querySelectorAll('.event-card'));

const leftmostCard = allCards.reduce((min, card) => {
    const left = card.offsetLeft;
    return left < (min.left || Infinity) ? { element: card, left } : min;
}, {});

const rightmostCard = allCards.reduce((max, card) => {
    const right = card.offsetLeft + card.offsetWidth;
    return right > (max.right || 0) ? { element: card, right, left: card.offsetLeft } : max;
}, {});

console.log('\n📍 Edge Card Analysis:');

if (leftmostCard.element) {
    const rect = leftmostCard.element.getBoundingClientRect();
    console.log('Leftmost Card:', {
        eventId: leftmostCard.element.getAttribute('data-event-id'),
        offsetLeft: leftmostCard.left,
        boundingLeft: rect.left,
        extendsOffScreen: rect.left < 0,
        offscreenAmount: rect.left < 0 ? Math.abs(rect.left) + 'px' : '0px'
    });
}

if (rightmostCard.element) {
    const rect = rightmostCard.element.getBoundingClientRect();
    const containerOverflow = rightmostCard.right - containerElement.clientWidth;
    const viewportOverflow = rect.right - window.innerWidth;
    const bodyOverflow = document.body.scrollWidth - document.body.clientWidth;

    console.log('Rightmost Card:', {
        eventId: rightmostCard.element.getAttribute('data-event-id'),
        offsetLeft: rightmostCard.left,
        cardWidth: rightmostCard.element.offsetWidth,
        rightEdge: rightmostCard.right,
        boundingRight: rect.right,
        containerWidth: containerElement.clientWidth,
        containerOverflow: containerOverflow + 'px',
        viewportOverflow: viewportOverflow + 'px',
        causesScroll: containerOverflow > 0 || viewportOverflow > 0
    });
}

console.log('\n🚨 Overflow Detection:');
const bodyHasScroll = document.body.scrollWidth > document.body.clientWidth;
const containerHasScroll = containerElement.scrollWidth > containerElement.clientWidth;

console.log({
    body: {
        clientWidth: document.body.clientWidth,
        scrollWidth: document.body.scrollWidth,
        hasHorizontalScroll: bodyHasScroll,
        overflow: (document.body.scrollWidth - document.body.clientWidth) + 'px'
    },
    container: {
        clientWidth: containerElement.clientWidth,
        scrollWidth: containerElement.scrollWidth,
        hasHorizontalScroll: containerHasScroll,
        overflow: (containerElement.scrollWidth - containerElement.clientWidth) + 'px'
    },
    verdict: bodyHasScroll || containerHasScroll
        ? '⚠️ HORIZONTAL SCROLLBAR DETECTED'
        : '✅ No horizontal scrollbar'
});

// Diagnose SVG vs cards-container mismatch
const svgWidth = parseFloat(svgElement.getAttribute('width'));
const cardsContainerWidth = cardsContainerElement.clientWidth;
const cardsOffset = cardsContainerElement.offsetLeft;

console.log('\n🔧 Layout Mismatch Analysis:');
console.log({
    svgWidth: svgWidth + 'px (97% of container)',
    cardsContainerWidth: cardsContainerWidth + 'px (100% of container)',
    cardsContainerOffset: cardsOffset + 'px (left offset)',
    gap: (cardsContainerWidth - svgWidth) + 'px',
    potentialIssue: cardsOffset > 0
        ? `Cards-container has ${cardsOffset}px left offset but uses SVG coordinates`
        : 'No obvious coordinate system mismatch'
});

// Check month labels
const monthLabels = Array.from(svg.selectAll('.date-label').nodes());
if (monthLabels.length > 0) {
    const rightmostLabel = monthLabels.reduce((max, label) => {
        const bbox = label.getBBox();
        const right = bbox.x + bbox.width;
        return right > (max.right || 0) ? { element: label, right, bbox } : max;
    }, {});

    console.log('\n📅 Month Label Analysis:');
    console.log({
        totalLabels: monthLabels.length,
        rightmostLabel: {
            text: rightmostLabel.element.textContent,
            x: rightmostLabel.bbox.x,
            width: rightmostLabel.bbox.width,
            rightEdge: rightmostLabel.right,
            svgWidth: svgWidth,
            overflow: (rightmostLabel.right - svgWidth) + 'px'
        }
    });
}

console.groupEnd();

// Quick verdict
if (bodyHasScroll || containerHasScroll) {
    console.error('⚠️ HORIZONTAL SCROLLBAR DETECTED - Check diagnostics above');
} else {
    console.info('✅ No horizontal scrollbar - layout is within bounds');
}
