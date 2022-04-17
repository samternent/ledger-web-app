![alt text](https://github.com/concords/ledger-web-app/blob/main/public/android-chrome-192x192.png?raw=true#gh-light-mode-only)
![alt text](https://github.com/concords/ledger-web-app/blob/main/public/android-chrome-192x192.png?raw=true#gh-dark-mode-only)

# Ledger Web App

![CodeQL Analysis](https://github.com/concords/ledger-web-app/actions/workflows/codeql-analysis.yml/badge.svg)

Ledger Web App 👉 https://ledger.concords.app

## About the Project

Inspired by Bitcoins blockchain, Concords Ledger is a distributed ledger designed with data portability at its core.

The ledger-web-app runs entirely in the browser, without dependency on a remote server or database. Operations are stored as transactions, directly in the browser on a Proof-Of-Work Blockchain implementation.

Transaction are then executed through lokijs to build a runtime database in the browser to form the application UI and state.

### Features

- Nested Document Structure
- TipTap Document Editor
- Table Data View
- Search
- Tamper-Proof
- Transactional History Log
- Commit Based interactions (git inspired)
- Storage Agnostic
- Solid POD Integration
- OpenPGP & Password Encryption

#### OpenPGP

The project uses [openpgpjs](https://github.com/openpgpjs/openpgpjs) for transaction signing in the blockchain and ledegr encryption. Ledgers may also be encrypted using a password.

#### Solid Pod Integration

There is a native Solid POD integration built into the web app for storing ledgers.

### Transaction Schema

```javascript
{
  collection: "content",
  data: {
    action: "update",
    id: "3b17145e",
    ...
  },
  id: "dffdbcd6ab717e5dee2a6bdc879d3c5de625f7939f35f896b76ca3679fdc9a",
  identity: "",
  signature: "-----BEGIN PGP SIGNATURE-----\n\nwnUEARYKAAYFAmJXUd0AIQkQMY45yYNdevEWIQTTf/9AmA1iPCoKOXQxjjnJ\ng1168TVKAP99AhqfCCs3EnzCxtep+Ckuvp79F09taJfs/ta42KBIUQD9FzaW\n1P7nesJpXwcN6Go/VhcbzRqzybSb+lpOt1xhsAI=\n=0HyR\n-----END PGP SIGNATURE-----\n",
  timestamp: 1649889756801,
}
```
