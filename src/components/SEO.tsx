import { Helmet } from 'react-helmet';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = "pet care, pet services, dog boarding, pet grooming, pet monitoring, veterinary services",
  image = "/lovable-uploads/2c956147-e853-4ca6-930e-cea856187266.png",
  url = window.location.href,
  type = "website"
}) => {
  const fullTitle = title.includes('SmartPaw') ? title : `${title} | SmartPaw`;
  
  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="SmartPaw" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="SmartPaw Team" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "SmartPaw",
          "description": description,
          "url": url,
          "logo": image,
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-800-SMARTPAW",
            "contactType": "customer service",
            "email": "hello@smartpaw.com"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Pet Street, Suite 100",
            "addressLocality": "San Francisco",
            "addressRegion": "CA",
            "postalCode": "94107",
            "addressCountry": "US"
          },
          "serviceArea": {
            "@type": "GeoCircle",
            "geoMidpoint": {
              "@type": "GeoCoordinates",
              "latitude": 37.7749,
              "longitude": -122.4194
            },
            "geoRadius": 50000
          }
        })}
      </script>
    </Helmet>
  );
};
