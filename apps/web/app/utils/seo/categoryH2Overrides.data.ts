export type CategorySeoH2Copy = {
  de: string[];
  en: string[];
};

/**
 * Approved on-page H2 copy for production category URLs.
 * Sourced from the Komplett Konzept.de on-page optimization sheet.
 * Keys are lowercase paths without a trailing slash.
 */
export const CATEGORY_SEO_H2_OVERRIDES: Record<string, CategorySeoH2Copy> = {
  "/lagerlogistik": {
    de: ["Lösungen für effiziente Lagerlogistik und optimierte Warenbewegung"],
    en: ["Solutions for efficient warehouse logistics and optimized goods movement"],
  },
  "/elektronik-elektrotechnik": {
    de: ["Gebrauchte Elektronik & Elektrotechnik günstig online kaufen"],
    en: ["Buy used electronics & electrical engineering cheaply online"],
  },
  "/haus-und-heimwerken": {
    de: ["Produkte für Haus & Heimwerken günstig online kaufen"],
    en: ["Buy home and DIY products online at great prices"],
  },
  "/kategorie": {
    de: ["industriebedarf günstig online kaufen - große Auswahl für Profis"],
    en: ["Buy industrial supplies online at great prices - a wide selection for professionals"],
  },
  "/labor-medizintechnik": {
    de: ["Labor- & Medizintechnik günstig online kaufen - große Produktauswahl"],
    en: ["Buy laboratory and medical equipment online at great prices - large product selection"],
  },
  "/lagerlogistik/regale": {
    de: ["Regale für effiziente Lagerung & optimale Flächennutzung kaufen"],
    en: ["Buy shelves for efficient storage and optimal space utilization"],
  },
  "/lagerlogistik/paternoster": {
    de: ["Paternoster für platzsparende Lagerung & effiziente Warenbereitstellung kaufen"],
    en: ["Buy a paternoster lift for space-saving storage and efficient goods handling."],
  },
  "/lagerlogistik/gabelstapler": {
    de: ["Gabelstapler für effizienten Warentransport günstig kaufen"],
    en: ["Buy a forklift for efficient goods transport at a great price"],
  },
  "/kategorie/maschinen-anlagen": {
    de: ["Gebrauchte Maschinen und Anlagen für Industrie und Gewerbe"],
    en: ["Used Machines and Equipment for Industry and Commercial Businesses"],
  },
  "/kategorie/pumpen-rohrleitungsbau": {
    de: ["Pumpen und Rohrleitungsbau für Industrie und Gewerbe"],
    en: ["Pumps and Pipeline Construction for Industry and Commercial Applications"],
  },
  "/kategorie/metallbearbeitung": {
    de: ["Produkte und Ausstattung für Metallbearbeitung und Schlosserei"],
    en: ["Products and Equipment for Metalworking and Metalworking Workshops"],
  },
  "/kategorie/auto-zubehoer": {
    de: ["Auto-, Motorrad- und Fahrzeugzubehör für Wartung und Ausstattung"],
    en: ["Car, Motorcycle and Vehicle Accessories for Maintenance and Equipment"],
  },
  "/automation-antrieb-steuerung/roboter": {
    de: ["Roboter für Automatisierungstechnik"],
    en: ["Robots for Automation Technology"],
  },
  "/automation-antrieb-steuerung/frequenzumrichter": {
    de: ["Frequenzumrichter für Motoren und industrielle Anwendungen"],
    en: ["Frequency Converters for Motors and Industrial Applications"],
  },
  "/automation-antrieb-steuerung/lineartechnik": {
    de: ["Lineartechnik für Automatisierung, Förder- und Handhabungssysteme"],
    en: ["Linear Technology for Automation, Conveying and Handling Systems"],
  },
  "/automation-antrieb-steuerung/motoren-getriebe": {
    de: ["Motoren & Getriebe für Automatisierung und Antriebstechnik"],
    en: ["Motors & Gearboxes for Automation and Drive Technology"],
  },
  "/automation-antrieb-steuerung/sensoren-regler": {
    de: ["Sensoren & Regler für industrielle Automatisierung"],
    en: ["Sensors & Controllers for Industrial Automation"],
  },
  "/automation-antrieb-steuerung/sps-bus-logiksysteme": {
    de: ["SPS, Bus- & Logiksysteme für industrielle Automatisierung"],
    en: ["PLCs, Bus & Logic Systems for Industrial Automation"],
  },
  "/automation-antrieb-steuerung/zaehler-zeitrelais-uhren": {
    de: ["Zähler, Zeitrelais & Uhren für industrielle Schalt- und Steuerungsaufgaben"],
    en: ["Counters, timing relays & timers for industrial switching and control applications"],
  },
  "/elektronik-elektrotechnik/aktive-und-passive-bauteile": {
    de: ["Aktive & passive Bauteile für Elektronik und Elektrotechnik"],
    en: ["Active and passive components for electronics and electrical engineering"],
  },
  "/elektronik-elektrotechnik/elektromaterial": {
    de: ["Elektromaterial für Industrie, Wartung, Reparatur und Instandhaltung"],
    en: ["Electrical supplies for industry, maintenance, repair, and servicing"],
  },
  "/elektronik-elektrotechnik/last-und-trennschalter": {
    de: ["Last- und Trennschalter sowie Leistungsschutzschalter für industrielle Anwendungen"],
    en: ["Load-break switches, disconnectors, and circuit breakers for industrial applications"],
  },
  "/elektronik-elektrotechnik/mess-und-prueftechnik": {
    de: ["Mess- und Prüftechnik für industrielle Anwendungen und Elektrotechnik"],
    en: ["Measurement and testing technology for industrial applications and electrical engineering"],
  },
  "/elektronik-elektrotechnik/netzgeraete-und-stromversorgung": {
    de: ["Netzgeräte & Stromversorgung für industrielle Anwendungen und Elektrotechnik"],
    en: ["Power Supplies for Industrial Applications and Electrical Engineering"],
  },
  "/elektronik-elektrotechnik/schalt-und-verteilerschraenke": {
    de: ["Schalt- und Verteilerschränke für industrielle Anwendungen"],
    en: ["Control and distribution cabinets for industrial applications"],
  },
  "/elektronik-elektrotechnik/sensoren-und-regler": {
    de: ["Sensoren & Regler für industrielle Automatisierung und Steuerung"],
    en: ["Sensors & Controllers for Industrial Automation and Control"],
  },
  "/elektronik-elektrotechnik/sicherheitstechnik": {
    de: ["Sicherheitstechnik für industrielle Anwendungen und Elektrotechnik"],
    en: ["Safety technology for industrial applications and electrical engineering"],
  },
  "/elektronik-elektrotechnik/sicherungen": {
    de: ["Sicherungen und Hochleistungssicherungen für industrielle Anwendungen"],
    en: ["Fuses and high-performance fuses for industrial applications"],
  },
  "/elektronik-elektrotechnik/steuer-und-regelelektronik": {
    de: ["Steuer- und Regelelektronik für industrielle Steuerungs- und Automatisierungssysteme"],
    en: ["Control and regulation electronics for industrial control and automation systems"],
  },
  "/elektronik-elektrotechnik/trimbox": {
    de: ["Trimbox Überspannungsschutz für elektrische Anlagen"],
    en: ["Trimbox surge protection for electrical systems"],
  },
  "/elektronik-elektrotechnik/werkzeug": {
    de: ["Industriewerkzeuge für Wartung, Reparatur und industrielle Anwendungen"],
    en: ["Industrial tools for maintenance, repair, and industrial applications"],
  },
  "/elektronik-elektrotechnik/zubehoer-und-sonstiges": {
    de: ["Zubehör und sonstige Komponenten für Handwerkzeug und Industrie"],
    en: ["Accessories and other components for hand tools and industry"],
  },
  "/haus-und-heimwerken/buerobedarf": {
    de: ["Bürobedarf und Computerzubehör für den modernen Arbeitsplatz", "Bürobedarf für Homeoffice, Büro und Gewerbe", "Praktischer Bürobedarf für effizientes und zuverlässiges Arbeiten", "Bürobedarf online kaufen - Auswahl für Büro, Homeoffice und Gewerbe", "Häufige Fragen zu Bürobedarf und Computerzubehör", "Bürobedarf und Computer für moderne Arbeitsplätze"],
    en: ["Office Supplies and Computer Accessories for the Modern Workplace", "Office Supplies for Home Offices, Offices and Businesses", "Practical Office Supplies for Efficient and Reliable Work", "Buy Office Supplies Online - Selection for Offices, Home Offices and Businesses", "Frequently Asked Questions About Office Supplies and Computer Accessories", "Office Supplies and Computers for Modern Workplaces"],
  },
  "/haus-und-heimwerken/heimwerker-haus-garten": {
    de: ["Heimwerker-, Haus- und Gartenbedarf für Renovierung, Reparatur und Gestaltung"],
    en: ["DIY, Home and Garden Supplies for Renovation, Repairs and Design"],
  },
  "/kategorie/baugewerbe": {
    de: ["Produkte und Ausstattung für das Baugewerbe"],
    en: ["Products and Equipment for the Construction Industry"],
  },
  "/kategorie/betriebsausstattung-logistik": {
    de: ["Betriebsausstattung für Lager, Werkstatt und Industrie"],
    en: ["Industrial Equipment for Warehouses, Workshops and Industry"],
  },
  "/kategorie/grosshandel": {
    de: ["Großhandel und Restposten für Gewerbe und Industrie"],
    en: ["Wholesale and Clearance Stock for Businesses and Industry"],
  },
  "/kategorie/holzbearbeitung-tischlerei": {
    de: ["Produkte und Ausstattung für Holzbearbeitung und Tischlerei"],
    en: ["Products and Equipment for Woodworking and Carpentry"],
  },
  "/kategorie/ladenausstattung": {
    de: ["Ladenausstattung für Einzelhandel und Verkaufsflächen"],
    en: ["Retail Equipment for Stores and Sales Areas"],
  },
  "/kategorie/sonstige-branchen-produkte": {
    de: ["Produkte für verschiedene Branchen und industrielle Anwendungen"],
    en: ["Products for Various Industries and Industrial Applications"],
  },
  "/labor-medizintechnik/aerztebedarf": {
    de: ["Medizinischer Ärztebedarf für Praxis und Klinik"],
    en: ["Medical Supplies for Doctors' Practices and Clinics"],
  },
  "/labor-medizintechnik/blutzuckermessgeraete-zubehoer": {
    de: ["Blutzuckermessgeräte und Zubehör für Diabetesdiagnostik"],
    en: ["Blood Glucose Meters and Accessories for Diabetes Diagnostics"],
  },
  "/labor-medizintechnik/chemikalien-reagenzien": {
    de: ["Chemikalien und Reagenzien für Labor und Medizintechnik"],
    en: ["Chemicals and Reagents for Laboratory and Medical Technology"],
  },
  "/labor-medizintechnik/chirurgische-instrumente": {
    de: ["Chirurgische Instrumente für OP, Praxis und Medizintechnik"],
    en: ["Surgical Instruments for Operating Rooms, Practices and Medical Technology"],
  },
  "/labor-medizintechnik/diagnostik": {
    de: ["Diagnostikgeräte für Labor und medizinische Anwendungen"],
    en: ["Diagnostic Equipment for Laboratory and Medical Applications"],
  },
  "/labor-medizintechnik/glas-plastikware": {
    de: ["Glas- und Plastikware für Labor und Medizintechnik"],
    en: ["Glass and Plastic Products for Laboratory and Medical Technology"],
  },
  "/labor-medizintechnik/labor-mess-prueftechnik": {
    de: ["Labor-, Mess- und Prüftechnik für präzise Anwendungen"],
    en: ["Laboratory, Measurement and Testing Technology for Precise Applications"],
  },
  "/labor-medizintechnik/labormoebel": {
    de: ["Labormöbel für Labor, Praxis und medizinische Einrichtungen"],
    en: ["Laboratory Furniture for Laboratories, Practices and Medical Facilities"],
  },
  "/labor-medizintechnik/laborzubehoer": {
    de: ["Laborzubehör für Labor, Forschung und Medizintechnik"],
    en: ["Laboratory Accessories for Laboratories, Research and Medical Technology"],
  },
  "/labor-medizintechnik/medizinische-geraete-zubehoer": {
    de: ["Medizinische Geräte und Zubehör für Diagnostik und medizinische Anwendungen"],
    en: ["Medical Devices and Accessories for Diagnostics and Medical Applications"],
  },
  "/labor-medizintechnik/mikroskope": {
    de: ["Mikroskope für Labor, Forschung und medizinische Anwendungen"],
    en: ["Microscopes for Laboratories, Research and Medical Applications"],
  },
  "/labor-medizintechnik/praxis-klinikeinrichtung": {
    de: ["Praxis- und Klinikeinrichtung für medizinische Anwendungen"],
    en: ["Practice and Clinic Equipment for Medical Applications"],
  },
  "/labor-medizintechnik/stative-zubehoer": {
    de: ["Stative und Zubehör für Labor und Medizintechnik"],
    en: ["Stands and Accessories for Laboratory and Medical Technology"],
  },
};

