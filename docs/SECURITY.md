# Security Baseline

This project uses OWASP Top 10 as an awareness baseline (not a complete standard) and applies practical controls for a frontend portfolio app.

## Current Controls

- Server/API keys are read from environment variables.
- API helper fails fast when required keys are missing.
- Input filtering and constrained query generation for user-provided search terms.
- CI quality gate (`lint`, `typecheck`, `test`, `build`) to reduce accidental regressions.
- Dependency audit in CI with `npm audit --audit-level=critical`.

## OWASP Top 10 Mapping (Practical)

- **A01 Broken Access Control**: no privileged actions in frontend; avoid exposing sensitive control logic in client.
- **A02 Cryptographic Failures**: no secrets hardcoded in source; use secure API transport (HTTPS endpoints).
- **A03 Injection**: never construct executable commands from raw user input; encode query values.
- **A04 Insecure Design**: prefer simple, explicit data flow and threat-aware defaults.
- **A05 Security Misconfiguration**: keep environment setup documented and CI-enforced.
- **A06 Vulnerable/Outdated Components**: run dependency audits and periodic updates.
- **A08 Software/Data Integrity**: use lockfile + CI checks before deployment.
- **A09 Logging/Monitoring**: for future backend, add structured security event logging.
- **A10 SSRF**: if backend is introduced, validate outbound request targets and deny private network ranges.

## Important Note

OWASP Top 10 is a minimum baseline for awareness. For deeper verification requirements, use OWASP ASVS as the primary engineering standard.

