"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "How long does shipping take?",
    answer: "Most orders arrive within 5-7 business days. Pro members receive priority shipping with delivery in 3-5 business days.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, PayPal, and Apple Pay for your convenience.",
  },
  {
    question: "Can I track my order?",
    answer: "Yes! Once your order ships, you'll receive a tracking number via email to monitor your delivery in real-time.",
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for most items. If you're not satisfied, contact our support team to initiate a return.",
  },
  {
    question: "Do you offer international shipping?",
    answer: "Currently, we ship within the continental United States. International shipping options are coming soon.",
  },
  {
    question: "How do I contact customer support?",
    answer: "Email us anytime at support@ddingcha.com. Pro members have access to 24/7 chat support through their dashboard.",
  },
]

export function Faq() {
  return (
    <section id="faq" className="container py-20 md:py-28">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Everything you need to know about DdingCha.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-foreground">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
