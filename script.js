/**
 * LOGIKA UTAMA LUXURY ESTATE - UPDATED WA NUMBER
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inisialisasi AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // 2. Data 15 Unit Properti Mewah
    const propertyData = Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        name: `Elite Mansion ${i + 1}`,
        location: ["Kemang, Jakarta", "Uluwatu, Bali", "Dago, Bandung", "Menteng, Jakarta"][i % 4],
        price: `Rp ${(i + 3) * 1.25} Miliar`,
        thumb: `https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80&sig=${i}`,
        desc: "Nikmati kemewahan tiada tara dengan desain arsitektur modern yang dipadukan dengan alam. Fasilitas lengkap mencakup private pool, smart home technology, dan sistem keamanan 24 jam untuk kenyamanan maksimal Anda.",
        beds: 4 + (i % 3),
        baths: 3 + (i % 2),
        area: 300 + (i * 25),
        images: [
            "https://images.unsplash.com/photo-1600607687940-4e2a09695d2b",
            "https://images.unsplash.com/photo-1600121848594-d86cc4f59570",
            "https://images.unsplash.com/photo-1600566752355-35792bedcfea"
        ]
    }));

    // 3. Render Katalog ke dalam Grid
    const listContainer = document.getElementById('property-list');
    const modal = document.getElementById('propertyModal');

    function renderProperties(data) {
        if (!listContainer) return;
        listContainer.innerHTML = ''; 
        
        data.forEach(p => {
            const card = document.createElement('div');
            card.className = 'property-card';
            card.setAttribute('data-aos', 'fade-up');
            card.innerHTML = `
                <img src="${p.thumb}" class="property-img" alt="${p.name}">
                <div class="property-content">
                    <small><i class="fas fa-map-marker-alt"></i> ${p.location}</small>
                    <h3>${p.name}</h3>
                    <p class="property-price">${p.price}</p>
                </div>
            `;
            
            card.addEventListener('click', () => openPropertyModal(p));
            listContainer.appendChild(card);
        });
    }

    // Initial Render
    renderProperties(propertyData);

    // 4. Fungsi Modal (Detail Properti)
    function openPropertyModal(p) {
        document.getElementById('modalTitle').innerText = p.name;
        document.getElementById('modalPrice').innerText = p.price;
        document.getElementById('modalDesc').innerText = p.desc;
        document.getElementById('modalBeds').innerHTML = `<i class="fas fa-bed"></i> ${p.beds} KT`;
        document.getElementById('modalBaths').innerHTML = `<i class="fas fa-bath"></i> ${p.baths} KM`;
        document.getElementById('modalSqft').innerHTML = `<i class="fas fa-vector-square"></i> ${p.area} m²`;
        
        // --- UPDATE NOMOR WHATSAPP ---
        const waNumber = "6288220007296"; 
        const waMessage = `Halo Luxury Estate, saya tertarik dengan properti *${p.name}* di ${p.location} (${p.price}). Mohon info lebih lanjut.`;
        const waBtn = document.getElementById('whatsappLink');
        if (waBtn) {
            waBtn.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;
        }

        const gal = document.getElementById('modalGallery');
        if (gal) {
            gal.innerHTML = p.images.map(img => `<img src="${img}?auto=format&fit=crop&w=800&q=80" alt="Interior">`).join('');
            gal.innerHTML += `<img src="${p.thumb}" alt="Exterior">`;
        }
        
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
    }

    // Close Modal
    const closeBtn = document.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.onclick = () => {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        };
    }

    window.onclick = (e) => {
        if (e.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    };

    // 5. Efek Navbar saat di-scroll
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.padding = '15px 5%';
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            nav.style.padding = '25px 5%';
            nav.style.background = 'rgba(255, 255, 255, 0.8)';
        }
    });

    // 6. Interaktivitas Card Services (Hover Effect)
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if(!card.classList.contains('featured')) {
                card.style.transform = 'translateY(-10px)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if(!card.classList.contains('featured')) {
                card.style.transform = 'translateY(0)';
            }
        });
    });

    // 7. Logika Pencarian (Search Hero)
    const btnSearch = document.querySelector('.btn-search');
    const searchInput = document.querySelector('.input-box input');

    if (btnSearch && searchInput) {
        btnSearch.addEventListener('click', function() {
            const keyword = searchInput.value.toLowerCase().trim();
            
            if (keyword) {
                const filtered = propertyData.filter(p => 
                    p.name.toLowerCase().includes(keyword) || 
                    p.location.toLowerCase().includes(keyword)
                );

                renderProperties(filtered);
                
                // Scroll ke bagian katalog agar user melihat hasilnya
                const katalogSection = document.getElementById('katalog');
                if (katalogSection) {
                    katalogSection.scrollIntoView({ behavior: 'smooth' });
                }

                if (filtered.length === 0) {
                    listContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 50px;">Maaf, properti dengan kata kunci "${keyword}" tidak ditemukan.</p>`;
                }
            } else {
                renderProperties(propertyData);
            }
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') btnSearch.click();
        });
    }
});