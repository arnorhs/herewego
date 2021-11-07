import { Modal } from '../modal'
import { ElDescriptor, ElTag, formatStat, makeEl } from '../util'

export type Stats = Record<string, number | string>

export class PlayerModal implements Modal {
  stats: Stats

  constructor() {
    this.stats = {}
  }

  getSize() {
    return { width: 300, height: 265 }
  }

  public updateStats(stats: Stats) {
    this.stats = stats
  }

  getContent() {
    const rows: ElDescriptor[] = []
    const div: ElTag = 'div'

    for (var key in this.stats) {
      if (this.stats.hasOwnProperty(key)) {
        // each row
        const row = {
          tag: div,
          class: 'row',
          kids: [
            {
              tag: div,
              class: 'property',
              kids: key,
            },
            {
              tag: div,
              class: 'value',
              kids: formatStat(this.stats[key] as number),
            },
          ],
        }
        rows.push(row)
      }
    }

    return makeEl({
      tag: div,
      kids: rows,
    })
  }
}
