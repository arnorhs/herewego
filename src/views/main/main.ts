import { startGame } from '../../lib/main'
import './main.css'

export const innerHTML = `
  <div id="world_view"></div>
  <canvas id="light_canvas"></canvas>
  <div id="modal"><div class="modal_inner"></div></div>
  <div id="player_stats">
    <div id="health">
      <div class="percent"></div>
    </div>
    <div id="xp"></div>
  </div>
  <div id="coords"></div>
  <div id="time"></div>
  <canvas id="map_canvas" width="200" height="200"></canvas>
`

export const init = () => {
  startGame()
}
