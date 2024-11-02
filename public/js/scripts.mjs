document.addEventListener("DOMContentLoaded", function() {
    if (sessionStorage.getItem("initialPromptSent")) {
        document.getElementById('initial-buttons').style.display = 'none';
        document.getElementById('chat-form').style.display = 'block';
        document.getElementById('new-case-button').style.display = 'block';
    }else{
        document.getElementById('chat-form').style.display = 'none';
        document.getElementById('new-case-button').style.display = 'none';
    }
});

function setInitialPrompt(input) {
    const defaultPrompt = `ben bir tıp öğrencisiyim ve senle teşhis süreci simülasyonu oluşturacağız. sen bana ${input} ile ilgili hastalık bilgisini vereceksin ben tahmin etmeye çalışacağım step by step bilgi vereceksin hemen her şeyi yazma senden tahlil vs sonucu istediğimde simülasyona uygun şekilde cevaplar ver her soru sorduğumda bir bilgi vereceksin ve diğer soruyu bekleyeceksin en sonunda hastalığı tahmin edeceğim ve sen de doğru ya da yanlış deyip rapor vereceksi̇n sen tahminde bulunma sadece adım adım sorularıma cevap ver ben yanıtlarına göre hastalığı bulmaya çalışacağım yaş cinsiyet ve şikayet bilgisi ile başla`;

    fetch('/set-initial-prompt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: defaultPrompt })
    })
    .then(response => response.json())
    .then(data => {
        const chatHistory = document.getElementById('chat-history');
        const modelResponseElement = document.createElement('p');
        modelResponseElement.innerHTML = `<strong>Model:</strong> ${data.message}`;
        chatHistory.appendChild(modelResponseElement);

        document.getElementById('initial-buttons').style.display = 'none';
        document.getElementById('chat-form').style.display = 'block';
        document.getElementById('new-case-button').style.display = 'block';
        sessionStorage.setItem("initialPromptSent", "true");
    })
    .catch(error => {
        console.error("Başlangıç promptunu gönderirken bir hata oluştu:", error);
    });
}

function resetChat() {
    fetch('/reset-chat', { method: 'POST' })
        .then(() => {
            sessionStorage.removeItem("initialPromptSent");
            document.getElementById('initial-buttons').style.display = 'block';
            document.getElementById('chat-form').style.display = 'none';
            document.getElementById('new-case-button').style.display = 'none';
            document.getElementById('chat-history').innerHTML = '';
        })
        .catch(error => {
            console.error("Sohbet geçmişi sıfırlanırken bir hata oluştu:", error);
        });
}

window.setInitialPrompt = setInitialPrompt;
window.resetChat = resetChat;
