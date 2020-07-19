<template>
  <section id="bg">
    <canvas id="bgCanvas" />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

let tick = 0
const options = {
  len: 20,
  count: 50,
  baseTime: 10,
  addedTime: 10,
  dieChance: 0.01,
  spawnChance: 0.5,
  sparkChance: 0.1,
  sparkDist: 10,
  sparkSize: 2,
  color: 'hsl(tone, 100%, light%)',
  baseLight: 50,
  addedLight: 10,
  shadowToTimePropMult: 6,
  baseLightInputMultiplier: 0.01,
  addedLightInputMultiplier: 0.02,
  ox: 0,
  oy: 0,
  repaintAlpha: 0.04,
  toneChange: 0.1
}

const lines: any = []
let dieX = 0
let dieY = 0
let clientHeight = 0
let clientWidth = 0

class Line {
  private x = 0;
  private y = 0;
  private addedX = 0;
  private addedY = 0;
  private radius = 0;
  private lightInputMultiplier = 0;
  private color = '';
  private cumulativeTime = 0;
  private time = 0;
  private targetTime = 0;

  private ctx: CanvasRenderingContext2D;
  private baseRadius = (Math.PI * 2) / 6;

  constructor (ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
    this.reset()
  }

  reset () {
    this.x = 0
    this.y = 0
    this.addedX = 0
    this.addedY = 0
    this.radius = 0
    this.lightInputMultiplier =
      options.baseLightInputMultiplier +
      options.addedLightInputMultiplier * Math.random()
    this.color = options.color.replace(
      'tone',
      (options.toneChange * tick).toString()
    )
    this.cumulativeTime = 0
    this.beginPhase()
  }

  beginPhase () {
    this.x += this.addedX
    this.y += this.addedY
    this.time = 0
    this.targetTime =
      (options.baseTime + options.addedTime * Math.random()) | 0
    this.radius += this.baseRadius * (Math.random() < 0.5 ? 1 : -1)
    this.addedX = Math.cos(this.radius)
    this.addedY = Math.sin(this.radius)
    if (
      Math.random() < options.dieChance ||
      this.x > dieX ||
      this.x < -dieX ||
      dieY > dieY ||
      this.y < -dieY
    )
      this.reset()
  }

  step () {
    ++this.time
    ++this.cumulativeTime
    if (this.time >= this.targetTime) this.beginPhase()
    const prop = this.time / this.targetTime,
      wave = Math.sin((prop * Math.PI) / 2),
      x = this.addedX * wave,
      y = this.addedY * wave
    this.ctx.shadowBlur = prop * options.shadowToTimePropMult
    this.ctx.fillStyle = this.ctx.shadowColor = this.color.replace(
      'light',
      (
        options.baseLight +
        options.addedLight *
          Math.sin(this.cumulativeTime * this.lightInputMultiplier)
      ).toString()
    )
    this.ctx.fillRect(
      options.ox + (this.x + x) * options.len,
      options.oy + (this.y + y) * options.len,
      2,
      2
    )
    if (Math.random() < options.sparkChance)
      this.ctx.fillRect(
        options.ox +
          (this.x + x) * options.len +
          Math.random() * options.sparkDist * (Math.random() < 0.5 ? 1 : -1) -
          options.sparkSize / 2,
        options.oy +
          (this.y + y) * options.len +
          Math.random() * options.sparkDist * (Math.random() < 0.5 ? 1 : -1) -
          options.sparkSize / 2,
        options.sparkSize,
        options.sparkSize
      )
  }
}

@Component
export default class LoginBg extends Vue {

  ctx: any
  mounted () {
    const bg = document.getElementById('bgCanvas') as HTMLCanvasElement,
      bgMain = document.getElementById('bg') as HTMLDivElement
    const ctx = bg.getContext('2d') as CanvasRenderingContext2D
    this.ctx = ctx
    clientWidth = bg.width = bgMain.clientWidth
    clientHeight = bg.height = bgMain.clientHeight
    options.ox = clientWidth / 2
    options.oy = clientHeight / 2
    dieX = clientWidth / 2 / options.len
    dieY = clientHeight / 2 / options.len
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, clientWidth, clientHeight)
    this.loop()
  }

  loop () {
    // setTimeout(()=>requestAnimationFrame(loop),  50)
    requestAnimationFrame(this.loop.bind(this))
    ++tick
    this.ctx.globalCompositeOperation = 'source-over'
    this.ctx.shadowBlur = 0
    this.ctx.fillStyle = 'rgba(0, 0, 0, alp)'.replace(
      'alp',
      options.repaintAlpha.toString()
    )
    this.ctx.fillRect(0, 0, clientWidth, clientHeight)
    this.ctx.globalCompositeOperation = 'lighter'
    if (lines.length < options.count && Math.random() < options.spawnChance)
      lines.push(new Line(this.ctx))
    lines.map((line: any) => line.step())
  }
}
interface Option {
  readonly len: number;
  readonly count: number;
  readonly baseTime: number;
  readonly addedTime: number;
  readonly dieChance: number;
  readonly spawnChance: number;
  readonly sparkChance: number;
  readonly sparkDist: number;
  readonly sparkSize: number;
  readonly color: string;
  readonly baseLight: number;
  readonly addedLight: number;
  readonly shadowToTimePropMult: number;
  readonly baseLightInputMultiplier: number;
  readonly addedLightInputMultiplier: number;
  ox: number;
  oy: number;
  readonly repaintAlpha: number;
  readonly toneChange: number;
}
</script>
<style lang="scss">
#bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;

  #bgCanvas {
    width: 100%;
    height: 100%;
  }
}
</style>
