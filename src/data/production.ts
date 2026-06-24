export interface ProductionStep {
  step: number;
  titleEn: string;
  titleFa: string;
  descriptionEn: string;
  descriptionFa: string;
  detailsEn: string[];
  detailsFa: string[];
  image: string;
}

export const productionSteps: ProductionStep[] = [
  {
    step: 1,
    titleEn: 'Quarry Exploration & Extraction',
    titleFa: 'اکتشاف و استخراج معدن',
    descriptionEn: 'Every ISR stone begins deep within Iranian mountain ranges. Our geology team identifies and validates deposit quality before any extraction begins, ensuring only the finest material is selected.',
    descriptionFa: 'هر سنگ ISR از اعماق رشته‌کوه‌های ایرانی آغاز می‌شود. تیم زمین‌شناسی ما کیفیت ذخایر را قبل از هر استخراجی شناسایی و تأیید می‌کند و اطمینان می‌دهد که فقط بهترین مواد انتخاب شوند.',
    detailsEn: ['Core sample & quality analysis', 'Geological survey & mapping', 'Diamond wire saw extraction', 'Block size optimisation'],
    detailsFa: ['آنالیز نمونه مغزه و کیفیت', 'بررسی و نقشه‌برداری زمین‌شناختی', 'استخراج با اره سیم الماسی', 'بهینه‌سازی اندازه بلوک'],
    image: '/images/banner-new-3.png',
  },
  {
    step: 2,
    titleEn: 'Block Transportation',
    titleFa: 'حمل و نقل بلوک',
    descriptionEn: 'Raw stone blocks weighing 5–25 tonnes are carefully transported from quarry to our processing facility in Tehran. Each block is individually tracked, documented, and inspected on arrival.',
    descriptionFa: 'بلوک‌های سنگ خام به وزن ۵ تا ۲۵ تن با دقت از معدن به کارخانه فرآوری ما در تهران منتقل می‌شوند. هر بلوک به صورت جداگانه ردیابی، مستند و در بدو ورود بازرسی می‌شود.',
    detailsEn: ['Heavy transport logistics', 'Block weight & dimension recording', 'Photographic documentation', 'Chain-of-custody tracking'],
    detailsFa: ['لجستیک حمل سنگین', 'ثبت وزن و ابعاد بلوک', 'مستندسازی عکاسی', 'ردیابی زنجیره حضانت'],
    image: '/images/banner-1.jpg',
  },
  {
    step: 3,
    titleEn: 'Primary Cutting — Gang Saw',
    titleFa: 'برش اولیه — اره گنگ',
    descriptionEn: 'Blocks are fed through multi-blade gang saws to produce rough slabs at the required thickness. This process takes 12–36 hours per block depending on stone hardness and the number of blades used.',
    descriptionFa: 'بلوک‌ها از طریق اره‌های گنگ چندتیغه عبور داده می‌شوند تا دال‌های خام با ضخامت مورد نیاز تولید شوند. این فرایند بسته به سختی سنگ و تعداد تیغه‌ها ۱۲ تا ۳۶ ساعت طول می‌کشد.',
    detailsEn: ['Multi-blade gang saw system', 'Continuous water cooling', 'Standard slab thickness: 18–30mm', 'Real-time quality monitoring'],
    detailsFa: ['سیستم اره گنگ چندتیغه', 'خنک‌کاری مستمر با آب', 'ضخامت استاندارد دال: ۱۸–۳۰ میلیمتر', 'پایش کیفیت در لحظه'],
    image: '/images/banner-new-2.png',
  },
  {
    step: 4,
    titleEn: 'Calibration & Resin Treatment',
    titleFa: 'کالیبراسیون و تیمار رزین',
    descriptionEn: 'Rough slabs are calibrated to precise thickness tolerances (±0.5mm) and treated with resin to fill natural voids — a process particularly critical for travertine and onyx to ensure surface integrity.',
    descriptionFa: 'دال‌های خام با تلرانس ضخامت دقیق (±۰.۵ میلیمتر) کالیبره می‌شوند و با رزین تیمار می‌شوند تا حفرات طبیعی پر شوند — فرآیندی که به ویژه برای تراورتن و مرمر حیاتی است.',
    detailsEn: ['±0.5mm thickness tolerance', 'Epoxy resin void-filling', 'UV-stable resin options', 'Fibre mesh backing (on request)'],
    detailsFa: ['تلرانس ضخامت ±۰.۵ میلیمتر', 'پرکردن حفرات با رزین اپوکسی', 'گزینه‌های رزین مقاوم UV', 'پشتیبان مش الیاف (در صورت درخواست)'],
    image: '/images/banner-2.jpg',
  },
  {
    step: 5,
    titleEn: 'Surface Finishing',
    titleFa: 'پرداخت سطح',
    descriptionEn: 'Slabs pass through our automated finishing lines where they receive their specified surface treatment. We offer polished, honed, brushed, leathered, and flamed finishes across all stone types.',
    descriptionFa: 'دال‌ها از خطوط پرداخت خودکار ما عبور می‌کنند و پرداخت سطح مشخص‌شده را دریافت می‌کنند. ما پولیش، مات، براش، چرم و شعله‌ای را برای همه انواع سنگ ارائه می‌دهیم.',
    detailsEn: ['Diamond abrasive polishing (up to 3000 grit)', 'Honing to 400-grit satin finish', 'Wire brush antique texturing', 'Leather finish diamond brushing'],
    detailsFa: ['پولیش ساینده الماسی (تا ۳۰۰۰ گریت)', 'هون تا پوشش ساتن ۴۰۰ گریت', 'بافت آنتیک با برس سیمی', 'پرداخت چرم با برس الماسی'],
    image: '/images/collection-exclusive.jpg',
  },
  {
    step: 6,
    titleEn: 'Quality Control & Grading',
    titleFa: 'کنترل کیفیت و درجه‌بندی',
    descriptionEn: 'Every slab is individually inspected under consistent lighting. Our QC team grades each piece for colour consistency, veining, surface quality, and structural integrity before assignment to export batches.',
    descriptionFa: 'هر دال در شرایط روشنایی یکنواخت به صورت جداگانه بازرسی می‌شود. تیم کنترل کیفیت ما هر قطعه را برای یکنواختی رنگ، رگه‌بندی و کیفیت سطح درجه‌بندی می‌کند.',
    detailsEn: ['Individual slab inspection', 'Colour matching & batch sorting', 'A / B / Commercial grade classification', 'Digital photography & measurement'],
    detailsFa: ['بازرسی فردی هر دال', 'تطبیق رنگ و مرتب‌سازی دسته', 'طبقه‌بندی A / B / تجاری', 'عکاسی دیجیتال و اندازه‌گیری'],
    image: '/images/bottom-banner-1.jpg',
  },
  {
    step: 7,
    titleEn: 'CNC Custom Processing',
    titleFa: 'فرآوری سفارشی CNC',
    descriptionEn: 'For bespoke projects, our CNC machinery produces precision-cut pieces, profiled edges, washbasin carving, and custom architectural elements to exact client specifications.',
    descriptionFa: 'برای پروژه‌های سفارشی، ماشین‌آلات CNC ما قطعات دقیق، لبه‌های پروفیل‌شده، تراشکاری روشویی و عناصر معماری سفارشی را طبق مشخصات دقیق مشتری تولید می‌کند.',
    detailsEn: ['5-axis CNC routing', 'Waterjet precision cutting', 'Edge profiling (ogee, bullnose, mitre)', 'Washbasin & furniture carving'],
    detailsFa: ['روتر CNC ۵ محوره', 'برش دقیق واترجت', 'پروفیل لبه (اوجی، بولنوز، مایتر)', 'تراشکاری روشویی و مبلمان'],
    image: '/images/collection-tech.jpg',
  },
  {
    step: 8,
    titleEn: 'Packaging & International Export',
    titleFa: 'بسته‌بندی و صادرات بین‌الملل',
    descriptionEn: 'Finished stone is packed in wooden crates with foam and cardboard interleaving to prevent movement during transit. We export by sea, air, and land freight to over 20 countries worldwide.',
    descriptionFa: 'سنگ نهایی در صندوق‌های چوبی با لایه‌گذاری فوم و مقوا بسته‌بندی می‌شود. ما به بیش از ۲۰ کشور از طریق دریا، هوا و باربری زمینی صادر می‌کنیم.',
    detailsEn: ['Wooden crate export packaging', 'Foam & paper interleaving', 'Fumigation certificate (if required)', 'Sea, air & land freight options'],
    detailsFa: ['بسته‌بندی صادراتی صندوق چوبی', 'لایه‌گذاری فوم و کاغذ', 'گواهی ضدعفونی (در صورت نیاز)', 'گزینه‌های باربری دریایی، هوایی و زمینی'],
    image: '/images/collection-tableware.jpg',
  },
];
