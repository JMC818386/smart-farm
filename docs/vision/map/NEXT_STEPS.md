# Living Map Integration - Next Steps

## ✅ Completed

1. **Directory Structure Created**
   - `docs/vision/map/sources/` - PDF upload location
   - `docs/architecture/map/` - Technical alignment docs
   - All context files created and committed

2. **Documentation Framework**
   - PDF_SOURCES_INDEX.md - Source tracking
   - PDF_REQUIREMENTS_EXTRACT.md - Component model
   - PDF_ALIGNMENT_NOTES.md - Conflict resolution
   - MAP_IMPLEMENTATION_PROMPTS.md - 8-step build sequence
   - 04_Map.md - Full screen specification

3. **Repository Integration**
   - Updated COMPONENT_CATALOG.md with map components
   - Updated ROUTES.md with /map route
   - All changes committed and pushed

---

## 📋 Next Steps

### Step 1: Upload PDFs

Upload these 4 files to `docs/vision/map/sources/`:
1. `The Living Map of America.pdf`
2. `The Living Map - Interactive, Multi-Depth Visualization System.pdf`
3. `The Living Map - Internal Technical Brief.pdf`
4. `The Living Map - Press Release.pdf`

### Step 2: Execute PROMPT 00 (PDF Ingest)

Once PDFs are uploaded, run:
```
You are Claude Sonnet 4 running inside the SMART-FARM repository.

Load and internalize ALL map requirements from:
- docs/vision/map/sources/The Living Map of America.pdf
- docs/vision/map/sources/The Living Map - Interactive, Multi-Depth Visualization System.pdf
- docs/vision/map/sources/The Living Map - Internal Technical Brief.pdf
- docs/vision/map/sources/The Living Map - Press Release.pdf

Then load these repo specs (must override PDFs where conflicts exist):
- docs/ai/AI_SYSTEM_RULES.md
- docs/ai/BRAND_UI_RULES.md
- docs/ai/COMPONENT_CATALOG.md
- docs/architecture/SOLUTION_CONCEPT.md
- plans/ROUTES.md

Finally, update these context docs ONLY IF needed to reflect the PDFs without adding scope creep:
- docs/vision/map/PDF_SOURCES_INDEX.md
- docs/vision/map/PDF_REQUIREMENTS_EXTRACT.md
- docs/architecture/map/PDF_ALIGNMENT_NOTES.md

Acknowledge when loaded. Do not generate code yet.
```

### Step 3: Execute Remaining Prompts

Follow the sequential prompts in `docs/vision/map/MAP_IMPLEMENTATION_PROMPTS.md`:
- PROMPT 01: Dependencies + Folder Setup
- PROMPT 02: Backend Endpoints
- PROMPT 03: Frontend Store + Queries
- PROMPT 04: Map UI Shell
- PROMPT 05: USLayer Implementation
- PROMPT 06: State + County Layers
- PROMPT 07: Performance Guards
- PROMPT 08: Build Status + Tests

---

## 🎯 Key Constraints

### Motion Rules
- **Default**: Functional transitions only (<250ms)
- **Future**: Cinematic mode as feature flag

### Data Sources
- Mock data only (no external APIs in Phase I)
- TopoJSON files in `plans/data/map/`

### AgriCommand Integration
- All interactions log to LogConsole
- Uses theme.css design tokens
- Copper glow on hover
- Respects BRAND_UI_RULES

---

## 📂 File Locations

```
SMART-FARM/
├─ docs/
│  ├─ vision/
│  │  └─ map/
│  │     ├─ sources/              ← UPLOAD PDFs HERE
│  │     ├─ PDF_SOURCES_INDEX.md
│  │     ├─ PDF_REQUIREMENTS_EXTRACT.md
│  │     └─ MAP_IMPLEMENTATION_PROMPTS.md
│  └─ architecture/
│     └─ map/
│        └─ PDF_ALIGNMENT_NOTES.md
└─ plans/
   └─ screens/
      └─ 04_Map.md
```

---

## 🚀 Current Status

**Phase I**: Complete ✅  
**Map Module**: Ready for PDF upload + implementation  
**Repo**: All documentation committed and pushed

**Ready to proceed once PDFs are uploaded.**
