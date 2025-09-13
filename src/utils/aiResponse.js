export function getAIResponse(query, tab, history = []) {
  const q = query.toLowerCase();

  if (tab === 'business') {
    if (q.includes('aur batao') && history.length > 0) {
    return 'Aapne pichle sawaal mein poocha tha: "' + history[history.length - 1].question + '". Kya aap ussi topic par aur jaankari chahte hain?';
    }
    if (q.includes('aaj ka kharcha') || q.includes('kitna kamaya')) {
      return 'Aaj aapne 12 delivery kiye, jiske liye aapko ₹2,400 mile. Kharche ₹200 ke hain, to aapki aaj ki net kamai ₹2,200 hai.';
    } else if (q.includes('penalty') || q.includes('jurmana')) {
      return 'Aapko ₹50 ka penalty isliye laga kyunki ek delivery 15 minute late hui thi. Agli baar samay ka dhyan rakhein.';
    } else if (q.includes('business behtar') || q.includes('pichle hafte')) {
      return 'Haan, aapka business pichle hafte se 20% behtar hai. Aapne 8 zyada deliveries ki hain aur customer ratings bhi behtar huye hain.';
    }
    return 'Main aapki business se related kisi bhi sawaal ka jawab de sakta hoon. Aap puchh sakte hain earnings, expenses, ya performance ke baare mein.';
  }

  if (tab === 'guru') {
    if (/\bchallan\b/.test(q) || /\bfine\b/.test(q)) {
        return 'Challan contest karne ke liye, pehle aapko traffic police ki website par jana hoga. Wahan aapko apna vehicle number daal kar challan details dekni hain. Fir "contest challan" par click karein aur apni reason batayein. Saath mein kuch documents bhi upload karne pad sakte hain.';
    } else if (/\bdigilocker\b/.test(q) || /\bdocument\b/.test(q)) {
        return 'DigiLocker par document upload karne ke liye, pehle aapko apna account banana hoga. Fir "upload documents" par click karein, document type select karein, aur apna file choose karein. File upload hone ke baad, aap use kisi ko bhi share kar sakte hain.';
    } else if (/\binsurance\b/.test(q) || /\bbima\b/.test(q)) {
        return 'Vehicle insurance aapki gaadi ko kisi bhi accident ya damage se bachata hai. Isme third-party liability bhi hoti hai, jo dusre logon ko hone wale nuksan ko cover karti hai. Insurance lena zaroori hai aur har saal renew karna padta hai.';
    }
    return 'Main aapko life skills ke baare mein jaankari de sakta hoon, jaise ki challan contest karna, DigiLocker use karna, ya insurance ke baare mein.';
}

  if (tab === 'safety') {
    if (q.includes('sahayata') || q.includes('madad')) {
      return 'Aapko kisi emergency mein madad chahiye? Main aapki location share karke emergency contacts ko alert kar sakta hoon. Kya aapko abhi madad chahiye?';
    } else if (q.includes('sadak kharab') || q.includes('route')) {
      return 'Aapke current route par aage sadak kharab hai. Main aapko alternate route suggest karta hoon. Kripya dheere chalaayein aur gaadi sambhal kar chalayein.';
    } else if (q.includes('weather') || q.includes('mausam')) {
      return 'Aaj sham tak baarish hone ki sambhavna hai. Kripya apni driving dheemi karein aur headlights on rakhein. Barish mein brake lagne mein zyada time lagta hai, isliye doosri gaadiyon se extra distance banaye rakhein.';
    }
    return 'Main aapki safety ke liye yahan hoon. Aap emergency help, route alerts, ya weather warnings ke baare mein puchh sakte hain.';
  }

  return 'Kripya apna sawaal dobara batayein.';
}