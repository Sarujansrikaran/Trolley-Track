# SPL Trolley Track – app prototype

Clickable prototype of the SPL trolley repair-tracking workflow
(register → hospital report → soil sort → engineering → packing check → dispatch),
styled with the SPL UI Style Guide.

## Open it

1. Open this folder in VS Code (**File → Open Folder…**).
2. Install the recommended **Live Server** extension when prompted.
3. Right-click `index.html` → **Open with Live Server**. The page reloads as you save.

You can also just double-click `index.html` to open it in a browser.

## Phone app

On a phone (screens 760 px wide or less) the prototype becomes a phone app: an app bar with the
page name, network status and an account button; a bottom tab bar for users with more than one
page (admin gets **More**); a camera viewfinder for scanning, with the result replacing the
scanner until you tap **Scan another**; bottom-sheet dialogs; and tables shown as cards.

On a desktop, click the **phone icon** in the top bar to preview it in a phone frame
(**Back to desktop** to leave).

### Testing on a real phone (the camera needs https)

Phone browsers only allow the camera on an **https** address (or `localhost`). Opening
`http://<your-PC-IP>:5500` on a phone loads the app, but the scanner shows
"The camera only works on a secure https link". Use one of these instead:

- **VS Code port forwarding (quickest):** start Live Server, open the **Ports** panel
  (View → Open View → Ports), **Forward a Port** → `5500`, sign in to GitHub when asked,
  then right-click the port → **Port Visibility → Public**. Open the `https://….devtunnels.ms`
  address on the phone.
- **ngrok:** `ngrok http 5500`, then open the `https://` address it prints.
- **GitHub Pages:** publish the repo and open its `https://<user>.github.io/…` address.

On the phone, use **Add to Home Screen** to run it like an app (`manifest.webmanifest`,
`icon.svg`, and `apple-touch-icon.png` for iPhone). Without https you can still try every
screen by tapping the demo trolleys under the scanner.

When you change the CSS or JS, bump `?v=` in `index.html` and `APP_VERSION` in `js/app.js`
together. Phones cache hard, and the camera status line shows the version so you can tell
which one is running.

## Project layout

```
index.html        Page shell (top bar, sidebar and content are drawn by app.js)
manifest.webmanifest, icon.svg   Home-screen install for the phone app
css/styles.css    SPL Starter CSS tokens + components, light and dark themes (desktop)
css/mobile.css    Phone app layout (html.phone), organised in numbered sections
js/app.js         Demo data, rendering and all workflow actions
docs/             Workflow notes
```

## Where things are in `js/app.js`

| Look for | What it does |
|---|---|
| `PAGES` | Sidebar pages and their titles |
| `USERS` | Who can sign in and **which pages each role sees** (`pages: [...]`) – edit to change access |
| `bundleLookup()` | Simulated Bundle Nexus lookup: QR label key → asset no. + RFID (cached copy when offline) |
| `seed()` | Demo trolleys, alerts, log and dispatch run – edit to change starting data |
| `REASONS` | Damage Reason list (still an open question with Bundle) |
| `PIN` | Admin PIN: admin sign-in and approval for retiring (demo: `1234`) |
| `appbar()`, `tabbar()` | Phone app bar and bottom tabs (`PREVIEW` = desktop Phone view) |
| `patch()` | Updates the page in place so animations play smoothly (`data-key`, `data-exit`) |
| `pageBody()` | The screen for each page (`case "hospital":`, `case "eng":` …) |
| `renderOverlay()` | Dialogs: report damage, complete repair, retire, PIN keypad, toasts |
| `act()` | Every button action (`data-act="…"` in the HTML) |
| `applyReport()` | Damage report logic: new Reason vs repeat report on the same open Reason |

## Sign-in and access

The app opens on a sign-in screen. Each user only sees their own station:

| User | Role | Sees |
|---|---|---|
| A. Patel | Asset admin (PIN) | Everything |
| J. Tan | Ward staff | Hospital ward |
| M. Rossi | Soil sort operator | Soil sort |
| S. Kumar | Engineering technician | Engineering, RFID portals, Fleet, Activity log |
| R. Singh | Production operator | Production floor |
| L. Nguyen | Packing operator | Packing check |
| D. Walsh | Dispatch | Dispatch |

Non-admins can still retire a trolley, but an admin must approve it by entering the PIN.
In the live app, sign-in would come from Microsoft Entra or a badge rather than a user list.

## Scanning, EPC and RFID portals

**Phones scan one thing: the trolley's QR code or barcode** (one camera scanner, no RFID on phones).
The label holds a Bundle Nexus key (e.g. `BNX-40421A7C`). The app asks Bundle Nexus for the asset
number and **EPC** (the RFID chip number), and every report is stored against that EPC. Offline, it
uses the device's cached Bundle data and says so.

**RFID is read by fixed portals at the laundry**, which tells us where each trolley is:

- **Inbound dock portal**: a trolley's EPC is read as it comes into the laundry. Its location becomes
  *In laundry*, and if it's Faulty or In repair, engineering gets an alert that it's physically here.
- **Dispatch portal**: reads every trolley on a run. On dispatch, each trolley's location becomes
  *At Northside Hospital*.

The **RFID portals** page (admin and engineering) shows both readers, a live feed of EPC reads, and
lets you simulate a trolley arriving. Every trolley's details and the Fleet table show its location.

State is saved in the browser's `localStorage` (`spl-trolley-track-v4`, theme in
`spl-trolley-theme`). Use **Reset demo** on the Fleet page or the sign-in screen, or clear site data, to start over.

## Notes

- Fonts (Roboto, Roboto Mono) load from Google Fonts. For a kiosk with no internet, the
  style guide says to embed them: download the woff2 files into `fonts/` and replace the
  Google Fonts `<link>` in `index.html` with `@font-face` rules at the top of `styles.css`.
- The guide targets 1920 × 1080; the prototype also adapts down to laptop and phone widths.
- No real APIs are called. Bundle Nexus, the RFID portal and scanning are all simulated.
# Trolley-Track
