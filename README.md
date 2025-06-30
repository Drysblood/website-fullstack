# Frontend

Dies ist das Frontend der Fullstack-Website (Angular).

## Projektstruktur

- `src/` – Quellcode der Angular-Anwendung
- `dist/` – Build-Ausgabe (wird automatisch generiert)
- `node_modules/` – Abhängigkeiten (wird automatisch generiert)

## Entwicklung

1. Abhängigkeiten installieren:
   ```bash
   npm install
   ```
2. Entwicklungsserver starten:
   ```bash
   npm start
   ```
   Die App läuft dann meist unter http://localhost:4200

## Build für Produktion

```bash
npm run build
```

## Hinweise
- Die Datei `.gitignore` sorgt dafür, dass `node_modules` und `dist` nicht mit ins Repository gelangen.
- Für Backend siehe Ordner `backend`.

---

**Autor:** Drysblood

---

# Original Angular CLI Hinweise

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
