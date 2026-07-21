import React from 'react';
import { ModernTemplate } from './ModernTemplate';
import { MinimalTemplate } from './MinimalTemplate';
import { ElegantTemplate } from './ElegantTemplate';
import { CorporateTemplate } from './CorporateTemplate';
import { CreativeTemplate } from './CreativeTemplate';
import { CreativeHeaderTemplate } from './CreativeHeaderTemplate';

export function TemplateRenderer({ data, metadata }) {
  switch (metadata.templateId) {
    case 'minimal':
      return <MinimalTemplate data={data} metadata={metadata} />;
    case 'elegant':
      return <ElegantTemplate data={data} metadata={metadata} />;
    case 'corporate':
      return <CorporateTemplate data={data} metadata={metadata} />;
    case 'creative':
      return <CreativeTemplate data={data} metadata={metadata} />;
    case 'creativeHeader':
      return <CreativeHeaderTemplate data={data} metadata={metadata} />;
    case 'modern':
    default:
      return <ModernTemplate data={data} metadata={metadata} />;
  }
}
