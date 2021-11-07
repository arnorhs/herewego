import { dqs, px } from '../util'
import { Modal } from './types'

export class ModalContainer {
  private el: HTMLElement
  private innerEl: HTMLElement
  private activeModal: Modal | null = null

  constructor(selector: string) {
    this.el = dqs<HTMLElement>(selector)
    this.innerEl = dqs<HTMLElement>('.modal_inner', this.el)
  }

  toggleModal(modal: Modal) {
    this.activeModal = this.activeModal === modal ? null : modal

    this.updateViewState()
  }

  private updateViewState() {
    if (!this.activeModal) {
      this.innerEl.innerHTML = ''
      this.el.style.display = 'none'
      return
    }

    const size = this.activeModal.getSize()

    this.el.style.width = px(size.width)
    this.el.style.height = px(size.height)
    this.el.style.marginTop = px(-size.height / 2)
    this.el.style.marginLeft = px(-size.width / 2)
    this.el.style.display = 'block'
  }
}
