# Timeline Evidence - PDF to JPEG Conversion Workflow

## Tool Used
**pdftoppm** (part of poppler-utils package)

## Command
```bash
pdftoppm -jpeg -r 150 "input.pdf" "output-prefix"
```

## Parameters
- `-jpeg` - Output format (JPEG)
- `-r 150` - Resolution (150 DPI - good balance of quality/file size)
- Output files auto-numbered: `output-prefix-1.jpg`, `output-prefix-2.jpg`, etc.

## Example - Medical Records Conversion (Nov 2, 2025)
```bash
# ADHD Urine Test (2 pages)
pdftoppm -jpeg -r 150 \
  "evidence/medical-records/Doctors-Urine.pdf" \
  "timeline/images/evidence/medical-records/2024-01-15_doc_adhd-urine-test"

# CPAP Letter (1 page)
pdftoppm -jpeg -r 150 \
  "evidence/medical-records/Doctors-CPAP.pdf" \
  "timeline/images/evidence/medical-records/2025-02-18_doc_cpap-letter"

# Kinza Sick Note (1 page)
pdftoppm -jpeg -r 150 \
  "evidence/medical-records/Doctors-Kinza-Viral-Cough.pdf" \
  "timeline/images/evidence/medical-records/2025-08-28_doc_kinza-sick-note"
```

## File Naming Convention
`YYYY-MM-DD_{type}_{description}.jpg`

**Types:** `text`, `maps`, `doc`, `photo`

## Alternative Tools Available
- `convert` (ImageMagick)
- `pdftocairo`
- `gs` (Ghostscript)
