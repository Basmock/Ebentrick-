import {
  ServiceItem,
  TrainingCourse,
  ServiceBooking,
  TrainingEnrollment,
  Inquiry,
  EmailNotification,
  AdminUser,
  ProjectCaseStudy,
  TestimonialItem,
  ProjectVideo
} from '../types';

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-home-automation',
    name: 'Home Automation (Smart Home)',
    slug: 'home-automation',
    category: 'smart-living',
    tagline: 'Intelligent, voice & mobile orchestration of lighting, climate, entertainment, and motorized shades.',
    description: 'Turnkey architectural home automation providing unified wireless and wired control across your residence. Includes custom scenario scenes (Morning, Away, Cinema, Night), presence-detection illumination, multi-zone HVAC synchronization, and enterprise-grade local hub integration that runs reliably even without external internet.',
    specifications: [
      'Zigbee 3.0 / Matter / KNX protocol interoperability',
      'Zero-latency local processing bridge & touch screen panels',
      'Siri, Alexa, and Google Assistant synchronized voice endpoints',
      'Automated motorized curtain & blind scheduling',
      'Ambient multi-zone acoustic and illumination triggers'
    ],
    keyFeatures: [
      'Centralized 10-inch In-Wall Smart Dashboards',
      'Geo-fencing arrival & departure triggers',
      'Energy monitoring for every sub-circuit and smart plug',
      'Local offline fallback architecture'
    ],
    hardwareBrands: ['Lutron', 'Control4', 'Sonoff Pro', 'Fibaro', 'Tuya Zigbee Enterprise'],
    basePriceEstimate: 1850000,
    currency: 'NGN',
    completionTimeline: '3 - 7 Days',
    hasTrainingCourse: true,
    trainingCourseId: 'trn-smart-home-mastery',
    iconName: 'Home',
    badge: 'Flagship Service'
  },
  {
    id: 'srv-electrical-works',
    name: 'Electrical Works & Industrial Wiring',
    slug: 'electrical-works',
    category: 'power-energy',
    tagline: 'Certified high-capacity conduit wiring, load calculation, distribution panels, and power stabilization.',
    description: 'Heavy-duty industrial and residential electrical installations compliant with international safety codes (IEE / IEC). From blueprint conduit piping and main distribution boards (MDB/DB) to surge protection, lightning arrestors, and deep-ground copper earth rod installations ensuring total surge immunity.',
    specifications: [
      'Full load balancing across 3-phase commercial supplies',
      'Industrial busbar trunking & cable ladder containment',
      'Schneider / ABB circuit breakers & RCD earth leakage protection',
      'Deep chemical earth pit grounding (< 2 Ohms resistance)',
      'Transient Voltage Surge Suppressors (TVSS) Type 1 & 2'
    ],
    keyFeatures: [
      'Single & 3-Phase certified load design',
      'Cable identification color coding & CAD documentation',
      'Thermal imaging load inspection report included',
      'Commercial grade fire-retardant conduit'
    ],
    hardwareBrands: ['Schneider Electric', 'ABB', 'Havells', 'Legrand', 'Siemens'],
    basePriceEstimate: 950000,
    currency: 'NGN',
    completionTimeline: '2 - 10 Days',
    hasTrainingCourse: true,
    trainingCourseId: 'trn-electrical-engineering',
    iconName: 'Zap',
    badge: 'Core Infrastructure'
  },
  {
    id: 'srv-automatic-change-over',
    name: 'Automatic Change Over (ATS)',
    slug: 'automatic-change-over',
    category: 'power-energy',
    tagline: 'Zero-downtime automatic mains-to-generator and solar power switching mechanisms.',
    description: 'Ebentrick solid-state and motorized Automatic Transfer Switch (ATS) systems eliminate blackout delays. Our custom-engineered ATS modules sense grid outages within milliseconds, signal your standby generator to crank, stabilize the voltage, and transfer loads without risking back-feeding or phase collisions.',
    specifications: [
      'Phase failure, under/over-voltage, and reverse-phase protection',
      'Microprocessor controller with LCD voltage/frequency readout',
      'Motorized changeover mechanism with mechanical interlocking',
      'Automated generator warm-up & cool-down cycle management',
      'Manual bypass switch for zero-service disruption'
    ],
    keyFeatures: [
      'Transfer time as low as 15ms with synchronization',
      'Programmable generator auto-start/auto-stop signal relays',
      'Heavy-duty copper contactors rated up to 1250A',
      'Smart mobile notification alerts on power switchover'
    ],
    hardwareBrands: ['Socomec', 'ABB', 'DeepSea Electronics', 'Chint Electric', 'Ebentrick Custom ATS'],
    basePriceEstimate: 650000,
    currency: 'NGN',
    completionTimeline: '1 - 2 Days',
    hasTrainingCourse: true,
    trainingCourseId: 'trn-ats-generator-automation',
    iconName: 'RefreshCw',
    badge: 'High Demand'
  },
  {
    id: 'srv-solar-inverter-system',
    name: 'Solar & Inverter Systems',
    slug: 'solar-inverter-systems',
    category: 'power-energy',
    tagline: 'High-yield tier-1 monocrystalline panels, hybrid MPPT inverters, and LiFePO4 energy storage.',
    description: 'Engineered renewable energy setups providing 24/7 silent uninterrupted power. We design bespoke systems ranging from 3kVA residential backups to 50kVA+ commercial microgrids, utilizing tier-1 bifacial solar arrays, smart hybrid inverters, and long-life Lithium Iron Phosphate (LiFePO4) rack-mounted battery banks.',
    specifications: [
      'Monocrystalline Tier-1 Bifacial Solar Panels (550W - 650W)',
      'Pure Sine Wave MPPT Hybrid Inverters with 98% efficiency',
      'Grade-A Lithium LiFePO4 Batteries (6,000+ deep cycles)',
      'Cloud telemetry Wi-Fi monitoring app for load & generation',
      'Galvanized aluminum roof racking with lightning protection'
    ],
    keyFeatures: [
      'Zero-break UPS capability (computers & surgical gear stay on)',
      '10-Year battery lifespan performance warranty',
      'Bespoke load audit calculation before installation',
      'Payback ROI analysis included with every quote'
    ],
    hardwareBrands: ['Victron Energy', 'Deye', 'Growatt', 'Felicity Solar', 'Pylontech', 'Longi Solar'],
    basePriceEstimate: 3800000,
    currency: 'NGN',
    completionTimeline: '2 - 5 Days',
    hasTrainingCourse: true,
    trainingCourseId: 'trn-solar-pv-engineering',
    iconName: 'Sun',
    badge: 'Popular'
  },
  {
    id: 'srv-smart-gate',
    name: 'Smart Gate Automation',
    slug: 'smart-gate-automation',
    category: 'security-access',
    tagline: 'Heavy-duty motorized sliding & swing gate automation with remote, GSM, and biometric control.',
    description: 'Convert any residential or commercial gate into an automated access portal. Featuring robust Italian-grade electro-mechanical rack-and-pinion actuators, anti-crush infrared safety beams, battery backups during power failure, and smartphone access opening gates from anywhere in the world.',
    specifications: [
      'Sliding gate motors rated from 600kg to 2,500kg industrial duty',
      'Heavy-duty swing arm linear actuators with hydraulic damping',
      'Rolling-code UHF remotes with 100m range immunity to code grabbing',
      'GSM cellular SIM interface & RFID proximity windshield tag reader',
      'Dual active infrared anti-crush photocell sensors'
    ],
    keyFeatures: [
      'Manual key release mechanism for emergency override',
      'Pedestrian pass opening mode for foot traffic',
      'Solar battery backup compatibility',
      'Integration with perimeter electric fence and intercom'
    ],
    hardwareBrands: ['Centurion Systems', 'BFT Italy', 'Nice Automation', 'FAAC', 'Sommer'],
    basePriceEstimate: 890000,
    currency: 'NGN',
    completionTimeline: '1 - 3 Days',
    hasTrainingCourse: true,
    trainingCourseId: 'trn-gate-perimeter-automation',
    iconName: 'Shield',
    badge: 'Safety Essential'
  },
  {
    id: 'srv-electric-fence',
    name: 'Electric Fence & Perimeter Security',
    slug: 'electric-fence',
    category: 'security-access',
    tagline: 'High-voltage non-lethal deterrent energizers with multi-zone alarm notification.',
    description: 'Uncompromising physical boundary defense. We deploy high-tensile 316 stainless steel wires mounted on UV-stabilized heavy-duty bobbins and square posts, energized by high-performance pulsed energizers (up to 9,900V) that deter intruders, trigger flashing strobe sirens upon tamper/cut, and interface directly with smart CCTV cameras.',
    specifications: [
      'Pulsed 8kV - 10kV high-voltage energizers (IEC 60335-2-76 compliant)',
      'Multi-zone perimeter segmentation with digital keypad readout',
      'Cut, short-circuit, and tamper detection with instant relay output',
      'Internal 7Ah battery backup sustaining 48 hours without grid power',
      'Nemtek ceramic insulators and hot-dip galvanized wall-top brackets'
    ],
    keyFeatures: [
      'Silent armed mode or high-decibel audible perimeter sirens',
      'Direct tie-in to central monitoring station and GSM SMS alerts',
      'Compliant warning signage and lightning diverters installed',
      'Earth loop monitoring preventing bypass jumps'
    ],
    hardwareBrands: ['Nemtek', 'JVA Security', 'Gallagher', 'Stafix', 'Cheetah'],
    basePriceEstimate: 750000,
    currency: 'NGN',
    completionTimeline: '1 - 3 Days',
    hasTrainingCourse: true,
    trainingCourseId: 'trn-electric-fence-tech',
    iconName: 'ShieldAlert',
    badge: 'Defense Grade'
  },
  {
    id: 'srv-home-cinema',
    name: 'Home Cinema & Acoustic Engineering',
    slug: 'home-cinema',
    category: 'smart-living',
    tagline: 'Bespoke 4K laser projection, Dolby Atmos acoustic spatial audio, and fiber-optic starlight ceilings.',
    description: 'Immersive cinematic private theaters tailored down to the decibel. We engineer the complete room experience: acoustic bass traps and sound-absorbing fabric paneling, 4K HDR ultra-short throw or ceiling projectors, motorized acoustically transparent screens, Dolby Atmos 7.2.4 surround sound staging, and fiber-optic twinkle starlight ceilings.',
    specifications: [
      'Dolby Atmos 7.1.2 to 9.4.6 spatial sound configuration',
      'High-gain 120" to 180" acoustically transparent fixed projection screens',
      'Laser phosphor 4K HDR projectors with 3,000+ ANSI lumens',
      'Custom CNC acoustic diffusers & NRC 0.85 fabric sound dampening',
      'Fiber-optic shooting star ceiling panels with RGBW galaxy wash'
    ],
    keyFeatures: [
      'One-touch "Movie Time" automation (lights dim, screen drops, audio starts)',
      'Concealed architectural in-wall and in-ceiling audiophile speakers',
      'Motorized leather reclining luxury cinema chairs with cup warmers',
      'Precision room acoustic calibration via Dirac Live DSP'
    ],
    hardwareBrands: ['Denon', 'Marantz', 'Klipsch', 'Sony 4K', 'Optoma', 'SVS Subwoofers'],
    basePriceEstimate: 3200000,
    currency: 'NGN',
    completionTimeline: '5 - 14 Days',
    hasTrainingCourse: true,
    trainingCourseId: 'trn-home-cinema-acoustics',
    iconName: 'Film',
    badge: 'Luxury Living'
  },
  {
    id: 'srv-ip-pabx',
    name: 'IP-PABX & Telecom Systems',
    slug: 'ip-pabx-telecom',
    category: 'enterprise-telecom',
    tagline: 'Enterprise VoIP phone networks, IVR auto-attendants, SIP trunking, and call center recording.',
    description: 'Unified corporate and hospitality telecommunications. Deploy modern IP-PBX appliances supporting hundreds of internal extensions, interactive voice response (IVR) digital receptionists, call recording, video desk phones, smartphone softphone roaming, and seamless intercom between executive suites, gates, and departments.',
    specifications: [
      'SIP protocol supporting up to 500 concurrent calls and 2,000 users',
      'Multi-level Interactive Voice Response (IVR) auto-attendant',
      'Automated call recording with searchable secure web archiving',
      'PoE Gigabit IP phones with high-definition Opus audio codec',
      'Intercom integration with gate stations and video doorbells'
    ],
    keyFeatures: [
      'Zero monthly subscription with local server deployment',
      'Mobile app softphone lets staff take office calls from anywhere',
      'Voicemail-to-Email audio forwarding',
      'Seamless multi-branch site-to-site SIP trunk interconnect'
    ],
    hardwareBrands: ['Grandstream', 'Yeastar', 'Yealink', 'Fanvil', 'Cisco VoIP'],
    basePriceEstimate: 920000,
    currency: 'NGN',
    completionTimeline: '2 - 4 Days',
    hasTrainingCourse: true,
    trainingCourseId: 'trn-ip-pabx-voip-systems',
    iconName: 'PhoneCall',
    badge: 'Business Essential'
  },
  {
    id: 'srv-customized-electronics',
    name: 'Customized Electronics Solutions & Products',
    slug: 'custom-electronics',
    category: 'electronics-design',
    tagline: 'Custom PCB design, microcontroller firmware, IoT sensor telemetry, and specialty electronics fabrication.',
    description: 'Tailor-made electronic hardware engineered for unique industrial, commercial, and research needs. Our electronics laboratory designs printed circuit boards (PCBs), programs embedded firmware (ESP32, STM32, PIC, ARM), builds custom relay controllers, automated pump controllers, and IoT remote monitoring gadgets for agriculture and industry.',
    specifications: [
      'Custom schematic capture and multi-layer PCB layout design',
      'Embedded C/C++, FreeRTOS, and MicroPython firmware development',
      'LoRaWAN, 4G LTE-M, and Wi-Fi industrial sensor telemetry',
      'Custom enclosure 3D prototyping and CNC aluminum milling',
      'Strict ESD protection, voltage clamping, and thermal stress testing'
    ],
    keyFeatures: [
      'Rapid prototype development from napkin sketch to working device',
      'Automated water level/pump management systems',
      'Custom industrial timer controllers & motor soft-starters',
      'Telemetry dashboards for remote telemetry'
    ],
    hardwareBrands: ['Espressif', 'Texas Instruments', 'STMicroelectronics', 'Microchip', 'Ebentrick Lab'],
    basePriceEstimate: 650000,
    currency: 'NGN',
    completionTimeline: '3 - 14 Days',
    hasTrainingCourse: true,
    trainingCourseId: 'trn-embedded-electronics',
    iconName: 'Cpu',
    badge: 'Innovation Lab'
  },
  {
    id: 'srv-digital-signage',
    name: 'Digital Signage & Video Walls',
    slug: 'digital-signage',
    category: 'enterprise-telecom',
    tagline: 'Ultra-bright commercial displays, menu boards, and cloud-managed synchronous video walls.',
    description: 'Dynamic digital presentation solutions for corporations, retail malls, churches, banking halls, and luxury lounges. High-nit commercial displays rated for 24/7 continuous operation, ultra-narrow bezel multi-screen video walls, interactive touchscreen kiosks, and intuitive centralized cloud content scheduling.',
    specifications: [
      'High-brightness 500 to 2500 nits panels for indoor & direct sunlight visibility',
      'Ultra-narrow 0.88mm - 1.8mm video wall bezel seams',
      'Hardware 4K HDR matrix video wall scalers & HDMI splitters',
      'Cloud CMS for scheduled media playlists and live ticker feeds',
      'Commercial grade anti-glare tempered glass protection'
    ],
    keyFeatures: [
      'Remote media update from any laptop or mobile phone in seconds',
      'Scheduled power-on and power-off to conserve panel longevity',
      'Horizontal and portrait mounting orientations supported',
      'Integrated soundbar and directional audio speakers'
    ],
    hardwareBrands: ['LG Commercial', 'Samsung MagicINFO', 'Hikvision Commercial', 'ViewSonic', 'Philips Signage'],
    basePriceEstimate: 1150000,
    currency: 'NGN',
    completionTimeline: '2 - 5 Days',
    hasTrainingCourse: true,
    trainingCourseId: 'trn-digital-signage-display',
    iconName: 'Tv',
    badge: 'High Impact'
  },
  {
    id: 'srv-digital-securities',
    name: 'Digital Securities & AI Surveillance (CCTV)',
    slug: 'digital-securities-cctv',
    category: 'security-access',
    tagline: 'High-definition 4K optical & thermal cameras with AI facial recognition and perimeter intrusion detection.',
    description: 'Intelligent visual intelligence safeguarding people and assets. We install enterprise IP surveillance networks utilizing optical zoom PTZ cameras, full-color night vision (ColorVu), license plate recognition (LPR), thermal body scanning, and AI analytics that distinguish humans and vehicles from false alarms.',
    specifications: [
      '4K 8MP Ultra-HD Starlight low-light & ColorVu night vision',
      'Smart AI human, vehicle, and line-crossing intrusion detection',
      'Deep learning Network Video Recorders (NVR) with RAID storage',
      'Encrypted remote streaming to iPhone, Android, and Central Control Room',
      'Audio 2-way talkback and flashing blue/red active deterrence strobes'
    ],
    keyFeatures: [
      'Continuous 30 - 90 day video retention on surveillance-grade HDDs',
      'AI Smart Search: Find specific persons or car colors in seconds',
      'Tamper-proof vandal resistant IK10 dome housings',
      'Fiber optic backhaul for large estates and campuses'
    ],
    hardwareBrands: ['Hikvision AcuSense', 'Dahua TiOC', 'Axis Communications', 'Uniview', 'Western Digital Purple'],
    basePriceEstimate: 780000,
    currency: 'NGN',
    completionTimeline: '1 - 4 Days',
    hasTrainingCourse: true,
    trainingCourseId: 'trn-ip-cctv-ai-security',
    iconName: 'Camera',
    badge: 'Critical Defense'
  },
  {
    id: 'srv-hotels-door-locks',
    name: 'Hotels Door Locks & Keyless Management',
    slug: 'hotel-smart-locks',
    category: 'security-access',
    tagline: 'Smart RFID & Bluetooth hotel door locks with reception PMS software and energy-saving switches.',
    description: 'Turnkey keycard and mobile access management for hotels, resorts, luxury short-lets, and corporate guest houses. Features contactless encrypted Mifare RFID cards, temporary time-limited guest PIN codes, BLE smartphone mobile keys, audit-trail log tracking, and in-room energy-saving power card switches.',
    specifications: [
      'Contactless 13.56MHz Mifare RFID and Bluetooth Low Energy 5.0',
      'Full audit trail recording the last 500 unlock events',
      'Anti-panic mortise: latch and deadbolt retract with single handle press',
      'Solid 304 stainless steel or aerospace zinc alloy construction',
      'Hotel PMS software integration for check-in / check-out key issuance'
    ],
    keyFeatures: [
      'Stand-alone battery operation (12-18 months on 4x AA batteries)',
      'Hidden mechanical key cylinder for emergency master override',
      'Energy-saver in-room card slots that cut AC & lighting when guest leaves',
      'Master keys for housekeeping, floor managers, and general manager'
    ],
    hardwareBrands: ['Orbita', 'Be-Tech', 'Kaba Ilco', 'Vingcard Assa Abloy', 'Ebentrick Hospitality Line'],
    basePriceEstimate: 1450000,
    currency: 'NGN',
    completionTimeline: '1 - 5 Days',
    hasTrainingCourse: true,
    trainingCourseId: 'trn-hotel-locks-access',
    iconName: 'Key',
    badge: 'Hospitality Tech'
  },
  {
    id: 'srv-smart-furniture',
    name: 'Smart Furnitures & Motorized Interiors',
    slug: 'smart-furniture',
    category: 'smart-living',
    tagline: 'Motorized pop-up TV lifts, ergonomic sit-stand executive desks, and hidden biometric compartments.',
    description: 'Fusing bespoke craftsmanship with robotics. We design and install mechanized furniture elements including whisper-quiet motorized TV lift consoles, biometric hidden firearm and jewelry safes, smart touch-sensor kitchen cabinets, integrated wireless charging furniture surfaces, and multi-motor executive height-adjustable desks.',
    specifications: [
      'Whisper-quiet dual linear actuators with anti-collision gyro sensors',
      'Wireless remote, push-button, and voice automation integration',
      'Qi 15W fast wireless chargers embedded flush beneath solid wood/marble',
      'Semiconductor biometric fingerprint modules with 0.3s unlock speed',
      'Heavy-duty load capacity: up to 120kg smooth lift'
    ],
    keyFeatures: [
      'Seamless concealment of electronics into luxury interior woodwork',
      'Custom bespoke dimensions tailored to client architectural plans',
      'Integrated soft ambient LED under-glow lighting',
      'Memory presets for desk height and TV lift viewing angles'
    ],
    hardwareBrands: ['Linak Actuators', 'Progressive Automations', 'Hafele', 'Blum', 'Ebentrick Artisans'],
    basePriceEstimate: 1100000,
    currency: 'NGN',
    completionTimeline: '4 - 10 Days',
    hasTrainingCourse: true,
    trainingCourseId: 'trn-smart-furniture-mechatronics',
    iconName: 'Layers',
    badge: 'Bespoke Luxury'
  },
  {
    id: 'srv-access-controls',
    name: 'Access Controls & Biometric Systems',
    slug: 'access-controls',
    category: 'security-access',
    tagline: 'Facial recognition terminals, optical turnstiles, electromagnetic locks, and time & attendance software.',
    description: 'Absolute security control over who enters and when. From corporate headquarters to sensitive server rooms, we implement biometric fingerprint and 3D facial recognition terminals, heavy-duty 600lbs electromagnetic door locks, emergency glass breaks, optical flap turnstiles, and cloud software for employee time and payroll attendance.',
    specifications: [
      'AI 3D Deep Learning Facial Recognition (0.2s speed, live fake detection)',
      'Heavy-duty 600lbs to 1200lbs electromagnetic locks with status sensors',
      'Full-height and optical waist-height pedestrian tripod/flap turnstiles',
      'Wiegand & OSDP secure encrypted controller protocols',
      'Comprehensive software reporting: attendance, overtime, unauthorized attempts'
    ],
    keyFeatures: [
      'Touchless high-speed entry even when wearing masks',
      'Anti-passback rules preventing badge sharing',
      'Emergency fire alarm linkage automatically unlocks all emergency exits',
      'Visitor badge print station with barcode/QR code scanners'
    ],
    hardwareBrands: ['ZKTeco', 'Suprema', 'Hikvision Access', 'Anviz', 'CDVI'],
    basePriceEstimate: 700000,
    currency: 'NGN',
    completionTimeline: '1 - 3 Days',
    hasTrainingCourse: true,
    trainingCourseId: 'trn-biometric-access-control',
    iconName: 'Fingerprint',
    badge: 'Enterprise Security'
  }
];

export const INITIAL_TRAINING_COURSES: TrainingCourse[] = [
  {
    id: 'trn-smart-home-mastery',
    title: 'Certified Smart Home Automation Specialist (CSHAS)',
    code: 'EBT-TRN-101',
    category: 'smart-living',
    level: 'Intermediate / Field Tech',
    durationWeeks: 4,
    hoursPerWeek: 12,
    tuitionFee: 350000,
    syllabus: [
      {
        week: 1,
        moduleTitle: 'Protocols & Architecture',
        description: 'Deep dive into Zigbee 3.0, Z-Wave, Matter, and Wi-Fi IoT protocols. RF interference planning and mesh topology.',
        handsOnLab: 'Flashing custom coordinators, pairing Zigbee routers, and building mesh range maps.'
      },
      {
        week: 2,
        moduleTitle: 'Wiring & Smart Relays',
        description: 'Single-phase neutral vs no-neutral switch wiring, multi-gang relay modules, and micro-dimmer installation.',
        handsOnLab: 'Live wiring board bench tests: 2-way and intermediate switching with smart actuator modules.'
      },
      {
        week: 3,
        moduleTitle: 'Hubs, Scenes & Sensor Automation',
        description: 'Local server configuration, presence millimeter-wave sensors, Lux sensors, and climate thermostat integration.',
        handsOnLab: 'Programming complex automation scenes (Away mode, Night curfew, Cinema ambient dimming).'
      },
      {
        week: 4,
        moduleTitle: 'Commissioning, Client Handoff & Troubleshooting',
        description: 'Mobile app deployment, voice assistant account linking, network isolation (VLANs), and handover documentation.',
        handsOnLab: 'Mock customer home commissioning exam with timed troubleshooting faults.'
      }
    ],
    prerequisites: ['Basic electrical safety understanding', 'Familiarity with smartphones & Wi-Fi routers'],
    certificationAwarded: 'Ebentrick Certified Smart Home Automation Specialist (EC-SHAS)',
    hardwareProvided: ['Zigbee 3.0 Hub kit', '3x Smart in-wall switches', '1x mmWave radar sensor', 'Official Toolkit & Multimeter'],
    nextCohorts: [
      {
        id: 'coh-sh-2026-01',
        startDate: 'October 5, 2026',
        endDate: 'October 30, 2026',
        format: 'In-Person Hands-on Lab',
        maxSeats: 16,
        enrolledSeats: 12,
        instructor: 'Engr. Gabriel Adebayo',
        status: 'filling_fast'
      },
      {
        id: 'coh-sh-2026-02',
        startDate: 'November 9, 2026',
        endDate: 'December 4, 2026',
        format: 'Hybrid (Theory Online + Lab)',
        maxSeats: 20,
        enrolledSeats: 6,
        instructor: 'Engr. Gabriel Adebayo',
        status: 'open'
      }
    ],
    instructorName: 'Engr. Gabriel Adebayo',
    instructorRole: 'Head of Automation Engineering'
  },
  {
    id: 'trn-solar-pv-engineering',
    title: 'Professional Solar PV & Lithium Energy Storage Engineering',
    code: 'EBT-TRN-201',
    category: 'power-energy',
    level: 'Advanced / Lead Engineer',
    durationWeeks: 6,
    hoursPerWeek: 15,
    tuitionFee: 450000,
    syllabus: [
      {
        week: 1,
        moduleTitle: 'Solar Resource & Sizing Calculations',
        description: 'Peak sun hours, azimuth, panel tilt, total daily load auditing (kWh), surge calculations, and battery sizing.',
        handsOnLab: 'Real-world site load audit report calculation using clamp meters and data loggers.'
      },
      {
        week: 2,
        moduleTitle: 'PV Panels & Rooftop Mechanical Mounting',
        description: 'Monocrystalline vs bifacial, series/parallel string voltage (Voc/Vmp), clamping, and roof waterproofing.',
        handsOnLab: 'Mounting solar rails, flashings, and assembling a 6-panel string on our test training roof rig.'
      },
      {
        week: 3,
        moduleTitle: 'Hybrid Inverters & MPPT Charge Controllers',
        description: 'Pure sine wave inverter topology, high-voltage MPPT tracking, grid feedback, and generator sync.',
        handsOnLab: 'Configuring Growatt and Deye hybrid inverters: programming charging curves and export limits.'
      },
      {
        week: 4,
        moduleTitle: 'Lithium Battery Banks (LiFePO4) & BMS Interfacing',
        description: 'Lithium cell chemistry, Battery Management Systems (BMS), CAN-bus and RS485 communication protocols.',
        handsOnLab: 'Wiring server-rack LiFePO4 batteries in parallel and configuring closed-loop BMS communication with inverter.'
      },
      {
        week: 5,
        moduleTitle: 'DC/AC Protection, Earthing & Lightning Defense',
        description: 'DC fuses, DC isolators, Class II DC surge arrestors, AC changeover breakers, and deep earth pit rod testing.',
        handsOnLab: 'Assembling a complete DC combiner box and measuring earth resistance with a megohmmeter.'
      },
      {
        week: 6,
        moduleTitle: 'Testing, Commissioning & Maintenance',
        description: 'IV curve tracing, thermal camera inspection for hot spots, battery capacity discharge testing, and handover.',
        handsOnLab: 'Live 5kVA system commissioning test under actual residential loads.'
      }
    ],
    prerequisites: ['Basic electrical background or completion of EBT-TRN-100 Electrical Foundations'],
    certificationAwarded: 'Ebentrick Certified Solar Energy Engineer (EC-SEE)',
    hardwareProvided: ['Solar technician manual', 'MC4 crimping kit', 'Digital clamp multimeter', 'Safety harness certificate'],
    nextCohorts: [
      {
        id: 'coh-sol-2026-01',
        startDate: 'October 12, 2026',
        endDate: 'November 20, 2026',
        format: 'In-Person Hands-on Lab',
        maxSeats: 18,
        enrolledSeats: 15,
        instructor: 'Engr. David Okon',
        status: 'filling_fast'
      },
      {
        id: 'coh-sol-2026-02',
        startDate: 'December 1, 2026',
        endDate: 'January 15, 2027',
        format: 'Weekend Executive',
        maxSeats: 15,
        enrolledSeats: 4,
        instructor: 'Engr. David Okon',
        status: 'open'
      }
    ],
    instructorName: 'Engr. David Okon',
    instructorRole: 'Lead Renewable Power Systems Architect'
  },
  {
    id: 'trn-ats-generator-automation',
    title: 'Automatic Change Over (ATS) & Generator Control Tech',
    code: 'EBT-TRN-202',
    category: 'power-energy',
    level: 'Intermediate / Field Tech',
    durationWeeks: 3,
    hoursPerWeek: 12,
    tuitionFee: 280000,
    syllabus: [
      {
        week: 1,
        moduleTitle: 'Contactors, Motorized Switches & Interlocks',
        description: 'Mechanical vs electrical interlocks, heavy-duty contactors, timer relays, and phase sequence relays.',
        handsOnLab: 'Wiring a dual-contactor 63A ATS panel with auxiliary contact feedback.'
      },
      {
        week: 2,
        moduleTitle: 'Generator Auto-Start Controllers',
        description: 'DeepSea Electronics (DSE) controllers, crank relay outputs, oil pressure & water temperature safety trips.',
        handsOnLab: 'Programming a DSE controller and bench-testing auto-start sequences on an industrial diesel simulator.'
      },
      {
        week: 3,
        moduleTitle: 'Three-Phase ATS, Neutral Isolation & Surge Protection',
        description: 'Preventing neutral floating, 4-pole switching requirements, bypass switches, and emergency repairs.',
        handsOnLab: 'Full live test transferring loads between 3-phase utility and generator with zero phase collision.'
      }
    ],
    prerequisites: ['Basic AC wiring skills'],
    certificationAwarded: 'Ebentrick Certified ATS Specialist (EC-ATS)',
    hardwareProvided: ['Timer relays', 'Auxiliary contact block', 'Official schematics manual'],
    nextCohorts: [
      {
        id: 'coh-ats-2026-01',
        startDate: 'October 19, 2026',
        endDate: 'November 6, 2026',
        format: 'In-Person Hands-on Lab',
        maxSeats: 12,
        enrolledSeats: 9,
        instructor: 'Engr. Kingsley Bassey',
        status: 'open'
      }
    ],
    instructorName: 'Engr. Kingsley Bassey',
    instructorRole: 'Senior Power Electronics Consultant'
  },
  {
    id: 'trn-ip-cctv-ai-security',
    title: 'Enterprise IP Surveillance, CCTV & AI Security Systems',
    code: 'EBT-TRN-301',
    category: 'security-access',
    level: 'Intermediate / Field Tech',
    durationWeeks: 4,
    hoursPerWeek: 10,
    tuitionFee: 320000,
    syllabus: [
      {
        week: 1,
        moduleTitle: 'Networking Fundamentals for IP Cameras',
        description: 'Subnets, IP addressing, DHCP vs static assignment, PoE (802.3af/at) power budgeting, and bandwidth calculation.',
        handsOnLab: 'Crimping shielded Cat6 RJ45 cables and configuring a managed Gigabit PoE network switch.'
      },
      {
        week: 2,
        moduleTitle: 'Camera Optics, Sensor Tech & Placement',
        description: 'Focal length calculation, angle of view, WDR (Wide Dynamic Range), Starlight sensors, and PTZ presets.',
        handsOnLab: 'Mounting bullet and dome cameras with lens adjustment for identification vs detection zones.'
      },
      {
        week: 3,
        moduleTitle: 'NVR Configuration & AI Video Analytics',
        description: 'RAID storage setups, H.265+ compression, line crossing alarms, vehicle license plate capture, and face recognition.',
        handsOnLab: 'Configuring Hikvision and Dahua NVRs with smart perimeter intrusion alarm triggers.'
      },
      {
        week: 4,
        moduleTitle: 'Remote Access, Port Forwarding, P2P & Maintenance',
        description: 'Cloud P2P setups, mobile app push alerts, off-site cloud storage backup, and troubleshooting camera video loss.',
        handsOnLab: 'End-to-end multi-site monitoring station setup with client remote access.'
      }
    ],
    prerequisites: ['Basic computer networking knowledge'],
    certificationAwarded: 'Ebentrick Certified CCTV & Security Systems Specialist (EC-CSS)',
    hardwareProvided: ['Cat6 testing kit', 'RJ45 crimper & punch-down tool', 'IP camera test tester'],
    nextCohorts: [
      {
        id: 'coh-cctv-2026-01',
        startDate: 'October 12, 2026',
        endDate: 'November 6, 2026',
        format: 'In-Person Hands-on Lab',
        maxSeats: 16,
        enrolledSeats: 14,
        instructor: 'Engr. Fatima Bello',
        status: 'filling_fast'
      }
    ],
    instructorName: 'Engr. Fatima Bello',
    instructorRole: 'Security Systems Specialist'
  },
  {
    id: 'trn-ip-pabx-voip-systems',
    title: 'Enterprise IP-PABX, VoIP & Telecom Systems Specialist',
    code: 'EBT-TRN-401',
    category: 'enterprise-telecom',
    level: 'Intermediate / Field Tech',
    durationWeeks: 4,
    hoursPerWeek: 12,
    tuitionFee: 360000,
    syllabus: [
      {
        week: 1,
        moduleTitle: 'VoIP Fundamentals & SIP Protocol',
        description: 'Voice codecs (G.711, Opus), SIP handshake, RTP audio streams, and QoS traffic shaping on routers.',
        handsOnLab: 'Setting up a local Grandstream UCM IP-PBX appliance on a test network.'
      },
      {
        week: 2,
        moduleTitle: 'Extensions, Ring Groups & IVR Menus',
        description: 'Creating internal extensions, department hunt groups, call queues, music on hold, and multi-level IVR auto-attendants.',
        handsOnLab: 'Recording audio greetings and programming a corporate IVR phone tree with night-mode routing.'
      },
      {
        week: 3,
        moduleTitle: 'SIP Trunks, FXO/FXS Gateways & GSM Links',
        description: 'Connecting external telco fiber trunks, connecting analog landlines, and integrating 4G SIM voice gateways.',
        handsOnLab: 'Configuring outbound call routes, dialing rules, and emergency number priorities.'
      },
      {
        week: 4,
        moduleTitle: 'Intercoms, Softphones & Hotel PMS Integration',
        description: 'Integrating door intercoms with video, configuring smartphone VoIP apps, and hospitality room check-in billing.',
        handsOnLab: 'Full enterprise communication deployment simulation.'
      }
    ],
    prerequisites: ['Computer networking foundations'],
    certificationAwarded: 'Ebentrick Certified Telecom & VoIP Specialist (EC-TVS)',
    hardwareProvided: ['Grandstream IP phone', 'SIP test credentials', 'VoIP admin workbook'],
    nextCohorts: [
      {
        id: 'coh-pabx-2026-01',
        startDate: 'November 2, 2026',
        endDate: 'November 27, 2026',
        format: 'Hybrid (Theory Online + Lab)',
        maxSeats: 14,
        enrolledSeats: 7,
        instructor: 'Engr. Marcus Vance',
        status: 'open'
      }
    ],
    instructorName: 'Engr. Marcus Vance',
    instructorRole: 'Enterprise Telecom Architect'
  },
  {
    id: 'trn-gate-perimeter-automation',
    title: 'Smart Gate, Electric Fence & Perimeter Automation Technician',
    code: 'EBT-TRN-501',
    category: 'security-access',
    level: 'Intermediate / Field Tech',
    durationWeeks: 3,
    hoursPerWeek: 12,
    tuitionFee: 300000,
    syllabus: [
      {
        week: 1,
        moduleTitle: 'Sliding & Swing Gate Mechanics & Motors',
        description: 'Gear rack alignment, limit switches, motor torque settings, foundation anchoring, and battery backups.',
        handsOnLab: 'Mounting and calibrating a Centurion D5 Smart gate motor on a 500kg sliding steel gate.'
      },
      {
        week: 2,
        moduleTitle: 'Access Triggers, Remotes, Safety Beams & GSM',
        description: 'Anti-crush photocell beam safety wiring, remote code programming, intercom trigger dry contacts, and smartphone access.',
        handsOnLab: 'Wiring safety beam auto-reverse circuits and smartphone Bluetooth/GSM controllers.'
      },
      {
        week: 3,
        moduleTitle: 'Electric Fence Energizers & Nemtek Systems',
        description: 'High-voltage wire tensioning, earthing stakes, lightning diverters, zone alarms, and siren strobe programming.',
        handsOnLab: 'Erecting an 8-strand wall-top electric fence array with live energizer testing and fault simulation.'
      }
    ],
    prerequisites: ['Basic mechanical assembly and low-voltage wiring aptitude'],
    certificationAwarded: 'Ebentrick Certified Perimeter Automation Tech (EC-PAT)',
    hardwareProvided: ['Fence tensioner tool', 'Energizer neon tester', 'Motor installation guide'],
    nextCohorts: [
      {
        id: 'coh-gate-2026-01',
        startDate: 'October 26, 2026',
        endDate: 'November 13, 2026',
        format: 'In-Person Hands-on Lab',
        maxSeats: 15,
        enrolledSeats: 11,
        instructor: 'Engr. Gabriel Adebayo',
        status: 'open'
      }
    ],
    instructorName: 'Engr. Gabriel Adebayo',
    instructorRole: 'Head of Automation Engineering'
  }
];

export const INITIAL_BOOKINGS: ServiceBooking[] = [
  {
    id: 'bk-2026-001',
    referenceCode: 'EBT-BK-2026-904',
    customerName: 'Chief Alexander Adeleke',
    email: 'alexander.adeleke@vanguardrealty.com',
    phone: '+234 803 245 8901',
    companyName: 'Vanguard Luxury Residences',
    address: 'Plot 14B, Admiralty Way, Lekki Phase 1',
    city: 'Lagos',
    stateOrRegion: 'Lagos State',
    serviceId: 'srv-home-automation',
    serviceName: 'Home Automation (Smart Home)',
    premisesType: 'Residential Villa',
    urgency: 'priority',
    preferredDate: '2026-09-22',
    preferredTimeSlot: 'morning',
    estimatedCost: 3850000,
    notes: 'Complete smart home automation for a 5-bedroom duplex: motorized blinds, 3-zone HVAC, architectural lighting, and 10-inch in-wall touch panels.',
    status: 'confirmed',
    paymentStatus: 'deposit_paid',
    paymentReference: 'PAY-REF-981204',
    assignedTechnician: {
      id: 'tech-01',
      name: 'Engr. Gabriel Adebayo',
      role: 'Lead Automation Engineer',
      phone: '+234 802 119 4432'
    },
    timeline: [
      {
        id: 'tm-1',
        status: 'pending',
        timestamp: '2026-09-10 09:14',
        note: 'Customer submitted online booking request.',
        author: 'System Intake Engine'
      },
      {
        id: 'tm-2',
        status: 'quote_sent',
        timestamp: '2026-09-10 11:30',
        note: 'Bespoke architectural automation quotation sent to client.',
        author: 'Admin Office'
      },
      {
        id: 'tm-3',
        status: 'confirmed',
        timestamp: '2026-09-11 14:05',
        note: '70% mobilization deposit confirmed via card payment. Field engineering team assigned.',
        author: 'Accounts Desk'
      }
    ],
    createdAt: '2026-09-10T09:14:00Z',
    updatedAt: '2026-09-11T14:05:00Z'
  },
  {
    id: 'bk-2026-002',
    referenceCode: 'EBT-BK-2026-905',
    customerName: 'Dr. Stella Nnamdi',
    email: 'stella.nnamdi@meridianclinic.org',
    phone: '+234 806 772 1099',
    companyName: 'Meridian Diagnostic Medical Center',
    address: '42 Isaac John Street, GRA Ikeja',
    city: 'Lagos',
    stateOrRegion: 'Lagos State',
    serviceId: 'srv-solar-inverter-system',
    serviceName: 'Solar & Inverter Systems',
    premisesType: 'Commercial Office',
    urgency: 'priority',
    preferredDate: '2026-09-25',
    preferredTimeSlot: 'morning',
    estimatedCost: 9500000,
    notes: '15kVA hybrid solar system with 20kWh LiFePO4 rack batteries for uninterrupted power to sensitive ultrasound and laboratory analyzers.',
    status: 'in_progress',
    paymentStatus: 'deposit_paid',
    paymentReference: 'PAY-REF-981552',
    assignedTechnician: {
      id: 'tech-02',
      name: 'Engr. David Okon',
      role: 'Lead Renewable Power Systems Architect',
      phone: '+234 803 881 7720'
    },
    timeline: [
      {
        id: 'tm-1',
        status: 'pending',
        timestamp: '2026-09-08 14:22',
        note: 'Clinical director requested 15kVA solar backup solution.',
        author: 'Web Intake'
      },
      {
        id: 'tm-2',
        status: 'confirmed',
        timestamp: '2026-09-09 10:15',
        note: 'Deposit received. Hardware pulled from central warehouse.',
        author: 'Logistics Desk'
      },
      {
        id: 'tm-3',
        status: 'in_progress',
        timestamp: '2026-09-13 08:00',
        note: 'Rooftop mounting rails installed. Bifacial panels wiring commenced.',
        author: 'Engr. David Okon'
      }
    ],
    createdAt: '2026-09-08T14:22:00Z',
    updatedAt: '2026-09-13T08:00:00Z'
  },
  {
    id: 'bk-2026-003',
    referenceCode: 'EBT-BK-2026-906',
    customerName: 'Alhaji Ibrahim Danjuma',
    email: 'ibrahim.danjuma@crestviewhotels.ng',
    phone: '+234 809 334 2210',
    companyName: 'Crestview Grand Hotel & Suites',
    address: '88 Constitution Avenue, Central Business District',
    city: 'Abuja',
    stateOrRegion: 'FCT',
    serviceId: 'srv-hotels-door-locks',
    serviceName: 'Hotels Door Locks & Keyless Management',
    premisesType: 'Hotel / Hospitality',
    urgency: 'standard',
    preferredDate: '2026-10-02',
    preferredTimeSlot: 'morning',
    estimatedCost: 6800000,
    notes: 'Retrofitting 64 guest rooms with Mifare RFID smart card locks, 2 front-desk encoder stations, and energy-saving card switches.',
    status: 'quote_sent',
    paymentStatus: 'unpaid',
    timeline: [
      {
        id: 'tm-1',
        status: 'pending',
        timestamp: '2026-09-12 16:40',
        note: 'Hotel procurement team submitted request for proposal (RFP).',
        author: 'Web Intake'
      },
      {
        id: 'tm-2',
        status: 'quote_sent',
        timestamp: '2026-09-13 11:20',
        note: 'Official quotation with itemized hardware and PMS integration dispatched.',
        author: 'Corporate Sales'
      }
    ],
    createdAt: '2026-09-12T16:40:00Z',
    updatedAt: '2026-09-13T11:20:00Z'
  },
  {
    id: 'bk-2026-004',
    referenceCode: 'EBT-BK-2026-907',
    customerName: 'Mrs. Folashade Coker',
    email: 'folashade.coker@gmail.com',
    phone: '+234 818 440 9981',
    address: '19 Banana Island Road, Ikoyi',
    city: 'Lagos',
    stateOrRegion: 'Lagos State',
    serviceId: 'srv-smart-gate',
    serviceName: 'Smart Gate Automation',
    premisesType: 'Residential Villa',
    urgency: 'standard',
    preferredDate: '2026-09-28',
    preferredTimeSlot: 'afternoon',
    estimatedCost: 1450000,
    notes: 'Automate a 4.5m dual swing steel gate with Centurion Vantage arms, GSM gate opener, and anti-crush safety infrared beams.',
    status: 'confirmed',
    paymentStatus: 'paid_in_full',
    paymentReference: 'PAY-REF-981880',
    assignedTechnician: {
      id: 'tech-01',
      name: 'Engr. Gabriel Adebayo',
      role: 'Head of Automation Engineering',
      phone: '+234 802 119 4432'
    },
    timeline: [
      {
        id: 'tm-1',
        status: 'pending',
        timestamp: '2026-09-11 10:00',
        note: 'Client booked swing gate automation.',
        author: 'Web Portal'
      },
      {
        id: 'tm-2',
        status: 'confirmed',
        timestamp: '2026-09-11 12:45',
        note: 'Paid in full via online card checkout. Scheduled for September 28.',
        author: 'Finance Gate'
      }
    ],
    createdAt: '2026-09-11T10:00:00Z',
    updatedAt: '2026-09-11T12:45:00Z'
  }
];

export const INITIAL_ENROLLMENTS: TrainingEnrollment[] = [
  {
    id: 'enr-2026-01',
    registrationNumber: 'EBT-ENR-408',
    studentName: 'Emeka Chukwuma',
    email: 'emeka.chukwuma@techmail.ng',
    phone: '+234 805 112 3344',
    courseId: 'trn-smart-home-mastery',
    courseTitle: 'Certified Smart Home Automation Specialist (CSHAS)',
    cohortId: 'coh-sh-2026-01',
    cohortStartDate: 'October 5, 2026',
    format: 'In-Person Hands-on Lab',
    tuitionFee: 350000,
    amountPaid: 350000,
    paymentPlan: 'full',
    paymentStatus: 'paid_in_full',
    paymentReference: 'TRN-PAY-8831',
    status: 'enrolled',
    certificateIssued: false,
    enrolledAt: '2026-09-08T11:20:00Z'
  },
  {
    id: 'enr-2026-02',
    registrationNumber: 'EBT-ENR-409',
    studentName: 'Amina Sanusi',
    email: 'amina.sanusi@energypro.ng',
    phone: '+234 812 770 9922',
    courseId: 'trn-solar-pv-engineering',
    courseTitle: 'Professional Solar PV & Lithium Energy Storage Engineering',
    cohortId: 'coh-sol-2026-01',
    cohortStartDate: 'October 12, 2026',
    format: 'In-Person Hands-on Lab',
    tuitionFee: 450000,
    amountPaid: 450000,
    paymentPlan: 'full',
    paymentStatus: 'paid_in_full',
    paymentReference: 'TRN-PAY-8842',
    status: 'enrolled',
    certificateIssued: false,
    enrolledAt: '2026-09-09T14:45:00Z'
  },
  {
    id: 'enr-2026-03',
    registrationNumber: 'EBT-ENR-410',
    studentName: 'Tunde Bakare',
    email: 'tunde.bakare@securitynet.org',
    phone: '+234 803 998 1234',
    courseId: 'trn-ip-cctv-ai-security',
    courseTitle: 'Enterprise IP Surveillance, CCTV & AI Security Systems',
    cohortId: 'coh-cctv-2026-01',
    cohortStartDate: 'October 12, 2026',
    format: 'In-Person Hands-on Lab',
    tuitionFee: 320000,
    amountPaid: 160000,
    paymentPlan: 'two_installments',
    paymentStatus: 'deposit_paid',
    paymentReference: 'TRN-PAY-8855',
    status: 'enrolled',
    certificateIssued: false,
    enrolledAt: '2026-09-12T09:10:00Z'
  }
];

export const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-2026-01',
    referenceId: 'INQ-7821',
    fullName: 'Engr. Femi Oladipo',
    email: 'femi.oladipo@chevronpartners.com',
    phone: '+234 802 884 1928',
    organization: 'Apex Industrial Estate',
    inquiryType: 'corporate_partnership',
    serviceInterest: 'Automatic change over (ATS) & Solar microgrid',
    subject: 'Request for industrial 250kVA ATS and rooftop solar turnkey design',
    message: 'We are expanding our industrial production plant in Ikeja and require a turnkey 250kVA motorized ATS synchronized with our existing dual Cat generators and proposed 120kWp solar array. Please let us know your availability for a technical site survey.',
    urgency: 'high',
    status: 'new',
    createdAt: '2026-09-14T08:30:00Z'
  },
  {
    id: 'inq-2026-02',
    referenceId: 'INQ-7822',
    fullName: 'Blessing Udoh',
    email: 'blessing.udoh@gmail.com',
    phone: '+234 813 449 8011',
    inquiryType: 'training_admission',
    serviceInterest: 'Certified Smart Home Automation Specialist',
    subject: 'Inquiry regarding weekend cohort for Smart Home Automation',
    message: 'Hello Ebentrick Team, I am an electrical engineer working on weekdays. Do you offer the Smart Home Automation training as an executive weekend hands-on class? Also, does the tuition include the student lab starter kit?',
    urgency: 'medium',
    status: 'responded',
    adminNotes: 'Informed Blessing about the weekend hybrid track starting in November. Sent syllabus brochure.',
    createdAt: '2026-09-13T15:10:00Z'
  },
  {
    id: 'inq-2026-03',
    referenceId: 'INQ-7823',
    fullName: 'Bonaventure Ezechukwu',
    email: 'bonaventure@royalgateresort.com',
    phone: '+234 808 221 7700',
    organization: 'Royal Gate Beach Resort',
    inquiryType: 'service_request',
    serviceInterest: 'Hotels door locks & Access Controls',
    subject: 'Keycard locks for 48 beachfront chalets with saltwater resistance',
    message: 'We manage 48 beach chalets in Ilashe and require marine-grade 304 stainless steel RFID keycard locks resistant to salt mist corrosion. We also need turnstile access at the private jetty.',
    urgency: 'high',
    status: 'in_progress',
    assignedTo: 'Engr. Gabriel Adebayo',
    createdAt: '2026-09-13T10:45:00Z'
  }
];

export const INITIAL_NOTIFICATIONS: EmailNotification[] = [
  {
    id: 'notif-001',
    trackingId: 'EML-TRK-9901',
    recipientEmail: 'alexander.adeleke@vanguardrealty.com',
    recipientName: 'Chief Alexander Adeleke',
    type: 'booking_confirmation',
    subject: 'Booking Confirmed: Ebentrick Smart Home Automation (Ref: EBT-BK-2026-904)',
    htmlContent: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <div style="background: #0f172a; padding: 20px; text-align: center; border-radius: 6px;">
        <h2 style="color: #ffffff; margin: 0;">EBENTRICK GLOBAL SERVICES</h2>
        <p style="color: #60a5fa; margin: 4px 0 0 0; font-size: 12px; letter-spacing: 2px;">LIGHT MAKES THE DIFFERENCE</p>
      </div>
      <div style="padding: 24px 0;">
        <h3 style="color: #0f172a;">Service Booking Confirmed</h3>
        <p>Dear Chief Alexander Adeleke,</p>
        <p>Thank you for choosing Ebentrick Global Services. Your booking <strong>EBT-BK-2026-904</strong> for <strong>Home Automation (Smart Home)</strong> has been successfully confirmed.</p>
        <div style="background: #f8fafc; padding: 16px; border-radius: 6px; border-left: 4px solid #2563eb; margin: 16px 0;">
          <p style="margin: 4px 0;"><strong>Inspection / Start Date:</strong> September 22, 2026 (Morning Slot)</p>
          <p style="margin: 4px 0;"><strong>Premises:</strong> Plot 14B, Admiralty Way, Lekki Phase 1, Lagos</p>
          <p style="margin: 4px 0;"><strong>Assigned Lead Engineer:</strong> Engr. Gabriel Adebayo (+234 802 119 4432)</p>
          <p style="margin: 4px 0;"><strong>Payment Status:</strong> Deposit Paid (Ref: PAY-REF-981204)</p>
        </div>
        <p>Our engineering team will arrive with certified diagnostic tools and installation blueprints. For real-time updates, you can reply directly or message our 24/7 technical dispatch desk.</p>
      </div>
      <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 11px; color: #64748b; text-align: center;">
        Ebentrick Global Services Ltd &bull; 24/7 Emergency Line: +234 800-EBENTRICK &bull; support@ebentrick.com
      </div>
    </div>`,
    textContent: 'Dear Chief Alexander Adeleke, your booking EBT-BK-2026-904 for Home Automation has been confirmed for Sept 22, 2026. Assigned Engineer: Engr. Gabriel Adebayo.',
    status: 'delivered',
    dispatchedAt: '2026-09-11T14:06:00Z',
    metadata: { bookingId: 'bk-2026-001' }
  },
  {
    id: 'notif-002',
    trackingId: 'EML-TRK-9902',
    recipientEmail: 'emeka.chukwuma@techmail.ng',
    recipientName: 'Emeka Chukwuma',
    type: 'training_enrollment',
    subject: 'Official Admission: Certified Smart Home Automation Specialist (Reg: EBT-ENR-408)',
    htmlContent: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <div style="background: #0f172a; padding: 20px; text-align: center; border-radius: 6px;">
        <h2 style="color: #ffffff; margin: 0;">EBENTRICK TECHNICAL ACADEMY</h2>
        <p style="color: #60a5fa; margin: 4px 0 0 0; font-size: 12px; letter-spacing: 2px;">LIGHT MAKES THE DIFFERENCE</p>
      </div>
      <div style="padding: 24px 0;">
        <h3 style="color: #0f172a;">Cohort Admission Letter & Schedule</h3>
        <p>Dear Emeka Chukwuma,</p>
        <p>Congratulations! You are officially admitted into the <strong>Certified Smart Home Automation Specialist (CSHAS)</strong> program.</p>
        <div style="background: #f8fafc; padding: 16px; border-radius: 6px; border-left: 4px solid #10b981; margin: 16px 0;">
          <p style="margin: 4px 0;"><strong>Student Reg Number:</strong> EBT-ENR-408</p>
          <p style="margin: 4px 0;"><strong>Cohort Start Date:</strong> October 5, 2026</p>
          <p style="margin: 4px 0;"><strong>Training Facility:</strong> Ebentrick Advanced IoT Hardware Lab, Innovation Hub</p>
          <p style="margin: 4px 0;"><strong>Lead Instructor:</strong> Engr. Gabriel Adebayo</p>
          <p style="margin: 4px 0;"><strong>Tuition Status:</strong> Paid in Full ($350 USD)</p>
        </div>
        <p>Your student kit (Zigbee Hub, smart switches, mmWave radar sensor, and precision toolkit) will be handed to you on Orientation Day.</p>
      </div>
      <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 11px; color: #64748b; text-align: center;">
        Ebentrick Global Services Ltd &bull; Academy Directorate &bull; academy@ebentrick.com
      </div>
    </div>`,
    textContent: 'Congratulations Emeka Chukwuma! You are officially admitted into CSHAS starting Oct 5, 2026.',
    status: 'delivered',
    dispatchedAt: '2026-09-08T11:22:00Z',
    metadata: { enrollmentId: 'enr-2026-01' }
  }
];

export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: 'usr-001',
    name: 'Engr. Ebenezer Trickson',
    email: 'ebenezer@ebentrick.com',
    role: 'super_admin',
    roleTitle: 'Managing Director & Chief Engineer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    permissions: {
      canManageBookings: true,
      canAssignTechnicians: true,
      canManageTraining: true,
      canIssueCertificates: true,
      canManageInquiries: true,
      canSendNotifications: true,
      canManagePayments: true,
      canManageUsers: true
    },
    lastActive: 'Just now'
  },
  {
    id: 'usr-002',
    name: 'Engr. Gabriel Adebayo',
    email: 'gabriel.adebayo@ebentrick.com',
    role: 'lead_engineer',
    roleTitle: 'Head of Automation & Mechatronics',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    permissions: {
      canManageBookings: true,
      canAssignTechnicians: true,
      canManageTraining: true,
      canIssueCertificates: true,
      canManageInquiries: true,
      canSendNotifications: true,
      canManagePayments: false,
      canManageUsers: false
    },
    lastActive: '12 mins ago'
  },
  {
    id: 'usr-003',
    name: 'Amina Bello-Kalu',
    email: 'amina.bello@ebentrick.com',
    role: 'operations_manager',
    roleTitle: 'Operations & Dispatch Manager',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    permissions: {
      canManageBookings: true,
      canAssignTechnicians: true,
      canManageTraining: true,
      canIssueCertificates: false,
      canManageInquiries: true,
      canSendNotifications: true,
      canManagePayments: true,
      canManageUsers: false
    },
    lastActive: '3 mins ago'
  },
  {
    id: 'usr-004',
    name: 'Samuel Adele',
    email: 'samuel.adele@ebentrick.com',
    role: 'support_specialist',
    roleTitle: 'Customer Care & WhatsApp Lead',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    permissions: {
      canManageBookings: false,
      canAssignTechnicians: false,
      canManageTraining: false,
      canIssueCertificates: false,
      canManageInquiries: true,
      canSendNotifications: true,
      canManagePayments: false,
      canManageUsers: false
    },
    lastActive: 'Online'
  }
];

export const PROJECT_CASE_STUDIES: ProjectCaseStudy[] = [
  {
    id: 'prj-01',
    title: 'Smart Villa Automation & 20kVA Solar Microgrid',
    client: 'Private Residence, Banana Island',
    location: 'Ikoyi, Lagos',
    servicesSupplied: ['Home Automation (Smart Home)', 'Solar & Inverter Systems', 'Smart Gate Automation', 'Electric Fence'],
    summary: 'Turnkey architectural integration of automated Lutron lighting scenes, 20kVA Deye hybrid solar system with 30kWh lithium batteries, Centurion motorized gate with license plate cameras, and Nemtek pulsed electric fence.',
    highlights: ['Zero utility grid downtime over 14 consecutive months', 'Automated energy diversion to solar water heaters during peak sun', 'Single touchscreen control for 12 audio zones and landscape lighting'],
    metrics: '99.9% Uptime & 72% Grid Energy Reduction',
    year: '2026',
    category: 'smart-living'
  },
  {
    id: 'prj-02',
    title: 'Hospitality Keyless Entry & IP-PBX Network for 120-Room Luxury Hotel',
    client: 'Silverline Grand Hotel & Spa',
    location: 'Victoria Island, Lagos',
    servicesSupplied: ['Hotels door locks', 'IP-PABX & Telecom Systems', 'Digital Signage', 'Access Controls'],
    summary: 'Complete electronic overhaul including Mifare RFID hotel door locks with PMS guest check-in software, Grandstream UCM IP-PABX connecting 140 guest extensions and automated IVR routing, and 4K ultra-bright digital signage throughout the lobby.',
    highlights: ['Check-in key generation reduced to under 15 seconds per guest', 'Zero recurring telecom fees with on-premise PBX', 'Energy-saving room card switches reduced hotel AC energy consumption by 31%'],
    metrics: '120 Smart Guest Suites & 140 VoIP Extensions',
    year: '2025',
    category: 'enterprise-telecom'
  },
  {
    id: 'prj-03',
    title: 'Factory 400A Automatic Change Over (ATS) & Industrial Electrical Works',
    client: 'NexGen Plastics Manufacturing Ltd',
    location: 'Ikeja Industrial Zone, Lagos',
    servicesSupplied: ['Automatic change over (ATS)', 'Electrical works', 'Digital Securities'],
    summary: 'Engineered a dual 400A motorized ATS transfer switch with Socomec switching gear and DeepSea generator controller. Upgraded main distribution boards with Schneider TVSS surge suppression and installed 32 AI AcuSense 4K CCTV surveillance cameras.',
    highlights: ['Extrusion line machines run without stutter or phase reversal on generator changeover', 'Deep chemical copper grounding reduced earth resistance to 0.8 Ohms', 'Thermal imaging verified zero hotspot heating under 100% industrial load'],
    metrics: '400A Continuous Capacity & 18ms Auto Transfer',
    year: '2026',
    category: 'power-energy'
  }
];

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-01',
    name: 'Dr. Stella Nnamdi',
    role: 'Medical Director',
    companyOrLocation: 'Meridian Diagnostic Center, GRA Ikeja, Lagos',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    serviceCategory: 'power-energy',
    serviceOrCourse: '15kVA Solar & Inverter Microgrid',
    content: 'In medical diagnostics, even a 2-second flicker can ruin blood sample analysis or damage ultrasound machines. Ebentrick designed and installed our 15kVA hybrid solar system with rack lithium batteries. Our clinical machines have run 100% uninterrupted for 9 straight months, reducing our diesel generator expenses by ₦850,000 monthly.',
    verifiedProject: true,
    date: 'August 2026'
  },
  {
    id: 'test-02',
    name: 'Chief Alexander Adeleke',
    role: 'Managing Director',
    companyOrLocation: 'Vanguard Luxury Residences, Lekki Phase 1',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    serviceCategory: 'smart-living',
    serviceOrCourse: 'Smart Home Automation & Centurion Gate',
    content: 'Ebentrick transformed my duplex into an architectural masterpiece. From the 10-inch in-wall touch panels to motorized curtains that open with sunrise and voice-activated cinema scenes, everything operates smoothly. What impressed me most was that even when our estate internet went down, the local smart hubs continued running without a hitch.',
    verifiedProject: true,
    date: 'July 2026'
  },
  {
    id: 'test-03',
    name: 'Engr. Femi Oladipo',
    role: 'Head of Facilities & Operations',
    companyOrLocation: 'NexGen Plastics Manufacturing Ltd, Ikeja Industrial Zone',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    serviceCategory: 'power-energy',
    serviceOrCourse: '400A Automatic Change Over (ATS) & Surge Protection',
    content: 'Our heavy polymer extrusion plant used to suffer severe contactor trips and phase imbalances whenever the utility power dropped. Engr. Kingsley and the Ebentrick technical crew custom-built a 400A motorized ATS with DeepSea control. Switchover between generator and mains is virtually imperceptible at 18 milliseconds.',
    verifiedProject: true,
    date: 'September 2026'
  },
  {
    id: 'test-04',
    name: 'Mr. Patrick Nwosu',
    role: 'General Manager',
    companyOrLocation: 'Silverline Grand Hotel, Victoria Island, Lagos',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    serviceCategory: 'security-access',
    serviceOrCourse: '120-Room Smart RFID Locks & Grandstream IP-PBX',
    content: 'Upgraded all 120 guest doors with Ebentrick Mifare RFID smart card locks linked directly to our front-desk reception PMS. Room check-in takes less than 15 seconds now. The in-room energy-saving card switches also cut our guest room HVAC electricity wastage by 31%. Outstanding engineering professionalism.',
    verifiedProject: true,
    date: 'May 2026'
  },
  {
    id: 'test-05',
    name: 'Mrs. Folashade Coker',
    role: 'Property Owner & Architect',
    companyOrLocation: 'Banana Island, Ikoyi, Lagos',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    serviceCategory: 'security-access',
    serviceOrCourse: 'Nemtek Electric Fence & Centurion Smart Gate Automation',
    content: 'Security on our waterfront perimeter required zero compromise. Ebentrick installed an 8-strand high-tensile Nemtek electric fence coupled with Centurion Vantage motorized gate arms and active anti-crush infrared safety beams. The GSM alerts notify me on my phone whenever the gate opens or if anyone touches the fence.',
    verifiedProject: true,
    date: 'August 2026'
  },
  {
    id: 'test-06',
    name: 'Emeka Chukwuma',
    role: 'Certified Automation Specialist (Alumnus)',
    companyOrLocation: 'Now Lead Engineer at Apex Smart Living, Abuja',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    serviceCategory: 'smart-living',
    serviceOrCourse: 'Certified Smart Home Automation Specialist (Cohort 101)',
    content: 'Attending the Ebentrick Training Academy was the pivotal turning point in my engineering career. Unlike other academies that only teach PowerPoint slides, at Ebentrick we wired real 2-way smart relays, flashed Zigbee coordinators, and commissioned live client test rigs. Within 3 weeks of graduating, I landed a lead installation contract in Abuja.',
    verifiedProject: true,
    date: 'June 2026'
  },
  {
    id: 'test-07',
    name: 'Barrister Tunde Olanipekun',
    role: 'Senior Partner',
    companyOrLocation: 'Olanipekun & Co Chambers, Central Business District, Abuja',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    serviceCategory: 'enterprise-telecom',
    serviceOrCourse: 'VoIP IP-PBX Telephony & Biometric Access',
    content: 'We needed a secure telecommunications and access control setup across our 3-floor legal office. Ebentrick deployed Grandstream IP phones with auto-attendant IVR and ZKTeco facial recognition turnstiles. Client calls are seamlessly routed to lawyers even when in court via mobile softphone.',
    verifiedProject: true,
    date: 'July 2026'
  },
  {
    id: 'test-08',
    name: 'Amina Sanusi',
    role: 'Solar Project Engineer (Academy Alumna)',
    companyOrLocation: 'Renewable Power Solutions Ltd, Kano',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    serviceCategory: 'power-energy',
    serviceOrCourse: 'Professional Solar PV & Lithium Energy Storage (Cohort 201)',
    content: 'The solar sizing, MPPT charge controller programming, and lithium battery CAN-bus communication modules at the Academy were thorough and world-class. Engr. David Okon patiently guided our class through live roof installations and megger earth resistance testing. I recommend this course to any serious technician.',
    verifiedProject: true,
    date: 'May 2026'
  }
];

export const INITIAL_PROJECT_VIDEOS: ProjectVideo[] = [
  {
    id: 'vid-01',
    title: 'Luxury Villa Smart Home Automation Walkthrough',
    youtubeUrl: 'https://www.youtube.com/watch?v=F1u7E7k3C2Q',
    youtubeId: 'F1u7E7k3C2Q',
    category: 'smart-living',
    clientOrLocation: 'Banana Island, Ikoyi, Lagos',
    description: 'Tour of our complete turnkey smart home automation installation featuring 10-inch in-wall touch dashboards, multi-zone architectural lighting scenes, motorized automated drapery, and integrated multi-room ceiling audio.',
    duration: '4:15',
    tags: ['Smart Home', 'Lutron', 'Zigbee', 'Luxury Living', 'Lekki Villa'],
    dateAdded: '2026-09-02',
    featured: true
  },
  {
    id: 'vid-02',
    title: '20kVA Commercial Hybrid Solar & Lithium Storage Installation',
    youtubeUrl: 'https://www.youtube.com/watch?v=L_LUpnjgPso',
    youtubeId: 'L_LUpnjgPso',
    category: 'power-energy',
    clientOrLocation: 'Meridian Clinic, GRA Ikeja, Lagos',
    description: 'Behind the scenes video documenting the rooftop bifacial solar panel racking, Deye hybrid high-voltage inverter synchronization, and 20kWh LiFePO4 server rack battery bank commissioning providing 24/7 medical power.',
    duration: '6:30',
    tags: ['Solar Power', 'Inverter', 'Deye', 'Lithium LiFePO4', 'Healthcare'],
    dateAdded: '2026-08-20',
    featured: true
  },
  {
    id: 'vid-03',
    title: '400A Industrial Motorized ATS Changeover Switch Live Test',
    youtubeUrl: 'https://www.youtube.com/watch?v=G1IbRujko-A',
    youtubeId: 'G1IbRujko-A',
    category: 'power-energy',
    clientOrLocation: 'NexGen Plastics, Ikeja Industrial Zone',
    description: 'Demonstrating the live zero-downtime transfer of an industrial manufacturing line from utility grid to standby diesel generator using our custom 400A motorized Automatic Transfer Switch with DeepSea controller.',
    duration: '3:45',
    tags: ['ATS', 'Automatic Changeover', 'Industrial Power', 'Generator Automation', 'DeepSea'],
    dateAdded: '2026-08-14',
    featured: false
  },
  {
    id: 'vid-04',
    title: '120-Room Hotel RFID Smart Card Door Lock System Deployment',
    youtubeUrl: 'https://www.youtube.com/watch?v=2vjPBrBU-TM',
    youtubeId: '2vjPBrBU-TM',
    category: 'security-access',
    clientOrLocation: 'Silverline Grand Hotel, Victoria Island, Lagos',
    description: 'Complete deployment of Mifare RFID stainless steel keycard locks, reception front-desk key encoder setup, guest check-in workflow, and guestroom energy-saving power card switches.',
    duration: '5:10',
    tags: ['Hotel Door Locks', 'RFID', 'Hospitality', 'Keyless Access', 'Victoria Island'],
    dateAdded: '2026-07-28',
    featured: false
  },
  {
    id: 'vid-05',
    title: 'High-Tensile Nemtek Electric Fence & Centurion Gate Motor Rig',
    youtubeUrl: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
    youtubeId: 'kJQP7kiw5Fk',
    category: 'security-access',
    clientOrLocation: 'Private Waterfront Estate, Lekki Phase 1',
    description: 'Installing 8-strand 10,000-volt pulsed perimeter electric fence with strobe sirens, paired with heavy-duty Centurion D5 Smart sliding gate motor with GSM mobile phone opening trigger.',
    duration: '4:50',
    tags: ['Electric Fence', 'Nemtek', 'Centurion Motor', 'Smart Gate', 'Perimeter Security'],
    dateAdded: '2026-07-10',
    featured: false
  },
  {
    id: 'vid-06',
    title: 'Ebentrick Academy: Live Smart Relay Wiring & Hub Programming Lab',
    youtubeUrl: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
    youtubeId: 'JGwWNGJdvx8',
    category: 'smart-living',
    clientOrLocation: 'Ebentrick Technical Training Lab, Lagos',
    description: 'Watch students in our Certified Smart Home Automation cohort troubleshoot live 2-way wiring boards, flash Zigbee routers, configure presence radar sensors, and pass their hands-on practical commissioning exam.',
    duration: '7:15',
    tags: ['Training Academy', 'Hands-on Lab', 'Certification', 'Automation Engineering', 'Alumni'],
    dateAdded: '2026-06-30',
    featured: true
  }
];

