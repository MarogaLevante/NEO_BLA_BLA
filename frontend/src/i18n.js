
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  es: {
    translation: {
      bienvenida: "Bienvenido a NEO BLA BLA",
      lecciones: "Lecciones",
      descripcion: "Tu plataforma inteligente para aprender idiomas de forma práctica y divertida",
      intro: "Aprende Español, Francés y Árabe con IA, profesores en vivo, ejercicios prácticos y progreso visual.",
      reservar: "Reservar",
      chat: "Chat IA",
      progreso: "Progreso",
      admin: "Administración",
      derechos: "Todos los derechos reservados"
      
    }
  },
  fr: {
    translation: {
      bienvenida: "Bienvenue sur NEO BLA BLA",
      lecciones: "Leçons",
      descripcion: "Votre plateforme intelligente pour apprendre les langues de manière pratique et ludique",
      intro: "Apprenez l'espagnol, le français et l'arabe avec l'IA, des professeurs en direct, des exercices pratiques et un suivi des progrès.",  
      reservar: "Réserver",
      chat: "Chat IA",
      progreso: "Progrès",
      admin: "Administration",
      derechos: "Tous droits réservés"
    }
  },
  ar: {
    translation: {
      bienvenida: "مرحبًا بك في نيو بلا بلا",
      descripcion: "منصتك الذكية لتعلم اللغات بطريقة عملية وممتعة",
      intro: "تعلّم الإسبانية والفرنسية والعربية مع الذكاء الاصطناعي، ومدرسين مباشرين، وتمارين تفاعلية، وتتبع التقدم.",  
      lecciones: "دروس",
      reservar: "احجز",
      chat: "دردشة الذكاء الاصطناعي",
      progreso: "التقدم",
      admin: "لوحة الإدارة",
      derechos: "جميع الحقوق محفوظة"
  }
    }
  }


i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es',
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
