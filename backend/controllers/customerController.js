const Customer = require('../models/Customer'); // Müşteri şemasını çağırıyoruz

// 1. GEREKSİNİM: Müşteri Üye Olma
// API Metodu: POST /customers/register
exports.registerCustomer = async (req, res) => {
    try {
        const { name, email, password } = req.body; // Tasarımda beklenen alanlar
        
        // Yeni bir müşteri nesnesi oluşturuluyor
        const newCustomer = new Customer({ name, email, password });
        
        // Veritabanına kaydediliyor
        await newCustomer.save();
        
        // Başarılı yanıt (201 Created)
        res.status(201).json(newCustomer);
    } catch (error) {
        // Hata durumunda (400 Bad Request)
        res.status(400).json({ message: "Kayıt başarısız", error: error.message });
    }
};

// 2. GEREKSİNİM: Müşteri Giriş
// API Metodu: POST /customers/login
exports.loginCustomer = async (req, res) => {
    try {
        const { email, password } = req.body; // Giriş bilgileri
        
        // Veritabanında bu email var mı kontrol edilir
        const customer = await Customer.findOne({ email });
        
        if (!customer || customer.password !== password) {
            // Şimdilik şifre kontrolü basit yapıldı, ilerde bcrypt eklenebilir
            return res.status(401).json({ message: "Email veya şifre hatalı" });
        }

        // Başarılı girişte JWT Token dönecek (Tasarım gereği)
        res.status(200).json({ 
            message: "Giriş başarılı", 
            token: "Örnek_JWT_Token" // Buraya ilerde gerçek token gelecek
        });
    } catch (error) {
        res.status(500).json({ message: "Sunucu hatası" });
    }
};

// 3. GEREKSİNİM: Profil Güncelleme
// API Metodu: PUT /customers/{customerId}
exports.updateProfile = async (req, res) => {
    try {
        // URL'den gelen ID ile müşteriyi bulup günceller
        const updatedCustomer = await Customer.findByIdAndUpdate(
            req.params.customerId, 
            req.body, 
            { new: true } // Güncellenmiş veriyi geri döndürmek için
        );
        
        if (!updatedCustomer) return res.status(404).json({ message: "Kullanıcı bulunamadı" });
        
        res.status(200).json(updatedCustomer);
    } catch (error) {
        res.status(400).json({ message: "Güncelleme hatası" });
    }
};