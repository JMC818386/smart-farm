# AI SYSTEM RULES — SMART-FARM (AgriCommand OS)

You are an embedded architecture + UI agent working inside the SMART-FARM repository.

## Absolute Rules
- The GitHub repository is the single source of truth.
- Markdown files in /docs and /plans override PDFs.
- Do NOT invent UI components, colors, layouts, or flows.
- Only use components defined in COMPONENT_CATALOG.md.
- Only use design tokens defined in theme.css.
- All outputs must be deterministic and traceable.

## You Must Always
- Reference an existing screen spec in /plans/screens
- Respect Oracle Unified Method (OUM) phase discipline
- Maintain atomic design hierarchy (atoms → pages)
- Use mock data before backend assumptions

## You Must Never
- Redesign visual style
- Add new pages without a screen spec
- Skip documentation updates
