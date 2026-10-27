import { CalendarEvent, TithiInfo, BSDate } from '../types';
import { OFFICIAL_2083_EVENTS } from './official2083Data';

export interface FixedHoliday {
  month: number;
  day: number;
  titleNe: string;
  titleEn: string;
  isOfficialHoliday: boolean;
  category: 'festival' | 'holiday';
  description: string;
}

// Fixed Bikram Sambat Dates (National Holidays & Cultural Celebrations)
export const FIXED_NEPALI_HOLIDAYS: FixedHoliday[] = [
  // Baishakh (Month 1)
  { month: 1, day: 1, titleNe: 'नयाँ वर्ष (नेपाली नयाँ वर्ष)', titleEn: 'Nepali New Year (Baisakh 1)', isOfficialHoliday: true, category: 'holiday', description: 'राष्ट्रिय पर्व तथा नयाँ वर्षको सुरुवात।' },
  { month: 1, day: 11, titleNe: 'लोकतन्त्र दिवस', titleEn: 'Loktantra Diwas (Democracy Day)', isOfficialHoliday: false, category: 'holiday', description: 'नेपालमा लोकतन्त्र पुनर्बहाली भएको ऐतिहासिक दिन।' },
  
  // Jestha (Month 2)
  { month: 2, day: 15, titleNe: 'गणतन्त्र दिवस', titleEn: 'Republic Day (Ganatantra Diwas)', isOfficialHoliday: true, category: 'holiday', description: 'नेपाल संघीय लोकतान्त्रिक गणतन्त्र घोषणा भएको दिन।' },
  
  // Ashadh (Month 3)
  { month: 3, day: 15, titleNe: 'धान दिवस (दही चिउरा खाने दिन)', titleEn: 'National Paddy Day (Dahi Chiura)', isOfficialHoliday: false, category: 'festival', description: 'असार पन्ध्र, राष्ट्रिय धान दिवस।' },
  
  // Shrawan (Month 4)
  { month: 4, day: 1, titleNe: 'साउने संक्रान्ति (लुतो फाल्ने दिन)', titleEn: 'Saune Sankranti', isOfficialHoliday: false, category: 'festival', description: 'वर्षायामको मध्य र सांस्कृतिक पर्व।' },
  { month: 4, day: 15, titleNe: 'खीर खाने दिन', titleEn: 'Kheer Khane Din (Pudding Day)', isOfficialHoliday: false, category: 'festival', description: 'परम्परागत स्वादिलो खीर खाएर मनाइने दिन।' },
  
  // Bhadra (Month 5)
  { month: 5, day: 8, titleNe: 'विश्व आदिवासी दिवस', titleEn: 'World Indigenous Peoples Day', isOfficialHoliday: false, category: 'holiday', description: 'अन्तर्राष्ट्रिय आदिवासी जनजाति दिवस।' },
  
  // Ashwin (Month 6)
  { month: 6, day: 1, titleNe: 'विश्वकर्मा पूजा', titleEn: 'Vishwakarma Puja', isOfficialHoliday: false, category: 'festival', description: 'शिल्प तथा प्रविधिको देवता विश्वकर्माको पूजा।' },
  { month: 6, day: 3, titleNe: 'संविधान दिवस (राष्ट्रिय दिवस)', titleEn: 'Constitution Day (National Day)', isOfficialHoliday: true, category: 'holiday', description: 'नेपालको नयाँ संविधान जारी भएको राष्ट्रिय पर्व।' },
  
  // Kartik (Month 7)
  // Most Kartik events are Tithi-based (Dashain / Tihar)
  
  // Mangsir (Month 8)
  { month: 8, day: 1, titleNe: 'राष्ट्रिय चिया दिवस', titleEn: 'National Tea Day', isOfficialHoliday: false, category: 'holiday', description: 'नेपाली चियाको प्रवर्द्धन गर्ने दिन।' },

  // Poush (Month 9)
  { month: 9, day: 15, titleNe: 'तमु ल्होसार', titleEn: 'Tamu Lhosar (Gurung New Year)', isOfficialHoliday: true, category: 'holiday', description: 'गुरुङ समुदायको महान नयाँ वर्ष पर्व।' },
  { month: 9, day: 27, titleNe: 'पृथ्वी जयन्ती / राष्ट्रिय एकता दिवस', titleEn: 'Prithvi Jayanti / National Unity Day', isOfficialHoliday: true, category: 'holiday', description: 'नेपाल एकीकरणकर्ता बडामहाराजाधिराज पृथ्वीनारायण शाहको जन्मजयन्ती।' },

  // Magh (Month 10)
  { month: 10, day: 1, titleNe: 'माघे संक्रान्ति / माघी पर्व', titleEn: 'Maghe Sankranti / Maghi', isOfficialHoliday: true, category: 'holiday', description: 'मकर संक्रान्ति तथा थारू समुदायको नयाँ वर्ष माघी।' },
  { month: 10, day: 16, titleNe: 'शहीद दिवस', titleEn: 'Martyrs Day (Sahid Diwas)', isOfficialHoliday: false, category: 'holiday', description: 'देशका लागि ज्यान आहुति दिने अमर शहीदहरूको सम्झना।' },

  // Falgun (Month 11)
  { month: 11, day: 7, titleNe: 'राष्ट्रिय प्रजातन्त्र दिवस', titleEn: 'National Democracy Day', isOfficialHoliday: true, category: 'holiday', description: '२००७ सालको क्रान्ति सफल भएको दिन।' },

  // Chaitra (Month 12)
  { month: 12, day: 24, titleNe: 'अन्तर्राष्ट्रिय महिला दिवस', titleEn: 'International Women Day', isOfficialHoliday: true, category: 'holiday', description: 'महिला अधिकार तथा समानताको अन्तर्राष्ट्रिय दिवस।' },
];

export interface TithiFestival {
  month: number; // BS month rough or exact window
  paksha: 'शुक्ल' | 'कृष्ण';
  tithiIndex: number;
  titleNe: string;
  titleEn: string;
  isOfficialHoliday: boolean;
  category: 'festival' | 'holiday';
  description: string;
}

export const TITHI_FESTIVALS: TithiFestival[] = [
  // Baishakh
  { month: 1, paksha: 'शुक्ल', tithiIndex: 3, titleNe: 'अक्षय तृतीया', titleEn: 'Akshaya Tritiya', isOfficialHoliday: false, category: 'festival', description: 'सतु र सर्वत खाने पवित्र दिन।' },
  { month: 1, paksha: 'शुक्ल', tithiIndex: 15, titleNe: 'बुद्ध जयन्ती / उभौली पर्व / चण्डी पूर्णिमा', titleEn: 'Buddha Jayanti / Ubhauli Parva', isOfficialHoliday: true, category: 'holiday', description: 'भगवान् गौतम बुद्धको जन्म, ज्ञान प्राप्ति र महापरिनिर्वाण दिवस।' },

  // Jestha
  { month: 2, paksha: 'शुक्ल', tithiIndex: 11, titleNe: 'निर्जला एकादशी', titleEn: 'Nirjala Ekadashi', isOfficialHoliday: false, category: 'festival', description: 'पानी समेत नपिई गरिने पवित्र एकादशी व्रत।' },

  // Ashadh
  { month: 3, paksha: 'शुक्ल', tithiIndex: 11, titleNe: 'हरिशयनी एकादशी (तुलसी रोप्ने दिन)', titleEn: 'Harishayani Ekadashi', isOfficialHoliday: false, category: 'festival', description: 'भगवान् विष्णु शयन गर्ने र घरघरमा तुलसीको बिरुवा रोप्ने दिन।' },
  { month: 3, paksha: 'शुक्ल', tithiIndex: 15, titleNe: 'गुरु पूर्णिमा / व्यास जयन्ती', titleEn: 'Guru Purnima', isOfficialHoliday: false, category: 'festival', description: 'गुरुप्रति श्रद्धा र सम्मान प्रकट गर्ने पावन दिन।' },

  // Shrawan
  { month: 4, paksha: 'शुक्ल', tithiIndex: 5, titleNe: 'नाग पञ्चमी', titleEn: 'Nag Panchami', isOfficialHoliday: false, category: 'festival', description: 'घरको ढोकामा नागको चित्र टाँसेर पूजा गर्ने दिन।' },
  { month: 4, paksha: 'शुक्ल', tithiIndex: 15, titleNe: 'जनै पूर्णिमा / रक्षाबन्धन / गाईजात्रा', titleEn: 'Janai Purnima / Rakshabandhan / Gai Jatra', isOfficialHoliday: true, category: 'holiday', description: 'पवित्र डोरो बाँध्ने, जनै फेर्ने, क्वाँटी खाने र नेवार समुदायको गाईजात्रा पर्व।' },

  // Bhadra
  { month: 5, paksha: 'कृष्ण', tithiIndex: 8, titleNe: 'श्रीकृष्ण जन्माष्टमी', titleEn: 'Shree Krishna Janmashtami', isOfficialHoliday: true, category: 'holiday', description: 'भगवान् श्रीकृष्णको जन्मोत्सव।' },
  { month: 5, paksha: 'शुक्ल', tithiIndex: 3, titleNe: 'हरितालिका तीज (महिला बिदा)', titleEn: 'Haritalika Teej', isOfficialHoliday: true, category: 'holiday', description: 'नेपाली हिन्दू नारीहरूको महान् सांस्कृतिक पर्व।' },
  { month: 5, paksha: 'शुक्ल', tithiIndex: 4, titleNe: 'गणेश चतुर्थी', titleEn: 'Ganesh Chaturthi', isOfficialHoliday: false, category: 'festival', description: 'विघ्नहर्ता भगवान् गणेशको पूजा आराधना।' },
  { month: 5, paksha: 'शुक्ल', tithiIndex: 5, titleNe: 'ऋषि पञ्चमी', titleEn: 'Rishi Panchami', isOfficialHoliday: false, category: 'festival', description: 'सप्तर्षिको पूजा र पवित्र स्नान।' },
  { month: 5, paksha: 'शुक्ल', tithiIndex: 14, titleNe: 'अनन्त चतुर्दशी / इन्द्रजात्रा', titleEn: 'Indra Jatra (Kathmandu)', isOfficialHoliday: true, category: 'holiday', description: 'काठमाडौं उपत्यकाको प्रसिद्ध इन्द्रजात्रा पर्व।' },

  // Ashwin (Dashain Season)
  { month: 6, paksha: 'शुक्ल', tithiIndex: 1, titleNe: 'घटस्थापना (बडादशैं प्रारम्भ)', titleEn: 'Ghatasthapana (Dashain Begins)', isOfficialHoliday: true, category: 'holiday', description: 'जमरा राख्ने र नवरात्र सुरु हुने दिन।' },
  { month: 6, paksha: 'शुक्ल', tithiIndex: 7, titleNe: 'फूलपाती (बडादशैं)', titleEn: 'Fulpati (Dashain)', isOfficialHoliday: true, category: 'holiday', description: 'दशैंको सातौं दिन, फूलपाती भित्र्याउने दिन।' },
  { month: 6, paksha: 'शुक्ल', tithiIndex: 8, titleNe: 'महाअष्टमी (कालरात्रि)', titleEn: 'Maha Ashtami (Dashain)', isOfficialHoliday: true, category: 'holiday', description: 'दुर्गा भवानीको विशेष पूजा तथा बली अर्पण।' },
  { month: 6, paksha: 'शुक्ल', tithiIndex: 9, titleNe: 'महानवमी (दशैं)', titleEn: 'Maha Navami (Dashain)', isOfficialHoliday: true, category: 'holiday', description: 'नवदुर्गा पूजाको अन्तिम दिन तथा कलपुर्जा पूजा।' },
  { month: 6, paksha: 'शुक्ल', tithiIndex: 10, titleNe: 'विजया दशमी (बडादशैंको मुख्य दिन)', titleEn: 'Vijaya Dashami (Tika Day)', isOfficialHoliday: true, category: 'holiday', description: 'मान्यजनबाट रातो टीका र पहेँलो जमरा लगाई आशिर्वाद लिने महान् दिन।' },
  { month: 6, paksha: 'शुक्ल', tithiIndex: 11, titleNe: 'पापांकुशा एकादशी (दशैं बिदा)', titleEn: 'Papankusha Ekadashi', isOfficialHoliday: true, category: 'holiday', description: 'दशैं टीकाको निरन्तरता।' },
  { month: 6, paksha: 'शुक्ल', tithiIndex: 15, titleNe: 'कोजाग्रत पूर्णिमा (दशैं समापन)', titleEn: 'Kojagrat Purnima', isOfficialHoliday: false, category: 'festival', description: 'लक्ष्मी पूजा र बडादशैंको विधिवत समापन।' },

  // Kartik (Tihar Season)
  { month: 7, paksha: 'कृष्ण', tithiIndex: 13, titleNe: 'काग तिहार / धनतेरस', titleEn: 'Kaag Tihar / Dhanteras', isOfficialHoliday: false, category: 'festival', description: 'यमदूत कागको पूजा तथा धनतेरसमा नयाँ भाँडाकुँडा किन्ने दिन।' },
  { month: 7, paksha: 'कृष्ण', tithiIndex: 14, titleNe: 'कुकुर तिहार / नरक चतुर्दशी', titleEn: 'Kukur Tihar', isOfficialHoliday: false, category: 'festival', description: 'मानवको बफादार साथी कुकुरको पूजा।' },
  { month: 7, paksha: 'कृष्ण', tithiIndex: 15, titleNe: 'लक्ष्मी पूजा (दीपावली / सुखरात्रि)', titleEn: 'Laxmi Puja (Diwali)', isOfficialHoliday: true, category: 'holiday', description: 'धनकी देवी माता लक्ष्मीको भव्य पूजा र दीप प्रज्वलन।' },
  { month: 7, paksha: 'शुक्ल', tithiIndex: 1, titleNe: 'गाई पूजा / गोवर्धन पूजा / म्ह पूजा', titleEn: 'Gai Puja / Mha Puja (Nepal Sambat New Year)', isOfficialHoliday: true, category: 'holiday', description: 'नेपाल संवत् नयाँ वर्ष तथा नेवार समुदायमा आत्मपूजा।' },
  { month: 7, paksha: 'शुक्ल', tithiIndex: 2, titleNe: 'भाइटीका (यमद्वितीया)', titleEn: 'Bhai Tika (Tihar)', isOfficialHoliday: true, category: 'holiday', description: 'दिदीबहिनीले दाजुभाइलाई सप्तरङ्गी टीका लगाउने पावन पर्व।' },
  { month: 7, paksha: 'शुक्ल', tithiIndex: 6, titleNe: 'छठ पर्व', titleEn: 'Chhath Parva', isOfficialHoliday: true, category: 'holiday', description: 'अस्ताउँदो र उदाउँदो सूर्यदेव तथा छठी माताको पवित्र उपासना।' },
  { month: 7, paksha: 'शुक्ल', tithiIndex: 11, titleNe: 'हरिबोधिनी एकादशी (तुलसी विवाह)', titleEn: 'Haribodhini Ekadashi (Tulsi Vivah)', isOfficialHoliday: false, category: 'festival', description: 'विष्णु भगवान् जाग्ने र तुलसीको विवाह उत्सव।' },

  // Mangsir
  { month: 8, paksha: 'शुक्ल', tithiIndex: 15, titleNe: 'उधौली पर्व / योमरी पुन्ही', titleEn: 'Udhauli Parva / Yomari Punhi', isOfficialHoliday: true, category: 'holiday', description: 'किराँत समुदायको उधौली तथा नेवार समुदायको योमरी खाने पर्व।' },

  // Magh
  { month: 10, paksha: 'शुक्ल', tithiIndex: 5, titleNe: 'सरस्वती पूजा / श्रीपञ्चमी (वसन्त पञ्चमी)', titleEn: 'Saraswati Puja / Vasant Panchami', isOfficialHoliday: false, category: 'festival', description: 'विद्याकी देवी माता सरस्वतीको आराधना तथा अक्षरारम्भ।' },
  { month: 10, paksha: 'कृष्ण', tithiIndex: 15, titleNe: 'सोनाम ल्होसार', titleEn: 'Sonam Lhosar (Tamang New Year)', isOfficialHoliday: true, category: 'holiday', description: 'तामाङ समुदायको महान् नयाँ वर्ष उत्सव।' },

  // Falgun
  { month: 11, paksha: 'कृष्ण', tithiIndex: 14, titleNe: 'महाशिवरात्रि', titleEn: 'Maha Shivaratri', isOfficialHoliday: true, category: 'holiday', description: 'देवाधिदेव महादेव शिवको भव्य आराधना तथा पशुपतिनाथ मेला।' },
  { month: 11, paksha: 'शुक्ल', tithiIndex: 1, titleNe: 'ग्याल्पो ल्होसार', titleEn: 'Gyalpo Lhosar (Sherpa New Year)', isOfficialHoliday: true, category: 'holiday', description: 'शेर्पा तथा भोटे समुदायको नयाँ वर्ष।' },
  { month: 11, paksha: 'शुक्ल', tithiIndex: 15, titleNe: 'फागु पूर्णिमा (होली पहाड)', titleEn: 'Holi Festival (Hills)', isOfficialHoliday: true, category: 'holiday', description: 'रङ्गहरूको उल्लासमय चाड फागु पूर्णिमा।' },

  // Chaitra
  { month: 12, paksha: 'शुक्ल', tithiIndex: 8, titleNe: 'चैते दशैं', titleEn: 'Chaite Dashain', isOfficialHoliday: false, category: 'festival', description: 'चैत्र शुक्ल अष्टमीको दशैं पर्व।' },
  { month: 12, paksha: 'शुक्ल', tithiIndex: 9, titleNe: 'रामनवमी', titleEn: 'Ram Navami', isOfficialHoliday: true, category: 'holiday', description: 'मर्यादा पुरुषोत्तम भगवान् श्रीरामचन्द्रको जन्मोत्सव।' },
  { month: 12, paksha: 'कृष्ण', tithiIndex: 15, titleNe: 'घोडेजात्रा (काठमाडौं उपत्यका)', titleEn: 'Ghode Jatra', isOfficialHoliday: true, category: 'holiday', description: 'काठमाडौंको टुँडिखेलमा मनाइने परम्परागत घोडेजात्रा।' },
];

/**
 * Resolve all events, festivals, and public holidays for a given BS date and Tithi
 */
export function getEventsForDay(
  bsDate: BSDate,
  tithi: TithiInfo,
  dayOfWeek: number
): { events: CalendarEvent[]; isPublicHoliday: boolean } {
  const events: CalendarEvent[] = [];
  const dateStr = `${bsDate.year}-${String(bsDate.month).padStart(2, '0')}-${String(bsDate.day).padStart(2, '0')}`;
  let isPublicHoliday = false;

  // 1. Saturday is always an official holiday in Nepal
  if (dayOfWeek === 6) {
    isPublicHoliday = true;
  }

  // Authoritative events from Events_and_Holidays___BS_2083_fa2e94ff.csv
  if (bsDate.year === 2083) {
    const key = `${bsDate.month}-${bsDate.day}`;
    const officialEvts = OFFICIAL_2083_EVENTS[key];
    if (officialEvts) {
      for (let i = 0; i < officialEvts.length; i++) {
        const item = officialEvts[i];
        if (item.isHoliday) isPublicHoliday = true;
        events.push({
          id: `official-2083-${bsDate.month}-${bsDate.day}-${i}`,
          title: item.title,
          titleEn: item.titleEn,
          nepaliDateStr: dateStr,
          isHoliday: item.isHoliday,
          isOfficialGovHoliday: item.isHoliday,
          category: item.isHoliday ? 'holiday' : 'festival',
          description: `${item.titleEn} (${item.category})`,
        });
      }
    }
    return { events, isPublicHoliday };
  }

  // 2. Fallback Fixed BS Solar Holidays for other years
  const fixedMatch = FIXED_NEPALI_HOLIDAYS.filter(
    (h) => h.month === bsDate.month && h.day === bsDate.day
  );
  for (const item of fixedMatch) {
    if (item.isOfficialHoliday) isPublicHoliday = true;
    events.push({
      id: `fixed-${item.month}-${item.day}`,
      title: item.titleNe,
      titleEn: item.titleEn,
      nepaliDateStr: dateStr,
      isHoliday: true,
      isOfficialGovHoliday: item.isOfficialHoliday,
      category: item.category,
      description: item.description,
    });
  }

  // 3. Check Tithi Festivals
  // Match current month, paksha, and tithi
  const tithiMatch = TITHI_FESTIVALS.filter(
    (tf) =>
      tf.month === bsDate.month &&
      tf.paksha === tithi.paksha &&
      tf.tithiIndex === tithi.tithiIndex
  );

  for (const tf of tithiMatch) {
    if (tf.isOfficialHoliday) isPublicHoliday = true;
    events.push({
      id: `tithi-${bsDate.month}-${tf.paksha}-${tf.tithiIndex}`,
      title: tf.titleNe,
      titleEn: tf.titleEn,
      nepaliDateStr: dateStr,
      isHoliday: true,
      isOfficialGovHoliday: tf.isOfficialHoliday,
      category: tf.category,
      description: tf.description,
    });
  }

  // Special case: Terai Holi is the day after Fagu Purnima (Falgun Shukla Purnima + 1 day)
  if (bsDate.month === 11 && tithi.paksha === 'कृष्ण' && tithi.tithiIndex === 1) {
    isPublicHoliday = true;
    events.push({
      id: 'holi-terai',
      title: 'फागु पूर्णिमा (होली तराई)',
      titleEn: 'Holi Festival (Terai)',
      nepaliDateStr: dateStr,
      isHoliday: true,
      isOfficialGovHoliday: true,
      category: 'holiday',
      description: 'तराई तथा मधेश क्षेत्रमा हर्षोल्लासपूर्वक मनाइने रङ्गहरूको पर्व।',
    });
  }

  return { events, isPublicHoliday };
}
