/**
 * English content. Mirrors `ro.js` key for key — the pages read the structure,
 * not the text, so a key missing from one language shows up straight away.
 *
 * Prose strings may use placeholders, replaced at render time with the real
 * clinic details: {legal} {cui} {address} {email} {phone}. `{email}` and
 * `{phone}` become links. Use **bold** for emphasis.
 *
 * BEFORE LAUNCH replace everything marked "(placeholder)".
 */

export default {
  meta: {
    title: 'Institutul Mâinii — hand surgery and reconstructive microsurgery',
    description:
      'A centre devoted to hand conditions: ultrasound diagnosis in clinic, minimally invasive surgery, recovery led by hand therapists. Bucharest, Romania.',
  },

  clinic: {
    hours: [
      { k: 'Opening hours', v: 'Monday – Friday, 09:00 – 19:00' },
      { k: 'Saturday', v: '09:00 – 14:00, by appointment only' },
      { k: 'Emergencies', v: 'around the clock', phone: true },
    ],
    doctor: {
      role: 'Consultant plastic surgeon. Subspecialised in surgery of the hand',
      facts: [
        ['Training', 'Residency in plastic surgery, hand surgery fellowships in Vienna and Strasbourg'],
        ['Fields', 'Reconstructive microsurgery, peripheral nerve surgery, hand trauma'],
        ['Memberships', 'Romanian Society for Surgery of the Hand, member of IFSSH'],
        ['Clinics', 'Monday, Wednesday and Friday, 09:00 to 15:00, by appointment'],
      ],
    },
  },

  media: {
    hero: 'Anatomical rendering of the hand, with the bones and tendons visible',
    portrait: 'Portrait of the surgeon, in a white coat, in the clinic corridor',
    blueprint: 'Microsurgical instruments laid out in order on a matte surface, in cool light',
    feature: 'Forearm in a custom thermoplastic splint',
    map: 'The clinic in its neighbourhood, shown as a model of the area',
  },

  /** Figures shown publicly. They must be real and verifiable. (placeholder) */
  stats: [
    { value: '18', label: 'years spent\non hands alone' },
    { value: '4,800', label: 'surgical\nprocedures' },
    { value: '98%', label: 'rate of full\nfunctional recovery' },
    { value: '24 h', label: 'average stay before\ndischarge, day surgery' },
  ],

  conditions: [
    {
      id: 'tunel-carpian',
      idx: '01',
      title: 'Carpal tunnel syndrome',
      short: 'Numbness at night, a weakening grip. Endoscopic release through a 1 cm incision, back to desk work in five days.',
      lead: 'Compression of the median nerve inside the carpal tunnel — the most common compression neuropathy of the upper limb.',
      body: [
        'Nine flexor tendons and the median nerve pass through the carpal tunnel. When pressure inside it rises, the nerve suffers first: numbness wakes you at night in the thumb, index and middle finger, grip strength drops, and in advanced cases the muscles at the base of the thumb waste away.',
        'The diagnosis is clinical and is confirmed by ultrasound in the consulting room, where the nerve is measured. Where there is motor weakness we add nerve conduction studies, which show how far conduction has fallen.',
        'Early on, treatment starts with a night splint and, if needed, an ultrasound-guided injection. Once weakness has set in, surgical release is the only thing that stops the nerve deteriorating: endoscopically, through an incision of about 1 cm.',
      ],
      facts: [
        ['Diagnosis', 'Clinical examination and ultrasound in clinic, nerve conduction studies where needed'],
        ['Anaesthesia', 'Local, or brachial plexus block'],
        ['Length of surgery', '20–30 minutes'],
        ['Back to work', '5–10 days for desk work, 3–4 weeks for manual work'],
      ],
    },
    {
      id: 'boala-dupuytren',
      idx: '02',
      title: "Dupuytren's disease",
      short: 'Fingers locked in flexion. From needle fasciotomy through to full selective fasciectomy.',
      lead: 'Thickening and contracture of the palmar fascia, which gradually pulls the fingers into the palm.',
      body: [
        'The disease starts with painless nodules in the palm that many people ignore for years. In time, cords form and draw the finger towards the palm — most often the ring and little finger — until the hand can no longer be laid flat on a table.',
        'The moment to operate is set by the loss of extension, not by the nodule: once the finger can no longer be straightened, hand function falls away quickly.',
        'In early stages, needle fasciotomy divides the cord as an outpatient procedure, with recovery in a few days. In advanced disease we perform a selective fasciectomy, removing the affected tissue completely.',
      ],
      facts: [
        ['Indication', 'Loss of extension that interferes with daily activity'],
        ['Options', 'Needle fasciotomy or selective fasciectomy'],
        ['Anaesthesia', 'Local, or brachial plexus block'],
        ['Back to work', '2–6 weeks, depending on the procedure'],
      ],
    },
    {
      id: 'deget-in-resort',
      idx: '03',
      title: 'Trigger finger and tendinopathies',
      short: "Stenosing tenosynovitis and De Quervain's — ultrasound-guided injection or surgical release.",
      lead: 'The tendon catches in its sheath and the finger snaps as it straightens, often with pain at the base of the finger.',
      body: [
        'The flexor tendon glides through a series of pulleys that hold it against the bone. When the first pulley thickens, the tendon passes with difficulty: the finger locks in flexion, then snaps suddenly into extension.',
        "In De Quervain's disease the same mechanism appears on the thumb side of the wrist, with pain on gripping objects and on moving the thumb.",
        'First-line treatment is an ultrasound-guided injection, which settles a good proportion of cases. If the catching returns, surgical release of the tendon sheath is a short procedure with quick recovery.',
      ],
      facts: [
        ['Diagnosis', 'Clinical examination and dynamic ultrasound'],
        ['First line', 'Ultrasound-guided injection'],
        ['Surgery', 'Release of the tendon sheath, 15–20 minutes'],
        ['Back to work', '3–14 days'],
      ],
    },
    {
      id: 'fracturi-si-luxatii',
      idx: '04',
      title: 'Fractures and dislocations',
      short: 'Distal radius, scaphoid, metacarpals. Fixation with anatomical plates and early movement.',
      lead: 'Fractures of the hand and wrist, from those treated in a cast to those that need internal fixation.',
      body: [
        'Not every fracture needs surgery. Undisplaced fractures are treated in a cast, with an X-ray at one week to confirm the position has held.',
        'Where the fragments are displaced, internal fixation with an anatomical titanium plate holds the bone in the right position while it unites. The advantage is not cosmetic: it allows movement to start within days instead of six weeks of immobilisation.',
        'The scaphoid behaves differently: it is hard to see on the initial X-ray and can unite in a poor position if it is missed, so where there is suspicion we repeat the imaging or arrange a CT scan.',
      ],
      facts: [
        ['Imaging', 'X-ray in two views, CT for complex fractures'],
        ['Implant', 'Low-profile anatomical titanium plates'],
        ['Movement', 'Fingers from day one, the wrist from two weeks'],
        ['Follow-up', 'X-ray at 1, 6 and 12 weeks'],
      ],
    },
    {
      id: 'leziuni-de-nervi',
      idx: '05',
      title: 'Peripheral nerve injuries',
      short: 'Neurolysis, microsurgical nerve repair and nerve grafts to bring sensation back.',
      lead: 'A cut nerve does not necessarily hurt: what you lose is sensation, in a precise territory.',
      body: [
        'The territory that has lost sensation tells us which branch has been divided and where to look for the distal end. That is why careful clinical examination counts for as much as imaging.',
        'The repair is done under the microscope, fascicle by fascicle, with 9-0 and 10-0 sutures. Where the ends cannot be brought together without tension, we use a nerve graft.',
        'Regeneration advances at roughly one millimetre a day, so sensation returns to the fingertip over months, not weeks. Guided rehabilitation throughout that period is what decides the final result.',
      ],
      facts: [
        ['Technique', 'Epineural repair under the microscope, 9-0 and 10-0 sutures'],
        ['Alternative', 'Nerve graft, where the ends will not meet'],
        ['Rate of regeneration', 'About 1 mm per day'],
        ['Recovery', '3–12 months, with sensory re-education'],
      ],
    },
    {
      id: 'artroza-mainii',
      idx: '06',
      title: 'Arthritis of the hand',
      short: 'Thumb base and finger joint arthritis — from joint replacement to a stable fusion.',
      lead: 'Cartilage wear at the base of the thumb or in the finger joints, with pain on gripping and loss of strength.',
      body: [
        'Arthritis at the base of the thumb is the most common form. It hurts when turning a key or opening a jar, and strength falls away gradually.',
        'Treatment begins conservatively: a thumb splint, injections and adapting everyday movements. Many cases stay controlled this way for years.',
        'Where pain persists, the surgical options are chosen according to the joint and to how hard the patient uses the hand: joint replacement where movement matters, fusion where stability and freedom from pain matter more.',
      ],
      facts: [
        ['Conservative', 'Splint, injections, adapting how you use the hand'],
        ['Surgery', 'Joint replacement or fusion'],
        ['Choosing', 'According to the joint and the demands on the hand'],
        ['Back to work', '4–10 weeks'],
      ],
    },
    {
      id: 'urgente-si-replantari',
      idx: '07',
      title: 'Microsurgical emergencies and replantation',
      short: 'Traumatic amputation of fingers and hand. Vessel repair under the microscope at 0.4 mm — the window is measured in hours, not days.',
      lead: 'Traumatic amputations, cut tendons and nerves, crush injuries.',
      body: [
        'The best window for replantation is 6–12 hours from the injury, and shorter if the part has not been cooled properly. That is why the first phone call matters more than the distance to the clinic.',
        'While you travel: keep the amputated part in a clean bag, seal the bag and place it on ice, with no direct contact between ice and tissue. Do not wash the part with antiseptic and do not put it in alcohol.',
        'Vessel repair is done under the microscope, on vessels of roughly 0.4 mm. Replantation is followed by a period of close circulatory monitoring, then a long programme of rehabilitation.',
      ],
      facts: [
        ['Window for surgery', '6–12 hours from injury'],
        ['Transport', 'Clean bag, placed on ice, no direct contact'],
        ['Technique', 'Vessel repair under the microscope, at about 0.4 mm'],
        ['Cover', 'Around the clock, on the emergency number'],
      ],
      urgent: true,
      urgentTitle: 'What to do before you reach the clinic',
      urgentSteps: [
        'Call {phone} straight away — the line is open around the clock.',
        'Put the amputated part in a clean bag and seal the bag.',
        'Place the bag on ice, with no direct contact between ice and tissue.',
        'Do not wash the part with antiseptic and do not put it in alcohol.',
      ],
    },
    {
      id: 'malformatii-congenitale',
      idx: '08',
      title: 'Congenital hand differences',
      short: 'Syndactyly, trigger thumb, polydactyly — corrected at the age that suits development best.',
      lead: 'Hand differences present from birth, assessed and operated at the point that suits the child’s development.',
      body: [
        'The timing is not the same for every diagnosis: some are operated within the first year, others once the hand has grown enough. An early assessment helps even when surgery comes later, because it sets the plan.',
        'In syndactyly, the fingers are separated using skin flaps designed so that the web stays stable as the child grows.',
        'Trigger thumb in children is resolved with a short procedure, and the functional result is usually complete.',
      ],
      facts: [
        ['Assessment', 'As early as possible, even if surgery comes later'],
        ['Timing of surgery', 'Set by the diagnosis and by how the hand is developing'],
        ['Anaesthesia', 'General, with a paediatric anaesthetist on the team'],
        ['Follow-up', 'Regular reviews until growth is complete'],
      ],
    },
  ],

  steps: [
    {
      n: '01',
      time: '45 min',
      title: 'The first consultation',
      text: 'Full clinical examination, functional testing and ultrasound in the room. You leave with a diagnosis, not a referral.',
      img: 'prompt-4',
      alt: 'Examination of the hand, with a loupe and clinic lighting',
    },
    {
      n: '02',
      time: '2–5 days',
      title: 'The treatment plan',
      text: 'We go through every option, including those without surgery. You get the plan in writing, with real costs and real timescales.',
      img: 'prompt-5',
      alt: 'Treatment plan and hand diagrams, on light boxes',
    },
    {
      n: '03',
      time: '30–120 min',
      title: 'The procedure',
      text: 'Most procedures are done under regional anaesthesia, as day surgery. You come in the morning and go home the same evening.',
      img: 'prompt-6',
      alt: 'Microsurgical instrument and suture thread',
    },
    {
      n: '04',
      time: '2–12 weeks',
      title: 'Guided rehabilitation',
      text: 'Hand therapy with splints made on site. Reassessment at every stage, until function is complete.',
      img: 'prompt-7',
      alt: 'Rehabilitation exercise with a resistance ball',
    },
  ],

  faq: [
    {
      q: 'Do I need a referral from my GP?',
      a: 'Not for a private consultation. A referral is only needed if you want certain procedures reimbursed through the national health insurance house (CAS); we check whether that applies to you when you book.',
    },
    {
      q: 'How long before I am back at work?',
      a: 'It depends on the procedure and on what you do. For endoscopic carpal tunnel release: 5–10 days for desk work, 3–4 weeks for manual work. For fracture fixation: 6–8 weeks. The estimate for your case goes into the treatment plan, in writing.',
    },
    {
      q: 'Will I need a general anaesthetic?',
      a: 'In more than 80% of cases, no. We use a brachial plexus block or local anaesthesia: you are awake, you feel no pain, and you go home the same day.',
    },
    {
      q: 'Will the scars show?',
      a: 'Incisions are placed in the natural creases of the skin and closed with a subcuticular suture. At six months, most scars are hard to find unless you know where to look. You also get the scar care protocol.',
    },
    {
      q: 'Do you work with private insurers?',
      a: 'Yes, we hold contracts with the main private insurers. Send us your policy before the consultation and we will confirm cover within 24 working hours.',
    },
    {
      q: 'Do you take emergencies — cuts, amputations?',
      a: 'Yes, around the clock. For amputations: keep the part in a clean bag, place the bag on ice without direct contact, and call immediately. The best window for replantation is 6–12 hours.',
    },
  ],

  recovery: [
    { title: 'A protocol by day', text: 'You know exactly what moves on day 3, 10 and 21, and what stays still.' },
    { title: 'Splints made to fit', text: 'Thermoformed in the clinic and refitted at every review.' },
    { title: 'A direct line', text: 'Contact with your own therapist for 12 weeks after surgery.' },
  ],

  equipment: [
    'Operating microscope with 40× magnification',
    'Arthroscopy stack dedicated to small joints',
    'Musculoskeletal ultrasound with a 22 MHz probe',
    'Low-profile anatomical titanium implants',
  ],

  pages: {
    home: {
      title: 'Hand surgery and reconstructive microsurgery',
      titleLines: ['Hand surgery', 'and reconstructive microsurgery'],
      lead: 'Ultrasound diagnosis in the consulting room, minimally invasive surgery and recovery led by hand therapists. We treat carpal tunnel syndrome, Dupuytren’s disease, fractures and dislocations of the hand, peripheral nerve injuries and microsurgical emergencies.',
      annotations: ['Median nerve', 'Flexor tendons', 'Scapholunate joint'],
      sections: {
        doctor: 'The surgeon',
        conditions: 'Conditions we treat',
        blueprint: 'Pre-operative planning',
        procedures: 'How we work',
        recovery: 'Recovery',
        faq: 'Frequently asked questions',
        booking: 'Book a visit',
      },
      doctorLead: 'He operates on the hand and forearm alone, from hour-long procedures under local anaesthetic to microsurgical reconstruction in an emergency.',
      doctorLink: 'About the surgeon',
      conditionsIntro: 'Every condition has its own diagnostic protocol — musculoskeletal ultrasound, nerve conduction studies or MRI — settled before surgery is discussed.',
      proceduresIntro: 'Four stages, from the first consultation to going back to what you do. The times are averages for common procedures and are recalculated for each case.',
      proceduresLink: 'How we work, in detail',
      recoveryIntro: 'A tendon repair loses its result after three weeks of the wrong immobilisation, so the rehabilitation protocol is written alongside the operative plan, not after discharge.',
      recoveryLink: 'The rehabilitation programme',
      faqIntro: 'The answers below cover what people ask most often when they book. For your own situation, write to us or call.',
      bookingIntro: 'Leave your name and phone number and we will call you. We confirm the time within 4 working hours. For emergencies, call directly.',
    },

    blueprint: {
      statement: 'Pre-operative planning is done on imaging: X-ray in two views, dynamic ultrasound and, where needed, CT with reconstruction.',
      yieldLabel: 'From it come',
      yields: ['The approach', 'The size of the implant', 'The structures to avoid'],
      equipLabel: 'Equipment',
    },

    about: {
      metaTitle: 'The surgeon',
      metaDescription:
        'Consultant plastic surgeon, subspecialised in surgery of the hand. Training, fields of practice, memberships and clinic times.',
      title: 'A surgeon who operates on the hand alone',
      lead: 'He operates on the hand and forearm alone, from hour-long procedures under local anaesthetic to microsurgical reconstruction in an emergency.',
      body: [
        'A hand packs 27 bones, 34 muscles and three major nerves into an area the size of a phone. Hand surgery works at a different scale from the rest of surgery: finer instruments, optical magnification and a rehabilitation protocol set from day zero.',
        'The practice is deliberately limited to the hand and forearm. Concentrating that volume on one region means conditions a general surgeon sees rarely turn up here several times a month.',
      ],
      factsTitle: 'Training and expertise',
      equipmentAria: 'Equipment',
    },

    conditions: {
      metaTitle: 'Conditions we treat',
      metaDescription:
        "Carpal tunnel syndrome, Dupuytren's disease, trigger finger, fractures and dislocations, peripheral nerve injuries, arthritis, microsurgical emergencies and congenital hand differences.",
      title: 'The conditions we treat',
      lead: 'Every condition has its own diagnostic protocol — musculoskeletal ultrasound, nerve conduction studies or MRI — settled before surgery is discussed.',
      summaryTitle: 'At a glance',
    },

    procedures: {
      metaTitle: 'How we work',
      metaDescription:
        'Four stages: the consultation with ultrasound in the room, the treatment plan in writing, day-case surgery and guided rehabilitation.',
      title: 'From the first consultation to full function',
      lead: 'Four stages, with average times for common procedures. For your case the times are recalculated and go into the written plan.',
      blocks: [
        {
          h: 'What you get in writing',
          p: ['The treatment plan is not a verbal recommendation. It sets out the diagnosis, the available options — including those without surgery — the expected recovery time for each, and the total cost, with no sums appearing later.'],
        },
        {
          h: 'Anaesthesia',
          p: ['In more than 80% of cases we use a brachial plexus block or local anaesthesia: you are awake, you feel no pain, and you go home the same day. General anaesthesia is kept for long procedures and for children.'],
        },
        {
          h: 'After the procedure',
          p: ['You leave with the day-by-day mobilisation protocol, the prescription and the date of the first review. If anything comes up between reviews, you have a direct line to the team for 12 weeks.'],
        },
      ],
      asideTitle: 'Before your procedure',
      asideText: 'Preparation, the tests you need and what to stop from your current medication are set out on a separate page.',
      asideLink: 'Preparing for surgery',
    },

    recovery: {
      metaTitle: 'Recovery',
      metaDescription:
        'Hand therapy, splints thermoformed in the clinic, a day-by-day mobilisation protocol and reassessment at every stage.',
      title: 'Recovery is part of the operation',
      lead: 'A tendon repair loses its result after three weeks of the wrong immobilisation. That is why the protocol is written alongside the operative plan, not after discharge.',
      intro: [
        'At every review, flexion and extension are measured with a goniometer and compared against the target for that stage. If the range stalls at two reviews running, the protocol changes — we do not wait for it to sort itself out.',
        'Splints are remade as the swelling goes down. One that no longer fits ends up restricting the very movement it is supposed to protect.',
      ],
      blocks: [
        {
          h: 'The stages, by day',
          ul: [
            '**Days 0–3.** Swelling and pain under control, the hand held above heart level. Only what is prescribed is moved.',
            '**Days 3–21.** The critical window after tendon repair: early passive movement, in a splint, within the set range.',
            '**Weeks 3–6.** Active movement, with the range increased step by step. The strength of the repair is checked before each new stage.',
            '**Weeks 6–12.** Strength and endurance, and the return to the movements your work demands. Splints are worn at night only, if at all.',
          ],
        },
        {
          h: 'Who runs the rehabilitation',
          p: ['Physiotherapists trained in hand therapy, in the same clinic where the surgery was done. Surgeon and therapist see the same measurements, so the protocol is adjusted without you having to tell the story again.'],
        },
      ],
      asideTitle: 'What to bring to sessions',
      asideText: 'Your splint, the protocol you were given at discharge and, if you have one, the latest follow-up X-ray. Sessions last 30 to 45 minutes.',
      asideCta: 'Book a session',
    },

    faq: {
      metaTitle: 'Frequently asked questions',
      metaDescription:
        'Referrals, how long before you are back at work, the type of anaesthetic, scars, private insurance and emergencies.',
      title: 'What patients ask us',
      lead: 'The answers below cover what people ask most often when they book. For your own situation, write to us or call.',
      intro: 'Not finding your answer here? Write to us through the booking form or call {phone}.',
    },

    booking: {
      metaTitle: 'Book a visit',
      metaDescription:
        'Book a consultation: leave your name and phone number and we will call within 4 working hours. For emergencies the line is open around the clock.',
      title: 'Book a consultation',
      lead: 'Leave your name and phone number and we will call you. We confirm the time within 4 working hours. For emergencies, call directly.',
    },

    prices: {
      metaTitle: 'Fees',
      metaDescription:
        'How costs are set: the consultation, investigations, the procedure and rehabilitation sessions. The total goes into the treatment plan, in writing.',
      title: 'Fees',
      lead: 'The total cost of an operation depends on the procedure, the type of anaesthesia and the implant. You get it in writing, in the treatment plan, before you decide.',
      blocks: [
        {
          h: 'What a quoted cost covers',
          p: ['For surgery, the figure quoted covers the procedure itself, the anaesthesia, consumables, the implant where one is used, and the post-operative reviews in the package. No further sums appear for things that were known in advance.'],
        },
        {
          h: 'What is charged separately',
          ul: [
            'Investigations carried out elsewhere (MRI, CT, nerve conduction studies).',
            'Rehabilitation sessions, where they are not part of the surgical package.',
            'Additional splints, when the type changes during recovery.',
          ],
        },
        {
          h: 'Private insurance',
          p: ['We hold contracts with the main private insurers. Send your policy before the consultation and we will confirm cover within 24 working hours.'],
        },
        {
          h: 'State reimbursement',
          p: ['Certain procedures can be reimbursed through the national health insurance house (CAS), subject to a referral from your GP or from a specialist. We check whether that applies to you when you book.'],
        },
      ],
      asideTitle: 'Consultations and procedures',
      /* (placeholder) Real amounts to be filled in before launch. */
      table: [
        ['First consultation, with ultrasound in clinic', '— RON'],
        ['Second opinion, on existing records', '— RON'],
        ['Post-operative review', 'included in the surgical package'],
        ['Ultrasound-guided injection', '— RON'],
        ['Hand therapy session', '— RON'],
        ['Custom splint, made in the clinic', '— RON'],
      ],
      asideNote: 'For an exact estimate, call {phone}.',
    },

    prep: {
      metaTitle: 'Preparing for surgery',
      metaDescription:
        'Which tests you need, what medication stops before the procedure, how to dress and what to bring on the day.',
      title: 'Preparing for your procedure',
      lead: 'The instructions below apply to routine hand surgery. For your own case, you receive the final list together with the treatment plan.',
      blocks: [
        {
          h: 'Tests and investigations',
          p: ['For procedures under local anaesthetic, blood tests are usually not needed. For a brachial plexus block or a general anaesthetic we ask for routine blood tests, valid for 30 days, and a pre-anaesthetic review.'],
        },
        {
          h: 'Medication that stops',
          ul: [
            'Anticoagulants and antiplatelet drugs stop only on the advice of the doctor who prescribed them. Do not stop them yourself.',
            'Anti-inflammatories stop 5 days beforehand, unless you have been told otherwise.',
            'Supplements with an anticoagulant effect, ginger and ginkgo extract among them, stop a week beforehand.',
            'Smoking slows wound healing; ideally stop two weeks beforehand and for as long as the wound is healing.',
          ],
        },
        {
          h: 'On the day',
          ul: [
            'For a general anaesthetic or sedation: nothing to eat or drink for 6 hours beforehand.',
            'Wear loose clothing with wide sleeves that will roll up over a splint.',
            'Take rings and bracelets off the hand being operated on. If a ring will not come off, tell us in advance.',
            'No nail polish and no false nails on that hand: the colour of the nail bed is a circulation check.',
            'Bring someone with you if you are having a block or sedation. You cannot drive that day.',
          ],
        },
        {
          h: 'What to bring',
          ul: [
            'ID, your health card and your insurance policy, if you have one.',
            'Previous imaging: X-rays, CT, MRI, on paper or on disc.',
            'A list of your current medication, with doses.',
          ],
        },
        {
          h: 'After discharge',
          p: ['You leave with the day-by-day mobilisation protocol, the prescription and the date of the first review. For anything that comes up in between — pain that is increasing, a fever, a soaked dressing — call {phone}.'],
        },
      ],
      asideTitle: 'At a glance',
      asideFacts: [
        ['Fasting', '6 hours, only for sedation or general anaesthesia'],
        ['Someone with you', 'Needed for a plexus block and for sedation'],
        ['Jewellery', 'Off the hand being operated on'],
        ['Driving', 'Not on the day of surgery'],
      ],
    },

    legalLead: 'An indicative document, to be reviewed by a lawyer before launch. (placeholder)',

    privacy: {
      metaTitle: 'Privacy policy',
      metaDescription: 'What data the site collects, why, how long we keep it and who we share it with.',
      title: 'Privacy policy',
      blocks: [
        {
          h: 'Who we are',
          p: ['{legal}, company registration {cui}, registered at {address}, is the controller of the data collected through this site. You can reach us at {email} or on {phone}.'],
        },
        {
          h: 'What we collect',
          p: ['The site collects only what you enter in the booking form: name, phone number, email address (optional), type of appointment, preferred date and a short description of the problem. We use no tracking forms and we do not ask for detailed medical information through the site.'],
        },
        {
          h: 'Why',
          p: ['The data is used solely to contact you and arrange the appointment. The legal basis is the step taken at your request before entering into a contract for medical services. We do not use it for marketing and we do not send commercial messages without your separate consent.'],
        },
        {
          h: 'How long we keep it',
          p: ['Messages received through the form stay in the clinic mailbox for as long as the booking requires and, if you become a patient, they join your medical record, with the retention periods the law sets for medical documents. Requests that do not lead to an appointment are deleted within 12 months at most.'],
        },
        {
          h: 'Who we share it with',
          p: ['The data is not sold and is not passed on for commercial purposes. It may be accessed by our hosting provider and our email provider, acting as processors, strictly so that the service can run.'],
        },
        {
          h: 'Your rights',
          p: ['You have the right of access, rectification, erasure, restriction, objection and portability. You can exercise them by writing to {email}. If our answer does not satisfy you, you may complain to the Romanian National Supervisory Authority for Personal Data Processing.'],
        },
        {
          h: 'Security',
          p: ['The site runs over HTTPS, and the form has protections against automated submissions and limits the number of submissions from the same IP address. Access to the clinic mailbox is restricted to the staff who handle bookings.'],
        },
      ],
    },

    gdpr: {
      metaTitle: 'Data processing (GDPR)',
      metaDescription: 'The legal basis for processing, the rights of the data subject and how to exercise them.',
      title: 'Processing of personal data',
      blocks: [
        {
          h: 'The controller',
          p: ['{legal}, company registration {cui}, {address}. Contact for any request concerning data: {email}.'],
        },
        {
          h: 'Categories of data',
          ul: [
            'Identification and contact details: name, phone number, email.',
            'Booking details: type of consultation, preferred date, a short description of the problem.',
            'Medical data, collected in the consulting room rather than through the site, processed for diagnosis and treatment.',
          ],
        },
        {
          h: 'Legal basis',
          ul: [
            'Steps taken at your request before entering into a contract for medical services, for the data in the form.',
            'The provision and management of health services, for medical data.',
            'Legal obligations, for the retention of medical records and for invoicing.',
          ],
        },
        {
          h: 'Your rights',
          ul: [
            'Access to the data processed and to information about the processing.',
            'Rectification of inaccurate data and completion of incomplete data.',
            'Erasure, within the limits of the legal obligation to retain medical records.',
            'Restriction of processing, and objection.',
            'Portability of the data you provided.',
            'A complaint to the Romanian National Supervisory Authority for Personal Data Processing.',
          ],
        },
        {
          h: 'Time to respond',
          p: ['We answer requests within 30 days of receipt at the latest. Where a request is complex the period may be extended, and you are told of the extension with the reasons for it.'],
        },
        {
          h: 'Transfers',
          p: ['The data is hosted on servers within the European Union. We make no transfers to third countries.'],
        },
      ],
    },

    terms: {
      metaTitle: 'Terms and conditions',
      metaDescription:
        'Conditions for using the site, bookings, cancellation and the limits of the medical information published here.',
      title: 'Terms and conditions',
      blocks: [
        { h: 'Who runs this site', p: ['{legal}, company registration {cui}, {address}.'] },
        {
          h: 'The medical information on this site',
          p: ['The texts published here are for information and describe typical situations. They do not replace a consultation and do not constitute a diagnosis or a treatment recommendation for your case. Any treatment decision is taken after examination.'],
        },
        {
          h: 'Bookings',
          ul: [
            'The form sends a request for an appointment, not a confirmed appointment.',
            'Confirmation is made by phone, within 4 working hours.',
            'If you cannot come, let us know at least 24 hours in advance so the slot can go to another patient.',
          ],
        },
        {
          h: 'Emergencies',
          p: ['The form is not an emergency channel. For traumatic amputations and acute injuries, call {phone} directly.'],
        },
        {
          h: 'Copyright',
          p: ['The texts, images and visual identity belong to the operator and may not be reproduced without written agreement.'],
        },
        {
          h: 'Changes',
          p: ['These terms may be updated. The version that applies is the one published on the site at the time of use.'],
        },
      ],
    },

    cookies: {
      metaTitle: 'Cookies',
      metaDescription: 'Which cookies the site uses and how you can control them.',
      title: 'Cookie policy',
      blocks: [
        {
          h: 'What the site uses today',
          p: ['As published, the site uses no analytics or advertising cookies and loads no third-party scripts. The fonts are hosted locally and the images are served from the same domain, so simply visiting the pages sends no data to other servers.'],
        },
        {
          h: 'Technical cookies',
          p: ['The server may use strictly necessary cookies, for security and to limit repeated submissions from the form. These do not track behaviour and do not build profiles.'],
        },
        {
          h: 'If traffic analytics are added',
          p: ['The moment an analytics tool is added, this page is updated with the provider’s name, the purpose, the lifetime of the cookies and how to withdraw consent, and a banner appears on the site blocking the scripts until they are accepted.'],
        },
        {
          h: 'Control from your browser',
          p: ['You can delete or block cookies in your browser settings. Blocking the strictly necessary ones may stop the booking form working.'],
        },
        { h: 'Contact', p: ['Questions about this page: {email}.'] },
      ],
    },

    notFound: {
      metaTitle: 'Page not found',
      title: 'Page not found',
      lead: 'The link is wrong or the page has moved. Below are the places people look for most.',
      links: ['conditions', 'procedures', 'recovery', 'faq', 'booking'],
      emergency: 'If this is an emergency, call {phone} directly.',
      otherLang: { line: 'Pagina nu a fost găsită.', cta: 'Mergi la site-ul în română' },
    },
  },
};
