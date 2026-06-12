# Session Photos Without Records + Front Camera — Design

**Date:** 2026-06-11
**Goal:** Let the user attach a photo to any session (not only record-breaking ones), and support the front camera on mobile.

## Decisions (from brainstorming)

- Photo option appears **when ending a session** (the "End session and save" action), not as an always-visible button.
- Front camera support via a **flip button** in the camera screen.

## Feature 1: End-session photo prompt

Tapping "End session and save" opens a new `EndSessionModal` (styled like the
record-break modal): shows the session count and two buttons —
**📸 Add a photo** and **Save without photo**.

- *Add a photo*: closes the modal and opens the existing camera flow
  (CameraCapture → PhotoPreview). Saving reuses `handleSavePhoto`, which
  already attaches the photo, ends the session, and navigates to History.
- *Save without photo*: runs the existing end-without-photo logic.
- The record-break celebration modal is unchanged.

New component: `src/components/Counter/EndSessionModal.jsx`.
New translation keys (EN/ES): `endSessionTitle`, `addPhoto`, `saveWithoutPhoto`.

## Feature 2: Front camera

`useCamera` currently hardcodes `facingMode: 'environment'`.

- Add `facingMode` state (default `'environment'`) and a `flipCamera()` that
  stops the current stream and restarts `getUserMedia` with the toggled mode.
- `CameraCapture` gets a flip button (SwitchCamera icon) in the header and
  mirrors the live preview (`-scale-x-100`) when the front camera is active.
- The captured photo is saved natural (unmirrored), like most camera apps.

## Out of scope

- Adding photos to already-saved sessions
- Multiple photos per session
- Translating the record-break modal's hardcoded strings
