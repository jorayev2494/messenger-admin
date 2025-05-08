<template>
  <div class="card flex-fill" v-if="form">
    <div class="card-header">
      <h4 class="card-title">{{ $t(blockTitle) }}</h4>
    </div>

    <div class="card-header" v-if="form.translations">
      <ul role="tablist" class="nav nav-tabs card-header-tabs float-right">

        <li class="nav-item" v-for="(locale, idx) of clientSupportedLocales" :key="idx">
          <a
            :href="`#tab-${locale}`"
            data-bs-toggle="tab"
            class="nav-link"
            :class="idx === 0 ? 'active' : ''"
            @click="setActive(locale)"
          >
            <i :class="`fi fi-${getLocaleFlag(locale)} me-1`" width="300"></i>
            {{ $t(`system.supported-locales.${locale}`) }}
          </a>
        </li>

      </ul>
    </div>

    <div class="card-body">
      <div class="tab-content pt-0" v-if="form.translations">

        <div
          role="tabpanel"
          v-for="(locale, idx) of clientSupportedLocales" :key="idx"
          :id="`#tab-${locale}`"
          class="tab-pane fade show"
          :class="{ 'active': activeLocale === locale }"
        >
          <div class="form-group row" v-for="(input, tIdx) of inputs" :key="tIdx">
            <label class="col-lg-3 col-form-label" v-if="input.tLabel !== null">
              {{ $t(input.tLabel) }} <span v-if="input.required" class="text-danger">*</span>
            </label>

            <div :class="input.tLabel !== null ? 'col-lg-9' : 'col-lg-12'">
              <div v-if="inputs[tIdx]['type'] == 'text'">
                <input
                  type="text"
                  class="form-control"
                  v-model="form.translations[locale][input.field]"
                  :key="locale + input.field"
                  :placeholder="input.tLabel ? $t(input.tLabel) : null"
                  required
                  :readonly="readonly"
                >
              </div>

              <div v-if="inputs[tIdx]['type'] == 'textarea'">
                <textarea
                  class="form-control"
                  v-model="form.translations[locale][input.field]"
                  :key="locale + input.field"
                  rows="5"
                  :placeholder="input.tLabel ? $t(input.tLabel) : null"
                  required
                  style="height: 100%;"
                  :readonly="readonly"
                >
                </textarea>
              </div>

              <div v-if="inputs[tIdx]['type'] == 'ckeditor'">
                <ckeditor
                  :key="locale + input.field"
                  :form="form"
                  :locale="locale"
                  :name="input['field']"
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>  
</template>


<script setup>
  import { defineProps, ref } from 'vue'
  import useInput from './useInput'
  import ckeditor from '../partials/ckeditor/Index.vue'

  const props = defineProps({
    form: {
      type: Object,
      required: true,
    },
    inputs: {
      type: Array,
      required: true,
    },
    values: {
      type: Object,
      default: () => ({}),
    },
    blockTitle: {
      type: String,
      default: () => 'system.translations',
    },
    readonly: {
      type: Boolean,
      default: () => false,
    },
  });

  const getLocaleFlag = flag => {
    const flags = {
      en: 'us',
      ru: 'ru',
      tm: 'tm',
      tr: 'tr',
    }

    return flags[flag] ?? flag
  }

  const activeLocale = ref('');
  const isLoaded = ref(false);

  const setActive = locale => {
    activeLocale.value = locale
  }

  const {
    inputs,
    clientSupportedLocales,
  } = useInput({ props });

  // setTimeout(() => {
  //   isLoaded.value = true;
  //   setActive(Object.keys(props.form.translations)[0]);
  // }, 500);
  
</script>

<style lang="scss" scoped>

</style>