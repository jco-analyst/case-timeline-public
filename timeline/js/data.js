// Timeline Event Data for Wrongful Dismissal Case
// Categories: family (red), ohs (orange), disability (yellow), termination (blue), competence (gray)
// Correspondence: correspondence-danielle (green), correspondence-carol (purple), correspondence-michelle (pink)

const timelineEvents = [
  // January 2024 - Employment Begins
  {
    id: 71,
    timestamp: '2024-01-10',
    text: 'First Interview - Family Priority Disclosed',
    category: 'family',
    type: 'point',
    endDate: null,
    tags: ['critical', 'family', 'wrongful-dismissal'],
    description: 'During first interview for Electrical Technician position, employee told boss (John): "Family means everything to me, this is a way to provide for my family." This statement established from day one that family was employee\'s top priority and primary motivation for employment. Boss knew about family obligations before even hiring employee, yet later disciplined and terminated employee for those same family obligations.',
    evidence: [
      'Employee testimony about first interview conversation',
      'Interview notes (if documented by employer)',
      'Context corroborated by Oct 2024-July 2025 accommodation period'
    ],
    evidenceImages: [],
    witnesses: ['Boss (John)', 'HR (possibly present at interview)'],
    legalSignificance: 'CRITICAL FOUNDATION: Employer knew from BEFORE HIRING that family was employee\'s everything. Cannot claim surprise about family obligations. Shows discriminatory motive: Boss KNEW family was priority (told at interview) → Accommodated family obligations Oct 2024-July 2025 → Withdrew accommodation July 20, 2025 ("When we\'re in crunch time, I need you in the shop") → Terminated Oct 22, 2025 (citing family-related lateness). Pattern: Employer used knowledge of family obligations to hire employee, then later weaponized those same obligations to terminate. Alberta Human Rights Act Section 7 protects family status.',
    priority: 'critical',
    icon: '👨‍👩‍👧',
    convergenceTrack: 1,
    causalLinks: [1, 76, 6],
    chainGroup: 'family-status-foundation'
  },

  {
    id: 1,
    timestamp: '2024-01-15',
    text: 'Hired as Electrical Technician',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['wrongful-dismissal'],
    description: 'Started employment at Stage 3 Separation as Electrical Technician. Salary: $65,000/year. During first interview, employee told boss "family means everything to me, this is a way to provide for my family" - establishing from day one that family was employee\'s priority.',
    evidence: [
      'Employment contract',
      'Interview notes (if documented)',
      'Employee testimony about first interview conversation'
    ],
    evidenceImages: [],
    witnesses: ['Boss (John)', 'HR'],
    legalSignificance: 'Employer had knowledge from day one that family was employee\'s top priority. Later disciplined and terminated employee for those same family obligations. Shows employer\'s knowledge of protected ground from beginning of employment. CRITICAL: Contract contains "Dear Rollins:" salutation (wrong employee) - may void contract, worth $10k-$20k if proven. PDF ANALYSIS CONCERN: Technical analysis reveals font subset inconsistencies (different prefixes for same font) suggesting text may have been copy-pasted or altered after original creation. Multiple subset prefixes indicate content from different sources, raising questions about document authenticity.',
    priority: 'medium',
    convergenceTrack: 1,
    causalLinks: [2, 71, 64],
    chainGroup: 'employment-foundation'
  },

  {
    id: 2,
    timestamp: '2024-01-15',
    text: 'ADHD Disclosed (Pre-Employment)',
    category: 'disability',
    type: 'point',
    endDate: null,
    tags: ['disability', 'wrongful-dismissal'],
    description: 'Pre-employment drug test showed amphetamine-based ADHD medication. Employee provided doctor\'s note explaining medication. Boss (John) acknowledged he has ADHD himself and told employee he "understood the struggles." NO accommodations offered from day one.',
    evidence: [
      'Drug test records (employer has)',
      'ADHD doctor\'s note from hiring (employer has)',
      'Boss\'s admission "I understand the struggles"'
    ],
    evidenceImages: [
      {
        type: 'doc',
        file: 'images/evidence/medical-records/2024-01-15_doc_adhd-urine-test-1.jpg',
        caption: 'ADHD urine drug test - Pre-employment disclosure showing amphetamine-based medication. Employer received written medical documentation at hiring (including doctor\'s note). Boss has ADHD too ("I understand the struggles") but no accommodations offered.'
      }
    ],
    witnesses: ['Boss (John)', 'HR'],
    legalSignificance: 'Employer knew about ADHD from day one of employment. Boss has same condition. Employee later disciplined 4-6 times for timecard issues (executive function difficulty related to ADHD). Employer never offered ANY accommodations despite knowing about disability from start. Alberta Human Rights Act protects mental disabilities.',
    priority: 'high',
    icon: '🧠',
    convergenceTrack: 1,
    causalLinks: [9, 75, 27],
    chainGroup: 'disability-disclosure-pattern'
  },

  // Summer 2024 - Hydraulic Troubleshooting Victory
  {
    id: 3,
    timestamp: '2024-07-01',
    text: 'Hydraulic Troubleshooting - Employee Proven Right',
    category: 'competence',
    type: 'range',
    endDate: '2024-07-07',
    tags: ['critical'],
    description: 'Processing tank stand not raising smoothly. Management assumed single-acting hydraulic system, spent 4-7 days troubleshooting (multiple specialist visits, VP personally involved). Employee suggested double-acting system with wrong flow regulator part. Boss ignored suggestion. Eventually called head office - employee was RIGHT. System was double-acting, wrong part installed. Boss explained solution to team without crediting employee. Employee realized "I could not count on management" and started speaking up more proactively about technical and safety issues.',
    evidence: [
      'Work orders/project records',
      'Overtime records from this period',
      'VP involvement (documented)',
      'Coworker testimony'
    ],
    witnesses: ['Coworkers present', 'VP', 'Boss (John)', 'Outside specialists'],
    legalSignificance: 'CRITICAL: This is WHY employee started speaking up more. Employee was proven right after expensive multi-day failure. Boss was shown up by subordinate in front of VP. This established pattern: (1) Employee identifies problem correctly, (2) Management ignores employee, (3) Wastes time/money, (4) Employee proven right, (5) No acknowledgment, (6) Employee continues advocating. Boss perceived increased advocacy as threat. This is the origin of retaliation.',
    priority: 'critical',
    icon: '🔧',
    convergenceTrack: 1,
    causalLinks: [4, 8, 5],
    chainGroup: 'ohs-advocacy-origin'
  },

  // Early 2025 - First Discipline Begins (After Baby Born Oct 2024)
  {
    id: 4,
    timestamp: '2025-01-08',
    text: 'Write-Up #2: First Timecard Write-Up',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['wrongful-dismissal'],
    description: 'First documented timecard discipline - written warning for not filling out timecard (Write-Up #2, date estimated as early January 2025). Timing: After baby born (Oct 9, 2024), after hydraulic troubleshooting incident where employee was proven right. Boss begins building paper trail after being shown up on technical issue. About 6 weeks after return to normal work from new parent obligations. Note: Employer\'s timecard system was fundamentally broken (cannot submit during work hours, automatic lockout after 3 days, boss himself struggled with it, new employees consistently had problems).',
    evidence: [
      'Write-up document (awaiting from employer)',
      'Testimony about broken timecard system',
      'Boss\'s admission he was "notoriously bad" at timecards',
      'Coworker testimony about system problems'
    ],
    witnesses: ['Boss (John)', 'HR', 'New employees who struggled with system'],
    legalSignificance: 'First discipline occurs after employee challenged boss\'s competence. Minor administrative issue weaponized to establish disciplinary record. System was broken by design - employer disciplined employees for failures employer created. Pattern: Boss threatens termination for timecards (told story about field hand forced to work without pay).',
    priority: 'high',
    convergenceTrack: 2,
    causalLinks: [3, 8, 78, 75],
    chainGroup: 'pretextual-discipline-foundation'
  },

  {
    id: 78,
    timestamp: '2024-09-20?',
    text: 'Boss\'s Field Hand Wage Theft Intimidation Story',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['bad-faith', 'wrongful-dismissal'],
    description: 'During discussions about employee\'s timecard issues (likely around Write-Up #2 or timecard discipline meetings), boss told intimidation story about previous field hand employee: Field hand repeatedly forgot to submit timecards. Boss gave ultimatum: (1) Admit you forgot timecard → Get fired immediately, OR (2) Don\'t submit timecard → Don\'t get paid for hours worked. FIELD HAND CHOSE TO WORK WITHOUT PAY to avoid termination. Boss told this story to intimidate employee about timecard compliance consequences. CRITICAL: This is WAGE THEFT - Alberta Employment Standards Code requires employers pay for all hours worked, regardless of timecard submission. Boss bragged about illegal conduct (forcing employee to forfeit wages) as intimidation tactic. Story part of broader pattern: Boss threatened employee with termination 10+ times throughout employment, creating coercive environment where employee signed write-ups under duress.',
    evidence: [
      'Employee testimony (heard story directly from boss)',
      'Context: Told during timecard discipline discussions',
      'Pattern evidence: 10+ termination threats throughout employment',
      'Alberta Employment Standards Code (wage theft violation)'
    ],
    evidenceImages: [],
    witnesses: ['Employee (direct recipient of story)', 'Boss (John) - told the story', 'Possibly HR (Michelle) - unclear if present when story told'],
    legalSignificance: 'SMOKING GUN FOR BAD FAITH: Boss admitted to illegal wage theft (forcing field hand to work without pay = Alberta Employment Standards violation) to intimidate employee. Proves: (1) Boss\'s management style based on FEAR and THREATS, not constructive discipline, (2) Boss weaponizes timecard system to control/intimidate workers, (3) Pattern of illegal coercion (not just with this employee), (4) Explains why employee signed write-ups without objection - intimidated by boss\'s threats of extreme consequences (termination or wage forfeit), (5) Undermines just cause defense - progressive discipline in coercive environment is NOT legitimate performance management. WALLACE DAMAGES: Bad faith manner of dismissal. Boss created poisoned work environment through threats and intimidation. Employee worked under duress knowing boss would use illegal tactics (wage theft) if employee didn\'t comply. This story connects to: Write-Up #2 (timecard discipline), "Last Chance" meeting (July/Aug 2025, 10+ threats pattern), termination Oct 22 (end of intimidation campaign).',
    priority: 'high',
    icon: '💰',
    convergenceTrack: 2,
    causalLinks: [4, 24, 35],
    chainGroup: 'coercive-work-environment'
  },

  {
    id: 5,
    timestamp: '2024-10-01?',
    text: 'Confined Space Safety Meeting - Sent Home for Advocacy',
    category: 'ohs',
    type: 'point',
    endDate: null,
    tags: ['critical', 'ohs', 'wrongful-dismissal'],
    description: 'Employee raised legitimate PPE concerns at safety meeting: debris flying into eyes despite safety glasses while working inside 10+ year old processing tanks (high-pressure washing, sanding rust, chemical residue). Requested full face mask. Employer refused - claimed MSDS showed chemicals not harmful. Employee rebutted: "Regardless of MSDS, debris flying into our eyes. Tanks not 100% clean. Just because MSDS says safe doesn\'t mean it is." Told safety manager "you don\'t really care about us." Safety manager got upset. Employee SENT HOME from safety meeting for being "too passionate about safety." NO formal write-up, but removed from safety discussion for advocating for worker protection.',
    evidence: [
      'Any safety meeting minutes (if documented)',
      'Safety Culture app submissions by employee',
      'Confined space procedures implemented AFTER this meeting (proves employee was right)',
      'Coworker testimony (Ramon and RJ present)',
      'Rescue team documentation created AFTER incident'
    ],
    witnesses: ['Ramon (coworker at meeting)', 'RJ (coworker at meeting)', 'Safety manager', 'Boss (Manager)'],
    legalSignificance: 'OHS Act Section 35 protects workers who raise safety concerns. Sending employee home from safety meeting = retaliation for protected activity. CRITICAL: After this meeting, employer implemented confined space entry procedures, rescue team, and rescue plan - proving employee\'s concerns were 100% valid. Employer wouldn\'t implement these procedures if work wasn\'t hazardous. PATTERN: Employee raises legitimate concern → Employer retaliates → Employee proven right.',
    priority: 'critical',
    icon: '⚠️',
    convergenceTrack: 2,
    causalLinks: [26, 25, 62, 63],
    chainGroup: 'ohs-retaliation-pattern'
  },

  // October 2024 - Baby Born & Family Obligations Begin
  {
    id: 6,
    timestamp: '2024-10-09',
    text: 'Baby Born',
    category: 'family',
    type: 'point',
    endDate: null,
    tags: ['critical', 'family', 'wrongful-dismissal'],
    description: 'Employee\'s daughter born October 9, 2024. Child born into family where employee already told employer (first interview) that "family means everything to me." This marks beginning of childcare-related lateness and absences. Child too young to be admitted to daycare (legal/policy barrier, not choice).',
    evidence: [
      'Birth certificate',
      'Medical records'
    ],
    witnesses: ['Wife', 'Family members'],
    legalSignificance: 'Marks beginning of family status obligations that employer later used as basis for "just cause" termination. Childcare lateness is protected under Alberta Human Rights Act. Employer knew from day one family was priority, yet disciplined for family obligations after child born. Timeline overlap: First hydraulic write-up occurred around same time as child\'s birth.',
    priority: 'critical',
    icon: '👶',
    convergenceTrack: 2,
    causalLinks: [76, 10, 11, 12, 13, 14, 15],
    chainGroup: 'family-status-trigger'
  },

  {
    id: 76,
    timestamp: '2024-10-15',
    text: '9-MONTH ACCOMMODATION: "Being Late is Okay"',
    category: 'family',
    type: 'range',
    endDate: '2025-07-20',
    tags: ['critical', 'smoking-gun', 'family', 'wrongful-dismissal'],
    description: 'Around the time baby was born (October 2024), boss (John) told employee: "Being late is okay. Just let me know in advance" and "Taking days off is okay. Just let me know in advance." This was VERBAL ONLY (no written policy). Accommodation lasted 9 MONTHS (Oct 2024 - July 20, 2025). Employee complied 100% - texted boss every single time before/during lateness (13+ documented notifications), never failed to notify, made up time when possible. Employer explicitly deemed childcare-related lateness "okay" with advance notice. ACCOMMODATION WORKED: No undue hardship for 9 months, no business disruption, employee provided consistent notice. Accommodation ended July 20, 2025 (turning point) when employee refused Sunday midnight work to care for baby. Boss withdrew accommodation as PUNISHMENT for asserting family boundary.',
    evidence: [
      'Employee testimony (boss\'s direct statement)',
      '13+ text message notifications showing 100% compliance',
      'Pattern: NO discipline during 9-month accommodation period',
      'Oct 2024-July 2025 timecard records',
      'July 20-21 turning point (accommodation withdrawal)',
      'Post-July 20: ALL accommodation requests denied'
    ],
    evidenceImages: [],
    witnesses: ['Boss (John) - made statement', 'Wife - aware of arrangement', 'Coworkers - witnessed employee texting boss'],
    legalSignificance: 'SMOKING GUN: Proves employer CAN accommodate family status without undue hardship (did so successfully for 9 months). Employer CANNOT establish just cause for behavior employer previously deemed "okay." Accommodation withdrawal was RETALIATION for July 20 family boundary assertion. Alberta Human Rights: Once employer accommodates protected ground, withdrawal = discrimination. Pattern: (1) Oct 2024: "Being late is okay, just notify" → (2) July 20, 2025: Employee asserts family boundary → (3) July 21: Boss says "doesn\'t matter what happens at home" → (4) Aug-Oct: ALL requests denied → (5) Oct 22: Terminated. This proves lateness was NEVER the real issue - issue was employer refusing to tolerate employee prioritizing family over unlimited work demands. If lateness + notification was acceptable Oct 2024-July 2025, employer cannot claim same conduct is "just cause" in Aug-Oct 2025. FATAL to just cause defense.',
    priority: 'nuclear',
    icon: '✅',
    convergenceTrack: 1,
    causalLinks: [6, 10, 21, 22],
    chainGroup: 'family-accommodation-and-withdrawal'
  },

  {
    id: 8,
    timestamp: '2024-10-25',
    text: 'Hydraulic Lines Write-Up - Safety Research Punished',
    category: 'ohs',
    type: 'point',
    endDate: null,
    tags: ['critical', 'ohs', 'wrongful-dismissal'],
    description: 'Three meetings around hydraulic line installation project: (1) Safety training on portal system - employee wore headphones from being outside, researched hydraulic fitting methods on phone during training. (2) VP meeting discussing "what we can do better" after multiple installation failures - employee challenged VP and boss about fitting and alternative installation methods, suggested Loctite for hydraulic lines. (3) Disciplinary meeting - formal written warning for "using headphones during safety meeting" claiming prior warning (employee never heard of policy before). Verbal warning: "Shouldn\'t have spoken to VP like that." Boss perceived technical input as "talking back." Character label "aggressive behavior" emerged. Employee signed blank without objections - intimidated, needed job.',
    evidence: [
      'Written warning (saw briefly in Outlook before access cut)',
      'Project records showing hydraulic failures',
      'Work orders for specialists called in',
      'Coworker testimony - entire team uncomfortable with work'
    ],
    witnesses: ['Ramon (coworker)', 'RJ (coworker)', 'Louis (coworker)', 'Boss', 'VP', 'HR (possibly)'],
    legalSignificance: 'Pretextual discipline - formal write-up says "headphones/safety violation" but verbal warning reveals real issue: challenging leadership in front of VP. Employee was doing due diligence on ongoing safety failures. Employer simultaneously requires phones for safety compliance (door access, safety observations) but disciplines for phone use. Contradictory policies. First negative feedback ever - prior to this, no documented performance issues. Timing: Same month as baby\'s birth. PATTERN: Safety advocacy → Immediate discipline.',
    priority: 'critical',
    icon: '🎧',
    convergenceTrack: 2,
    causalLinks: [3, 5, 4],
    chainGroup: 'ohs-retaliation-pattern'
  },

  // 2025 Timeline Begins

  {
    id: 9,
    timestamp: '2025-02-18',
    text: 'Sleep Apnea Diagnosed - Second Disability Disclosed',
    category: 'disability',
    type: 'point',
    endDate: null,
    tags: ['critical', 'disability', 'wrongful-dismissal'],
    description: 'Sleep study results: MODERATE sleep apnea diagnosed. Employee told boss and provided doctor\'s letter dated Feb 18, 2025. Boss (John) has sleep apnea himself - employee discussed condition with him. CPAP machine prescribed and purchased. NO accommodations offered (no flexible start time, no grace period, nothing). ALL 13 documented lateness incidents (April-October 2025) occurred AFTER employer knew about diagnosis.',
    evidence: [
      'Sleep study results',
      'Doctor\'s letter dated Feb 18, 2025',
      'CPAP prescription',
      'Boss\'s acknowledgment of diagnosis'
    ],
    evidenceImages: [
      {
        type: 'doc',
        file: 'images/evidence/medical-records/2025-02-18_doc_cpap-letter-1.jpg',
        caption: 'CRITICAL: Doctor\'s letter diagnosing MODERATE sleep apnea. CPAP prescribed. Employer knew from Feb 2025 but never accommodated. Boss has same condition ("I understand the struggles") but disciplined employee for lateness related to sleep disorder.'
      }
    ],
    witnesses: ['Boss (John)', 'Wife', 'Doctor'],
    legalSignificance: 'Employer knew about sleep apnea from February 2025. Boss has same condition. Sleep apnea causes difficulty waking to alarms, chronic fatigue, sleep disruption. All subsequent lateness discipline occurred AFTER employer knew. Employer NEVER offered ANY accommodations despite knowing employee had medical condition affecting sleep/wake cycles. Alberta Human Rights Act protects physical disabilities. Cannot discipline for disability-related behaviors without first attempting accommodation.',
    priority: 'critical',
    icon: '😴',
    convergenceTrack: 1,
    causalLinks: [2, 15, 25, 27],
    chainGroup: 'disability-sleep-apnea'
  },

  // March-May 2025 - Meeting Time Change & Paper Trail Building

  {
    id: 72,
    timestamp: '2025-04-01?',
    text: 'Meeting Time Changed - 8:00 AM → 7:30 AM',
    category: 'family',
    type: 'point',
    endDate: null,
    tags: ['family', 'bad-faith', 'wrongful-dismissal'],
    description: 'Employer changed morning meeting start time from 8:00 AM to 7:30 AM (approximate timeframe: March-May 2025, exact date being confirmed with coworkers). This eliminated the 30-minute buffer period (7:30-8:00 AM) and created MORE opportunities for employee to be "late." Timing correlates with text notification system implementation (building paper trail) and accommodation withdrawal pattern leading to Oct 22 termination. Meeting purpose: Daily recaps with tasks already planned in Jira on Wednesdays - earlier start served no clear business purpose but made childcare drop-off significantly harder. Employee initially late to new 7:30 AM time (early morning childcare difficulty), then started arriving 15 minutes EARLY on June 3, 2025 and maintained early arrival pattern (witness testimony: Ramon noticed "You\'re here early!").',
    evidence: [
      'Email/text announcement of meeting time change (if exists)',
      'Employee testimony about change timing',
      'Coworker testimony confirming approximate timeframe',
      'Ramon witness testimony about June 3 early arrival',
      'Pattern: Text system (Mar-May) + Meeting change (Mar-May) + Accommodation withdrawal (July 20)',
      'Jira records showing tasks already planned on Wednesdays'
    ],
    evidenceImages: [],
    witnesses: ['Coworkers (can confirm timing)', 'Ramon (witnessed early arrival pattern)', 'Boss (John)'],
    legalSignificance: 'PREMEDITATED PAPER TRAIL BUILDING: Meeting time change created MORE discipline opportunities at SAME TIME employer building text notification system. Pattern suggests intentional setup: (1) Change meeting 30 min earlier (harder for childcare), (2) Build text notification system (document lateness), (3) Withdraw accommodation July 20, (4) Terminate Oct 22. Legal significance: May show DISCRIMINATORY MOTIVE - employer deliberately created conditions making it harder for employee with family obligations to arrive on time, then used resulting lateness as pretext for termination. Employee response: Started arriving 15 min EARLY (witness: Ramon) - shows good faith effort. Despite arriving early for months, still terminated. Completely undermines "just cause" - how can conduct "destroy employment relationship" when employee arriving EARLY? Alberta Human Rights Act Section 7 protects family status.',
    priority: 'high',
    icon: '🕐',
    convergenceTrack: 2,
    causalLinks: [10, 11, 12, 73],
    chainGroup: 'premeditated-paper-trail'
  },

  // April-June 2025 - Documented Lateness Pattern

  {
    id: 10,
    timestamp: '2025-04-30',
    text: 'Lateness Notification (Apr 30)',
    category: 'family',
    type: 'point',
    endDate: null,
    tags: ['family', 'lateness-employee', 'wrongful-dismissal'],
    description: 'Employee texted boss about being late. "Couple of minutes late." Reason not specified but likely childcare-related given pattern (7-month-old baby at home). Employee ALWAYS proactively notified boss when running late. Made up time by working through lunch or staying late.',
    evidence: [
      'Text message to boss (employee has)',
      'Timecard showing actual hours worked',
      'Pattern of proactive communication'
    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/lateness-notifications/Apr-30-2025-Late.jpg',
        caption: 'Wed Apr 30 at 7:02 AM. Employee: "Hey John I\'m gonna be a few mins late this morning". Simple proactive notification. First documented lateness in pattern. Sleep apnea diagnosed Feb 18 2025.'
      }
    ],
    witnesses: ['Boss (John)'],
    legalSignificance: 'Part of lateness pattern used to justify termination. Employee communicated proactively 100% of time. Made up time. No time theft. Lateness minimal (couple of minutes). Frequency: ~1.67 incidents/month over 6 months. 54% of documented lateness/absences directly tied to family caregiving. Protected under family status (Alberta Human Rights Act). No accommodation offered.',
    latenessPersonKey: 'employee',
    priority: 'low'
  },

  {
    id: 38,
    timestamp: '2025-05-16',
    text: 'Boss Missing Meeting - Differential Treatment',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['lateness-boss', 'wrongful-dismissal'],
    description: 'Boss John missing morning meeting. Pattern of boss unavailability/lateness begins. Shows boss also had attendance issues but was never disciplined. DIFFERENTIAL TREATMENT: Employee disciplined for minor lateness (couple minutes), but boss missing entire meetings without consequences.',
    evidence: ['Text messages showing boss missing meeting'],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/boss-lateness/May-16-2025-John-Missing-Meeting.jpg',
        caption: 'Fri May 16. Boss John missing meeting. Pattern of boss unavailability/lateness predating employee\'s discipline. DIFFERENTIAL TREATMENT: Boss not disciplined for missing meetings, but employee disciplined for being couple minutes late.'
      }
    ],
    witnesses: ['Team members at meeting', 'Coworkers'],
    legalSignificance: 'CRITICAL for differential treatment claim. Boss exhibits same/worse behavior (missing entire meetings vs employee being couple minutes late) but faces NO discipline. Employer holds employee to stricter standard. Alberta Human Rights Act prohibits discriminatory application of workplace rules. Pattern: Boss late/missing May-August → Employee disciplined for minor lateness April-October → Proves discriminatory motive (family status + parental leave retaliation).',
    latenessPersonKey: 'boss',
    priority: 'high',
    icon: '⚖️'
  },

  {
    id: 11,
    timestamp: '2025-05-23',
    text: 'Lateness Notification (May 23)',
    category: 'family',
    type: 'point',
    endDate: null,
    tags: ['family', 'lateness-employee', 'wrongful-dismissal'],
    description: 'Employee texted boss about being late. "Couple of minutes late." GPS proves actually 3 min late. Texted exactly at start time (7:00 AM) showing last-minute wake difficulty - sleep apnea symptom.',
    evidence: ['Text message to boss', 'GPS location proof showing 3 min late'],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/lateness-notifications/May-23-2025-Late.jpg',
        caption: 'Fri May 23 at 7:00 AM. Employee: "Good morning John, gonna be a few mins late today". Polite proactive notification AT scheduled start time (7 AM).'
      },
      {
        type: 'doc',
        file: 'images/evidence/gps-proofs/May-23-2025-3min-Late.jpg',
        caption: 'GPS Timeline: Fri May 23 2025. Left home 7:01 AM. Arrived 7:33 AM. Confirms 3 min late. Text sent exactly at start time before leaving home = proactive communication.'
      }
    ],
    witnesses: ['Boss (John)'],
    legalSignificance: 'Part of family status pattern. Employee proactively communicated. Minimal lateness (3 min). Texted at exact start time showing wake difficulty (sleep apnea diagnosed Feb 18). GPS proves objective facts.',
    latenessPersonKey: 'employee',
    priority: 'low'
  },

  {
    id: 12,
    timestamp: '2025-05-29',
    text: 'Lateness Notification (May 29)',
    category: 'family',
    type: 'point',
    endDate: null,
    tags: ['family', 'lateness-employee', 'wrongful-dismissal'],
    description: 'Employee texted boss about being late. "Couple of minutes late." GPS shows actually 9 min late. Text sent 1 min before leaving home = proactive communication.',
    evidence: ['Text message to boss', 'GPS location proof showing 9 min late'],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/lateness-notifications/May-29-2025-Late.jpg',
        caption: 'Thu May 29 at 7:02 AM. Employee: "Hey John gonna run a couple mins late". Simple proactive notification.'
      },
      {
        type: 'doc',
        file: 'images/evidence/gps-proofs/May-29-2025-9min-Late.jpg',
        caption: 'GPS Timeline: Thu May 29 2025. Left home 7:03 AM. Arrived 7:39 AM. Confirms 9 min late. Text sent 1 min before departure = good faith proactive communication.'
      }
    ],
    witnesses: ['Boss (John)'],
    legalSignificance: 'Part of family status pattern. Employee proactively communicated before even leaving. GPS confirms objective facts. Sleep apnea factor (disability).',
    latenessPersonKey: 'employee',
    priority: 'low'
  },

  {
    id: 39,
    timestamp: '2025-05-28',
    text: 'Boss Late - Pattern Continues',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['lateness-boss', 'wrongful-dismissal'],
    description: 'Boss John late to work. Pattern continues from May 16. DIFFERENTIAL TREATMENT: Employee disciplined for being couple minutes late with proactive communication + GPS proof + making up time. Boss late/missing without consequences. Proves employer holds employee to discriminatory double standard.',
    evidence: ['Text messages about boss lateness'],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/boss-lateness/May-28-2025-John-Late.jpg',
        caption: 'Tue May 28. Boss John late. Second documented instance in pattern (May 16 missing meeting, May 28 late). Employee disciplined for same behavior. Differential treatment proves discriminatory motive.'
      }
    ],
    witnesses: ['Coworkers'],
    legalSignificance: 'Second documented instance of boss lateness/unavailability without discipline. Compare to employee: (1) Employee late couple minutes → disciplined, (2) Employee proactively communicated → boss didn\'t, (3) Employee made up time → boss didn\'t, (4) Employee provided GPS proof → boss no proof, (5) Employee has disability (sleep apnea) → employer knew and discriminated anyway. CRITICAL: Pattern of differential treatment spanning May-August proves discriminatory motive.',
    latenessPersonKey: 'boss',
    priority: 'high',
    icon: '⚖️'
  },

  {
    id: 13,
    timestamp: '2025-06-04',
    text: 'Child Medical Appointment',
    category: 'family',
    type: 'point',
    endDate: null,
    tags: ['family', 'wrongful-dismissal'],
    description: 'Employee texted boss about taking extra 30 minutes at lunch to take child to medical appointment. Attempted to schedule during lunch to minimize work disruption. Time likely made up same day (employee\'s standard practice).',
    evidence: [
      'Text message to boss',
      'Medical appointment records (if available)'
    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/lateness-notifications/Jun-04-2025-Lunch-Break.jpg',
        caption: 'Wed Jun 4 at 11:10 AM. Employee: "Hey john my wife just called and ask me if I could take care of the kid while she is at her appointment. They weren\'t allowing her to take the baby in. Can I take an extra 30 mins at lunch?" Boss: "That\'s fine". CRITICAL: Boss APPROVED childcare accommodation in June. Compare to July 20 withdrawal = discrimination pattern.'
      }
    ],
    witnesses: ['Boss (John)', 'Wife', 'Doctor\'s office'],
    legalSignificance: 'Protected family obligation - child\'s medical care. Boss APPROVED accommodation. Shows employer CAN and DID accommodate childcare needs. June approval vs July 20 withdrawal = discrimination pattern evidence.',
    priority: 'medium',
    icon: '🏥'
  },

  {
    id: 14,
    timestamp: '2025-06-13',
    text: 'Sick Child Care - Employer APPROVED',
    category: 'family',
    type: 'point',
    endDate: null,
    tags: ['critical', 'family', 'wrongful-dismissal'],
    description: 'Employee\'s daughter (Kinza) sick night before. Employee texted boss: "Hey John, Kinza wasn\'t feeling too well last night. Can I take the morning off? I\'ll try to make it back for lunch." Boss responded: "Yes you\'re good. Thanks for letting me know" (APPROVED). Daughter still sick, employee could not return for afternoon. Emergency childcare for sick child - cannot leave sick child unattended. CRITICAL: This absence later appeared on Write-Up #3 as part of the progressive discipline pattern. Employer APPROVED the accommodation in June, but then later used it as justification for discipline - proving the write-ups were pretextual.',
    evidence: [
      'Text message exchange (HAVE THIS - CRITICAL)',
      'Write-Up #3 (references this absence)',
      'Wife testimony',
      'Medical records if daughter seen by doctor'
    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/lateness-notifications/June-13-2025-Sick-Child-APPROVED.jpg',
        caption: 'Thu June 13. Employee: "Hey John Kinza wasn\'t feeling too well last night. Can I take the morning off?" Boss: "Yes you\'re good. Thanks for letting me know". SMOKING GUN: Boss APPROVED sick child accommodation. Later appeared on Write-Up #3. Proves boss approved then disciplined for same event = pretext. Compare to Aug 28 denial = differential treatment over time.'
      }
    ],
    witnesses: ['Boss (John) - approved request', 'Wife'],
    legalSignificance: 'SMOKING GUN: Employer ACCOMMODATED family needs in June, but DENIED similar request Aug 28. Boss\'s approval proves employer understood this was legitimate family obligation. Protected family status leave (caring for sick child). CRITICAL: Employer later used this APPROVED absence on Write-Up #3 as part of progressive discipline pattern - proves discipline was pretextual (can\'t approve accommodation then punish for using it). Pattern: June 13 approve accommodation → Use it against employee in write-up → Aug 28 deny similar request → Oct 22 terminate = family status discrimination + pretextual discipline.',
    priority: 'critical',
    icon: '🤒'
  },

  {
    id: 15,
    timestamp: '2025-06-18',
    text: 'Missed Alarm - Sleep Deprivation',
    category: 'disability',
    type: 'point',
    endDate: null,
    tags: ['disability', 'lateness-employee', 'wrongful-dismissal'],
    description: 'Employee missed alarm. Texted boss about heading to work. "Less than an hour late" - longest single lateness documented. Likely sleep deprivation from caring for 8-month-old baby (born October 2024). Connection to BOTH sleep apnea (disability) AND childcare sleep disruption (family status).',
    evidence: [
      'Text message to boss',
      'GPS location proof',
      'Sleep apnea diagnosis (Feb 18, 2025) - employer knew',
      'Pattern of night wakings with infant'
    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/lateness-notifications/Jun-18-2025-Late.jpg',
        caption: 'Wed Jun 18 at 7:39 AM. Employee: "Sorry John miss my alarm clock. Getting up and heading in now". CRITICAL: Missed alarm = sleep apnea symptom (difficulty waking). Employer knew about sleep apnea diagnosis from Feb 18 2025 but disciplined anyway.'
      },
      {
        type: 'doc',
        file: 'images/evidence/gps-proofs/Jun-18-2025-3min-Late.jpg',
        caption: 'GPS Timeline: Wed Jun 18 2025. Text at 7:39 AM. Left home 7:55 AM (16 min after text). PROVES alarm was actually missed (sleep apnea symptom). 16-min delay from wake-up to departure shows real difficulty waking. Employer knew about disability since Feb 18.'
      }
    ],
    witnesses: ['Boss (John)', 'Wife'],
    legalSignificance: 'Employer knew employee had sleep apnea (diagnosed Feb 18). GPS PROVES missed alarm (sleep disorder symptom). ALSO related to sleep deprivation from caring for 8-month-old infant (family status). Employer never offered accommodation for known disability. Disciplining for disability-related behavior without accommodation violates Alberta Human Rights Act.',
    latenessPersonKey: 'employee',
    priority: 'medium'
  },

  {
    id: 16,
    timestamp: '2025-06-19',
    text: 'Brake Repair During Lunch',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['wrongful-dismissal'],
    description: 'Employee needed brake parts for car (safety-critical repair). Texted boss about being late at lunch. "Couple of minutes late" returning from lunch. Vehicle maintenance during unpaid lunch period.',
    evidence: ['Text message to boss'],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/lateness-notifications/Jun-19-2025-Late.jpg',
        caption: 'Brake parts needed for vehicle safety maintenance. Couple minutes late returning from lunch. Proactively texted boss.'
      }
    ],
    witnesses: ['Boss (John)'],
    legalSignificance: 'Demonstrates employee\'s pattern of proactive communication even for minor delays during unpaid lunch breaks. Brakes are critical safety component.',
    priority: 'low'
  },

  {
    id: 17,
    timestamp: '2025-06-25',
    text: 'SMOKING GUN: Good Faith Over-Communication',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['lateness-employee', 'wrongful-dismissal'],
    description: 'Employee texted boss about traffic: "Might be a couple mins late." Boss liked message (thumbs up). GPS PROVES EMPLOYEE ARRIVED 10 MIN EARLY. Employee warned about potential lateness as precaution, then made it on time anyway. PROVES good faith over-communication pattern, NOT unreliability.',
    evidence: ['Text message to boss', 'GPS location proof showing 10 min EARLY arrival'],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/lateness-notifications/Jun-25-2025-Traffic.jpg',
        caption: 'Wed Jun 25 at 6:57 AM. Employee: "Hey john, traffic pretty bad this morning might be a couple mins late". Boss liked message (thumbs up). BUT GPS SHOWS NO LATENESS - arrived 10 min EARLY.'
      },
      {
        type: 'doc',
        file: 'images/evidence/gps-proofs/Jun-25-2025-10min-EARLY.jpg',
        caption: 'SMOKING GUN: GPS Timeline Wed Jun 25 2025. Left 6:48 AM. Arrived 7:20 AM (10 MIN EARLY). Text at 6:57 AM warned about traffic as precaution. PROVES good faith over-communication. Employee texts preventively even when unnecessary. Undermines employer\'s "unreliable" narrative. Shows conscientiousness, NOT misconduct.'
      }
    ],
    witnesses: ['Boss (John)'],
    legalSignificance: 'SMOKING GUN for good faith. GPS objective proof employee warned about traffic but arrived 10 min EARLY. Proves pattern of over-communication and conscientiousness. Completely undermines employer\'s "unreliable employee" narrative. Employee takes communication so seriously they warn even when unnecessary.',
    latenessPersonKey: 'employee',
    priority: 'high'
  },

  // July 2025 - THE CRITICAL MONTH

  {
    id: 18,
    timestamp: '2025-07-06',
    text: 'Bereavement Leave Request',
    category: 'family',
    type: 'point',
    endDate: null,
    tags: ['family', 'wrongful-dismissal'],
    description: 'Employee texted boss requesting time off for celebration of life (funeral/memorial service). Family obligation to attend memorial service for deceased person. Boss approved the request.',
    evidence: ['Text message to boss requesting bereavement leave'],
    evidenceImages: [],
    witnesses: ['Boss (John)', 'Family members', 'Memorial service attendees'],
    legalSignificance: 'Protected bereavement leave. Family obligation. Not lateness - authorized time off. Shows employee appropriately requests time off for family obligations and employer grants it.',
    priority: 'low'
  },

  {
    id: 40,
    timestamp: '2025-07-10',
    text: 'Boss Missing Morning Meeting - Day 1 of Overtime Marathon',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['lateness-boss', 'wrongful-dismissal'],
    description: 'July 10 (SAME DAY as overtime period begins). Boss John missing morning meeting. Pattern continues. IRONY: Employee working 10-hour day starting brutal overtime period, boss can\'t even make it to morning meeting. DIFFERENTIAL TREATMENT: Employee disciplined for being couple minutes late with proactive communication. Boss missing entire meetings without consequences.',
    evidence: ['Text messages about boss missing meeting', 'GPS proof of employee lateness'],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/boss-lateness/July-10-2025-John-Missing-Morning-Meeting.jpg',
        caption: 'Thu July 10. Boss John missing morning meeting. Same day employee working 10-hour overtime shift. Third documented instance of boss unavailability (May 16 missing meeting, May 28 late, July 10 missing meeting). Employee disciplined for minor lateness, boss not disciplined for missing meetings.'
      },
      {
        type: 'doc',
        file: 'images/evidence/gps-proofs/July-10-2025-3min-Late.jpg',
        caption: 'GPS Timeline: Thu July 10 2025. Employee arrived 7:33 AM (3 min late). SAME DAY boss missing morning meeting entirely. Employee disciplined for 3 min lateness, boss not disciplined for missing meeting. Differential treatment.'
      }
    ],
    witnesses: ['Coworkers at meeting'],
    legalSignificance: 'DEVASTATING COMPARISON: Same day (July 10) employee working 10-hour overtime shift (dedication) + employee 3 min late with GPS proof → disciplined. Boss missing entire morning meeting → no discipline. Shows employer discriminatory double standard. Pattern now 3 incidents in 2 months (May 16, May 28, July 10). Proves differential treatment based on family status (employee has childcare obligations, boss doesn\'t).',
    latenessPersonKey: 'boss',
    priority: 'high',
    icon: '⚖️'
  },

  {
    id: 21,
    timestamp: '2025-07-14',
    text: 'OVERTIME MARATHON: 18 Consecutive Days',
    category: 'family',
    type: 'range',
    endDate: '2025-07-31',
    tags: ['critical', 'family', 'wrongful-dismissal'],
    description: '18 CONSECUTIVE DAYS of work with ZERO days off. Includes weekends (Saturdays and Sundays). Daily hours: 8-11.5 hours per day. July 14-28 total: 140.5 hours in 15 days (avg 9.37 hrs/day, many 10-11.5 hr days). Employee paid overtime (time-and-a-half after 8 hrs/day and 44 hrs/week). Normal schedule: Monday-Friday, 7:30 AM - 4:30 PM. Marathon schedule: Monday-Sunday, extended hours. Major project crunch. Employee worked voluntarily to help company meet deadline.',
    evidence: [
      'Timecard records showing 18 consecutive days',
      'Daily hours: July 14-31',
      '140.5 hours documentation (July 14-28)',
      'Paystubs showing overtime pay',
      'Text messages from this period'
    ],
    witnesses: ['Coworkers who also worked marathon', 'Boss', 'Family (impact on childcare)'],
    legalSignificance: 'CRITICAL: Employer imposed unreasonable work demands with no consideration for family status obligations. 18 consecutive days without a single day off eliminates all family time for employee with newborn baby (now ~9 months old). Extended hours reduce time for childcare. July 24 & 31 lateness incidents occurred DURING this marathon - employer CAUSED the exhaustion, then PUNISHED employee for lateness resulting from exhaustion. Alberta employment standards: employers must provide reasonable notice for significant schedule changes. Short notice for extended period = unreasonable.',
    priority: 'critical',
    icon: '⏰',
    convergenceTrack: 2,
    causalLinks: [22, 23, 24, 25, 78],
    chainGroup: 'excessive-work-demands-retaliation'
  },

  {
    id: 22,
    timestamp: '2025-07-20',
    text: 'SMOKING GUN: "Family Doesn\'t Matter" Statement',
    category: 'family',
    type: 'point',
    endDate: null,
    tags: ['smoking-gun', 'family', 'wrongful-dismissal'],
    description: 'DAY 7 of overtime marathon. Sunday evening (~6 PM). Employee already worked late on SUNDAY (voluntary overtime). Employee texted: "Sorry John, I don\'t think I can make it back tonight. I hope you guys finished the primer by 6pm." (Had to go home - feed 9-month-old baby, care for wife, household duties). Boss responded: "Nope, come on back. We are still working. We will probably be here for another five hours." (Demanded employee return at 6 PM to work until 11 PM or midnight = 16+ hour day on day off, after 7 consecutive days). Employee at 8:52 PM: "Oh wow, still? Should I come in now?" Boss: "We are going to have a major talk tomorrow." JULY 21 MORNING MEETING - Boss held the threatened "major talk" meeting with employee. Boss told employee: "It doesn\'t matter what happens at [home], you need to come in to work." Boss explicitly told employee family obligations are irrelevant. Expected employee to prioritize work over caring for infant child and wife. This confrontation later led to Write-up #3 for lateness, directly connecting the family status discrimination to disciplinary action.',
    evidence: [
      'Text messages - COMPLETE EXCHANGE (EMPLOYEE HAS SCREENSHOTS - CRITICAL)',
      'Timecard showing 7 consecutive days worked',
      'Employee testimony about next-day conversation',
      'Wife testimony about family needs that evening'
    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/smoking-guns/July-20-2025-Sunday-Overtime-Threat.jpg',
        caption: 'SMOKING GUN #1: Boss demands return to work Sunday 6 PM, threatens "major talk tomorrow" when employee can\'t abandon family obligations. Next day: "Doesn\'t matter what happens at home"'
      }
    ],
    witnesses: ['Boss (John) - made statements', 'Wife - can confirm family needs', 'Coworkers - may have heard "major talk"'],
    legalSignificance: '🚨 NUCLEAR SMOKING GUN 🚨 Boss\'s own words prove family status discrimination: "It doesn\'t matter what happens at [home], you need to come in." Demanded employee abandon childcare responsibilities to work until midnight on Sunday. Threatened employee next day for prioritizing family. Textbook family status discrimination - employer refused to accommodate family caregiving obligations. This single incident: (1) Proves employer discriminated against family status, (2) Shows pretextual discipline (caused exhaustion through unreasonable demands, then punished resulting lateness), (3) Pattern of retaliation (threatened for asserting family obligations), (4) Undermines "just cause" (can\'t claim lateness was employee\'s fault when employer worked them into exhaustion), (5) Bad faith discharge (no regard for family obligations/wellbeing). TEXT MESSAGES ARE OBJECTIVE PROOF. This needs to be prominently featured in ALL legal filings.',
    priority: 'nuclear',
    icon: '💣',
    convergenceTrack: 2,
    causalLinks: [21, 23, 24, 73, 74],
    chainGroup: 'explicit-family-discrimination'
  },

  {
    id: 23,
    timestamp: '2025-07-24',
    text: 'Car Maintenance During Lunch (Marathon Day 11)',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['wrongful-dismissal'],
    description: 'Running errand during lunch break - needed to fix car. Texted boss that lunch would run 20 minutes longer than normal. Time MADE UP same day (employee\'s standard practice). Context: DAY 11 of working consecutive days. Car likely needed maintenance due to daily commute during intense work period.',
    evidence: [
      'Text message to boss',
      'Timecard showing time made up',
      'Marathon period context'
    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/lateness-notifications/July-24-2025-Late.jpg',
        caption: 'Day 11 of 18 consecutive workdays. Employee: "Can I take an extra 30 mins at lunch?" Car maintenance needed. Proactively texted boss, made up time same day. Time compensated.'
      }
    ],
    witnesses: ['Boss (John)'],
    legalSignificance: 'Employer later cited this as "lateness" despite: (1) During unpaid lunch break, (2) Employee communicated in advance, (3) Time made up same day, (4) Necessary vehicle maintenance during brutal work period employer imposed. Shows employer weaponized even minor delays during lunch breaks while simultaneously demanding unreasonable overtime.',
    priority: 'medium'
  },

  {
    id: 41,
    timestamp: '2025-07-22',
    text: 'Check Up On Late Boss - Marathon Day 9',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['lateness-boss', 'wrongful-dismissal'],
    description: 'Mon July 22 (Day 9 of 18-day overtime marathon). Employee checking up on boss because boss was late. IRONY: Employee working brutal overtime marathon schedule, boss can\'t arrive on time. DIFFERENTIAL TREATMENT: Two days after July 20 Sunday "family doesn\'t matter" threat, boss himself is late without consequences. Pattern of hypocrisy.',
    evidence: ['Text messages checking on late boss'],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/boss-lateness/July-22-2025-Check-Up-On-Late-Boss.jpg',
        caption: 'Mon July 22. Employee checking up on late boss. Fourth documented boss lateness/unavailability (May 16, 28, July 10, 22). CRITICAL TIMING: 2 days after July 20 Sunday boss told employee "It doesn\'t matter what happens at home, you need to come in" yet boss himself late July 22. Hypocrisy + differential treatment.'
      }
    ],
    witnesses: ['Coworkers'],
    legalSignificance: 'DEVASTATING HYPOCRISY: July 20 (Sunday) boss threatens employee for prioritizing family obligations ("doesn\'t matter what happens at home") → July 22 (Monday, 2 days later) boss himself late. Shows boss holds employee to impossible standard he doesn\'t meet himself. Fourth documented instance in pattern (May 16, 28, July 10, 22). Employee working Day 9 of brutal 18-day marathon but still disciplined for minor lateness. Boss late repeatedly without discipline. Proves discriminatory double standard.',
    latenessPersonKey: 'boss',
    priority: 'high',
    icon: '⚖️'
  },

  {
    id: 24,
    timestamp: '2025-07-28',
    text: '"Last Chance" Warning Meeting',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['wrongful-dismissal'],
    description: 'Written warning meeting during or shortly after July overtime marathon. Attendees: John (boss) + Michelle (HR). Subject: Timecards and/or lateness. Boss and HR both stated: "This is your last chance." Employee believes written warning issued but doesn\'t have copy. Context: One of 10+ times employee was threatened with termination by John throughout employment. "Solutions" discussed: Employee should write notes, set alarms. Boss promised to message/remind about delayed timecards - for the most part, he didn\'t follow through ("unless at beginning of shift"). Employer claimed delayed timecards "put strain on payroll" and they "couldn\'t pay me" - but employee was NEVER not paid due to timecard delays (claim was exaggerated). Employee signed/acknowledged (if written) under duress - needed job for family.',
    evidence: [
      'Write-up document (need from employer)',
      'Meeting notes (if documented)',
      'Pattern of boss\'s threats (10+ times)',
      'Boss\'s failure to follow through on promises'
    ],
    witnesses: ['Boss (John)', 'Michelle (HR)'],
    legalSignificance: 'Timing critical: During or right after 18-day overtime marathon (140.5 hours in 2 weeks). Employee exhausted. System required timecard submission AFTER work hours. Boss delayed unlocking timecards causing missed deadlines. Then gave "last chance" warning during most stressful work period. Coercive environment - boss threatened termination 10+ times throughout employment. Employee signed without objection due to intimidation, not genuine acknowledgment. "Last chance" threats part of pattern, not legitimate progressive discipline. This warning later cited to justify Oct 22 termination, BUT: (1) Oct 22 lateness was different circumstances (technical failure), (2) No accommodation offered for family status, (3) Warning given under duress, (4) Same-day termination still disproportionate.',
    priority: 'high',
    icon: '⚠️',
    convergenceTrack: 3,
    causalLinks: [21, 25, 65],
    chainGroup: 'progressive-discipline-under-duress'
  },

  {
    id: 42,
    timestamp: '2025-07-27',
    text: 'Boss Late - Marathon Day 14',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['lateness-boss', 'wrongful-dismissal'],
    description: 'Sat July 27 (Day 14 of 18-day overtime marathon). Boss John late on Saturday. DIFFERENTIAL TREATMENT: Employee working Day 14 of brutal 18-day marathon including weekends, still disciplined for minor lateness. Boss late on weekend work without consequences. Fifth documented instance of boss lateness pattern (May 16, 28, July 10, 22, 27).',
    evidence: ['Text messages about boss lateness'],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/boss-lateness/July-27-2025-John-Late.jpg',
        caption: 'Sat July 27. Boss John late on Saturday during overtime marathon. Fifth documented boss lateness (May 16, 28, July 10, 22, 27). Employee working Day 14 of 18-day marathon, still disciplined for minor lateness. Boss late repeatedly without discipline. Differential treatment pattern solidified.'
      }
    ],
    witnesses: ['Coworkers working Saturday'],
    legalSignificance: 'Fifth documented boss lateness in 2.5 months. CRITICAL CONTEXT: Employee working Day 14 of 18-day overtime marathon employer imposed. Employee exhausted but disciplined for being couple minutes late. Boss late on weekend work without consequences. Pattern proves discriminatory enforcement. Compare: (1) Employee: Minor lateness (3-24 min) + proactive communication + GPS proof + made up time = disciplined repeatedly + threatened with termination 10+ times + eventually terminated. (2) Boss: Late/missing meetings repeatedly (5+ times May-July) + no communication + no proof + no discipline = no consequences. Discriminatory double standard proves family status discrimination motive.',
    latenessPersonKey: 'boss',
    priority: 'high',
    icon: '⚖️'
  },

  {
    id: 25,
    timestamp: '2025-07-31',
    text: 'Late 15 Minutes (Marathon Day 18 - Exhaustion)',
    category: 'family',
    type: 'point',
    endDate: null,
    tags: ['family', 'lateness-employee', 'wrongful-dismissal'],
    description: 'Employee 24 minutes late (WORST LATENESS OF ALL 13 INCIDENTS). Context: DAY 18 (FINAL DAY) of working 18 CONSECUTIVE DAYS with ZERO days off. Physically exhausted after 140.5 hours over 2+ weeks of extended daily hours including weekends. GPS proves 24 min late - employee utterly exhausted from brutal schedule.',
    evidence: [
      'Text message about lateness',
      'GPS location proof showing 24 min late',
      'Timecard showing 18 consecutive days',
      'Total hours worked: 140+ hours'
    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/lateness-notifications/July-31-2025-Late.jpg',
        caption: 'Thu Jul 31 at 7:11 AM. Employee: "Good morning sir, gonna be about 15 mins late today". Polite ("sir"), gave specific time estimate. Day 18 (final day) of overtime marathon.'
      },
      {
        type: 'doc',
        file: 'images/evidence/gps-proofs/July-31-2025-24min-Late.jpg',
        caption: 'GPS Timeline: Thu Jul 31 2025. Left 7:16 AM. Arrived 7:54 AM (24 MIN LATE - WORST LATENESS). Day 18 of 18-day marathon (July 14-31). GPS shows 24 min late. Employee utterly exhausted after 140.5 hours in 15 days. Sleep apnea + exhaustion. Employer caused the condition they disciplined for.'
      }
    ],
    witnesses: ['Boss (John)', 'Coworkers who witnessed marathon'],
    legalSignificance: 'CRITICAL: Employer CAUSED the exhaustion by demanding unreasonable hours (18 days straight, no breaks), then PUNISHED employee for lateness caused by that exhaustion. GPS proves this was employee\'s WORST lateness (24 min) and it occurred on Day 18 of brutal marathon. Cannot establish "just cause" when employer created the conditions leading to lateness. Sleep apnea effects maximized during extreme exhaustion. Employer knew about sleep apnea and subjected employee to intense schedule, then disciplined for disability-caused lateness.',
    latenessPersonKey: 'employee',
    priority: 'high'
  },

  {
    id: 77,
    timestamp: '2025-07-28',
    text: 'Parental Leave Request - "As Wife Transitions Back to Full Time Work"',
    category: 'family',
    type: 'point',
    endDate: null,
    tags: ['critical', 'family', 'wrongful-dismissal'],
    description: 'Employee requested 5 weeks government parental leave. Reason stated to employer: "As my wife transitions back to full time work." This explicitly told employer that: (1) Wife returning to full-time work around August 2025, (2) Employee would need to take parental leave for childcare, (3) Employee would return to work in October with ONGOING childcare obligations (both parents working full-time), (4) Child too young for daycare (legal/policy barrier, not choice). EMPLOYER KNEW employee would return from leave facing same childcare challenges that led to accommodation period (Oct 2024-July 2025). Parental leave approved for Sept 4 - Oct 9, 2025 (5 weeks). CRITICAL: Employer cannot claim surprise about ongoing family obligations when employee explicitly stated reason for leave. Pattern: July 28 request → Sept 4-Oct 9 leave → Oct 10 return + Write-Up #4 SAME DAY (33-day delay retaliation) → Oct 20-21 accommodation denied → Oct 22 terminated (12 days after return from protected leave).',
    evidence: [
      'Parental leave request (method unknown - email/text/in-person not documented)',
      'Employee testimony: stated reason "as my wife transitions back to full time work"',
      'Approved leave dates: Sept 4 - Oct 9, 2025 (5 weeks)',
      'HR confirmation of leave dates (Oct 5 Michelle Sherman email)',
      'Paystubs showing leave period',
      'Context: Wife returned to full-time work ~Aug 4, child still too young for daycare'
    ],
    evidenceImages: [],
    witnesses: ['Boss (John) - received request', 'HR (Michelle Sherman) - processed leave', 'Wife - aware of work schedule transition'],
    legalSignificance: 'PROVES EMPLOYER KNOWLEDGE: Employee told employer in July that wife returning to full-time work (Aug 2025) and employee needed parental leave for childcare. Employer KNEW employee would return from leave in October with ongoing childcare obligations (both parents working, no daycare available). Employer CANNOT argue employee should have "found daycare" - child too young (legal barrier). Employer CANNOT claim surprise about Oct 2025 childcare challenges - employee warned them in July. TIMING PROVES RETALIATION: July 28 request → Sept 4-Oct 9 protected leave → Oct 10 SAME DAY return + Write-Up #4 (33-day delay from Sept 7) → Oct 20-21 accommodation denied → Oct 22 terminated = TEXTBOOK parental leave retaliation under Alberta Human Rights Act. Pattern shows: protected activity (parental leave for family obligations) → immediate adverse action (write-up same day as return) → quick termination (12 days). Prima facie case: protected ground (family status) + adverse action (termination) + temporal connection (12 days).',
    priority: 'nuclear',
    icon: '👨‍🍼',
    convergenceTrack: 2,
    causalLinks: [36, 65, 30],
    chainGroup: 'parental-leave-retaliation-premeditated'
  },

  {
    id: 26,
    timestamp: '2025-07-20?',
    text: 'Epoxy Paint Tank Injury - 3 Workers Hurt',
    category: 'ohs',
    type: 'point',
    endDate: null,
    tags: ['smoking-gun', 'ohs', 'wrongful-dismissal'],
    description: 'July 19-21, 2025 (exact date uncertain). BOS tank pulled into wash bay for epoxy coating (primer + paint with accelerant). Work inside confined tank. Inadequate PPE provided (not full face mask employee requested year earlier). 3-worker crew: Employee + Ramon + RJ. Took turns entering tank (~10 min each, rotated). Work lasted less than 1 hour before stopped. ALL THREE WORKERS injured: intense burning pain in eyes, eyes watering continuously, pain so severe work completely stopped. Each worker experienced symptoms after only minutes of exposure. Employee told coworker (team lead), team lead reported to boss. Work stoppage: complete halt until proper PPE obtained. JULY 22, 2025: Full face masks arrived (confirmed by text message at 1:06 PM from Boss John: "Masks should be coming in from uline today"). Employer procured THE EXACT PPE EMPLOYEE REQUESTED IN 2024 within 1-2 days after injury. Workers reassigned during wait, no lost wages. Employee documented in Safety Culture app ("eyes burning from paint fumes" or similar). At least one coworker also documented. NO medical treatment sought (pain resolved after leaving environment), but chemical eye exposure causing pain/watering = injury. NO WCB/Injury report filed despite multiple workers injured and work stoppage required. Employer failed to file as required - likely to protect COR certification.',
    evidence: [
      'Safety Culture app submissions (employee + coworker)',
      'Work orders/project records for BOS tank',
      'PPE purchase records (full face masks, August 2025)',
      'Paint product MSDS',
      'Coworker testimony (Ramon, RJ, team lead)',
      'Photos of tank work (check personal photos)',
      'Confined space entry permits (should exist if procedures followed)'
    ],
    evidenceImages: [
      {
        type: 'doc',
        file: 'images/evidence/ohs/July-22-2025-Full-Face-Mask-Arrived-1.jpg',
        caption: 'Full face masks FINALLY arrived (July 22 or late July). CRITICAL: Employee requested full face masks for OVER A YEAR. Employer denied repeatedly. After 3 workers injured (eyes burning, work stopped), employer procured masks within 1-2 days. PROVES employee was RIGHT - masks were necessary safety equipment. Employer only acted AFTER injury.'
      },
      {
        type: 'doc',
        file: 'images/evidence/ohs/July-22-2025-Full-Face-Mask-Arrived-2.jpg',
        caption: 'Full face mask PPE (second photo). Shows proper respiratory protection employee advocated for. Employer\'s rapid procurement AFTER injury (1-2 days) proves: (1) Masks were readily available (not expensive/difficult to obtain), (2) Employer COULD have provided earlier, (3) Employer CHOSE not to until workers injured, (4) Employee\'s year-long advocacy was justified and correct.'
      }
    ],
    witnesses: ['Ramon (injured)', 'RJ (injured)', 'Team lead (reported to boss)', 'Boss (authorized PPE procurement)'],
    legalSignificance: '🚨 GAME CHANGER - COR LEVERAGE 🚨 This incident: (1) PROVES employee\'s year-long PPE requests were correct - employer FINALLY provided full face masks AFTER injury, (2) Unreported workplace injury (3 workers) violates WCB + OHS reporting requirements, (3) Likely PSI (Potentially Serious Incident) - chemical exposure in confined space, multiple workers, work stoppage required, (4) No incident investigation (violates COR Element 7), (5) Pattern: Employee warned about hazard for YEAR → Denied → Workers injured → Employee terminated 3 months later = witness elimination. STRATEGIC LEVERAGE: Employer likely holds COR (Certificate of Recognition) certification - MANDATORY for oil & gas contracts. Filing OHS complaint triggers investigation → unreported injury discovered → COR Employer Review → potential COR suspension/cancellation = BUSINESS CATASTROPHE (cannot bid on contracts, hundreds of thousands to millions in lost revenue). This creates NUCLEAR settlement leverage: Employer\'s settlement cost ($30-50k) << COR investigation risk (potentially millions + business-threatening). Makes wrongful dismissal case high-leverage settlement negotiation.',
    priority: 'nuclear',
    icon: '☣️',
    convergenceTrack: 2,
    causalLinks: [5, 62, 63, 26],
    chainGroup: 'ohs-injury-pattern'
  },

  {
    id: 73,
    timestamp: '2025-08-01?',
    text: 'Michelle Sherman Discriminatory Statement - Write-Up #3',
    category: 'family',
    type: 'point',
    endDate: null,
    tags: ['critical', 'smoking-gun', 'family', 'wrongful-dismissal', 'bad-faith'],
    description: 'Write-Up #3 disciplinary meeting for 3 late instances. Attendees: Boss (John) + Michelle Sherman (Head of HR) + Employee. SMOKING GUN STATEMENT: Michelle Sherman said "Everyone has had children and no one else is late. Having children should not be a reason why you\'re late" (exact wording may vary slightly - employee testimony). This occurred AFTER employee worked 140.5 hours in July (18 consecutive days). Michelle\'s additional belittling behavior same meeting: Repeatedly asked "Do you care about work?" (after 140-hour month!), demanded phone always on "It\'s in your contract," called coworker during meeting to "prove" people answer phones, asked multiple times "Do you care about your job?" Context: Write-Up #3 exact date unknown but timeframe July/August 2025, after overtime marathon (July 14-31) and before Sept parental leave.',
    evidence: [
      'Write-Up #3 document (awaiting from employer - may contain Michelle\'s statement in writing)',
      'Employee testimony about Michelle\'s statement',
      'Boss (John) was present at meeting (witness to Michelle\'s statement)',
      'July timecard showing 140.5 hours worked',
      'Pattern: July 21 boss statement → July/Aug Michelle statement → Aug 28 sick baby denial'
    ],
    evidenceImages: [],
    witnesses: ['Boss (John) - present at meeting', 'Michelle Sherman (made the statement)', 'Employee'],
    legalSignificance: 'SMOKING GUN #2: Direct evidence of family status discrimination from HEAD OF HR (not just rogue supervisor). Legal significance: (1) EXPLICIT REJECTION of family obligations as legitimate reason for lateness - "having children should not be a reason" = textbook family status discrimination, (2) Made by HEAD OF HR (Michelle Sherman) = shows INSTITUTIONAL/SYSTEMIC discrimination (not isolated), (3) Made AFTER 140-hour overtime month = shows employer ingratitude and bad faith, (4) Pattern with boss\'s July 21 statement = TWO senior management figures (supervisor + HR head) both rejected family obligations within weeks, (5) Proves discriminatory MOTIVE - employer knew family was reason for lateness (employee communicated childcare every time), then explicitly rejected family obligations as legitimate, (6) Alberta Human Rights Act Section 7 protects family status - employer cannot discipline for childcare-related lateness without first attempting accommodation. CRITICAL: Write-Up #3 may contain this statement IN WRITING if Michelle documented her comments - request from employer immediately. If proven, this is DEVASTATING evidence worth tens of thousands in human rights damages (non-taxable).',
    priority: 'nuclear',
    icon: '💣',
    convergenceTrack: 2,
    causalLinks: [22, 28, 72],
    chainGroup: 'institutional-family-discrimination'
  },

  {
    id: 74,
    timestamp: '2025-08-04',
    text: 'Personal Day Denied - Boss Lied About Usage',
    category: 'family',
    type: 'point',
    endDate: null,
    tags: ['family', 'bad-faith', 'wrongful-dismissal'],
    description: 'Employee requested personal day via text: "Hey John, I\'m gonna take a personal day today. Not feeling too well." Boss responded: "You can\'t take any more personal days u need to get a doctors notes." EMPLOYER LIED: This was employee\'s FIRST personal day request ever. Employee had only taken bereavement leave (July 6) previously, never a personal day. Boss\'s false statement ("can\'t take any more") was factually incorrect and designed to intimidate. Context: Wife had just returned to full-time work ~Aug 4 (child too young for daycare), creating extraordinary household circumstances. Employee stayed home Aug 4 (very sick), but felt pressured by boss\'s lie and doctor\'s note demand to return ASAP. Employee returned while still contagious, infected entire office (boss, Ramon, coworkers) AND family (wife, baby). Boss took 2 days off for same illness. Double standard: Boss denied employee 1 day (lying about personal day usage), then took 2 days himself for same illness employee gave him.',
    evidence: [
      'Aug 4 text messages (employee has)',
      'Employee testimony about first personal day ever',
      'Bereavement leave July 6 (only previous time off)',
      'Boss took 2 days off after getting sick (August timeframe)',
      'Ramon took days off after getting sick',
      'Wife and baby got sick from employee (family infected because boss forced premature return)'
    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/work-context/Aug-04-2025-Personal-Day-Request.jpg',
        caption: 'Aug 4, 2025. Employee: "Hey John, I\'m gonna take a personal day today. Not feeling too well." Boss: "You can\'t take any more personal days u need to get a doctors notes." BOSS LIED: This was employee\'s FIRST personal day ever (only previous time off was bereavement July 6). Boss\'s false statement created pressure to return while still sick, leading to office-wide infection.'
      }
    ],
    witnesses: ['Boss (John) - made false statement', 'Wife (Sam) - can confirm first personal day, employee very sick, family got infected', 'Ramon - took days off after getting sick from employee', 'Coworkers who got sick'],
    legalSignificance: 'BAD FAITH CONDUCT: Boss made factually false statement ("can\'t take any more personal days") when this was employee\'s FIRST personal day ever. This lie created pressure forcing sick employee to return prematurely, resulting in: (1) Office-wide infection (boss, Ramon, coworkers got sick), (2) Family infection (wife and baby got sick), (3) Workplace health hazard (should have allowed proper recovery). DOUBLE STANDARD: Boss denied employee 1 day (using lies), took 2 days himself for same illness. PATTERN EVIDENCE - Third explicit rejection of family/personal/health needs within 8 weeks: July 21 (boss: "crunch time, need you in shop") → Aug 4 (boss: lie about personal days) → Aug 28 (boss: sick baby denied). Shows systematic pattern of bad faith, lying, intimidation, double standards. Timing: Wife returned to work full-time ~Aug 4 (NO daycare available), employee needed flexibility, employer responded with lies and coercion instead of accommodation.',
    priority: 'high',
    icon: '🤥',
    convergenceTrack: 2,
    causalLinks: [73, 28, 75],
    chainGroup: 'coercive-environment-pattern'
  },

  {
    id: 43,
    timestamp: '2025-08-09',
    text: 'Boss Late on Saturday - Post-Marathon Pattern Continues',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['critical', 'lateness-boss', 'wrongful-dismissal'],
    description: 'Sat Aug 9. Boss John late on Saturday work. SIXTH documented instance of boss lateness pattern (May 16, 28, July 10, 22, 27, Aug 9). Pattern continues after overtime marathon ended. DIFFERENTIAL TREATMENT: Boss late on Saturday without consequences. Employee terminated 2.5 months later (Oct 22) citing pattern of lateness. Proves discriminatory enforcement - same behavior, different outcomes based on protected grounds.',
    evidence: ['Text messages about boss lateness on Saturday'],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/boss-lateness/Aug-09-2025-John-Late-Saturday.jpg',
        caption: 'Sat Aug 9. Boss John late on Saturday. Sixth documented boss lateness in 3.5 months (May 16, 28, July 10, 22, 27, Aug 9). Pattern of boss unavailability/lateness without discipline. Employee terminated Oct 22 for pattern of lateness. Proves differential treatment based on family status (employee has childcare obligations, disciplined; boss no obligations, not disciplined).'
      }
    ],
    witnesses: ['Coworkers working Saturday'],
    legalSignificance: 'SIXTH AND FINAL documented boss lateness before employee termination. Pattern complete: May 16 (missing meeting) → May 28 (late) → July 10 (missing meeting) → July 22 (late) → July 27 (late Saturday) → Aug 9 (late Saturday) = 6 incidents over 3.5 months, ZERO discipline. Compare to employee: 13 lateness incidents over 6 months (Apr-Oct), ALL with proactive communication, majority 3-10 min, GPS proof, made up time → disciplined repeatedly, threatened 10+ times, terminated Oct 22. SMOKING GUN for differential treatment. Alberta Human Rights Act prohibits discriminatory enforcement. Pattern proves: (1) Employer capable of tolerating lateness (tolerates boss), (2) Chooses to discipline employee selectively, (3) Only difference = employee has family status obligations (childcare for infant) and disabilities (ADHD, sleep apnea), (4) Proves discriminatory motive.',
    latenessPersonKey: 'boss',
    priority: 'critical',
    icon: '⚖️'
  },

  {
    id: 27,
    timestamp: '2025-08-26',
    text: 'Late - Sleep Deprivation (Disability + Family)',
    category: 'disability',
    type: 'point',
    endDate: null,
    tags: ['disability', 'lateness-employee', 'wrongful-dismissal'],
    description: 'Employee texted: "Woke up late this morning, will be a few minutes late." A few minutes late. Sleep deprivation likely due to newborn (now ~10 months old) AND sleep apnea (diagnosed Feb 18, employer knew). Combination of disability-related symptoms and family status obligations.',
    evidence: [
      'Text message to boss',
      'GPS location proof',
      'Sleep apnea diagnosis on file with employer',
      'Pattern of sleep issues related to childcare'
    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/lateness-notifications/Aug-26-2025-Late.jpg',
        caption: 'Employee: "Hey John, woke up late this morning. I\'m gonna be a few minutes late." Boss liked message (thumbs up). CRITICAL: "Woke up late" = sleep apnea symptom. Employer knew about moderate sleep apnea since Feb 18 2025 but disciplined for lateness anyway.'
      },
      {
        type: 'doc',
        file: 'images/evidence/gps-proofs/Aug-26-2025-3min-Late.jpg',
        caption: 'GPS Timeline: Tue Aug 26 2025. Left home 7:03 AM. Arrived 7:33 AM (3 min late). Sleep apnea symptom (waking late). Employer disciplined for disability symptom despite documented knowledge of moderate sleep apnea. 2 days before Aug 28 sick baby denial.'
      }
    ],
    witnesses: ['Boss (John)', 'Wife'],
    legalSignificance: 'Employer knew employee had sleep apnea since Feb 18. GPS proves sleep difficulty. Boss liked message showing acknowledgment. Sleep disruption from infant care (10 months old). BOTH protected grounds (disability + family status). No accommodation offered for either. Disciplined for disability-related behavior.',
    latenessPersonKey: 'employee',
    priority: 'medium'
  },

  {
    id: 28,
    timestamp: '2025-08-28',
    text: 'Sick Baby - Accommodation Request DENIED',
    category: 'family',
    type: 'point',
    endDate: null,
    tags: ['smoking-gun', 'family', 'wrongful-dismissal'],
    description: 'Aug 28 - Employee texted boss requesting time off for sick infant daughter and wife: "Hey John, my daughter and wife are still pretty sick and need my help tomorrow. Is it okay if I take the day off? I\'ll be back on Friday." Context: Both infant daughter and wife sick. Baby required medical care. Legitimate family status obligation. Boss responded SAME DAY (Aug 28): "I\'m sorry they are sick, but you still need to come to work." Employee follow-up: "I understand the timing isn\'t ideal, but my baby needs medical care today, and I need to be there for her. I\'ll be back tomorrow and we\'ll catch up on anything urgent." Boss REFUSED accommodation - flat denial despite employee explaining baby needed medical care. No discussion of alternatives, no consideration of undue hardship. Forced employee to choose between job and sick infant. Employee stayed home Aug 29 to care for sick baby (prioritized child\'s health). Baby seen by doctor, doctor provided medical note. Sept 3 - Boss demanded doctor\'s note retroactively (5 days after). Pattern: Denied accommodation → Employee exercised family status rights → Boss built paper trail for retaliation.',
    evidence: [
      'Text messages Aug 28 - request + denial (CRITICAL EVIDENCE)',
      'Text message Aug 28 - employee\'s follow-up',
      'Text message Sept 3 - retroactive doctor note demand',
      'Doctor\'s note for baby\'s illness',
      'Medical records showing baby seen by doctor'
    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/family-status/Aug-28-2025-Sick-Baby-Request.jpg',
        caption: 'Wed Aug 28. Employee requests time off for sick baby and wife. Boss DENIES despite medical need: "I\'m sorry they are sick, but you still need to come to work." SMOKING GUN: Compare to June 13 when boss APPROVED sick child accommodation. Proves differential treatment.'
      },
      {
        type: 'doc',
        file: 'images/evidence/medical-records/2025-08-28_doc_kinza-sick-note-1.jpg',
        caption: 'Doctor\'s note for Kinza\'s viral cough - medical evidence of sick child requiring care'
      },
      {
        type: 'text',
        file: 'images/evidence/smoking-guns/Sept-03-2025-Retroactive-Sick-Note-Demand.jpg',
        caption: 'SMOKING GUN #2: Boss demands doctor\'s note 5 days after Aug 28-29 sick baby absence. Text: "Where is ur doctors note". Retroactive demand = building paper trail for retaliation.'
      }
    ],
    witnesses: ['Boss (John) - denied accommodation', 'Wife - confirms both she and baby sick', 'Doctor - medical necessity'],
    legalSignificance: '🚨 BLATANT FAMILY STATUS DISCRIMINATION 🚨 Sick infant requiring medical care = core protected obligation under Alberta Human Rights Act. No alternative caregiver (wife also sick). Employer refused accommodation without ANY discussion. Flat "you still need to come to work" despite legitimate medical need. This is EXACTLY what human rights law prohibits. Employer failed fundamental duty to accommodate: (1) No inquiry into alternatives, (2) No assessment of undue hardship, (3) Flat refusal despite employee explaining medical necessity, (4) Forced impossible choice. Retaliation timeline: Aug 28 denial → Aug 29 employee stays home (exercises rights) → Sept 3 retroactive documentation demand → parental leave → Oct 22 terminated (7.5 weeks after). Pattern: Employee exercised family status rights (stayed home with sick baby) → Employer retaliated. TEXT MESSAGES ARE OBJECTIVE PROOF.',
    priority: 'nuclear',
    icon: '🤒',
    convergenceTrack: 2,
    causalLinks: [14, 73, 74, 36],
    chainGroup: 'family-accommodation-withdrawal-sequence'
  },

  {
    id: 36,
    timestamp: '2025-09-07',
    text: 'Michelle Sherman "Urgent" Email - Sept 3 Timecard',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['critical', 'wrongful-dismissal'],
    description: 'Sept 7, 2025 at 12:33 PM: Michelle Sherman (HR Director) emails employee during parental leave: "I am confirming that your last day worked was September 2, 2025, for 9 hours. I do not see a timecard for September 3, 2025. Please confirm this is accurate information. The deadline to receive this information is Monday September 8, 2025 - 12:00pm CST, or sooner." CRITICAL: Michelle claims "URGENT" with Sept 8 deadline. Employee on parental leave starting Sept 4. Employer KNEW about missing Sept 3 timecard on Sept 7. Then WAITED 33 DAYS (from Sept 7 to Oct 10) to issue Write-Up #4 - and issued it on employee\'s FIRST DAY BACK from protected parental leave. If truly urgent (Sept 8 deadline), why wait 33 days to discipline? Answer: Waiting to punish employee for taking parental leave.',
    evidence: [
      'Email from Michelle Sherman Sept 7, 2025',
      'Sept 8 deadline stated in email',
      'Write-Up #4 issued Oct 10 (33 days later)',
      'Parental leave dates Sept 4 - Oct 9'
    ],
    evidenceImages: [
      {
        type: 'email',
        file: 'images/evidence/smoking-guns/Sept-07-2025-Michelle-Urgent-Email.png',
        caption: 'SMOKING GUN #3: Michelle Sherman "urgent" email Sept 7 with Sept 8 deadline for Sept 3 timecard. Employer waited 33 days until Oct 10 (first day back from parental leave) to issue Write-Up #4. Proves false urgency = pretext for parental leave retaliation.'
      }
    ],
    witnesses: ['Michelle Sherman (HR) - sent email', 'Boss (John) - likely coordinated'],
    legalSignificance: '🚨 PRETEXT SMOKING GUN 🚨 This email DESTROYS employer\'s credibility. Employer claimed Sept 3 timecard was URGENT (Sept 8 deadline) but then waited 33 DAYS to discipline employee - issuing Write-Up #4 on Oct 10, employee\'s FIRST DAY BACK from protected parental leave. If issue was truly urgent, employer would have: (1) Disciplined immediately or during leave, (2) At minimum disciplined within reasonable time of Sept 8 deadline. Instead: Waited precisely until employee returned from protected leave. This timing is NOT coincidence - it\'s RETALIATION. Proves employer manufactured urgency (Sept 8 deadline) to create paper trail, then strategically delayed discipline to punish employee for exercising parental leave rights. Pattern: Sept 7 false urgency → Employee takes leave Sept 4-Oct 9 → Oct 10 first day back = Write-Up #4 → Oct 22 terminated (12 days later). Classic retaliation timeline.',
    priority: 'critical',
    icon: '📧',
    convergenceTrack: 2,
    causalLinks: [77, 28, 65],
    chainGroup: 'parental-leave-retaliation-premeditated'
  },

  {
    id: 30,
    timestamp: '2025-10-10',
    text: 'Return from Parental Leave + Family Lateness',
    category: 'family',
    type: 'point',
    endDate: null,
    tags: ['smoking-gun', 'family', 'lateness-employee', 'wrongful-dismissal'],
    description: 'Returned to work from 5-week parental leave. Same day: Helping parents and grandparents get to airport during Thanksgiving weekend. Original plan: Take full day off. Flights delayed, wife able to drive them instead. Employee texted boss: flights delayed, wife driving them, employee on way to work. "Couple of minutes late." Family caregiving obligation - elderly parents/grandparents during holiday travel. Modified work schedule to accommodate family needs.',
    evidence: [
      'Text message to boss about flights/delay',
      'Return from leave documentation',
      'Family testimony about airport situation'
    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/smoking-guns/Oct-10-2025-Write-Up-Day-Of-Return.jpg',
        caption: 'SMOKING GUN #4: Text conversation Oct 10 2025. TWO SEPARATE EVENTS THIS DAY: (1) Morning 8 min lateness due to grandparents\' delayed flight (family/childcare), perfect communication. (2) Write-Up #4 issued SAME DAY for SEPT 3 TIMECARD (33-day delay from Sept 7 "urgent" deadline). Proves parental leave retaliation.'
      },
      {
        type: 'doc',
        file: 'images/evidence/gps-proofs/Oct-10-2025-8min-Late.jpg',
        caption: 'GPS Timeline: Fri Oct 10 2025. Left home 7:02 AM. Arrived 7:38 AM (8 min late). FIRST DAY back from 5-week parental leave. Lateness reason: Helping grandparents with delayed flight (Thanksgiving travel), childcare coordination. Text sent 4:54 AM (8+ hrs notice). GPS corroborates family/childcare obligation. SEPARATE SAME DAY: Write-Up #4 for SEPT 3 (33-day delay retaliation).'
      }
    ],
    witnesses: ['Boss (John)', 'Wife', 'Parents', 'Grandparents'],
    legalSignificance: '🚨 DEVASTATING TIMELINE 🚨 Employee returns from protected parental leave Oct 10. SAME DAY has family caregiving obligation (elderly family airport transport). 12 DAYS LATER = TERMINATED. This timing creates strong presumption of retaliation for exercising parental leave rights. Courts highly skeptical of terminations shortly after protected leave. Family caregiving for elderly relatives = also protected under family status. CRITICAL: Write-Up #4 issued SAME DAY for Sept 3 timecard issue - employer knew on Sept 7 (Michelle "urgent" email with Sept 8 deadline) but waited 33 days until first day back from parental leave to discipline. Proves retaliation.',
    latenessPersonKey: 'employee',
    priority: 'nuclear',
    convergenceTrack: 2,
    causalLinks: [65, 65, 31],
    chainGroup: 'parental-leave-retaliation-execution'
  },

  {
    id: 31,
    timestamp: '2025-10-14',
    text: 'Sick Day 1 - Differential Treatment Begins',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['critical', 'wrongful-dismissal'],
    description: 'Employee sick (cold/flu symptoms, feverish). First of 2 non-consecutive sick days. Worked Oct 15 despite being sick (environment very cold, felt worse, had to take additional day off Oct 16). UNPAID sick days - employee had NO PTO available (all vacation used, PTO balance in negative). Boss sent text message REQUIRING medical documentation/sick note. No written policy requiring sick notes. Same week: Coworker Jessica visibly sick during morning meeting, boss sent her home, Jessica NOT required to provide sick note. DIFFERENTIAL TREATMENT: Employee required sick note, Jessica not. Timing: Final week before termination (Oct 22). Employer building paper trail in days before firing.',
    evidence: [
      'Text message from boss requiring sick note (CRITICAL - proves differential treatment)',
      'Sick note provided to employer',
      'Witness testimony - Jessica sent home, no sick note required',
      'No sick note policy in contract/handbook',
      'PTO records showing negative balance'
    ],
    witnesses: ['Boss (John)', 'Jessica (coworker - sent home sick same week, no sick note required)', 'Other employees at morning meeting'],
    legalSignificance: '🚨 DIFFERENTIAL TREATMENT PROOF 🚨 Same week, same illness scenario: Employee required sick note (text proof), Jessica NOT required. No written policy. Discretionary application = discrimination. Timing (6-8 days before termination) proves employer manufacturing reasons in final week. Pattern: Employee sick Oct 14-16 → Sick note required → Terminated Oct 22. Unreasonable to require note for only 2 days. Adds cost burden (doctor visit fees). Part of broader pattern: Employee disciplined for lateness/absences, others not. Employee required sick note, Jessica not. Inconsistent application proves discriminatory intent. TEXT MESSAGE is objective evidence, not "he said she said."',
    priority: 'critical',
    icon: '🤧'
  },

  {
    id: 32,
    timestamp: '2025-10-16',
    text: 'Sick Day 2 - Still Required Note (Jessica Wasn\'t)',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['wrongful-dismissal'],
    description: 'Second non-consecutive sick day (Oct 14, worked 15, sick again 16). Still sick from cold/flu. Sick note requirement applied to both days. Jessica (coworker) sent home sick same week, NOT required to provide documentation.',
    evidence: [
      'Sick note covering both days',
      'Jessica\'s testimony',
      'Meeting witnesses'
    ],
    witnesses: ['Boss', 'Jessica', 'Meeting attendees'],
    legalSignificance: 'Continuation of differential treatment. 6 days before termination. Pattern intensifies.',
    priority: 'high'
  },

  {
    id: 44,
    timestamp: '2025-10-16',
    text: 'RJ and Ramon Late - Differential Treatment',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['critical', 'lateness-coworker', 'wrongful-dismissal'],
    description: 'Wed Oct 16. Coworkers RJ and Ramon both late to work. NO DISCIPLINE. CRITICAL: This is 6 days before employee termination (Oct 22) for pattern of lateness. Employer tolerates coworker lateness but not employee lateness. DIFFERENTIAL TREATMENT proves discriminatory motive. Same workplace, same attendance rules, different enforcement based on protected grounds (family status + parental leave retaliation).',
    evidence: ['Text messages or observations about RJ and Ramon lateness'],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/differential-treatment/Oct-16-2025-RJ-Ramon-Late.jpg',
        caption: 'Wed Oct 16. RJ and Ramon both late. No discipline. SIX DAYS before employee terminated (Oct 22) for pattern of lateness. Proves employer capable of tolerating lateness but selectively disciplines employee. Differential treatment based on family status (employee has childcare obligations, coworkers don\'t).'
      }
    ],
    witnesses: ['RJ', 'Ramon', 'Coworkers'],
    legalSignificance: 'CRITICAL TIMING: Oct 16 coworkers late without discipline → Oct 22 (6 days later) employee terminated for lateness pattern. Proves: (1) Employer CAN tolerate lateness (tolerates RJ/Ramon), (2) Chooses to discipline employee selectively, (3) Timing (6 days before termination) shows employer aware of coworker lateness yet only employee disciplined, (4) Pattern of differential treatment: Boss late 6 times (May-Aug) + RJ/Ramon late Oct 16 + RJ late Oct 22 (SAME DAY as employee termination) = 8+ instances of others\' lateness without discipline vs employee 13 instances with progressive discipline + threats + termination. Alberta Human Rights Act prohibits discriminatory enforcement. Only difference = employee has family status obligations (infant childcare) + disabilities (ADHD, sleep apnea) + recently returned from parental leave (Oct 10).',
    latenessPersonKey: 'coworker',
    priority: 'critical',
    icon: '⚖️'
  },

  {
    id: 37,
    timestamp: '2025-10-20',
    text: 'SMOKING GUN: Timecard Unlock Manipulation - Catch-22',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['smoking-gun', 'wrongful-dismissal'],
    description: 'Monday Oct 20, 2025 at 7:37 AM. Employee texts boss: "Can I get TC unlock pls" (timecard unlock request). CRITICAL SYSTEM CATCH-22 PROOF: Timecard system auto-locks after 3 days of being late submitting. Once locked, employee CANNOT submit ANY future timecards (completely blocked from system). ONLY boss can unlock. Boss CONTROLS employee\'s ability to comply with timecard requirements going forward. Each day system remains locked = MORE accumulated "failures to submit" that employee is POWERLESS to fix. Oct 20: Employee requests unlock to prevent further violations. Boss controls unlock timing. Oct 22 (2 days later): Employee TERMINATED for "continued failure to submit timecards." SMOKING GUN: Boss weaponized unlock system. Boss created the "continued failure" pattern by controlling access to the remedy, then cited the pattern HE CREATED as just cause for termination. Employee literally COULD NOT submit timecards while system locked, yet employer blamed employee for not submitting. Textbook manipulation and bad faith.',
    evidence: [
      'Text message Oct 20, 7:37 AM requesting unlock',
      'Timecard system auto-lock documentation',
      'Pattern of boss-controlled unlocks throughout employment',
      'Timeline: Oct 20 unlock request → Oct 22 termination (2 days)'
    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/smoking-guns/Oct-20-2025-Schedule-Manipulation.jpg',
        caption: 'SMOKING GUN #7: Text Mon Oct 20 7:37 AM "Can I get TC unlock pls". DEVASTATING CATCH-22: System locks → Employee CANNOT submit future timecards → Boss controls unlock (the remedy) → Boss delays unlock = accumulates "evidence" → Terminates for pattern boss created by controlling unlock. Textbook manipulation.'
      }
    ],
    witnesses: ['Boss (John) - controlled unlock', 'IT/System administrator - can confirm auto-lock function'],
    legalSignificance: '🚨 SYSTEM MANIPULATION SMOKING GUN 🚨 This is DEVASTATING proof of employer bad faith and manufactured "just cause." Employer designed broken timecard system with automatic lockout feature. Once locked: (1) Employee has ZERO ability to submit timecards (system blocks access), (2) ONLY boss can unlock (employee completely dependent), (3) Each day locked = accumulating "continued failures" employee CANNOT prevent, (4) Boss controls timing of unlock = boss controls whether employee can comply. CATCH-22 TIMELINE: Oct 20 morning: Employee requests unlock (trying to prevent further violations) → Boss controls unlock timing → System remains locked → Employee accumulates "evidence" of continued failure while waiting for boss → Oct 22: Boss terminates for "continued failure to submit timecards." Boss literally CREATED the "continued failure" pattern by controlling access to the system. Employee was trying to comply (requested unlock) but was POWERLESS without boss cooperation. This proves: (1) "Just cause" based on failures EMPLOYER CAUSED, (2) System designed to entrap employees (auto-lock with boss-only unlock), (3) Pretextual discipline (boss weaponized his own delays), (4) Bad faith (blamed employee for problem boss had power to fix), (5) ADHD discrimination (executive function difficulty with broken system + boss deliberately withheld accommodation tool - the unlock).',
    priority: 'nuclear',
    icon: '🔒',
    convergenceTrack: 2,
    causalLinks: [66, 34, 35],
    chainGroup: 'system-manipulation-final'
  },

  {
    id: 33,
    timestamp: '2025-10-20',
    text: 'Schedule Accommodation Denied - Mandatory Overtime',
    category: 'family',
    type: 'point',
    endDate: null,
    tags: ['smoking-gun', 'family', 'wrongful-dismissal'],
    description: 'Boss announced (approximately Oct 20): All employees MUST work 12-hour shifts, Oct 20 through Oct 31 (12 consecutive days), mandatory Saturdays and Sundays, two upcoming projects. Very short notice (same day or day before). Normal schedule: 8-hour shifts, Monday-Friday. New requirement: 12-hour shifts + weekends. Extended hours interfere with childcare for newborn. No accommodation offered. Employee requested accommodation (verbal conversation): Take Thursday Oct 23 (half day) and Friday Oct 24 (full day) off. In exchange: Work Saturday, Sunday, remainder of week. Continue 12-hour shifts for rest of period. Reason: Help friend with home project (personal obligation previously scheduled). Total hours same or more. Willing to work weekends. Willing to work 12-hour shifts. Just needed 1.5 days flexibility. Boss REFUSED: "You are REQUIRED to work Saturday and Sunday. It\'s IN YOUR CONTRACT. You WILL HAVE TO come in to work. NO IFS ANDS OR BUTS." Employee stated couldn\'t work those specific days, explained prior commitment, offered alternative (work other weekends/extended hours). Boss: Flat refusal, no discussion of alternatives, claimed contractual obligation, coercive language ("no ifs ands or buts").',
    evidence: [
      'Verbal conversation (no text/email - WEAKNESS)',
      'Coworker testimony - mandatory overtime announcement',
      'Employment contract - check if weekend work actually required',
      'Friend testimony - home project scheduled for Oct 23-24'
    ],
    witnesses: ['Coworkers - can confirm overtime announcement', 'Friend - can confirm prior commitment', 'Boss - made statements'],
    legalSignificance: '🚨 TRIGGERING EVENT FOR TERMINATION 🚨 Timeline: Oct 20 accommodation request/refusal + employee pushback → Oct 22 morning late → Oct 22 SAME DAY terminated. Employee challenged boss\'s mandatory overtime demand. Offered reasonable alternative (work other days, same hours). Boss refused without ANY discussion. Coercive language ("no ifs ands or buts"). Employee pushed back ("I said I couldn\'t"). 2 DAYS LATER: Terminated. This timing suggests: (1) Real reason for termination = challenging mandatory overtime, (2) Oct 22 lateness was convenient pretext, (3) Boss already wanted employee gone (safety complaints, parental leave, childcare), (4) Refusal to accept mandatory overtime = perceived insubordination = final straw. Failure to accommodate personal obligations: No inquiry into undue hardship, flat refusal, no alternatives explored. May support constructive dismissal if employee hadn\'t been fired: Unilateral change (12-hr shifts + weekends), short notice, refusal to accommodate, coercive language, intolerable conditions.',
    priority: 'nuclear',
    icon: '⏰',
    convergenceTrack: 2,
    causalLinks: [37, 34, 35],
    chainGroup: 'final-accommodation-denial-trigger'
  },

  {
    id: 34,
    timestamp: '2025-10-22',
    text: 'Final Lateness - Phone Died (Technical Failure)',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['smoking-gun', 'lateness-employee', 'wrongful-dismissal'],
    description: 'Oct 21 night: Employee\'s phone battery died during sleep. Phone turned on briefly during night (light visible). Wife told employee to turn it off. Employee assumed phone had enough battery. Phone died completely. Alarm did not go off. 8:00 AM: Employee woke up late (no alarm). Immediately texted boss: "Sorry, my phone died during the middle of the night, on my way now." Employee has this text saved (CRITICAL). Arrived ~8:30 AM (expected 7:30 AM). Lateness: 1 hour. One-time technical failure (phone battery died). Not habitual. Employee notified immediately upon realizing. No pattern of phone-died incidents. NOT childcare-related (unlike previous lateness). SAME DAY AT LUNCH: TERMINATED.',
    evidence: [
      'Text message at 8:00 AM (HAVE THIS - CRITICAL)',
      'GPS location proof',
      'Phone records if available',
      'Wife testimony about phone dying'
    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/termination/Oct-22-2025-Termination-Text.jpg',
        caption: 'Wed Oct 22 at 8:00 AM. Employee: "Sorry my phone died during middle of night. On my way now". Phone died = no alarm. Employee responded immediately when phone charged. Boss terminated at lunch despite legitimate reason.'
      },
      {
        type: 'doc',
        file: 'images/evidence/gps-proofs/Oct-22-2025-1.5hr-Late.jpg',
        caption: 'GPS Timeline: Wed Oct 22 2025. Left home 8:24 AM. Arrived 8:59 AM. TERMINATION DAY. Phone died overnight (no alarm). GPS proves phone actually died (left very late 8:24 AM). Sleep apnea made it impossible to wake without alarm. Terminated same day. RJ late SAME DAY without discipline = differential treatment.'
      }
    ],
    witnesses: ['Boss (received text)', 'Wife (witnessed phone situation)', 'RJ (late same day, not disciplined)'],
    legalSignificance: '🚨 SAME-DAY TERMINATION = PRETEXT PROOF 🚨 Normal employer response to one-time technical failure: Investigate circumstances, consider explanation, issue warning ("next time = termination"), give opportunity to improve. What this employer did: Late 8:00 AM → Terminated at lunch (SAME DAY). No investigation, no warning, no opportunity to explain. GPS PROVES phone died (left 8:24 AM). RJ LATE SAME DAY WITHOUT DISCIPLINE = differential treatment proving discriminatory motive. Timeline: Oct 20-21 employee challenged mandatory overtime + pushed back → Oct 22 morning late (unrelated technical issue) → Oct 22 boss seized opportunity: "Here\'s my excuse to fire him" → Oct 22 same day termination (HR already involved, letter already prepared?). Oct 22 lateness was PRETEXT - convenient excuse, not actual reason. Real reason: Retaliation for Oct 20-21 pushback on mandatory overtime.',
    latenessPersonKey: 'employee',
    priority: 'nuclear',
    icon: '📱'
  },

  {
    id: 45,
    timestamp: '2025-10-22',
    text: 'SMOKING GUN: RJ Late SAME DAY as Employee Termination',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['smoking-gun', 'lateness-coworker', 'wrongful-dismissal'],
    description: 'Wed Oct 22 - TERMINATION DAY. Coworker RJ late to work. NO DISCIPLINE. SMOKING GUN: Employee terminated at lunch THIS SAME DAY for pattern of lateness. RJ late SAME MORNING without consequences. PROVES: (1) Employer aware of RJ lateness same day as termination decision, (2) Chose to terminate employee but not discipline RJ for identical behavior, (3) Differential treatment on SAME DAY = undeniable proof of discriminatory motive. This is the ULTIMATE smoking gun for differential treatment - same day, same behavior, different outcomes based solely on protected grounds.',
    evidence: ['Text messages or observations about RJ lateness Oct 22', 'Coworker testimony'],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/differential-treatment/Oct-22-2025-RJ-Late.jpg',
        caption: 'SMOKING GUN: Wed Oct 22. RJ late SAME DAY employee terminated for pattern of lateness. Employee: late morning → terminated lunch. RJ: late morning → no discipline. SAME DAY differential treatment = undeniable proof of discriminatory motive. Employer CHOSE to terminate employee but tolerate RJ lateness on IDENTICAL DAY.'
      }
    ],
    witnesses: ['RJ', 'Coworkers'],
    legalSignificance: '🚨 ULTIMATE DIFFERENTIAL TREATMENT SMOKING GUN 🚨 Oct 22, 2025: (1) MORNING 8:00 AM: Employee late (phone died - technical failure) → Communicated immediately → GPS proof → Legitimate reason. (2) LUNCH 12:00 PM: Employee TERMINATED for "pattern of lateness." (3) SAME MORNING: RJ late → No communication → No discipline → No consequences. DEVASTATING PROOF: Employer made CONSCIOUS CHOICE on Oct 22 to terminate employee but NOT discipline RJ for IDENTICAL behavior on SAME DAY. This CANNOT be explained by legitimate business reasons. Only explanation: Discriminatory motive based on protected grounds. Employee = family status obligations (infant childcare) + disabilities (ADHD, sleep apnea) + parental leave (returned Oct 10, 12 days before). RJ = none of these. Alberta Human Rights Act: Differential enforcement of workplace rules based on protected grounds = discrimination. This single incident PROVES discriminatory motive. Pattern complete: Boss late 6 times (May-Aug) + RJ/Ramon late Oct 16 + RJ late Oct 22 (TERMINATION DAY) + Jessica no sick note Oct 14-16 = 9+ instances others\' violations tolerated vs employee terminated. ULTIMATE PROOF employer\'s "just cause" is PRETEXT.',
    latenessPersonKey: 'coworker',
    priority: 'nuclear',
    icon: '💣'
  },

  {
    id: 35,
    timestamp: '2025-10-22',
    text: 'TERMINATION - Ambush Meeting',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['smoking-gun', 'wrongful-dismissal'],
    description: 'SAME DAY as morning lateness. Lunchtime. Attendees: John (boss) in person, Michelle Sherman (Head of HR) on screen (remote - she is based in USA). Duration: UNDER 2 MINUTES from start to finish. Called into office with NO advance warning - ambush meeting. Employee sat down. Handed termination letter immediately. Boss: "You know what this is" (or similar). Employee read letter silently - no discussion, just reading. Saw "Termination with just cause" - heart sank. Saw "no severance will be given" - not even 2 weeks. Immediate realization: Very likely won\'t get EI, no severance (not even 2 weeks employee knew he was entitled to), "I need this money to pay rent and bills," complete financial panic. Employee in SHOCK - couldn\'t say anything. Employee asked: "Is there anything I need to sign?" Employer: "No." Employee left immediately - "Just up and left." Knew it was over. Employee\'s state: Complete shock, heart sank at "just cause," immediate understanding of devastating impact (no EI, no severance, can\'t pay rent/bills, financial crisis for family), paralyzed - couldn\'t speak/respond, felt cornered ("Anything I would have said wouldn\'t have helped"), knew it was predetermined, nothing would change outcome, knew it was over - no point saying anything, read silently - too shocked to speak or object. After meeting: Boss WATCHED employee gather belongings (supervised exit). Employee rushed under pressure - being watched created stressful, intimidating environment. Accidentally LEFT TERMINATION LETTER at workplace in shock/stress of supervised exit. Shows impact of ambush - employee so shocked couldn\'t think clearly about keeping critical documents.',
    evidence: [
      'Termination letter (LEFT AT WORKPLACE - need to retrieve or get copy)',
      'Employee testimony about meeting',
      'Shock/mental state',
      'Supervised exit',
      'Text message from Oct 22 morning (shows lateness was reason cited)'
    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/text-messages/2025-10-22_text_terminated.jpg',
        caption: 'Text message announcing termination'
      },
      {
        type: 'doc',
        file: 'images/evidence/documents/Termination-Letter.pdf',
        caption: 'SMOKING GUN #6: Termination letter claiming "just cause" with 3 reasons. Employee 75% sure original Oct 22 letter did NOT list specific reasons. Possible post-termination revision (sent Nov 4, 13 days later).'
      }
    ],
    witnesses: ['Boss (John)', 'Michelle Sherman (HR)', 'Coworkers who saw supervised exit'],
    legalSignificance: '🚨 ULTIMATE WRONGFUL TERMINATION 🚨 TIMELINE: Oct 10 returned from parental leave → Oct 14-16 sick (required note, Jessica wasn\'t) → Oct 20-21 requested accommodation, pushed back on overtime → Oct 22 8AM late (phone died) → Oct 22 SAME DAY terminated. Just cause threshold NOT MET: Lateness alone doesn\'t meet "destroy employment relationship" standard. ONE technical failure (phone died) ≠ fundamental breach. Inconsistent application (others late, no discipline). Family status discrimination (majority of lateness childcare-related, no accommodation offered). Disability discrimination (sleep apnea + ADHD known, no accommodation). SAME-DAY termination proves PRETEXT: No investigation, no hearing employee\'s side, disproportionate response, no final warning this incident would result in termination. Real reason timeline: Safety advocacy → Parental leave x2 → Family accommodations requested/denied → Oct 20-21 overtime pushback → Oct 22 pretext firing. ZERO procedural fairness: Ambush meeting (no warning), predetermined (letter ready), under 2 minutes total, no opportunity to respond/explain, employee in shock (paralyzed, felt cornered), boss: "You know what this is" (foregone conclusion), no discussion, just handed letter, employee read silently, heart sank, immediate financial panic, couldn\'t pay rent/bills, asked if anything to sign (no) and left, felt predetermined ("anything I said wouldn\'t have helped"), "I knew it was over." Supervised exit: Rushed, intimidating, forgot termination letter at workplace. "Last chance" warning does NOT justify this: (1) Oct 22 different circumstances (technical failure vs childcare), (2) No investigation, (3) No accommodation ever offered for family status, (4) Warning given under duress (10+ threats), (5) Same-day termination still disproportionate, (6) Protected ground not considered. ULTIMATE PROOF: Terminated for being technically competent safety advocate with family obligations employer refused to accommodate.',
    priority: 'nuclear',
    icon: '⚖️',
    convergenceTrack: 3,
    causalLinks: [33, 37, 79],
    chainGroup: 'termination-execution'
  },

  {
    id: 79,
    timestamp: '2025-10-22',
    text: 'EVIDENCE SPOLIATION: Email Access Cut During Active Review',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['smoking-gun', 'bad-faith', 'wrongful-dismissal'],
    description: 'Oct 22, 2025 afternoon (SAME DAY as termination, ~2-3 hours after lunchtime meeting): Employee returned to office to gather belongings and began reviewing work email to preserve employment records. Accessed work email system and SAW FOUR WRITE-UPS displayed. Went for brief walk. RETURNED TO FIND EMAIL ACCESS COMPLETELY REVOKED - no opportunity to save or download any documents. CRITICAL EVIDENCE DESTROYED: (1) Portal unlock request emails - would prove boss unlocked timecards late ~50% of time, proving boss\'s delays caused the payroll pressure employee was disciplined for, (2) All four write-ups - complete content, exact dates, exact wording now inaccessible, (3) All HR correspondence with Michelle Sherman, Carol Burke, Danielle Schwartz, (4) Safety concern communications, OHS emails, PPE requests, (5) Accommodation discussion emails about childcare/schedule flexibility. EVIDENCE SPOLIATION ELEMENTS ALL MET: ✅ Duty to preserve (litigation anticipated after wrongful dismissal), ✅ Breach (cut access while employee actively reviewing), ✅ Relevance (all destroyed evidence directly relevant to claims), ✅ Prejudice (employee has NO objective proof, NO friendly witnesses - only proof was in emails employer destroyed). TIMING PROVES CONSCIOUSNESS OF WRONGDOING: Access cut same day as termination, during active evidence gathering, during brief walk (suggests monitoring/intentional timing), no notice given, no opportunity to download.',
    evidence: [
      'Employee testimony: saw four write-ups, took brief walk, returned to find access revoked',
      'Oct 22 timeline: termination at lunch → email review afternoon → access cut afternoon',
      'Oct 23 Michelle Sherman email: Employee requests work email access (Item 8) - employer refuses',
      'Alberta law: Duty to preserve evidence once litigation anticipated',
      'Evidence spoliation doctrine: Adverse inference when relevant evidence destroyed'
    ],
    evidenceImages: [],
    witnesses: ['Employee (direct witness to access cutoff)', 'IT staff (who revoked access, can be subpoenaed)', 'Coworkers (may have received same portal unlock emails - not destroyed)'],
    legalSignificance: '🚨 EVIDENCE SPOLIATION SMOKING GUN 🚨 Employer intentionally destroyed critical evidence WHILE employee was actively gathering it (same day as termination, during brief walk). This is CONSCIOUS SPOLIATION showing: (1) Employer knew emails were harmful to their case, (2) Employer destroyed evidence before employee could preserve it, (3) Timing (during brief walk) suggests monitoring and intentional destruction. ADVERSE INFERENCE: Court can assume destroyed emails would support employee\'s version - particularly portal unlock emails proving boss caused 50% of timecard problems employee was disciplined for. LOST EVIDENCE: Portal unlock emails = SMOKING GUN for ADHD discrimination (would prove system failure + boss\'s failures, NOT employee\'s disability), All write-ups = critical evidence of progressive discipline failure, HR correspondence = proof of employer responses. EMPLOYEE HAS NO FRIENDLY WITNESSES: Boss hostile, Michelle hostile, Danielle hostile, coworkers fear retaliation. ONLY OBJECTIVE PROOF WAS IN EMAILS - timestamped, undisputable, cannot be recharacterized. EMPLOYER DESTROYED THAT PROOF. REMEDIES: (1) Preservation order for all email backups/portal logs, (2) Production of complete email archive and IT access logs, (3) Adverse inference that destroyed emails supported employee, (4) Aggravated/punitive damages for intentional spoliation, (5) Coworker subpoenas for same portal emails. BAD FAITH DAMAGES: Evidence destruction extends Wallace damages, 2024 Alberta case awarded $10k punitive for ROE delay alone - evidence destruction more egregious.',
    priority: 'nuclear',
    icon: '🗑️',
    convergenceTrack: 3,
    causalLinks: [35, 53, 60, 61],
    chainGroup: 'post-termination-obstruction'
  },

  // POST-TERMINATION CORRESPONDENCE - Bad Faith Pattern
  // Organized by person with color coding

  // INITIAL CORRESPONDENCE - Oct 22-23

  {
    id: 54,
    timestamp: '2025-10-22',
    text: 'Employee Requests Employment Records from Michelle',
    category: 'correspondence-michelle',
    type: 'point',
    endDate: null,
    tags: ['correspondence', 'wrongful-dismissal'],
    description: 'Oct 22, 11:34 PM (same day as termination): Employee emails Michelle Sherman requesting complete employment file under Alberta law. Requests within 48 hours: (1) ROE, (2) All disciplinary notices, (3) Performance reviews, (4) HR correspondence, (5) Timesheets/payroll, (6) Employment contract, (7) Attendance policies, (8) Work email access. CRITICAL: Item 8 (work email access) explicitly requested - employer later refuses this item specifically.',
    evidence: [
      'Email to Michelle Sherman (Oct 22, 11:34 PM)',
      'Employment file request documentation'
    ],
    evidenceImages: [
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-22-2025-Employment-Records-Request.png',
        caption: 'Oct 22, 11:34 PM. Employee formally requests complete employment file from Michelle Sherman. Item 8 requests work email access - later explicitly refused by Carol Burke.'
      }
    ],
    witnesses: ['Michelle Sherman (HR)', 'Email records'],
    legalSignificance: 'Establishes timeline of document access requests. Employee exercised rights under PIPA immediately after termination. Employer\'s subsequent refusal of Item 8 (work email access) and delays in providing documents = bad faith pattern begins same day as termination.',
    priority: 'high',
    icon: '📧'
  },

  {
    id: 55,
    timestamp: '2025-10-23',
    text: 'Carol Burke: Initial Response - Stalling on Documents',
    category: 'correspondence-carol',
    type: 'point',
    endDate: null,
    tags: ['correspondence', 'wrongful-dismissal'],
    description: 'Oct 23: Carol Burke (employer lawyer) responds to employee\'s Oct 22 request. STALLING TACTICS: (1) Claims will provide employment file "once ROE finalized" (no timeline given), (2) Claims employment contract "already provided by Ms. Sherman" (to revoked work email - inaccessible), (3) Does not address Item 8 (work email access). Pattern: Conditioning document access on other items, claiming documents "provided" when inaccessible.',
    evidence: [
      'Email from Carol Burke (Oct 23)',
      'Document access obstruction pattern'
    ],
    evidenceImages: [
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-23-2025-Carol-Burke.png',
        caption: 'Oct 23. Carol Burke stalls on document production: conditions employment file on ROE completion, claims contract "already provided" to revoked email. Document access obstruction begins.'
      }
    ],
    witnesses: ['Carol Burke (employer lawyer)', 'Email records'],
    legalSignificance: 'POST-TERMINATION BAD FAITH: Day after termination, employer begins pattern of document access obstruction. Conditioning file access on ROE = improper under PIPA. Claiming contract "provided" when sent to revoked email = bad faith. Sets up pattern: stalling (Oct 23) → wrong docs (Oct 30) → 6-day delay for correction (Nov 4).',
    priority: 'high',
    icon: '📄'
  },

  // DANIELLE SCHWARTZ (Payroll) - Final Pay Issues

  {
    id: 46,
    timestamp: '2025-10-24',
    text: 'Danielle Schwartz: Final Pay Coordination Begins',
    category: 'correspondence-danielle',
    type: 'point',
    endDate: null,
    tags: ['correspondence', 'wrongful-dismissal'],
    description: 'Oct 24: Post-termination final pay coordination with Danielle Schwartz (payroll). Employee provides correct bank account details for direct deposit. Employee requests timecard access to verify final hours. TIMELINE ACCESS BLOCKED: Employer refuses to grant timecard system access post-termination, continuing pattern of timecard system manipulation and control.',
    evidence: [
      '2 emails with Danielle Schwartz (Oct 24)',
      'Bank account information provided by employee',
      'Timecard access denial'
    ],
    evidenceImages: [
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-24-2025-Danielle-Schwartz-Pay-1.png',
        caption: 'Oct 24. Initial final pay coordination. Employee requests timecard access. Employer blocks access continuing post-termination control pattern.'
      },
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-24-2025-Danielle-Schwartz-Pay-2.png',
        caption: 'Oct 24. Employee provides correct bank account details for final pay direct deposit.'
      }
    ],
    witnesses: ['Danielle Schwartz (payroll)', 'Email records'],
    legalSignificance: 'POST-TERMINATION BAD FAITH: Employer blocks timecard access preventing employee from verifying final hours worked. Employee entitled to verify own hours. Blocking access = bad faith pattern, continuing employer control even after termination. Sets up wrong bank account error (Oct 27).',
    priority: 'high',
    icon: '💰'
  },

  {
    id: 47,
    timestamp: '2025-10-27',
    text: 'Danielle Schwartz: WRONG BANK ACCOUNT - Bad Faith',
    category: 'correspondence-danielle',
    type: 'point',
    endDate: null,
    tags: ['critical', 'correspondence', 'wrongful-dismissal'],
    description: 'Oct 27: Employer sends final pay to WRONG BANK ACCOUNT despite employee providing correct account information Oct 24. Multiple emails back and forth required to resolve employer error. Bad faith causing financial hardship when employee has no income and needs money for rent/bills. Pattern: Wrong bank account + blocked timecard access = post-termination misconduct.',
    evidence: [
      '7 emails with Danielle Schwartz (Oct 27)',
      'Bank account information (correct vs wrong)',
      'Evidence of wrong account used by employer'
    ],
    evidenceImages: [
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-27-2025-Danielle-Schwartz-Pay-3.png',
        caption: 'Oct 27. Wrong bank account issue discovered. Employee must coordinate correction.'
      },
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-27-2025-Danielle-Schwartz-Pay-4.png',
        caption: 'Oct 27. Continued coordination about wrong bank account error.'
      },
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-27-2025-Danielle-Schwartz-Pay-5.png',
        caption: 'Oct 27. Multiple emails required to resolve employer mistake.'
      },
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-27-2025-Danielle-Schwartz-Pay-6.png',
        caption: 'Oct 27. WRONG BANK ACCOUNT: Final pay sent to incorrect account despite employee providing correct details. Bad faith causing financial hardship when employee has no income.'
      },
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-27-2025-Danielle-Schwartz-Pay-7.png',
        caption: 'Oct 27. Additional coordination required for employer error correction.'
      },
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-27-2025-Danielle-Schwartz-Pay-8.png',
        caption: 'Oct 27. Ongoing resolution attempts for wrong bank account.'
      },
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-27-2025-Danielle-Schwartz-Pay-9.png',
        caption: 'Oct 27. Final coordination for wrong bank account correction.'
      }
    ],
    witnesses: ['Danielle Schwartz (payroll)', 'Bank records', 'Email records'],
    legalSignificance: 'POST-TERMINATION BAD FAITH: Employer sends final pay to wrong bank account despite having correct information provided Oct 24. Causes financial hardship during period when employee has no income and needs money for rent/bills. 2024 Alberta case law: Bad faith damages $10k-$20k for similar post-termination misconduct. This is OBJECTIVE evidence of employer carelessness/bad faith - wrong account is indisputable.',
    priority: 'critical',
    icon: '💰'
  },

  {
    id: 48,
    timestamp: '2025-10-28',
    text: 'Danielle Schwartz: Final Pay Resolution',
    category: 'correspondence-danielle',
    type: 'point',
    endDate: null,
    tags: ['correspondence', 'wrongful-dismissal'],
    description: 'Oct 28: Final resolution after multiple days coordination. Employee stress and financial uncertainty caused by employer "mistake." Wrong bank account error finally corrected after 4 days (Oct 24-28) of email exchanges. Employee forced to spend time and emotional energy resolving employer errors during already difficult post-termination period.',
    evidence: [
      '3 emails with Danielle Schwartz (Oct 28)',
      'Final corrected payment records'
    ],
    evidenceImages: [
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-28-2025-Danielle-Schwartz-Pay-10.png',
        caption: 'Oct 28. Continued resolution of wrong bank account issue.'
      },
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-28-2025-Danielle-Schwartz-Pay-11.png',
        caption: 'Oct 28. Final coordination to correct employer error.'
      },
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-28-2025-Danielle-Schwartz-Pay-12.png',
        caption: 'Oct 28. Final resolution after multiple days coordination. Employee stress and financial uncertainty caused by employer "mistake."'
      }
    ],
    witnesses: ['Danielle Schwartz (payroll)', 'Bank records'],
    legalSignificance: 'Shows 4-day timeline (Oct 24-28) of employee having to coordinate correction of employer error. Pattern of post-termination bad faith. Employee already dealing with termination stress, now must spend time/energy fixing employer mistakes. Aggravates wrongful dismissal damages.',
    priority: 'medium',
    icon: '💰'
  },

  // CAROL BURKE (Employer Lawyer) - Employment File & Document Issues

  {
    id: 49,
    timestamp: '2025-10-29',
    text: 'Carol Burke: Initial Document Request',
    category: 'correspondence-carol',
    type: 'point',
    endDate: null,
    tags: ['correspondence', 'wrongful-dismissal'],
    description: 'Oct 29: Employee requests complete employment file through lawyer. Carol Burke (employer\'s lawyer) acknowledges request. Sets up Oct 30 delivery of WRONG documents and Nov 4 correction creating document tampering concerns.',
    evidence: [
      'Email from Carol Burke (Oct 29)',
      'Employment file request documentation'
    ],
    evidenceImages: [
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-29-2025-Carol-Burke.png',
        caption: 'Oct 29. Initial employment file request acknowledgment from Carol Burke (employer lawyer). Sets up document delivery issues (Oct 30 wrong docs, Nov 4 corrections).'
      }
    ],
    witnesses: ['Carol Burke (employer lawyer)', 'Email records'],
    legalSignificance: 'Establishes timeline of document request. Employee entitled to complete employment file under Alberta law. Sets up document integrity concerns when wrong documents sent Oct 30 and corrected Nov 4.',
    priority: 'medium',
    icon: '📄'
  },

  {
    id: 50,
    timestamp: '2025-10-30',
    text: 'Carol Burke: WRONG DOCUMENTS SENT',
    category: 'correspondence-carol',
    type: 'point',
    endDate: null,
    tags: ['smoking-gun', 'correspondence', 'wrongful-dismissal'],
    description: 'Oct 30: Carol Burke sends employment documents in response to request. WRONG DOCUMENTS SENT: Employment agreement sent Oct 30 is incorrect. Creates document tampering concerns when corrected version sent Nov 4 (5 days later). CRITICAL QUESTION: Which version contained "Dear Rollins:" error - original Oct 30 or correction Nov 4? Document integrity compromised.',
    evidence: [
      '2 emails with Carol Burke (Oct 30)',
      'Wrong employment agreement (Oct 30)',
      'Document comparison (Oct 30 vs Nov 4)'
    ],
    evidenceImages: [
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-30-2025-Carol-Burke-1.png',
        caption: 'Oct 30. Carol Burke sends employment documents. WRONG documents included.'
      },
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-30-2025-Carol-Burke-2.png',
        caption: 'Oct 30. Wrong employment agreement sent (later corrected Nov 4). Creates document tampering concerns and credibility issues.'
      },
      {
        type: 'doc',
        file: 'images/evidence/documents/Continuation-of-Coverage.pdf',
        caption: 'Manulife Continuation of Coverage form - wrong benefits document sent Oct 30'
      },
      {
        type: 'doc',
        file: 'images/evidence/documents/Life-Conversion-Form.pdf',
        caption: 'Manulife Life Conversion Form - wrong benefits document sent Oct 30'
      }
    ],
    witnesses: ['Carol Burke (employer lawyer)', 'Document metadata', 'Email records'],
    legalSignificance: '🚨 DOCUMENT TAMPERING SMOKING GUN 🚨 Wrong documents sent Oct 30, corrected Nov 4 raises CRITICAL questions: (1) Was "Dear Rollins:" error in original or correction? If original = VOID CONTRACT worth $10k-$20k, (2) Were documents altered between Oct 22 termination and Nov 4 correction? (3) Pattern undermines employer credibility completely. Sets up Nov 4 nuclear smoking gun. "Dear Rollins:" contract error = potential void contract for mistake in identity.',
    priority: 'nuclear',
    icon: '📄'
  },

  {
    id: 51,
    timestamp: '2025-10-31',
    text: 'Carol Burke: Ongoing Document Coordination',
    category: 'correspondence-carol',
    type: 'point',
    endDate: null,
    tags: ['correspondence', 'wrongful-dismissal'],
    description: 'Oct 31: Continued coordination about employment documents. Wrong documents sent Oct 30 creating need for additional emails and delays. Employee waiting for correct documents to understand legal position and prepare case.',
    evidence: [
      'Email from Carol Burke (Oct 31)',
      'Document coordination records'
    ],
    evidenceImages: [
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-31-2025-Carol-Burke.png',
        caption: 'Oct 31. Continued document coordination after wrong documents sent Oct 30. Delays employee\'s access to correct employment file.'
      }
    ],
    witnesses: ['Carol Burke (employer lawyer)', 'Email records'],
    legalSignificance: 'Shows ongoing coordination delays caused by employer sending wrong documents. Employee entitled to timely access to employment file. Delays prejudice employee\'s ability to assess legal position.',
    priority: 'medium',
    icon: '📄'
  },

  {
    id: 52,
    timestamp: '2025-11-04',
    text: 'Carol Burke: CORRECTED DOCUMENTS - Tampering Concerns',
    category: 'correspondence-carol',
    type: 'point',
    endDate: null,
    tags: ['smoking-gun', 'correspondence', 'wrongful-dismissal'],
    description: 'Nov 4: Carol Burke sends CORRECTED employment documents (5 DAYS after Oct 30 wrong docs). SMOKING GUN: Corrected documents raise serious tampering concerns. CRITICAL QUESTIONS: (1) Was "Dear Rollins:" error in original Oct 30 version or corrected Nov 4 version? If original = void contract worth $10k-$20k. (2) Was termination letter altered between Oct 22 and Nov 4? Employee 75% certain Oct 22 letter did NOT include specific 3 reasons listed in Nov 4 version. (3) Pattern of "mistakes" (wrong agreement + wrong bank account + ROE delay) destroys employer credibility.',
    evidence: [
      'Email from Carol Burke (Nov 4)',
      'Corrected employment agreement (Nov 4)',
      'Termination letter (Nov 4) - possibly altered?',
      'Timeline: Oct 30 wrong docs → Nov 4 corrections = 5-day delay'
    ],
    evidenceImages: [
      {
        type: 'email',
        file: 'images/evidence/correspondence/Nov-04-2025-Carol-Burke.png',
        caption: 'SMOKING GUN: Nov 4 (5 days later). Carol Burke sends CORRECTED documents. Raises questions: (1) Was "Dear Rollins:" error in original or correction? (2) Was termination letter altered between Oct 22 and Nov 4? (3) Pattern of document "mistakes" undermines employer credibility.'
      },
      {
        type: 'doc',
        file: 'images/evidence/documents/Employment-Agreement-Dear-Rollins-Error.pdf',
        caption: 'Employment Agreement with "Dear Rollins:" error. Received Nov 4 as "corrected" version (5 days after Oct 30 wrong docs). CRITICAL QUESTION: Was this the original wrong version (Oct 30) or the "correction" (Nov 4)? If this is original = void contract. Document integrity compromised.'
      },
      {
        type: 'doc',
        file: 'images/evidence/documents/Termination-Letter.pdf',
        caption: 'DOCUMENT TAMPERING CONCERN: Termination letter received Nov 4 from Carol Burke (13 days after Oct 22 termination). Employee 75% certain original Oct 22 letter did NOT include these specific 3 reasons. Were reasons added post-termination to strengthen "just cause" claim? After-acquired cause doctrine: Evidence obtained/altered post-termination cannot justify termination.'
      }
    ],
    witnesses: ['Carol Burke (employer lawyer)', 'Employee\'s memory of Oct 22 termination letter', 'Document metadata'],
    legalSignificance: '🚨 DOCUMENT TAMPERING CONCERNS 🚨 (1) "Dear Rollins:" contract error = potential void contract worth $10k-$20k if proven original, (2) Termination letter possibly altered post-Oct 22 to add specific reasons strengthening "just cause" claim - employee 75% certain original letter different, (3) Pattern of document "mistakes" (wrong agreement, wrong bank account, ROE delay) undermines employer credibility completely, (4) 5-day delay to correct = bad faith, (5) After-acquired cause doctrine: Evidence obtained/altered post-termination cannot justify termination. This correspondence is DEVASTATING for employer\'s case credibility.',
    priority: 'nuclear',
    icon: '📄'
  },

  // MICHELLE SHERMAN (HR Director) - ROE Delay Federal Violation

  {
    id: 53,
    timestamp: '2025-11-04',
    text: 'Michelle Sherman: ROE Request - Federal Violation',
    category: 'correspondence-michelle',
    type: 'point',
    endDate: null,
    tags: ['smoking-gun', 'correspondence', 'wrongful-dismissal'],
    description: 'Nov 4, 2025: Employee requests Record of Employment (ROE) from Michelle Sherman (HR Director). FEDERAL LAW VIOLATION: Employment Insurance Act s. 19 requires employer issue ROE within 5 CALENDAR DAYS of termination or end of pay period. Termination date: Oct 22, 2025. ROE request date: Nov 4, 2025 = 13 DAYS after termination. Employer late by 8-9 days minimum (13 days - 5 day requirement = 8-9 day violation). Employee needs ROE for EI application. Delay causes: (1) EI application delay, (2) Financial hardship (no income, no EI), (3) Additional stress during already difficult post-termination period. 2024 Alberta case (ROE delay + financial hardship) = $10,000 punitive damages awarded.',
    evidence: [
      '3 emails with Michelle Sherman requesting ROE (Nov 4)',
      'Employment Insurance Act s. 19 (5-day requirement)',
      'Timeline: Oct 22 termination → Nov 4 ROE request = 13 days'
    ],
    evidenceImages: [
      {
        type: 'email',
        file: 'images/evidence/correspondence/Nov-04-2025-Michelle-Sherman-ROE-1.png',
        caption: 'Nov 4. Employee requests ROE 13 days after termination. Federal law requires ROE within 5 days. Employer in violation by 8-9 days minimum.'
      },
      {
        type: 'email',
        file: 'images/evidence/correspondence/Nov-04-2025-Michelle-Sherman-ROE-2.png',
        caption: 'Nov 4. ROE delay correspondence showing federal violation timeline.'
      },
      {
        type: 'email',
        file: 'images/evidence/correspondence/Nov-04-2025-Michelle-Sherman-ROE-3.png',
        caption: 'Nov 4. ROE delay correspondence. Employer violated federal 5-day requirement causing EI application delay and financial hardship. 2024 case: $10k punitive damages for similar ROE delays.'
      }
    ],
    witnesses: ['Michelle Sherman (HR)', 'EI application records'],
    legalSignificance: '🚨 FEDERAL LAW VIOLATION 🚨 Employment Insurance Act s. 19 requires ROE within 5 calendar days. Employer violated by 8-9 days minimum (termination Oct 22 → request Nov 4 = 13 days). This violation: (1) Delays EI application causing financial hardship, (2) Employer knew employee had no income (just terminated), (3) Combined with wrong bank account = pattern of bad faith causing financial distress, (4) 2024 Alberta case awarded $10,000 punitive damages for ROE delays with similar financial impact. STRATEGIC VALUE: This federal violation is OBJECTIVE (clear 5-day rule, clear 13-day timeline) and DAMAGES are PROVEN (financial hardship, no income, delayed EI). Adds $10k-$15k to settlement demand as punitive/bad faith damages.',
    priority: 'nuclear',
    icon: '📋'
  },

  {
    id: 60,
    timestamp: '2025-11-05',
    text: 'Michelle Sherman: ROE Released to MSCA',
    category: 'correspondence-michelle',
    type: 'point',
    endDate: null,
    tags: ['correspondence', 'wrongful-dismissal'],
    description: 'Nov 5, 2025: Record of Employment (ROE) finally released to My Service Canada Account (MSCA) as indicated by Michelle Sherman in her Nov 4 email. 14-DAY TOTAL DELAY from termination (Oct 22 → Nov 5 = 14 days). Federal law requires ROE within 5 calendar days. Employer violated requirement by 9 days. This delay prevented employee from applying for EI benefits for nearly 2 weeks, causing financial hardship during period when employee had no income and family to support. Michelle Sherman\'s Nov 4 email: "It will more than likely be released to MSCA sometime on Wednesday November 5, 2025." Shows employer awareness of delay but no urgency despite federal legal requirement and employee\'s financial need.',
    evidence: [
      'Nov 4 Michelle Sherman email predicting Nov 5 release',
      'Nov 5 MSCA availability (if documented)',
      '14-day timeline: Oct 22 termination → Nov 5 ROE = 9-day violation of 5-day requirement'
    ],
    evidenceImages: [
      {
        type: 'email',
        file: 'images/evidence/correspondence/Nov-04-2025-Michelle-Sherman-ROE-3.png',
        caption: 'Nov 4 email from Michelle Sherman indicating ROE would be released to MSCA "sometime on Wednesday November 5, 2025." Shows 14-day delay from termination (Oct 22 to Nov 5) violating federal 5-day requirement by 9 days.'
      },
      {
        type: 'doc',
        file: 'images/evidence/documents/ROE-NOV5-2025.pdf',
        caption: 'Actual ROE document released Nov 5, 2025 - proof of 14-day delay violating 5-day federal requirement'
      }
    ],
    witnesses: ['Michelle Sherman (HR)', 'MSCA records', 'EI application timeline'],
    legalSignificance: 'FEDERAL VIOLATION COMPLETION: 14-day delay (Oct 22 termination → Nov 5 ROE release) = 9-day violation of Employment Insurance Act 5-day requirement. This extended delay: (1) Prevented EI application for 2 weeks causing severe financial hardship, (2) Employee had zero income + family to support, (3) Combined with wrong bank account (Oct 27) = pattern of bad faith causing financial distress, (4) Employer showed no urgency despite federal legal requirement and known employee financial need. 2024 Alberta case: Similar ROE delay with financial hardship = $10,000 punitive damages. This violation is OBJECTIVE (clear law, clear timeline) with PROVEN DAMAGES (financial hardship, delayed benefits).',
    priority: 'high',
    icon: '📋'
  },

  // ADDITIONAL EVIDENCE - Differential Treatment, Parental Leave Retaliation, OHS

  {
    id: 59,
    timestamp: '2025-10-17?',
    text: 'SMOKING GUN: Jessica Sick Note Differential Treatment',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['smoking-gun', 'wrongful-dismissal'],
    description: 'Oct 17, 2025 (exact date uncertain): Jessica sent home sick from meeting and NOT required to provide sick note. SAME WEEK (Oct 14-16) employee was sick and REQUIRED to provide doctor\'s note. DIFFERENTIAL TREATMENT: Employer applies inconsistent sick note policy. Employee (with family obligations, sleep apnea, prior accommodation requests) held to stricter standard than Jessica. Proves discriminatory enforcement based on protected grounds. Pattern: Employee accommodation withdrawal (July 20) → sick note demands (Sept 3, Oct 14) → termination (Oct 22, 5 days later).',
    evidence: [
      'Text message requiring employee sick note',
      'Witness testimony (Jessica)',
      'Pattern of differential treatment'
    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/differential-treatment/Oct-14-16-2025-Sick-Note-Required.jpg',
        caption: 'SMOKING GUN: Oct 17. Jessica sent home sick from meeting, NOT required to provide sick note. SAME WEEK (Oct 14-16) employee sick and required to provide doctor\'s note. Differential treatment proves discriminatory enforcement. Employer holds employee to stricter standard = family status + disability discrimination. 5 days before termination.'
      }
    ],
    witnesses: ['Jessica (witness - sent home sick, no note required)', 'Boss (John)', 'Coworkers at meeting'],
    legalSignificance: '🚨 DIFFERENTIAL TREATMENT SMOKING GUN 🚨 Inconsistent sick note policy proves discrimination: (1) Employee (protected grounds: family status, disability) REQUIRED to provide sick note Oct 14-16, (2) Jessica (no protected grounds) sent home sick SAME WEEK (Oct 17), NOT required to provide sick note, (3) Proves employer holds employee to stricter standard based on protected characteristics, (4) Timing: 5 days before termination = pretext building, (5) Pattern: July 20 accommodation withdrawal → Sept 3 sick note demand → Oct 14 sick note demand → Oct 22 termination. Alberta Human Rights Act prohibits differential treatment based on protected grounds. This evidence DESTROYS employer\'s "applied policies consistently" defense.',
    priority: 'nuclear',
    icon: '⚖️'
  },

  {
    id: 60,
    timestamp: '2025-09-11',
    text: 'CATASTROPHIC ROE ERROR - Parental Leave Retaliation',
    category: 'family',
    type: 'point',
    endDate: null,
    tags: ['critical', 'family', 'wrongful-dismissal'],
    description: 'Sept 11, 2025: Employer issues INCORRECT Record of Employment (Serial M17099756) during employee\'s 5-week parental leave. CATASTROPHIC ERRORS: (1) First day worked shows Aug 24, 2025 (should be Jan 3, 2024 = 8 MONTHS WRONG!), (2) Only 59 insurable hours shown (should be 1,452 hours = 95.9% ERROR), (3) Only $1,979.52 insurable earnings shown (should be $35,538.76 = 94.4% ERROR). WOULD HAVE DESTROYED EI CLAIM: These errors would have cost employee approximately 18 MONTHS of EI parental benefits. Employer incompetence/chaos during protected parental leave. Corrected ROE not issued until Sept 19 (8-day delay). Shows employer administrative failures during period when employee exercising protected right to parental leave.',
    evidence: [
      'Incorrect ROE Serial M17099756 (Sept 11)',
      'Corrected ROE Serial M17280425 (Sept 19)',
      'Comparison showing massive errors',
      'EI benefit calculation impact'
    ],
    evidenceImages: [
      {
        type: 'doc',
        file: 'images/evidence/documents/ROE-2025-Incorrect.pdf',
        caption: 'CATASTROPHIC ROE ERROR: Serial M17099756 signed Sept 11 2025 during parental leave. First day worked: Aug 24 2025 (8 months wrong!). Hours: 59 (should be 1,452). Earnings: $1,979.52 (should be $35,538.76). ERROR SO MASSIVE it would have DESTROYED employee\'s EI parental benefits claim (18 months of benefits lost). Employer incompetence during protected parental leave.'
      }
    ],
    witnesses: ['Ritika (ROE signer)', 'Michelle Sherman (HR)', 'Service Canada (if EI filed)'],
    legalSignificance: '🚨 PARENTAL LEAVE RETALIATION 🚨 Catastrophic ROE error during protected parental leave: (1) 95%+ error rate in hours and earnings, (2) Would have destroyed EI claim = financial catastrophe for new parent, (3) Timing: During 5-week parental leave (protected under Alberta Employment Standards), (4) 8-day delay to correct shows employer chaos/incompetence, (5) Pattern: Parental leave (Sept 5-Oct 9) → catastrophic ROE error (Sept 11) → write-up day of return (Oct 10) → termination 12 days later (Oct 22). Proves employer retaliation/targeting during protected leave. Even if not intentional retaliation, employer negligence during parental leave = aggravating factor for bad faith damages.',
    priority: 'critical',
    icon: '📋'
  },

  {
    id: 61,
    timestamp: '2025-09-19',
    text: 'Corrected ROE Issued - 8-Day Delay',
    category: 'family',
    type: 'point',
    endDate: null,
    tags: ['family', 'wrongful-dismissal'],
    description: 'Sept 19, 2025: Employer issues CORRECTED Record of Employment (Serial M17280425), 8 DAYS after incorrect ROE (Sept 11). Corrections: First day worked now Dec 15, 2024 (still wrong - should be Jan 3, 2024 but closer), 1,452 insurable hours (was 59), $35,538.76 insurable earnings (was $1,979.52). Signed by different person (Tiffany Li vs Ritika). Comments: "All vacation time has been used and paid out". Shows employer finally got it mostly right after catastrophic error, but 8-day delay during critical EI application period. Employee still on parental leave when corrected ROE issued.',
    evidence: [
      'Corrected ROE Serial M17280425 (Sept 19)',
      'Comparison to incorrect ROE (Sept 11)',
      '8-day timeline Sept 11-19'
    ],
    evidenceImages: [
      {
        type: 'doc',
        file: 'images/evidence/documents/ROE-2025-Corrected.pdf',
        caption: 'CORRECTED ROE: Serial M17280425 signed Sept 19 2025 by Tiffany Li (8 days after incorrect). Massive corrections: Hours 59 → 1,452. Earnings $1,979.52 → $35,538.76. First day still wrong (Dec 15 vs Jan 3) but close. Proves employer administrative chaos during parental leave. 8-day delay during critical EI application period.'
      }
    ],
    witnesses: ['Tiffany Li (corrected ROE signer)', 'Michelle Sherman (HR)', 'Ritika (original incorrect ROE signer)'],
    legalSignificance: 'Corrected ROE shows: (1) Employer recognized massive errors and corrected them, (2) 8-day delay during employee\'s parental leave when EI benefits critical, (3) Different signer (Tiffany vs Ritika) suggests escalation/recognition of severity, (4) First day still wrong (Dec 15 vs Jan 3) shows continued administrative incompetence, (5) Pattern continues: Catastrophic error (Sept 11) → 8-day delay → correction (Sept 19) → employee returns from leave (Oct 10) → terminated 12 days later (Oct 22). Timeline proves employer chaos during protected parental leave period.',
    priority: 'high',
    icon: '📋'
  },

  {
    id: 62,
    timestamp: '2025-06-03',
    text: 'OHS: Hazardous Waste - $10k Tank Decontamination',
    category: 'ohs',
    type: 'point',
    endDate: null,
    tags: ['ohs', 'wrongful-dismissal'],
    description: 'Tue June 3, 2025 at 11:30 AM: Group chat discussion about BOS tank hazardous contamination. Boss needs photos of cells inside tank "with the fluid that came back" to charge back $10,000 in decontamination costs. Ramon reports tank already drained - "all black water/fluid below the suction line". Boss confirms discussing with Mike. PROVES: (1) Hazardous waste requiring $10k decontamination = SERIOUS contamination, (2) Employer aware of hazardous conditions, (3) Pattern of OHS concerns employee raised (confined spaces, PPE, chemical exposure), (4) $10k decontamination cost shows employer knew conditions were hazardous but failed to protect workers adequately. Supports employee\'s year-long advocacy for proper PPE and safety protocols.',
    evidence: [
      'Group chat text message (June 3)',
      '$10k decontamination invoice/work order',
      'Discussion with Mike (supervisor/manager)',
      'Coworker testimony (Ramon)'
    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/ohs/June-03-2025-Tank-Decontamination-10k.jpg',
        caption: 'Tue June 3 at 11:30 AM. Group chat (John S3S + Ramon S3S + Employee). Boss: "I need pictures of the cells inside that BOS tank with the fluid that came back. Needed pictures to charge back $10k in decontamination". Ramon: "It\'s too late. We drain it already. Its all black water/fluid below the suction line". PROVES: Hazardous contamination requiring $10,000 decontamination. Employer knew about serious hazards but failed to provide adequate PPE/protection. Supports employee\'s OHS advocacy.'
      }
    ],
    witnesses: ['Ramon', 'RJ', 'Mike (supervisor/manager)', 'Coworkers in group chat'],
    legalSignificance: 'OHS EVIDENCE: $10,000 decontamination for hazardous tank contamination proves: (1) Work conditions were objectively hazardous (employer admitted via decontamination cost), (2) "Black water/fluid" = serious contamination requiring professional remediation, (3) Employer knew about hazards (discussing charge-back with Mike), (4) Pattern: Employee advocates for PPE/safety (2024-2025) → Employer denies → Hazardous conditions proven ($10k decontamination + epoxy injury July 2025) → Employee terminated (Oct 2025) = witness elimination. Supports OHS retaliation claim under Alberta OHS Act Section 35 (worker right to raise safety concerns without retaliation).',
    priority: 'high',
    icon: '☣️'
  },

  {
    id: 63,
    timestamp: '2025-05-09',
    text: 'OHS: Painting Washbay - Inadequate Ventilation',
    category: 'ohs',
    type: 'point',
    endDate: null,
    tags: ['ohs', 'wrongful-dismissal'],
    description: 'Fri May 9, 2025 at 7:05 AM: Group chat discussion reveals inadequate ventilation during painting work in washbay. Boss instructs: "Who ever gets to the shop first can we get the bay doors open for the wash bay to circulate the air". Ramon confirms: "I did already". Boss asks about paint: "Paint still wet? I am waiting on the train". Ramon: "Some spots are. But mostly dry". PROVES: (1) Painting work done in washbay with inadequate ventilation (need bay doors open to "circulate air"), (2) Boss admits ventilation problem by requesting doors open for air circulation, (3) Paint fumes/exposure without proper ventilation = OHS violation, (4) Pattern: Employee raised PPE/ventilation concerns, employer acknowledged problems but failed to implement proper controls. Supports employee OHS advocacy claims.',
    evidence: [
      'Group chat text message (May 9)',
      'Washbay painting work orders',
      'Ventilation system documentation (or lack thereof)',
      'Coworker testimony (Ramon)'
    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/ohs/May-09-2025-Painting-Washbay.jpg',
        caption: 'Fri May 9 at 7:05 AM. Group chat (John S3S + Ramon S3S). Boss: "Who ever gets to the shop first can we get the bay doors open for the wash bay to circulate the air". Ramon: "I did already". Boss: "Paint still wet? I am waiting on the train". Ramon: "Some spots are. But mostly dry". PROVES: Painting in washbay with inadequate ventilation. Boss admits air circulation problem. OHS concern - paint fume exposure without proper ventilation. Supports employee safety advocacy pattern.'
      }
    ],
    witnesses: ['Ramon', 'RJ', 'Other coworkers in washbay', 'Anyone present during painting'],
    legalSignificance: 'OHS EVIDENCE: Inadequate ventilation during painting work proves: (1) Employer aware of ventilation problems (boss requested doors open for "air circulation"), (2) Paint work in enclosed space (washbay) without proper ventilation = exposure to paint fumes/VOCs, (3) OHS regulations require adequate ventilation for painting/coating work, (4) Pattern: Employee advocates for safety (full face masks, confined space procedures, PPE) → Employer acknowledges problems (this text) but fails to implement proper controls → Employee continues advocacy → Employer retaliates with termination. Supports OHS retaliation claim. Alberta OHS Code Part 7 (Noise, Vibration and Temperature), Part 8 (Personal Protective Equipment), Part 31 (Confined Spaces) all potentially violated.',
    priority: 'medium',
    icon: '🎨'
  },

  {
    id: 64,
    timestamp: '2024-10-15',
    text: 'Write-Up #1: Hydraulic Headphones - OHS RETALIATION',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['smoking-gun', 'wrongful-dismissal'],
    description: 'Mid-October 2024: FIRST DISCIPLINARY ACTION - Employee receives written warning for wearing headphones during safety meeting. Verbal warning from boss: "You shouldn\'t have spoken to the VP like that". REAL REASON: Employee proved boss wrong about failing hydraulic project in front of VP during invited troubleshooting session ("what can we do better?"). Boss eventually bought the correct fittings employee suggested, proving employee was right. SMOKING GUN: This write-up is PRETEXTUAL OHS RETALIATION. Protected activity: Technical input during safety troubleshooting. Adverse action: Written warning + characterized as "aggressive". Causal connection: Boss\'s own verbal admission. LEGAL SIGNIFICANCE: If Write-Up #1 is invalid (OHS retaliation + signed under duress), entire progressive discipline chain collapses. All subsequent write-ups occurred in coercive environment established by this retaliatory first write-up. Employee didn\'t know could object in writing: "I just didn\'t want to lose my job."',
    evidence: [
      'Written warning document (requested from employer)',
      'Hydraulic project timeline showing boss bought employee\'s suggested fittings',
      'Boss verbal statement: "shouldn\'t have spoken to VP like that"',
      'No written phone/headphone policy',
      'Employee testimony: first write-up ever, signed under duress, didn\'t know could object'
    ],
    evidenceImages: [],
    witnesses: ['Employee', 'VP present at hydraulic meeting', 'Ramon (hydraulic project)', 'Team members (hydraulic troubleshooting)', 'Boss John Gonzales'],
    legalSignificance: '🚨 FOUNDATION OF ENTIRE CASE 🚨 This write-up is PRETEXTUAL OHS RETALIATION: (1) Employee exercised protected right to raise technical/safety concerns during invited troubleshooting, (2) Boss retaliated with disciplinary action + characterized competence as "aggression", (3) Employee proven RIGHT (boss eventually bought suggested fittings), (4) NO legitimate business reason for discipline (safety input during "what can we do better" meeting), (5) Signed under DURESS (first write-up, job necessity, no knowledge of right to object). ALBERTA LAW: OHS retaliation is prohibited. If first write-up is invalid retaliation, ENTIRE progressive discipline chain collapses. Cannot establish just cause based on disciplinary record that started with illegal retaliation. Sets coercive tone for all subsequent write-ups (learned helplessness pattern begins here). This is the KEY to destroying employer\'s just cause defense.',
    priority: 'nuclear',
    icon: '📝',
    convergenceTrack: 3,
    causalLinks: [3, 8, 4],
    chainGroup: 'invalid-progressive-discipline'
  },

  {
    id: 65,
    timestamp: '2025-10-10',
    text: 'Write-Up #4: FIRST DAY BACK FROM PARENTAL LEAVE',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['smoking-gun', 'wrongful-dismissal'],
    description: 'Friday October 10, 2025: Employee receives Write-Up #4 for SEPT 3 TIMECARD on FIRST DAY back from 5-week parental leave (Sept 5 - Oct 9). SMOKING GUN TIMING: Sept 7 Michelle Sherman email marked "URGENT" with "Monday September 8" deadline for Sept 3 timecard → Employer waited 33 DAYS (Sept 7 to Oct 10) → Issued write-up on FIRST DAY of return from protected parental leave. PROVES: (1) Not actually urgent (33-day delay), (2) Employer deliberately saved discipline for day of return (maximum intimidation), (3) Pattern: Parental leave Sept 5 → "Urgent" email Sept 7 → Silence during entire leave → Write-up Oct 10 first day back → Termination Oct 22 (12 days later). Employee by this point had "learned helplessness" - stopped reading write-ups, just signed to keep job. SAME DAY Oct 10: Employee also 8 minutes late due to helping grandparents with delayed Thanksgiving flight (childcare coordination). Two separate issues same day: write-up retaliation + family status lateness.',
    evidence: [
      'Write-up document for Sept 3 timecard (Oct 10 issue date)',
      'Sept 7 Michelle Sherman "urgent" email',
      'Sept 3 timecard in question',
      'Parental leave dates (Sept 5 - Oct 9)',
      '33-day delay timeline',
      'Employee testimony: stopped reading, just signed',
      'Oct 10 lateness texts (grandparents delayed flight)'
    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/family-status/lateness-notifications/Oct-10-2025-Write-Up-Day-Of-Return.jpg',
        caption: 'SMOKING GUN: Oct 10, 2025 - First day back from parental leave. TWO SEPARATE EVENTS: (1) Morning 8 min late - grandparents delayed flight (Thanksgiving), childcare coordination, texted 4:54 AM. (2) Write-Up #4 issued SAME DAY for SEPT 3 TIMECARD (NOT for Oct 10 lateness). 33-day delay from Sept 7 "urgent" deadline proves retaliation timing: saved discipline for first day back from protected parental leave.'
      }
    ],
    witnesses: ['Michelle Sherman (urgent email)', 'John Gonzales (delivered write-up)', 'Employee', 'Grandparents (Oct 10 flight delay)', 'Wife Sam (childcare coordination)'],
    legalSignificance: '🚨 PARENTAL LEAVE RETALIATION SMOKING GUN 🚨 The 33-day delay proves: (1) NOT actually urgent despite Sept 7 email marked "URGENT", (2) Employer deliberately saved discipline for maximum impact = first day of return, (3) Protected activity: Parental leave (5 weeks), (4) Adverse action: Disciplinary write-up, (5) Causal connection: 33-day delay + timing = premeditated retaliation. PATTERN: Catastrophic ROE error during leave (Sept 11) → Write-up day of return (Oct 10) → Termination 12 days later (Oct 22). This timing pattern proves termination was PREMEDITATED, not based on legitimate progressive discipline. Alberta Employment Standards Code prohibits retaliation for exercising protected rights (parental leave). Combined with coercive environment (learned helplessness by write-up #4), this write-up is INVALID. Two for two: Write-up #1 = OHS retaliation, Write-up #4 = Parental leave retaliation. Just cause defense collapses.',
    priority: 'nuclear',
    icon: '📝',
    convergenceTrack: 3,
    causalLinks: [36, 30, 35],
    chainGroup: 'parental-leave-retaliation-execution'
  },

  {
    id: 66,
    timestamp: '2025-10-20',
    text: 'SMOKING GUN: Timecard Unlock CATCH-22',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['smoking-gun', 'wrongful-dismissal'],
    description: 'Monday October 20, 2025 at 7:37 AM: Employee texts boss: "Can I get TC unlock pls". DEVASTATING CATCH-22 SYSTEM: (1) Timecard system auto-locks after 3 days late, (2) Once locked, employee CANNOT submit ANY future timecards, (3) Only boss can unlock, (4) Boss controls employee\'s ability to comply with timecard requirements, (5) Each day locked = MORE accumulated "failures" to submit timecards, (6) Oct 20: Employee proactively requests unlock to PREVENT further violations, (7) Boss controls unlock timing, (8) Oct 22 (2 DAYS LATER): Terminated for "continued failure to submit timecards". SMOKING GUN: Boss WEAPONIZED the unlock system. Created "continued failure" pattern by controlling access to remedy, then cited pattern HE CREATED as just cause for termination. Employee requested remedy (unlock) to comply → Boss delayed remedy → Boss cited inability to comply (which boss caused) as just cause. This is TEXTBOOK MANIPULATION and proves just cause is PRETEXTUAL.',
    evidence: [
      'Oct 20 text: "Can I get TC unlock pls"',
      'Timecard system documentation (auto-locks after 3 days)',
      'Oct 22 termination letter citing "failure to submit timecards"',
      'Timeline: Oct 20 unlock request → Oct 22 termination (2 days)',
      'Pattern: Multiple unlock requests over time (boss controlled access)',
      'Employee testimony: couldn\'t submit without unlock'
    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/termination/Oct-20-2025-Timecard-Unlock-Request.jpg',
        caption: 'DEVASTATING SMOKING GUN: Mon Oct 20 at 7:37 AM - "Can I get TC unlock pls". CATCH-22: Timecard auto-locks → Employee CANNOT submit future timecards → Only boss can unlock → Boss delays unlock = accumulates "evidence" → Oct 22 (2 days later) terminates for pattern boss created. Boss weaponized unlock system: controlled remedy, delayed access, cited inability to comply (which boss caused) as just cause. Textbook manipulation.'
      }
    ],
    witnesses: ['Employee', 'John Gonzales (controlled unlocks)', 'IT staff (timecard system settings)', 'Coworkers (others had same system issues)'],
    legalSignificance: '🚨 JUST CAUSE DESTROYER 🚨 This smoking gun proves: (1) "Progressive discipline" was MANUFACTURED - boss controlled the problem (unlock access), (2) Employee TRIED to comply (requested unlock Oct 20), (3) Boss cited "continued failure" HE CREATED by delaying unlock, (4) 2-day timeline (Oct 20 unlock request → Oct 22 termination) proves termination was PREMEDITATED not performance-based, (5) Employer cannot claim "just cause" for problems EMPLOYER CAUSED through broken system + boss-controlled remedy. ALBERTA LAW: Just cause requires employee\'s conduct fundamentally destroy relationship. Here, EMPLOYER\'S CONDUCT (broken system + boss weaponizes unlock) destroyed relationship. This evidence DESTROYS just cause defense. Shows termination was predetermined outcome, progressive discipline was theater to build pretextual paper trail. Combined with: Write-up #1 OHS retaliation + Write-up #4 parental leave retaliation + Catch-22 system = ZERO legitimate just cause.',
    priority: 'nuclear',
    icon: '⚠️'
  },

  {
    id: 67,
    timestamp: '2025-05-16',
    text: 'DIFFERENTIAL TREATMENT: Boss Lateness Pattern (6 Instances)',
    category: 'termination',
    type: 'range',
    endDate: '2025-08-09',
    tags: ['smoking-gun', 'wrongful-dismissal'],
    description: 'May 16 - August 9, 2025: PATTERN OF BOSS LATENESS WITHOUT DISCIPLINE. Six documented instances where Boss John Gonzales was late or missed meetings, NO CONSEQUENCES. Meanwhile, employee disciplined with progressive write-ups leading to termination for similar lateness (average 3-10 minutes). INSTANCES: (1) May 16: Boss missing morning meeting, (2) May 28: Boss late to work, (3) July 10: Boss not there for morning meeting, (4) July 22: Employee checks up on late boss (role reversal), (5) July 27: Boss late to work, (6) Aug 9: Boss late to work on SATURDAY. PROVES: Inconsistent application of attendance standards = discrimination. Boss has same timecard struggles (admitted during write-up #2), boss late frequently without write-ups, employee late with proactive communication and terminated. Cannot establish "just cause" when employer doesn\'t apply same standards to management. LEGAL SMOKING GUN: Same conduct (lateness) → Different treatment (boss no discipline, employee terminated) = DIFFERENTIAL TREATMENT. Proves "just cause" is pretextual - real reason is discrimination/targeting.',
    evidence: [
      'May 16: Boss missing morning meeting (group chat)',
      'May 28: Boss late to work (text)',
      'July 10: Boss missing morning meeting (text)',
      'July 22: Employee checking on late boss (text)',
      'July 27: Boss late to work (text)',
      'Aug 9: Boss late Saturday (text)',
      'Employee write-ups for lateness (contrast)',
      'Boss admission during write-up #2: "I have timecard problems too"'
    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/boss-lateness/May-16-2025-John-Missing-Meeting.jpg',
        caption: 'May 16, 2025: Boss missing morning meeting. No discipline. Employee disciplined for similar lateness.'
      },
      {
        type: 'text',
        file: 'images/evidence/boss-lateness/May-28-2025-John-Late.jpg',
        caption: 'May 28, 2025: Boss late to work. No discipline. Differential treatment pattern begins.'
      },
      {
        type: 'text',
        file: 'images/evidence/boss-lateness/July-10-2025-John-Missing-Morning-Meeting.jpg',
        caption: 'July 10, 2025: Boss not there for morning meeting. No discipline. Same day employee late 3 minutes (texted, boss approved with thumbs up).'
      },
      {
        type: 'text',
        file: 'images/evidence/boss-lateness/July-22-2025-Check-Up-On-Late-Boss.jpg',
        caption: 'July 22, 2025: Employee checks up on late boss. Role reversal - employee checking up on late boss without discipline to boss.'
      },
      {
        type: 'text',
        file: 'images/evidence/boss-lateness/July-27-2025-John-Late.jpg',
        caption: 'July 27, 2025: Boss late to work. No discipline. Pattern continues while employee being written up.'
      },
      {
        type: 'text',
        file: 'images/evidence/boss-lateness/Aug-09-2025-John-Late-Saturday.jpg',
        caption: 'Aug 9, 2025: Boss late to work on SATURDAY. No discipline. Meanwhile employee terminated Oct 22 for similar lateness.'
      }
    ],
    witnesses: ['Ramon', 'RJ', 'Other team members (witnessed boss lateness)', 'Group chat participants'],
    legalSignificance: '🚨 DIFFERENTIAL TREATMENT SMOKING GUN 🚨 Six documented instances prove: (1) SAME CONDUCT: Boss late/absent, employee late with communication, (2) DIFFERENT TREATMENT: Boss zero consequences, employee progressive discipline → termination, (3) NO LEGITIMATE BUSINESS REASON for different treatment (both have same attendance issues), (4) INCONSISTENT APPLICATION: Employer cannot claim "just cause" when employer doesn\'t apply same standards to management. ALBERTA LAW: Differential treatment = discrimination. Must apply policies consistently. Boss admitted same timecard struggles during write-up #2 ("I understand, I have problems too") yet boss not disciplined. HYPOCRISY: Boss disciplines employee for conduct boss engages in without consequences. This pattern DESTROYS just cause defense - proves "progressive discipline" was TARGETING/DISCRIMINATION, not legitimate performance management. Real reason for termination = animus/discrimination, NOT legitimate just cause.',
    priority: 'nuclear',
    icon: '⚖️'
  },

  {
    id: 75,
    timestamp: '2025-07-04',
    text: 'TIMECARD REMINDER PATTERN: Boss Reminds 4 Times in 52 Days',
    category: 'disability',
    type: 'range',
    endDate: '2025-08-25',
    tags: ['disability', 'wrongful-dismissal'],
    description: 'July 4 - August 25, 2025: Boss sent FOUR documented timecard reminders over 52 days (July 4, July 28, Aug 11, Aug 25). THREE reminders sent on SUNDAYS (employee\'s rest days). This pattern proves: (1) Boss FULFILLED his promise to remind employee (from Write-Up #2), (2) System difficulty was ONGOING and SYSTEMIC (required 4 reminders in under 2 months), (3) Problem was NOT employee refusing to comply - employee needed reminders because broken system + ADHD executive function difficulty. CRITICAL: Boss has same ADHD condition ("I understand the struggles"), boss was written up for timecards himself when he started, boss "notoriously bad" at timecards, boss "hates them to this day," boss became manager partly "so he would never have to do time cards ever again." CONTRADICTION: If boss needed accommodation for timecards (promoted to avoid them) but employee FIRED for timecard issues, that\'s DISABILITY DISCRIMINATION. Employee has ADHD (disclosed Jan 2024), zero accommodations offered for 21 months, then terminated citing timecard failures that boss himself struggled with.',
    evidence: [
      'July 4, 2025: Boss timecard reminder (text message photo)',
      'July 28, 2025: Reminder on SUNDAY during marathon Day 15 (text photo)',
      'Aug 11, 2025: Reminder on SUNDAY (text photo)',
      'Aug 25, 2025: Reminder on SUNDAY, 10 days before parental leave (text photo)',
      'Write-Up #2: Boss promised "What can I do to help?" - agreed to send reminders',
      'Boss admission: "Notoriously bad about time cards when he first got hired"',
      'Boss admission: Written up for timecards himself',
      'Boss admission: "Still hates them to this day"',
      'Boss motivation: Became manager partly to avoid timecards forever'
    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/work-context/July-04-2025-John-Timecard-Reminder.jpg',
        caption: 'July 4, 2025: First timecard reminder. Boss aware of employee struggling with system. Shows boss monitoring and attempting to help.'
      },
      {
        type: 'text',
        file: 'images/evidence/work-context/July-28-2025-John-Timecard-Reminder.jpg',
        caption: 'July 28, 2025 (SUNDAY): Reminder during overtime marathon Day 15 of 18. Contradictory demand - boss demands extreme overtime THEN administrative compliance on rest day.'
      },
      {
        type: 'text',
        file: 'images/evidence/work-context/Aug-11-2025-John-Timecard-Reminder.jpg',
        caption: 'Aug 11, 2025 (SUNDAY): Third reminder. Proves ongoing systemic problem, not one-time employee negligence.'
      },
      {
        type: 'text',
        file: 'images/evidence/work-context/Aug-25-2025-John-Timecard-Reminder.jpg',
        caption: 'Aug 25, 2025 (SUNDAY): Fourth reminder in 52 days. Boss fulfilled promise to remind, but problem persisted due to broken system + ADHD.'
      }
    ],
    witnesses: ['Boss (John) - sent reminders', 'Text message records', 'Employee testimony about boss\'s timecard struggles admission'],
    legalSignificance: 'DISABILITY DISCRIMINATION SMOKING GUN: Boss has ADHD, employee has ADHD. Boss struggled with timecards so badly he: (1) Was written up himself, (2) Became "notoriously bad" at them, (3) Hates them "to this day", (4) Took promotion PARTLY TO AVOID TIMECARDS FOREVER. Yet boss fires employee for SAME timecard struggles boss has. ACCOMMODATION FAILURE: Boss offered help (Write-Up #2), sent 4 reminders (fulfilled promise), BUT problem persisted because: (1) Broken system (cannot submit during work, auto-locks, boss unlock delays), (2) ADHD executive function challenges (medication wears off after work), (3) No systemic fix offered (HR: "That\'s just the way the system is"). ALBERTA HUMAN RIGHTS: Cannot terminate employee for disability-related performance issues when: (1) Employer knows about disability (Jan 2024 disclosure), (2) Employer has same disability (boss admitted), (3) Employer accommodated self (promoted to escape timecards) but NOT employee, (4) No accommodations offered despite 21 months of struggle. This is CLASSIC disability discrimination: Boss escaped problem via promotion, employee fired for same problem.',
    priority: 'nuclear',
    icon: '📋'
  },

  {
    id: 70,
    timestamp: '2025-10-27',
    text: 'BAD FAITH: Final Pay to WRONG BANK ACCOUNT',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['wrongful-dismissal'],
    description: 'Monday October 27, 2025 (5 days post-termination): Employer sends final pay to WRONG BANK ACCOUNT despite employee providing correct account information Oct 24. Danielle Schwartz (Sr. District Admin) coordinates final pay. Multiple emails back and forth Oct 27 required to resolve employer error. PROVES: Post-termination bad faith conduct. Employer incompetence/carelessness with terminated employee\'s final pay causes additional stress and delay. Pattern of employer administrative chaos: Wrong bank account (Oct 27) → Wrong documents sent by lawyer Carol Burke (Oct 30) → "Dear Rollins:" contract error → Catastrophic ROE error (Sept 11). AGGRAVATING FACTOR: Wallace damages for bad faith manner of dismissal include post-termination conduct. Wrong bank account = employer treated terminated employee carelessly, added unnecessary stress during already difficult time. Combined with ROE delays, document delays, shows pattern of bad faith post-termination treatment.',
    evidence: [
      'Oct 24 email: Employee provides correct bank account',
      'Oct 27 emails: Wrong bank account issue discovered',
      'Danielle Schwartz correspondence Oct 24-27',
      'Final pay stub showing payment dates',
      'Multiple back-and-forth emails to resolve error'
    ],
    evidenceImages: [
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-27-2025-Danielle-Schwartz-Pay-3.png',
        caption: 'Oct 27, 2025 (5 days post-termination): Wrong bank account issue discovered. Employee provided correct info Oct 24, employer sent to wrong account anyway.'
      },
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-27-2025-Danielle-Schwartz-Pay-4.png',
        caption: 'Oct 27 correspondence part 2: Multiple emails required to resolve employer error with final pay.'
      },
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-27-2025-Danielle-Schwartz-Pay-5.png',
        caption: 'Oct 27 correspondence part 3: Continued back-and-forth due to wrong bank account.'
      }
    ],
    witnesses: ['Danielle Schwartz (Sr. District Admin)', 'Michelle Sherman (HR involved)', 'Employee', 'Bank records (wrong account then corrected)'],
    legalSignificance: 'BAD FAITH POST-TERMINATION CONDUCT: Wrong bank account for final pay proves: (1) Employer carelessness with terminated employee\'s money (already vulnerable position), (2) Added unnecessary stress/delay during difficult time, (3) Pattern of administrative chaos harming employee (catastrophic ROE Sept 11, wrong documents from lawyer Oct 30, wrong bank Oct 27, "Dear Rollins:" contract error), (4) Shows employer treated terminated employee without care/professionalism. WALLACE DAMAGES: Alberta courts award extended notice for bad faith manner of dismissal. Post-termination conduct counts: Wrongful termination (Oct 22) → Wrong bank account (Oct 27, 5 days later) → ROE delays → Document delays → Multiple employer errors = AGGRAVATING FACTORS. Pattern shows employer indifference to employee welfare post-termination. Combined with: ROE 9-14 day delay (federal requirement 5 days), document tampering concerns (Oct 30 wrong docs then corrected Nov 4), Carol Burke 6-day delay = PATTERN of bad faith. Increases Wallace damages from 0-4 months to 3-6 months.',
    priority: 'high',
    icon: '💰'
  }
];

// Export for use in timeline
if (typeof module !== 'undefined' && module.exports) {
  module.exports = timelineEvents;
}
