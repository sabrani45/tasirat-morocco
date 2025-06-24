
// سكريبت لاختبار وإضافة منتجات نموذجية إلى Firebase
// قم بتشغيل هذا في console المتصفح بعد تحميل الصفحة

async function testFirebaseConnection() {
    console.log('🔥 اختبار اتصال Firebase...');
    
    // اختبار قراءة المنتجات
    const result = await window.firebaseGetProducts();
    console.log('📦 نتيجة قراءة المنتجات:', result);
    
    // إضافة منتجات نموذجية إذا كانت قاعدة البيانات فارغة
    if (result.success && result.products.length === 0) {
        console.log('📝 إضافة منتجات نموذجية...');
        
        const sampleProducts = [
            {
                name: "iPhone 14 Pro",
                price: "15999",
                description: "أحدث هاتف من أبل مع كاميرا متطورة",
                category: "electronics",
                icon: "fas fa-mobile-alt",
                stores: "متوفر في 12 متجر",
                currency: "درهم"
            },
            {
                name: "لابتوب Dell XPS 13",
                price: "12500",
                description: "لابتوب خفيف ومتطور للعمل",
                category: "electronics",
                icon: "fas fa-laptop",
                stores: "متوفر في 8 متاجر",
                currency: "درهم"
            },
            {
                name: "قميص رجالي قطني",
                price: "199",
                description: "قميص قطني عالي الجودة",
                category: "fashion",
                icon: "fas fa-tshirt",
                stores: "متوفر في 15 متجر",
                currency: "درهم"
            }
        ];
        
        for (const product of sampleProducts) {
            const addResult = await window.firebaseAddProduct(product);
            console.log(`✅ تم إضافة ${product.name}:`, addResult);
        }
        
        console.log('🎉 تم إضافة جميع المنتجات النموذجية!');
    }
}

// تشغيل الاختبار عند تحميل Firebase
window.addEventListener('firebaseReady', () => {
    setTimeout(testFirebaseConnection, 1000);
});
