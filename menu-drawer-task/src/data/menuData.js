/**
 * Menu Data
 * Complete menu structure with all options and sub-options from the images
 * Using iconName to reference SVG icons
 */
export const sampleMenuData = {
  id: 'root',
  label: 'Main Menu',
  children: [
    {
      id: 'home',
      label: 'Home',
      iconName: 'home',
      subtitle: 'Welcome to our comprehensive platform',
      children: [],
    },
    {
      id: 'products-services',
      label: 'Products & Services',
      iconName: 'box',
      subtitle: 'Explore our comprehensive offerings',
      children: [
        {
          id: 'software-solutions',
          label: 'Software Solutions',
          iconName: 'code',
          subtitle: 'Custom software development and deployment',
          children: [],
        },
        {
          id: 'cloud-infrastructure',
          label: 'Cloud & Infrastructure',
          iconName: 'cloud',
          subtitle: 'Scalable cloud solutions and infrastructure',
          children: [],
        },
        {
          id: 'consulting-services',
          label: 'Consulting Services',
          iconName: 'people',
          subtitle: 'Expert guidance and strategic support',
          children: [],
        },
        {
          id: 'digital-transformation',
          label: 'Digital Transformation',
          iconName: 'lightbulb',
          subtitle: 'Comprehensive digital transformation strategies',
          children: [],
        },
        {
          id: 'cybersecurity',
          label: 'Cybersecurity Consulting',
          iconName: 'shield',
          subtitle: 'Comprehensive cybersecurity services and solutions',
          children: [],
        },
        {
          id: 'data-analytics',
          label: 'Data & Analytics Consulting',
          iconName: 'bar-chart',
          subtitle: 'Data strategy, analytics, and business intelligence',
          children: [
            {
              id: 'data-strategy',
              label: 'Data Strategy',
              iconName: 'target',
              subtitle: 'Data governance and strategy development',
              children: [],
            },
            {
              id: 'advanced-analytics',
              label: 'Advanced Analytics',
              iconName: 'lightbulb',
              subtitle: 'Machine learning and predictive analytics',
              children: [],
            },
            {
              id: 'business-intelligence',
              label: 'Business Intelligence',
              iconName: 'bar-chart',
              subtitle: 'BI platform implementation and optimization',
              children: [],
            },
          ],
        },
        {
          id: 'devops',
          label: 'DevOps & Platform Engineering',
          iconName: 'gear',
          subtitle: 'DevOps transformation and platform engineering',
          children: [],
        },
        {
          id: 'support-maintenance',
          label: 'Support & Maintenance',
          iconName: 'gear',
          subtitle: 'Ongoing maintenance and support services',
          children: [],
        },
      ],
    },
    {
      id: 'industry-solutions',
      label: 'Industry Solutions',
      iconName: 'document',
      subtitle: 'Specialized solutions for different industries',
      children: [],
    },
    {
      id: 'company',
      label: 'Company',
      iconName: 'people',
      subtitle: 'Learn about our organization and culture',
      children: [],
    },
    {
      id: 'resources',
      label: 'Resources',
      iconName: 'book',
      subtitle: 'Knowledge base, tools, and learning materials',
      children: [],
    },
    {
      id: 'support',
      label: 'Support',
      iconName: 'question',
      subtitle: 'Get help and support when you need it',
      children: [],
    },
    {
      id: 'research-innovation',
      label: 'Research & Innovation',
      iconName: 'lightbulb',
      subtitle: 'Cutting-edge research and innovation initiatives',
      children: [],
    },
    {
      id: 'sustainability',
      label: 'Sustainability',
      iconName: 'leaf',
      subtitle: 'Environmental responsibility and sustainable technology',
      children: [],
    },
    {
      id: 'investor-relations',
      label: 'Investor Relations',
      iconName: 'chart',
      subtitle: 'Financial information and investor resources',
      children: [],
    },
    {
      id: 'contact',
      label: 'Contact',
      iconName: 'envelope',
      subtitle: 'Get in touch with our team',
      children: [],
    },
  ],
};

