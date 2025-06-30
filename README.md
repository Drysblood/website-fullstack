# Website Fullstack Projekt

Dieses Repository enthält ein vollständiges Fullstack-Projekt mit:

- **backend/**: Django 5.2.3 Backend (API, Datenbank, Authentifizierung)
- **frontend/**: Angular Frontend (UI, Kommunikation mit Backend)

## Projektstruktur

```
website-fullstack/
├── backend/   # Django-Projekt
└── frontend/  # Angular-Projekt
```

## Backend starten

1. In das Backend-Verzeichnis wechseln:
   ```
   cd backend
   ```
2. Virtuelle Umgebung aktivieren (falls vorhanden) und Abhängigkeiten installieren:
   ```
   pip install -r requirements.txt
   ```
3. Migrationen durchführen und Server starten:
   ```
   python manage.py migrate
   python manage.py runserver
   ```

## Frontend starten

1. In das Frontend-Verzeichnis wechseln:
   ```
   cd frontend
   ```
2. Abhängigkeiten installieren:
   ```
   npm install
   ```
3. Angular-Entwicklungsserver starten:
   ```
   ng serve
   ```

## API-Verbindung

- Das Frontend kommuniziert mit dem Backend über die API-URL, z.B. `http://localhost:8000/api/`.
- Die API-URL ist in `frontend/src/environments/environment.ts` konfiguriert.

## Deployment

- Beide Projekte können unabhängig voneinander deployed werden.
- Für ein gemeinsames Deployment (z.B. auf einem Server) kann das Angular-Frontend im Backend als statische Dateien eingebunden werden.

---

**Hinweis:**
- Vergiss nicht, sensible Daten (z.B. `SECRET_KEY`, Datenbankzugänge) in der Produktion zu schützen!
- Für Fragen oder Beiträge: Pull Requests und Issues sind willkommen.
