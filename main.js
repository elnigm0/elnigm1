 
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("order-form");
    const ordersDisplay = document.getElementById("orders-display");
    const drinkPriceDisplay = document.getElementById("drink-price");

    const drinksPrices = {
        "شاي": "10 جنيه",
        "قهوة": "17 جنيه",
        "قهوه": "17 جنيه",
        "نسكافيه": "30 جنيه",
        "نسكافية": "30 جنيه",       
        "نسكافيه ساقع": "35 جنيه",
        "نسكافية ساقع": "35 جنيه",
        "قهوة سادة": "17 جنيه",
        "قهوه ساده": "17 جنيه",
        "قهوة ساده": "17 جنيه",
        "قهوه سادة": "17 جنيه",
        "قهوه كراميل": "27 جنيه",
        "قهوة كراميل": "27 جنيه",
        "سحلب ": "20 جنيه",
        "كوكاكولا ": "25 جنيه",
        "بيبسي ": "25 جنيه",
        " شويبس ": "25 جنيه",
        " سبيرو سباتس": "25 جنيه",
        " عصير مانجو": "30 جنيه",
        " عصير كوكتيل ": "15 جنيه",
        " قهوة فرنساوي ": "27 جنيه",
        "قهوه فرنساوي  ": "27 جنيه",
        "قهوة فرنساوى ": "27 جنيه",
        " قهوه فرنساوي": "27 جنيه",
        " زجاجة مياه": "7 جنيه",
        " زحاجة مياة": "7 جنيه",
        " زجاجه مياه": "7 جنيه",
        " زجاجه مياة ": "7 جنيه",
   
    };

    // جلب الطلبات المخزنة من localStorage عند تحميل الصفحة
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    savedOrders.forEach(order => displayOrder(order));

    // تحديث السعر عند إدخال المشروب
    const drinkInput = document.getElementById("customer-drink");
    drinkInput.addEventListener("input", () => {
        const drink = drinkInput.value.trim();
        drinkPriceDisplay.textContent = drinksPrices[drink] ? `السعر: ${drinksPrices[drink]}` : "";
    });

    // إضافة الطلب
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("customer-name").value.trim();
        const drink = document.getElementById("customer-drink").value.trim();
        const table = document.getElementById("table-number").value.trim();
        const rating = document.getElementById("customer-rating").value.trim();

        if (!name || !drink || !table) {
            alert("يرجى إدخال جميع البيانات المطلوبة!");
            return;
        }

        const order = { name, drink, table, rating };

        // حفظ الطلب في localStorage
        savedOrders.push(order);
        localStorage.setItem("orders", JSON.stringify(savedOrders));

        displayOrder(order);

        // إعادة تعيين النموذج
        form.reset();
        drinkPriceDisplay.textContent = "";
    });

    // وظيفة عرض الطلب على الشاشة
    function displayOrder(order) {
        const orderItem = document.createElement("li");
        orderItem.innerHTML = `
            <span><strong>${order.name}</strong> - ${order.drink} (${order.table}) - ${order.rating ? `تقييم: ${order.rating}` : "بدون تقييم"}</span>
            <button class="edit-btn">تعديل</button>
            <button class="delete-btn">حذف</button>
        `;

        // تعديل الطلب
        orderItem.querySelector(".edit-btn").addEventListener("click", () => {
            document.getElementById("customer-name").value = order.name;
            document.getElementById("customer-drink").value = order.drink;
            document.getElementById("table-number").value = order.table;
            document.getElementById("customer-rating").value = order.rating;

            // حذف الطلب القديم من localStorage
            const index = savedOrders.indexOf(order);
            savedOrders.splice(index, 1);
            localStorage.setItem("orders", JSON.stringify(savedOrders));

            orderItem.remove();
        });

        // حذف الطلب
        orderItem.querySelector(".delete-btn").addEventListener("click", () => {
            const index = savedOrders.indexOf(order);
            savedOrders.splice(index, 1);
            localStorage.setItem("orders", JSON.stringify(savedOrders));

            orderItem.remove();
        });

        ordersDisplay.appendChild(orderItem);
    }
});
