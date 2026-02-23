<!-- pages/product/[id].vue -->
<template>
  <div class="min-h-screen bg-gray-50">

    <!-- Хлебные крошки -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <nav class="flex text-sm text-gray-500" aria-label="Breadcrumb">
          <ol class="flex items-center gap-2">
            <li><NuxtLink to="/" class="hover:text-primary-600 transition-colors">Главная</NuxtLink></li>
            <li><Icon name="heroicons:chevron-right" class="w-4 h-4 text-gray-300" /></li>
            <li><NuxtLink to="/categories" class="hover:text-primary-600 transition-colors">Каталог</NuxtLink></li>
            <li><Icon name="heroicons:chevron-right" class="w-4 h-4 text-gray-300" /></li>
            <li><NuxtLink class="hover:text-primary-600 transition-colors">{{ product.category }}</NuxtLink></li>
            <li><Icon name="heroicons:chevron-right" class="w-4 h-4 text-gray-300" /></li>
            <li class="text-gray-900 font-medium truncate max-w-[200px]">{{ product.name }}</li>
          </ol>
        </nav>
      </div>
    </div>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <!-- Верхняя часть: Галерея + Инфо -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">

        <!-- ГАЛЕРЕЯ ИЗОБРАЖЕНИЙ -->
        <div class="flex flex-col gap-4">

          <!-- Основное изображение (КЛИКАБЕЛЬНОЕ) -->
          <div
              class="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 cursor-zoom-in group"
              @click="openLightbox"
          >
            <NuxtImg
                :src="selectedImage"
                :alt="product.name"
                width="800"
                height="800"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                format="webp"
                quality="90"
            />

            <!-- Иконка лупы при наведении (FIX: идеальный круг) -->
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div class="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center">
                <Icon name="heroicons:magnifying-glass-plus" class="w-6 h-6 text-gray-700" />
              </div>
            </div>

            <!-- Бейджи на фото -->
            <div class="absolute top-4 left-4 flex flex-col gap-2 z-10">
              <span v-if="discountPercentage > 0" class="bg-red-700 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg">
                −{{ discountPercentage }}%
              </span>
                        <span v-if="product.isPopular" class="bg-gray-900 text-white px-3 py-1.5 rounded-lg text-sm font-bold">
                Хит
              </span>
            </div>
          </div>

          <!-- Миниатюры (карусель) -->
          <ClientOnly>
            <Carousel
                v-if="galleryImages.length > 1"
                :items-to-show="5"
                :wrap-around="true"
                :gap="10"
                class="carousel-mini"
            >
              <Slide v-for="(image, index) in galleryImages" :key="index">
                <button
                    @click="selectedImage = image"
                    class="w-full aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200"
                    :class="selectedImage === image ? 'border-primary-600 ring-2 ring-primary-100' : 'border-gray-200 hover:border-gray-300'"
                >
                  <NuxtImg
                      :src="image"
                      :alt="`${product.name} ${index + 1}`"
                      width="150"
                      height="150"
                      class="w-full h-full object-cover"
                      format="webp"
                      quality="80"
                  />
                </button>
              </Slide>
              <template #addons>
                <Navigation />
              </template>
            </Carousel>

            <div v-else class="flex gap-2">
              <div class="w-20 h-20 rounded-xl overflow-hidden border-2 border-primary-600 ring-2 ring-primary-100">
                <NuxtImg
                    :src="product.image"
                    :alt="product.name"
                    width="150"
                    height="150"
                    class="w-full h-full object-cover"
                    format="webp"
                    quality="80"
                />
              </div>
            </div>

            <template #fallback>
              <div class="flex gap-2 overflow-x-auto pb-2">
                <div
                    v-for="(image, index) in galleryImages"
                    :key="index"
                    class="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 border-gray-200"
                >
                  <NuxtImg
                      :src="image"
                      :alt="`${product.name} ${index + 1}`"
                      width="150"
                      height="150"
                      class="w-full h-full object-cover"
                      format="webp"
                      quality="80"
                  />
                </div>
              </div>
            </template>
          </ClientOnly>
        </div>

        <!-- === ИНФОРМАЦИЯ О ТОВАРЕ === -->
        <div class="flex flex-col">
          <!-- Категория -->
          <span class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
            {{ product.category }}
          </span>

          <!-- Название -->
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {{ product.name }}
          </h1>

          <!-- Рейтинг -->
          <div class="flex items-center gap-3 mb-6">
            <div class="flex text-yellow-400">
              <Icon v-for="n in 5" :key="n" :name="n <= Math.round(product.rating) ? 'heroicons:star-solid' : 'heroicons:star'" class="w-5 h-5" />
            </div>
            <span class="text-sm text-gray-500">{{ product.rating }} ({{ product.reviewCount }} отзывов)</span>
            <span class="text-gray-300">|</span>
            <span class="text-sm" :class="product.stock > 0 ? 'text-green-600' : 'text-red-600'">
              {{ product.stock > 0 ? 'В наличии' : 'Нет в наличии' }}
            </span>
          </div>

          <!-- Цена -->
          <div class="mb-6 pb-6 border-b border-gray-200">
            <div class="flex items-baseline gap-3 mb-2">
              <span class="text-4xl font-extrabold text-gray-900">{{ formatPrice(product.price) }}</span>
              <span v-if="product.oldPrice" class="text-xl text-gray-400 line-through">{{ formatPrice(product.oldPrice) }}</span>
            </div>
            <span v-if="product.oldPrice && discountPercentage > 0" class="text-sm text-red-600 font-medium">
              Экономия {{ formatPrice(calculateSavings) }}
            </span>
          </div>

          <!-- Описание -->
          <p class="text-gray-600 mb-6 leading-relaxed">
            {{ product.desc }}
          </p>

          <!-- Характеристики -->
          <div class="grid grid-cols-2 gap-3 mb-6">
            <div class="flex justify-between py-2 border-b border-gray-100">
              <span class="text-sm text-gray-500">Наличие</span>
              <span class="text-sm font-medium text-gray-900">{{ product.stock > 0 ? 'Есть' : 'Под заказ' }}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-gray-100">
              <span class="text-sm text-gray-500">Гарантия</span>
              <span class="text-sm font-medium text-gray-900">12 мес.</span>
            </div>
            <div class="flex justify-between py-2 border-b border-gray-100">
              <span class="text-sm text-gray-500">Доставка</span>
              <span class="text-sm font-medium text-gray-900">от 1 дня</span>
            </div>
            <div class="flex justify-between py-2 border-b border-gray-100">
              <span class="text-sm text-gray-500">Оплата</span>
              <span class="text-sm font-medium text-gray-900">Любая</span>
            </div>
          </div>

          <!-- Количество + Кнопки -->
          <div class="flex flex-col sm:flex-row gap-3 mb-6">
            <!-- Счётчик -->
            <div class="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
              <button
                  @click="decrementQuantity"
                  class="px-4 py-3 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  :disabled="quantity <= 1"
                  type="button"
              >
                <Icon name="heroicons:minus" class="w-5 h-5" />
              </button>
              <input
                  v-model.number="quantity"
                  type="number"
                  min="1"
                  max="99"
                  class="w-14 text-center text-lg font-semibold text-gray-900 bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button
                  @click="incrementQuantity"
                  class="px-4 py-3 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  :disabled="quantity >= 99"
                  type="button"
              >
                <Icon name="heroicons:plus" class="w-5 h-5" />
              </button>
            </div>

            <!-- В корзину -->
            <button
                @click="addToCart"
                :disabled="isAdding || product.stock === 0"
                class="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white py-3 px-6 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              <Icon v-if="!isAdding" name="heroicons:shopping-cart" class="w-5 h-5" />
              <Icon v-else name="heroicons:arrow-path" class="w-5 h-5 animate-spin" />
              <span>{{ isAdding ? 'Добавляем...' : product.stock === 0 ? 'Нет в наличии' : 'В корзину' }}</span>
            </button>

            <!-- В избранное -->
            <button
                @click="toggleFavorite"
                class="px-4 py-3 border border-gray-200 rounded-xl hover:border-red-300 hover:bg-red-50 transition-all"
                :class="{ 'text-red-600 border-red-300 bg-red-50': isFavorite }"
            >
              <Icon :name="isFavorite ? 'heroicons:heart-solid' : 'heroicons:heart'" class="w-6 h-6" />
            </button>
          </div>

          <!-- Доставка и гарантия -->
          <div class="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
            <div class="flex items-start gap-2">
              <Icon name="heroicons:truck" class="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <div>
                <div class="text-sm font-medium text-gray-900">Доставка</div>
                <div class="text-xs text-gray-500">по Кирову и области</div>
              </div>
            </div>
            <div class="flex items-start gap-2">
              <Icon name="heroicons:arrow-path-rounded-square" class="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <div>
                <div class="text-sm font-medium text-gray-900">Возврат</div>
                <div class="text-xs text-gray-500">14 дней на обмен</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- === ТАБЫ: Описание / Характеристики / Отзывы === -->
      <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-12">
        <div class="border-b border-gray-200">
          <nav class="flex">
            <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                class="px-6 py-4 text-sm font-medium transition-colors relative"
                :class="activeTab === tab.id ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700'"
            >
              {{ tab.label }}
              <span v-if="activeTab === tab.id" class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"></span>
            </button>
          </nav>
        </div>

        <div class="p-6 md:p-8">
          <div v-if="activeTab === 'description'" class="prose prose-gray max-w-none">
            <p class="text-gray-600 leading-relaxed">{{ product.desc }}</p>
            <p class="text-gray-600 leading-relaxed mt-4">
              Товар сертифицирован, соответствует ГОСТ. Идеально подходит для профессионального и частного строительства.
            </p>
          </div>

          <div v-if="activeTab === 'specs'" class="max-w-2xl">
            <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex justify-between py-3 border-b border-gray-100">
                <dt class="text-sm text-gray-500">Категория</dt>
                <dd class="text-sm font-medium text-gray-900">{{ product.category }}</dd>
              </div>
              <div class="flex justify-between py-3 border-b border-gray-100">
                <dt class="text-sm text-gray-500">Артикул</dt>
                <dd class="text-sm font-medium text-gray-900">ART-{{ product.id.toString().padStart(5, '0') }}</dd>
              </div>
              <div class="flex justify-between py-3 border-b border-gray-100">
                <dt class="text-sm text-gray-500">Наличие</dt>
                <dd class="text-sm font-medium text-gray-900">{{ product.stock }} шт.</dd>
              </div>
              <div class="flex justify-between py-3 border-b border-gray-100">
                <dt class="text-sm text-gray-500">Рейтинг</dt>
                <dd class="text-sm font-medium text-gray-900">{{ product.rating }}/5</dd>
              </div>
            </dl>
          </div>

          <div v-if="activeTab === 'reviews'" class="text-center py-8">
            <Icon name="heroicons:chat-bubble-left-right" class="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p class="text-gray-500 mb-4">Отзывов пока нет — будьте первым!</p>
            <button class="text-primary-600 font-medium hover:underline">Оставить отзыв</button>
          </div>
        </div>
      </div>

      <!-- === СВЯЗАННЫЕ ТОВАРЫ === -->
      <section v-if="relatedProducts.length > 0">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Похожие товары</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard
              v-for="item in relatedProducts"
              :key="item.id"
              :product="item"
              variant="grid"
          />
        </div>
      </section>

    </main>

    <!-- === LIGHTBOX (увеличение изображения) === -->
    <ClientOnly>
      <VueEasyLightbox
          v-if="lightboxVisible"
          :visible="lightboxVisible"
          :imgs="galleryImages"
          :index="lightboxIndex"
          :scrollDisabled="false"
          @hide="lightboxVisible = false"
          @move="handleLightboxMove"
      />
    </ClientOnly>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
// vue-easy-lightbox импортируется динамически или через ClientOnly

// === Тип товара ===
interface Product {
  id: number
  name: string
  desc: string
  image: string
  images?: string[]
  price: number
  oldPrice?: number
  category: string
  categorySlug?: string
  rating: number
  reviewCount: number
  stock: number
  isPopular?: boolean
  isNew?: boolean
  createdAt: string
}

// === Текущий товар ===
const product = ref<Product>({
  id: 1,
  name: 'Сэндвич-панели ПВХ откосы',
  desc: 'Длина 3 м, толщина 10 мм, белый цвет. Идеально подходят для отделки оконных проемов.',
  image: '/images/catalog/siding/siding_v1.png',
  images: [
    '/images/catalog/siding/siding_v1.png',
    '/images/catalog/siding/siding_v2.png',
    '/images/catalog/siding/siding_v3.png',
    '/images/catalog/siding/siding_v4.png',
  ],
  price: 1400,
  oldPrice: 1490,
  category: 'Стеновые панели',
  categorySlug: 'wall-panels',
  rating: 4.8,
  reviewCount: 124,
  stock: 45,
  isPopular: true,
  createdAt: '2024-01-15'
})

// === Связанные товары ===
const relatedProducts = ref<Product[]>([
  {
    id: 2,
    name: 'Сэндвич-панель ПВХ с декором',
    desc: 'Длина 3 м, толщина 10 мм. Улучшенная текстура поверхности.',
    image: '/images/catalog/siding/siding_v2.png',
    price: 1520,
    oldPrice: 1690,
    category: 'Стеновые панели',
    categorySlug: 'wall-panels',
    rating: 4.7,
    reviewCount: 89,
    stock: 32,
    isPopular: true,
    createdAt: '2024-01-18'
  },
  {
    id: 3,
    name: 'Сэндвич-панель ПВХ премиум',
    desc: 'Длина 3 м, толщина 10 мм. Повышенная износостойкость покрытия.',
    image: '/images/catalog/siding/siding_v3.png',
    price: 1680,
    category: 'Стеновые панели',
    categorySlug: 'wall-panels',
    rating: 4.9,
    reviewCount: 156,
    stock: 18,
    isPopular: true,
    createdAt: '2024-01-25'
  },
  {
    id: 4,
    name: 'Сэндвич-панель ПВХ эконом',
    desc: 'Длина 3 м, толщина 8 мм. Оптимальное решение для бюджетного ремонта.',
    image: '/images/catalog/siding/siding_v4.png',
    price: 1190,
    oldPrice: 1350,
    category: 'Стеновые панели',
    categorySlug: 'wall-panels',
    rating: 4.4,
    reviewCount: 203,
    stock: 67,
    isNew: true,
    createdAt: '2024-02-05'
  },
  {
    id: 5,
    name: 'Сэндвич-панель ПВХ матовая',
    desc: 'Длина 3 м, толщина 10 мм. Матовое покрытие без бликов.',
    image: '/images/catalog/siding/siding_v5.png',
    price: 1450,
    category: 'Стеновые панели',
    categorySlug: 'wall-panels',
    rating: 4.6,
    reviewCount: 74,
    stock: 41,
    isPopular: false,
    createdAt: '2024-02-12'
  },
])

// === Состояние ===
const selectedImage = ref(product.value.images?.[0] || product.value.image)
const galleryImages = computed(() => product.value.images?.length ? product.value.images : [product.value.image])
const quantity = ref(1)
const isAdding = ref(false)
const isFavorite = ref(false)
const activeTab = ref('description')
const categorySlug = computed(() => product.value.categorySlug || product.value.category.toLowerCase().replace(/\s+/g, '-'))

// === Lightbox состояние ===
const lightboxVisible = ref(false)
const lightboxIndex = ref(0)

const tabs = [
  { id: 'description', label: 'Описание' },
  { id: 'specs', label: 'Характеристики' },
  { id: 'reviews', label: 'Отзывы' },
]

// === Вычисляемые ===
const calculateSavings = computed(() => {
  if (!product.value.oldPrice || !product.value.price) return 0
  return Number(product.value.oldPrice) - Number(product.value.price)
})

const discountPercentage = computed(() => {
  if (!product.value.oldPrice || !product.value.price) return 0
  const oldP = Number(product.value.oldPrice)
  const newP = Number(product.value.price)
  if (oldP <= 0 || newP >= oldP) return 0
  return Math.round(((oldP - newP) / oldP) * 100)
})

// === Методы ===
const formatPrice = (value: number | string) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0
  }).format(Number(value))
}

const incrementQuantity = () => {
  if (quantity.value < 99) quantity.value++
}

const decrementQuantity = () => {
  if (quantity.value > 1) quantity.value--
}

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
}

const addToCart = async () => {
  if (isAdding.value || product.value.stock === 0) return
  isAdding.value = true
  await new Promise(resolve => setTimeout(resolve, 800))
  console.log(`Added ${quantity.value} x ${product.value.name} to cart`)
  isAdding.value = false
}

// === Lightbox методы ===
const openLightbox = () => {
  // Находим индекс текущего изображения в галерее
  lightboxIndex.value = galleryImages.value.indexOf(selectedImage.value)
  if (lightboxIndex.value === -1) lightboxIndex.value = 0
  lightboxVisible.value = true
}

const handleLightboxMove = (val: number) => {
  // При переключении в лайтбоксе — обновляем selectedImage
  if (galleryImages.value[val]) {
    selectedImage.value = galleryImages.value[val]
  }
}

// === SEO ===
useSeoMeta({
  title: `${product.value.name} — Купить в Кирове`,
  description: product.value.desc,
  ogTitle: product.value.name,
  ogDescription: product.value.desc,
  ogImage: product.value.image,
})
</script>

<style scoped>
/* Кастомизация карусели */
.carousel-mini {
  max-width: 500px;
  margin: 0 auto;
}

.carousel-mini .carousel__slide {
  padding: 0.5rem;
}

.carousel-mini .carousel__prev,
.carousel-mini .carousel__next {
  background: white;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
}

.carousel-mini .carousel__prev:hover,
.carousel-mini .carousel__next:hover {
  background: #f9fafb;
  border-color: #d1d5db;
}

/* Адаптив */
@media (max-width: 640px) {
  .carousel-mini {
    max-width: 100%;
  }
}
</style>