import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { SafeUrlPipe } from './safe-url.pipe';

interface Service {
  id: number;
  icon: string;
  title: string;
  shortDescription: string;
  painPoints: string[];
  solutions: string[];
}

interface Blog {
  id: number;
  imageUrl: string;
  category: string;
  title: string;
  summary: string;
  fullContent: string;
}

interface Resource {
  title: string;
  content: string;
}

interface Testimonial {
  quote: string;
  author: string;
  title: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, SafeUrlPipe],
  host: {
    '(window:scroll)': 'onWindowScroll()',
  },
})
export class AppComponent {
  isMenuOpen = signal(false);
  isScrolled = signal(false);

  // Modal states
  isServiceModalOpen = signal(false);
  isBlogModalOpen = signal(false);
  isLegalModalOpen = signal(false);
  isFormModalOpen = signal(false);
  isVideoModalOpen = signal(false);
  isResourceModalOpen = signal(false);
  
  selectedService = signal<Service | null>(null);
  selectedBlog = signal<Blog | null>(null);
  legalContent = signal<{ title: string; content: string } | null>(null);
  resourceContent = signal<Resource | null>(null);
  
  // Form state
  formSubmitted = signal(false);
  
  services: Service[] = [
    { id: 1, title: 'AI Automation & Agents', icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.543l.227 1.58-.227-1.58a2.625 2.625 0 00-1.889-1.889l-1.58-.227 1.58-.227a2.625 2.625 0 001.889-1.889l.227-1.58-.227 1.58a2.625 2.625 0 001.889 1.889l1.58.227-1.58.227a2.625 2.625 0 00-1.889 1.889z', shortDescription: 'Automate everything—unleash smarter workflows, lead bots, custom chat AI, and digital assistants.', painPoints: ['Manual, repetitive tasks drain resources.', 'Inconsistent customer support.', 'Losing leads due to slow response times.'], solutions: ['End-to-end business workflow automation.', 'Custom AI chatbot design for web and social platforms.', 'Automated lead generation, scoring, and CRM syncing.'] },
    { id: 2, title: 'AI Ad Creatives', icon: 'M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.62a8.983 8.983 0 013.362-3.797z M15.362 5.214C14.467 5.474 13.43 5.668 12.354 5.826A8.968 8.968 0 0012 3c.905 0 1.77.124 2.583.355C14.536 4.072 14.93 4.598 15.362 5.214z', shortDescription: 'Cinematic ads, video testimonials, and post creatives—made by AI, delivered fast.', painPoints: ['High cost of video production.', 'Creative burnout and lack of ad variations.', 'Long turnaround times for new campaigns.'], solutions: ['AI-generated video ads tailored to your brand.', 'Automated image/video variations for multi-channel campaigns.', 'Preview, edit, and launch—all in days, not months.'] },
    { id: 3, title: 'Digital Marketing', icon: 'M10.5 6a7.5 7.5 0 100 15 7.5 7.5 0 000-15z M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z', shortDescription: 'Boost visibility with smart, data-driven campaigns—let algorithms bring you growth.', painPoints: ['Poor return on ad spend (ROAS).', 'Difficulty targeting the right audience.', 'Lack of actionable insights from analytics.'], solutions: ['Google Ads and Facebook Ads setup, split-testing, and optimization.', 'SEO audit and content strategy powered by AI keyword research.', 'Conversion tracking and funnel improvement bots.'] },
    { id: 4, title: 'Network Administration', icon: 'M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3V7.5a3 3 0 013-3h13.5a3 3 0 013 3v3.75a3 3 0 01-3 3m-13.5 0V11.25a2.25 2.25 0 012.25-2.25h9a2.25 2.25 0 012.25 2.25v3M10.5 9h3m-3 3h3', shortDescription: 'Reliable, secure networking for any business—setup, protection, and monitoring 24/7.', painPoints: ['Network downtime hurting productivity.', 'Cybersecurity threats and vulnerabilities.', 'Poor Wi-Fi coverage and slow speeds.'], solutions: ['Cisco router & switch configuration and remote management.', 'Fortinet firewall security setup and penetration testing.', 'Live network monitoring with real-time threat alerts.'] },
    { id: 5, title: 'Software Development', icon: 'M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5', shortDescription: 'Custom enterprise apps and web platforms engineered to scale with you.', painPoints: ['Off-the-shelf software doesn\'t fit your needs.', 'Outdated legacy systems are holding you back.', 'Manual processes that could be digitized.'], solutions: ['Custom CRM, ERP, and business dashboard solutions.', 'High-performance web portals with responsive UX.', 'Legacy system upgrades and API integrations.'] },
    { id: 6, title: 'Remote IT Support', icon: 'M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m12 0v-1.5a6 6 0 00-6-6v1.5a6 6 0 00-6 6v1.5m12 0a6 6 0 00-6 6v-1.5m6-4.5v-1.5a6 6 0 00-6-6v1.5a6 6 0 00-6 6v1.5', shortDescription: 'Around-the-clock technical support—your business, always ready.', painPoints: ['Employees are frustrated with slow IT responses.', 'IT issues causing significant downtime.', 'Lack of proactive system maintenance.'], solutions: ['24/7 live troubleshooting, ticketing, and remote fix.', 'Proactive monitoring to prevent downtime.', 'Helpdesk chatbots for instant staff/client assistance.'] },
  ];

  blogs: Blog[] = [
    { id: 1, imageUrl: 'https://picsum.photos/400/250?random=1', category: 'AUTOMATION', title: 'How AI is Revolutionizing Customer Service', summary: 'Discover the impact of AI-powered agents on customer support and satisfaction.', fullContent: 'The landscape of customer service is undergoing a seismic shift, thanks to artificial intelligence. AI-powered chatbots and virtual assistants are available 24/7, providing instant responses to customer queries, resolving common issues without human intervention, and freeing up human agents to handle more complex and nuanced problems. This not only improves customer satisfaction with faster response times but also boosts operational efficiency. Furthermore, AI can analyze customer interactions to identify trends, predict future issues, and provide valuable insights for product and service improvements. The result is a more proactive, personalized, and efficient customer service experience that builds stronger brand loyalty.'},
    { id: 2, imageUrl: 'https://picsum.photos/400/250?random=2', category: 'EFFICIENCY', title: '5 Repetitive Tasks You Can Automate Today', summary: 'Free up your team\'s time by automating these common business processes.', fullContent: 'In every business, countless hours are lost to repetitive, manual tasks. Automation can reclaim this valuable time. Here are five processes to consider automating: 1. Data Entry: Automatically sync data between applications, spreadsheets, and databases. 2. Email Marketing: Set up automated sequences for welcoming new subscribers, nurturing leads, and re-engaging old customers. 3. Social Media Posting: Schedule posts across multiple platforms in advance. 4. Invoice Generation: Automatically create and send invoices based on project milestones or sales data. 5. Reporting: Generate daily, weekly, or monthly reports automatically, pulling data from various sources into a single dashboard. By automating these tasks, you empower your team to focus on strategic, high-value work that drives growth.'},
    { id: 3, imageUrl: 'https://picsum.photos/400/250?random=3', category: 'FUTURE OF WORK', title: 'The Rise of the AI-Powered Workforce', summary: 'Exploring how AI agents will collaborate with human teams in the near future.', fullContent: 'The future of work isn\'t about humans versus machines; it\'s about humans and machines working together. AI agents are becoming sophisticated collaborators, augmenting human capabilities rather than replacing them. Imagine an AI agent that prepares meeting briefings, summarizes long documents, and drafts initial email responses, allowing a project manager to focus on strategy and team leadership. In creative fields, AI can generate initial concepts and handle tedious editing tasks, freeing up designers to focus on innovation. This collaborative model, often called "human-in-the-loop," leads to greater productivity, higher-quality output, and more fulfilling work for employees. The organizations that embrace this hybrid workforce will be the leaders of tomorrow.'},
  ];

  testimonials: Testimonial[] = [
    { quote: "The AI automation solution they built for us cut down our manual data entry by 90%. It's been a complete game-changer for our team's productivity.", author: 'Jane Doe', title: 'COO, Innovate Inc.' },
    { quote: "Working with them was a breeze. They understood our vision for a custom CRM and delivered a platform that exceeded our expectations. Highly recommended!", author: 'John Smith', title: 'Founder, StartUp Solutions' },
    { quote: "Their digital marketing campaigns have doubled our lead generation in just three months. The data-driven approach makes a real difference.", author: 'Emily White', title: 'Marketing Director, Growth Co.' }
  ];

  privacyPolicy: Resource = {
    title: 'Privacy Policy',
    content: `Your privacy is important to us. It is Vibes Of Kheya's policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate. We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used. We only retain collected information for as long as necessary to provide you with your requested service.`
  };

  termsOfService: Resource = {
    title: 'Terms of Service',
    content: `By accessing the website at Vibes Of Kheya, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law. Permission is granted to temporarily download one copy of the materials (information or software) on Vibes Of Kheya's website for personal, non-commercial transitory viewing only.`
  };
  
  caseStudies: Resource = {
    title: 'Case Studies',
    content: `Explore how we've helped businesses like yours achieve remarkable results through AI automation and strategic IT solutions. Our case studies provide in-depth analysis of the challenges, our custom-built solutions, and the measurable impact on efficiency, growth, and ROI. (More content coming soon).`
  };

  whyUs: Resource = {
    title: 'Why Us',
    content: `We are more than just a service provider; we are your technology partner. We combine deep expertise in AI, network administration, and software development with a creative approach to marketing and a relentless focus on results. Our integrated suite of services means you get a cohesive, powerful strategy from a single, dedicated team. We are committed to your success. (More content coming soon).`
  };

  faq: Resource = {
    title: 'Frequently Asked Questions',
    content: `Q: How long does it take to build a custom AI agent?\nA: The timeline varies depending on complexity, but a basic chatbot can often be deployed within 2-4 weeks, while more complex automation workflows may take longer.\n\nQ: Is your IT support really 24/7?\nA: Yes. Our team provides around-the-clock monitoring and support to ensure your systems are always running smoothly and any issues are addressed immediately. (More content coming soon).`
  };

  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 10);
  }

  toggleMenu(): void {
    this.isMenuOpen.update((value) => !value);
  }

  scrollTo(elementId: string, event: Event): void {
    event.preventDefault();
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (this.isMenuOpen()) {
      this.isMenuOpen.set(false);
    }
  }

  openServiceModal(service: Service): void {
    this.selectedService.set(service);
    this.isServiceModalOpen.set(true);
  }

  openBlogModal(blog: Blog): void {
    this.selectedBlog.set(blog);
    this.isBlogModalOpen.set(true);
  }
  
  openLegalModal(type: 'privacy' | 'terms'): void {
    if (type === 'privacy') {
      this.legalContent.set(this.privacyPolicy);
    } else {
      this.legalContent.set(this.termsOfService);
    }
    this.isLegalModalOpen.set(true);
  }
  
  openResourceModal(type: 'case' | 'why' | 'faq'): void {
    if (type === 'case') {
      this.resourceContent.set(this.caseStudies);
    } else if (type === 'why') {
      this.resourceContent.set(this.whyUs);
    } else {
      this.resourceContent.set(this.faq);
    }
    this.isResourceModalOpen.set(true);
  }

  openFormModal(): void {
    this.formSubmitted.set(false);
    this.isFormModalOpen.set(true);
  }
  
  openVideoModal(): void {
    this.isVideoModalOpen.set(true);
  }

  handleFormSubmit(event: Event): void {
    event.preventDefault();
    // In a real app, you'd handle form data submission here.
    // For this demo, we'll just show the success message.
    this.formSubmitted.set(true);
  }

  closeModal(): void {
    this.isServiceModalOpen.set(false);
    this.isBlogModalOpen.set(false);
    this.isLegalModalOpen.set(false);
    this.isFormModalOpen.set(false);
    this.isVideoModalOpen.set(false);
    this.isResourceModalOpen.set(false);
    // Delay clearing content to prevent jarring transition
    setTimeout(() => {
      this.selectedService.set(null);
      this.selectedBlog.set(null);
      this.legalContent.set(null);
      this.resourceContent.set(null);
      this.formSubmitted.set(false);
    }, 300);
  }
}