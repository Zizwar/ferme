/**
 * Ferme Rêve d'Enfance - Multilingual Interactive Engine
 * Seamless RTL/LTR support, live currency calculator, lightbox & WhatsApp booking
 */

document.addEventListener('DOMContentLoaded', () => {
  // Detect current language from <html lang="...">
  const currentLang = document.documentElement.lang || 'fr';
  const i18n = (window.FERME_I18N && window.FERME_I18N[currentLang]) ? window.FERME_I18N[currentLang] : (window.FERME_I18N ? window.FERME_I18N.fr : {});

  // Save current language to localStorage
  try {
    localStorage.setItem('user_preferred_lang', currentLang);
  } catch (e) {}

  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Set default dates for booking inputs (Tomorrow -> in 3 days)
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const checkOutDate = new Date(tomorrow);
  checkOutDate.setDate(checkOutDate.getDate() + 2);

  const formatDate = (d) => d.toISOString().split('T')[0];

  const quickArrival = document.getElementById('quickArrival');
  const quickDeparture = document.getElementById('quickDeparture');
  const bookingArrival = document.getElementById('arrivalDate');
  const bookingDeparture = document.getElementById('departureDate');

  if (quickArrival && !quickArrival.value) quickArrival.value = formatDate(tomorrow);
  if (quickDeparture && !quickDeparture.value) quickDeparture.value = formatDate(checkOutDate);
  if (bookingArrival && !bookingArrival.value) bookingArrival.value = formatDate(tomorrow);
  if (bookingDeparture && !bookingDeparture.value) bookingDeparture.value = formatDate(checkOutDate);

  // Sync Quick Hero Bar to Booking Form
  const heroCheckBtn = document.getElementById('heroCheckBtn');
  if (heroCheckBtn) {
    heroCheckBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (bookingArrival && quickArrival) bookingArrival.value = quickArrival.value;
      if (bookingDeparture && quickDeparture) bookingDeparture.value = quickDeparture.value;
      const guests = document.getElementById('quickGuests');
      const adults = document.getElementById('adultsCount');
      if (guests && adults) {
        adults.value = guests.value || '4';
      }
      
      calculatePrice();
      
      const bookingSection = document.getElementById('reservation');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Pool Day/Night Toggle
  const poolDayBtn = document.getElementById('poolDayBtn');
  const poolNightBtn = document.getElementById('poolNightBtn');
  const poolDayImg = document.getElementById('poolDayImg');
  const poolNightImg = document.getElementById('poolNightImg');
  const poolModeBadge = document.getElementById('poolModeBadge');
  const poolDescription = document.getElementById('poolDescription');

  if (poolDayBtn && poolNightBtn && poolDayImg && poolNightImg) {
    poolDayBtn.addEventListener('click', () => {
      poolDayBtn.classList.remove('bg-white/20', 'text-stone-300');
      poolDayBtn.classList.add('bg-white', 'text-[#1E332B]', 'shadow-md');

      poolNightBtn.classList.remove('bg-white', 'text-[#1E332B]', 'shadow-md');
      poolNightBtn.classList.add('bg-white/20', 'text-stone-300');

      poolDayImg.style.opacity = '1';
      poolNightImg.style.opacity = '0';

      if (poolModeBadge && i18n.pool) poolModeBadge.textContent = i18n.pool.dayBadge;
      if (poolDescription && i18n.pool) poolDescription.textContent = i18n.pool.dayDesc;
    });

    poolNightBtn.addEventListener('click', () => {
      poolNightBtn.classList.remove('bg-white/20', 'text-stone-300');
      poolNightBtn.classList.add('bg-white', 'text-[#1E332B]', 'shadow-md');

      poolDayBtn.classList.remove('bg-white', 'text-[#1E332B]', 'shadow-md');
      poolDayBtn.classList.add('bg-white/20', 'text-stone-300');

      poolDayImg.style.opacity = '0';
      poolNightImg.style.opacity = '1';

      if (poolModeBadge && i18n.pool) poolModeBadge.textContent = i18n.pool.nightBadge;
      if (poolDescription && i18n.pool) poolDescription.textContent = i18n.pool.nightDesc;
    });
  }

  // Interactive Suite Switcher
  const suiteTabs = document.querySelectorAll('.suite-tab');
  const suitePanels = document.querySelectorAll('.suite-panel');

  suiteTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-target');
      suiteTabs.forEach((t) => {
        t.classList.remove('bg-olive-700', 'bg-[#2D4A3E]', 'text-white', 'shadow-md');
        t.classList.add('bg-white', 'text-olive-700');
      });
      tab.classList.remove('bg-white', 'text-olive-700');
      tab.classList.add('bg-olive-700', 'text-white', 'shadow-md');

      suitePanels.forEach((panel) => {
        if (panel.id === target) {
          panel.classList.remove('hidden');
          panel.classList.add('grid');
        } else {
          panel.classList.add('hidden');
          panel.classList.remove('grid');
        }
      });
    });
  });

  // Interactive Live Price Estimator
  const seasonSelect = document.getElementById('calcSeason');
  const nightsInput = document.getElementById('calcNights');
  const currencySelect = document.getElementById('calcCurrency');
  const optShuttle = document.getElementById('optShuttle');
  const optTajine = document.getElementById('optTajine');
  const optTea = document.getElementById('optTea');
  const optProjector = document.getElementById('optProjector');
  const optBabyBed = document.getElementById('optBabyBed');

  const priceBaseElem = document.getElementById('calcBasePrice');
  const priceNightsElem = document.getElementById('calcNightsCount');
  const priceOptionsElem = document.getElementById('calcOptionsPrice');
  const priceTotalElem = document.getElementById('calcTotalPrice');
  const priceCurrencyElem = document.getElementById('calcCurrencyCode');

  // Rates in MAD
  const exchangeRates = {
    MAD: 1,
    EUR: 0.093,
    USD: 0.10
  };

  function calculatePrice() {
    if (!priceTotalElem) return;

    const season = seasonSelect ? seasonSelect.value : 'high';
    const nights = Math.max(1, parseInt(nightsInput ? nightsInput.value : '2', 10) || 1);
    const curr = currencySelect ? currencySelect.value : 'MAD';
    const rate = exchangeRates[curr] || 1;
    const symbol = (i18n.currencySymbol && i18n.currencySymbol[curr]) ? i18n.currencySymbol[curr] : (curr === 'MAD' ? 'DH' : curr);
    const localeCode = i18n.locale || 'fr-FR';

    // Base price per night
    let baseNightRate = season === 'high' ? 2000 : 1200;
    if (season === 'low') baseNightRate = 1100;

    let subtotalStay = baseNightRate * nights;
    let optionsTotal = 0;

    if (optShuttle && optShuttle.checked) optionsTotal += 500; // Airport transfer
    if (optTajine && optTajine.checked) optionsTotal += 350; // Tajine workshop
    if (optTea && optTea.checked) optionsTotal += 150; // Tea ceremony
    if (optProjector && optProjector.checked) optionsTotal += 200; // Projector rental
    if (optBabyBed && optBabyBed.checked) optionsTotal += 100; // Baby bed

    let grandTotal = subtotalStay + optionsTotal;

    // Converted values
    const convSubtotal = Math.round(subtotalStay * rate);
    const convOptions = Math.round(optionsTotal * rate);
    const convGrandTotal = Math.round(grandTotal * rate);

    const nightUnit = nights > 1 ? (i18n.nightUnitPlural || 'nuits') : (i18n.nightUnitSingle || 'nuit');

    if (priceBaseElem) priceBaseElem.textContent = `${convSubtotal.toLocaleString(localeCode)} ${symbol}`;
    if (priceNightsElem) priceNightsElem.textContent = `${nights} ${nightUnit}`;
    if (priceOptionsElem) priceOptionsElem.textContent = `${convOptions.toLocaleString(localeCode)} ${symbol}`;
    if (priceTotalElem) priceTotalElem.textContent = `${convGrandTotal.toLocaleString(localeCode)} ${symbol}`;
    if (priceCurrencyElem) priceCurrencyElem.textContent = curr;
  }

  [seasonSelect, nightsInput, currencySelect, optShuttle, optTajine, optTea, optProjector, optBabyBed].forEach((elem) => {
    if (elem) {
      elem.addEventListener('input', calculatePrice);
      elem.addEventListener('change', calculatePrice);
    }
  });

  calculatePrice();

  // Booking Form & WhatsApp Direct Generator
  const bookingForm = document.getElementById('stayBookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('fullName')?.value || 'Client';
      const phone = document.getElementById('phoneNum')?.value || '---';
      const arrival = document.getElementById('arrivalDate')?.value || '---';
      const departure = document.getElementById('departureDate')?.value || '---';
      const adults = document.getElementById('adultsCount')?.value || '2';
      const children = document.getElementById('childrenCount')?.value || '0';
      const message = document.getElementById('specialNotes')?.value || (i18n.labels?.noNotes || 'None');

      // Selected options
      const selectedOpts = [];
      if (document.getElementById('formOptShuttle')?.checked) {
        selectedOpts.push(currentLang === 'ar' ? 'توصيل مطار محمد الخامس' : (currentLang === 'es' ? 'Traslado Aeropuerto' : (currentLang === 'en' ? 'Airport Shuttle' : 'Navette Aéroport')));
      }
      if (document.getElementById('formOptBaby')?.checked) {
        selectedOpts.push(currentLang === 'ar' ? 'سرير أطفال / مهد' : (currentLang === 'es' ? 'Cuna para bebé' : (currentLang === 'en' ? 'Baby Cot' : 'Lit Bébé')));
      }
      if (document.getElementById('formOptTajine')?.checked) {
        selectedOpts.push(currentLang === 'ar' ? 'ورشة طهي الطاجين المغربي' : (currentLang === 'es' ? 'Taller de Tajín' : (currentLang === 'en' ? 'Tajine Cooking Workshop' : 'Atelier Tajine')));
      }
      if (document.getElementById('formOptProjector')?.checked) {
        selectedOpts.push(currentLang === 'ar' ? 'شاشة عرض سينمائي (بروجكتور)' : (currentLang === 'es' ? 'Proyector de cine' : (currentLang === 'en' ? 'Movie Projector' : 'Vidéoprojecteur')));
      }

      const optionsStr = selectedOpts.length > 0 ? selectedOpts.join(', ') : (i18n.labels?.noOptions || 'Aucune option');

      const header = i18n.waBookingHeader || "Bonjour Ferme Rêve d'Enfance,";
      const footer = i18n.waBookingFooter || "Merci de confirmer la disponibilité.";
      const lbl = i18n.labels || {};

      const waText = 
`${header}

- ${lbl.fullName || 'Nom'} : ${fullName}
- ${lbl.phone || 'Tél'} : ${phone}
- ${lbl.arrival || 'Arrivée'} : ${arrival}
- ${lbl.departure || 'Départ'} : ${departure}
- ${lbl.guests || 'Participants'} : ${adults} ${lbl.adults || 'adultes'}, ${children} ${lbl.children || 'enfants'}
- ${lbl.options || 'Options'} : ${optionsStr}
- ${lbl.notes || 'Remarques'} : ${message}

${footer}`;

      const encoded = encodeURIComponent(waText);
      const waUrl = `https://wa.me/212661234567?text=${encoded}`;
      window.open(waUrl, '_blank');
    });
  }

  // Quick WhatsApp Floating Button Click
  const floatingWaBtn = document.getElementById('floatingWhatsApp');
  if (floatingWaBtn) {
    floatingWaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const text = encodeURIComponent(i18n.waGeneral || "Bonjour Ferme Rêve d'Enfance, je souhaiterais des informations sur vos disponibilités.");
      window.open(`https://wa.me/212661234567?text=${text}`, '_blank');
    });
  }

  // FAQ Accordion
  const accordionButtons = document.querySelectorAll('.faq-button');
  accordionButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-icon');
      const isOpen = !content.classList.contains('hidden');

      // Close all other accordions
      document.querySelectorAll('.faq-content').forEach((c) => {
        c.classList.add('hidden');
      });
      document.querySelectorAll('.faq-icon').forEach((i) => {
        i.style.transform = 'rotate(0deg)';
      });

      if (!isOpen) {
        content.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });

  // Language Dropdown Click & Touch Handlers
  const langDropdownContainers = document.querySelectorAll('.lang-dropdown-container');
  langDropdownContainers.forEach((container) => {
    const btn = container.querySelector('.lang-dropdown-btn') || container.querySelector('button');
    const menu = container.querySelector('.lang-dropdown-menu');
    if (btn && menu) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        // Close other dropdowns
        document.querySelectorAll('.lang-dropdown-menu').forEach((m) => {
          if (m !== menu) m.classList.remove('active');
        });
        menu.classList.toggle('active');
      });
    }
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.lang-dropdown-menu').forEach((m) => {
      m.classList.remove('active');
    });
  });

  // Mobile Menu Drawer
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const closeMobileMenu = document.getElementById('closeMobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuToggle && mobileDrawer) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileDrawer.classList.remove('translate-x-full');
      mobileDrawer.classList.add('translate-x-0');
    });

    if (closeMobileMenu) {
      closeMobileMenu.addEventListener('click', () => {
        mobileDrawer.classList.add('translate-x-full');
        mobileDrawer.classList.remove('translate-x-0');
      });
    }

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.add('translate-x-full');
        mobileDrawer.classList.remove('translate-x-0');
      });
    });
  }

  // Lightbox Modal for Photo Inspection
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const galleryItems = document.querySelectorAll('[data-lightbox-src]');

  let currentGalleryIndex = 0;
  const galleryList = Array.from(galleryItems).map((item) => ({
    src: item.getAttribute('data-lightbox-src') || item.getAttribute('src'),
    caption: item.getAttribute('data-lightbox-caption') || item.getAttribute('alt') || "Ferme Rêve d'Enfance"
  }));

  function openLightbox(index) {
    if (!lightboxModal || !galleryList[index]) return;
    currentGalleryIndex = index;
    lightboxImg.src = galleryList[index].src;
    lightboxCaption.textContent = galleryList[index].caption;
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightboxModal() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  galleryItems.forEach((item, idx) => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => openLightbox(idx));
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightboxModal);
  }

  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      currentGalleryIndex = (currentGalleryIndex - 1 + galleryList.length) % galleryList.length;
      lightboxImg.src = galleryList[currentGalleryIndex].src;
      lightboxCaption.textContent = galleryList[currentGalleryIndex].caption;
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      currentGalleryIndex = (currentGalleryIndex + 1) % galleryList.length;
      lightboxImg.src = galleryList[currentGalleryIndex].src;
      lightboxCaption.textContent = galleryList[currentGalleryIndex].caption;
    });
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal || e.target.id === 'lightboxBackdrop') {
        closeLightboxModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightboxModal();
    if (e.key === 'ArrowLeft' && lightboxModal?.classList.contains('active')) {
      currentGalleryIndex = (currentGalleryIndex - 1 + galleryList.length) % galleryList.length;
      lightboxImg.src = galleryList[currentGalleryIndex].src;
      lightboxCaption.textContent = galleryList[currentGalleryIndex].caption;
    }
    if (e.key === 'ArrowRight' && lightboxModal?.classList.contains('active')) {
      currentGalleryIndex = (currentGalleryIndex + 1) % galleryList.length;
      lightboxImg.src = galleryList[currentGalleryIndex].src;
      lightboxCaption.textContent = galleryList[currentGalleryIndex].caption;
    }
  });

  // Sticky Navbar Blur & Shadow on scroll
  const mainNavbar = document.getElementById('mainNavbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      mainNavbar.classList.add('shadow-md', 'bg-white/95');
      mainNavbar.classList.remove('bg-transparent');
    } else {
      mainNavbar.classList.remove('shadow-md', 'bg-white/95');
    }
  });
});
