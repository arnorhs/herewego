import { Size } from './types'
import { dqs, formatStat, makeEl, px } from './utils'

let activeModal: string | null = null

const modalFunctions = {
  playerStats: function ($content: HTMLElement, stats: Record<string, number | string>) {
    for (var key in stats) {
      if (stats.hasOwnProperty(key)) {
        // each row
        const row = makeEl({
          tag: 'div',
          class: 'row',
          kids: [
            {
              tag: 'div',
              class: 'property',
              kids: key,
            },
            {
              tag: 'div',
              class: 'value',
              kids: '' + formatStat(stats[key] as number),
            },
          ],
        })
        $content.appendChild(row)
      }
    }
  },
}

const getModal = () => dqs<HTMLElement>('#modal')

function showModal(size: Size) {
  const modal = getModal()
  modal.style.width = px(size.width)
  modal.style.height = px(size.height)
  modal.style.marginTop = px(-size.height / 2)
  modal.style.marginLeft = px(-size.width / 2)
  modal.style.display = 'block'
}

function toggleModal(
  name: keyof typeof modalFunctions,
  size: Size,
  arg: Record<string, number | string>,
) {
  const modal = getModal()
  if (activeModal === name) {
    modal.style.display = 'none'
    activeModal = null
    return
  }

  const modalFunction = modalFunctions[name]
  const $inner = dqs<HTMLElement>('.modal_inner', modal)

  $inner.innerHTML = ''

  modalFunction.apply(window, [$inner, arg])
  showModal(size)

  activeModal = name
}

export const Modal = {
  playerStats: function (stats: Record<string, number | string>) {
    toggleModal('playerStats', { width: 300, height: 265 }, stats)
  },
}
