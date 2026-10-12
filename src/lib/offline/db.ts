import Dexie, { Table } from 'dexie';

export interface SOSQueueItem {
  id?: number;
  uuid: string;
  timestamp: string;
  villagerName: string;
  phone: string;
  villageName: string;
  coordinates: { lat: number; lng: number };
  emergencyType: 'medical' | 'disaster' | 'fire' | 'security' | 'other';
  severity: 'Critical' | 'High' | 'Moderate';
  description: string;
  synced: boolean;
}

export interface SchemeApplicationItem {
  id?: number;
  uuid: string;
  timestamp: string;
  applicantName: string;
  aadhaarOrId: string;
  schemeId: string;
  schemeTitle: string;
  category: string;
  status: 'Pending Sync' | 'Submitted' | 'Under Review';
  synced: boolean;
}

export interface TelemedicineRequestItem {
  id?: number;
  uuid: string;
  timestamp: string;
  patientName: string;
  age: number;
  gender: string;
  symptoms: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Emergency';
  synced: boolean;
}

export interface OfflineResource {
  id: string;
  title: string;
  category: 'education' | 'healthcare' | 'government' | 'farming';
  fileType: 'pdf' | 'video' | 'audio' | 'article';
  sizeMB: number;
  downloadedAt: string;
  contentSnippet: string;
}

export class VillageConnectDB extends Dexie {
  sosQueue!: Table<SOSQueueItem>;
  schemeApplications!: Table<SchemeApplicationItem>;
  telemedicineRequests!: Table<TelemedicineRequestItem>;
  offlineResources!: Table<OfflineResource>;

  constructor() {
    super('VillageConnectDB');
    this.version(1).stores({
      sosQueue: '++id, uuid, timestamp, synced, severity',
      schemeApplications: '++id, uuid, schemeId, synced',
      telemedicineRequests: '++id, uuid, urgency, synced',
      offlineResources: 'id, category, fileType',
    });
  }
}

export const db = new VillageConnectDB();

// Seed initial offline cached resources if empty
export async function seedOfflineResourcesIfEmpty() {
  const count = await db.offlineResources.count();
  if (count === 0) {
    await db.offlineResources.bulkAdd([
      {
        id: 'med-firstaid-01',
        title: 'Emergency Rural First Aid Manual (PDF)',
        category: 'healthcare',
        fileType: 'pdf',
        sizeMB: 4.2,
        downloadedAt: new Date().toISOString(),
        contentSnippet: 'Comprehensive offline guide for trauma, venomous bites, heatstroke, and maternal delivery in low-resource environments.',
      },
      {
        id: 'edu-math-01',
        title: 'Primary School Mathematics & Logic (Interactive Course)',
        category: 'education',
        fileType: 'video',
        sizeMB: 18.5,
        downloadedAt: new Date().toISOString(),
        contentSnippet: 'Full grade 1-5 math modules with localized audio explanations in Hindi and regional languages.',
      },
      {
        id: 'gov-pm-kisan',
        title: 'PM-Kisan & Rural Agri Subsidy Guide 2026',
        category: 'government',
        fileType: 'article',
        sizeMB: 1.1,
        downloadedAt: new Date().toISOString(),
        contentSnippet: 'Step-by-step eligibility criteria, direct benefit transfer (DBT) registration form & land record document checklist.',
      },
      {
        id: 'farm-drought-01',
        title: 'Drought-Resistant Crop Techniques & Soil Conservation',
        category: 'farming',
        fileType: 'audio',
        sizeMB: 6.4,
        downloadedAt: new Date().toISOString(),
        contentSnippet: 'Audio lessons on drip irrigation, organic composting, and weather warning responses.',
      },
    ]);
  }
}
