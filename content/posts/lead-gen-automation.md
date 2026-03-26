---
title: 'Automated B2B Lead Gen: How to Fill Your Pipeline While You Sleep'
date: '2026-03-26'
tags: ['Lead Gen', 'B2B', 'Sales Automation', 'Marketing', 'Growth']
excerpt: 'Stop manual prospecting and start using automated systems to find and qualify your ideal B2B customers. A comprehensive guide to building a self-running lead generation machine.'
coverImage: '/images/posts/lead-gen-automation.png'
author: 'Ann Naser Nabil'
---

# Automated B2B Lead Gen: How to Fill Your Pipeline While You Sleep

B2B sales is often a numbers game. The more qualified leads you have, the more deals you'll close. But manual prospecting is slow, draining, and doesn't scale. Automation can handle the heavy lifting of finding and qualifying leads—while you focus on closing.

But here's what most lead gen articles won't tell you: **Automation isn't about replacing human connection—it's about amplifying it**. The goal isn't to spam more people. It's to have better conversations with the right people.

This guide will show you how to build a lead generation system that works 24/7, qualifies leads automatically, and books meetings with decision-makers while you sleep.

## The Modern B2B Lead Gen Stack

### The Complete Automation Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Lead Generation Pipeline                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐        │
│  │   PROSPECT   │ → │   ENRICH     │ → │   SCORE      │        │
│  │   Finding    │   │   Data       │   │   Quality    │        │
│  └──────────────┘   └──────────────┘   └──────────────┘        │
│         │                  │                  │                 │
│         ▼                  ▼                  ▼                 │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐        │
│  │   OUTREACH   │ → │   ENGAGE     │ → │   CONVERT    │        │
│  │   Multi-     │   │   Nurturing  │   │   Meeting    │        │
│  │   channel    │   │   Sequences  │   │   Booked     │        │
│  └──────────────┘   └──────────────┘   └──────────────┘        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Phase 1: Prospecting at Scale

### Finding Your Ideal Customer Profile (ICP)

Before automating, you need to know **exactly** who you're targeting:

```typescript
// Define your ICP programmatically
interface IdealCustomerProfile {
  // Firmographics
  companySize: {
    min: number;  // e.g., 50 employees
    max: number;  // e.g., 5000 employees
  };
  industries: string[];  // e.g., ['SaaS', 'Fintech', 'E-commerce']
  revenue: {
    min: number;  // e.g., $1M ARR
    max: number;  // e.g., $100M ARR
  };
  locations: string[];  // e.g., ['North America', 'Europe']
  
  // Technographics
  technologies: {
    mustHave: string[];  // e.g., ['React', 'AWS', 'Stripe']
    niceToHave: string[];  // e.g., ['Kubernetes', 'GraphQL']
    disqualifiers: string[];  // e.g., ['WordPress', 'Magento']
  };
  
  // Buying signals
  signals: {
    hiring: boolean;  // Actively hiring for relevant roles
    funding: string[];  // e.g., ['Series A', 'Series B']
    growth: number;  // e.g., 20% YoY growth
  };
  
  // Decision makers
  contacts: {
    titles: string[];  // e.g., ['CTO', 'VP Engineering', 'Head of Product']
    seniority: string[];  // e.g., ['C-Level', 'VP', 'Director']
  };
}

const icp: IdealCustomerProfile = {
  companySize: { min: 50, max: 5000 },
  industries: ['Software', 'Technology', 'SaaS'],
  revenue: { min: 1_000_000, max: 100_000_000 },
  locations: ['United States', 'Canada', 'United Kingdom', 'Germany'],
  technologies: {
    mustHave: ['React', 'Node.js'],
    niceToHave: ['TypeScript', 'PostgreSQL'],
    disqualifiers: ['PHP', 'jQuery'],
  },
  signals: {
    hiring: true,
    funding: ['Series A', 'Series B', 'Series C'],
    growth: 0.20,
  },
  contacts: {
    titles: ['CTO', 'VP Engineering', 'Head of Engineering', 'Technical Director'],
    seniority: ['C-Level', 'VP', 'Director'],
  },
};
```

### Data Sources for Prospecting

#### 1. Apollo.io API

```typescript
// src/prospecting/apollo.ts
import ApolloClient from 'apollo-api-client';

class ApolloProspecting {
  private client: ApolloClient;

  constructor(apiKey: string) {
    this.client = new ApolloClient(apiKey);
  }

  async findProspects(criteria: IdealCustomerProfile): Promise<Prospect[]> {
    const search = await this.client.accounts.search({
      q_organization_domains: criteria.industries,
      q_organization_num_employees_min: criteria.companySize.min,
      q_organization_num_employees_max: criteria.companySize.max,
      q_organization_city: criteria.locations,
      q_person_titles: criteria.contacts.titles,
      q_person_seniorities: criteria.contacts.seniority,
      per_page: 100,
    });

    return search.accounts.map(account => this.mapToProspect(account));
  }

  async enrichCompany(domain: string): Promise<CompanyData> {
    const account = await this.client.accounts.find({ domain });
    
    return {
      name: account.name,
      domain: account.domain,
      employees: account.num_employees,
      revenue: account.revenue,
      industry: account.industry,
      technologies: account.tech_stack,
      funding: account.funding_data,
      socialProfiles: {
        linkedin: account.linkedin_url,
        twitter: account.twitter_url,
      },
    };
  }

  async enrichContact(email: string): Promise<ContactData> {
    const person = await this.client.people.find({ email });
    
    return {
      name: person.name,
      title: person.title,
      email: person.email,
      linkedin: person.linkedin_url,
      phone: person.phone_numbers?.[0],
      seniority: person.seniority,
      department: person.department,
    };
  }
}
```

#### 2. Clearbit Enrichment

```typescript
// src/prospecting/clearbit.ts
import Clearbit from 'clearbit';

class ClearbitEnrichment {
  private client: Clearbit;

  constructor(apiKey: string) {
    this.client = new Clearbit(apiKey);
  }

  async enrichByDomain(domain: string): Promise<EnrichedCompany> {
    const company = await this.client.company.find({ domain });
    
    return {
      name: company.name,
      domain: company.domain,
      description: company.bio,
      employees: company.metrics.employees,
      revenue: company.metrics.annualRevenue,
      industry: company.categoryInfo.industry,
      subIndustry: company.categoryInfo.subIndustry,
      technologies: company.technologies,
      location: {
        city: company.geo.city,
        state: company.geo.state,
        country: company.geo.country,
      },
      social: {
        linkedin: company.linkedin.handle,
        twitter: company.twitter.handle,
        facebook: company.facebook.handle,
      },
      funding: {
        totalRaised: company.funding.total,
        lastRound: company.funding.rounds[0]?.type,
        investors: company.funding.investors,
      },
    };
  }

  async enrichByEmail(email: string): Promise<EnrichedPerson> {
    const person = await this.client.person.find({ email });
    
    return {
      name: {
        fullName: person.name.fullName,
        givenName: person.name.givenName,
        familyName: person.name.familyName,
      },
      email: person.email,
      title: person.employment.title,
      role: person.employment.role,
      seniority: person.employment.seniority,
      company: person.employment.name,
      linkedin: person.linkedin.handle,
      twitter: person.twitter.handle,
      github: person.github.handle,
      bio: person.bio,
    };
  }
}
```

#### 3. LinkedIn Sales Navigator (via PhantomBuster)

```typescript
// src/prospecting/linkedin.ts
import PhantomBuster from 'phantombuster';

class LinkedInProspecting {
  private phantom: PhantomBuster;

  constructor(apiKey: string) {
    this.phantom = new PhantomBuster(apiKey);
  }

  async scrapeSearchResults(searchUrl: string): Promise<LinkedInProfile[]> {
    const phantom = await this.phantom.createPhantom({
      class: 'LinkedinSearchScraper',
      args: {
        search_url: searchUrl,
        limit: 100,
      },
    });

    const result = await phantom.launch();
    return result.results;
  }

  async extractProfileData(profileUrl: string): Promise<LinkedInProfile> {
    const phantom = await this.phantom.createPhantom({
      class: 'LinkedinProfileScraper',
      args: {
        profile_url: profileUrl,
      },
    });

    const result = await phantom.launch();
    return result;
  }
}

interface LinkedInProfile {
  firstName: string;
  lastName: string;
  headline: string;
  summary: string;
  position: string;
  company: string;
  location: string;
  connections: number;
  profileUrl: string;
}
```

### Building a Prospecting Automation

```typescript
// src/automation/prospecting-pipeline.ts

class ProspectingPipeline {
  private apollo: ApolloProspecting;
  private clearbit: ClearbitEnrichment;
  private database: ProspectDatabase;

  constructor() {
    this.apollo = new ApolloProspecting(process.env.APOLLO_API_KEY);
    this.clearbit = new ClearbitEnrichment(process.env.CLEARBIT_API_KEY);
    this.database = new ProspectDatabase();
  }

  async run(): Promise<void> {
    console.log('🚀 Starting prospecting pipeline...');

    // Step 1: Find companies matching ICP
    const companies = await this.apollo.findProspects(ICP);
    console.log(`Found ${companies.length} companies`);

    // Step 2: Enrich with additional data
    const enriched = await Promise.all(
      companies.map(async (company) => {
        const enriched = await this.clearbit.enrichByDomain(company.domain);
        return { ...company, ...enriched };
      })
    );

    // Step 3: Score and rank
    const scored = enriched.map(company => ({
      ...company,
      score: this.calculateFitScore(company),
    }));

    // Step 4: Filter to top prospects
    const topProspects = scored
      .filter(p => p.score >= 70)
      .sort((a, b) => b.score - a.score);

    // Step 5: Find decision makers
    const withContacts = await Promise.all(
      topProspects.map(async (company) => {
        const contacts = await this.findDecisionMakers(company);
        return { ...company, contacts };
      })
    );

    // Step 6: Save to CRM
    await this.database.saveProspects(withContacts);

    console.log(`✅ Pipeline complete. ${withContacts.length} qualified prospects saved.`);
  }

  private calculateFitScore(company: EnrichedCompany): number {
    let score = 0;

    // Company size (25 points)
    if (company.employees >= 50 && company.employees <= 5000) {
      score += 25;
    }

    // Industry match (20 points)
    if (ICP.industries.includes(company.industry)) {
      score += 20;
    }

    // Technology match (25 points)
    const techMatch = ICP.technologies.mustHave.filter(t =>
      company.technologies.includes(t)
    ).length;
    score += (techMatch / ICP.technologies.mustHave.length) * 25;

    // Funding stage (15 points)
    if (ICP.signals.funding.includes(company.funding.lastRound)) {
      score += 15;
    }

    // Growth signals (15 points)
    if (company.employeesGrowthYoY >= ICP.signals.growth) {
      score += 15;
    }

    return score;
  }

  private async findDecisionMakers(company: EnrichedCompany): Promise<Contact[]> {
    const contacts = await this.apollo.searchContacts({
      organization_domains: [company.domain],
      titles: ICP.contacts.titles,
      seniorities: ICP.contacts.seniority,
    });

    return contacts.map(contact => ({
      name: contact.name,
      title: contact.title,
      email: contact.email,
      linkedin: contact.linkedin_url,
      seniority: contact.seniority,
    }));
  }
}

// Run daily
cron.schedule('0 6 * * *', async () => {
  await new ProspectingPipeline().run();
});
```

## Phase 2: Multi-Channel Outreach Automation

### The Outreach Sequence Architecture

```typescript
// src/outreach/sequence.ts

interface OutreachSequence {
  name: string;
  channels: OutreachChannel[];
  triggers: Trigger[];
  goals: Goal[];
}

interface OutreachChannel {
  type: 'email' | 'linkedin' | 'twitter' | 'phone';
  delay: number;  // Days after previous step
  template: string;
  personalization: PersonalizationRule[];
}

interface Trigger {
  event: 'opened_email' | 'clicked_link' | 'replied' | 'visited_website';
  action: 'send_followup' | 'notify_sales' | 'update_score';
}

// Example sequence for SaaS companies
const saasOutreachSequence: OutreachSequence = {
  name: 'SaaS CTO Outreach',
  channels: [
    {
      type: 'linkedin',
      delay: 0,
      template: 'linkedin-connection',
      personalization: [
        { field: 'company', source: 'prospect.company' },
        { field: 'recent_news', source: 'company.news' },
      ],
    },
    {
      type: 'email',
      delay: 1,
      template: 'intro-email',
      personalization: [
        { field: 'pain_point', source: 'technologies.missing' },
        { field: 'competitor', source: 'similar_companies.success' },
      ],
    },
    {
      type: 'email',
      delay: 3,
      template: 'value-prop-email',
      personalization: [
        { field: 'case_study', source: 'industry.case_studies' },
      ],
    },
    {
      type: 'linkedin',
      delay: 5,
      template: 'linkedin-followup',
      personalization: [],
    },
    {
      type: 'email',
      delay: 7,
      template: 'breakup-email',
      personalization: [],
    },
  ],
  triggers: [
    {
      event: 'replied',
      action: 'notify_sales',
    },
    {
      event: 'clicked_link',
      action: 'send_followup',
      delay: 1,
    },
  ],
  goals: [
    { type: 'meeting_booked', success: true },
    { type: 'positive_reply', success: true },
  ],
};
```

### Email Outreach Automation

```typescript
// src/outreach/email-automation.ts
import SendGrid from '@sendgrid/mail';
import Handlebars from 'handlebars';

class EmailOutreachAutomation {
  private sendgrid: typeof SendGrid;
  private templates: Map<string, Handlebars.TemplateDelegate>;

  constructor() {
    SendGrid.setApiKey(process.env.SENDGRID_API_KEY);
    this.sendgrid = SendGrid;
    this.loadTemplates();
  }

  private loadTemplates() {
    // Load email templates
    this.templates.set('intro-email', Handlebars.compile(`
Hi {{firstName}},

I noticed {{companyName}} is {{recentNews}}. Impressive work.

We've helped similar SaaS companies like {{competitor}} {{result}}.

Would you be open to a quick 15-minute chat next week to explore how we might do the same for {{companyName}}?

Best,
{{senderName}}
    `));

    this.templates.set('value-prop-email', Handlebars.compile(`
{{firstName}},

Quick question: Are you currently dealing with {{painPoint}}?

This is a common challenge for CTOs at growing SaaS companies. 

Here's how we solved it for {{similarCompany}}:
- Reduced {{metric}} by {{improvement}}%
- Saved {{hours}} hours per week
- Achieved ROI in {{timeframe}}

Worth a conversation?

{{senderName}}
    `));

    this.templates.set('breakup-email', Handlebars.compile(`
{{firstName}},

I've reached out a few times about {{valueProp}}.

I'm guessing this isn't a priority right now, or you're all set.

Either way, I won't bother you again. But if {{painPoint}} ever becomes a challenge, feel free to reach out.

Here's a {{resource}} that might be helpful in the meantime.

All the best,
{{senderName}}
    `));
  }

  async sendSequence(prospect: Prospect, sequence: OutreachSequence): Promise<void> {
    for (const step of sequence.channels) {
      // Check if prospect is still active in sequence
      const isConverted = await this.checkConversion(prospect);
      if (isConverted) {
        console.log(`✅ Prospect converted, stopping sequence`);
        break;
      }

      // Wait for delay
      await this.delay(step.delay * 24 * 60 * 60 * 1000);

      // Personalize template
      const template = this.templates.get(step.template);
      const context = await this.buildContext(prospect, step.personalization);
      const content = template(context);

      // Send email
      await this.sendEmail({
        to: prospect.email,
        subject: this.generateSubject(prospect, step.template),
        html: content,
        trackingSettings: {
          clickTracking: { enable: true },
          openTracking: { enable: true },
        },
      });

      // Log send
      await this.logSend(prospect, step);
    }
  }

  private async buildContext(
    prospect: Prospect,
    personalization: PersonalizationRule[]
  ): Promise<any> {
    const context: any = {
      firstName: prospect.firstName,
      companyName: prospect.company,
      senderName: process.env.SENDER_NAME,
    };

    for (const rule of personalization) {
      const value = await this.fetchPersonalizationData(prospect, rule.source);
      context[rule.field] = value;
    }

    return context;
  }

  private async sendEmail(config: EmailConfig): Promise<void> {
    await this.sendgrid.send({
      to: config.to,
      from: process.env.FROM_EMAIL,
      subject: config.subject,
      html: config.html,
      trackingSettings: config.trackingSettings,
      customArgs: {
        prospect_id: config.customArgs?.prospectId,
        sequence_id: config.customArgs?.sequenceId,
      },
    });
  }
}
```

### LinkedIn Automation (Ethical Approach)

```typescript
// src/outreach/linkedin-automation.ts
import Puppeteer from 'puppeteer';

class LinkedInOutreach {
  private browser: Puppeteer.Browser;

  async connect(): Promise<void> {
    this.browser = await Puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    // Login
    const page = await this.browser.newPage();
    await page.goto('https://linkedin.com/login');
    await page.type('#username', process.env.LINKEDIN_EMAIL);
    await page.type('#password', process.env.LINKEDIN_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForNavigation();
  }

  async sendConnectionRequest(prospect: Prospect, note: string): Promise<void> {
    const page = await this.browser.newPage();
    await page.goto(prospect.linkedinUrl);

    // Click connect button
    await page.click('button[aria-label*="Connect"]');

    // Add note
    await page.click('button[aria-label*="Add a note"]');
    const textarea = await page.$('textarea');
    await textarea.type(note);

    // Send
    await page.click('button[aria-label*="Send invitation"]');
    await page.waitForNavigation();

    console.log(`✅ Connection request sent to ${prospect.name}`);
  }

  async sendMessage(connection: Connection, message: string): Promise<void> {
    const page = await this.browser.newPage();
    await page.goto('https://www.linkedin.com/messaging/');

    // Find conversation
    await page.click(`[data-urn-id="${connection.urn}"]`);

    // Type and send message
    const composer = await page.$('[aria-label*="Write a message"]');
    await composer.type(message);
    await page.keyboard.press('Enter');

    console.log(`✅ Message sent to ${connection.name}`);
  }

  async close(): Promise<void> {
    await this.browser.close();
  }
}

// IMPORTANT: Use LinkedIn automation responsibly
// - Limit to 20-30 connection requests per day
// - Always personalize messages
// - Respect LinkedIn's Terms of Service
// - Consider using LinkedIn Sales Navigator API instead
```

### Multi-Channel Orchestration

```typescript
// src/outreach/orchestrator.ts

class OutreachOrchestrator {
  private emailAutomation: EmailOutreachAutomation;
  private linkedinAutomation: LinkedInOutreach;
  private crm: CRMIntegration;
  private analytics: AnalyticsTracker;

  async executeCampaign(campaign: Campaign): Promise<void> {
    const prospects = await this.crm.getProspects(campaign.criteria);

    for (const prospect of prospects) {
      // Check if already in sequence
      const existing = await this.crm.getExistingSequence(prospect.id);
      if (existing) {
        console.log(`⏭️  Skipping ${prospect.email} - already in sequence`);
        continue;
      }

      // Start sequence
      console.log(`🚀 Starting sequence for ${prospect.email}`);
      
      // Run sequence asynchronously
      this.runSequence(prospect, campaign.sequence).catch(error => {
        console.error(`❌ Sequence failed for ${prospect.email}:`, error);
      });
    }
  }

  private async runSequence(prospect: Prospect, sequence: OutreachSequence): Promise<void> {
    for (let i = 0; i < sequence.channels.length; i++) {
      const step = sequence.channels[i];

      // Check for conversion
      if (await this.isConverted(prospect)) {
        console.log(`✅ Prospect converted at step ${i}`);
        break;
      }

      // Execute step
      switch (step.type) {
        case 'email':
          await this.emailAutomation.sendStep(prospect, step);
          break;
        case 'linkedin':
          await this.linkedinAutomation.sendStep(prospect, step);
          break;
      }

      // Wait for next step
      if (i < sequence.channels.length - 1) {
        await this.delay(step.delay * 24 * 60 * 60 * 1000);
      }
    }
  }

  private async isConverted(prospect: Prospect): Promise<boolean> {
    const activities = await this.crm.getActivities(prospect.id);
    
    return activities.some(activity => 
      activity.type === 'reply' && activity.sentiment === 'positive' ||
      activity.type === 'meeting_booked'
    );
  }
}
```

## Phase 3: CRM Integration and Lead Scoring

### Automated Lead Scoring Model

```typescript
// src/scoring/lead-score.ts

interface LeadScore {
  total: number;
  breakdown: {
    fit: number;
    engagement: number;
    intent: number;
  };
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  priority: 'urgent' | 'high' | 'medium' | 'low';
}

class LeadScoringEngine {
  calculate(prospect: Prospect, activities: Activity[]): LeadScore {
    const fitScore = this.calculateFitScore(prospect);
    const engagementScore = this.calculateEngagementScore(activities);
    const intentScore = this.calculateIntentScore(prospect, activities);

    const total = fitScore * 0.4 + engagementScore * 0.35 + intentScore * 0.25;

    return {
      total: Math.round(total),
      breakdown: {
        fit: Math.round(fitScore),
        engagement: Math.round(engagementScore),
        intent: Math.round(intentScore),
      },
      grade: this.calculateGrade(total),
      priority: this.calculatePriority(total, engagementScore),
    };
  }

  private calculateFitScore(prospect: Prospect): number {
    let score = 0;

    // Company size (25 points)
    if (prospect.company.employees >= 50 && prospect.company.employees <= 5000) {
      score += 25;
    } else if (prospect.company.employees >= 10 && prospect.company.employees <= 10000) {
      score += 15;
    }

    // Industry match (20 points)
    if (TARGET_INDUSTRIES.includes(prospect.company.industry)) {
      score += 20;
    }

    // Technology stack (25 points)
    const techMatch = prospect.company.technologies.filter(t =>
      REQUIRED_TECH.includes(t)
    ).length;
    score += (techMatch / REQUIRED_TECH.length) * 25;

    // Funding stage (15 points)
    if (TARGET_FUNDING_STAGES.includes(prospect.company.fundingStage)) {
      score += 15;
    }

    // Role seniority (15 points)
    if (DECISION_MAKER_TITLES.includes(prospect.title)) {
      score += 15;
    }

    return Math.min(score, 100);
  }

  private calculateEngagementScore(activities: Activity[]): number {
    let score = 0;
    const now = Date.now();
    const sevenDays = 7 * 24 * 60 * 60 * 1000;

    for (const activity of activities) {
      // Recent activities worth more
      const recencyMultiplier = (now - activity.timestamp) < sevenDays ? 2 : 1;

      switch (activity.type) {
        case 'email_opened':
          score += 5 * recencyMultiplier;
          break;
        case 'link_clicked':
          score += 10 * recencyMultiplier;
          break;
        case 'email_replied':
          score += 30 * recencyMultiplier;
          break;
        case 'website_visited':
          score += 8 * recencyMultiplier;
          break;
        case 'demo_requested':
          score += 50 * recencyMultiplier;
          break;
      }
    }

    return Math.min(score, 100);
  }

  private calculateIntentScore(prospect: Prospect, activities: Activity[]): number {
    let score = 0;

    // Visited pricing page
    if (activities.some(a => a.page === '/pricing')) {
      score += 25;
    }

    // Visited multiple pages in one session
    const sessions = this.groupBySession(activities);
    for (const session of sessions) {
      if (session.pageViews >= 5) {
        score += 15;
      }
    }

    // Downloaded content
    if (activities.some(a => a.type === 'content_download')) {
      score += 20;
    }

    // Attended webinar
    if (activities.some(a => a.type === 'webinar_attended')) {
      score += 30;
    }

    // Search intent (from enrichment data)
    if (prospect.searchIntent?.includes('competitor')) {
      score += 20;
    }

    return Math.min(score, 100);
  }

  private calculateGrade(score: number): 'A' | 'B' | 'C' | 'D' | 'F' {
    if (score >= 90) return 'A';
    if (score >= 75) return 'B';
    if (score >= 60) return 'C';
    if (score >= 40) return 'D';
    return 'F';
  }

  private calculatePriority(total: number, engagement: number): 'urgent' | 'high' | 'medium' | 'low' {
    if (total >= 85 && engagement >= 70) return 'urgent';
    if (total >= 70 && engagement >= 50) return 'high';
    if (total >= 50) return 'medium';
    return 'low';
  }
}
```

### CRM Integration (HubSpot Example)

```typescript
// src/crm/hubspot.ts
import hubspotClient from '@hubspot/api-client';

class HubSpotIntegration {
  private client: hubspotClient;

  constructor() {
    this.client = new hubspotClient.Client({
      accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
    });
  }

  async createOrUpdateContact(prospect: Prospect): Promise<string> {
    try {
      // Try to find existing contact
      const existing = await this.client.crm.contacts.basicApi.getById(
        prospect.email,
        ['email', 'firstname', 'lastname']
      );

      // Update existing
      await this.client.crm.contacts.basicApi.update(existing.id, {
        properties: {
          firstname: prospect.firstName,
          lastname: prospect.lastName,
          company: prospect.company.name,
          jobtitle: prospect.title,
          linkedin_url: prospect.linkedin,
          lead_score: prospect.score.total,
          lead_grade: prospect.score.grade,
          last_contacted: new Date().toISOString(),
        },
      });

      return existing.id;
    } catch (error) {
      // Create new contact
      const contact = await this.client.crm.contacts.basicApi.create({
        properties: {
          email: prospect.email,
          firstname: prospect.firstName,
          lastname: prospect.lastName,
          company: prospect.company.name,
          jobtitle: prospect.title,
          linkedin_url: prospect.linkedin,
          lead_score: prospect.score.total,
          lead_grade: prospect.score.grade,
          lifecyclestage: 'lead',
        },
      });

      return contact.id;
    }
  }

  async createDeal(prospect: Prospect, value: number): Promise<string> {
    const deal = await this.client.crm.deals.basicApi.create({
      properties: {
        dealname: `${prospect.company.name} - ${prospect.firstName}`,
        amount: value,
        dealstage: 'appointmentscheduled',
        pipeline: 'default',
        closedate: this.calculateCloseDate(),
        hs_lead_id: prospect.id,
      },
    });

    // Associate with contact
    await this.client.crm.associations.basicApi.create(
      prospect.crmId,
      deal.id,
      'contacts',
      'deals'
    );

    return deal.id;
  }

  async logActivity(
    contactId: string,
    activity: Activity
  ): Promise<void> {
    await this.client.crm.objects.basicApi.create('calls', {
      properties: {
        hs_call_body: activity.notes,
        hs_call_status: activity.status,
        hs_timestamp: activity.timestamp,
      },
    });
  }

  async notifySalesRep(prospect: Prospect): Promise<void> {
    const task = await this.client.crm.tasks.basicApi.create({
      properties: {
        hs_task_subject: `Follow up with ${prospect.firstName} ${prospect.lastName}`,
        hs_task_body: `
High-priority lead:
- Name: ${prospect.firstName} ${prospect.lastName}
- Company: ${prospect.company.name}
- Title: ${prospect.title}
- Score: ${prospect.score.total} (${prospect.score.grade})
- Email: ${prospect.email}
- LinkedIn: ${prospect.linkedin}

Recent activity: ${prospect.recentActivities.join(', ')}
        `,
        hs_task_priority: prospect.score.priority === 'urgent' ? 'HIGH' : 'MEDIUM',
        hs_task_status: 'NOT_STARTED',
        hs_task_type: 'EMAIL',
      },
    });
  }
}
```

## The Secret Sauce: Personalization at Scale

### Dynamic Content Personalization

```typescript
// src/personalization/engine.ts

class PersonalizationEngine {
  async personalizeEmail(
    template: string,
    prospect: Prospect,
    context: PersonalizationContext
  ): Promise<string> {
    let email = template;

    // Company-specific personalization
    email = email.replace('{{company_recent_news}}', 
      await this.fetchCompanyNews(prospect.company));
    
    email = email.replace('{{company_tech_stack}}',
      this.formatTechStack(prospect.company.technologies));

    // Industry-specific personalization
    email = email.replace('{{industry_case_study}}',
      await this.selectCaseStudy(prospect.company.industry));

    // Role-specific personalization
    email = email.replace('{{role_pain_points}}',
      this.getRolePainPoints(prospect.title));

    // Behavioral personalization
    if (context.visitedPricing) {
      email = email.replace('{{pricing_cta}}',
        'I noticed you checked out our pricing. Happy to answer any questions!');
    }

    // Geographic personalization
    email = email.replace('{{local_reference}}',
      this.getLocalReference(prospect.company.location));

    return email;
  }

  private async fetchCompanyNews(company: Company): Promise<string> {
    const news = await this.newsApi.search(company.name);
    
    if (news.articles.length > 0) {
      return `recently ${news.articles[0].headline.toLowerCase()}`;
    }

    if (company.fundingStage) {
      return `recently raised ${company.fundingStage} funding`;
    }

    if (company.hiring) {
      return `hiring for multiple positions`;
    }

    return `doing great work in ${company.industry}`;
  }

  private async selectCaseStudy(industry: string): Promise<string> {
    const caseStudies = await this.getCaseStudies(industry);
    
    if (caseStudies.length > 0) {
      const study = caseStudies[0];
      return `We helped ${study.company} achieve ${study.result} in ${study.timeframe}`;
    }

    // Fallback to generic
    return 'We've helped similar companies achieve significant improvements';
  }

  private getRolePainPoints(title: string): string {
    const painPoints: Record<string, string> = {
      'CTO': 'scaling infrastructure and managing technical debt',
      'VP Engineering': 'hiring great engineers and shipping faster',
      'Head of Product': 'balancing feature development with technical quality',
      'Technical Director': 'maintaining system reliability during growth',
    };

    for (const [key, pain] of Object.entries(painPoints)) {
      if (title.includes(key)) {
        return pain;
      }
    }

    return 'optimizing your technology stack';
  }
}
```

## Measuring Success: Lead Gen Metrics

| Metric | Formula | Target |
|--------|---------|--------|
| **Response Rate** | Replies / Emails Sent | > 15% |
| **Positive Response Rate** | Positive Replies / Emails Sent | > 5% |
| **Meeting Booked Rate** | Meetings / Emails Sent | > 2% |
| **Cost Per Meeting** | Total Spend / Meetings Booked | < $500 |
| **Pipeline Generated** | $ Value of Opportunities | 10x spend |
| **Time to Response** | Avg time from reply to follow-up | < 1 hour |

## Common Pitfalls and Solutions

### Pitfall 1: Generic Messaging

**Problem**: Templates that feel like spam.

**Solution**: Minimum 3 personalization tokens per email:
- Company name (required)
- Recent news or achievement
- Specific pain point for their role
- Relevant case study or social proof

### Pitfall 2: Too Much Automation

**Problem**: Losing the human touch.

**Solution**: 
- Automate research and data entry
- Keep actual messaging human-written
- Review and personalize top prospects manually
- Use AI as a draft assistant, not a replacement

### Pitfall 3: No Follow-Up System

**Problem**: Hot leads go cold.

**Solution**: 
- Automated lead scoring updates
- Instant notifications for high-intent actions
- SLA-based follow-up requirements
- Escalation paths for unresponded leads

## Conclusion: Automation as a Force Multiplier

Automated lead generation isn't about replacing salespeople. It's about **giving them superpowers**:

- More time for meaningful conversations
- Better context for every interaction
- Higher-quality leads to pursue
- Data-driven insights for improvement

**Your Action Items**:
1. Define your ICP with surgical precision
2. Set up data enrichment (Apollo + Clearbit)
3. Build a 5-step outreach sequence
4. Implement lead scoring in your CRM
5. Create a follow-up SLA and automate notifications

Remember: The goal isn't to automate relationships. The goal is to automate everything *around* relationships so you can focus on what matters.

Now go fill that pipeline.

---

**Further Reading**:
- [Predictable Revenue by Aaron Ross](https://predictablerevenue.com)
- [Apollo.io API Documentation](https://apolloio.github.io/api-docs/)
- [HubSpot Developer Documentation](https://developers.hubspot.com/)
- [The SaaS Sales Playbook](https://www.amazon.com/SaaS-Playbook-Definitive-Enterprise-Software/dp/1542889618)
