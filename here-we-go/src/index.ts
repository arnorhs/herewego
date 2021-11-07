import { views } from './views'

const app = document.querySelector<HTMLDivElement>('#app')!
app.style.height = '100%'

app.innerHTML = views.main.innerHTML

setTimeout(() => {
  views.main.init()
}, 200)
