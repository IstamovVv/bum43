<template>
  <main>
    <HeroSection />
    <BrandsSection />
    <CatalogSection/>
    <AdvantagesSection />
    <ReviewsSection />
    <ContactsSection />
  </main>

  <FooterSection />

  <CallbackModal />
  <CalculatorModal />
</template>

<script setup>
// SEO

useHead({
  title: 'СтройБум Киров - Строительные материалы с 2011 года',
  meta: [
    { name: 'description', content: 'СтройБум Киров - сайдинг, фасадные панели, террасная доска, водосточные системы.' }
  ]
})
</script>