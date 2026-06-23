export const OBSERVATIONS = [
  {
    tag: 'May 2026 · Instacart · 3.4M orders · dbt Cloud + BigQuery',
    title: 'The 0.60 reorder rate is technically correct and also meaningless',
    paragraphs: [
      `The Instacart dataset gets cited constantly: 60% of items in a typical order are things the user has ordered before. I spent this week building a dbt transformation layer on top of it to make the data actually trustworthy. First real finding query and the number just fell apart.`,
      `New users (1 to 3 orders) reorder at <strong>0.221</strong>. Veterans (20+ orders) reorder at <strong>0.670</strong>. Same metric, same platform, same dataset: 3x difference. The population average isn't wrong, it's just four completely different behavioral profiles compressed into one number that describes none of them. Any ML reorder prediction model trained on the full population equally is being diluted by new-user noise the whole time. The data only becomes reliable at 10+ orders, when habit has had time to form.`,
      `Also: I'm in this dataset. I ordered groceries the day I ran this query. Yogurt, cottage cheese, produce. Dairy eggs and produce came back as my top two reorder departments at 67% and 65%. Not a surprise. <em>That was just my cart.</em>`,
    ],
    source: {
      text: 'Built in dbt Cloud on BigQuery ·',
      linkText: 'Full project on GitHub ↗',
      linkHref: 'https://github.com/SamieVargas/instacart-project',
      suffix: '',
    },
  },
  {
  tag: 'Apr–May 2026 · Garmin + Life in Pixels · personal biometric data',
  title: 'My nervous system knew about the raccoon before I did',
  paragraphs: [
    `For several nights I was sleeping badly and couldn't explain it. I blamed true crime podcasts. I cancelled plans. I woke up early one Wednesday to exercise instead — and discovered a mama raccoon and her babies had been nesting on my balcony the entire time.`,
    `The Garmin data told the story better than I could. Five consecutive days at a body battery of <strong>5 out of 100</strong> — the absolute floor — before I even knew what the threat was. Sleep score dropped from a baseline of <strong>81 to a floor of 53</strong>. HRV hit 26ms on the worst night. My nervous system was running a background alarm the whole time. It just couldn't tell me what it was tracking.`,
    `The part that surprised me most was after. The raccoons were removed on May 3. I expected to recover immediately. Body battery that day: still 5. Sleep score: 61. It took <strong>8 days</strong> to return to baseline after the threat was fully gone. The nervous system doesn't get the memo. It stays activated on its own timeline, regardless of what the situation actually is. That lag — not the disruption itself — is the thing the data made visible.`,
  ],
  source: {
    text: 'Full story with photos and data →',
    linkText: 'The Raccoon Invoice ↗',
    linkHref: 'https://samievargas.com/raccoon/',
    suffix: '',
  },
},
  {
    tag: 'May 2026 · Life in Pixels · behavioral data',
    title: 'A walk is worth +0.5: what my own mood data showed',
    paragraphs: [
      `I've been logging my daily mood on a 1 to 5 scale for months using a tracker I built. One pattern just kept holding: on days I went for a walk, my average score was <strong>+0.5 points higher</strong>. Not just that day. The following morning too.`,
      `The interesting part isn't whether it holds at scale. It's what the lag says about how recovery actually works. Sleep, stress, and movement don't reset at midnight. That's the thing product teams building wellness features tend to flatten out of their models: the carryover. The day after a hard day matters as much as the hard day itself.`,
    ],
    source: {
      text: 'Tracked via',
      linkText: 'Life in Pixels',
      linkHref: 'https://script.google.com/macros/s/AKfycbwUVS3iL7JTO-XR93eCRDRY_lcFOdWPpa9VIB1hFLatsgtXT9QRfPtgoRJlTstkDis/exec',
      suffix: '— self-built mood and habit tracker.',
    },
  },
  {
    tag: 'May 2026 · Austin Open Data · 21,160 inspection records',
    title: 'Being flagged doesn\'t fix it: follow-up inspections score 8 points lower',
    paragraphs: [
      `I started this by querying every restaurant I actually eat at against the City's public health inspection API. Expected a few outliers in an otherwise fine picture. What I found instead: establishments that failed and got sent for follow-up visits scored an average of <strong>8 points lower</strong> than routine visits. Not higher. Lower. The corrective action loop just isn't closing.`,
      `A second pattern across 84 local brands: scores decay measurably by the <strong>5th or 6th inspection cycle</strong>. Not a dramatic failure, just slow operational erosion that routine visits don't catch until violations are compounding. The part that stuck with me: serial offenders are identifiable before things get bad. The city already has the data. The question is whether anyone's built the workflow to act on it.`,
    ],
    source: {
      text: 'City of Austin Open Data Portal · Austin Public Health Department ·',
      linkText: 'Full analysis on Kaggle ↗',
      linkHref: 'https://www.kaggle.com/code/samievargas/atx-foodie-inspection',
      suffix: '',
    },
  },
  {
    tag: 'May 2026 · Oral-B iO9 · completely unprompted life finding',
    title: 'A toothbrush app fixed something my dentist has been trying to tell me for years',
    paragraphs: [
      `My dentist is lovely. I also know her better than most people in my life at this point because I have spent so much time in that chair. The appointments are long. She is patient. I am not. The dental experience has been, to put it gently, a journey.`,
      `Got a new electric toothbrush with AI zone tracking. It maps your mouth into 16 zones and tells you which ones you actually cleaned. Three days in: it's taking me three minutes to brush properly instead of two, and it turns out I was not, in fact, getting my back molars. I thought I was. I was not.`,
      `The zone map made the problem obvious in about 45 seconds in a way that years of dentist appointments never quite did. Same information, different visibility. I'm not mad about it. I'm just very aware that good data intervention design isn't about telling people what to do. It's about showing them what they're actually doing vs. what they think they're doing. That gap is usually where the whole problem lives.`,
    ],
    source: {
      text: 'Observation from real life ·',
      linkText: 'iO9 on Oral-B ↗',
      linkHref: 'https://oralb.com',
      suffix: '',
    },
  },
  {
    tag: 'May 2026 · reading · Agatha Christie',
    title: 'I\'ve paused my Agatha Christie read-through because I don\'t want Poirot to die',
    paragraphs: [
      `I\'m reading the complete Christie catalog in order. I\'ve been at it for a while and I\'m somewhere in the later Poirot books. He\'s getting old in them. I know how it ends because everyone knows how it ends.`,
      `I keep picking up other things instead. Miss Marple, the standalones, the Tommy and Tuppence books. Not avoiding it exactly. Just not ready. There\'s something about knowing the ending of something you love that makes it hard to move toward.`,
      `I\'ll get there. He deserves a proper send-off and I\'m not going to rush it.`,
    ],
    source: {
      text: 'Personal reading log ·',
      linkText: 'Curtain on Goodreads ↗',
      linkHref: 'https://www.goodreads.com/book/show/77430.Curtain',
      suffix: '',
    },
  },
  {
    tag: 'May 2026 · systems · ADHD',
    title: 'Every productivity system I\'ve ever built has the same failure mode',
    paragraphs: [
      `I have a very good system. I have rebuilt it approximately four times. Each rebuild improves on the last one and also shares the same core problem: it requires me to want to use it at the exact moment I\'m least capable of wanting to use anything.`,
      `The Notion to Google Drive migration this month was the latest version of this. The new system is genuinely better: faster, lower friction, fewer tabs. It will probably work until it doesn\'t, and then I\'ll build the next one.`,
      `I don\'t think this is a failure. I think this is just what maintenance looks like when your brain doesn\'t do it automatically. You rebuild. The rebuilt version is smarter because you know more. That\'s not a flaw in the process, it\'s the process.`,
    ],
    source: {
      text: 'Currently running on Todoist + Google Drive ·',
      linkText: 'Ask me how it\'s going ↗',
      linkHref: 'mailto:sammisnv@gmail.com',
      suffix: '',
    },
  },
];
