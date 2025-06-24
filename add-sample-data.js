
// ملف لإضافة البيانات النموذجية إلى Firebase
// استخدم هذا الكود في console المتصفح لإضافة المنتجات النموذجية

async function addSampleProducts() {
    console.log('📝 إضافة المنتجات النموذجية إلى Firebase...');
    
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
        },
        {
            name: "حذاء رياضي Nike",
            price: "899",
            description: "حذاء رياضي مريح وأنيق",
            category: "sports",
            icon: "fas fa-running",
            stores: "متوفر في 6 متاجر",
            currency: "درهم"
        },
        {
            name: "كريم مرطب للوجه",
            price: "120",
            description: "كريم طبيعي للعناية بالبشرة",
            category: "beauty",
            icon: "fas fa-pump-soap",
            stores: "متوفر في 20 متجر",
            currency: "درهم"
        },
        {
            name: "كتاب تعلم البرمجة",
            price: "85",
            description: "دليل شامل لتعلم البرمجة",
            category: "books",
            icon: "fas fa-book",
            stores: "متوفر في 5 متاجر",
            currency: "درهم"
        }
    ];

    if (window.firebaseAddProduct) {
        for (let product of sampleProducts) {
            try {
                const result = await window.firebaseAddProduct(product);
                if (result.success) {
                    console.log(`✅ تم إضافة: ${product.name}`);
                } else {
                    console.error(`❌ فشل إضافة: ${product.name}`, result.error);
                }
            } catch (error) {
                console.error(`❌ خطأ في إضافة: ${product.name}`, error);
            }
        }
        console.log('🎉 تم الانتهاء من إضافة المنتجات النموذجية!');
    } else {
        console.error('❌ Firebase غير متاح');
    }
}

// استدعاء الوظيفة
// addSampleProducts();
