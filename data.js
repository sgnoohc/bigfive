// Big Five personality profiles for famous people
// Estimated by Claude based on biographies, writings, documented behavior, and public persona
//
// Scores are on a 1-100 scale (percentile-like)
// Each domain has 6 facets matching the IPIP-NEO-PI framework

const DOMAIN_INFO = {
  O: {
    name: "Openness to Experience",
    short: "Openness",
    color: "#8b5cf6",
    description: "Reflects imagination, curiosity, and willingness to explore new ideas and experiences.",
    facets: ["Imagination", "Artistic Interests", "Emotionality", "Adventurousness", "Intellect", "Liberalism"]
  },
  C: {
    name: "Conscientiousness",
    short: "Conscientiousness",
    color: "#10b981",
    description: "Reflects organization, dependability, self-discipline, and goal-directed behavior.",
    facets: ["Self-Efficacy", "Orderliness", "Dutifulness", "Achievement-Striving", "Self-Discipline", "Cautiousness"]
  },
  E: {
    name: "Extraversion",
    short: "Extraversion",
    color: "#f59e0b",
    description: "Reflects sociability, assertiveness, positive emotions, and energy drawn from others.",
    facets: ["Friendliness", "Gregariousness", "Assertiveness", "Activity Level", "Excitement-Seeking", "Cheerfulness"]
  },
  A: {
    name: "Agreeableness",
    short: "Agreeableness",
    color: "#3b82f6",
    description: "Reflects trust, altruism, cooperation, and concern for social harmony.",
    facets: ["Trust", "Morality", "Altruism", "Cooperation", "Modesty", "Sympathy"]
  },
  N: {
    name: "Neuroticism",
    short: "Neuroticism",
    color: "#ef4444",
    description: "Reflects emotional instability, anxiety, moodiness, and vulnerability to stress.",
    facets: ["Anxiety", "Anger", "Depression", "Self-Consciousness", "Immoderation", "Vulnerability"]
  }
};

const PEOPLE = [
  {
    id: "einstein",
    name: "Albert Einstein",
    years: "1879-1955",
    tagline: "Theoretical physicist who reimagined space, time, and reality",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/220px-Albert_Einstein_Head.jpg",
    scores: {
      O: { domain: 95, facets: [98, 70, 60, 75, 99, 90] },
      C: { domain: 35, facets: [70, 10, 25, 80, 20, 15] },
      E: { domain: 40, facets: [55, 25, 45, 40, 30, 60] },
      A: { domain: 65, facets: [60, 70, 65, 55, 75, 70] },
      N: { domain: 35, facets: [30, 25, 30, 35, 40, 45] }
    },
    rationale: {
      O: "Einstein epitomized intellectual curiosity. His thought experiments revolutionized physics, and he had deep interests in philosophy and music. His imagination score is near-maximum \u2014 he literally imagined riding a beam of light. Orderliness was famously low (messy desk, lost socks), but his achievement-striving was intense in his domain.",
      C: "Famously disorganized in daily life. His desk was legendarily cluttered, he often forgot practical matters, and he resisted rigid structure. However, his intellectual work showed extraordinary persistence and self-efficacy \u2014 he spent a decade developing general relativity.",
      E: "Einstein was sociable enough but preferred small circles and solitary thought. He enjoyed witty conversation and had many friendships, but was not gregarious. He could be assertive in intellectual debates but was generally mild-mannered.",
      A: "Generally kind, humanitarian, and modest about his fame. He championed pacifism and civil rights. However, his personal relationships (especially his first marriage) showed he could be emotionally distant and uncooperative in domestic matters.",
      N: "Remarkably emotionally stable for someone living through two world wars and political exile. He maintained humor and equanimity through extraordinary upheaval. Some vulnerability around his complicated family relationships."
    }
  },
  {
    id: "curie",
    name: "Marie Curie",
    years: "1867-1934",
    tagline: "Pioneer of radioactivity research and two-time Nobel laureate",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Marie_Curie_c._1920s.jpg/220px-Marie_Curie_c._1920s.jpg",
    scores: {
      O: { domain: 88, facets: [80, 60, 55, 75, 95, 70] },
      C: { domain: 92, facets: [90, 85, 95, 98, 90, 80] },
      E: { domain: 25, facets: [30, 15, 35, 45, 10, 20] },
      A: { domain: 55, facets: [45, 85, 70, 40, 65, 50] },
      N: { domain: 45, facets: [50, 30, 55, 55, 25, 50] }
    },
    rationale: {
      O: "Curie's intellectual curiosity drove her into a completely uncharted field. She was deeply analytical and drawn to scientific mystery. Her adventurousness showed in moving from Poland to Paris alone as a young woman in the 1890s.",
      C: "Extraordinarily disciplined. She worked with radioactive materials in grueling conditions for years, meticulously recording data. Her achievement-striving was among the highest imaginable \u2014 the first person to win two Nobel Prizes in different sciences.",
      E: "Curie was reserved, private, and intensely focused. She avoided the spotlight even as fame grew. She had close relationships but preferred small, intimate settings over public gatherings.",
      A: "Deeply moral and dutiful in her scientific work, generous with knowledge. But she could be stubborn and uncompromising, and faced social conflicts (the Langevin affair scandal) with fierce independence rather than accommodation.",
      N: "Showed resilience through extraordinary adversity \u2014 poverty, sexism, her husband's death, public scandal. Some depressive episodes after Pierre's death, but generally stoic. Her relentless work may have been partly driven by anxiety."
    }
  },
  {
    id: "jobs",
    name: "Steve Jobs",
    years: "1955-2011",
    tagline: "Visionary co-founder of Apple who fused technology with design",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/220px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg",
    scores: {
      O: { domain: 92, facets: [95, 98, 55, 80, 85, 70] },
      C: { domain: 82, facets: [95, 75, 50, 98, 85, 40] },
      E: { domain: 75, facets: [35, 50, 95, 85, 70, 40] },
      A: { domain: 18, facets: [20, 25, 15, 10, 5, 30] },
      N: { domain: 60, facets: [50, 85, 40, 30, 55, 35] }
    },
    rationale: {
      O: "Jobs had extraordinary aesthetic vision and imagination. He saw connections between calligraphy and computer fonts, Zen Buddhism and product design. His artistic interests score is near-maximum \u2014 design wasn't decoration, it was the product.",
      C: "Obsessively driven toward his vision with incredible achievement-striving. He demanded perfection and worked relentlessly. However, dutifulness to social norms was low, and cautiousness was minimal \u2014 he took enormous risks.",
      E: "Highly assertive and energetic, Jobs dominated rooms and stages. But he wasn't warm or gregarious \u2014 his extraversion was channeled through intensity and persuasion (his 'reality distortion field'), not friendliness.",
      A: "Famously difficult. He berated employees, parked in handicap spots, denied paternity of his daughter for years. Trust and cooperation scores are very low. He was direct to the point of cruelty, believing brutal honesty served excellence.",
      N: "Prone to intense anger and emotional volatility. He could cry in meetings and rage at perceived incompetence. But he also showed remarkable composure in crises (being fired from Apple, cancer diagnosis)."
    }
  },
  {
    id: "gandhi",
    name: "Mahatma Gandhi",
    years: "1869-1948",
    tagline: "Leader of Indian independence through nonviolent civil disobedience",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Mahatma-Gandhi%2C_studio%2C_1931.jpg/220px-Mahatma-Gandhi%2C_studio%2C_1931.jpg",
    scores: {
      O: { domain: 72, facets: [65, 40, 60, 70, 80, 85] },
      C: { domain: 88, facets: [90, 80, 95, 90, 92, 75] },
      E: { domain: 60, facets: [65, 45, 80, 70, 25, 55] },
      A: { domain: 78, facets: [70, 95, 90, 50, 85, 80] },
      N: { domain: 30, facets: [25, 20, 25, 35, 20, 45] }
    },
    rationale: {
      O: "Gandhi was intellectually open \u2014 drawing from Hindu philosophy, Tolstoy, Thoreau, and Christianity to forge his unique approach. His liberalism was high (challenging the entire colonial system). Less interested in art or pure abstraction.",
      C: "Extremely disciplined. His life was governed by strict routines, fasting regimens, and moral codes. His dutifulness to his principles was absolute \u2014 he would rather die than compromise on nonviolence.",
      E: "Gandhi was assertive and could command massive crowds, but he was not naturally gregarious. He sought solitude for reflection and maintained a monk-like austerity. His assertiveness came from moral conviction, not social energy.",
      A: "Deeply altruistic and sympathetic, with strong moral convictions. However, cooperation could be low \u2014 he was famously stubborn and inflexible on matters of principle, even with allies. Modesty in personal lifestyle was extreme.",
      N: "Remarkably emotionally stable under extraordinary pressure \u2014 imprisonment, beatings, political crises. His equanimity was cultivated through spiritual practice. Some vulnerability around his complicated family relationships."
    }
  },
  {
    id: "kahlo",
    name: "Frida Kahlo",
    years: "1907-1954",
    tagline: "Mexican artist who turned pain and identity into iconic self-portraits",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Frida_Kahlo%2C_by_Guillermo_Kahlo.jpg/220px-Frida_Kahlo%2C_by_Guillermo_Kahlo.jpg",
    scores: {
      O: { domain: 96, facets: [98, 99, 95, 80, 75, 90] },
      C: { domain: 55, facets: [70, 30, 45, 80, 40, 30] },
      E: { domain: 72, facets: [75, 70, 65, 55, 85, 60] },
      A: { domain: 45, facets: [35, 50, 55, 30, 40, 70] },
      N: { domain: 75, facets: [70, 65, 80, 55, 80, 85] }
    },
    rationale: {
      O: "Kahlo's imagination and artistic interests are near-maximum. She created an entirely personal visual language fusing Mexican folk art, surrealism, and raw autobiography. Her emotionality in art was unparalleled \u2014 she painted her pain, literally.",
      C: "Despite chronic pain and disability, Kahlo showed remarkable achievement-striving in her art. But her personal life was chaotic \u2014 tumultuous relationships, heavy drinking, and impulsive decisions. Low orderliness and cautiousness.",
      E: "Kahlo was magnetic and sociable, hosting legendary gatherings and attracting a wide circle of artists, intellectuals, and lovers. She was excitement-seeking and adventurous in her relationships and politics.",
      A: "Fiercely independent and not naturally cooperative. She could be confrontational and jealous. But she also showed deep sympathy for the poor and was politically committed to workers' causes. Trust was low after Diego Rivera's repeated infidelities.",
      N: "Suffered enormously \u2014 a devastating bus accident, 30+ surgeries, chronic pain, miscarriages, and a turbulent marriage. Her art is a direct expression of this emotional intensity. Depression and vulnerability were lifelong companions."
    }
  },
  {
    id: "davinci",
    name: "Leonardo da Vinci",
    years: "1452-1519",
    tagline: "Renaissance polymath \u2014 artist, inventor, scientist, and visionary",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Leonardo_da_Vinci_%281452-1519%29_-_presumed_self-portrait_-_Royal_Library_of_Turin.jpg/220px-Leonardo_da_Vinci_%281452-1519%29_-_presumed_self-portrait_-_Royal_Library_of_Turin.jpg",
    scores: {
      O: { domain: 99, facets: [99, 98, 70, 90, 99, 80] },
      C: { domain: 30, facets: [60, 20, 20, 50, 15, 25] },
      E: { domain: 50, facets: [55, 40, 45, 60, 50, 55] },
      A: { domain: 65, facets: [55, 65, 60, 60, 70, 80] },
      N: { domain: 35, facets: [35, 25, 40, 40, 35, 30] }
    },
    rationale: {
      O: "Perhaps the most open human in recorded history. Leonardo's curiosity was literally boundless \u2014 he studied anatomy, flight, hydraulics, optics, botany, geology, and art with equal passion. His notebooks contain thousands of pages of observations and inventions.",
      C: "Leonardo was a legendary procrastinator and non-finisher. The Mona Lisa took ~16 years. He abandoned commissions constantly. His notebooks are full of half-developed ideas. Achievement-striving existed but was scattered across too many interests.",
      E: "Moderately social. He was well-liked at court, had apprentices and companions, and was described as charming. But he was also deeply private, kept coded notebooks, and spent long periods in solitary study.",
      A: "Generally described as gentle, kind, and vegetarian (unusual for the era) out of sympathy for animals. He avoided conflict and was cooperative with patrons, though he frustrated them by not finishing work.",
      N: "Relatively stable emotionally despite the challenges of his era. Some anxiety about his work and legacy, but generally maintained equanimity. His curiosity seemed to provide a constant source of positive engagement."
    }
  },
  {
    id: "napoleon",
    name: "Napoleon Bonaparte",
    years: "1769-1821",
    tagline: "Military genius and Emperor who reshaped Europe",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg/220px-Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg",
    scores: {
      O: { domain: 70, facets: [65, 35, 40, 80, 75, 55] },
      C: { domain: 88, facets: [95, 80, 60, 98, 85, 55] },
      E: { domain: 90, facets: [50, 65, 98, 95, 80, 55] },
      A: { domain: 15, facets: [15, 20, 10, 10, 5, 25] },
      N: { domain: 40, facets: [25, 55, 30, 15, 50, 35] }
    },
    rationale: {
      O: "Napoleon was intellectually curious and a voracious reader, but his imagination served practical ends \u2014 military strategy, legal reform, administration. He reorganized European governance (Napoleonic Code) but wasn't artistically inclined.",
      C: "Extraordinarily driven and organized. He could dictate multiple letters simultaneously, managed vast military campaigns with precision, and worked 18-hour days. His achievement-striving is near-maximum. Cautiousness was lower \u2014 he took enormous strategic gambles.",
      E: "Massively extraverted in assertiveness and activity. He dominated every room, inspired fierce loyalty, and had boundless energy. But he wasn't warm or friendly in the conventional sense \u2014 his charisma was commanding, not inviting.",
      A: "Very low. Napoleon was ruthless, manipulative, and viewed people as instruments. He crowned himself Emperor, betrayed allies, and sacrificed hundreds of thousands of soldiers for his ambitions. Modesty was essentially nonexistent.",
      N: "Generally cool under pressure \u2014 legendary battlefield composure. But showed increasing emotional volatility later in his career (angry outbursts, impulsive decisions like invading Russia). Some immoderation in his ambitions."
    }
  },
  {
    id: "teresa",
    name: "Mother Teresa",
    years: "1910-1997",
    tagline: "Catholic nun devoted to serving the poorest of the poor in Calcutta",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Mother_Teresa_1.jpg/220px-Mother_Teresa_1.jpg",
    scores: {
      O: { domain: 40, facets: [35, 30, 55, 35, 40, 20] },
      C: { domain: 90, facets: [85, 80, 98, 90, 92, 85] },
      E: { domain: 55, facets: [70, 45, 60, 65, 15, 55] },
      A: { domain: 88, facets: [75, 95, 98, 70, 90, 95] },
      N: { domain: 40, facets: [50, 15, 55, 40, 15, 45] }
    },
    rationale: {
      O: "Mother Teresa was not intellectually experimental or artistically inclined. Her worldview was rooted in traditional Catholic faith. She was not liberal or adventurous in ideas \u2014 her strength was unwavering commitment to a fixed moral framework.",
      C: "Exceptionally disciplined. She built a global organization (Missionaries of Charity) from nothing, maintained rigorous daily routines of prayer and service, and showed extraordinary dutifulness to her vocation for over 50 years.",
      E: "Moderately extraverted \u2014 she was comfortable speaking to crowds and world leaders, and was warm and friendly. But she was not excitement-seeking or gregarious. Her energy came from purpose, not social stimulation.",
      A: "Very high altruism, morality, and sympathy \u2014 these defined her life. She devoted herself entirely to others' suffering. Modesty was genuine. Cooperation was sometimes lower when her convictions clashed with institutional expectations.",
      N: "Publicly serene, but her private letters (published posthumously) revealed decades of spiritual darkness, doubt, and feelings of abandonment by God. This hidden anguish suggests higher depression than her public persona indicated."
    }
  },
  {
    id: "cleopatra",
    name: "Cleopatra VII",
    years: "69-30 BC",
    tagline: "Last pharaoh of Egypt \u2014 polyglot diplomat who shaped the ancient world",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Kleopatra-VII.-Altes-Museum-Berlin1.jpg/220px-Kleopatra-VII.-Altes-Museum-Berlin1.jpg",
    scores: {
      O: { domain: 80, facets: [75, 55, 60, 80, 85, 65] },
      C: { domain: 78, facets: [85, 70, 65, 90, 80, 55] },
      E: { domain: 85, facets: [70, 75, 90, 80, 75, 65] },
      A: { domain: 35, facets: [25, 30, 35, 25, 20, 55] },
      N: { domain: 40, facets: [35, 45, 35, 30, 50, 45] }
    },
    rationale: {
      O: "Cleopatra spoke nine languages, studied philosophy and science, and was one of the most educated rulers of the ancient world. She was intellectually curious and adaptive, blending Egyptian and Greco-Roman cultures strategically.",
      C: "Highly effective administrator who managed Egypt's economy and complex foreign relations. Strong achievement-striving and self-efficacy \u2014 she maintained Egypt's independence for two decades against Rome's expansion. Less cautious in personal gambles.",
      E: "Charismatic and assertive. Ancient sources emphasize her compelling presence, wit, and ability to captivate powerful men (Caesar, Antony). She was socially adept and politically active, not a recluse.",
      A: "A political survivor in the ruthless Ptolemaic dynasty (which routinely murdered family members). She likely had her siblings killed to secure power. Trust and cooperation were low by necessity. But sympathy for her people appears genuine.",
      N: "Showed remarkable composure through civil wars, Roman invasions, and political crises. Her suicide was reportedly calm and deliberate. Some immoderation in her lavish displays of wealth, but generally steady under pressure."
    }
  },
  {
    id: "musk",
    name: "Elon Musk",
    years: "1971-present",
    tagline: "Serial entrepreneur pushing boundaries in space, EVs, and AI",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/220px-Elon_Musk_Royal_Society_%28crop2%29.jpg",
    scores: {
      O: { domain: 90, facets: [95, 40, 35, 85, 90, 60] },
      C: { domain: 75, facets: [90, 55, 35, 98, 70, 20] },
      E: { domain: 55, facets: [30, 35, 80, 85, 60, 25] },
      A: { domain: 20, facets: [20, 25, 15, 15, 10, 30] },
      N: { domain: 55, facets: [50, 65, 45, 35, 60, 50] }
    },
    rationale: {
      O: "Extraordinary imagination applied to practical moonshots \u2014 reusable rockets, Mars colonization, neural interfaces. Very high intellect and adventurousness. But artistic interests and emotionality are low \u2014 his vision is engineering-driven, not aesthetic.",
      C: "Extremely high achievement-striving (building multiple companies simultaneously). But low cautiousness (impulsive tweets, reckless public statements) and low dutifulness to social norms. Orderliness is moderate \u2014 he runs chaotic but productive operations.",
      E: "Assertive and high-energy in professional settings, but not naturally warm or gregarious. His public persona is awkward rather than charismatic. He's driven by mission, not social connection. Low cheerfulness \u2014 he's described his life as painful.",
      A: "Very low. Known for combative behavior on social media, firing employees abruptly, mocking critics, and adversarial relationships with regulators. Modesty is near-zero. Some sympathy for humanity's future but little for individuals in the present.",
      N: "Has publicly discussed depression, stress, and sleeping on factory floors during production crises. Prone to anger and impulsive reactions. But also shows resilience bouncing back from near-bankruptcy and public failures."
    }
  },
  {
    id: "zuckerberg",
    name: "Mark Zuckerberg",
    years: "1984-present",
    tagline: "Facebook/Meta founder who connected billions and bet on the metaverse",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/220px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg",
    scores: {
      O: { domain: 72, facets: [75, 25, 25, 65, 85, 55] },
      C: { domain: 80, facets: [90, 70, 55, 95, 80, 50] },
      E: { domain: 38, facets: [30, 25, 60, 65, 20, 25] },
      A: { domain: 25, facets: [20, 30, 20, 20, 15, 35] },
      N: { domain: 30, facets: [25, 30, 20, 40, 25, 25] }
    },
    rationale: {
      O: "High intellect \u2014 built Facebook at 19, pivoted an entire company toward VR/AR. But not artistically inclined or emotionally expressive. His imagination is systems-oriented: how to connect and organize people at scale, not aesthetic vision.",
      C: "Extremely driven and disciplined. Sets annual personal challenges, runs a massive organization with clear strategic focus. His pivot to Meta showed long-term achievement-striving. But cautiousness is low \u2014 'move fast and break things' was the early motto.",
      E: "Notably introverted. Early descriptions paint him as socially awkward and robotic in public. His assertiveness is high in boardrooms but his warmth and gregariousness are low. He's become more polished but still reads as reserved.",
      A: "Low. Known for ruthless business tactics (alleged IP theft, aggressive acquisitions, privacy controversies). Congressional testimony showed minimal accommodation. Modesty is very low \u2014 he maintained absolute control of Meta through dual-class shares.",
      N: "Remarkably composed under enormous public pressure \u2014 congressional hearings, whistleblower scandals, stock crashes. Rarely shows anger or distress publicly. His emotional flatness may reflect genuinely low neuroticism or careful control."
    }
  },
  {
    id: "trump",
    name: "Donald Trump",
    years: "1946-present",
    tagline: "Real estate mogul and 45th/47th U.S. President who reshaped American politics",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/220px-Donald_Trump_official_portrait.jpg",
    scores: {
      O: { domain: 35, facets: [40, 15, 25, 45, 30, 20] },
      C: { domain: 55, facets: [85, 30, 20, 90, 40, 15] },
      E: { domain: 95, facets: [55, 80, 98, 90, 85, 60] },
      A: { domain: 10, facets: [10, 10, 8, 5, 2, 20] },
      N: { domain: 65, facets: [45, 90, 30, 20, 70, 30] }
    },
    rationale: {
      O: "Low openness to new ideas or intellectual complexity. Prefers simple, direct framing. Not artistically or intellectually curious in the traditional sense. Some imagination in branding and self-mythologizing. Strong preference for the familiar and conventional in aesthetics.",
      C: "Mixed. Extraordinary self-efficacy and achievement-striving \u2014 he genuinely believes he can do anything and pursues goals relentlessly. But orderliness, dutifulness to norms, and cautiousness are very low. He's driven but undisciplined in process.",
      E: "Extremely high. Dominates every room, craves attention, thrives on rallies and crowds. Assertiveness is near-maximum \u2014 he interrupts, commands, and demands center stage. Gregarious and high-energy even in his late 70s. Excitement-seeking is core to his brand.",
      A: "Among the lowest imaginable. Combative, retaliatory, zero-sum thinking. Trust is very low (assumes everyone is an adversary). Cooperation and modesty are essentially absent. He views compromise as weakness. Some base-level sympathy but highly conditional.",
      N: "High anger/hostility \u2014 quick to rage and retaliate at perceived slights. But paradoxically low anxiety and self-consciousness \u2014 he appears genuinely unbothered by criticism that would devastate most people. High immoderation in many domains."
    }
  },
  {
    id: "altman",
    name: "Sam Altman",
    years: "1985-present",
    tagline: "OpenAI CEO steering the development of artificial general intelligence",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Sam_Altman_CropEdit.jpg/220px-Sam_Altman_CropEdit.jpg",
    scores: {
      O: { domain: 85, facets: [90, 30, 35, 80, 90, 70] },
      C: { domain: 82, facets: [92, 65, 50, 95, 80, 40] },
      E: { domain: 70, facets: [60, 55, 80, 80, 50, 55] },
      A: { domain: 40, facets: [35, 45, 35, 35, 30, 55] },
      N: { domain: 30, facets: [25, 25, 20, 25, 30, 40] }
    },
    rationale: {
      O: "Very high intellect and imagination \u2014 thinking about civilizational-scale problems (AGI, nuclear fusion, universal basic income). Not artistically oriented. Adventurous in ideas: comfortable with paradigm-shifting bets. His thinking operates at an abstract, systemic level.",
      C: "High achievement-striving \u2014 ran Y Combinator, then pivoted to lead the most consequential AI lab. Disciplined networker and operator. But low cautiousness (pushed rapid AI deployment despite safety concerns) and moderate on dutifulness to prior commitments (nonprofit-to-profit pivot).",
      E: "Assertive and comfortable in high-profile settings \u2014 Congressional testimony, Davos panels, podcast circuits. But not naturally gregarious or warm. His social energy is strategic and mission-driven rather than spontaneous.",
      A: "Moderate-low. Politically savvy and can appear accommodating, but made hard decisions (firing people, restructuring OpenAI). His cooperation is transactional. He navigates power dynamics skillfully but prioritizes his vision over consensus.",
      N: "Remarkably composed. Was fired and rehired as OpenAI CEO within days and appeared unfazed throughout. Rarely shows emotional volatility in public. Projects calm confidence even when discussing existential AI risk."
    }
  },
  {
    id: "cook",
    name: "Tim Cook",
    years: "1960-present",
    tagline: "Apple CEO who turned operational excellence into the world\u2019s most valuable company",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Tim_Cook_%282017%2C_cropped%29.jpg/220px-Tim_Cook_%282017%2C_cropped%29.jpg",
    scores: {
      O: { domain: 45, facets: [35, 40, 30, 40, 55, 55] },
      C: { domain: 92, facets: [90, 95, 90, 85, 95, 85] },
      E: { domain: 40, facets: [55, 30, 50, 55, 15, 45] },
      A: { domain: 65, facets: [60, 80, 60, 65, 70, 55] },
      N: { domain: 20, facets: [15, 15, 15, 25, 10, 25] }
    },
    rationale: {
      O: "Not a visionary in the Jobs mold. Cook's genius is operational, not imaginative. He optimized Apple's supply chain into the most efficient on Earth. Moderate intellect applied to practical systems rather than creative leaps. Somewhat liberal on social issues.",
      C: "Near-maximum. Wakes at 3:45 AM, legendary for operational discipline, meticulous about supply chain details, and runs Apple with extraordinary consistency. Orderliness, dutifulness, and self-discipline are all elite. Cautious and methodical in strategy.",
      E: "Quiet and reserved by tech CEO standards. Not a natural showman. His keynote style is measured, not electric. Comfortable leading but doesn't seek the spotlight. Came out publicly as gay with calm deliberation, not fanfare.",
      A: "Higher than most tech CEOs. Known as a good listener, respectful of employees, and collaborative within Apple's leadership team. Moral convictions on privacy and human rights. But can be firm and uncompromising when Apple's interests are at stake.",
      N: "Exceptionally calm. Navigates enormous pressure (trillion-dollar company, regulatory battles, post-Jobs expectations) with steady composure. Rarely shows frustration publicly. His emotional evenness is one of his most noted leadership qualities."
    }
  },
  {
    id: "ternus",
    name: "John Ternus",
    years: "1975-present",
    tagline: "Apple\u2019s VP of Hardware Engineering driving the Apple Silicon revolution",
    image: "",
    scores: {
      O: { domain: 70, facets: [65, 55, 35, 60, 80, 50] },
      C: { domain: 88, facets: [90, 85, 85, 90, 85, 75] },
      E: { domain: 60, facets: [65, 50, 55, 70, 40, 65] },
      A: { domain: 65, facets: [60, 70, 65, 65, 55, 65] },
      N: { domain: 25, facets: [20, 20, 20, 30, 25, 30] }
    },
    rationale: {
      O: "High intellect in hardware engineering \u2014 led the transition from Intel to Apple Silicon, one of the most ambitious hardware pivots in tech history. Not a public intellectual or artistic thinker, but deeply imaginative within engineering constraints.",
      C: "Very high. Hardware engineering at Apple's scale demands extreme precision, coordination, and discipline. Ternus manages teams shipping billions of devices. His orderliness and dutifulness are reflected in Apple's remarkably consistent product quality.",
      E: "Moderate. Increasingly visible in Apple keynotes where he comes across as genuinely enthusiastic and personable \u2014 more natural and warm than many Apple executives. Not attention-seeking but comfortable on stage. Team-oriented energy.",
      A: "Moderately high. Described as collaborative and well-liked within Apple. His keynote persona is approachable and team-crediting. Hardware engineering requires deep cross-functional cooperation. Less combative than the stereotypical tech executive.",
      N: "Low. Managing Apple's hardware pipeline requires steady nerves \u2014 billion-dollar bets on chip design with multi-year lead times. His public appearances project calm confidence. No known episodes of emotional volatility."
    }
  },
  {
    id: "obama",
    name: "Barack Obama",
    years: "1961-present",
    tagline: "44th U.S. President known for eloquence, composure, and coalition-building",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/220px-President_Barack_Obama.jpg",
    scores: {
      O: { domain: 82, facets: [75, 65, 60, 65, 90, 80] },
      C: { domain: 85, facets: [90, 75, 80, 88, 85, 75] },
      E: { domain: 72, facets: [70, 55, 75, 70, 45, 80] },
      A: { domain: 68, facets: [55, 80, 65, 65, 60, 75] },
      N: { domain: 20, facets: [15, 15, 15, 20, 15, 30] }
    },
    rationale: {
      O: "Highly intellectual \u2014 constitutional law professor, eloquent writer (Dreams from My Father), and deeply analytical thinker. Comfortable with nuance and complexity. Liberal on social policy. His imagination is literary and conceptual rather than technical.",
      C: "Very disciplined. Ran a historic presidential campaign with remarkable strategic consistency. Known for 'no drama Obama' management style. High self-discipline in personal habits (regular exercise, measured decision-making). Methodical but not rigid.",
      E: "Charismatic on stage and in small groups, but fundamentally an introvert who recharges alone. His cheerfulness is high \u2014 warm humor and genuine smile. Assertive when needed but prefers persuasion over dominance. Not naturally gregarious at parties.",
      A: "Moderate-high. Genuinely empathetic and a good listener. Strong moral convictions. His cooperation style is consensus-seeking, sometimes to a fault (critics said he compromised too much). Modesty is moderate \u2014 confident but not grandiose.",
      N: "Famously unflappable. Maintained composure through economic crisis, partisan warfare, personal attacks, and national tragedies. His emotional steadiness was a defining leadership trait. 'No drama Obama' reflected genuinely low neuroticism, not suppression."
    }
  },
  {
    id: "vance",
    name: "JD Vance",
    years: "1984-present",
    tagline: "Author of Hillbilly Elegy turned senator and Vice President",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/J.D._Vance_official_portrait_%28cropped%29.jpg/220px-J.D._Vance_official_portrait_%28cropped%29.jpg",
    scores: {
      O: { domain: 60, facets: [55, 45, 50, 50, 70, 30] },
      C: { domain: 78, facets: [85, 65, 60, 88, 75, 60] },
      E: { domain: 58, facets: [45, 45, 70, 65, 35, 40] },
      A: { domain: 30, facets: [25, 35, 25, 25, 30, 45] },
      N: { domain: 45, facets: [40, 55, 40, 45, 35, 40] }
    },
    rationale: {
      O: "Moderate. Intellectually capable (Yale Law, wrote a bestselling memoir) but has moved toward conventional and traditionalist positions. His intellect is applied rather than exploratory. Low liberalism \u2014 embraces social conservatism. Some emotionality in his writing about family.",
      C: "High achievement-striving \u2014 rose from Appalachian poverty through the Marines, Ohio State, and Yale Law to the Senate and Vice Presidency. Strong self-efficacy. Orderliness and dutifulness are moderate; his career path shows strategic ambition more than methodical planning.",
      E: "Moderate. Assertive in political settings and combative in debates, but not naturally gregarious or warm in public appearances. His energy is focused and purposeful rather than socially expansive. Not excitement-seeking by temperament.",
      A: "Low. Politically combative and willing to make sharp personal attacks. His transformation from Trump critic to Trump ally shows strategic flexibility over principled cooperation. Trust is low. Some genuine sympathy rooted in his understanding of working-class hardship.",
      N: "Moderate. His memoir reveals genuine emotional struggles \u2014 childhood trauma, anger issues, family instability. He's processed much of this, but some anger and defensiveness persist in his political persona. More emotionally reactive than he projects."
    }
  },
  {
    id: "feynman",
    name: "Richard Feynman",
    years: "1918-1988",
    tagline: "Nobel physicist, legendary teacher, and irreverent intellectual adventurer",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4d/Richard_Feynman_Nobel.jpg/220px-Richard_Feynman_Nobel.jpg",
    scores: {
      O: { domain: 97, facets: [95, 65, 55, 95, 99, 80] },
      C: { domain: 45, facets: [85, 20, 30, 70, 35, 15] },
      E: { domain: 80, facets: [75, 70, 75, 80, 90, 85] },
      A: { domain: 50, facets: [50, 45, 50, 35, 55, 60] },
      N: { domain: 30, facets: [20, 25, 30, 20, 40, 25] }
    },
    rationale: {
      O: "Near-maximum. Feynman's curiosity was legendary and omnivorous \u2014 physics, biology, art, safecracking, bongo drums, strip clubs, Mayan hieroglyphics. He approached everything with childlike wonder. His intellect score is as high as it gets. Adventurousness drove him to constantly seek new experiences.",
      C: "Mixed. Extraordinary focus on physics problems (would work obsessively), but deliberately anti-establishment in process. Hated bureaucracy, ignored conventions, and was notoriously disorganized in non-physics matters. Very low cautiousness \u2014 he'd try anything.",
      E: "Highly extraverted. Loved telling stories, performing, teaching, and being the center of attention. Gregarious at parties, chatty with strangers. His Caltech lectures were legendary performances. High excitement-seeking and cheerfulness throughout his life.",
      A: "Moderate. Could be warm and generous, especially with students. But also arrogant, dismissive of fields he considered soft, and provocatively contrarian. Low cooperation with authority. His modesty was selective \u2014 humble about some things, very confident about his intellect.",
      N: "Generally stable and positive despite losing his first wife to illness at a young age and working on the Manhattan Project. Processed grief with remarkable honesty. His default state was joyful engagement rather than worry. Low anxiety and self-consciousness."
    }
  },
  {
    id: "sagan",
    name: "Carl Sagan",
    years: "1934-1996",
    tagline: "Astronomer and science communicator who made the cosmos accessible to millions",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Carl_Sagan_Planetary_Society.JPG/220px-Carl_Sagan_Planetary_Society.JPG",
    scores: {
      O: { domain: 95, facets: [95, 80, 70, 80, 95, 85] },
      C: { domain: 75, facets: [85, 65, 75, 85, 70, 60] },
      E: { domain: 75, facets: [70, 60, 65, 70, 55, 85] },
      A: { domain: 65, facets: [60, 80, 75, 50, 45, 80] },
      N: { domain: 30, facets: [30, 20, 25, 35, 25, 35] }
    },
    rationale: {
      O: "Immensely open. Sagan's imagination spanned cosmology, exobiology, nuclear winter, and the search for extraterrestrial life. His artistic interests were high \u2014 he was a gifted writer and storyteller (Cosmos, Contact). His sense of wonder was his defining trait.",
      C: "High but not extreme. Productive across many domains \u2014 research, books, TV, activism. Achievement-striving was strong. His discipline showed in consistent output over decades. But he spread himself across so many areas that some colleagues questioned his scientific focus.",
      E: "Charismatic and warm. Sagan was a natural communicator who connected with audiences of millions. Cheerfulness is very high \u2014 his enthusiasm was infectious. Not the loudest in the room but magnetically engaging. Comfortable in the spotlight but not attention-seeking for its own sake.",
      A: "Moderate-high. Deeply compassionate about humanity's future (nuclear disarmament, environmental protection). High sympathy and altruism. But some academic colleagues found him self-promoting, and he could be dismissive of pseudoscience practitioners. Low modesty about his public role.",
      N: "Generally stable and optimistic despite facing professional jealousy (denied tenure at Harvard, rejected by the National Academy of Sciences) and a cancer diagnosis. His worldview was fundamentally hopeful. Some vulnerability around professional rejection."
    }
  }
];
