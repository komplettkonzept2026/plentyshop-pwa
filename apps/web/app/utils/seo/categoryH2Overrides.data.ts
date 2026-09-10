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
  "/automation-antrieb-steuerung/roboter": {
    de: ["Roboter für Automatisierungstechnik"],
    en: ["Robots for Automation Technology"],
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
  "/electronics-electrical-engineering": {
    de: ["Produkte der Elektronik und Elektrotechnik"],
    en: ["Electronics and Electrical Engineering Products"],
  },
  "/electronics-electrical-engineering1": {
    de: ["Mess-, Steuerungs- und Stromversorgungstechnik"],
    en: ["Measurement, Control and Power Supply Technology"],
  },
  "/elektronik-elektrotechnik": {
    de: ["Gebrauchte Elektronik & Elektrotechnik günstig online kaufen"],
    en: ["Buy used electronics & electrical engineering cheaply online"],
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
  "/haus-und-heimwerken": {
    de: ["Produkte für Haus & Heimwerken günstig online kaufen"],
    en: ["Buy home and DIY products online at great prices"],
  },
  "/haus-und-heimwerken/buerobedarf": {
    de: ["Bürobedarf und Computerzubehör für den modernen Arbeitsplatz", "Bürobedarf für Homeoffice, Büro und Gewerbe", "Praktischer Bürobedarf für effizientes und zuverlässiges Arbeiten", "Bürobedarf online kaufen - Auswahl für Büro, Homeoffice und Gewerbe", "Häufige Fragen zu Bürobedarf und Computerzubehör", "Bürobedarf und Computer für moderne Arbeitsplätze"],
    en: ["Office Supplies and Computer Accessories for the Modern Workplace", "Office Supplies for Home Offices, Offices and Businesses", "Practical Office Supplies for Efficient and Reliable Work", "Buy Office Supplies Online - Selection for Offices, Home Offices and Businesses", "Frequently Asked Questions About Office Supplies and Computer Accessories", "Office Supplies and Computers for Modern Workplaces"],
  },
  "/haus-und-heimwerken/heimwerker-haus-garten": {
    de: ["Heimwerker-, Haus- und Gartenbedarf für Renovierung, Reparatur und Gestaltung"],
    en: ["DIY, Home and Garden Supplies for Renovation, Repairs and Design"],
  },
  "/kategorie": {
    de: ["industriebedarf günstig online kaufen - große Auswahl für Profis"],
    en: ["Buy industrial supplies online at great prices - a wide selection for professionals"],
  },
  "/kategorie/auto-zubehoer": {
    de: ["Auto-, Motorrad- und Fahrzeugzubehör für Wartung und Ausstattung"],
    en: ["Car, Motorcycle and Vehicle Accessories for Maintenance and Equipment"],
  },
  "/kategorie/baugewerbe": {
    de: ["Produkte und Ausstattung für das Baugewerbe"],
    en: ["Products and Equipment for the Construction Industry"],
  },
  "/kategorie/betriebsausstattung-logistik": {
    de: ["Betriebsausstattung für Lager, Werkstatt und Industrie"],
    en: ["Industrial Equipment for Warehouses, Workshops and Industry"],
  },
  "/kategorie/betriebsausstattung-logistik/arbeitskleidung-schutz/helme": {
    de: ["Sicherheitshelme für verschiedene Arbeitsumgebungen"],
    en: ["Safety Helmets for Different Work Environments"],
  },
  "/kategorie/betriebsausstattung-logistik/arbeitskleidung-schutz/schutzkleidung": {
    de: ["Schutzkleidung für verschiedene Arbeitsumgebungen"],
    en: ["Protective Clothing for Different Work Environments"],
  },
  "/kategorie/betriebsausstattung-logistik/arbeitskleidung-schutz/sonstiges": {
    de: ["Sicherheitsausrüstung für Arbeitsplätze"],
    en: ["Safety Equipment for Workplaces"],
  },
  "/kategorie/betriebsausstattung-logistik/betriebseinrichtung/arbeitstische": {
    de: ["Arbeitstische für verschiedene Anwendungen"],
    en: ["Work Tables for Different Applications"],
  },
  "/kategorie/betriebsausstattung-logistik/betriebseinrichtung/sonstiges": {
    de: ["Ausstattung für Arbeitsplätze und Werkstätten"],
    en: ["Equipment for Workplaces and Workshops"],
  },
  "/kategorie/betriebsausstattung-logistik/erste-hilfe/verbandskaesten": {
    de: ["Erste-Hilfe-Ausrüstung für Unternehmen"],
    en: ["First Aid Equipment for Businesses"],
  },
  "/kategorie/betriebsausstattung-logistik/kran-hebetechnik/sonstiges": {
    de: ["Zubehör für Kran- und Hebetechnik"],
    en: ["Accessories for crane and lifting technology"],
  },
  "/kategorie/betriebsausstattung-logistik/lampen-leuchtmittel": {
    de: ["Lampen und Leuchtmittel für Industrie und Gewerbe"],
    en: ["Lamps and light sources for industry and commerce"],
  },
  "/kategorie/betriebsausstattung-logistik/lampen-leuchtmittel/industrieleuchten": {
    de: ["Industriebeleuchtung für verschiedene Anwendungen"],
    en: ["Industrial Lighting for Different Applications"],
  },
  "/kategorie/betriebsausstattung-logistik/lampen-leuchtmittel/led-leuchtmittel": {
    de: ["LED-Beleuchtung für Arbeitsplätze und Unternehmen"],
    en: ["LED Lighting for Workplaces and Businesses"],
  },
  "/kategorie/betriebsausstattung-logistik/lampen-leuchtmittel/sonstiges": {
    de: ["Beleuchtungsprodukte für Arbeitsplätze und Unternehmen"],
    en: ["Lighting Products for Workplaces and Businesses"],
  },
  "/kategorie/betriebsausstattung-logistik/reinigung-hygiene/industriereiniger": {
    de: ["Industriereiniger für verschiedene Anwendungen"],
    en: ["Industrial Cleaners for Different Applications"],
  },
  "/kategorie/betriebsausstattung-logistik/sicherheit/sicherheitskennzeichnung": {
    de: ["Sicherheitskennzeichen für verschiedene Anwendungen"],
    en: ["Safety Signs for Different Applications"],
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
  "/kategorie/ladenausstattung/beleuchtung-werbung/lichtwerbung": {
    de: ["Lichtwerbung für Geschäfte und Unternehmen"],
    en: ["Illuminated signage for shops and businesses"],
  },
  "/kategorie/ladenausstattung/geraete-technik/barcode-scanner": {
    de: ["Barcode-Scanner für Handel, Lager und Logistik"],
    en: ["Barcode scanners for retail, warehousing, and logistics"],
  },
  "/kategorie/ladenausstattung/geraete-technik/waagen": {
    de: ["Waagen für Handel, Verkauf und Industrie"],
    en: ["Scales for trade, retail, and industry"],
  },
  "/kategorie/ladenausstattung/sonstiges": {
    de: ["Sonstige Ladenausstattung für individuelle Anforderungen"],
    en: ["Other store fixtures for individual requirements"],
  },
  "/kategorie/maschinen-anlagen": {
    de: ["Gebrauchte Maschinen und Anlagen für Industrie und Gewerbe"],
    en: ["Used Machines and Equipment for Industry and Commercial Businesses"],
  },
  "/kategorie/metallbearbeitung": {
    de: ["Produkte und Ausstattung für Metallbearbeitung und Schlosserei"],
    en: ["Products and Equipment for Metalworking and Metalworking Workshops"],
  },
  "/kategorie/produktions-industriebedarf/bosch-rexroth": {
    de: ["Bosch Rexroth Komponenten für industrielle Anwendungen"],
    en: ["Bosch Rexroth components for industrial applications"],
  },
  "/kategorie/produktions-industriebedarf/lueftung-klima": {
    de: ["Lüftungs- und Klimatechnik für industrielle Anwendungen"],
    en: ["Ventilation and air conditioning technology for industrial applications"],
  },
  "/kategorie/produktions-industriebedarf/rollen-lenkrollen": {
    de: ["Hochwertige Rollen und Lenkrollen für industrielle Anwendungen"],
    en: ["High-quality wheels and casters for industrial applications"],
  },
  "/kategorie/produktions-industriebedarf/sicherheitstechnik": {
    de: ["Sicherheitstechnik für Industrie und Produktionsbereiche"],
    en: ["Safety technology for industry and production areas"],
  },
  "/kategorie/pumpen-rohrleitungsbau": {
    de: ["Pumpen und Rohrleitungstechnik für industrielle Anwendungen"],
    en: ["Pumps and piping technology for industrial applications"],
  },
  "/kategorie/pumpen-rohrleitungsbau/armaturen": {
    de: ["Armaturen für Pumpen, Rohrleitungen und industrielle Anwendungen"],
    en: ["Valves and Fittings for Pumps, Pipelines and Industrial Applications"],
  },
  "/kategorie/pumpen-rohrleitungsbau/armaturen/absperrklappen": {
    de: ["Absperrklappen für Industrie und Anlagenbau"],
    en: ["Butterfly valves for industry and plant engineering"],
  },
  "/kategorie/pumpen-rohrleitungsbau/armaturen/ventile": {
    de: ["Ventile für Industrie und Anlagenbau"],
    en: ["Valves for Industry and Plant Engineering"],
  },
  "/kategorie/pumpen-rohrleitungsbau/pumpen": {
    de: ["Hochwertige Pumpen für industrielle und technische Anwendungen"],
    en: ["High-quality pumps for industrial and technical applications"],
  },
  "/kategorie/pumpen-rohrleitungsbau/pumpen/dosierpumpen": {
    de: ["Dosierpumpen für präzise Flüssigkeitsdosierung in Industrie und Wasseraufbereitung"],
    en: ["Dosing Pumps for Precise Liquid Dosing in Industry and Water Treatment"],
  },
  "/kategorie/pumpen-rohrleitungsbau/pumpen/kreiselpumpen": {
    de: ["Kreiselpumpen für Industrie, Wasserförderung und effiziente Flüssigkeitsförderung"],
    en: ["Centrifugal Pumps for Industry, Water Conveyance and Efficient Fluid Handling"],
  },
  "/kategorie/pumpen-rohrleitungsbau/pumpen/tauchpumpen": {
    de: ["Tauchpumpen für Entwässerung, Industrie und zuverlässige Flüssigkeitsförderung"],
    en: ["Submersible Pumps for Drainage, Industry and Reliable Fluid Handling"],
  },
  "/kategorie/pumpen-rohrleitungsbau/schlaeuche-leitungen": {
    de: ["Schläuche und Leitungen für industrielle Anwendungen"],
    en: ["Hoses and lines for industrial applications"],
  },
  "/kategorie/pumpen-rohrleitungsbau/schlaeuche-leitungen/rohrleitungen": {
    de: ["Rohrleitungen für verschiedene industrielle Anwendungen"],
    en: ["Piping for various industrial applications"],
  },
  "/kategorie/pumpen-rohrleitungsbau/schlaeuche-leitungen/schlaeuche": {
    de: ["Schläuche für Industrie und Anlagenbau"],
    en: ["Hoses for liquids, gases, and compressed air"],
  },
  "/kategorie/pumpen-rohrleitungsbau/schlaeuche-leitungen/verbindungselemente": {
    de: ["Verbindungselemente für Industrie und Anlagenbau"],
    en: ["Fasteners for industry and plant engineering"],
  },
  "/kategorie/pumpen-rohrleitungsbau/sonstiges": {
    de: ["Sonstige Produkte für Pumpen und Rohrleitungsbau"],
    en: ["Other products for pumps and pipeline construction"],
  },
  "/kategorie/pumpen-rohrleitungsbau/zubehoer-verbindungstechnik": {
    de: ["Zubehör und Verbindungstechnik für Pumpen und Rohrleitungsbau"],
    en: ["Accessories and connection technology for pumps and piping construction"],
  },
  "/kategorie/pumpen-rohrleitungsbau/zubehoer-verbindungstechnik/dichtungen": {
    de: ["Dichtungen für Pumpen und Rohrleitungssysteme"],
    en: ["Seals for pumps and piping systems"],
  },
  "/kategorie/pumpen-rohrleitungsbau/zubehoer-verbindungstechnik/fittings": {
    de: ["Fittings für Rohrleitungen und industrielle Anwendungen"],
    en: ["Fittings for piping systems and industrial applications"],
  },
  "/kategorie/pumpen-rohrleitungsbau/zubehoer-verbindungstechnik/kupplungen": {
    de: ["Kupplungen für Schläuche und Rohrleitungen"],
    en: ["Couplings for hoses and pipelines"],
  },
  "/kategorie/sonstige-branchen-produkte": {
    de: ["Produkte für verschiedene Branchen und industrielle Anwendungen"],
    en: ["Products for Various Industries and Industrial Applications"],
  },
  "/kategorie1": {
    de: ["Produkte für verschiedene Anwendungen"],
    en: ["Products for Different Applications"],
  },
  "/labor-medizintechnik": {
    de: ["Labor- & Medizintechnik günstig online kaufen - große Produktauswahl"],
    en: ["Buy laboratory and medical equipment online at great prices - large product selection"],
  },
  "/labor-medizintechnik/aerztebedarf": {
    de: ["Medizinischer Ärztebedarf für Praxis und Klinik"],
    en: ["Medical supplies for practices and clinics"],
  },
  "/labor-medizintechnik/blutzuckermessgeraete-zubehoer": {
    de: ["Blutzuckermessgeräte und Zubehör für Diabetesdiagnostik"],
    en: ["Blood Glucose Meters and Accessories for Diabetes Diagnostics"],
  },
  "/labor-medizintechnik/chemikalien-reagenzien": {
    de: ["Chemikalien und Reagenzien für Labor und Forschung"],
    en: ["Chemicals and reagents for laboratory and research"],
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
    de: ["Hochwertiges Laborzubehör für professionelle Anwendungen"],
    en: ["High-quality laboratory accessories for professional applications"],
  },
  "/labor-medizintechnik/medizinische-geraete-zubehoer": {
    de: ["Medizinische Geräte und Zubehör für Diagnostik und medizinische Anwendungen"],
    en: ["Medical Devices and Accessories for Diagnostics and Medical Applications"],
  },
  "/labor-medizintechnik/mikroskope": {
    de: ["Mikroskope und Zubehör für Labor und Forschung"],
    en: ["Microscopes and accessories for laboratory and research"],
  },
  "/labor-medizintechnik/physiotherapie-reha-pflege": {
    de: ["Produkte für Physiotherapie, Rehabilitation und Pflege"],
    en: ["Products for physiotherapy, rehabilitation, and care"],
  },
  "/labor-medizintechnik/praxis-klinikeinrichtung": {
    de: ["Praxis- und Klinikeinrichtung für medizinische Anwendungen"],
    en: ["Practice and Clinic Equipment for Medical Applications"],
  },
  "/labor-medizintechnik/stative-zubehoer": {
    de: ["Stative und Zubehör für Labor und Medizintechnik"],
    en: ["Stands and Accessories for Laboratory and Medical Technology"],
  },
  "/laboratory-medical-technology/chemikalien-reagenzien": {
    de: ["Chemikalien und Reagenzien für Laboranwendungen"],
    en: ["Chemicals and reagents for laboratory applications"],
  },
  "/lagerlogistik": {
    de: ["Lösungen für effiziente Lagerlogistik und optimierte Warenbewegung"],
    en: ["Solutions for efficient warehouse logistics and optimized goods movement"],
  },
  "/lagerlogistik/gabelstapler": {
    de: ["Gabelstapler für Lager, Industrie und effizienten Warentransport"],
    en: ["Forklifts for Warehousing, Industry and Efficient Material Handling"],
  },
  "/lagerlogistik/lagerbuehnen": {
    de: ["Zubehör für Lager, Logistik und effiziente Versandprozesse"],
    en: ["Accessories for Warehousing, Logistics and Efficient Shipping Processes"],
  },
  "/lagerlogistik/lagerkaesten": {
    de: ["Lagerkästen und Behältersysteme für Lager, Werkstatt und Industrie"],
    en: ["Storage Boxes and Container Systems for Warehouses, Workshops and Industry"],
  },
  "/lagerlogistik/lauf-foerderbaender": {
    de: ["Rollen- und Förderbänder für Lager, Logistik und effizienten Materialtransport"],
    en: ["Roller and Conveyor Systems for Warehousing, Logistics and Efficient Material Handling"],
  },
  "/lagerlogistik/paternoster": {
    de: ["Paternoster-Lagersysteme für platzsparende und effiziente Lagerung"],
    en: ["Paternoster Storage Systems for Space-Saving and Efficient Warehousing"],
  },
  "/lagerlogistik/regale": {
    de: ["Regalsysteme für Lager, Werkstatt, Betrieb und Industrie"],
    en: ["Shelving Systems for Warehouses, Workshops, Businesses and Industry"],
  },
  "/lagerlogistik/regale/vertikalregale": {
    de: ["Vertikalregale für Lager, Produktion und Industrie"],
    en: ["Vertical shelving for warehousing, production, and industry"],
  },
  "/lagerlogistik/transportwagen": {
    de: ["Transportwagen für Lager, Werkstatt, Versand und innerbetrieblichen Transport"],
    en: ["Transport Carts for Warehouses, Workshops, Shipping and Internal Material Handling"],
  },
  "/lagerlogistik/versand-verpackung": {
    de: ["Versand- und Verpackungslösungen für Lager, Logistik und E-Commerce"],
    en: ["Shipping and Packaging Solutions for Warehousing, Logistics and E-Commerce"],
  },
  "/lagerlogistik/versand-verpackung/umreifungsgeraete": {
    de: ["Umreifungsgeräte für sichere und effiziente Transportsicherung"],
    en: ["Strapping Machines for Safe and Efficient Transport Securing"],
  },
  "/lagerlogistik/versand-verpackung/umreifungsgeraete/palettenwickler": {
    de: ["Palettenwickler für sicheres und effizientes Verpacken von Paletten"],
    en: ["Pallet Wrappers for Safe and Efficient Pallet Packaging"],
  },
  "/lagerlogistik/versand-verpackung/umreifungsgeraete/palettenwickler/stretchmaschinen": {
    de: ["Stretchmaschinen für effizientes Verpacken und sichere Ladungssicherung"],
    en: ["Stretch Wrapping Machines for Efficient Packaging and Secure Load Stabilization"],
  },
  "/lagerlogistik/zubehoer": {
    de: ["Zubehör für Lager, Logistik und effiziente Versandprozesse"],
    en: ["Accessories for Warehousing, Logistics and Efficient Shipping Processes"],
  },
};
