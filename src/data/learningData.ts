/**
 * Complete academic dataset for IPAS Kelas 5 SD
 * Materi: Magnet, Listrik, dan Teknologi untuk Kehidupan
 * Penulis / Pengembang Media: Fredyka Elga Ariantama
 */

export interface LearningObjective {
  id: number;
  title: string;
  description: string;
  iconName: string;
}

export interface LearningModule {
  id: number;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  overview: string;
  readTime: string;
  image: string;
  sections: {
    heading: string;
    content: string;
    keyPoints?: string[];
    examples?: { name: string; type?: string; desc: string; icon?: string }[];
  }[];
  funFact: string;
  referenceText: string;
}

export interface QuizQuestion {
  id: number;
  moduleCategory: string;
  question: string;
  options: { key: 'A' | 'B' | 'C' | 'D'; text: string }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  sourceReference: string;
}

export const LEARNING_OBJECTIVES: LearningObjective[] = [
  {
    id: 1,
    title: 'Pengertian Magnet',
    description: 'Menjelaskan konsep magnet sebagai benda yang memiliki gaya tarik terhadap benda-benda logam tertentu.',
    iconName: 'Magnet',
  },
  {
    id: 2,
    title: 'Benda Magnetis & Nonmagnetis',
    description: 'Mengelompokkan benda di sekitar yang dapat ditarik magnet (feromagnetik) dan yang tidak dapat ditarik magnet.',
    iconName: 'Layers',
  },
  {
    id: 3,
    title: 'Kutub-Kutub Magnet',
    description: 'Menjelaskan dua kutub magnet, yaitu kutub utara (U) dan kutub selatan (S) serta letak kekuatan gaya magnet.',
    iconName: 'Compass',
  },
  {
    id: 4,
    title: 'Interaksi Antar Kutub Magnet',
    description: 'Membuktikan sifat tarik-menarik pada kutub berlawanan dan tolak-menolak pada kutub yang sejenis.',
    iconName: 'Repeat',
  },
  {
    id: 5,
    title: 'Pengertian Energi Listrik',
    description: 'Menjelaskan energi listrik secara sederhana sebagai bentuk energi dari aliran muatan listrik yang menggerakkan teknologi.',
    iconName: 'Zap',
  },
  {
    id: 6,
    title: 'Sumber Energi Listrik',
    description: 'Mengidentifikasi berbagai macam sumber energi listrik seperti baterai, aki, dinamo, dan pembangkit listrik.',
    iconName: 'BatteryCharging',
  },
  {
    id: 7,
    title: 'Komponen Rangkaian Listrik',
    description: 'Menjelaskan fungsi baterai, kabel penghantar, sakelar, dan lampu dalam rangkaian listrik sederhana.',
    iconName: 'Cpu',
  },
  {
    id: 8,
    title: 'Perubahan Bentuk Energi Listrik',
    description: 'Menganalisis transformasi energi listrik menjadi energi cahaya, panas, gerak, dan bunyi pada peralatan rumah tangga.',
    iconName: 'Flame',
  },
  {
    id: 9,
    title: 'Pemanfaatan Teknologi Terpadu',
    description: 'Mengidentifikasi penerapan magnet dan listrik pada bel rumah, kipas angin, pengeras suara, dan motor listrik.',
    iconName: 'Sparkles',
  },
  {
    id: 10,
    title: 'Sikap Bernalar Kritis & Pengamatan',
    description: 'Menumbuhkan rasa ingin tahu ilmiah melalui simulasi digital mandiri dan pengamatan laboratorium sains virtual.',
    iconName: 'Award',
  },
];

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: 1,
    slug: 'mengenal-magnet',
    number: '01',
    title: 'Mengenal Magnet & Benda di Sekitar Kita',
    subtitle: 'Keajaiban Batu Berani yang Menarik Logam',
    overview: 'Magnet adalah suatu benda yang mampu menarik benda-benda lain yang terbuat dari logam tertentu, seperti besi dan baja.',
    readTime: '6 menit baca',
    image: '/src/assets/images/illustration_magnet_field_1794388670109.jpg',
    sections: [
      {
        heading: 'Apa itu Magnet?',
        content: 'Kata magnet berasal dari bahasa Yunani "magnesia", yaitu nama wilayah di mana batu berkekuatan tarik alami pertama kali ditemukan. Dalam ilmu sains, magnet adalah benda yang memiliki medan magnet di sekitarnya dan mampu menghasilkan gaya tarik tanpa harus menempel secara kasar.',
        keyPoints: [
          'Magnet memiliki gaya tak kasat mata bernama gaya magnet.',
          'Gaya magnet dapat menembus penghalang tipis seperti selembar kertas atau plastik.',
          'Magnet memiliki bentuk bermacam-macam: magnet batang, jarum kompas, tapal kuda (U), silinder, dan cincin.',
        ],
      },
      {
        heading: 'Benda Magnetis dan Benda Nonmagnetis',
        content: 'Tidak semua benda di bumi ini bisa ditarik oleh magnet! Para ilmuwan cilik mengelompokkan benda menjadi dua kelompok besar:',
        examples: [
          { name: 'Paku Besi', type: 'Magnetis', desc: 'Sangat kuat ditarik magnet karena terbuat dari zat besi murni.' },
          { name: 'Peniti Baja', type: 'Magnetis', desc: 'Ditarik dengan cepat dan menempel kuat pada ujung magnet.' },
          { name: 'Klip Kertas Logam', type: 'Magnetis', desc: 'Terbuat dari kawat baja lentur yang sangat mudah dipengaruhi medan magnet.' },
          { name: 'Balok Kayu', type: 'Nonmagnetis', desc: 'Tidak memiliki atom magnetik, sama sekali tidak ditarik oleh magnet.' },
          { name: 'Penggaris Plastik', type: 'Nonmagnetis', desc: 'Bahan polimer plastik tidak dapat ditarik oleh medan magnet.' },
          { name: 'Kertas Buku', type: 'Nonmagnetis', desc: 'Bahan serat selulosa tidak berinteraksi dengan kutub magnet.' },
        ],
      },
      {
        heading: 'Pemanfaatan Magnet dalam Keseharian',
        content: 'Cobalah tengok pintu lemari es (kulkas) di rumahmu! Mengapa pintu kulkas dapat menutup rapat sendiri? Jawabannya adalah karena di sekeliling karet pintu kulkas terdapat pita magnet lentur yang menarik bingkai baja kulkas. Selain itu, magnet digunakan pada kompas petunjuk arah penjelajah, ujung obeng mekanik, dan penutup tas pensil.',
      },
    ],
    funFact: 'Tahukah kamu? Bumi kita yang besar ini sebenarnya adalah sebuah magnet raksasa dengan kutub magnet di dekat kutub utara dan selatan geografis!',
    referenceText: 'Rujukan: Buku Siswa IPAS Kelas V (Edisi Revisi 2024) Kemendikdasmen & Buku Siswa IPAS Kelas V Edisi 2021 Bab 3 (ISBN 978-602-244-681-1).',
  },
  {
    id: 2,
    slug: 'sifat-sifat-magnet',
    number: '02',
    title: 'Sifat-Sifat Magnet & Rahasia Dua Kutub',
    subtitle: 'Hukum Tarik-Menolak yang Menakjubkan',
    overview: 'Setiap magnet memiliki dua kutub dengan karakteristik yang unik. Bila dipertemukan, kutub-kutub ini memiliki aturan alam yang pasti.',
    readTime: '7 menit baca',
    image: '/src/assets/images/illustration_magnet_field_1794388670109.jpg',
    sections: [
      {
        heading: 'Dua Kutub: Kutub Utara dan Kutub Selatan',
        content: 'Semua magnet, sekecil apa pun bentuknya atau bahkan jika dipotong menjadi dua bagian, pasti tetap memiliki dua kutub, yaitu Kutub Utara (biasanya diberi simbol N atau U dan diwarnai merah) dan Kutub Selatan (diberi simbol S dan diwarnai biru). Bagian kutub magnet inilah yang memiliki kekuatan gaya tarik paling kuat dibandingkan bagian tengahnya.',
      },
      {
        heading: 'Hukum Interaksi Kutub Magnet',
        content: 'Ketika dua magnet didekatkan satu sama lain, ada dua kemungkinan peristiwa yang terjadi:',
        keyPoints: [
          'Kutub Senama / Sejenis Saling Tolak-Menolak: Jika kutub Utara didekatkan dengan kutub Utara (U bertemu U) atau Selatan dengan Selatan (S bertemu S), kedua magnet akan saling mendorong dan menolak.',
          'Kutub Tidak Senama / Berbeda Saling Tarik-Menarik: Jika kutub Utara didekatkan dengan kutub Selatan (U bertemu S), kedua magnet akan langsung melompat menempel erat satu sama lain.',
          'Gaya Magnet Mampu Menembus Benda Tipis: Magnet tetap dapat menarik klip kertas meskipun dihalangi oleh selembar kertas, kaca tipis, atau kain.',
        ],
      },
      {
        heading: 'Kekuatan Magnet Berdasarkan Jarak',
        content: 'Makin dekat jarak benda magnetis ke kutub magnet, makin kuat gaya tarik yang dirasakan. Sebaliknya, jika benda berada jauh di luar medan magnet, gaya magnet akan melemah hingga tidak terasa sama sekali.',
      },
    ],
    funFact: 'Jika sebuah magnet batang kamu gantung bebas dengan seutas tali, ujung magnet kutub utara akan selalu berputar menunjuk ke arah utara bumi secara alami!',
    referenceText: 'Rujukan: Buku Panduan Guru & Siswa IPAS Kelas V Kemendikdasmen (Revisi 2024 & Edisi 2021).',
  },
  {
    id: 3,
    slug: 'mengenal-listrik',
    number: '03',
    title: 'Mengenal Listrik & Sumber Energi di Sekitar Kita',
    subtitle: 'Energi Tak Terlihat yang Menggerakkan Dunia',
    overview: 'Listrik adalah salah satu bentuk energi paling penting yang menerangi malam hari, mengoperasikan gawai, dan menyalakan berbagai peralatan modern.',
    readTime: '6 menit baca',
    image: '/src/assets/images/illustration_circuit_energy_1794388669843.jpg',
    sections: [
      {
        heading: 'Pengertian Energi Listrik',
        content: 'Energi listrik adalah energi yang ditimbulkan oleh perpindahan partikel bermuatan listrik (elektron) melalui suatu media penghantar (konduktor). Energi ini sangat serbaguna karena mudah disalurkan melalui kabel dan dapat diubah menjadi berbagai bentuk energi lainnya.',
      },
      {
        heading: 'Sumber-Sumber Energi Listrik',
        content: 'Dari mana kita memperoleh listrik? Ada berbagai sumber energi listrik yang digunakan manusia sehari-hari:',
        keyPoints: [
          'Baterai: Sumber listrik portabel yang mengubah energi kimia menjadi listrik (misal baterai jam dinding, remote TV, dan mainan).',
          'Aki (Akumulator): Sumber listrik pada kendaraan bermotor seperti sepeda motor dan mobil.',
          'Dinamo Sepeda: Menghasilkan listrik dari putaran roda sepeda untuk menyalakan lampu kecil di malam hari.',
          'Pembangkit Listrik (PLTA, PLTU, PLTS): Menghasilkan daya listrik besar untuk disalurkan ke rumah-rumah melalui gardu PLN.',
        ],
      },
      {
        heading: 'Pentingnya Bijak & Hemat Energi Listrik',
        content: 'Sebagian besar listrik di Indonesia masih dihasilkan dari bahan bakar fosil seperti batu bara yang tidak dapat diperbarui. Oleh karena itu, kita sebagai ilmuwan cilik harus hemat listrik dengan cara:',
        keyPoints: [
          'Mematikan lampu kamar dan ruang kelas saat siang hari yang cerah.',
          'Mematikan televisi dan kipas angin bila sudah tidak digunakan.',
          'Mencabut colokan charger gawai setelah baterai penuh.',
        ],
      },
    ],
    funFact: 'Kilat petir di langit saat badai hujan adalah contoh listrik alami raksasa dengan tegangan mencapai jutaan volt!',
    referenceText: 'Rujukan: Buku Siswa IPAS Kelas V (Revisi 2024) Kemendikdasmen Bab Energi & Panduan Guru.',
  },
  {
    id: 4,
    slug: 'rangkaian-listrik-sederhana',
    number: '04',
    title: 'Rangkaian Listrik Sederhana: Baterai, Kabel, & Lampu',
    subtitle: 'Membongkar Rahasia Mengapa Lampu Menyala',
    overview: 'Agar lampu dapat menyala, dibutuhkan lintasan lengkap yang tidak terputus tempat muatan listrik mengalir.',
    readTime: '8 menit baca',
    image: '/src/assets/images/illustration_circuit_energy_1794388669843.jpg',
    sections: [
      {
        heading: 'Empat Komponen Utama Rangkaian Listrik',
        content: 'Untuk membuat percobaan lampu menyala, kita memerlukan 4 komponen dasar:',
        keyPoints: [
          '1. Baterai: Bertindak sebagai sumber energi atau pendorong muatan listrik (memiliki kutub positif + dan negatif -).',
          '2. Kabel Tembaga: Berfungsi sebagai jalan/penghantar arus listrik (konduktor). Logam tembaga di dalam kabel dibungkus plastik isolator agar aman.',
          '3. Sakelar (Switch): Alat yang berfungsi menghubungkan atau memutus aliran arus listrik.',
          '4. Lampu Bohlam: Alat pemanfaat energi yang mengubah energi listrik menjadi energi cahaya.',
        ],
      },
      {
        heading: 'Rangkaian Terbuka vs Rangkaian Tertutup',
        content: 'Mengapa lampu bisa menyala atau mati? Kuncinya ada pada keutuhan jalurnya:',
        keyPoints: [
          'Rangkaian Terbuka (Sakelar OFF): Lintasan kabel terputus atau sakelar tidak menyambung. Arus listrik tidak dapat mengalir dari kutub baterai ke lampu, sehingga lampu MATI.',
          'Rangkaian Tertutup (Sakelar ON): Seluruh kabel tersambung rapat dari kutub positif baterai, melewati sakelar, masuk ke filamen bohlam, dan kembali ke kutub negatif. Arus listrik mengalir lancar sehingga lampu MENYALA terang!',
        ],
      },
      {
        heading: 'Konduktor dan Isolator Listrik',
        content: 'Benda yang mudah menghantarkan listrik disebut konduktor (contoh: tembaga, besi, aluminium, dan air). Sedangkan benda yang tidak dapat menghantarkan listrik disebut isolator (contoh: karet, plastik, kayu kering, dan kaca). Karet dan plastik sengaja dipakai untuk melapisi kabel agar kita tidak tersengat listrik.',
      },
    ],
    funFact: 'Thomas Alva Edison membutuhkan ribuan kali uji coba sebelum akhirnya menemukan bahan filamen karbon bambu yang tepat untuk membuat lampu pijar pertama yang tahan lama!',
    referenceText: 'Rujukan: Buku Siswa IPAS Kelas V SD Edisi 2021 Bab 3 & Panduan Kurikulum Merdeka IPAS Fase C.',
  },
  {
    id: 5,
    slug: 'teknologi-dalam-kehidupan',
    number: '05',
    title: 'Teknologi dalam Kehidupan: Perpaduan Magnet & Listrik',
    subtitle: 'Inovasi Manusia yang Mengubah Peradaban',
    overview: 'Ketika magnet dan listrik dipadukan, terciptalah teknologi luar biasa bernama elektromagnet yang menjadi penggerak motor modern.',
    readTime: '7 menit baca',
    image: '/src/assets/images/hero_lab_scientist_1794388668101.jpg',
    sections: [
      {
        heading: 'Apa itu Elektromagnet?',
        content: 'Jika sebatang paku besi dililiti kawat tembaga lalu kawat tersebut disambungkan ke baterai, paku tersebut akan seketika berubah menjadi magnet! Magnet sementara yang dihasilkan dari aliran arus listrik ini disebut Elektromagnet. Kehebatannya: kekuatan magnetnya bisa diatur dan dapat dimatikan kapan saja hanya dengan memutus sakelar.',
      },
      {
        heading: 'Penerapan Teknologi dalam Kehidupan Sehari-hari',
        content: 'Banyak peralatan canggih di sekitar kita yang bekerja berkat perpaduan magnet dan listrik:',
        examples: [
          { name: 'Bel Listrik Rumah', desc: 'Ketika tombol ditekan, arus listrik menyalakan elektromagnet yang menarik palu kecil untuk memukul lonceng bel sehingga berbunyi ting-tong!' },
          { name: 'Kipas Angin & Blender', desc: 'Menggunakan motor listrik yang memutar baling-baling akibat interaksi medan magnet dan kumparan berarus listrik.' },
          { name: 'Pengeras Suara (Speaker)', desc: 'Membran speaker bergetar menghasilkan bunyi saat arus listrik sinyal musik mengalir melalui magnet di dalamnya.' },
          { name: 'Kereta Cepat Maglev', desc: 'Kereta super cepat yang melayang di atas rel menggunakan gaya tolak magnetik berkekuatan listrik tinggi tanpa gesekan roda.' },
          { name: 'Kompas Navigasi', desc: 'Jarum magnetik yang selalu menunjukkan arah mata angin untuk membantu pelaut dan penerbang menjelajahi samudra.' },
        ],
      },
      {
        heading: 'Perubahan Bentuk Energi pada Peralatan',
        content: 'Peralatan teknologi mengubah energi listrik menjadi bentuk energi yang kita butuhkan:',
        keyPoints: [
          'Listrik -> Cahaya & Panas: Lampu belajar, senter, layar proyektor.',
          'Listrik -> Panas: Setrika baju, pemanggang roti (toaster), penanak nasi (rice cooker).',
          'Listrik -> Gerak: Kipas angin, mixer kue, bor listrik, mesin cuci.',
          'Listrik -> Bunyi: Radio, bel sekolah, speaker aktif.',
        ],
      },
    ],
    funFact: 'Kereta Maglev di Jepang dan Shanghai bisa meluncur dengan kecepatan lebih dari 400 km/jam tanpa menyentuh rel sama sekali berkat tolakan gaya magnet!',
    referenceText: 'Rujukan: Buku Siswa IPAS Kelas V Edisi Revisi 2024 & Buku Guru IPAS Kelas V.',
  },
];

export const SUMMARY_POINTS = [
  '1. Magnet adalah benda istimewa yang memiliki kemampuan menghasilkan gaya tarik terhadap benda-benda logam tertentu seperti besi dan baja.',
  '2. Benda di sekitar kita dibedakan menjadi benda magnetis (dapat ditarik magnet: paku, peniti, klip kertas) dan benda nonmagnetis (tidak dapat ditarik: kayu, plastik, kertas).',
  '3. Setiap magnet memiliki dua kutub yang kekuatannya paling besar: Kutub Utara (U) dan Kutub Selatan (S).',
  '4. Dua kutub magnet yang senama/sejenis akan tolak-menolak, sedangkan dua kutub yang tidak senama/berlawanan akan tarik-menarik.',
  '5. Energi listrik merupakan bentuk energi serbaguna yang dihasilkan dari aliran muatan listrik (elektron) melalui bahan konduktor tembaga.',
  '6. Rangkaian listrik sederhana tersusun atas empat komponen: baterai (sumber energi), kabel (penghantar), sakelar (pemutus/penghubung), dan lampu (pemanfaat energi).',
  '7. Lampu hanya akan menyala pada rangkaian listrik tertutup (sakelar ON) di mana lintasan arus tersambung utuh tanpa terputus.',
  '8. Energi listrik dapat diubah menjadi energi cahaya, panas, gerak, dan bunyi, serta harus kita gunakan secara bijak dan hemat demi kelestarian bumi.',
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    moduleCategory: 'Mengenal Magnet',
    question: 'Benda yang memiliki kemampuan untuk menarik benda-benda tertentu yang terbuat dari logam disebut ...',
    options: [
      { key: 'A', text: 'Magnet' },
      { key: 'B', text: 'Baterai' },
      { key: 'C', text: 'Isolator' },
      { key: 'D', text: 'Sakelar' },
    ],
    correctAnswer: 'A',
    explanation: 'Magnet adalah benda yang mampu menarik benda-benda lain yang terbuat dari bahan logam tertentu seperti besi dan baja karena memiliki medan magnet.',
    sourceReference: 'Buku Siswa IPAS Kelas V SD Edisi Revisi 2024 / Edisi 2021 Bab 3',
  },
  {
    id: 2,
    moduleCategory: 'Mengenal Magnet',
    question: 'Di antara kelompok benda berikut, manakah yang seluruhnya merupakan benda magnetis (dapat ditarik oleh magnet)?',
    options: [
      { key: 'A', text: 'Paku besi, klip kertas logam, dan peniti' },
      { key: 'B', text: 'Penggaris plastik, penghapus karet, dan kayu' },
      { key: 'C', text: 'Kertas karton, paku besi, dan daun kering' },
      { key: 'D', text: 'Buku tulis, kaca jendela, dan benang kain' },
    ],
    correctAnswer: 'A',
    explanation: 'Paku besi, klip kertas logam, dan peniti terbuat dari besi dan baja sehingga dapat ditarik kuat oleh magnet (benda feromagnetik). Benda plastik, karet, kayu, dan kertas adalah benda nonmagnetis.',
    sourceReference: 'Buku Siswa IPAS Kelas V SD Edisi Revisi 2024',
  },
  {
    id: 3,
    moduleCategory: 'Mengenal Magnet',
    question: 'Mengapa pintu lemari es (kulkas) dapat menutup dengan rapat saat didekatkan ke bingkai kulkas?',
    options: [
      { key: 'A', text: 'Karena diolesi lem perekat yang sangat kuat' },
      { key: 'B', text: 'Karena di balik karet pintunya terdapat magnet penarik' },
      { key: 'C', text: 'Karena udara dingin di dalam kulkas menyedot pintunya' },
      { key: 'D', text: 'Karena ada sakelar otomatis bertenaga baterai' },
    ],
    correctAnswer: 'B',
    explanation: 'Di dalam lapisan karet penutup pintu kulkas dipasang pita magnet yang akan menarik bingkai pintu berbahan baja sehingga kulkas tertutup rapat.',
    sourceReference: 'Buku Siswa IPAS Kelas V Bab Magnet & Penerapan Teknologi',
  },
  {
    id: 4,
    moduleCategory: 'Sifat-Sifat Magnet',
    question: 'Bagian pada magnet yang memiliki gaya tarik paling kuat terletak pada ...',
    options: [
      { key: 'A', text: 'Bagian tengah magnet' },
      { key: 'B', text: 'Kutub-kutub magnet (ujung-ujungnya)' },
      { key: 'C', text: 'Sisi samping magnet' },
      { key: 'D', text: 'Hanya di kutub utara saja' },
    ],
    correctAnswer: 'B',
    explanation: 'Kekuatan gaya magnet terbesar selalu berkumpul di kedua kutubnya, yaitu kutub utara dan kutub selatan di bagian ujung-ujung magnet.',
    sourceReference: 'Buku Siswa IPAS Kelas V SD Edisi Revisi 2024',
  },
  {
    id: 5,
    moduleCategory: 'Sifat-Sifat Magnet',
    question: 'Apa yang akan terjadi jika kutub utara sebuah magnet didekatkan dengan kutub utara magnet lain yang sejenis?',
    options: [
      { key: 'A', text: 'Kedua magnet akan saling tarik-menarik erat' },
      { key: 'B', text: 'Kedua magnet akan saling tolak-menolak' },
      { key: 'C', text: 'Magnet akan langsung mengeluarkan aliran listrik' },
      { key: 'D', text: 'Kedua magnet tidak mengalami pengaruh apapun' },
    ],
    correctAnswer: 'B',
    explanation: 'Hukum dasar magnet menyatakan bahwa dua kutub magnet yang senama/sejenis (Utara dengan Utara, atau Selatan dengan Selatan) akan saling tolak-menolak.',
    sourceReference: 'Buku Siswa IPAS Kelas V Edisi 2021 & 2024',
  },
  {
    id: 6,
    moduleCategory: 'Sifat-Sifat Magnet',
    question: 'Peristiwa tarik-menarik antar dua magnet akan terjadi apabila ...',
    options: [
      { key: 'A', text: 'Kutub selatan didekatkan dengan kutub selatan' },
      { key: 'B', text: 'Kutub utara didekatkan dengan kutub selatan' },
      { key: 'C', text: 'Kutub utara didekatkan dengan kutub utara' },
      { key: 'D', text: 'Kedua magnet dibungkus plastik tebal' },
    ],
    correctAnswer: 'B',
    explanation: 'Dua kutub magnet yang berlawanan atau tidak sejenis (Kutub Utara didekatkan dengan Kutub Selatan) akan saling tarik-menarik.',
    sourceReference: 'Buku Panduan Guru & Siswa IPAS Kelas V',
  },
  {
    id: 7,
    moduleCategory: 'Sifat-Sifat Magnet',
    question: 'Jika kamu meletakkan klip kertas di atas selembar kertas tipis, lalu menggerakkan magnet dari bawah kertas, klip kertas akan ikut bergerak. Hal ini membuktikan bahwa ...',
    options: [
      { key: 'A', text: 'Gaya magnet dapat menembus benda penghalang tipis' },
      { key: 'B', text: 'Kertas adalah benda yang memiliki sifat magnetis' },
      { key: 'C', text: 'Kertas dapat menghasilkan arus listrik mandiri' },
      { key: 'D', text: 'Magnet kehilangan sifat kemagnetannya' },
    ],
    correctAnswer: 'A',
    explanation: 'Gaya magnet memiliki daya tembus terhadap benda-benda penghalang nonmagnetis yang tipis seperti kertas, plastik, atau kaca tipis.',
    sourceReference: 'Buku Siswa IPAS Kelas V Percobaan Gaya Magnet',
  },
  {
    id: 8,
    moduleCategory: 'Mengenal Listrik',
    question: 'Energi yang dihasilkan oleh perpindahan muatan listrik melalui bahan penghantar disebut ...',
    options: [
      { key: 'A', text: 'Energi gravitasi' },
      { key: 'B', text: 'Energi listrik' },
      { key: 'C', text: 'Energi bunyi' },
      { key: 'D', text: 'Energi kimia murni' },
    ],
    correctAnswer: 'B',
    explanation: 'Energi listrik adalah energi yang timbul akibat pergerakan partikel bermuatan listrik (elektron) yang mengalir melalui konduktor.',
    sourceReference: 'Buku Siswa IPAS Kelas V Bab Listrik untuk Kehidupan',
  },
  {
    id: 9,
    moduleCategory: 'Mengenal Listrik',
    question: 'Benda berikut yang berfungsi sebagai sumber energi listrik portabel pada jam dinding dan senter saku adalah ...',
    options: [
      { key: 'A', text: 'Baterai' },
      { key: 'B', text: 'Sakelar' },
      { key: 'C', text: 'Kabel tembaga' },
      { key: 'D', text: 'Bohlam' },
    ],
    correctAnswer: 'A',
    explanation: 'Baterai adalah sumber energi listrik yang menyimpan energi kimia dan mengubahnya menjadi energi listrik saat dipasang pada rangkaian tertutup.',
    sourceReference: 'Buku Siswa IPAS Kelas V SD Edisi Revisi 2024',
  },
  {
    id: 10,
    moduleCategory: 'Mengenal Listrik',
    question: 'Tindakan berikut yang merupakan contoh sikap bijak dalam menghemat energi listrik adalah ...',
    options: [
      { key: 'A', text: 'Menyalakan seluruh lampu rumah sepanjang siang hari' },
      { key: 'B', text: 'Membiarkan televisi tetap menyala saat tidur malam' },
      { key: 'C', text: 'Mematikan lampu kamar saat ruangan sudah terang oleh sinar matahari' },
      { key: 'D', text: 'Memasang kipas angin di ruangan kosong tanpa orang' },
    ],
    correctAnswer: 'C',
    explanation: 'Mematikan lampu ketika sudah ada penerangan alami dari matahari adalah cara efektif menghemat penggunaan energi listrik sehari-hari.',
    sourceReference: 'Buku Panduan Guru IPAS Kelas V Materi Penghematan Energi',
  },
  {
    id: 11,
    moduleCategory: 'Rangkaian Listrik',
    question: 'Komponen dalam rangkaian listrik sederhana yang berfungsi untuk menyambung atau memutus aliran arus listrik adalah ...',
    options: [
      { key: 'A', text: 'Sakelar' },
      { key: 'B', text: 'Baterai' },
      { key: 'C', text: 'Filamen' },
      { key: 'D', text: 'Isolator karet' },
    ],
    correctAnswer: 'A',
    explanation: 'Sakelar (switch) bertindak sebagai jembatan kontrol: menghubungkan arus saat ditekan ON dan memutus arus saat diposisikan OFF.',
    sourceReference: 'Buku Siswa IPAS Kelas V Bab Komponen Rangkaian Listrik',
  },
  {
    id: 12,
    moduleCategory: 'Rangkaian Listrik',
    question: 'Bahan logam yang paling sering digunakan sebagai kawat isi kabel listrik karena merupakan penghantar listrik (konduktor) yang baik adalah ...',
    options: [
      { key: 'A', text: 'Tembaga' },
      { key: 'B', text: 'Plastik' },
      { key: 'C', text: 'Karet sintetis' },
      { key: 'D', text: 'Kaca' },
    ],
    correctAnswer: 'A',
    explanation: 'Tembaga adalah logam konduktor yang sangat baik dalam menghantarkan arus listrik dengan hambatan yang rendah dan tahan lama.',
    sourceReference: 'Buku Siswa IPAS Kelas V Konduktor & Isolator',
  },
  {
    id: 13,
    moduleCategory: 'Rangkaian Listrik',
    question: 'Mengapa kabel listrik selalu dibungkus dengan lapisan karet atau plastik di bagian luarnya?',
    options: [
      { key: 'A', text: 'Agar kabel terlihat lebih berat dan kaku' },
      { key: 'B', text: 'Sebagai bahan isolator agar manusia aman dari sengatan arus listrik' },
      { key: 'C', text: 'Untuk menambah kecepatan laju aliran arus listrik' },
      { key: 'D', text: 'Agar kabel dapat ditarik oleh magnet lemari es' },
    ],
    correctAnswer: 'B',
    explanation: 'Karet dan plastik adalah bahan isolator (tidak menghantarkan listrik), sehingga berfungsi melindungi manusia agar tidak tersengat aliran listrik saat memegang kabel.',
    sourceReference: 'Buku Siswa IPAS Kelas V Keselamatan Listrik',
  },
  {
    id: 14,
    moduleCategory: 'Rangkaian Listrik',
    question: 'Perhatikan kondisi rangkaian berikut: Baterai, kabel, dan lampu sudah terpasang rapi, tetapi sakelar berada pada posisi terbuka (OFF). Kondisi lampu adalah ...',
    options: [
      { key: 'A', text: 'Lampu menyala berkedip-kedip' },
      { key: 'B', text: 'Lampu menyala sangat terang' },
      { key: 'C', text: 'Lampu mati karena aliran listrik terputus (rangkaian terbuka)' },
      { key: 'D', text: 'Baterai langsung habis dayanya' },
    ],
    correctAnswer: 'C',
    explanation: 'Ketika sakelar terbuka (OFF), terjadi rangkaian terbuka. Arus listrik tidak dapat mengalir sehingga lampu tidak mendapatkan suplai daya dan tetap mati.',
    sourceReference: 'Buku Siswa IPAS Kelas V Simulasi Rangkaian Listrik',
  },
  {
    id: 15,
    moduleCategory: 'Rangkaian Listrik',
    question: 'Agar sebuah lampu dalam rangkaian listrik sederhana dapat menyala terang, syarat mutlak yang harus terpenuhi adalah ...',
    options: [
      { key: 'A', text: 'Kabel harus dipotong di bagian tengahnya' },
      { key: 'B', text: 'Rangkaian harus tertutup rapat dan terhubung dari kutub baterai ke lampu' },
      { key: 'C', text: 'Lampu harus ditempelkan langsung pada magnet batang' },
      { key: 'D', text: 'Baterai harus dicelupkan ke dalam minyak goreng' },
    ],
    correctAnswer: 'B',
    explanation: 'Lampu hanya akan menyala jika berada dalam rangkaian tertutup sempurna, di mana elektron dapat mengalir tanpa hambatan putus dari kutub positif ke kutub negatif melalui lampu.',
    sourceReference: 'Buku Panduan Guru & Siswa IPAS Kelas V',
  },
  {
    id: 16,
    moduleCategory: 'Teknologi & Perubahan Energi',
    question: 'Pada saat sebuah lampu bohlam menyala, terjadi perubahan bentuk energi dari energi listrik menjadi energi ...',
    options: [
      { key: 'A', text: 'Cahaya dan panas' },
      { key: 'B', text: 'Gerak dan bunyi' },
      { key: 'C', text: 'Kimia dan nuklir' },
      { key: 'D', text: 'Gravitasi bumi' },
    ],
    correctAnswer: 'A',
    explanation: 'Arus listrik yang memanaskan filamen lampu bohlam mengubah energi listrik menjadi energi cahaya (menerangi ruangan) dan sebagian menjadi energi panas (kaca terasa hangat).',
    sourceReference: 'Buku Siswa IPAS Kelas V Transformasi Energi',
  },
  {
    id: 17,
    moduleCategory: 'Teknologi & Perubahan Energi',
    question: 'Peralatan rumah tangga berikut yang memanfaatkan perubahan energi listrik menjadi energi gerak adalah ...',
    options: [
      { key: 'A', text: 'Setrika listrik dan oven' },
      { key: 'B', text: 'Kipas angin dan blender' },
      { key: 'C', text: 'Lampu belajar dan senter' },
      { key: 'D', text: 'Radio dan bel rumah' },
    ],
    correctAnswer: 'B',
    explanation: 'Kipas angin dan blender memanfaatkan motor listrik untuk mengubah energi listrik menjadi energi gerak memutar baling-baling dan pisau pemotong.',
    sourceReference: 'Buku Siswa IPAS Kelas V SD Edisi Revisi 2024',
  },
  {
    id: 18,
    moduleCategory: 'Teknologi & Perubahan Energi',
    question: 'Magnet buatan yang sifat kemagnetannya timbul hanya saat dialiri arus listrik pada lilitan kawat disebut ...',
    options: [
      { key: 'A', text: 'Magnet alami bumi' },
      { key: 'B', text: 'Elektromagnet' },
      { key: 'C', text: 'Magnet permanen' },
      { key: 'D', text: 'Isolator magnet' },
    ],
    correctAnswer: 'B',
    explanation: 'Elektromagnet adalah magnet buatan yang dihasilkan dengan melilitkan kawat berarus listrik pada inti besi, seperti pada paku yang dililit kawat baterai.',
    sourceReference: 'Buku Siswa IPAS Kelas V Edisi 2021 Bab 3 ISBN 978-602-244-681-1',
  },
  {
    id: 19,
    moduleCategory: 'Teknologi & Perubahan Energi',
    question: 'Alat penunjuk arah mata angin yang memanfaatkan sifat magnetik jarum yang selalu menunjuk ke arah utara dan selatan bumi adalah ...',
    options: [
      { key: 'A', text: 'Termometer' },
      { key: 'B', text: 'Kompas' },
      { key: 'C', text: 'Spidometer' },
      { key: 'D', text: 'Mikroskop' },
    ],
    correctAnswer: 'B',
    explanation: 'Kompas menggunakan jarum magnet ringan yang berputar bebas dan selalu mengarah ke kutub utara dan selatan bumi sebagai petunjuk navigasi.',
    sourceReference: 'Buku Siswa IPAS Kelas V SD Edisi Revisi 2024',
  },
  {
    id: 20,
    moduleCategory: 'Teknologi & Perubahan Energi',
    question: 'Peralatan teknologi berikut yang cara kerjanya menggabungkan prinsip magnet dan arus listrik adalah ...',
    options: [
      { key: 'A', text: 'Bel listrik dan speaker pengeras suara' },
      { key: 'B', text: 'Paku payung dan gunting kertas manual' },
      { key: 'C', text: 'Papan tulis kapur dan penggaris kayu' },
      { key: 'D', text: 'Cermin rias dan lilin meja' },
    ],
    correctAnswer: 'A',
    explanation: 'Bel listrik dan speaker pengeras suara bekerja dengan memanfaatkan elektromagnet: perpaduan antara aliran arus listrik dan kumparan medan magnet untuk menghasilkan getaran bunyi.',
    sourceReference: 'Buku Siswa IPAS Kelas V & Panduan Guru Edisi Revisi 2024',
  },
];

export const ACADEMIC_REFERENCES = [
  {
    id: 1,
    title: 'Ilmu Pengetahuan Alam dan Sosial untuk SD/MI Kelas V (Edisi Revisi)',
    type: 'Buku Teks Utama Siswa',
    authors: 'Amalia Fitri Ghaniem, Ati Haviati Oktora, Maria Jeanindya Wahyudi, dan Ekatannia Tresnasari',
    publisher: 'Pusat Kurikulum dan Perbukuan, Kemendikdasmen',
    year: '2024',
    isbn: '978-623-388-160-9',
    url: 'https://buku.kemendikdasmen.go.id/katalog/ilmu-pengetahuan-alam-dan-sosial-untuk-sd-mi-kelas-v-edisi-revisi',
    note: 'Sumber rujukan utama materi capaian pembelajaran IPAS Kelas 5 SD Fase C kurikulum nasional terbaru.',
  },
  {
    id: 2,
    title: 'Panduan Guru Ilmu Pengetahuan Alam dan Sosial untuk SD/MI Kelas V (Edisi Revisi)',
    type: 'Buku Panduan Guru',
    authors: 'Amalia Fitri Ghaniem, Ati Haviati Oktora, Maria Jeanindya Wahyudi, dan Ekatannia Tresnasari',
    publisher: 'Pusat Kurikulum dan Perbukuan, Kemendikdasmen',
    year: '2024',
    isbn: '978-623-388-162-3',
    url: 'https://buku.kemendikdasmen.go.id/katalog/panduan-guru-ilmu-pengetahuan-alam-dan-sosial-untuk-sd-mi-kelas-v-edisi-revisi',
    note: 'Rujukan metodologi pembelajaran inkuiri, strategi pemahaman konsep sains, dan lembar kerja eksplorasi.',
  },
  {
    id: 3,
    title: 'Panduan Mata Pelajaran IPAS Fase B dan C Tahun 2025',
    type: 'Panduan Standar Kurikulum',
    authors: 'Sutinah, Cucun; Mahardhika, Rizal Listyo; dan Kartini, Dwi',
    publisher: 'Badan Standar, Kurikulum, dan Asesmen Pendidikan (BSKAP)',
    year: '2025',
    url: 'https://repositori.kemendikdasmen.go.id/33599/',
    note: 'Rujukan kesesuaian capaian pembelajaran (CP) Fase C dan perumusan alur tujuan pembelajaran sains SD.',
  },
  {
    id: 4,
    title: 'Buku Siswa IPAS Kelas V SD Edisi 2021 (Bab 3: Magnet, Listrik, dan Teknologi untuk Kehidupan)',
    type: 'Referensi Bab Khusus Terverifikasi',
    authors: 'Amalia Fitri Ghaniem dkk.',
    publisher: 'Pusat Perbukuan Badan Standar, Kurikulum, dan Asesmen Pendidikan Kemendikbudristek',
    year: '2021',
    isbn: '978-602-244-681-1',
    url: 'https://buku.kemendikbud.go.id',
    note: 'Rujukan mendalam struktur materi Bab 3 mengenai percobaan magnetik, konduktor-isolator, rangkaian baterai-lampu, dan elektromagnet.',
  },
];
