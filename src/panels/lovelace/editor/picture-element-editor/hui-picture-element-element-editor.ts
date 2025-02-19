import { customElement } from "lit/decorators";
import type { LovelaceElementConfig } from "../../elements/types";
import type { LovelacePictureElementEditor } from "../../types";
import { HuiTypedElementEditor } from "../hui-typed-element-editor";
import { getPictureElementClass } from "../../create-element/create-picture-element";

@customElement("hui-picture-element-element-editor")
export class HuiPictureElementElementEditor extends HuiTypedElementEditor<LovelaceElementConfig> {
  protected get configElementType(): string | undefined {
    return this.value?.type === "action-button"
      ? "service-button"
      : this.value?.type;
  }

  protected async getConfigElement(): Promise<
    LovelacePictureElementEditor | undefined
  > {
    const elClass = await getPictureElementClass(this.configElementType!);

    // Check if a GUI editor exists
    if (elClass && elClass.getConfigElement) {
      return elClass.getConfigElement();
    }

    return undefined;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hui-picture-element-element-editor": HuiPictureElementElementEditor;
  }
}
