/**
 * Ferme Rêve d'Enfance - Multilingual Dictionary
 * Supports French (fr), Arabic (ar), English (en), Spanish (es)
 * Easily extensible with new languages.
 */

window.FERME_I18N = {
  fr: {
    langCode: 'fr',
    dir: 'ltr',
    locale: 'fr-FR',
    nightUnitSingle: 'nuit',
    nightUnitPlural: 'nuits',
    currencySymbol: { MAD: 'DH', EUR: '€', USD: '$' },
    pool: {
      dayBadge: 'Ensoleillement & Eau Cristalline',
      dayDesc: 'Baignée par le soleil généreux de la région de Chtouka, la piscine offre une eau tempérée, un mur d’eau relaxant et des transats confortables pour vos journées de détente.',
      nightBadge: 'Ambiance Nocturne & Éclairage Féerique',
      nightDesc: 'Dès la tombée de la nuit, les projecteurs subaquatiques et l’éclairage tamisé créent une atmosphère magique pour des baignades sous les étoiles et des dîners au bord de l’eau.'
    },
    waGeneral: "Bonjour Ferme Rêve d'Enfance, je souhaiterais obtenir des informations concernant les disponibilités et la privatisation de votre domaine à Tnine Chtouka.",
    waBookingHeader: "Bonjour Ferme Rêve d'Enfance,\n\nJe souhaite effectuer une demande de réservation pour la privatisation de votre domaine :",
    waBookingFooter: "Merci de bien vouloir me confirmer la disponibilité et le tarif final.",
    labels: {
      fullName: 'Nom complet',
      phone: 'Téléphone',
      arrival: "Date d'arrivée",
      departure: 'Date de départ',
      guests: 'Nombre de participants',
      adults: 'adulte(s)',
      children: 'enfant(s)',
      options: 'Options souhaitées',
      notes: 'Remarques / Demandes particulières',
      noOptions: 'Aucune option supplémentaire',
      noNotes: 'Aucune remarque particulière'
    }
  },

  ar: {
    langCode: 'ar',
    dir: 'rtl',
    locale: 'ar-MA',
    nightUnitSingle: 'ليلة',
    nightUnitPlural: 'ليالٍ',
    currencySymbol: { MAD: 'درهم', EUR: '€', USD: '$' },
    pool: {
      dayBadge: 'شمس مشرقة ومياه كريستالية نقية',
      dayDesc: 'تحت أشعة الشمس الدافئة في منطقة شتوكة، يوفر المسبح مياهاً معتدلة الحرارة مع شلال جداري يبعث على الاسترخاء وكراسي تشمس مريحة لأجمل أوقات الاستجمام.',
      nightBadge: 'أجواء ليلية ساحرة وإضاءة رومانسية',
      nightDesc: 'مع حلول المساء، تضفي الكشافات المائية والإضاءة الخافتة أجواءً ساحرة للسباحة تحت النجوم وتناول وجبات العشاء على حافة المسبح.'
    },
    waGeneral: "مرحباً، أود الاستفسار عن التواريخ المتاحة وحجز مزرعة حلم الطفولة بالكامل في اثنين شتوكة.",
    waBookingHeader: "مرحباً إدارة مزرعة حلم الطفولة،\n\nأود تقديم طلب حجز لخصخصة المزرعة بالكامل :",
    waBookingFooter: "يرجى تأكيد التوافر والسعر النهائي للطلب. شكراً لكم.",
    labels: {
      fullName: 'الاسم الكامل',
      phone: 'رقم الهاتف',
      arrival: 'تاريخ الوصول',
      departure: 'تاريخ المغادرة',
      guests: 'عدد الضيوف',
      adults: 'بالغين',
      children: 'أطفال',
      options: 'الخدمات الإضافية',
      notes: 'ملاحظات وطلبات خاصة',
      noOptions: 'بدون خدمات إضافية',
      noNotes: 'لا توجد ملاحظات خاصة'
    }
  },

  en: {
    langCode: 'en',
    dir: 'ltr',
    locale: 'en-US',
    nightUnitSingle: 'night',
    nightUnitPlural: 'nights',
    currencySymbol: { MAD: 'MAD', EUR: '€', USD: '$' },
    pool: {
      dayBadge: 'Sunny Serenity & Crystal-Clear Water',
      dayDesc: 'Bathed in the warm Moroccan sunshine, the pool features temperate water, a soothing cascading water wall, and luxury sun loungers for full relaxation.',
      nightBadge: 'Magical Night Ambiance & Ambient Lighting',
      nightDesc: 'As twilight settles, underwater spotlights and warm ambient lighting create an enchanting setting for starry night swims and poolside dinners.'
    },
    waGeneral: "Hello Ferme Rêve d'Enfance, I would like to inquire about availability and full estate privatization in Tnine Chtouka.",
    waBookingHeader: "Hello Ferme Rêve d'Enfance,\n\nI would like to submit a reservation request for the full privatization of your domain:",
    waBookingFooter: "Please confirm availability and final quotation. Thank you!",
    labels: {
      fullName: 'Full Name',
      phone: 'Phone',
      arrival: 'Arrival Date',
      departure: 'Departure Date',
      guests: 'Guests',
      adults: 'adult(s)',
      children: 'child(ren)',
      options: 'Selected Options',
      notes: 'Special Requests / Notes',
      noOptions: 'No extra options',
      noNotes: 'None'
    }
  },

  es: {
    langCode: 'es',
    dir: 'ltr',
    locale: 'es-ES',
    nightUnitSingle: 'noche',
    nightUnitPlural: 'noches',
    currencySymbol: { MAD: 'MAD', EUR: '€', USD: '$' },
    pool: {
      dayBadge: 'Sol Radiante y Agua Cristalina',
      dayDesc: 'Bañada por el generoso sol de Chtouka, la piscina ofrece aguas templadas, una relajante cascada mural y cómodas tumbonas para sus días de descanso.',
      nightBadge: 'Ambiente Nocturno Mágico e Iluminación Cálida',
      nightDesc: 'Al caer la noche, los focos subacuáticos y la iluminación tenue crean una atmósfera mágica para nadar bajo las estrellas y disfrutar de cenas junto al agua.'
    },
    waGeneral: "Hola Ferme Rêve d'Enfance, me gustaría consultar disponibilidad y reserva exclusiva de su finca en Tnine Chtouka.",
    waBookingHeader: "Hola Ferme Rêve d'Enfance,\n\nQuisiera realizar una solicitud de reserva para la privatización total de su finca:",
    waBookingFooter: "Por favor confirmen disponibilidad y tarifa final. ¡Muchas gracias!",
    labels: {
      fullName: 'Nombre completo',
      phone: 'Teléfono',
      arrival: 'Fecha de llegada',
      departure: 'Fecha de salida',
      guests: 'Número de huéspedes',
      adults: 'adulto(s)',
      children: 'niño(s)',
      options: 'Opciones seleccionadas',
      notes: 'Notas y peticiones especiales',
      noOptions: 'Sin opciones adicionales',
      noNotes: 'Ninguna'
    }
  }
};
