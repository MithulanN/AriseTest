/* ═══════════════════════════════════════════════════════════
   ARISE NEWSLETTERS: EDIT THIS FILE TO ADD OR CHANGE ISSUES
   ───────────────────────────────────────────────────────────
   HOW TO ADD A NEW ISSUE
   1. Put the PDF in the "newsletters" folder
      (example: newsletters/2026-11-monthly.pdf)
   2. Copy one block below (from the { to the },) and paste it
      at the TOP of the list, above the newest issue.
   3. Change the text between the quotes. Do not remove commas
      or quotes. Save. Refresh the website.

   FIELD GUIDE
   type      "monthly" or "weekly" (monthly is shown first on the site)
   date      text shown to readers, e.g. "November 2026"
   title     "Short Headline: Longer description"
             (the part before the colon becomes the big banner)
   summary   2 or 3 sentences about the issue
   highlights  up to 4 short lines, one per sticker
   accent    "blue", "green", "purple", "pink" or "orange"
   pdf       path to the PDF file, e.g. "newsletters/2026-11-monthly.pdf"
             (leave as "" if the PDF is not ready yet)
   image     optional picture, e.g. "images/issue-08.png" (or "")
   caption   optional line under the picture (or "")
═══════════════════════════════════════════════════════════ */

window.ARISE_NEWSLETTERS = [

  {
    type: "monthly",
    date: "October 2026",
    title: "Spooky Season: Meet the Executives and Get Ready for Pumpkinstein",
    summary: "BOO! It's spooky season. This issue sits down with ARISE's co-presidents and vice president for a look at life in and out of the lab, and previews Pumpkinstein on October 14, a Halloween night of pumpkin painting and spooky research topics.",
    highlights: [
      "Presidential Spotlight: a day in the life, memorable moments, and getting through rough patches in research",
      "Vice-Presidential Spotlight: fun facts, favourite moments, hobbies, and goals for ARISE",
      "Events to look forward to: Pumpkinstein on October 14, 5:30 to 7:30 PM in SW 311",
      "PSA: attending brings you one step closer to CCR (co-curricular record) recognition"
    ],
    accent: "orange",
    pdf: "",                       // when the PDF is ready: "newsletters/2026-10-monthly.pdf"
    image: "",
    caption: "Paint and decorate your own Franken-pumpkin body part on October 14!"
  }

];