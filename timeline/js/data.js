// Timeline Event Data for Wrongful Dismissal Case
// Categories: family (red), ohs (orange), disability (yellow), termination (blue), competence (gray)
// Post-Termination: correspondence-danielle (green), correspondence-carol (purple), correspondence-michelle (pink)
const timelineEvents = [
  // January 2024 - Employment Begins
  {
    id: 71,
    timestamp: '2024-01-02',
    text: 'Disclosure of Family Status Obligations',
    category: 'family',
    type: 'point',
    endDate: null,
    tags: ['critical', 'family'],
    description: 'During the initial interview for the Electrical Technician position, the Employee explicitly disclosed family status obligations to Manager Gonzales. The Employee stated: "Family means everything to me, this is a way to provide for my family." This conversation established employer knowledge of the Employee\'s primary motivation and scheduling constraints prior to the offer of employment.',
    evidence: [
      'Employee testimony regarding interview',
      'Interview notes (subject to discovery)',
      'Corroborated by subsequent accommodation period (Oct 2024-July 2025)'
    ],
    evidenceImages: [],
    witnesses: ['Manager Gonzales', 'HR Representative'],
    legalSignificance: 'Establishment of Employer Knowledge. The Employer was aware of the protected ground (Family Status) prior to hiring. The subsequent accommodation (Oct 2024-July 2025) and later withdrawal of said accommodation (July 20, 2025: "doesn\'t matter what happens at home") establishes discriminatory pattern.',
    priority: 'critical',
    icon: '👨‍👩‍👧',
  },
  {
    id: 1,
    timestamp: '2024-01-05',
    text: 'Employment Commencement',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['wrongful-dismissal'],
    description: 'Employment commenced at Stage 3 Separation. Position: Electrical Technician. Salary: $65,000/annum. Terms of employment were accepted based on the mutual understanding of family obligations discussed during the interview.',
    evidence: [
      'Employment contract',
      'Interview notes',
      'Employee testimony'
    ],
    evidenceImages: [],
    witnesses: ['Manager Gonzales', 'HR'],
    legalSignificance: 'Contractual Defect / Lack of Diligence. The employment contract contains a "Dear Rollins:" salutation, addressing an incorrect individual. This error demonstrates lack of attention to detail in legal documentation preparation.',
    priority: 'medium',
  },
  {
    id: 2,
    timestamp: '2024-01-05',
    text: '⭐ Disclosure of Disability (ADHD)',
    category: 'disability',
    type: 'point',
    endDate: null,
    tags: ['disability'],
    description: 'Pre-employment screening identified amphetamine-based medication. The Employee provided medical documentation confirming an ADHD diagnosis. Manager Gonzales acknowledged the diagnosis, stating he "understood the struggles" as he shares the condition. No formal accommodation plan was implemented at this stage.',
    evidence: [
      'Drug test records',
      'Medical note regarding ADHD diagnosis',
      'Manager admission of knowledge and shared condition'
    ],
    evidenceImages: [
      {
        type: 'doc',
        file: 'images/evidence/medical-records/2024-01-15_doc_adhd-urine-test-1.jpg',
        caption: 'Pre-employment medical record disclosing ADHD medication. Establishes employer knowledge of disability at commencement.'
      }
    ],
    witnesses: ['Manager Gonzales', 'HR'],
    legalSignificance: 'Duty to Accommodate. The Employer possessed knowledge of a protected disability (ADHD) from day one. Manager Gonzales has the same condition. Subsequent disciplinary actions regarding time management (executive function) were taken without offering reasonable accommodation.',
    priority: 'high',
    icon: '🧠',
  },
  // Summer 2024 - Hydraulic Troubleshooting Victory
  {
    id: 3,
    timestamp: '2024-07-01',
    text: 'Operational Dispute: Hydraulic System Diagnosis',
    category: 'competence',
    type: 'range',
    endDate: '2024-07-07',
    tags: ['critical', 'ohs'],
    description: 'Operational failure regarding a processing tank stand. Management pursued a single-acting hydraulic solution for 4-7 days despite the Employee\'s recommendation for a double-acting system. External specialists eventually confirmed the Employee\'s diagnosis was correct. Manager Gonzales authorized the purchase of the fittings originally suggested by the Employee but presented the solution to the team without acknowledging the Employee\'s contribution.',
    evidence: [
      'Work orders/project records',
      'Overtime records',
      'Coworker testimony'
    ],
    witnesses: ['Coworkers', 'VP', 'Manager Gonzales', 'External Specialists'],
    legalSignificance: 'Context for Reprisal. Establishes a pattern where the Employee\'s technical advocacy contradicted Management, resulting in loss of face for Manager Gonzales in front of the VP. This incident marks a shift in the management-employee dynamic and preceded increased safety advocacy.',
    priority: 'critical',
    icon: '🔧',
  },
  // February 2025 - First Written Discipline
  {
    id: 4,
    timestamp: '2025-02-21',
    text: 'Disciplinary Record: Timecards (11:10 AM)',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['disability'],
    description: 'Documentation dated Feb 21, 2025, citing issues with timely submission of timecards. The Employee contests receiving this specific document via email during employment, raising concerns regarding the integrity of the personnel file. The timecard system required Manager Gonzales to unlock access; his delays contributed to compliance issues.',
    evidence: [
      'Testimony regarding system access barriers',
      'Manager admission regarding personal timecard difficulties',
      'Lack of email receipt metadata'
    ],
    evidenceImages: [
      {
        type: 'doc',
        file: 'images/evidence/documents/Write-Up-1a-Timecards-2025-02-21.pdf',
        caption: 'Disciplinary Document 1a. Employee contests receipt during employment. Did not see in email'
      }
    ],
    witnesses: ['Manager Gonzales', 'HR'],
    legalSignificance: 'Procedural Fairness / Document Integrity. If this document was added to the file post-termination, it constitutes Bad Faith. Furthermore, penalizing an employee for symptoms related to a disclosed disability (ADHD) without accommodation violates Human Rights standards.',
    priority: 'high',
  },
  {
    id: 78,
    timestamp: '2025-01-08',
    text: '⭐ Manager Admission: Prior Wage Practices',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['bad-faith-conduct'],
    description: 'Manager Gonzales recounted an incident regarding a former employee ("field hand") who was allegedly compelled to work without pay to avoid termination due to timecard errors. This narrative was conveyed to the Employee during a discussion regarding administrative compliance, establishing a pattern of intimidation.',
    evidence: [
      'Employee testimony',
      'Context: Discussion during timecard review',
      'Pattern of termination threats'

    ],
    evidenceImages: [],
    witnesses: ['The Employee', 'Manager Gonzales'],
    legalSignificance: 'Evidence of Intimidation / Bad Faith. The Manager used a narrative describing a violation of the Employment Standards Code (unpaid work) to pressure the Employee. This creates context for Employee signing disciplinary documents under duress.',
    priority: 'high',
    icon: '💰',
  },
  {
    id: 5,
    timestamp: '2025-01-09',
    text: 'Adverse Action Following Safety Advocacy',
    category: 'ohs',
    type: 'point',
    endDate: null,
    tags: ['critical', 'ohs', 'wrongful-dismissal', 'bad-faith-conduct'],
    description: 'During a safety meeting, the Employee raised concerns regarding PPE sufficiency (flying debris) and requested full face masks. HSE Manager Caines disputed the necessity based on MSDS data. The Employee maintained that physical debris presented a hazard regardless of chemical toxicity. Manager Gonzales removed the Employee from the meeting (sent home) and stated in a one-one meeting the next morning: "I would have fired you if you were talking to me like that." No formal discipline issued at time; incident later cited as "aggression" in Feb 21 disciplinary record.',
    evidence: [
      'Feb 21 Disciplinary Document',
      'Subsequent implementation of Confined Space Program',
      'Coworker testimony (Ramon, RJ)'
      
    ],
    witnesses: ['Ramon', 'RJ', 'HSE Manager Caines', 'Manager Gonzales'],
    legalSignificance: 'OHS Reprisal (Section 35). The Employer took adverse action (sending employee home) in response to good-faith safety advocacy. This incident was later recharacterized as "aggression" in the Feb 21 disciplinary record, conflated with the Feb 20 earbud allegation. See Write-Up #1b.',
    priority: 'critical',
    icon: '⚠️',
  },
  // October 2024 - Baby Born & Family Obligations Begin
  {
    id: 6,
    timestamp: '2024-10-09',
    text: 'Change in Family Status',
    category: 'family',
    type: 'point',
    endDate: null,
    tags: ['critical', 'family'],
    description: 'Birth of the Employee\'s daughter. This event marks the commencement of specific childcare obligations protected under Family Status.',
    evidence: [
      'Birth certificate',
      'Medical records'
    ],
    witnesses: ['Family members'],
    legalSignificance: 'Material Fact. Establishes the timeline for Family Status protection claims. ',
    priority: 'critical',
    icon: '👶',
  },
  {
    id: 76,
    timestamp: '2024-10-15',
    text: '⭐ Verbal Modification of Employment Terms',
    category: 'family',
    type: 'range',
    endDate: '2025-07-20',
    tags: ['critical', 'smoking-gun', 'family'],
    description: 'Manager Gonzales verbally authorized a flexible schedule modification, stating: "Being late is okay. Just let me know in advance" and "Taking days off is okay. Just let me know in advance if it is a sick day or personal day" The Employee adhered to this protocol for 9 months (Oct 2024 - July 2025), providing advance notice via text (13+ documented notifications). The Employer accepted this performance standard without discipline until July 2025.',
    evidence: [
      'Employee testimony',
      '13+ text notifications showing compliance',
      'Absence of discipline during this period',
      'Oct 2024-July 2025 timecard records'
    ],
    evidenceImages: [],
    witnesses: ['Manager Gonzales', 'Coworkers'],
    legalSignificance: 'Condonation / Estoppel. The Employer condoned the modified schedule for 9 months, establishing it as an accepted term of employment. The sudden withdrawal of this accommodation on July 20, 2025 ("doesn\'t matter what happens at home"), without reasonable notice, constitutes Bad Faith. Compare: June 4 and June 13 approvals vs. August 28 denial.',
    priority: 'nuclear',
    icon: '✅',
  },
  // 2025 Timeline Begins
  {
    id: 9,
    timestamp: '2025-02-18',
    text: '⭐ Disclosure of Sleep Apnea Diagnosis',
    category: 'disability',
    type: 'point',
    endDate: null,
    tags: ['critical', 'disability'],
    description: 'The Employee provided a medical letter diagnosing moderate sleep apnea and requiring a CPAP machine. Manager Gonzales acknowledged receipt and disclosed having the same condition. No modifications to start times or attendance policies were offered to accommodate the condition.',
    evidence: [
      'Sleep study results',
      'Doctor\'s letter dated Feb 18, 2025',
      'CPAP prescription',
      'Manager acknowledgment of diagnosis and shared condition'
    ],
    evidenceImages: [
      {
        type: 'doc',
        file: 'images/evidence/medical-records/2025-02-18_doc_cpap-letter-1.jpg',
        caption: 'Medical documentation of Sleep Apnea diagnosis. '
      }
    ],
    witnesses: ['Manager Gonzales', 'Doctor'],
    legalSignificance: 'Duty to Accommodate (Physical Disability). All 13 documented lateness incidents (Apr-Oct 2025) occurred after this disclosure. Subsequent disciplinary actions regarding lateness (waking & sleeping difficulty) failed to account for this documented medical condition.',
    priority: 'critical',
    icon: '😴',
  },
  // March-May 2025 - Meeting Time Change & Paper Trail Building
  {
    id: 72,
    timestamp: '2025-04-01?',
    text: 'Operational Change: Meeting Time (8:00 AM → 7:30 AM)',
    category: 'family',
    type: 'point',
    endDate: null,
    tags: ['family', 'bad-faith-conduct', 'just-cause-failure'],
    description: 'Management advanced the daily meeting time by 30 minutes, eliminating the buffer period previously used by the Employee for childcare reponsibilities. This operational change coincided with the implementation of stricter text notification requirements.',
    evidence: [
      'Employee testimony',
      'Coworker confirmation',
      'Jira records ',

    ],
    evidenceImages: [],
    witnesses: ['Coworkers', 'Manager Gonzales'],
    legalSignificance: 'Constructive Barrier to Attendance. The timing of this change, following the Employee\'s disclosure of family obligations, suggests an intent to create scheduling conflicts rather than accommodate.',
    priority: 'high',
    icon: '🕐',
  },
  // April-June 2025 - Documented Lateness Pattern
  {
    id: 10,
    timestamp: '2025-04-30',
    text: 'Attendance Log: Proactive Notification',
    category: 'family',
    type: 'point',
    endDate: null,
    tags: ['family', 'disability', 'lateness-employee'],
    description: 'Employee notified Manager Gonzales of a minor delay via text. Time was made up at end of shift.',
    evidence: [
      'Text message record',
      'Timecard data'
    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/lateness-notifications/Apr-30-2025-Late.jpg',
        caption: 'Text Notification (Apr 30, 7:02 AM): "Hey John I\'m gonna be a few mins late..."'
      }
    ],
    witnesses: ['Manager Gonzales'],
    legalSignificance: 'Adherence to Notification Protocol. Demonstrates compliance with the verbally authorized reporting structure.',
    latenessPersonKey: 'employee',
    priority: 'low'
  },
  {
    id: 38,
    timestamp: '2025-05-16',
    text: 'Evidence of Differential Treatment: Manager Absence',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['lateness-boss', 'just-cause-failure'],
    description: 'Manager Gonzales absent from morning meeting. Documentation confirms a pattern of managerial absenteeism (May 16, May 28, Jul 10, Jul 22, Jul 27, Aug 9) that did not result in discipline.',
    evidence: ['Text messages verifying Manager absence'],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/boss-lateness/May-16-2025-John-Missing-Meeting.jpg',
        caption: 'Record of Manager Gonzales absent from meeting (May 16).'
      }
    ],
    witnesses: ['Team members'],
    legalSignificance: 'Differential Treatment. The Employer enforced strict attendance policies against the Employee while tolerating identical or more severe conduct from Management.',
    latenessPersonKey: 'boss',
    priority: 'high',
    icon: '⚖️'
  },
  {
    id: 11,
    timestamp: '2025-05-23',
    text: 'Attendance Log: 3 Minute Delay',
    category: 'family',
    type: 'point',
    endDate: null,
    tags: ['family', 'disability', 'lateness-employee'],
    description: 'Employee notified Manager at 7:00 AM. GPS data confirms arrival at 7:33 AM (3 minutes past 7:30 start).',
    evidence: ['Text message', 'GPS data'],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/lateness-notifications/May-23-2025-Late.jpg',
        caption: 'Notification sent at 7:00 AM.'
      },
      {
        type: 'doc',
        file: 'images/evidence/gps-proofs/May-23-2025-3min-Late.jpg',
        caption: 'GPS Confirmation: 3 minute delay.'
      }
    ],
    witnesses: ['Manager Gonzales'],
    legalSignificance: 'De Minimis Infraction. The delay was negligible and mitigated by advance notice.',
    latenessPersonKey: 'employee',
    priority: 'low'
  },
  {
    id: 12,
    timestamp: '2025-05-29',
    text: 'Attendance Log: 9 Minute Delay',
    category: 'family',
    type: 'point',
    endDate: null,
    tags: ['family', 'disability', 'lateness-employee'],
    description: 'Employee notification sent prior to departure.',
    evidence: ['Text message', 'GPS data'],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/lateness-notifications/May-29-2025-Late.jpg',
        caption: 'Notification text.'
      },
      {
        type: 'doc',
        file: 'images/evidence/gps-proofs/May-29-2025-9min-Late.jpg',
        caption: 'GPS Confirmation: 9 minute delay.'
      }
    ],
    witnesses: ['Manager Gonzales'],
    legalSignificance: 'Continued adherence to notification protocol.',
    latenessPersonKey: 'employee',
    priority: 'low'
  },
  {
    id: 39,
    timestamp: '2025-05-28',
    text: 'Manager Lateness (Instance 2)',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['lateness-boss', 'just-cause-failure'],
    description: 'Manager Gonzales arrived late. No disciplinary action recorded.',
    evidence: ['Text messages'],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/boss-lateness/May-28-2025-John-Late.jpg',
        caption: 'Record of Manager Gonzales lateness (May 28). No discipline.'
      }
    ],
    witnesses: ['Coworkers'],
    legalSignificance: 'Corroboration of Differential Treatment.',
    latenessPersonKey: 'boss',
    priority: 'high',
    icon: '⚖️'
  },
  {
    id: 13,
    timestamp: '2025-06-04',
    text: 'Approved Modification: Medical Appointment',
    category: 'family',
    type: 'point',
    endDate: null,
    tags: ['family'],
    description: 'Employee requested extended lunch for child\'s medical needs. Manager Gonzales replied: "That\'s fine."',
    evidence: [
      'Text message record'
    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/lateness-notifications/Jun-04-2025-Lunch-Break.jpg',
        caption: 'Text exchange confirming Manager approval for schedule modification.'
      }
    ],
    witnesses: ['Manager Gonzales'],
    legalSignificance: 'Evidence of Accommodation Capability. Demonstrates the Employer could accommodate family status requests without undue hardship. Compare to August 28 denial.',
    priority: 'medium',
    icon: '🏥'
  },
  {
    id: 14,
    timestamp: '2025-06-13',
    text: 'Approved Absence: Family Illness',
    category: 'family',
    type: 'point',
    endDate: null,
    tags: ['critical', 'family'],
    description: 'Employee requested morning off due to child\'s illness. Manager Gonzales explicitly approved: "Yes you\'re good. Thanks for letting me know." This approved absence was later cited in Disciplinary Write-Up #3 as an unexcused absence.',
    evidence: [
      'Text message exchange',
      'Write-Up #3'
    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/lateness-notifications/June-13-2025-Sick-Child-APPROVED.jpg',
        caption: 'Manager Approval: "Yes you\'re good." Contradicts Write-Up #2 claim that absence was "not communicated."'
      }
    ],
    witnesses: ['Manager Gonzales'],
    legalSignificance: 'Bad Faith / Pretext. The Employer approved the absence contemporaneously, then retroactively classified it as misconduct to support progressive discipline. Write-Up #2 falsely states absence was "not communicated."',
    priority: 'critical',
    icon: '🤒'
  },
  {
    id: 15,
    timestamp: '2025-06-18',
    text: 'Lateness Event: Disability Symptom',
    category: 'disability',
    type: 'point',
    endDate: null,
    tags: ['disability', 'lateness-employee'],
    description: 'Employee missed alarm. Notification sent at 7:39 AM. This incident correlates with the known symptoms of Sleep Apnea (difficulty waking). Also related to sleep deprivation from infant care (Family Status).',
    evidence: [
      'Text message',
      'GPS data',
      'Medical file'
    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/lateness-notifications/Jun-18-2025-Late.jpg',
        caption: 'Employee notification: "miss my alarm clock."'
      },
      {
        type: 'doc',
        file: 'images/evidence/gps-proofs/Jun-18-2025-3min-Late.jpg',
        caption: 'GPS Data.'
      }
    ],
    witnesses: ['Manager Gonzales'],
    legalSignificance: 'Disability Nexus. The misconduct (lateness) was a direct manifestation of the disclosed disability (Sleep Apnea) and family obligations (infant care).',
    latenessPersonKey: 'employee',
    priority: 'medium'
  },
  {
    id: 79,
    timestamp: '2025-06-18',
    text: '⭐ Disciplinary Record: Write-Up #2 (Documentary Discrepancies)',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['smoking-gun', 'just-cause-failure', 'disability'],
    description: 'Write-Up #2 issued with multiple allegations:\n\n1. June 11-12: Failed to submit timecards\n2. June 13: "Jonathan did not show up for work later that day and did communicate his abscense" \n3. June 18: Late to work, "did not contact his supervisor"\n\nThe June 13 allegation is directly contradicted by text evidence showing Manager Gonzales approved the absence ("Yes your good"). The document also contains internal contradiction regarding June 18 contact.',
    evidence: [
      'June 13 text message showing Manager approval',
      'GPS evidence',
      'Text message June 18 at 7:39am'
    ],
    evidenceImages: [
      {
        type: 'doc',
        file: 'images/evidence/documents/Write-Up-2-Fabricated-2025-06-18.pdf',
        caption: 'Write-Up #2. Contains factual errors: June 13 absence was approved per text evidence.'
      }
    ],
    witnesses: ['Manager Gonzales', 'Employee'],
    legalSignificance: 'Documentary Fabrication / Bad Faith. The Employer falsified the record regarding the June 13 absence (approved → documented as "not communicated"). Internal contradiction (both "did not contact" and "Jonathan contact his supervisor at 737am"). This undermines the credibility of the entire disciplinary trail.',
    priority: 'nuclear',
    icon: '📝',
  },
  {
    id: 16,
    timestamp: '2025-06-19',
    text: 'Lunch Break Extension: Vehicle Maintenance',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['wrongful-dismissal'],
    description: 'Employee requested extended lunch for safety-critical vehicle repair (brakes). Notification provided. Time made up same day.',
    evidence: ['Text message'],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/lateness-notifications/Jun-19-2025-Late.jpg',
        caption: 'Notification text.'
      }
    ],
    witnesses: ['Manager Gonzales'],
    legalSignificance: 'Proactive communication regarding necessary personal maintenance.',
    priority: 'low'
  },
  {
    id: 17,
    timestamp: '2025-06-25',
    text: 'Evidence of Good Faith: Early Arrival',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['lateness-employee', 'family'],
    description: 'Employee texted warning of potential lateness due to traffic. GPS data confirms the Employee actually arrived 10 minutes EARLY (7:20 AM). This incident was later cited in Write-Up #3 as a "Lateness" event (alleged arrival 7:35 AM).',
    evidence: ['Text message', 'GPS data'],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/lateness-notifications/Jun-25-2025-Traffic.jpg',
        caption: 'Precautionary text message sent at 6:57 AM.'
      },
      {
        type: 'doc',
        file: 'images/evidence/gps-proofs/Jun-25-2025-10min-EARLY.jpg',
        caption: 'GPS Data: Arrival at 7:20 AM (10 min EARLY). Refutes the allegation of lateness in Write-Up #3.'
      }
    ],
    witnesses: ['Manager Gonzales'],
    legalSignificance: 'Falsification of Disciplinary Record. The Employer cited this date as "arrived 7:35am late" in Write-Up #3, despite objective GPS data proving 10-minute early arrival. See Write-Up #3 GPS contradiction table.',
    latenessPersonKey: 'employee',
    priority: 'high'
  },
  // July 2025 - THE CRITICAL MONTH
  {
    id: 18,
    timestamp: '2025-07-06',
    text: 'Approved Bereavement Leave',
    category: 'family',
    type: 'point',
    endDate: null,
    tags: ['family'],
    description: 'Employee requested and received approval for bereavement leave.',
    evidence: ['Text message'],
    evidenceImages: [],
    witnesses: ['Manager Gonzales'],
    legalSignificance: 'Protected Leave.',
    priority: 'low'
  },
  {
    id: 40,
    timestamp: '2025-07-10',
    text: 'Manager Absence During Overtime Period (Instance 3)',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['lateness-boss', 'just-cause-failure'],
    description: 'Manager Gonzales missed the morning meeting on the same day the Employee was disciplined for a 3-minute delay.',
    evidence: ['Text messages', 'GPS proof of employee lateness'],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/boss-lateness/July-10-2025-John-Missing-Morning-Meeting.jpg',
        caption: 'Record of Manager absence.'
      },
      {
        type: 'doc',
        file: 'images/evidence/gps-proofs/July-10-2025-3min-Late.jpg',
        caption: 'GPS Data: Employee 3 minutes late.'
      }
    ],
    witnesses: ['Coworkers'],
    legalSignificance: 'Differential Treatment.',
    latenessPersonKey: 'boss',
    priority: 'high',
    icon: '⚖️'
  },
  {
    id: 21,
    timestamp: '2025-07-14',
    text: 'Continuous Work Period: 18 Days',
    category: 'family',
    type: 'range',
    endDate: '2025-07-31',
    tags: ['critical', 'family', 'ohs', 'wrongful-dismissal', 'bad-faith-conduct'],
    description: 'Employee worked 18 consecutive days (July 14-31) without a rest day, 2 weeks (July 14-28) is 140.5 hours. This schedule created extreme fatigue and eliminated ability to perform childcare duties.',
    evidence: [
      'Timecard records',
      'Paystubs showing overtime',
    ],
    witnesses: ['Coworkers'],
    legalSignificance: 'OHS Fatigue Management / Family Status. The Employer created the conditions (exhaustion) that led to the subsequent lateness events on July 24 and 31. The Employer cannot rely on performance failures caused by its own unreasonable scheduling demands.',
    priority: 'critical',
    icon: '⏰',
  },
  {
    id: 22,
    timestamp: '2025-07-20',
    text: '⭐ Management Statement: Rejection of Family Status',
    category: 'family',
    type: 'point',
    endDate: null,
    tags: ['smoking-gun', 'family'],
    description: 'Day 7 of overtime period. Sunday evening ~6 PM. Manager Gonzales demanded the Employee return to work ("Nope, come on back"). When the Employee could not due to childcare, Manager Gonzales stated: "We are going to have a major talk tomorrow." The following morning (July 21), Manager Gonzales stated: "It doesn\'t matter what happens at [home], you need to come in to work." This marks the explicit withdrawal of the flexible scheduling accommodation.',
    evidence: [
      'Text messages (complete exchange)',
      'Timecard showing 7 consecutive days',
      'Employee testimony re: July 21 meeting'
    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/smoking-guns/July-20-2025-Sunday-Overtime-Threat.jpg',
        caption: 'Text Record: Manager Gonzales demands return to work and disregards family obligations.'
      }
    ],
    witnesses: ['Manager Gonzales', 'Wife'],
    legalSignificance: 'Direct Discrimination / Failure to Accommodate. Manager Gonzales explicitly stated that family obligations were irrelevant ("doesn\'t matter what happens at home"). This statement is prima facie evidence of Family Status discrimination. Marks withdrawal of 9-month accommodation. Compare to prior approvals (June 4, June 13).',
    priority: 'nuclear',
    icon: '💣',
  },
  {
    id: 23,
    timestamp: '2025-07-24',
    text: 'Lunch Break Extension: Vehicle Maintenance',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['wrongful-dismissal'],
    description: 'Employee notified Manager of extended lunch for vehicle repair during the 18-day work streak. Time was made up.',
    evidence: [
      'Text message',
      'Timecard'
    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/lateness-notifications/July-24-2025-Late.jpg',
        caption: 'Notification text.'
      }
    ],
    witnesses: ['Manager Gonzales'],
    legalSignificance: 'Reasonable personal maintenance during extended work period imposed by Employer.',
    priority: 'medium'
  },
  {
    id: 41,
    timestamp: '2025-07-22',
    text: 'Manager Lateness (Instance 4)',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['lateness-boss', 'just-cause-failure'],
    description: 'Manager Gonzales late (Day 9 of overtime period).',
    evidence: ['Text messages'],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/boss-lateness/July-22-2025-Check-Up-On-Late-Boss.jpg',
        caption: 'Record of Manager lateness.'
      }
    ],
    witnesses: ['Coworkers'],
    legalSignificance: 'Differential Treatment. ',
    latenessPersonKey: 'boss',
    priority: 'high',
    icon: '⚖️'
  },
  {
    id: 42,
    timestamp: '2025-07-27',
    text: 'Manager Lateness (Instance 5)',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['lateness-boss', 'just-cause-failure'],
    description: 'Manager Gonzales late on Saturday shift (Day 14 of overtime period).',
    evidence: ['Text messages'],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/boss-lateness/July-27-2025-John-Late.jpg',
        caption: 'Manager lateness (July 27, Saturday). Day 14 of 18-day period.'
      }
    ],
    witnesses: ['Coworkers'],
    legalSignificance: 'Differential Treatment.',
    latenessPersonKey: 'boss',
    priority: 'high',
    icon: '⚖️'
  },
  {
    id: 25,
    timestamp: '2025-07-31',
    text: 'Lateness Event: Exhaustion (Day 18)',
    category: 'family',
    type: 'point',
    endDate: null,
    tags: ['family', 'disability', 'lateness-employee'],
    description: 'Employee arrived 24 minutes late on the 18th consecutive day of work. This was the most significant delay recorded and occurred during a period of extreme physical fatigue mandated by the Employer.',
    evidence: [
      'Text message',
      'GPS location proof',
      'Timecards'
    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/lateness-notifications/July-31-2025-Late.jpg',
        caption: 'Day 18 notification'
      },
      {
        type: 'doc',
        file: 'images/evidence/gps-proofs/July-31-2025-24min-Late.jpg',
        caption: 'GPS Data: 24 min delay. Day 18 of 18. '
      }
    ],
    witnesses: ['Manager Gonzales'],
    legalSignificance: 'Mitigating Factor: Employer-Induced Exhaustion. The employer cannot rely on performance failures caused by its own unreasonable scheduling demands. ',
    latenessPersonKey: 'employee',
    priority: 'high'
  },
  {
    id: 77,
    timestamp: '2025-07-28',
    text: 'Disclosure of Spouse\'s Return to Work',
    category: 'family',
    type: 'point',
    endDate: null,
    tags: ['critical', 'family'],
    description: 'Employee requested parental leave, explicitly stating the reason: "As my wife transitions back to full time work." This placed the Employer on notice that childcare obligations would intensify upon return in October (both parents working full-time, child too young for daycare).',
    evidence: [
      'Parental leave request',
      'Employee testimony',
      'HR confirmation Oct 5 email'
    ],
    evidenceImages: [],
    witnesses: ['Manager Gonzales', 'HR'],
    legalSignificance: 'Employer Knowledge of Ongoing Restriction. The Employer knew the return from leave would require accommodation, yet: issued "Final Opportunity" write-up on first day back (Oct 10), denied accommodation requests (Oct 20-21), terminated 12 days after return (Oct 22).',
    priority: 'nuclear',
    icon: '👨‍🍼',
  },
  {
    id: 80,
    timestamp: '2025-09-04',
    text: 'Protected Parental Leave',
    category: 'family',
    type: 'range',
    endDate: '2025-10-09',
    tags: ['critical', 'family'],
    description: 'Employee utilized statutory parental leave (5 weeks).',
    evidence: [
      'HR confirmation email (Oct 5)',
      'Paystubs',
      'EI parental benefits documentation'
    ],
    evidenceImages: [
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-05-2025-Parental-Leave-Confirmation.png',
        caption: 'HR confirmation of leave dates.'
      }
    ],
    witnesses: ['Manager Gonzales', 'HR'],
    legalSignificance: 'Protected Activity. Timeline: Sept 4 leave begins → Oct 10 return + Write-Up #4 same day → Oct 22 terminated (12 days post-return). The proximity creates strong inference of reprisal under the Alberta Human Rights Act.',
    priority: 'nuclear',
    icon: '👶',
  },
  {
    id: 26,
    timestamp: '2025-07-20?',
    text: '⭐ Failure to Report PSI: Chemical Exposure',
    category: 'ohs',
    type: 'point',
    endDate: null,
    tags: ['smoking-gun', 'ohs'],
    description: ' Three workers (Employee, Ramon, RJ) suffered chemical eye and lung irritation during confined space work with epoxy paint. Symptoms: intense burning, continuous watering, pain severe enough to halt work. No WCB/Injury report filed. Management procured full-face masks (previously requested by Employee for over a year) within 1-2 days of incident.',
    evidence: [
      'Safety Culture app entries',
      'PPE purchase records (full face masks post-incident)',
      'Coworker testimony (Ramon, RJ)',
      'Text confirmation July 22: "Masks should be coming in from uline today"'
    ],
    evidenceImages: [
      {
        type: 'doc',
        file: 'images/evidence/ohs/July-22-2025-Full-Face-Mask-Arrived-1.jpg',
        caption: 'Arrival of Full Face Masks immediately following the injury incident.'
      },
      {
        type: 'doc',
        file: 'images/evidence/ohs/July-22-2025-Full-Face-Mask-Arrived-2.jpg',
        caption: 'PPE Equipment. Rapid procurement demonstrates masks were readily available.'
      }
    ],
    witnesses: ['Ramon (affected)', 'RJ (affected)', 'Manager Gonzales'],
    legalSignificance: 'Failure to Report PSI / Validation of Safety Concerns. The Employer failed to report a Potentially Serious Incident (PSI) involving chemical exposure. The immediate purchase of masks confirms the validity of the Employee\'s prior safety refusal.',
    priority: 'nuclear',
    icon: '☣️',
  },
  {
    id: 73,
    timestamp: '2025-08-05',
    text: '⭐ Disciplinary Record: Write-Up #3 (GPS Contradictions)',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['critical', 'smoking-gun', 'family', 'disability', 'bad-faith-conduct'],
    description: 'Write-Up #3 alleging lateness on 5 dates plus administrative issues. GPS data contradicts 4 of 5 lateness allegations:\n\n**June 25:** Alleged 7:35 AM arrival. GPS: LEFT home 6:48 AM, ARRIVED 10 minutes EARLY.\n\n**July 10:** Alleged 8:00 AM arrival. GPS: 7:33 AM (3 minutes late, NOT 30 minutes). CRITICAL: Manager Gonzales ABSENT from morning meeting same day (differential treatment).\n\n**July 28:** Alleged sent late text. GPS: LEFT home 6:45 AM, ARRIVED 7:20 AM (10 MINUTES EARLY for 7:30 start).\n\n**July 31:** Alleged 8:00 AM arrival. GPS: 7:54 AM (6 minutes before start, NOT 8:00 AM).\n\n**July 25:** Timecard submission (administrative issue, not lateness).\n\n**August 4:** Personal day request (separate incident).\n\nDuring disciplinary meeting, HR Director Sherman made discriminatory statement: "Everyone has had children and no one else is late. Having children should not be a reason why you\'re late." Sherman repeatedly asked "Do you care about work?" despite Employee having worked 140.5 hours in July. Employee signed under institutional duress.',
    evidence: [
      'Write-Up #3 document (Aug 5, 2025)',
      'GPS data contradicting 4 of 5 dates',
      'July timecard: 140.5 hours',
      'Manager absence evidence (July 10)',
      'Employee testimony: Sherman discriminatory statement',
      'Text notifications showing compliance'
    ],
    evidenceImages: [
      {
        type: 'doc',
        file: 'images/evidence/documents/Write-Up-3-Michelle-Statement-2025-08-05.pdf',
        caption: 'Write-Up #3. Alleges lateness on 5 dates; GPS contradicts 4 of 5.'
      },
      {
        type: 'gps',
        file: 'images/evidence/gps-proofs/Jun-25-2025-10min-EARLY.jpg',
        caption: 'June 25 GPS: Alleged 7:35 AM. GPS shows LEFT 6:48 AM, arrived 10 minutes EARLY.'
      },
      {
        type: 'gps',
        file: 'images/evidence/gps-proofs/July-10-2025-3min-Late.jpg',
        caption: 'July 10 GPS: Alleged 8:00 AM. GPS shows 7:33 AM (3 min late, NOT 30 min).'
      },
      {
        type: 'gps',
        file: 'images/evidence/critical/July-28-Not-late.jpeg',
        caption: 'July 28 GPS: Alleged late. GPS shows LEFT 6:45 AM, ARRIVED 7:20 AM (10 minutes EARLY).'
      },
      {
        type: 'gps',
        file: 'images/evidence/gps-proofs/July-31-2025-24min-Late.jpg',
        caption: 'July 31 GPS: Alleged 8:00 AM. GPS shows 7:54 AM (6 minutes before start).'
      },
      {
        type: 'text',
        file: 'images/evidence/lateness-notifications/July-10-2025-Late.jpg',
        caption: 'July 10 Text (6:59 AM): "Hey John, might be a few mins late. Traffic bad."'
      },
      {
        type: 'text',
        file: 'images/evidence/boss-lateness/July-10-2025-John-Missing-Morning-Meeting.jpg',
        caption: 'July 10 Differential Treatment: Manager ABSENT from meeting same day Employee disciplined.'
      }
    ],
    witnesses: ['Manager Gonzales', 'HR Director Michelle Sherman', 'Employee'],
    legalSignificance: 'Documentary Fabrication / Institutional Discrimination. GPS contradicts 4 of 5 allegations (June 25, July 10, July 28, July 31), demonstrating systematic falsification of attendance records. HR Director Sherman statement ("Having children should not be a reason...") is explicit rejection of protected ground by institutional authority. July 10 differential treatment (Manager absent, Employee disciplined for 3 min) destroys just cause. Sherman questioning "Do you care about work?" after 140.5-hour month demonstrates discriminatory animus. Document signed under institutional coercion.',
    priority: 'nuclear',
    icon: '📝',
  },
  {
    id: 74,
    timestamp: '2025-08-04',
    text: 'Denial of Personal Leave / Misrepresentation of Policy',
    category: 'family',
    type: 'point',
    endDate: null,
    tags: ['family', 'bad-faith-conduct'],
    description: 'Employee requested a personal day due to illness. Manager Gonzales denied, falsely stating "You can\'t take any more personal days u need to get a doctors notes" despite this being the Employee\'s first personal day request. Employee had only taken bereavement leave (July 6) previously. Employee forced to return while contagious; illness spread to coworkers. Manager Gonzales subsequently took 2 days off for same illness. Ramon and RJ took 1-2 days off for same illness.',
    evidence: [
      'Text messages (Aug 4)',
      'Absence records (proving no prior usage)',
      'Manager took 2 days off after becoming ill',
      'Coworkers took days off after becoming ill'
    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/work-context/Aug-04-2025-Personal-Day-Request.jpg',
        caption: 'Manager: "You can\'t take any more personal days."'
      }
    ],
    witnesses: ['Manager Gonzales', 'Coworkers (infected)'],
    legalSignificance: 'Bad Faith Conduct. The Manager knowingly provided false information regarding leave entitlements to compel attendance.',
    priority: 'high',
    icon: '🤥',
  },
  {
    id: 43,
    timestamp: '2025-08-09',
    text: 'Manager Lateness (Instance 6)',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['critical', 'lateness-boss', 'just-cause-failure'],
    description: 'Manager Gonzales late on Saturday shift. Sixth documented instance (May 16, May 28, Jul 10, Jul 22, Jul 27, Aug 9) without discipline.',
    evidence: ['Text messages'],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/boss-lateness/Aug-09-2025-John-Late-Saturday.jpg',
        caption: 'Manager lateness (Aug 9, Saturday). 6th instance. No discipline.'
      }
    ],
    witnesses: ['Coworkers'],
    legalSignificance: 'Pattern of Differential Treatment established. Six instances over 3.5 months without discipline. Compare: Employee terminated Oct 22 for lateness pattern.',
    latenessPersonKey: 'boss',
    priority: 'critical',
    icon: '⚖️'
  },
  {
    id: 27,
    timestamp: '2025-08-26',
    text: 'Lateness Event: Disability Symptom',
    category: 'disability',
    type: 'point',
    endDate: null,
    tags: ['disability', 'lateness-employee'],
    description: 'Employee notification: "Woke up late." Correlates with Sleep Apnea and infant care sleep deprivation.',
    evidence: ['Text message', 'GPS data', 'Sleep Apnea diagnosis'],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/lateness-notifications/Aug-26-2025-Late.jpg',
        caption: 'Notification text.'
      },
      {
        type: 'doc',
        file: 'images/evidence/gps-proofs/Aug-26-2025-3min-Late.jpg',
        caption: 'GPS Data: 3 minute delay.'
      }
    ],
    witnesses: ['Manager Gonzales'],
    legalSignificance: 'Disability Nexus. ',
    latenessPersonKey: 'employee',
    priority: 'medium'
  },
  {
    id: 28,
    timestamp: '2025-08-28',
    text: '⭐ Denial of Family Responsibility Leave',
    category: 'family',
    type: 'point',
    endDate: null,
    tags: ['smoking-gun', 'family'],
    description: 'Employee requested time off to care for sick infant and spouse (both ill). Manager Gonzales denied: "I\'m sorry they are sick, but you still need to come to work." Employee followed up explaining medical necessity; Manager refused without discussion of alternatives. Employee remained home Aug 29 to care for sick child. Sept 3: Manager demanded retroactive medical documentation (5 days after).',
    evidence: [
      'Text messages Aug 28 (request + denial)',
      'Text message Aug 28 (follow-up)',
      'Text message Sept 3 (retroactive demand)',
      'Medical documentation for child'
    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/family-status/Aug-28-2025-Sick-Baby-Request.jpg',
        caption: 'Manager denial: "you still need to come to work." Compare to June 13 approval.'
      },
      {
        type: 'doc',
        file: 'images/evidence/medical-records/2025-08-28_doc_kinza-sick-note-1.jpg',
        caption: 'Medical documentation for child\'s illness.'
      },
      {
        type: 'doc',
        file: 'images/evidence/medical-records/Baby-Sept-2-2025-Viral-Cough.pdf',
        caption: 'Medical record: viral cough diagnosis confirms legitimate need.'
      },
      {
        type: 'text',
        file: 'images/evidence/smoking-guns/Sept-03-2025-Retroactive-Sick-Note-Demand.jpg',
        caption: 'Retroactive documentation demand 5 days later.'
      }
    ],
    witnesses: ['Manager Gonzales', 'Doctor'],
    legalSignificance: 'Failure to Accommodate Family Status. Core protected obligation (sick infant medical care). No alternative caregiver (spouse also ill). Employer refused without inquiry into alternatives. Compare to June 13 approval (same situation, Manager approved). Pattern: June 13 approved → July 20 accommodation withdrawn → Aug 28 denied.',
    priority: 'nuclear',
    icon: '🤒',
  },
  {
    id: 36,
    timestamp: '2025-09-07',
    text: 'HR Correspondence: "Urgent" Deadline',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['critical', 'family'],
    description: 'Michelle Sherman (HR) emailed Employee during parental leave, setting Sept 8 deadline for Sept 3 timecard information, characterizing it as urgent. I responded back with the required information before the deadline. Despite stated urgency, Employer took no action until 33 days later (Oct 10), upon Employee\'s first day back.',
    evidence: [
      'Email from Michelle Sherman (Sept 7)',
      'Sept 8 deadline stated',
      'Write-Up #4 issued Oct 10 (33 days later)'
    ],
    evidenceImages: [
      {
        type: 'email',
        file: 'images/evidence/smoking-guns/Sept-07-2025-Michelle-Urgent-Email.png',
        caption: 'HR email establishing Sept 8 deadline.'
      }
    ],
    witnesses: ['Michelle Sherman'],
    legalSignificance: 'Pretextual Timing. The 33-day delay between "urgent" deadline and disciplinary action (issued exactly upon return from protected leave) demonstrates discipline was stockpiled for reprisal.',
    priority: 'critical',
    icon: '📧',
  },
  {
    id: 30,
    timestamp: '2025-10-10',
    text: '⭐ Return to Work / Write-Up #4',
    category: 'family',
    type: 'point',
    endDate: null,
    tags: ['smoking-gun', 'family', 'lateness-employee'],
    description: 'Employee returned from parental leave. Two events this date: (1) Morning 8-minute delay due to assisting elderly family members (Thanksgiving travel); text sent at 4:54 AM (8+ hours notice). (2) Same day: Employer issued Write-Up #4 ("FINAL OPPORTUNITY") regarding Sept 3 timecard (33-day delay from "urgent" Sept 7 deadline).',
    evidence: [
      'Text message (4:54 AM)',
      'GPS data',
      'Write-Up #4'
    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/smoking-guns/Oct-10-2025-Write-Up-Day-Of-Return.jpg',
        caption: 'Oct 10: 8-min lateness (family caregiving) + Write-Up #4 same day.'
      },
      {
        type: 'doc',
        file: 'images/evidence/gps-proofs/Oct-10-2025-8min-Late.jpg',
        caption: 'GPS: 8 min delay. Text sent 4:54 AM (8+ hours notice). First day back from parental leave.'
      }
    ],
    witnesses: ['Manager Gonzales'],
    legalSignificance: 'Reprisal for Protected Leave. Issuing "Final Opportunity" warning on the very first day back from leave, for an issue Employer knew about for 33 days, indicates predetermined intent to terminate. Timeline: Sept 7 "urgent" → Oct 10 return + discipline same day → Oct 22 terminated (12 days).',
    latenessPersonKey: 'employee',
    priority: 'nuclear',
  },
  {
    id: 31,
    timestamp: '2025-10-14',
    text: 'Differential Treatment: Sick Note Requirement',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['critical', 'just-cause-failure'],
    description: 'Employee required to provide medical note for 2 sick days (Oct 14-16). Same week, coworker "Jessica" showed symptoms of illness at morning meeting, sent home by Manager Gonzales, not required to provide documentation.',
    evidence: [
      'Text requiring note',
      'Witness testimony (Jessica)',
      ''
    ],
    witnesses: ['Manager Gonzales', 'Jessica', 'RJ','Ramon'],
    legalSignificance: 'Discriminatory Enforcement. Employer applied stricter verification standards to Employee than to comparator (Jessica) in same week. Timing: 8 days before termination. Pattern of documentation building.',
    priority: 'critical',
    icon: '🤧'
  },
  {
    id: 32,
    timestamp: '2025-10-16',
    text: 'Sick Absence (Day 2)',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['just-cause-failure'],
    description: 'Employee continued sick absence with medical note (non-consecutive: Oct 14, worked Oct 15, sick Oct 16).',
    evidence: ['Sick note covering both days'],
    witnesses: ['Manager Gonzales'],
    legalSignificance: 'Continued differential application of policy. Six days before termination.',
    priority: 'high'
  },
  {
    id: 44,
    timestamp: '2025-10-16',
    text: 'Coworker Lateness (RJ & Ramon)',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['critical', 'lateness-coworker', 'just-cause-failure'],
    description: 'Coworkers RJ and Ramon arrived late. No discipline issued. Occurred 6 days prior to Employee termination.',
    evidence: ['Observations/Texts'],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/differential-treatment/Oct-16-2025-RJ-Ramon-Late.jpg',
        caption: 'Record of coworker lateness without discipline.'
      }
    ],
    witnesses: ['RJ', 'Ramon'],
    legalSignificance: 'Differential Treatment. Lateness tolerated for comparators, undermining "Just Cause" assertion.',
    latenessPersonKey: 'coworker',
    priority: 'critical',
    icon: '⚖️'
  },
  {
    id: 37,
    timestamp: '2025-10-20',
    text: '⭐ Systemic Barrier: Timecard Lockout',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['smoking-gun', 'just-cause-failure'],
    description: 'Employee requested "Timecard Unlock" from Manager Gonzales at 7:37 AM because he failed to unlock the timecard via the system. System auto-locks after 3 days, preventing compliance without Manager intervention. Once locked, Employee cannot submit any future timecards; each day accumulates additional "failures." Only Manager Gonzales can unlock. Oct 22 (2 days later): Employee terminated for "continued failure to submit timecards."',
    evidence: [
      'Text message request (Oct 20, 7:37 AM)',
      'System documentation',
      'Timeline: Oct 20 request → Oct 22 termination'
    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/smoking-guns/Oct-20-2025-Schedule-Manipulation.jpg',
        caption: 'Oct 20: "Can I get TC unlock pls." System locks → only Manager can unlock → 2 days later terminated for "failure to submit."'
      }
    ],
    witnesses: ['Manager Gonzales', 'IT'],
    legalSignificance: 'Manufacturing Cause / Impossible Condition. Employer relied on "failure to submit timecards" for termination while simultaneously controlling system access required to submit. Employee requested access Oct 20 → terminated Oct 22 for accumulated "failures."',
    priority: 'nuclear',
    icon: '🔒',
  },
  {
    id: 33,
    timestamp: '2025-10-20',
    text: '⭐ Constructive Dismissal / Unreasonable Overtime Demand',
    category: 'family',
    type: 'point',
    endDate: null,
    tags: ['smoking-gun', 'family'],
    description: 'Management announced mandatory 12-hour shifts for 12 consecutive days (Oct 20-31, including weekends) with less than 24 hours notice. Employee requested accommodation: take Oct 23 (half day) and Oct 24 (full day) off for prior obligation; work Saturday, Sunday, remainder of period. Total hours same or more. Manager Gonzales refused: "You are REQUIRED to work Saturday and Sunday. It\'s IN YOUR CONTRACT. You WILL HAVE TO come in to work. NO IFS ANDS OR BUTS." No discussion of alternatives, I complied.',
    evidence: [
      'Coworker testimony',
      'Employment contract',

    ],
    witnesses: ['Coworkers', 'Manager Gonzales'],
    legalSignificance:  'Triggering Event for Termination. The Employee\'s reasonable pushback against a unilateral and substantial change to working conditions (unreasonable overtime demand) appears to be the proximate cause of the termination two days later.',
    priority: 'nuclear',
    icon: '⏰',
  },
  {
    id: 34,
    timestamp: '2025-10-22',
    text: '⭐ Final Lateness Event: Technical Failure',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['smoking-gun', 'lateness-employee', 'disability', 'just-cause-failure'],
    description: 'Employee phone battery failed overnight, preventing alarm function. Employee texted immediately upon waking at 8:00 AM. Arrived at 8:59 AM. This was an isolated technical failure, distinct from childcare-related delays.',
    evidence: [
      'Text message (8:00 AM)',
      'GPS data',
      'Wife testimony re: phone situation'
    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/termination/Oct-22-2025-Termination-Text.jpg',
        caption: 'Notification text explaining technical failure.'
      },
      {
        type: 'doc',
        file: 'images/evidence/gps-proofs/Oct-22-2025-1.5hr-Late.jpg',
        caption: 'GPS Data.'
      }
    ],
    witnesses: ['Manager Gonzales', 'Wife'],
    legalSignificance: 'Pretextual Trigger. The Employer utilized this isolated technical failure to execute a summary dismissal on the same day, without investigation or consideration of the mitigating circumstance.',
    latenessPersonKey: 'employee',
    priority: 'nuclear',
    icon: '📱'
  },
  {
    id: 45,
    timestamp: '2025-10-22',
    text: '⭐ Differential Treatment: Coworker Lateness (Same Day)',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['smoking-gun', 'lateness-coworker', 'just-cause-failure'],
    description: 'Coworker RJ arrived late on the same morning the Employee was terminated for lateness. RJ received no discipline. ',
    evidence: ['Text messages/Observations'],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/differential-treatment/Oct-22-2025-RJ-Late.jpg',
        caption: 'RJ late same day Employee terminated for lateness. Same day differential treatment.'
      }
    ],
    witnesses: ['RJ', 'Coworkers'],
    legalSignificance: 'Specific Instance of Disparate Treatment. The Employer chose to terminate one employee while ignoring identical conduct by another on the very same day. This confirms discriminatory intent.',
    latenessPersonKey: 'coworker',
    priority: 'nuclear',
    icon: '💣'
  },
  {
    id: 35,
    timestamp: '2025-10-22',
    text: '⭐ Termination Event',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['smoking-gun', 'just-cause-failure', 'bad-faith-conduct'],
    description: 'Summary dismissal at lunchtime. Present: Manager Gonzales (in person), Michelle Sherman (remote). Duration: Under 2 minutes. No advance warning. Employee handed termination letter immediately upon sitting. Manager: "You know what this is." Letter alleged "Just Cause" with no severance. Employee reported a state of shock and inability to respond. Exit was supervised. Employee inadvertently left termination letter at workplace.',
    evidence: [
      'Termination letter',
      'Employee testimony'
    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/text-messages/2025-10-22_text_terminated.jpg',
        caption: 'Termination notification.'
      },
      {
        type: 'doc',
        file: 'images/evidence/documents/Termination-Letter.pdf',
        caption: 'Termination Letter. Employee challenges integrity of reasons listed vs. Oct 22 version.'
      }
    ],
    witnesses: ['Manager Gonzales', 'Michelle Sherman'],
    legalSignificance: 'Bad Faith Manner of Dismissal / Lack of Proportionality. The summary dismissal was conducted in an "ambush" style without a disciplinary hearing or opportunity for the employee to respond (McKinley). The Employer failed to consider lesser sanctions or the protected grounds involved.', 
    priority: 'nuclear',
    icon: '⚖️',
  },
  {
    id: 79,
    timestamp: '2025-10-22',
    text: '⭐ Evidence Spoliation: Revocation of Access',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['smoking-gun', 'bad-faith-conduct'],
    description: 'Following termination, the Employee attempted to review work emails to preserve records. Access was revoked while the Employee was actively reviewing the file. This prevented the preservation of disciplinary consultations, portal unlock requests and safety correspondence.',
    evidence: [
      'Employee testimony',
      'Oct 23 email request ',
      'IT logs (subject to discovery)'
    ],
    evidenceImages: [],
    witnesses: ['IT Staff'],
    legalSignificance: 'Spoliation of Evidence. Access terminated during active document review suggests consciousness of liability and prejudice to the Employee\'s ability to defend against the "Just Cause" allegations. Evidence lost: portal unlock requests, disciplinary records, HR correspondence, safety communications.',
    priority: 'nuclear',
    icon: '🗑️',
  },
  // POST-TERMINATION CORRESPONDENCE - Bad Faith Pattern
  {
    id: 54,
    timestamp: '2025-10-22',
    text: 'PIPA Request: Employment File',
    category: 'correspondence-michelle',
    type: 'point',
    endDate: null,
    tags: ['post-termination-misconduct'],
    description: 'Employee formally requested complete employment file including email records, pursuant to Alberta PIPA legislation.',
    evidence: [
      'Email to Michelle Sherman'
    ],
    evidenceImages: [
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-22-2025-Employment-Records-Request.png',
        caption: 'Formal request for records.'
      }
    ],
    witnesses: ['Michelle Sherman'],
    legalSignificance: 'Exercise of Statutory Rights. Establishes timeline of document access requests.',
    priority: 'high',
    icon: '📧'
  },
  {
    id: 55,
    timestamp: '2025-10-23',
    text: 'Counsel Response: Delay of Production',
    category: 'correspondence-carol',
    type: 'point',
    endDate: null,
    tags: ['post-termination-misconduct'],
    description: 'Employer Counsel (Carol Burke) responded: (1) Will provide file "once ROE finalized" (no timeline), (2) Contract "already provided by Ms. Sherman" (sent to revoked email, inaccessible), (3) Does not address Item 8 (email access).',
    evidence: [
      'Email from Carol Burke'
    ],
    evidenceImages: [
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-23-2025-Carol-Burke.png',
        caption: 'Counsel response delaying production.'
      }
    ],
    witnesses: ['Carol Burke'],
    legalSignificance: 'Obstruction. Conditioning PIPA access on unrelated administrative tasks constitutes a barrier to access.',
    priority: 'high',
    icon: '📄'
  },
  {
    id: 46,
    timestamp: '2025-10-24',
    text: 'Payroll Coordination / Access Block',
    category: 'correspondence-danielle',
    type: 'point',
    endDate: null,
    tags: ['post-termination-misconduct'],
    description: 'Final pay did not come through which required investigation.',
    evidence: [
      'Emails with Danielle Schwartz'
    ],
    evidenceImages: [
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-24-2025-Danielle-Schwartz-Pay-1.png',
        caption: 'Pay Confirmation'
      },
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-24-2025-Danielle-Schwartz-Pay-2.png',
        caption: 'Confirmation of hours due to revoked access'
      }
    ],
    witnesses: ['Danielle Schwartz'],
    legalSignificance: 'Lack of Transparency.',
    priority: 'high',
    icon: '💰'
  },
  {
    id: 47,
    timestamp: '2025-10-27',
    text: '⭐ Administrative Error: Incorrect Payment Destination',
    category: 'correspondence-danielle',
    type: 'point',
    endDate: null,
    tags: ['smoking-gun', 'post-termination-misconduct'],
    description: 'Employer remitted final pay to incorrect bank account. Multiple emails required over 4 days (Oct 24-28) to resolve. Financial hardship when Employee had no income.',
    evidence: [
      'Email chain (Oct 24-28)'
    ],
    evidenceImages: [
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-27-2025-Danielle-Schwartz-Pay-3.png',
        caption: 'Discovery of payment error.'
      },
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-27-2025-Danielle-Schwartz-Pay-4.png',
        caption: 'Error coordination.'
      },
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-27-2025-Danielle-Schwartz-Pay-5.png',
        caption: 'Correspondence.'
      },
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-27-2025-Danielle-Schwartz-Pay-6.png',
        caption: 'Confirmation of error.'
      },
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-27-2025-Danielle-Schwartz-Pay-7.png',
        caption: 'Correspondence.'
      },
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-27-2025-Danielle-Schwartz-Pay-8.png',
        caption: 'Correspondence.'
      },
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-27-2025-Danielle-Schwartz-Pay-9.png',
        caption: 'Correspondence.'
      }
    ],
    witnesses: ['Danielle Schwartz'],
    legalSignificance: 'Evidence of Lack of Care (Wallace). Carelessness with terminated employee\'s compensation during vulnerable period. Pattern: incorrect bank account + ROE delay = financial hardship aggravation.',
    priority: 'critical',
    icon: '💰'
  },
  {
    id: 48,
    timestamp: '2025-10-28',
    text: 'Resolution of Payment Error',
    category: 'correspondence-danielle',
    type: 'point',
    endDate: null,
    tags: ['post-termination-misconduct'],
    description: 'Final resolution after 4 days coordination (Oct 24-28).',
    evidence: [
      'Email chain'
    ],
    evidenceImages: [
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-28-2025-Danielle-Schwartz-Pay-10.png',
        caption: 'Resolution correspondence.'
      },
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-28-2025-Danielle-Schwartz-Pay-11.png',
        caption: 'Resolution correspondence.'
      },
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-28-2025-Danielle-Schwartz-Pay-12.png',
        caption: 'Final confirmation.'
      }
    ],
    witnesses: ['Danielle Schwartz'],
    legalSignificance: 'Documented 4-day delay timeline.',
    priority: 'medium',
    icon: '💰'
  },
  {
    id: 49,
    timestamp: '2025-10-29',
    text: 'Counsel Correspondence: Document Request',
    category: 'correspondence-carol',
    type: 'point',
    endDate: null,
    tags: ['post-termination-misconduct'],
    description: 'Counsel Burke acknowledged file request.',
    evidence: [
      'Email from Carol Burke'
    ],
    evidenceImages: [
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-29-2025-Carol-Burke.png',
        caption: 'Counsel acknowledgment.'
      }
    ],
    witnesses: ['Carol Burke'],
    legalSignificance: 'Chain of Custody.',
    priority: 'medium',
    icon: '📄'
  },
  {
    id: 50,
    timestamp: '2025-10-30',
    text: '⭐ Production of Incorrect Documents',
    category: 'correspondence-carol',
    type: 'point',
    endDate: null,
    tags: ['smoking-gun', 'post-termination-misconduct'],
    description: 'Counsel Burke provided the employment agreement. The documents were manulife forms, necessitating a correction 5 days later.',
    evidence: [
      'Email chain',
      'Incorrect document (Oct 30)',
      'Corrected document (Nov 4)'
    ],
    evidenceImages: [
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-30-2025-Carol-Burke-1.png',
        caption: 'Counsel email with incorrect documents.'
      },
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-30-2025-Carol-Burke-2.png',
        caption: 'Incorrect documents.'
      },
      {
        type: 'doc',
        file: 'images/evidence/documents/Continuation-of-Coverage.pdf',
        caption: 'Incorrect benefits document.'
      },
      {
        type: 'doc',
        file: 'images/evidence/documents/Life-Conversion-Form.pdf',
        caption: 'Incorrect benefits document.'
      }
    ],
    witnesses: ['Carol Burke'],
    legalSignificance: 'Document Integrity Concern. Pattern of document errors (incorrect agreement, incorrect bank account, ROE delays) affects credibility.',
    priority: 'nuclear',
    icon: '📄'
  },
  {
    id: 51,
    timestamp: '2025-10-31',
    text: 'Document Coordination',
    category: 'correspondence-carol',
    type: 'point',
    endDate: null,
    tags: ['post-termination-misconduct'],
    description: 'Ongoing coordination regarding Oct 30 document errors.',
    evidence: [
      'Email from Carol Burke'
    ],
    evidenceImages: [
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-31-2025-Carol-Burke.png',
        caption: 'Document coordination.'
      }
    ],
    witnesses: ['Carol Burke'],
    legalSignificance: 'Administrative delay.',
    priority: 'medium',
    icon: '📄'
  },
  {
    id: 52,
    timestamp: '2025-11-04',
    text: '⭐ Production of "Corrected" Documents ("Dear Rollins" Error)',
    category: 'correspondence-carol',
    type: 'point',
    endDate: null,
    tags: ['smoking-gun', 'post-termination-misconduct'],
    description: 'Counsel Burke provided the "corrected" employment agreement 5 days after the initial production. This version contains the "Dear Rollins:" error. This sequence raises questions regarding whether the error was present in the original execution or introduced in the "corrected" version.',
    evidence: [
      'Email from Carol Burke (Nov 4)',
      'Employment agreement with error',
      'Termination letter'
    ],
    evidenceImages: [
      {
        type: 'email',
        file: 'images/evidence/correspondence/Nov-04-2025-Carol-Burke.png',
        caption: 'Nov 4: "Corrected" documents provided.'
      },
      {
        type: 'doc',
        file: 'images/evidence/documents/Employment-Agreement-Dear-Rollins-Error.pdf',
        caption: 'Employment Agreement: "Dear Rollins:" error demonstrates lack of diligence.'
      },
      {
        type: 'doc',
        file: 'images/evidence/documents/Termination-Letter.pdf',
        caption: 'Termination letter. Employee challenges integrity vs. Oct 22 version (possible post-termination addition of reasons).'
      }
    ],
    witnesses: ['Carol Burke'],
    legalSignificance: 'Lack of Due Diligence / Document Integrity. "Dear Rollins" error indicates lack of attention. If Termination Letter was altered post-termination (after-acquired cause),the added reasons are legally inadmissible.',
    priority: 'nuclear',
    icon: '📄'
  },
  {
    id: 53,
    timestamp: '2025-11-04',
    text: '⭐ ROE Non-Compliance: Late Issuance',
    category: 'correspondence-michelle',
    type: 'point',
    endDate: null,
    tags: ['smoking-gun', 'post-termination-misconduct'],
    description: 'Employee requested ROE 13 days post-termination. Employment Insurance Act s. 19 requires issuance within 5 calendar days. ROE released Nov 5 (14-day total delay).',
    evidence: [
      'Email chain',
      'Employment Insurance Act s. 19'
    ],
    evidenceImages: [
      {
        type: 'email',
        file: 'images/evidence/correspondence/Nov-04-2025-Michelle-Sherman-ROE-1.png',
        caption: 'Nov 4: Employee requests ROE (13 days post-termination). Federal 5-day requirement violated.'
      },
      {
        type: 'email',
        file: 'images/evidence/correspondence/Nov-04-2025-Michelle-Sherman-ROE-2.png',
        caption: 'ROE correspondence.'
      },
      {
        type: 'email',
        file: 'images/evidence/correspondence/Nov-04-2025-Michelle-Sherman-ROE-3.png',
        caption: 'ROE correspondence.'
      }
    ],
    witnesses: ['Michelle Sherman'],
    legalSignificance: 'Statutory Violation (Employment Insurance Act s. 19). 14-day delay (9 days past requirement). Delayed EI application causing financial hardship. Combined with incorrect bank account = pattern of post-termination bad faith.',
    priority: 'nuclear',
    icon: '📋'
  },
  {
    id: 60,
    timestamp: '2025-11-05',
    text: '⭐ ROE Issuance: 14 Day Delay',
    category: 'correspondence-michelle',
    type: 'point',
    endDate: null,
    tags: ['smoking-gun', 'post-termination-misconduct'],
    description: 'ROE released to MSCA. 14 days post-termination (Oct 22 → Nov 5). 9 days past 5-day statutory deadline.',
    evidence: [
      'ROE Metadata',
      'MSCA records'
    ],
    evidenceImages: [
      {
        type: 'email',
        file: 'images/evidence/correspondence/Nov-04-2025-Michelle-Sherman-ROE-3.png',
        caption: 'HR email confirming Nov 5 release.'
      },
      {
        type: 'doc',
        file: 'images/evidence/documents/ROE-NOV5-2025.pdf',
        caption: 'ROE issued Nov 5. 14-day delay.'
      }
    ],
    witnesses: ['Michelle Sherman'],
    legalSignificance: 'Confirmation of Statutory Violation. Prevented EI application for 2 weeks.',
    priority: 'high',
    icon: '📋'
  },
  {
    id: 82,
    timestamp: '2025-11-21',
    text: 'Production of Disciplinary Record',
    category: 'correspondence-michelle',
    type: 'point',
    endDate: null,
    tags: ['post-termination-misconduct'],
    description: 'Michelle Sherman provided copies of all disciplinary documents (8 attachments).',
    evidence: [
      'Email from Michelle Sherman',
      'All disciplinary records'
    ],
    evidenceImages: [
      {
        type: 'email',
        file: 'images/evidence/documents/Nov-21-2025-Michelle-Sherman-Copies-Disciplinary.png',
        caption: 'HR email providing disciplinary records.'
      },
      {
        type: 'doc',
        file: 'images/evidence/documents/Write-Up-1a-Timecards-2025-02-21.pdf',
        caption: 'Write-Up 1a: Timecards.'
      },
      {
        type: 'doc',
        file: 'images/evidence/documents/Write-Up-1b-Phone-Aggression-2025-02-21.pdf',
        caption: 'Write-Up 1b: Failure to Investigate. Conflates Jan 9 Safety Advocacy with Feb 20 earbud allegation.'
      },
      {
        type: 'doc',
        file: 'images/evidence/documents/Write-Up-2-Fabricated-2025-06-18.pdf',
        caption: 'Write-Up 2: June 13 absence approved but documented as "not communicated."'
      },
      {
        type: 'doc',
        file: 'images/evidence/documents/Write-Up-3-Michelle-Statement-2025-08-05.pdf',
        caption: 'Write-Up 3: GPS contradicts 3/5 allegations. HR statement re: family status.'
      },
      {
        type: 'doc',
        file: 'images/evidence/documents/Write-Up-4-Final-Opportunity-2025-10-10.pdf',
        caption: 'Write-Up 4: Issued first day back from parental leave. 33-day delay.'
      }
    ],
    witnesses: ['Michelle Sherman'],
    legalSignificance: 'Complete Record. Each write-up contains issues: #1b = OHS retaliation (conflation), #2 = fabrication (June 13), #3 = GPS contradictions + discriminatory statement, #4 = parental leave retaliation timing.',
    priority: 'medium',
    icon: '📧'
  },
  // ADDITIONAL EVIDENCE
  {
    id: 59,
    timestamp: '2025-10-17?',
    text: '⭐ Differential Treatment: Sick Leave Verification (Jessica)',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['smoking-gun', 'just-cause-failure'],
    description: 'In the same week the Employee was required to provide a medical note for illness, coworker "Jessica" was sent home sick without a requirement for medical verification. This occurred 5 days prior to the Employee\'s termination.',
    evidence: [
      'Text requiring Employee documentation'
    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/differential-treatment/Oct-14-16-2025-Sick-Note-Required.jpg',
        caption: 'Sick note demand for Employee.'
      }
    ],
    witnesses: ['Jessica', 'RJ','Ramon','Manager Gonzales'],
    legalSignificance: 'Differential Treatment / Discriminatory Standards. The selective enforcement of medical verification policies against the Employee, but not peers, suggests targeting.',
    priority: 'nuclear',
    icon: '⚖️'
  },
  {
    id: 81,
    timestamp: '2025-09-11',
    text: '⭐ Administrative Error: ROE Data (Parental Leave)',
    category: 'family',
    type: 'point',
    endDate: null,
    tags: ['smoking-gun', 'family'],
    description: 'Employer issued an ROE during parental leave containing significant data errors (incorrect start date, 95% error in insurable hours). These errors resulted in the initial denial of EI benefits. Employee had to email HR Director to correct. Corrected ROE issued Sept 19 (8-day delay).',
    evidence: [
      'Incorrect ROE (Sept 11)',
      'Corrected ROE (Sept 19)',
      'Service Canada denial notice'
    ],
    evidenceImages: [
      {
        type: 'doc',
        file: 'images/evidence/documents/ROE-2025-Incorrect.pdf',
        caption: 'Incorrect ROE: 59 hours (should be 1,452). Caused EI denial.'
      },
      {
        type: 'screenshot',
        file: 'images/evidence/documents/Sept-09-2025-MSCA-Claim-Denied.png',
        caption: 'Service Canada denial: "Insufficient hours worked" based on incorrect data.'
      }
    ],
    witnesses: ['Michelle Sherman', 'Service Canada'],
    legalSignificance: 'Negligence regarding Protected Leave. The administrative failures resulted in the denial of statutory benefits during a protected leave period.',
    priority: 'nuclear',
    icon: '📋'
  },
  {
    id: 61,
    timestamp: '2025-09-19',
    text: 'ROE Correction: 8 Day Delay',
    category: 'family',
    type: 'point',
    endDate: null,
    tags: ['family'],
    description: 'Corrected ROE issued 8 days after the initial error. Data was amended to reflect correct hours.',
    evidence: [
      'Corrected ROE'
    ],
    evidenceImages: [
      {
        type: 'doc',
        file: 'images/evidence/documents/ROE-2025-Corrected.pdf',
        caption: 'Corrected ROE '
      }
    ],
    witnesses: ['Tiffany Li', 'Michelle Sherman'],
    legalSignificance: 'Admission of Error. Different signer suggests escalation. First day still incorrect.',
    priority: 'high',
    icon: '📋'
  },
  {
    id: 62,
    timestamp: '2025-06-03',
    text: 'OHS: Hazardous Contamination Remediation ($10k)',
    category: 'ohs',
    type: 'point',
    endDate: null,
    tags: ['ohs', 'wrongful-dismissal'],
    description: 'Group chat confirms presence of hazardous "black fluid" in tank, necessitating $10,000 in professional decontamination. This validates the Employee\'s previous safety concerns regarding tank hazards.',
    evidence: [
      'Group chat text',
      'Decontamination context'
    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/ohs/June-03-2025-Tank-Decontamination-10k.jpg',
        caption: 'Manager: "$10k in decontamination." Validates Employee safety concerns.'
      }
    ],
    witnesses: ['Ramon', 'Manager Gonzales'],
    legalSignificance: 'Validation of Safety Concerns. $10k remediation proves objective hazard level.',
    priority: 'high',
    icon: '☣️'
  },
  {
    id: 63,
    timestamp: '2025-05-09',
    text: 'OHS: Ventilation Issue Admission',
    category: 'ohs',
    type: 'point',
    endDate: null,
    tags: ['ohs', 'wrongful-dismissal'],
    description: 'Manager Gonzales instructed staff to open bay doors to "circulate the air" during painting operations, admitting to inadequate mechanical ventilation.',
    evidence: [
      'Group chat text'
    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/ohs/May-09-2025-Painting-Washbay.jpg',
        caption: 'Manager text instruction regarding ventilation.'
      }
    ],
    witnesses: ['Ramon'],
    legalSignificance: 'Employer Knowledge of Hazard. Admission that ventilation controls insufficient.',
    priority: 'medium',
    icon: '🎨'
  },
  {
    id: 64,
    timestamp: '2025-02-21',
    text: '⭐ Disciplinary Record: Conflation of Events (Write-Up #1b)',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['smoking-gun', 'just-cause-failure', 'bad-faith-conduct', 'ohs'],
    description: 'Disciplinary record conflates two distinct events: (1) January 9 Safety Advocacy meeting (PPE request), and (2) February 20 alleged earbud infraction. The presence of HSE Manager Caines alongside Manager Gonzales confirms linkage to the prior safety dispute. "Aggression" cited = the Jan 9 PPE advocacy.',
    evidence: [
      'Document conflating two events',
      'Confined space procedures (post-dated, validating concerns)',
    ],
    evidenceImages: [
      {
        type: 'doc',
        file: 'images/evidence/documents/Write-Up-1b-Phone-Aggression-2025-02-21.pdf',
        caption: 'Write-Up 1b: Failure to Investigate. Conflates Jan 9 OHS advocacy ("aggression") with Feb 20 conduct.'
      }
    ],
    witnesses: ['Manager Gonzales', 'HSE Manager Caines'],
    legalSignificance: 'Failure to Investigate / Improper Motive. By characterizing a protected safety refusal (Jan 9) as "aggression" and combining it with a minor infraction (earbuds), the Employer manufactured a pattern of misconduct. The presence of the Safety Manager at a disciplinary meeting for earbuds suggests the true motive was OHS reprisal.',
    priority: 'nuclear',
    icon: '📝',
  },
  {
    id: 65,
    timestamp: '2025-10-10',
    text: '⭐ Disciplinary Record: Write-Up #4 (Parental Leave Retaliation)',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['smoking-gun', 'family', 'disability'],
    description: 'Employer issued "FINAL OPPORTUNITY" warning on Employee\'s first day back from parental leave. Issue cited (Sept 3 timecard) was known 33 days prior (Sept 7 "urgent" email with Sept 8 deadline). Employer waited until return from protected leave to discipline.',
    evidence: [
      'Sept 7 HR email ("Urgent")',
      '33-day delay timeline',
      'Write-Up #4'
    ],
    evidenceImages: [
      {
        type: 'doc',
        file: 'images/evidence/documents/Write-Up-4-Final-Opportunity-2025-10-10.pdf',
        caption: 'Write-Up #4 issued immediately upon return from leave.'
      }
    ],
    witnesses: ['Michelle Sherman', 'Manager Gonzales'],
    legalSignificance: 'Reprisal Timing. 33-day delay in issuing "urgent" discipline, timed exactly to return from protected leave, indicates strategic discipline rather than corrective action.',
    priority: 'nuclear',
    icon: '📝',
  },
  {
    id: 66,
    timestamp: '2025-10-20',
    text: '⭐ Systemic Barrier: Unlock Request',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['smoking-gun', 'disability'],
    description: 'Employee text: "Can I get TC unlock pls." after Manager failed to unlock in system. System prevents compliance once locked; only Manager can unlock. Termination for "failure to submit" followed 2 days later.',
    evidence: [
      'Text request',
      'System design'
    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/termination/Oct-20-2025-Timecard-Unlock-Request.jpg',
        caption: 'Text request for unlock.'
      }
    ],
    witnesses: ['Manager Gonzales'],
    legalSignificance: 'Impossible Condition. Terminated for failure to act while Manager withheld access required to act.',
    priority: 'nuclear',
    icon: '⚠️'
  },
  {
    id: 67,
    timestamp: '2025-05-16',
    text: '⭐ Differential Treatment: Managerial Lateness Pattern (6 Instances)',
    category: 'termination',
    type: 'range',
    endDate: '2025-08-09',
    tags: ['smoking-gun', 'just-cause-failure'],
    description: 'Six documented instances of Manager Gonzales late/absent without consequence: May 16 (absent), May 28 (late), Jul 10 (absent), Jul 22 (late), Jul 27 (late), Aug 9 (late). Establishes Employer did not view lateness as "fundamental breach" for all staff.',
    evidence: [
      'Text records of Manager absence/lateness'
    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/boss-lateness/May-16-2025-John-Missing-Meeting.jpg',
        caption: 'May 16: Manager absent.'
      },
      {
        type: 'text',
        file: 'images/evidence/boss-lateness/May-28-2025-John-Late.jpg',
        caption: 'May 28: Manager late.'
      },
      {
        type: 'text',
        file: 'images/evidence/boss-lateness/July-10-2025-John-Missing-Morning-Meeting.jpg',
        caption: 'Jul 10: Manager absent.'
      },
      {
        type: 'text',
        file: 'images/evidence/boss-lateness/July-22-2025-Check-Up-On-Late-Boss.jpg',
        caption: 'Jul 22: Manager late.'
      },
      {
        type: 'text',
        file: 'images/evidence/boss-lateness/July-27-2025-John-Late.jpg',
        caption: 'Jul 27: Manager late.'
      },
      {
        type: 'text',
        file: 'images/evidence/boss-lateness/Aug-09-2025-John-Late-Saturday.jpg',
        caption: 'Aug 9: Manager late Saturday.'
      }
    ],
    witnesses: ['Coworkers'],
    legalSignificance: 'Differential Treatment / Condonation. The tolerance of identical conduct by Management undermines the assertion that such conduct constitutes Just Cause for termination.',
    priority: 'nuclear',
    icon: '⚖️'
  },
  {
    id: 75,
    timestamp: '2025-07-04',
    text: 'Differential Treatment: Timecard Reminder Pattern',
    category: 'disability',
    type: 'range',
    endDate: '2025-08-25',
    tags: ['disability'],
    description: 'Manager Gonzales issued four group reminders regarding timecards (Jul 4, Jul 28, Aug 11, Aug 25). Reminders were necessitated by new hire "Jessica" also failing to submit timecards. Employer utilized informal coaching (reminders) for Jessica but formal discipline/termination for Employee regarding identical compliance issue. Manager Gonzales admitted during Write-Up #2 being "notoriously bad" at timecards himself, was disciplined when he started, and "hates them to this day."',
    evidence: [
      'Text records of group reminders',

    ],
    evidenceImages: [
      {
        type: 'text',
        file: 'images/evidence/work-context/July-04-2025-John-Timecard-Reminder.jpg',
        caption: 'Jul 4: Group reminder (triggered by Jessica\'s failures).'
      },
      {
        type: 'text',
        file: 'images/evidence/work-context/July-28-2025-John-Timecard-Reminder.jpg',
        caption: 'Jul 28: Group reminder.'
      },
      {
        type: 'text',
        file: 'images/evidence/work-context/Aug-11-2025-John-Timecard-Reminder.jpg',
        caption: 'Aug 11: Group reminder.'
      },
      {
        type: 'text',
        file: 'images/evidence/work-context/Aug-25-2025-John-Timecard-Reminder.jpg',
        caption: 'Aug 25: Group reminder.'
      }
    ],
    witnesses: ['Manager Gonzales', 'Jessica'],
    legalSignificance: 'Differential Treatment. The Employer applied progressive discipline to the Employee for conduct that was managed via informal coaching for a comparator employee (Jessica).',
    priority: 'nuclear',
    icon: '📋'
  },
  {
    id: 70,
    timestamp: '2025-10-27',
    text: 'Administrative Error: Incorrect Payment Destination (Post-Termination)',
    category: 'termination',
    type: 'point',
    endDate: null,
    tags: ['bad-faith-conduct'],
    description: 'Employer remitted final pay to the wrong bank account 5 days post-termination, despite having correct information. This carelessness exacerbated the financial impact of the dismissal.',
    evidence: [
      'Email correspondence (Oct 24-28)'
    ],
    evidenceImages: [
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-27-2025-Danielle-Schwartz-Pay-3.png',
        caption: 'Discovery of error.'
      },
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-27-2025-Danielle-Schwartz-Pay-4.png',
        caption: 'Coordination.'
      },
      {
        type: 'email',
        file: 'images/evidence/correspondence/Oct-27-2025-Danielle-Schwartz-Pay-5.png',
        caption: 'Coordination.'
      }
    ],
    witnesses: ['Danielle Schwartz'],
    legalSignificance: 'Bad Faith Manner of Dismissal (Wallace). Post-termination lack of care/diligence contributes to aggravated damages.',
    priority: 'high',
    icon: '💰'
  }
];
// Export for use in timeline
if (typeof module !== 'undefined' && module.exports) {
  module.exports = timelineEvents;
}
