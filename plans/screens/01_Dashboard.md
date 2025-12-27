# Screen: Dashboard

Goal:
Unified farm operations overview.

Data:
- /api/equipment
- /api/drones
- /api/weather
- /api/soil

Components:
- FleetOverview
- DroneFeedPanel
- WeatherTile
- SoilAnalytics
- LogConsole

States:
loading | normal | alert | empty

Acceptance:
- All panels render from Zustand
- Actions logged
