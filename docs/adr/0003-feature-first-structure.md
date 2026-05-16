# ADR 0003 — Feature-first directory structure

**Status:** Accepted  
**Date:** 2026-05-16

## Context

The codebase started as a single `server.js` file. As domain concepts (Question, Vote, User) multiply, the code needs to be split into layers. Two common approaches exist:

- **Layer-first**: group by technical role (`routes/`, `controllers/`, `services/`, `repositories/`)
- **Feature-first**: group by domain concept (`questions/`, `votes/`) with all four layers inside each

## Decision

Feature-first, with four layers inside each feature: router → controller → service → repository.

## Reasons

- All code for one feature lives in one place — easier to navigate and change
- Adding a new feature means adding a new folder, not editing four existing ones
- The domain is already well-defined (see CONTEXT.md), so feature boundaries are stable
- The `app.js` / `server.js` split lets tests import the Express app without booting the server

## Tradeoffs

- Layer-first is what most tutorials show, so it is more familiar to newcomers
- Four files per feature feels heavyweight at small scale
