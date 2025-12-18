# 📊 Guía de SEO - JP Pro Wash

## Información General

| Dato | Valor |
|------|-------|
| **Sitio Web** | https://lavanderiajpprowash.com |
| **Negocio** | Lavandería JP Pro Wash |
| **Ubicación** | Jr. Jorge Chávez 1154, Breña, Lima - Perú |
| **Teléfono** | 978 673 626 |
| **Última actualización** | Diciembre 2024 |

---

## ✅ Implementaciones SEO Actuales

### 1. Meta Tags Básicos

Cada página incluye los siguientes meta tags esenciales:

```html
<!-- Title Tag -->
<title>JP Pro Wash - Lavandería en Breña</title>

<!-- Meta Description -->
<meta name="description" content="Lavandería profesional en Breña, Lima...">

<!-- Keywords -->
<meta name="keywords" content="lavandería Breña, lavandería Lima...">
```

**☑️ Características:**
- Títulos descriptivos con palabras clave principales
- Meta descriptions de 150-160 caracteres con llamados a la acción
- Keywords relevantes al negocio local

---

### 2. Hreflang Tags (Internacionalización)

```html
<link rel="alternate" hreflang="es" href="https://lavanderiajpprowash.com/">
<link rel="alternate" hreflang="es-PE" href="https://lavanderiajpprowash.com/">
<link rel="alternate" hreflang="x-default" href="https://lavanderiajpprowash.com/">
```

**☑️ Por qué funciona:**
- Indica a Google que el contenido está en español
- `es-PE` específica para Perú mejora el posicionamiento local
- `x-default` indica la versión por defecto

---

### 3. Open Graph (Redes Sociales)

```html
<meta property="og:site_name" content="Lavandería JP Pro Wash">
<meta property="og:type" content="website">
<meta property="og:url" content="https://lavanderiajpprowash.com/">
<meta property="og:title" content="JP Pro Wash - Lavandería Profesional en Breña">
<meta property="og:description" content="Servicios de lavandería profesional...">
<meta property="og:image" content="https://lavanderiajpprowash.com/assets/images/BANNERS/LETRERO_mas-recortado.jpg">
```

**☑️ Beneficios:**
- Mejora la apariencia al compartir en Facebook, LinkedIn, WhatsApp
- Aumenta el CTR (Click Through Rate) en redes sociales
- Imagen personalizada para cada compartido

---

### 4. Schema Markup (JSON-LD) - Datos Estructurados

#### 4.1 Página Principal - WebSite + LocalBusiness

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Lavandería JP Pro Wash",
  "telephone": "+51978673626",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jr. Jorge Chávez 1154",
    "addressLocality": "Breña",
    "addressRegion": "Lima",
    "postalCode": "15083",
    "addressCountry": "PE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -12.0568,
    "longitude": -77.0486
  },
  "openingHoursSpecification": {
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "10:00",
    "closes": "21:00"
  }
}
```

#### 4.2 FAQPage Schema

```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cuánto cuesta el lavado por kilo en Breña?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El servicio de lavado por kilo... S/ 4.00 por kilo..."
      }
    }
  ]
}
```

**☑️ Beneficios:**
- Posibilita aparecer en Rich Snippets de Google
- Las FAQ pueden aparecer directamente en los resultados de búsqueda
- Mejora la visibilidad del negocio en Google Maps

#### 4.3 Service Schema (Páginas de Servicios)

```json
{
  "@type": "Service",
  "serviceType": "Lavado por Kilo",
  "provider": {
    "@type": "LocalBusiness",
    "name": "JP Pro Wash"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "itemListElement": [
      {
        "@type": "Offer",
        "price": "4.00",
        "priceCurrency": "PEN"
      }
    ]
  }
}
```

---

### 5. Robots.txt

```txt
User-agent: *
Allow: /

Sitemap: https://lavanderiajpprowash.com/sitemap.xml
```

**☑️ Configuración:**
- Permite a todos los bots rastrear el sitio
- Indica la ubicación del sitemap

---

### 6. Sitemap.xml

El sitemap incluye:

| Página | Prioridad | Frecuencia |
|--------|-----------|------------|
| Inicio (`/`) | 1.0 | weekly |
| Servicios principales | 0.9 | weekly |
| Secciones internas | 0.7-0.8 | monthly |

**Páginas indexadas (14 URLs):**
- Página principal
- Lavado por kilo
- Lavado al seco
- Lavado de edredones
- Lavado de zapatillas
- Lavado de alfombras
- Lavado de cortinas
- Lavado de peluches
- Lavado de ternos
- Lavado de vestidos
- Planchado express
- Desmanchado de prendas
- Lavandería corporativa
- Secciones anchor (#inicio, #servicios, #nosotros, #contacto)

---

### 7. Favicons Completos

✅ Apple Touch Icons (8 tamaños)
✅ Android Icons (6 tamaños)
✅ MS Application Icons (4 tamaños)
✅ Favicon estándar (16x16, 32x32, 96x96)
✅ Manifest.json para PWA

---

### 8. Optimización de Rendimiento

```html
<!-- Carga diferida de fuentes -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="...fonts..." rel="stylesheet" media="print" onload="this.media='all'">
```

**☑️ Técnicas implementadas:**
- `preconnect` para conexiones anticipadas
- Carga asíncrona de fuentes con fallback
- CSS crítico inline en el `<head>`

---

### 9. Google Search Console

```html
<meta name="google-site-verification" content="ewIRk3pj_sv2EPz_t1VNA8KkN-bQOuT8OROZChDf4fc">
```

✅ Sitio verificado en Google Search Console

---

### 10. Analytics

```html
<!-- Vercel Analytics -->
<script>
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
</script>
<script defer src="/_vercel/insights/script.js"></script>
```

---

## 📈 Palabras Clave Posicionadas

### Keywords Principales

| Keyword | Intención |
|---------|-----------|
| lavandería Breña | Local |
| lavandería Lima | Local |
| lavado por kilo | Transaccional |
| lavado al seco | Transaccional |
| lavandería a domicilio | Transaccional |
| lavandería cerca de mí | Local |

### Long-tail Keywords (en FAQs)

- ¿Cuánto cuesta el lavado por kilo en Breña?
- ¿Hacen servicio de recojo y entrega a domicilio?
- ¿Cuánto tiempo demora el servicio de lavandería?
- ¿Dónde está ubicada la lavandería JP Pro Wash?

---

## 🎯 Recomendaciones para Mejorar

### Prioridad Alta

1. **Google Business Profile**
   - Mantener actualizado con fotos recientes
   - Responder a todas las reseñas
   - Publicar actualizaciones semanales

2. **Agregar más páginas de servicios al sitemap**
   - `lavado-por-kilo.html` falta en sitemap (agregar)
   - `lavado-al-seco.html` falta en sitemap (agregar)
   - `lavado-de-edredones.html` falta en sitemap (agregar)

3. **Actualizar fechas en sitemap**
   - Cambiar `lastmod` a fechas recientes cuando hay cambios

### Prioridad Media

4. **Agregar Twitter Cards**
   ```html
   <meta name="twitter:card" content="summary_large_image">
   <meta name="twitter:title" content="JP Pro Wash - Lavandería en Breña">
   <meta name="twitter:description" content="...">
   <meta name="twitter:image" content="...">
   ```

5. **Canonical URLs**
   ```html
   <link rel="canonical" href="https://lavanderiajpprowash.com/">
   ```

6. **Breadcrumbs con Schema**
   - Agregar breadcrumbs en páginas internas
   - Implementar BreadcrumbList schema

### Prioridad Baja

7. **Blog de contenido**
   - Crear artículos sobre cuidado de ropa
   - "Cómo lavar diferentes tipos de tela"
   - "Consejos para mantener tu ropa como nueva"

8. **Reviews/Reseñas Schema**
   - Agregar `AggregateRating` con calificaciones de Google

9. **Local Business Listings**
   - Páginas Amarillas Perú
   - Yelp
   - Foursquare

---

## 📁 Estructura de Archivos SEO

```
LandingPage JP Pro Wash/
├── index.html              # Página principal (SEO completo)
├── robots.txt              # Instrucciones para bots
├── sitemap.xml             # Mapa del sitio
├── manifest.json           # PWA manifest
├── favicon-*.png           # Favicons múltiples tamaños
├── apple-icon-*.png        # Icons para Apple
├── android-icon-*.png      # Icons para Android
├── ms-icon-*.png           # Icons para Microsoft
├── browserconfig.xml       # Config para IE/Edge
└── [servicios].html        # Páginas de servicios con SEO individual
```

---

## 🔧 Herramientas Recomendadas para Monitoreo

| Herramienta | Uso | URL |
|-------------|-----|-----|
| Google Search Console | Monitoreo de indexación | search.google.com/search-console |
| Google Analytics | Tráfico y comportamiento | analytics.google.com |
| PageSpeed Insights | Rendimiento | pagespeed.web.dev |
| Schema Markup Validator | Validar datos estructurados | validator.schema.org |
| Mobile-Friendly Test | Compatibilidad móvil | search.google.com/test/mobile-friendly |

---

## 📅 Checklist de Mantenimiento SEO

### Semanal
- [ ] Verificar Search Console por errores
- [ ] Revisar posiciones de keywords principales
- [ ] Responder reseñas en Google Business

### Mensual
- [ ] Actualizar sitemap con nuevas páginas
- [ ] Revisar velocidad de carga
- [ ] Actualizar contenido de FAQ si hay nuevas preguntas frecuentes

### Trimestral
- [ ] Auditoría completa de SEO
- [ ] Revisar backlinks
- [ ] Actualizar meta descriptions si el CTR es bajo
- [ ] Agregar nuevas keywords según tendencias

---

## 📊 Métricas a Monitorear

| Métrica | Objetivo |
|---------|----------|
| Posición en "lavandería Breña" | Top 3 |
| CTR promedio | > 5% |
| Impresiones mensuales | Crecimiento constante |
| Core Web Vitals | Verde en todo |
| Páginas indexadas | Todas las páginas del sitemap |

---

*Documento creado: Diciembre 2024*
*Última actualización: Diciembre 2024*
