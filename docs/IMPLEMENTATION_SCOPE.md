# Capacity Connect — Implementation Scope

This source tree is implemented against the three supplied DNAs. The implementation preserves the core product loop, the Design DNA visual system and the Implementation DNA architecture.

## Core connected journey
Organizational need → role → required skills → trainee → diagnostic → current competency → skill gap → course recommendation → trainer recommendation → learning → assessment → trainer support → reassessment → competency growth → certificate → organizational capacity.

## Visual lock
- Poppins for major display/headline typography
- Inter for application text, forms, tables and navigation
- IBM Plex Mono for scores and data values
- Indigo = intelligence
- Blue = connection
- Teal = growth
- Neutral surfaces = foundation

## Important implementation boundary
Local demo mode is intentionally credential-free and does not require Supabase. PostgreSQL schema, organization-aware entities, audit structures and private-resource fields are included for production deployment. Cloud authentication/storage and database credentials must be configured in the target deployment environment.
