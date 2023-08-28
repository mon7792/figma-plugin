

# WF Tech


## Web Pages

```mermaid
---
title: Web-page
---
flowchart LR
    HOME --> LOGIN
    HOME --> LOGOUT
    HOME --> APP
    HOME --> PROFILE
```

## Data Model

```mermaid
erDiagram
    USER ||--o{ SVG : contain
    USER {
        string email(unique)
        string google_id
        string google_username
        int credit
        string created_at
    }

    SVG {
        string text_prompt
        string url
        int user_id
    }
```