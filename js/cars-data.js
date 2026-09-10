/**
 * AURA MOTORS - База данных автомобилей
 * Тщательно отобранные актуальные премиальные и спортивные автомобили
 */

const CARS_DATA = [
  {
    id: "porsche-911-gt3-rs",
    brand: "Porsche",
    model: "911 GT3 RS (992)",
    year: 2024,
    category: "sports",
    price: 34500000,
    monthlyPayment: 395000,
    status: "В наличии",
    badge: "Эксклюзив",
    specs: {
      power: "525 л.с.",
      acceleration: "3.2 сек",
      maxSpeed: "296 км/ч",
      drive: "Задний (RWD)",
      engine: "4.0L Оппозитный атмосферный",
      transmission: "7-ст. PDK",
      fuelType: "Бензин",
      mileage: "450 км"
    },
    color: "Arctic Grey / Carbon Package",
    interior: "Race-Tex / Guards Red Stitching",
    images: [
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1611821064430-094754546fa3?auto=format&fit=crop&w=1200&q=85"
    ],
    features: [
      "Пакет Weissach с элементами из карбона",
      "Керамические композитные тормоза (PCCB)",
      "Активная аэродинамика с системой DRS",
      "Кованые магниевые диски GT3 RS 20/21 дюймов",
      "Акустическая система BOSE Surround Sound",
      "Телеметрия Porsche Track Precision"
    ],
    description: "Бескомпромиссный трековый снаряд, допущенный на дороги общего пользования. 525 л.с. чистого атмосферного звука и предельной прижимной силы."
  },
  {
    id: "porsche-taycan-turbo-s",
    brand: "Porsche",
    model: "Taycan Turbo S",
    year: 2024,
    category: "electric",
    price: 24900000,
    monthlyPayment: 285000,
    status: "В наличии",
    badge: "Новинка",
    specs: {
      power: "761 л.с.",
      acceleration: "2.8 сек",
      maxSpeed: "260 км/ч",
      drive: "Полный (AWD)",
      engine: "2 синхронных электромотора",
      transmission: "2-ст. на задней оси",
      fuelType: "Электро (93.4 кВт·ч)",
      mileage: "0 км (Новый)"
    },
    color: "Frozen Blue Metallic",
    interior: "Club Leather Olea Basalt Black",
    images: [
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=85"
    ],
    features: [
      "Адаптивная пневмоподвеска с PASM и Smart Lift",
      "Керамические тормоза PCCB с желтыми суппортами",
      "Панорамная крыша с переменной прозрачностью",
      "Дисплей для переднего пассажира",
      "Аудиосистема Burmester 3D High-End",
      "Запас хода до 480 км по циклу WLTP"
    ],
    description: "Электрический флагман из Штутгарта с моментальной отдачей 1050 Н·м крутящего момента и эталонной динамикой спорткара."
  },
  {
    id: "mercedes-amg-gt-63",
    brand: "Mercedes-AMG",
    model: "AMG GT 63 S Coupe 4MATIC+",
    year: 2024,
    category: "sports",
    price: 28900000,
    monthlyPayment: 330000,
    status: "В наличии",
    badge: "Премиум",
    specs: {
      power: "585 л.с.",
      acceleration: "3.2 сек",
      maxSpeed: "315 км/ч",
      drive: "Полный AMG Performance 4MATIC+",
      engine: "4.0L V8 Biturbo",
      transmission: "AMG SPEEDSHIFT MCT 9G",
      fuelType: "Бензин",
      mileage: "1 200 км"
    },
    color: "MANUFAKTUR Magno Selenite Grey (матовый)",
    interior: "Nappa Exklusiv Black / Yellow accents",
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1555353540-64580b51c258?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=85"
    ],
    features: [
      "Подруливающая задняя ось с углом до 2.5°",
      "Гидравлическая стабилизация кренов AMG ACTIVE RIDE",
      "Карбон-пакет экстерьера AMG Exterior Carbon II",
      "Спортивные ковши AMG Performance",
      "Проекционный дисплей с дополненной реальностью",
      "Выхлопная система AMG Performance с регулировкой звука"
    ],
    description: "Второе поколение легендарного гранд-турера. Новая формула 2+2, умный полный привод и брутальный характер ручной сборки двигателей V8."
  },
  {
    id: "bmw-m8-competition-gran-coupe",
    brand: "BMW",
    model: "M8 Competition Gran Coupe",
    year: 2024,
    category: "sedan",
    price: 26500000,
    monthlyPayment: 305000,
    status: "В наличии",
    badge: "Флагман",
    specs: {
      power: "625 л.с.",
      acceleration: "3.2 сек",
      maxSpeed: "305 км/ч (M Driver's)",
      drive: "Полный M xDrive (с режимом 2WD)",
      engine: "4.4L V8 M TwinPower Turbo",
      transmission: "8-ст. M Steptronic",
      fuelType: "Бензин",
      mileage: "2 800 км"
    },
    color: "Isle of Man Green Metallic",
    interior: "Full Leather Merino Silverstone / Black",
    images: [
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=85"
    ],
    features: [
      "Карбоновая крыша и карбоновые зеркала M",
      "Премиальная аудиосистема Bowers & Wilkins Diamond Surround",
      "Лазерные фары BMW Laserlight",
      "Многофункциональные M-сиденья с вентиляцией и массажем",
      "Спортивная выхлопная система M Sport",
      "Доводчики всех 4 дверей и термокомфортный пакет"
    ],
    description: "Четырехдверное купе высшего эшелона мощности. Непревзойденный баланс между роскошью первого класса и динамикой суперкара."
  },
  {
    id: "range-rover-sv-autobiography",
    brand: "Land Rover",
    model: "Range Rover SV LWB P530",
    year: 2024,
    category: "suv",
    price: 36000000,
    monthlyPayment: 410000,
    status: "В наличии",
    badge: "Exclusive",
    specs: {
      power: "530 л.с.",
      acceleration: "4.6 сек",
      maxSpeed: "261 км/ч",
      drive: "Интеллектуальный полный (iAWD)",
      engine: "4.4L Twin-Turbo V8",
      transmission: "8-ст. автоматическая ZF",
      fuelType: "Бензин",
      mileage: "600 км"
    },
    color: "British Racing Green SV Bespoke",
    interior: "Semi-Aniline Caraway / Perlino Leather",
    images: [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=85"
    ],
    features: [
      "Удлиненная база LWB с раздельными креслами SV Signature Suite",
      "Индивидуальный столик с электроприводом и бокалы Dartington Crystal",
      "Встроенный холодильник для напитков",
      "Акустика Meridian Signature 1600W с динамиками в подголовниках",
      "Полноуправляемое шасси (угол поворота задних колес 7.3°)",
      "Керамические селекторы и переключатели ручной формовки"
    ],
    description: "Вершина внедорожной аристократии. Исполнение Special Vehicle Operations (SV) дарит непревзойденный комфорт уровня частного джета."
  },
  {
    id: "audi-rs-e-tron-gt",
    brand: "Audi",
    model: "RS e-tron GT",
    year: 2024,
    category: "electric",
    price: 21900000,
    monthlyPayment: 250000,
    status: "В наличии",
    badge: "Электро",
    specs: {
      power: "646 л.с. (Boost)",
      acceleration: "3.3 сек",
      maxSpeed: "250 км/ч",
      drive: "Электрический quattro",
      engine: "Двухмоторная силовая установка",
      transmission: "2-ступенчатая трансмиссия",
      fuelType: "Электро (93 кВт·ч)",
      mileage: "150 км"
    },
    color: "Daytona Gray Pearl",
    interior: "Fine Nappa Leather / Honeycomb Stitching",
    images: [
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=85"
    ],
    features: [
      "Карбоно-керамическая тормозная система RS",
      "Аудиосистема Bang & Olufsen 3D Premium",
      "Матричные светодиодные фары с лазерным светом",
      "Адаптивная трехкамерная пневмоподвеска",
      "Уникальный электронный спортивный синтезатор звука e-tron Sportsound",
      "Запас хода 495 км"
    ],
    description: "Скульптурный гран-туризмо будущего. Эмоциональный дизайн, разработанный шеф-дизайнером Марком Лихте, и феноменальная стабильность quattro."
  },
  {
    id: "zeekr-001-fr",
    brand: "Zeekr",
    model: "001 FR Hyperdrive",
    year: 2024,
    category: "electric",
    price: 16800000,
    monthlyPayment: 195000,
    status: "Под заказ (7 дней)",
    badge: "1265 л.с.",
    specs: {
      power: "1 265 л.с.",
      acceleration: "2.07 сек",
      maxSpeed: "280 км/ч",
      drive: "Полный (4 электромотора с векторизацией)",
      engine: "Квадро-моторная система SiC",
      transmission: "Прямой привод на каждое колесо",
      fuelType: "Электро (100 кВт·ч Kirin)",
      mileage: "0 км"
    },
    color: "Matte Black with Red Carbon Accents",
    interior: "Alcantara & Carbon fiber interior",
    images: [
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=85"
    ],
    features: [
      "Разгон 0-100 км/ч быстрее болидов F1 — 2.07 секунды",
      "Керамические тормоза AP Racing с 10-поршневыми суппортами Brembo",
      "Танковый разворот на месте (Tank Turn)",
      "Спутниковая связь и автопилот с лидаром",
      "Углепластиковый аэродинамический обвес FR",
      "Поддержка ультрабыстрой зарядки 800V"
    ],
    description: "Гиперкар в кузове практичного Shooting Brake. 4 независимых мотора из карбида кремния и невероятная маневренность на любых покрытиях."
  },
  {
    id: "aston-martin-db12",
    brand: "Aston Martin",
    model: "DB12 Super Tourer",
    year: 2024,
    category: "sports",
    price: 38000000,
    monthlyPayment: 435000,
    status: "Под заказ (14 дней)",
    badge: "Super Tourer",
    specs: {
      power: "680 л.с.",
      acceleration: "3.6 сек",
      maxSpeed: "325 км/ч",
      drive: "Задний (RWD)",
      engine: "4.0L Twin-Turbo V8",
      transmission: "8-ст. автоматическая ZF",
      fuelType: "Бензин",
      mileage: "0 км"
    },
    color: "Aston Martin Racing Green",
    interior: "Bridge of Weir Haircell Tan Leather",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=85"
    ],
    features: [
      "Новейшая мультимедийная система с экраном 10.25\"",
      "Акустическая система Bowers & Wilkins 1170W",
      "Электронный задний дифференциал (E-Diff)",
      "Интеллектуальные амортизаторы Bilstein DTX нового поколения",
      "Кованые колесные диски 21 дюйм",
      "Кастомная строчка салона от Q by Aston Martin"
    ],
    description: "Первый в мире Super Tourer. 800 Н·м крутящего момента, непревзойденный шарм британской инженерии и безупречное внимание к каждой детали интерьера."
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CARS_DATA };
}
