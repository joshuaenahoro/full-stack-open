# 0.6: New note in Single page app diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: JavaScript intercepts the form submission, preventing the default page reload

    Note right of browser: The note list is updated in the DOM

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note right of browser: The payload is sent as JSON

    activate server
    server-->>browser: 201 created
    deactivate server
```
