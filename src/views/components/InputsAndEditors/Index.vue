<template>
  <div v-if="true || form">
    <div class="form-group row" v-for="(input, idx) of inputs" :key="idx">

      <!-- <pre>input: {{ input }}</pre> -->
      <!-- <pre>form: {{ form }}</pre> -->

      <template v-if="! input.hide">
        <label
          v-if="input.label !== null"
          :for="input.name"
          class="col-lg-3 col-form-label my-2"
        >
          {{ $t(input.label) }} <span v-if="required ?? input.required" class="text-danger">*</span>
        </label>

        <div class="my-2" :class="input.label !== null ? 'col-lg-9' : 'col-lg-12'">
          <div v-if="inputs[idx]['tag'] == 'input'" :key="input.field">
            <input v-if="inputs[idx]['type'] == 'checkbox'"
              :type="inputs[idx]['type']"
              class="form-check-input permission-checkbox border"
              style="opacity: 1;"
              :name="input.name"
              v-model="form[input.name]"
              :id="input.name"
              :required="required ?? input.required"
              :readonly="readonly ?? input.readonly"
              v-on="input.events ?? {}"
            />
            <input v-else
              :type="inputs[idx]['type']"
              class="form-control"
              data-date-format="YYYY-MM-DD"
              :name="input.name"
              v-model="form[input.name]"
              :id="input.name"
              :placeholder="$t(input.placeholder ?? input.label)"
              :required="required ?? input.required"
              :readonly="readonly ?? input.readonly"
              v-on="input.events ?? {}"
            />
          </div>

          <div v-if="inputs[idx]['tag'] == 'textarea'">
            <textarea
              class="form-control"
              :name="input.name"
              v-model="form[input.name]"
              :id="input.name"
              :key="input.field"
              rows="5"
              :placeholder="$t(input.placeholder ?? input.label)"
              :required="required ?? input.required"
              style="height: 100%;"
              :readonly="readonly ?? input.readonly"
              v-on="input.events ?? {}"
            >
            </textarea>
          </div>

          <div v-if="inputs[idx]['tag'] == 'select'">
            <select
              class="form-select"
              :name="input.name"
              v-model="form[input.name]"
              :id="input.name"
              :key="input.field"
              :required="required ?? input.required"
              :readonly="readonly ?? input.readonly"
              v-bind="input.bind ?? {}"
              v-on="input.events ?? {}"
            >
              <option value="" disabled selected>{{ $t(input.placeholder ?? input.label) }}</option>
              <option
                v-for="(option, oIdx) of inputs[idx]['options'] ?? []"
                :key="oIdx"
                :value="option.value"
              >
                {{ $t(option.label ?? '~') }}
              </option>
            </select>
          </div>

          <!-- <div v-if="inputs[tIdx]['type'] == 'ckeditor'">
            <ckeditor
              :key="locale + input.field"
              :form="form"
              :locale="locale"
              :name="input['field']"
            />
          </div> -->
        </div>
      </template>

    </div>
  </div>
</template>


<script setup lang="ts">
  import { defineProps, ref } from 'vue'
  import useInput from './useInput'
  // import ckeditor from '../partials/ckeditor/Index.vue'

  const props = defineProps({
    form: {
      type: Object,
      required: true,
    },
    inputs: {
      type: Array,
      required: true,
    },
    required: {
      type: Boolean,
      default: () => null,
    },
    readonly: {
      type: Boolean,
      default: () => null,
    },
  });

  const activeLocale = ref('');

  const {
    inputs,
    clientSupportedLocales,
  } = useInput({ props });  
</script>
