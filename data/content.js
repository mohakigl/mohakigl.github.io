/*
  All portfolio content lives here. Edit this file to update the site;
  no changes to HTML, CSS or JS are needed.

  entries[].type   : "job" | "achievement" | "experience"
  entries[].start  : "YYYY-MM" (or "YYYY")
  entries[].end    : "YYYY-MM", "YYYY", or "present" (leave out for one-off achievements)
  entries[].skills : names must match a skill in `skills` exactly, so the
                     skill buttons can light up the right entries.

  Set `sample: false` once the placeholder content below is replaced.
*/
window.PORTFOLIO = {
  sample: true,

  name: "Mohak Singh",
  headline: "I turn messy problems into tools people actually use.",
  location: "Melbourne, Australia",
  now: "Currently: Software Developer at Example Co.",
  summary:
    "This is sample content. Replace it with two or three sentences about what you do, " +
    "what you care about, and the kind of work you want next.",

  links: [
    { label: "Email", url: "mailto:you@example.com" },
    { label: "LinkedIn", url: "https://www.linkedin.com/" },
    { label: "GitHub", url: "https://github.com/mohakigl" },
    { label: "Download CV", url: "#" }
  ],

  skills: [
    { group: "Technical", items: ["Python", "JavaScript", "SQL", "Data analysis", "Git"] },
    { group: "Professional", items: ["Leadership", "Public speaking", "Project management", "Mentoring"] }
  ],

  entries: [
    {
      type: "job",
      title: "Software Developer",
      org: "Example Co.",
      start: "2025-02",
      end: "present",
      summary: "Sample role. Describe what the team does and what you own.",
      details: [
        "Built an internal reporting tool that cut weekly reporting time from 6 hours to 40 minutes.",
        "Led migration of three legacy scripts to a tested Python package."
      ],
      skills: ["Python", "SQL", "Git", "Project management"]
    },
    {
      type: "achievement",
      title: "Winner, University Hackathon",
      org: "Sample University",
      start: "2024-09",
      summary: "Sample achievement. Say what you built, with whom, and what it won.",
      details: ["Team of four; built a live bus-crowding predictor in 36 hours."],
      skills: ["Python", "Data analysis", "Public speaking"]
    },
    {
      type: "experience",
      title: "Volunteer Coding Mentor",
      org: "Community Code Club",
      start: "2023-03",
      end: "2024-12",
      summary: "Sample experience. Volunteering, leadership roles, study abroad, projects.",
      details: ["Mentored 20+ high-school students through their first web projects."],
      skills: ["JavaScript", "Mentoring", "Leadership"]
    },
    {
      type: "job",
      title: "Data Analyst Intern",
      org: "Sample Analytics",
      start: "2023-11",
      end: "2024-02",
      summary: "Sample internship. What you analysed and who used the results.",
      details: ["Produced the dashboard the sales team used for quarterly planning."],
      skills: ["SQL", "Data analysis", "Python"]
    },
    {
      type: "achievement",
      title: "Dean's List",
      org: "Sample University",
      start: "2023",
      summary: "Sample academic honour.",
      details: [],
      skills: []
    }
  ]
};
