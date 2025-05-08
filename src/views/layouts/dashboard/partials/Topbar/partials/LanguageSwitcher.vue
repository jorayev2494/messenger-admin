<template>
  <li class="dropdown">
    <a
      class="nav-link dropdown-toggle arrow-none"
      data-bs-toggle="dropdown"
      href="#"
      role="button"
      aria-haspopup="false"
      aria-expanded="false"
    >
      <i :class="`fi fi-${getLocaleFlag(locale)} me-1`" width="300"></i>
      <span class="align-middle d-none d-lg-inline-block">
        {{ $t(`system.supported-locales.${locale}`) }}
      </span>
      <i class="ri-arrow-down-s-line d-none d-sm-inline-block align-middle"></i>
    </a>
    <div class="dropdown-menu dropdown-menu-end dropdown-menu-animated">
      <!-- item-->
      <a
        v-for="sLocale in supportedLocales" :key="`locale-${sLocale}`"
        :class="{ 'active': sLocale === locale }"
        @click="switchLanguage(sLocale)"
        href="#"
        class="dropdown-item"
      >
        <i :class="`fi fi-${getLocaleFlag(sLocale)} me-1`" width="300"></i>
        <span class="align-middle">
          {{ $t(`system.supported-locales.${sLocale}`) }}
        </span>
      </a>
      <!-- item-->
    </div>
  </li>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { useI18n } from 'vue-i18n';
  import Tr from '@/infrastructure/translations/translation'

  const router = useRouter();
  const { locale } = useI18n();
  const supportedLocales = Tr.supportedLocales

  const switchLanguage = async (locale: string): Promise<void> => {
    await Tr.switchLanguage(locale);

    try {
      await router.replace({ params: { locale: locale } });
    } catch (error) {
      router.push('/');
    }

    // window.location.reload();
  }

  const getLocaleFlag = (flag: string): string => {
    const flags = {
      en: 'us',
      ru: 'ru',
    }

    return flags[flag] ?? flag
  }
</script>
