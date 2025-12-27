# SMART-FARM — AgriCommand OS

> Precision Farm Management System — Phase I MVP

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Install Dependencies**

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

2. **Run Development Servers**

```bash
# Terminal 1: Backend (port 3001)
cd backend
npm run dev

# Terminal 2: Frontend (port 3000)
cd frontend
npm run dev
```

3. **Access Application**

Open http://localhost:3000

---

## Project Structure

```
SMART-FARM/
├─ docs/              # All documentation and specifications
│  ├─ ai/            # AI agent rules and component catalog
│  ├─ architecture/  # Solution design documents
│  ├─ governance/    # OUM phase tracking and compliance
│  └─ risks/         # Risk management
├─ plans/            # Screen specs and data schemas
│  ├─ screens/       # Per-page specifications
│  └─ data/          # Mock data schemas
├─ frontend/         # React + Vite + TypeScript
│  └─ src/
│     ├─ components/ # Atomic design hierarchy
│     ├─ pages/      # Route pages
│     ├─ store/      # Zustand state
│     ├─ api/        # Axios client
│     └─ styles/     # Design system tokens
└─ backend/          # Express + JSON mock API
   └─ data/          # Static JSON data files
```

---

## Phase I Features

✅ **Dashboard** — Unified operations overview  
✅ **Fleet Monitoring** — Real-time tractor status  
✅ **Drone Feed** — Multi-drone tracking  
✅ **Weather Integration** — Live conditions  
✅ **Soil Analytics** — NPK + moisture monitoring  
✅ **LogConsole** — System activity tracking  

---

## Architecture

**Frontend Stack:**
- React 18 + Vite
- TypeScript
- Zustand (state)
- Axios (API)
- React Router (routing)

**Backend:**
- Node.js + Express
- Static JSON data (mock)

**Data Flow:**  
`UI → Zustand → Axios → Express → JSON`

---

## Design System

**Colors:**
- Background: `--soil-graphite`
- Active/Data: `--sky-cobalt`
- Success: `--agri-green`
- Alerts: `--harvest-amber`
- Accents: `--accent-copper`

**Typography:**
- Display: Oxanium Bold (ALL CAPS)
- Body: Inter Medium
- Numeric: Inter Mono

**Layout:**
- 12-column grid
- 16px gutters
- 32px outer margin
- 16px border radius

---

## Development Guidelines

1. **Repository First** — All specs must exist in `/docs` or `/plans` before coding
2. **Component Catalog** — Only use components defined in `docs/ai/COMPONENT_CATALOG.md`
3. **Design Tokens** — Use only CSS variables from `theme.css`
4. **Screen Specs** — Reference `/plans/screens/` for page requirements
5. **Logging** — All actions must log to LogConsole

---

## Documentation

- **AI Rules:** [docs/ai/AI_SYSTEM_RULES.md](docs/ai/AI_SYSTEM_RULES.md)
- **Brand Guide:** [docs/ai/BRAND_UI_RULES.md](docs/ai/BRAND_UI_RULES.md)
- **Components:** [docs/ai/COMPONENT_CATALOG.md](docs/ai/COMPONENT_CATALOG.md)
- **Architecture:** [docs/architecture/SOLUTION_CONCEPT.md](docs/architecture/SOLUTION_CONCEPT.md)
- **Phase Status:** [docs/governance/BUILD_STATUS.md](docs/governance/BUILD_STATUS.md)

---

## License

Proprietary — Internal Use Only

---

**Built with precision. Engineered for scale.**
