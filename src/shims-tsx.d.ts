// eslint-disable-next-line
import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    // eslint-disable-next-line
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    // eslint-disable-next-line
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
