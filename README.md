# GentleFinance

Aplicación de finanzas personales con React + Vite, autenticación real con Firebase, persistencia en Firestore y carga de archivos a Firebase Storage.

## Requisitos

- Node.js 20+
- Proyecto Firebase configurado (Auth + Firestore + Storage)

## Configuración

1. Instala dependencias:

```bash
npm install
```

2. (Opcional) Crea `.env` para sobreescribir la configuración de Firebase:

```bash
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
```

Si no defines estas variables, la app usa la configuración integrada del proyecto `gentlefinances-c9b79`.

3. Ejecuta en local:

```bash
npm run dev
```

## Reglas e índices de Firebase

Este repositorio incluye:

- `firestore.rules`
- `firestore.indexes.json`
- `storage.rules`
- `firebase.json`

Para desplegar:

```bash
firebase deploy --only firestore:rules,firestore:indexes,storage
```

## Funcionalidades implementadas

- Registro e inicio de sesión reales con Firebase Auth.
- Datos de usuario aislados por `userId` en Firestore (`transactions`, `accounts`, `subscriptions`).
- Perfil de usuario en `users/{uid}`.
- Upload de archivos a `users/{uid}/...` en Firebase Storage con metadatos en `users/{uid}/files`.
- Selector de idioma ES/EN persistido con `i18next`.
