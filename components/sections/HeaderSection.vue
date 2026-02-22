<template>
  <header class="bg-white shadow-md sticky top-0 z-30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-4">
        <a href="#" class="flex items-center gap-3">
          <div class="bg-primary-600 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl">SB</div>
          <div>
            <div class="text-2xl font-bold text-primary-700">СтройБум</div>
            <div class="text-xs text-gray-600">Киров • С 2011 года</div>
          </div>
        </a>
        <nav class="hidden md:block">
          <ul class="flex gap-6">
            <li><NuxtLink to="/" class="text-gray-700 hover:text-primary-600 font-medium">Главная</NuxtLink></li>
            <li><NuxtLink to="/categories" class="text-gray-700 hover:text-primary-600 font-medium">Каталог</NuxtLink></li>
            <li><NuxtLink to="/brands" class="text-gray-700 hover:text-primary-600 font-medium">Бренды</NuxtLink></li>
            <li><NuxtLink to="/contacts" class="text-gray-700 hover:text-primary-600 font-medium">Контакты</NuxtLink></li>
          </ul>
        </nav>
        <div class="flex items-center gap-4">
          <div class="relative hidden md:block">
            <input type="text" placeholder="Поиск товаров..." class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 w-64">
            <Icon name="search" color="#9ca3af" class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <button class="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg">☰</button>
        </div>
      </div>
    </div>
  </header>
</template>