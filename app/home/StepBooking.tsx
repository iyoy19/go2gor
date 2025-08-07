"use client";

export default function StepBooking() {
  const steps = [
    {
      title: "Pilih Lapangan",
      desc: "Telusuri dan pilih lapangan sesuai kebutuhanmu.",
    },
    { title: "Pilih Jadwal", desc: "Tentukan tanggal dan jam mainmu." },
    { title: "Bayar", desc: "Lakukan pembayaran dengan metode yang tersedia." },
  ];

  return (
    <section className="py-16 bg-gray-50" id="booking">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-10">Cara Booking</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {steps.map((step, i) => (
            <div key={i} className="w-full md:w-1/3">
              <div className="text-4xl font-bold text-primary mb-2">
                0{i + 1}
              </div>
              <h4 className="text-xl font-semibold mb-1">{step.title}</h4>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
