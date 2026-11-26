# Workflow covered by the prototype

Based on Bundle's draft (23 November 2026) plus SPL changes.

0. **Sign in**: each user sees only their own station's pages (see `USERS` in `js/app.js`).
   Phones scan the QR code or barcode (one scanner). Bundle Nexus resolves it to asset no. + EPC; reports are stored against the EPC.
   Fixed RFID portals read the EPC: inbound dock = trolley is in the laundry (alerts engineering if faulty); dispatch portal = trolley has left on a run.
1. **Register** (Admin): read new tag (barcode, QR, RFID), enter asset no., description, pool customer -> Available. QR -> RFID link saved to Bundle Nexus.
2. **Hospital ward**: scan, report damage (Reason, notes, photo). Red card optional. Offline reports queue and sync.
3. **Soil sort**: every trolley scanned; app-only reports caught; damage can be recorded here -> transfer to engineering (In repair).
4. **Engineering**: queue + alerts; accept, complete repair (work done, time, parts, identity scan) -> Available; or retire (Admin PIN).
4b. **Production floor** (Production operator): scan trolleys in use; Available = OK to use; report damage; anything Faulty, In repair or Retired -> "Flag: found in production" (alerts engineering).
4c. **Reuse a retired trolley** (Engineering, Admin PIN): from the Retired list, choose "Ready to use now" -> Available, or "Repair it first" -> In repair (Reason: Refurbish before reuse). Same QR and EPC, so history carries over.
5. **Packing check**: green AVAILABLE or red UNDER REPAIR; "Notify engineering: found in production".
6. **Dispatch**: portal reads the run; any non-Available trolley blocks the whole dispatch; remove, notify engineering, replace, re-read.
7. **Any stage**: "Report damage on any trolley".

## Open questions
- Barcode symbology and label specification
- Final Reason list and maintenance ownership
- Reporting metrics and dashboard requirements
- Retirement and reuse authority (technician or asset administrator)
- Soil sort permissions
- Dispatch behaviour when offline or a report hasn't synced
- Who receives engineering alerts, and how
- Who may report damage outside the hospital
- QR payload format and the Bundle Nexus lookup API (endpoint, auth, response time)
- QR scans when offline: trust the device's cached Bundle data (prototype does this) or refuse
- Sign-in method (Microsoft Entra, badge, shared device PIN) and the final role-to-page mapping
- Should production, packing and dispatch staff see the Fleet page
