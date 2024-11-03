# Medisim - Tıp Eğitiminde Simülasyon Yazılımı

**Medisim**, Tıp öğrencilerinin klinik senaryoları deneyimlemesine ve pratik yapmasına olanak tanıyan bir tıbbi simülasyon yazılımıdır. Bu yazılım, sanal hastalar aracılığıyla adım adım vaka yönetimi ve teşhis süreçlerini simüle eder ve özellikle acil durum yönetimi, tanı koyma ve hasta değerlendirme gibi tıbbi becerilerin gelişimini destekler.

## Özellikler

- **Klinik Senaryolar**: Acil durum yönetimi, hasta değerlendirme ve tanı koyma gibi birçok klinik beceriyi geliştirir.
- **Sohbet Tabanlı Arayüz**: Kullanıcı, tıp senaryolarına yönelik sorular sorabilir ve AI modelinden yanıtlar alarak vaka sürecini yönetebilir.
- **Yeni Vaka Başlatma**: Farklı vakalara geçiş yaparak çeşitli senaryolar üzerinde çalışma imkanı sağlar.
- **Tıbbi Konular**: Fizyoloji, biyokimya, farmakoloji, pediatri gibi çeşitli tıbbi alanlarda bilgiye erişim sunar.
## Nasıl Üretildi?

Öncelikle Tıpta Uzmanlık Sınavı (TUS) ve Genel tıp eğitimindeki konularak baz alınarak çeşitli telif hakkı olmayan kaynaklarla dataset üretildi (dataseti github repomuza ekledik).
Vaka-Teşhis simülasyonu şeklinde üretilen bu datasetle Gemini 1.0 Pro AI Studio üzerinden fine-tune edildi.

<img width="1168" alt="Ekran Resmi 2024-11-03 14 37 50" src="https://github.com/user-attachments/assets/250553ca-354a-4a54-aa01-57dd9556cec2">

<hr>

Modelimizi başarılı bir şekilde fine-tune ettikten sonra çeşitli tıp dersleri ile vaka senaryoları oluşturup tıp öğrencileri ile simülasyonumuzu test ettik ve başarılı sonuçlar elde ettik.

<hr>

![WhatsApp Image 2024-11-03 at 15 06 08](https://github.com/user-attachments/assets/211cd90c-4dd3-47ca-a3a8-282a2791f498)

<hr>

Sonrasında Google'ın sağladığı <a href="https://ai.google.dev/gemini-api/docs/model-tuning/tutorial?lang=rest#try-model">dokümantasyonda</a> bulunan cURL'e node.js formatına uyarladık.
Google fine-tune edilmiş modelleri kullanabilmek için Google authentication kullanmayı şart tuttuğu için google-authentication modülünü kullandık.
ES modülü kolaylığından dolayı .mjs uzantılı javascript dosyalarını kullandık. Frontend tarafında ise embedded javascript (.ejs) kullandık. Modelimizin tam verimli çalışması için çeşitli ilk promptlar geliştirdik ve bunları frontend'de promptları butonlara gömdük.

<hr>

![WhatsApp Image 2024-11-03 at 15 33 06](https://github.com/user-attachments/assets/53b51485-6610-43ab-9bbf-be778aedf9b1)

<hr>

![WhatsApp Image 2024-11-03 at 15 44 44](https://github.com/user-attachments/assets/24ea3556-6395-4168-b8c8-29989f4eb637)

<hr>

## Kurulum

Bu projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları takip edin:

1. **Proje Dosyalarını İndirin**: 
    ```bash
    git clone https://github.com/furkanaknc/medi-secene-ai.git
    cd medisim
    ```

2. **Gerekli Bağımlılıkları Kurun**:
    ```bash
    npm install
    ```

3. **Ortam Değişkenlerini Ayarlayın**:
   Bir `.env` dosyası oluşturun ve aşağıdaki gibi ortam değişkenlerini ekleyin:
   ```bash
    CLIENT_ID=<Google OAuth Client ID> CLIENT_SECRET=<Google OAuth Client Secret>
    REDIRECT_URI=<Google OAuth Redirect URI> GOOGLE_API_KEY=<Google API Anahtarı>
    MODEL_NAME=<Kullanılacak AI Modeli İsmi>
    ```

4. **Sunucuyu Başlatın**:
 ```bash
 npm start
 ```

5. **Medisim'e Erişim**:
 Tarayıcınızda `http://localhost:3000/login` adresine giderek simülasyonu başlatabilirsiniz.

## Kullanım

### Vaka Yönetimi
Kullanıcı, ekranda görülen butonlar aracılığıyla tıbbi bir alan seçebilir ve ardından senaryo ile ilgili sorularını girebilir. AI modeli, kullanıcıdan gelen sorulara uygun yanıtlar vererek vaka sürecini destekler.

1. **Başlangıç Vaka Seçimi**: Tıbbi konulardan birini seçerek senaryoya başlayın.
2. **Soru-Cevap Süreci**: Senaryo boyunca kullanıcı, hastalık hakkında sorular sorarak bilgi alır ve teşhis sürecini yürütür.
3. **Yeni Vaka**: “Yeni Vaka” butonu ile farklı bir senaryoya geçiş yaparak eğitime devam edilebilir.

### Arayüz
- **Prompt Alanı**: Kullanıcı, tıbbi sorularını bu alanda girebilir.
- **Sohbet Geçmişi**: Kullanıcının soruları ve AI modelinin yanıtları bu bölümde listelenir.

## Kullanılan Paketler

- `express`: Sunucu oluşturma ve yönlendirme
- `ejs`: Şablon motoru
- `googleapis ve google-auth-library`: Google authentication bağlantıları için
- `dotenv`: Ortam değişkenleri
- `axios`: HTTP ve cUrl bağlantısı sağlamak için
- `nodemon`: Geliştirme sırasında otomatik yeniden başlatma
