export type Language = "en" | "fa";

export const translations = {
  en: {
    meta: {
      title: "Iranian Stone Reference | Natural Stone",
      description:
        "Explore excellence in natural stone for unique and exclusive interiors and exteriors.",
    },
    nav: {
      brand: "IRANIAN STONE REFERENCE®",
      hauteNature: "HAUTE NATURE®",
      history: "HISTORY",
      collections: "COLLECTIONS",
      geofamily: "GEOFAMILY",
      innovation: "INNOVATION",
      ladyA: "LADY A",
      stoneroom: "STONEROOM®",
      storeLocator: "STORE LOCATOR",
      fairsEvents: "FAIRS & EVENTS",
      contactUs: "CONTACT US",
      menu: "MENU",
      langLabel: "FA",
    },
    hero: {
      title: "IRANIAN STONE REFERENCE® HAUTE NATURE®",
      subtitle: "Designed by Nature, Perfected in Iran.",
      exclusiveCollection: "Iranian Stone Reference® Exclusive Collection",
      collections: "Iranian Stone Reference® Collections",
      discoverMore: "Discover More",
      year2024: "IRANIAN STONE REFERENCE® 2024",
    },
    collections: {
      brand: "IRANIAN STONE REFERENCE®",
      exclusiveTitle: "EXCLUSIVE COLLECTION",
      exclusiveBody:
        "Exclusivity through tradition and expertise. Iranian Stone Reference® is curator to Nature's most desired and recognisable masterpieces.",
      discoverMaterial: "DISCOVER THIS MATERIAL",
      discoverMore: "DISCOVER MORE",
      tablewareTitle: "TABLEWARE",
      innovationTitle: "INNOVATION",
      discover: "DISCOVER",
    },
    technology: {
      azerocare:
        "New technology developed for surfaces in Leather, Matt and Lux® finish",
      avp: "Advanced Vein Process technology for natural stone",
      azerobact: "Antibacterial technology for natural stone surfaces",
      discoverMore: "Discover more",
    },
    newsletter: {
      heading: "NEWSLETTER",
      title: "STAY UPDATED",
      emailPlaceholder: "E-MAIL",
      privacyText:
        "I have read and authorize the use of my personal data. * Required field",
      subscribe: "SUBSCRIBE",
      thankYou: "Thank you for subscribing!",
    },
    footer: {
      storeLocator: "STORE LOCATOR",
      contacts: "CONTACTS",
      terms: "TERMS",
      legalNotes: "LEGAL NOTES",
      cookies: "COOKIES",
      companyName: "Iranian Stone Reference",
      address: "Tehran, Iran",
      vatNumber: "REG: IR-1234-56789",
      emailInfo: "info@iranianstone.ir",
      emailPrivacy: "privacy@iranianstone.ir",
    },
  },
  fa: {
    meta: {
      title: "مرجع سنگ ایرانی | سنگ طبیعی",
      description:
        "کشف برتری در سنگ طبیعی برای فضاهای داخلی و خارجی منحصر به فرد و اختصاصی.",
    },
    nav: {
      brand: "مرجع سنگ ایرانی®",
      hauteNature: "طبیعت برتر®",
      history: "تاریخچه",
      collections: "مجموعه‌ها",
      geofamily: "خانواده سنگ",
      innovation: "نوآوری",
      ladyA: "بانو آ",
      stoneroom: "استون‌روم®",
      storeLocator: "یافتن فروشگاه",
      fairsEvents: "نمایشگاه‌ها و رویدادها",
      contactUs: "تماس با ما",
      menu: "منو",
      langLabel: "EN",
    },
    hero: {
      title: "مرجع سنگ ایرانی® طبیعت برتر®",
      subtitle: "طراحی شده توسط طبیعت، کامل شده در ایران.",
      exclusiveCollection: "مجموعه انحصاری مرجع سنگ ایرانی®",
      collections: "مجموعه‌های مرجع سنگ ایرانی®",
      discoverMore: "بیشتر کشف کنید",
      year2024: "مرجع سنگ ایرانی® ۱۴۰۳",
    },
    collections: {
      brand: "مرجع سنگ ایرانی®",
      exclusiveTitle: "مجموعه انحصاری",
      exclusiveBody:
        "انحصاریت از طریق سنت و تخصص. مرجع سنگ ایرانی® متولی برترین و شناخته‌شده‌ترین شاهکارهای طبیعت است.",
      discoverMaterial: "کشف این ماده",
      discoverMore: "بیشتر کشف کنید",
      tablewareTitle: "ظروف سنگی",
      innovationTitle: "نوآوری",
      discover: "کشف کنید",
    },
    technology: {
      azerocare:
        "تکنولوژی جدید توسعه‌یافته برای سطوح با پوشش چرم، مات و لوکس®",
      avp: "تکنولوژی فرآیند رگه پیشرفته برای سنگ طبیعی",
      azerobact: "تکنولوژی ضدباکتری برای سطوح سنگ طبیعی",
      discoverMore: "بیشتر بدانید",
    },
    newsletter: {
      heading: "خبرنامه",
      title: "به‌روز بمانید",
      emailPlaceholder: "ایمیل",
      privacyText:
        "اطلاعات شخصی خود را خوانده و به استفاده از آن موافقت می‌کنم. * فیلد الزامی",
      subscribe: "عضویت",
      thankYou: "ممنون از ثبت‌نام شما!",
    },
    footer: {
      storeLocator: "یافتن فروشگاه",
      contacts: "تماس",
      terms: "شرایط",
      legalNotes: "یادداشت‌های حقوقی",
      cookies: "کوکی‌ها",
      companyName: "مرجع سنگ ایرانی",
      address: "تهران، ایران",
      vatNumber: "کد ثبت: ۱۲۳۴-۵۶۷۸۹",
      emailInfo: "info@iranianstone.ir",
      emailPrivacy: "privacy@iranianstone.ir",
    },
  },
};

export type Translations = (typeof translations)[Language];
