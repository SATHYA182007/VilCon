export interface AIChatMessage {
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  language?: string;
  sources?: string[];
}

export interface SchemeRecommendation {
  schemeId: string;
  title: string;
  matchScore: number; // 0-100
  benefits: string;
  requiredDocs: string[];
  offlineAvailable: boolean;
}

export interface HealthTriageResult {
  urgency: 'Low' | 'Medium' | 'High' | 'Emergency SOS';
  diagnosisSummary: string;
  recommendedActions: string[];
  nearestFacilityType: string;
}

// Pre-seeded offline fallback responses for low-connectivity environments
const OFFLINE_KNOWLEDGE: Record<string, string> = {
  default: `[GramAI Offline Response] Network connection unavailable. Accessing local cached knowledge base. For health emergencies, press the SOS button immediately. For farming advice, refer to offline Agricultural Module.`,
  scheme: `[GramAI Offline Scheme Advisor] Based on offline records: You are eligible for PM-Kisan Samman Nidhi ($6000/yr direct benefit), Ayushman Bharat Health Insurance (up to ₹5 Lakh cover), and PM Awas Yojana (Housing Subsidy). You can fill applications offline and they will sync once signal returns.`,
  health: `[GramAI Offline Triage] Medical advisory (Cached): Drink clean boiled water, apply cold compress for fever, and monitor oxygen levels. If severe chest pain or snakebite occurs, activate Emergency SOS button to trigger local mesh relay.`,
  weather: `[GramAI Offline Weather Alert] Local radar cached 2 hours ago: Light rain expected in the evening. Winds 12 km/h. Suitable for harvesting pulse crops.`,
  network: `[GramAI Network Predictor] Current node connected via Local Mesh Relay Node #14 (Bhojpur West). Packet delay ~1.2s. Offline sync will queue requests until high-bandwidth tower link restores.`,
};

export async function askGramAICopilot(
  prompt: string,
  isOfflineMode: boolean = false,
  language: string = 'en'
): Promise<string> {
  // Simulate natural latency
  await new Promise((r) => setTimeout(r, 800));

  if (isOfflineMode) {
    const p = prompt.toLowerCase();
    if (p.includes('scheme') || p.includes('yojana') || p.includes('money') || p.includes('subsidy')) {
      return OFFLINE_KNOWLEDGE.scheme;
    } else if (p.includes('health') || p.includes('fever') || p.includes('pain') || p.includes('doctor')) {
      return OFFLINE_KNOWLEDGE.health;
    } else if (p.includes('weather') || p.includes('rain') || p.includes('crop')) {
      return OFFLINE_KNOWLEDGE.weather;
    } else if (p.includes('signal') || p.includes('tower') || p.includes('sync') || p.includes('internet')) {
      return OFFLINE_KNOWLEDGE.network;
    }
    return OFFLINE_KNOWLEDGE.default;
  }

  // Online / Hybrid AI response synthesis
  const p = prompt.toLowerCase();
  if (p.includes('scheme') || p.includes('yojana') || p.includes('subsidy')) {
    return `Namaste! Based on current 2026 digital registry & AI eligibility analysis, here are your top matched schemes:\n1. PM-Kisan Samman Nidhi (100% Match)\n2. PM Garib Kalyan Anna Yojana (Free Ration support)\n3. Digital Literacy Rural Abhiyan.\nWould you like me to pre-fill your application form offline?`;
  } else if (p.includes('health') || p.includes('doctor') || p.includes('fever') || p.includes('pain')) {
    return `Health Advisory: Your symptoms indicate a mild viral infection or dehydration. Recommended actions:\n• Hydrate with ORS solution\n• Schedule a Telemedicine Video Call with Dr. Ananya Sharma at District PHC\n• Download the Offline Medical First Aid Guide for your device.`;
  } else if (p.includes('emergency') || p.includes('sos') || p.includes('snake') || p.includes('accident')) {
    return `🚨 EMERGENCY ALERT: GramAI has detected a high-priority incident request. Triggering local mesh broadcast to nearest Healthcare Worker & Emergency Response Vehicle. Please stay calm. Coordinates are pinned on the map.`;
  } else {
    return `GramAI Assistant: I am connected to the VillageConnect AI Mesh. How can I assist you with Telemedicine, Education courses, Government Schemes, or Local Weather today? [Supported in English, Hindi, Tamil, Telugu, Bengali]`;
  }
}

export function evaluateSchemeEligibility(profile: {
  age: number;
  landHectares: number;
  incomePerYear: number;
  isFarmer: boolean;
}): SchemeRecommendation[] {
  const recommendations: SchemeRecommendation[] = [
    {
      schemeId: 'pm-kisan-2026',
      title: 'PM-Kisan Direct Cash Transfer',
      matchScore: profile.isFarmer && profile.landHectares <= 2 ? 98 : 65,
      benefits: '₹6,000 yearly financial assistance deposited directly into Aadhar-linked Bank Account in 3 installments.',
      requiredDocs: ['Aadhaar Card', 'Land Ownership Records', 'Bank Passbook'],
      offlineAvailable: true,
    },
    {
      schemeId: 'ayushman-bharat-v2',
      title: 'Ayushman Bharat Digital Health Assurance',
      matchScore: profile.incomePerYear < 250000 ? 95 : 70,
      benefits: 'Free cashless health coverage up to ₹5,000,000 per family per year for secondary & tertiary hospitalizations.',
      requiredDocs: ['Ration Card', 'Aadhaar Card', 'Mobile Number'],
      offlineAvailable: true,
    },
    {
      schemeId: 'pm-solar-pump',
      title: 'PM-KUSUM Solar Agricultural Pump Subsidy',
      matchScore: profile.isFarmer ? 92 : 40,
      benefits: 'Up to 90% subsidy for installing 5HP solar-powered water pumps for off-grid irrigation.',
      requiredDocs: ['Electricity Bill / Nil Certificate', 'Khasra Khatoni Land Record'],
      offlineAvailable: true,
    },
    {
      schemeId: 'digital-rural-edu',
      title: 'PM Digital Gramin Saksharta Abhiyan',
      matchScore: 90,
      benefits: 'Free tablet device + 60 hours certified AI & digital literacy training for rural household members.',
      requiredDocs: ['Student ID / Aadhaar Card'],
      offlineAvailable: true,
    },
  ];

  return recommendations.sort((a, b) => b.matchScore - a.matchScore);
}

export function classifyHealthSymptoms(symptoms: string): HealthTriageResult {
  const lower = symptoms.toLowerCase();
  if (lower.includes('chest pain') || lower.includes('unconscious') || lower.includes('snake') || lower.includes('heavy bleeding')) {
    return {
      urgency: 'Emergency SOS',
      diagnosisSummary: 'Critical Life-Threatening Triage Alert Detected',
      recommendedActions: [
        'Press red SOS Panic Button immediately',
        'Dispatch emergency ambulance via local relay mesh',
        'Keep patient immobilized and calm',
      ],
      nearestFacilityType: 'District Civil Hospital Trauma Center (14 km)',
    };
  } else if (lower.includes('high fever') || lower.includes('vomiting') || lower.includes('fracture') || lower.includes('child')) {
    return {
      urgency: 'High',
      diagnosisSummary: 'Severe Acute Illness Requiring Urgent Doctor Consultation',
      recommendedActions: [
        'Book instant Telemedicine Video Call',
        'Administer paracetamol if temperature > 102°F',
        'Notify village health worker (ANM)',
      ],
      nearestFacilityType: 'Primary Health Center (PHC) Bhojpur (3.5 km)',
    };
  } else {
    return {
      urgency: 'Medium',
      diagnosisSummary: 'Mild Symptomatic Condition - Standard Outpatient Guidance',
      recommendedActions: [
        'Rest and take prescribed oral rehydration fluids',
        'Consult healthcare worker at weekly village camp',
      ],
      nearestFacilityType: 'Sub-Center Health Post (800 m)',
    };
  }
}
