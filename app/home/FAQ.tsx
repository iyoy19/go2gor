"use client";

const faqs = [
  {
    question: "Bagaimana cara booking lapangan?",
    answer:
      "Pilih lapangan, jadwal, dan lakukan pembayaran melalui website kami.",
  },
  {
    question: "Apakah bisa membatalkan booking?",
    answer: "Ya, pembatalan bisa dilakukan maksimal 24 jam sebelum jadwal.",
  },
];

export default function FAQ() {
  return (
    <section className="py-16 bg-white" id="faq">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">FAQ</h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b pb-4">
              <h4 className="text-lg font-semibold">{faq.question}</h4>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
