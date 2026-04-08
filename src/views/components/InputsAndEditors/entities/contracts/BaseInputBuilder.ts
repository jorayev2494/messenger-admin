import { reactive, type Reactive } from 'vue'
import type { InputAndEditorInterface } from './InputAndEditorInterface'

export abstract class BaseInputBuilder {
  public form: Reactive<{ [key: string]: object | string }> = reactive({})

  protected inputs: InputAndEditorInterface[] = []

  public constructor() {}

  public initForm(data: { [key: string]: object }): this {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const element = data[key]
        this.form[key] = element
      }
    }

    return this
  }

  public getInputs(): InputAndEditorInterface[] {
    return this.inputs
  }

  public updating(): void {}

  public map(
    callbackfn: (
      input: InputAndEditorInterface,
      index: number,
      inputs: InputAndEditorInterface[],
    ) => InputAndEditorInterface,
  ): this {
    this.inputs = this.inputs.map<InputAndEditorInterface>(callbackfn)

    return this
  }

  public filter(
    predicate: (
      input: InputAndEditorInterface,
      index: number,
      inputs: InputAndEditorInterface[],
    ) => boolean,
  ): this {
    this.inputs = this.inputs.filter(predicate)

    return this
  }
}
