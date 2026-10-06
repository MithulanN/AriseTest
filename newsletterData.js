/* ═══════════════════════════════════════════════════════════
   ARISE NEWSLETTERS: EDIT THIS FILE TO ADD OR CHANGE ISSUES
   ───────────────────────────────────────────────────────────
   HOW TO ADD A NEW ISSUE
   1. Put the PDF in the "newsletters" folder
      (example: newsletters/2025-11-monthly.pdf)
   2. Copy one block below (from the { to the },) and paste it
      at the TOP of the list, above the newest issue.
   3. Change the text between the quotes. Do not remove commas
      or quotes. Save. Refresh the website.

   FIELD GUIDE
   type      "monthly" or "weekly" (monthly is shown first on the site)
   date      text shown to readers, e.g. "November 2025"
   title     "Short Headline: Longer description"
             (the part before the colon becomes the big banner)
   summary   2 or 3 sentences about the issue
   highlights  up to 4 short lines, one per sticker
   accent    "blue", "green", "purple", "pink" or "orange"
   pdf       path to the PDF file, e.g. "newsletters/2025-11-monthly.pdf"
             (leave as "" if the PDF is not ready yet)
   image     optional picture, e.g. "images/issue-08.png" (or "")
   caption   optional line under the picture (or "")
═══════════════════════════════════════════════════════════ */

window.ARISE_NEWSLETTERS = [

  {
    type: "monthly",
    date: "October 2025",
    title: "Fall Kickoff: Research Fair Preview and New Member Welcome",
    summary: "Our October issue welcomes new members and looks ahead to the Fall Research Fair, with advice from the professors who will be there.",
    highlights: [
      "A preview of the Fall Research Fair",
      "A Q&A with professors opening their labs to undergraduates",
      "How to write your first email to a professor"
    ],
    accent: "blue",
    pdf: "newsletters/2025-10-monthly.pdf",
    image: "",
    caption: ""
  },

  {
    type: "weekly",
    date: "Week of October 6, 2025",
    title: "This Week: Welcome Social, CV Workshop and Fair Volunteers",
    summary: "A quick look at what is happening on campus this week.",
    highlights: [
      "Welcome social on Wednesday",
      "Sign up to volunteer at the Research Fair"
    ],
    accent: "green",
    pdf: "",
    image: "",
    caption: ""
  },

  {
    type: "monthly",
    date: "September 2025",
    title: "Welcome Back: A New Year, New Opportunities in Undergraduate Research",
    summary: "The back-to-school issue lays out ARISE's fall 2025 programming and gets you ready for the year's first research applications.",
    highlights: [
      "Our full fall programming calendar",
      "An introduction to NSERC USRA applications",
      "A student spotlight on a summer publication"
    ],
    accent: "purple",
    pdf: "",
    image: "",
    caption: ""
  }

];