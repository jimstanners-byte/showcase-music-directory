-- Update all categories with comprehensive search_terms from extract-4.docx

-- Acoustic Services
UPDATE public.categories SET search_terms = ARRAY['acoustic consultants', 'sound insulation', 'noise control', 'acoustic panels', 'soundproofing', 'acoustic treatment', 'room acoustics', 'noise assessment', 'sound absorption', 'acoustic design'] WHERE slug = 'acoustic-services';

-- Backline & Musical Instrument Hire
UPDATE public.categories SET search_terms = ARRAY['backline hire', 'instrument rental', 'guitar hire', 'drum kit hire', 'keyboard hire', 'bass hire', 'amplifier hire', 'musical equipment', 'band equipment', 'stage instruments', 'percussion hire', 'orchestral instruments'] WHERE slug = 'backline-musical-instrument-hire';

-- Barriers & Crowd Control
UPDATE public.categories SET search_terms = ARRAY['crowd barriers', 'pedestrian barriers', 'crowd control', 'event barriers', 'safety barriers', 'metal barriers', 'plastic barriers', 'retractable barriers', 'queue management', 'crowd management', 'fencing hire', 'heras fencing'] WHERE slug = 'barriers-crowd-control';

-- Booking Agents
UPDATE public.categories SET search_terms = ARRAY['artist booking', 'talent agents', 'entertainment booking', 'band booking', 'artist management', 'entertainment agency', 'live music booking', 'performer booking', 'event entertainment', 'celebrity booking'] WHERE slug = 'booking-agents';

-- Bus & Coach Hire
UPDATE public.categories SET search_terms = ARRAY['tour bus hire', 'coach hire', 'band transport', 'crew transport', 'sleeper bus', 'nightliner', 'tour coach', 'artist transport', 'festival transport', 'event transport', 'minibus hire', 'executive coach'] WHERE slug = 'bus-coach-hire';

-- Cabins & Portable Buildings
UPDATE public.categories SET search_terms = ARRAY['portable cabins', 'site offices', 'welfare units', 'portable toilets', 'dressing rooms', 'production offices', 'temporary buildings', 'modular buildings', 'event cabins', 'crew facilities'] WHERE slug = 'cabins-portable-buildings';

-- Catering
UPDATE public.categories SET search_terms = ARRAY['event catering', 'festival catering', 'crew catering', 'mobile catering', 'outdoor catering', 'corporate catering', 'production catering', 'backstage catering', 'artist catering', 'hospitality catering'] WHERE slug = 'catering';

-- Communication & Radio Systems
UPDATE public.categories SET search_terms = ARRAY['two-way radios', 'walkie talkies', 'radio hire', 'communication systems', 'intercom systems', 'radio networks', 'event communications', 'crew radios', 'production comms', 'wireless communication'] WHERE slug = 'communication-radio-systems';

-- Concert Promoters
UPDATE public.categories SET search_terms = ARRAY['concert promotion', 'event promoters', 'live music promoters', 'festival promoters', 'gig promoters', 'show promoters', 'tour promoters', 'entertainment promoters', 'music events', 'live entertainment'] WHERE slug = 'concert-promoters';

-- Crewing
UPDATE public.categories SET search_terms = ARRAY['stage crew', 'event crew', 'production crew', 'technical crew', 'roadies', 'stagehands', 'riggers', 'crew hire', 'freelance crew', 'touring crew', 'local crew', 'show crew'] WHERE slug = 'crewing';

-- Drapes, Backdrops & Starcloth
UPDATE public.categories SET search_terms = ARRAY['stage drapes', 'backdrops', 'starcloth', 'stage curtains', 'theatrical drapes', 'event draping', 'fabric backdrops', 'LED starcloth', 'velvet drapes', 'cyclorama', 'stage masking', 'pipe and drape'] WHERE slug = 'drapes-backdrops-starcloth';

-- Equipment Repair & Maintenance
UPDATE public.categories SET search_terms = ARRAY['equipment repair', 'audio repair', 'lighting repair', 'equipment servicing', 'maintenance services', 'technical support', 'equipment testing', 'PAT testing', 'equipment inspection', 'repair services'] WHERE slug = 'equipment-repair-maintenance';

-- Festival & Outdoor Event Services
UPDATE public.categories SET search_terms = ARRAY['festival services', 'outdoor events', 'festival production', 'outdoor production', 'festival infrastructure', 'event services', 'festival management', 'outdoor staging', 'festival facilities', 'greenfield events'] WHERE slug = 'festival-outdoor-event-services';

-- Flight Cases
UPDATE public.categories SET search_terms = ARRAY['flight cases', 'road cases', 'equipment cases', 'touring cases', 'custom cases', 'rack cases', 'keyboard cases', 'drum cases', 'protective cases', 'transport cases', 'ATA cases'] WHERE slug = 'flight-cases';

-- Gaffer & Adhesive Tape
UPDATE public.categories SET search_terms = ARRAY['gaffer tape', 'adhesive tape', 'duct tape', 'cable tape', 'floor tape', 'marking tape', 'cloth tape', 'PVC tape', 'hazard tape', 'spike tape', 'console tape'] WHERE slug = 'gaffer-adhesive-tape';

-- Generators & Power Distribution
UPDATE public.categories SET search_terms = ARRAY['generator hire', 'power distribution', 'temporary power', 'event power', 'portable generators', 'diesel generators', 'power cables', 'distribution boards', 'electrical supply', 'silent generators', 'festival power'] WHERE slug = 'generators-power-distribution';

-- Ground Protection & Temporary Roadways
UPDATE public.categories SET search_terms = ARRAY['ground protection', 'temporary roadways', 'trackway', 'ground mats', 'event flooring', 'temporary flooring', 'grass protection', 'access roads', 'aluminium trackway', 'plastic trackway'] WHERE slug = 'ground-protection-temporary-roadways';

-- Health & Safety Consultants
UPDATE public.categories SET search_terms = ARRAY['health and safety', 'safety consultants', 'event safety', 'risk assessment', 'safety management', 'crowd safety', 'fire safety', 'safety officers', 'safety planning', 'compliance'] WHERE slug = 'health-safety-consultants';

-- Heating & Air Conditioning
UPDATE public.categories SET search_terms = ARRAY['temporary heating', 'air conditioning hire', 'HVAC hire', 'event cooling', 'portable heating', 'climate control', 'industrial heating', 'marquee heating', 'tent heating', 'cooling systems'] WHERE slug = 'heating-air-conditioning';

-- Installation Services
UPDATE public.categories SET search_terms = ARRAY['AV installation', 'sound installation', 'lighting installation', 'permanent installation', 'system installation', 'audio installation', 'video installation', 'technical installation', 'equipment installation'] WHERE slug = 'installation-services';

-- Insurance
UPDATE public.categories SET search_terms = ARRAY['event insurance', 'equipment insurance', 'public liability', 'employers liability', 'cancellation insurance', 'entertainment insurance', 'tour insurance', 'festival insurance', 'production insurance'] WHERE slug = 'insurance';

-- Large Screen Display (renamed from Large Format LED Screens)
UPDATE public.categories SET name = 'Large Screen Display', slug = 'large-screen-display', search_terms = ARRAY['LED screens', 'video walls', 'large format displays', 'outdoor LED', 'indoor LED screens', 'LED panels', 'video screens', 'display screens', 'digital displays', 'projection screens', 'AV equipment hire', 'projectors', 'projector hire', 'screen hire', 'display hire', 'video display', 'festival screens', 'concert screens', 'event screens', 'mobile LED', 'LED trailer', 'outdoor screens', 'indoor screens', 'high resolution LED', 'modular LED', 'curved LED', 'transparent LED', 'rental LED', 'touring LED', 'broadcast screens'] WHERE slug = 'large-format-led-screens';

-- Lasers
UPDATE public.categories SET search_terms = ARRAY['laser shows', 'laser displays', 'laser effects', 'laser hire', 'laser rental', 'concert lasers', 'event lasers', 'laser programming', 'laser operators', 'RGB lasers', 'laser projectors'] WHERE slug = 'lasers';

-- Legal Services
UPDATE public.categories SET search_terms = ARRAY['entertainment lawyers', 'music lawyers', 'contract lawyers', 'legal advice', 'music contracts', 'licensing', 'intellectual property', 'copyright', 'entertainment law', 'event contracts'] WHERE slug = 'legal-services';

-- Lighting Hire
UPDATE public.categories SET search_terms = ARRAY['lighting hire', 'stage lighting', 'event lighting', 'concert lighting', 'moving heads', 'LED lighting', 'theatrical lighting', 'intelligent lighting', 'lighting rental', 'lighting design', 'lighting rigs', 'follow spots', 'PAR cans', 'wash lights', 'spot lights', 'beam lights', 'strobe lights', 'UV lighting', 'festoon lighting', 'outdoor lighting'] WHERE slug = 'lighting-hire';

-- Marquees & Temporary Structures
UPDATE public.categories SET search_terms = ARRAY['marquee hire', 'temporary structures', 'event tents', 'festival tents', 'clearspan structures', 'frame tents', 'stretch tents', 'pagodas', 'party tents', 'outdoor structures', 'tensile structures', 'dome structures'] WHERE slug = 'marquees-temporary-structures';

-- Mastering
UPDATE public.categories SET search_terms = ARRAY['audio mastering', 'music mastering', 'vinyl mastering', 'CD mastering', 'digital mastering', 'stem mastering', 'online mastering', 'mastering studios', 'mastering engineers', 'professional mastering'] WHERE slug = 'mastering';

-- Merchandise
UPDATE public.categories SET search_terms = ARRAY['band merchandise', 'tour merchandise', 'event merchandise', 'promotional products', 't-shirt printing', 'merch design', 'merchandise fulfilment', 'festival merchandise', 'branded merchandise', 'artist merchandise'] WHERE slug = 'merchandise';

-- Mobile Stages
UPDATE public.categories SET search_terms = ARRAY['mobile stage hire', 'portable stages', 'trailer stages', 'outdoor stages', 'festival stages', 'event stages', 'concert stages', 'stage trucks', 'covered stages', 'stage hire'] WHERE slug = 'mobile-stages';

-- Mobile Toilets
UPDATE public.categories SET search_terms = ARRAY['portable toilets', 'toilet hire', 'event toilets', 'festival toilets', 'luxury toilets', 'toilet trailers', 'welfare facilities', 'urinals', 'accessible toilets', 'VIP toilets'] WHERE slug = 'mobile-toilets';

-- PA Hire
UPDATE public.categories SET search_terms = ARRAY['PA hire', 'sound system hire', 'speaker hire', 'audio hire', 'PA rental', 'concert sound', 'festival PA', 'line array', 'subwoofers', 'monitors', 'sound reinforcement', 'live sound', 'outdoor PA', 'indoor PA'] WHERE slug = 'pa-hire';

-- Packaging
UPDATE public.categories SET search_terms = ARRAY['CD packaging', 'vinyl packaging', 'merchandise packaging', 'product packaging', 'packaging design', 'custom packaging', 'eco packaging', 'retail packaging', 'gift packaging'] WHERE slug = 'packaging';

-- Passes & Laminates
UPDATE public.categories SET search_terms = ARRAY['event passes', 'laminates', 'access passes', 'backstage passes', 'wristbands', 'credentials', 'ID badges', 'event accreditation', 'lanyard printing', 'pass printing'] WHERE slug = 'passes-laminates';

-- Photographers
UPDATE public.categories SET search_terms = ARRAY['event photographers', 'concert photographers', 'music photographers', 'festival photographers', 'live music photography', 'press photographers', 'promotional photography', 'band photography', 'tour photography'] WHERE slug = 'photographers';

-- Piano Hire
UPDATE public.categories SET search_terms = ARRAY['piano hire', 'grand piano hire', 'upright piano hire', 'keyboard hire', 'digital piano hire', 'stage piano', 'concert piano', 'piano rental', 'event piano'] WHERE slug = 'piano-hire';

-- Piano Tuners
UPDATE public.categories SET search_terms = ARRAY['piano tuning', 'piano tuners', 'piano technicians', 'piano maintenance', 'concert tuning', 'piano repair', 'piano restoration', 'keyboard technicians'] WHERE slug = 'piano-tuners';

-- Post Production Audio
UPDATE public.categories SET search_terms = ARRAY['post production', 'audio post', 'mixing', 'audio editing', 'sound design', 'ADR', 'foley', 'audio restoration', 'broadcast audio', 'podcast editing'] WHERE slug = 'post-production-audio';

-- Pyrotechnics & Special Effects
UPDATE public.categories SET search_terms = ARRAY['pyrotechnics', 'fireworks', 'special effects', 'SFX', 'stage pyro', 'concert pyro', 'CO2 effects', 'confetti', 'streamers', 'smoke effects', 'flame effects', 'cryogenics'] WHERE slug = 'pyrotechnics-special-effects';

-- Rigging
UPDATE public.categories SET search_terms = ARRAY['rigging services', 'stage rigging', 'arena rigging', 'truss hire', 'rigging equipment', 'motor hire', 'chain hoists', 'ground support', 'flying systems', 'load monitoring', 'rigging crew'] WHERE slug = 'rigging';

-- Scenery & Set Design
UPDATE public.categories SET search_terms = ARRAY['set design', 'scenery construction', 'stage design', 'scenic design', 'prop making', 'set building', 'theatrical scenery', 'event design', 'exhibition stands', 'custom sets'] WHERE slug = 'scenery-set-design';

-- Seating & Grandstands
UPDATE public.categories SET search_terms = ARRAY['seating hire', 'grandstand hire', 'tiered seating', 'bleacher hire', 'tribune seating', 'audience seating', 'temporary seating', 'event seating', 'stadium seating', 'VIP seating'] WHERE slug = 'seating-grandstands';

-- Security
UPDATE public.categories SET search_terms = ARRAY['event security', 'festival security', 'door security', 'crowd management', 'security guards', 'SIA licensed', 'venue security', 'concert security', 'close protection', 'access control'] WHERE slug = 'security';

-- Signage
UPDATE public.categories SET search_terms = ARRAY['event signage', 'festival signage', 'wayfinding', 'banner printing', 'vinyl graphics', 'digital signage', 'directional signs', 'safety signage', 'branded signage', 'temporary signage'] WHERE slug = 'signage';

-- Sound Engineers
UPDATE public.categories SET search_terms = ARRAY['sound engineers', 'FOH engineers', 'monitor engineers', 'live sound engineers', 'audio engineers', 'mixing engineers', 'touring engineers', 'freelance engineers', 'broadcast engineers'] WHERE slug = 'sound-engineers';

-- Special Effects
UPDATE public.categories SET search_terms = ARRAY['special effects', 'SFX hire', 'stage effects', 'event effects', 'fog machines', 'haze machines', 'snow effects', 'bubble machines', 'confetti cannons', 'wind machines', 'rain effects'] WHERE slug = 'special-effects';

-- Splitter Vans
UPDATE public.categories SET search_terms = ARRAY['splitter vans', 'band transport', 'crew vans', 'tour vehicles', 'minibus hire', 'transit vans', 'equipment transport', 'backline transport', 'touring vehicles'] WHERE slug = 'splitter-vans';

-- Staging
UPDATE public.categories SET search_terms = ARRAY['stage hire', 'staging systems', 'modular staging', 'event staging', 'concert staging', 'portable staging', 'stage decks', 'stage platforms', 'stage risers', 'drum risers', 'runway staging'] WHERE slug = 'staging';

-- Studios
UPDATE public.categories SET search_terms = ARRAY['recording studios', 'music studios', 'rehearsal studios', 'production studios', 'mixing studios', 'tracking studios', 'residential studios', 'commercial studios', 'project studios'] WHERE slug = 'studios';

-- Ticketing
UPDATE public.categories SET search_terms = ARRAY['ticketing services', 'ticket sales', 'box office', 'online ticketing', 'ticket printing', 'event ticketing', 'ticket distribution', 'ticketing systems', 'RFID ticketing', 'mobile ticketing'] WHERE slug = 'ticketing';

-- Tour Management
UPDATE public.categories SET search_terms = ARRAY['tour management', 'tour managers', 'production management', 'artist management', 'tour coordination', 'touring services', 'road management', 'tour logistics'] WHERE slug = 'tour-management';

-- Travel Agents
UPDATE public.categories SET search_terms = ARRAY['entertainment travel', 'tour travel', 'band travel', 'crew travel', 'artist travel', 'flight booking', 'hotel booking', 'tour accommodation', 'travel management'] WHERE slug = 'travel-agents';

-- Trucking
UPDATE public.categories SET search_terms = ARRAY['tour trucking', 'equipment transport', 'haulage', 'truck hire', 'artic hire', 'trailer hire', 'logistics', 'freight', 'touring trucks', 'production transport'] WHERE slug = 'trucking';

-- UK Location Recording
UPDATE public.categories SET search_terms = ARRAY['location recording', 'mobile recording', 'live recording', 'remote recording', 'field recording', 'outside broadcast', 'OB recording', 'concert recording', 'festival recording', 'gig recording', 'live gig recordings', 'live gig broadcast', 'on-location audio', 'multi-track recording'] WHERE slug = 'uk-location-recording';

-- Video & Film Production
UPDATE public.categories SET search_terms = ARRAY['video production', 'film production', 'music videos', 'concert filming', 'live streaming', 'broadcast production', 'corporate video', 'event filming', 'documentary production', 'promotional videos'] WHERE slug = 'video-film-production';

-- Waste Management
UPDATE public.categories SET search_terms = ARRAY['waste management', 'event waste', 'recycling', 'skip hire', 'waste collection', 'festival waste', 'bin hire', 'litter picking', 'waste disposal', 'sustainable waste'] WHERE slug = 'waste-management';