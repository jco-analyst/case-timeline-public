#!/usr/bin/env python3
"""
Timeline Card Positioning Analyzer

Simulates the card positioning algorithm from index.html
and outputs the same analysis without needing a browser.
"""

import json
import re
from datetime import datetime
from collections import defaultdict

# Constants (matching index.html lines 1038-1047)
CARD_WIDTH = 280
MIN_GAP = 30
LAYERS = {
    'above3': 460,
    'above2': 280,
    'above1': 100,
    'below1': 100,
    'below2': 280,
    'below3': 460
}

def parse_js_data(file_path):
    """Parse the timeline events from data.js"""
    with open(file_path, 'r') as f:
        content = f.read()

    # Extract the timelineEvents array
    match = re.search(r'const timelineEvents = \[(.*?)\];', content, re.DOTALL)
    if not match:
        raise ValueError("Could not find timelineEvents array in data.js")

    # Parse manually - extract events
    events = []
    event_pattern = r'\{[^}]+id:\s*(\d+)[^}]+timestamp:\s*["\']([^"\']+)["\'][^}]+text:\s*["\']([^"\']+)["\'][^}]+category:\s*["\']([^"\']+)["\'][^}]+\}'

    for match in re.finditer(event_pattern, content):
        event_id, timestamp, text, category = match.groups()
        events.append({
            'id': int(event_id),
            'timestamp': timestamp,
            'text': text,
            'category': category
        })

    return events

def simulate_xscale(date_str, min_date, max_date, margin_left, width, margin_right):
    """Simulate D3's scaleTime mapping"""
    # Parse dates
    date = datetime.strptime(date_str, '%Y-%m-%d')
    min_dt = datetime.strptime(min_date, '%Y-%m-%d')
    max_dt = datetime.strptime(max_date, '%Y-%m-%d')

    # Linear interpolation
    range_start = margin_left
    range_end = width - margin_right

    total_duration = (max_dt - min_dt).total_seconds()
    if total_duration == 0:
        return range_start

    date_offset = (date - min_dt).total_seconds()
    ratio = date_offset / total_duration

    return range_start + (ratio * (range_end - range_start))

def try_add_card_to_tier(new_card_x, layer, occupied_layers, container_width, margin):
    """Simulate tryAddCardToTier() from index.html"""
    new_card_left = new_card_x - CARD_WIDTH / 2
    new_card_right = new_card_x + CARD_WIDTH / 2

    # Check bounds
    if new_card_left < margin or new_card_right > container_width - margin:
        return {'success': False}

    # Check overlap with existing cards
    existing_cards = occupied_layers.get(layer, [])
    for existing_card in existing_cards:
        gap = min(new_card_right, existing_card['right']) - max(new_card_left, existing_card['left'])
        if gap > -MIN_GAP:
            return {'success': False}

    return {'success': True, 'offset': 0}

def find_best_position(event_x, prefer_above, occupied_layers, container_width, use_tier3, margin):
    """Simulate findBestPosition() from index.html"""
    if prefer_above:
        try_order = ['above1', 'above2', 'above3', 'below1', 'below2', 'below3'] if use_tier3 else ['above1', 'above2', 'below1', 'below2']
    else:
        try_order = ['below1', 'below2', 'below3', 'above1', 'above2', 'above3'] if use_tier3 else ['below1', 'below2', 'above1', 'above2']

    for layer in try_order:
        result = try_add_card_to_tier(event_x, layer, occupied_layers, container_width, margin)
        if result['success']:
            return {'layer': layer, 'offset': result['offset']}

    # Fallback
    return {'layer': try_order[0], 'offset': 0}

def analyze_positioning(events, view_filter='all', container_width=1200):
    """Simulate the positioning algorithm and generate analysis"""

    # Filter events (simplified - just do 'all' for now)
    filtered_events = events

    # Sort by date
    filtered_events.sort(key=lambda e: e['timestamp'])

    # Calculate min/max dates
    if not filtered_events:
        return {}

    min_date = min(e['timestamp'] for e in filtered_events)
    max_date = max(e['timestamp'] for e in filtered_events)

    # Calculate margins (matching index.html lines 1636-1642)
    width = max(container_width * 0.95, 1000)
    min_margin = CARD_WIDTH / 2 + 20  # 160px
    margin_left = max(container_width * 0.025, min_margin)
    margin_right = max(container_width * 0.025, min_margin)

    # Process events from edges inward (matching index.html line 1668)
    middle_index = len(filtered_events) // 2
    processing_order = []
    for i in range(len(filtered_events)):
        if i % 2 == 0:
            # Even: take from end
            processing_order.append(filtered_events[-(i // 2 + 1)])
        else:
            # Odd: take from start
            processing_order.append(filtered_events[i // 2])

    # Position each card
    occupied_layers = {}
    position_log = {
        'events': [],
        'tiers': defaultdict(list)
    }

    for event in processing_order:
        # Calculate natural X position
        x = simulate_xscale(event['timestamp'], min_date, max_date, margin_left, width, margin_right)

        # Determine preferred direction (alternating)
        prefer_above = event['id'] % 2 == 0

        # Find best position
        use_tier3 = False  # Only true for 'all' view
        position = find_best_position(x, prefer_above, occupied_layers, width, use_tier3, margin_left)

        layer = position['layer']
        offset = position['offset']

        # Calculate card position
        card_center_x = x + offset
        card_left = card_center_x - CARD_WIDTH / 2
        card_right = card_center_x + CARD_WIDTH / 2

        # Calculate flex zone and connector attach point
        FLEX_ZONE = CARD_WIDTH * 0.1  # 28px
        flex_zone_left = card_center_x - FLEX_ZONE
        flex_zone_right = card_center_x + FLEX_ZONE

        if flex_zone_left <= x <= flex_zone_right:
            connector_attach_x = x
        elif x < flex_zone_left:
            connector_attach_x = flex_zone_left
        else:
            connector_attach_x = flex_zone_right

        # Store in occupied layers
        if layer not in occupied_layers:
            occupied_layers[layer] = []
        occupied_layers[layer].append({
            'left': card_left,
            'right': card_right,
            'centerX': card_center_x,
            'eventX': x
        })

        # Log entry
        log_entry = {
            'id': event['id'],
            'text': event['text'][:40],
            'naturalX': round(x),
            'layer': layer,
            'offset': round(offset),
            'cardLeft': round(card_left),
            'cardRight': round(card_right),
            'cardCenter': round(card_center_x),
            'connectorX': round(connector_attach_x),
            'connectorOffset': round(connector_attach_x - x),
            'decision': 'straight' if (offset == 0 and connector_attach_x == x) else 'L-shaped'
        }
        position_log['events'].append(log_entry)
        position_log['tiers'][layer].append(log_entry)

    return position_log

def print_analysis(position_log):
    """Print the positioning analysis"""
    print("\n" + "="*80)
    print("📍 CARD POSITIONING ANALYSIS")
    print("="*80)
    print(f"\nTotal events: {len(position_log['events'])}\n")

    # Print all events table
    print("All Events:")
    print("-" * 140)
    print(f"{'ID':>3} | {'Text':<40} | {'NatX':>5} | {'Layer':<7} | {'Offset':>6} | {'Left':>5} | {'Right':>5} | {'Center':>6} | {'ConnX':>5} | {'Decision':<9}")
    print("-" * 140)

    for event in position_log['events']:
        print(f"{event['id']:3d} | {event['text']:<40} | {event['naturalX']:5d} | {event['layer']:<7} | {event['offset']:6d} | {event['cardLeft']:5d} | {event['cardRight']:5d} | {event['cardCenter']:6d} | {event['connectorX']:5d} | {event['decision']:<9}")

    # Print tier analysis
    print("\n" + "="*80)
    print("TIER ANALYSIS")
    print("="*80)

    for tier in ['above3', 'above2', 'above1', 'below1', 'below2', 'below3']:
        if tier in position_log['tiers'] and position_log['tiers'][tier]:
            cards = sorted(position_log['tiers'][tier], key=lambda c: c['cardLeft'])
            print(f"\n{tier.upper()} ({len(cards)} cards)")
            print("-" * 80)

            # Calculate gaps
            for i in range(len(cards) - 1):
                gap = cards[i + 1]['cardLeft'] - cards[i]['cardRight']
                status = '✓ OK' if gap >= MIN_GAP else '✗ OVERLAP'
                print(f"  Gap between {cards[i]['id']} → {cards[i + 1]['id']}: {round(gap):4d}px (min: {MIN_GAP}px) {status}")

            if len(cards) == 1:
                print(f"  Single card: ID {cards[0]['id']}")

    print("\n" + "="*80 + "\n")

if __name__ == '__main__':
    import sys

    # Parse data
    data_file = '/home/user/wrongful-dismissal-case/timeline/js/data.js'
    print(f"Reading events from {data_file}...")

    try:
        events = parse_js_data(data_file)
        print(f"Found {len(events)} events")

        # Run analysis
        print("\nSimulating positioning algorithm...")
        position_log = analyze_positioning(events)

        # Print results
        print_analysis(position_log)

    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc()
        sys.exit(1)
